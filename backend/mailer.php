<?php
// ============================================================================
// XCOCO Eyewear - SMTP Mailer Helper (mailer.php)
// รองรับ Multipart/Related และ CID Inline Attachment ทำให้รูปแสดงผลใน Gmail 100%
// ============================================================================

require_once __DIR__ . '/email_templates.php';

function sendXcocoEmail($toEmail, $toName, $subject, $htmlBody, $attachments = []) {
    $config = require __DIR__ . '/mail_config.php';

    // หากเปิดโหมดจำลอง หรือยังไม่ได้กรอก App Password จริง
    if (!empty($config['simulate_mode']) || empty($config['smtp_user']) || $config['smtp_user'] === 'your_email@gmail.com') {
        $logDir = __DIR__ . '/mail_logs';
        if (!is_dir($logDir)) {
            @mkdir($logDir, 0777, true);
        }
        $filename = $logDir . '/mail_' . date('Y-m-d_His') . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', $toEmail) . '.html';
        @file_put_contents($filename, $htmlBody);

        return [
            'success' => true,
            'simulated' => true,
            'message' => "จำลองการส่งอีเมลไปยัง {$toEmail} สำเร็จ (บันทึกตัวอย่างที่ {$filename})",
            'preview_file' => 'mail_logs/' . basename($filename)
        ];
    }

    // ทำการเชื่อมต่อส่งผ่าน Gmail SMTP จริง
    try {
        $host = $config['smtp_host'];
        $port = (int)$config['smtp_port'];
        $user = $config['smtp_user'];
        $pass = str_replace(' ', '', $config['smtp_pass']);
        $fromEmail = !empty($config['from_email']) ? $config['from_email'] : $user;
        $fromName = !empty($config['from_name']) ? $config['from_name'] : 'XCOCO Eyewear';

        $timeout = 15;
        $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
        if (!$socket) {
            throw new Exception("ไม่สามารถเชื่อมต่อ SMTP Server ได้: {$errstr} ({$errno})");
        }

        $readResponse = function($socket, $expectedCode) {
            $response = '';
            while ($line = fgets($socket, 512)) {
                $response .= $line;
                if (substr($line, 3, 1) == ' ') break;
            }
            if (substr($response, 0, 3) != $expectedCode) {
                throw new Exception("SMTP Error: " . trim($response));
            }
            return $response;
        };

        $sendCommand = function($socket, $cmd, $expectedCode) use ($readResponse) {
            fputs($socket, $cmd . "\r\n");
            return $readResponse($socket, $expectedCode);
        };

        $readResponse($socket, '220');
        $sendCommand($socket, 'EHLO ' . gethostname(), '250');

        if ($port == 587 || $config['smtp_secure'] == 'tls') {
            $sendCommand($socket, 'STARTTLS', '220');
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            $sendCommand($socket, 'EHLO ' . gethostname(), '250');
        }

        $sendCommand($socket, 'AUTH LOGIN', '334');
        $sendCommand($socket, base64_encode($user), '334');
        $sendCommand($socket, base64_encode($pass), '235');

        $sendCommand($socket, "MAIL FROM: <{$fromEmail}>", '250');
        $sendCommand($socket, "RCPT TO: <{$toEmail}>", '250');
        $sendCommand($socket, 'DATA', '354');

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $encodedFromName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';

        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "From: {$encodedFromName} <{$fromEmail}>\r\n";
        $headers .= "To: <{$toEmail}>\r\n";
        $headers .= "Subject: {$encodedSubject}\r\n";
        $headers .= "Date: " . date('r') . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

        // ตรวจสอบว่ามีรูปภาพแบบ CID แนบมาด้วยหรือไม่
        if (!empty($attachments)) {
            $boundary = '----=_Part_' . md5(time()) . '_' . uniqid();
            $headers .= "Content-Type: multipart/related; boundary=\"{$boundary}\"\r\n\r\n";

            // Part 1: HTML Content
            $body  = "--{$boundary}\r\n";
            $body .= "Content-Type: text/html; charset=UTF-8\r\n";
            $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
            $body .= $htmlBody . "\r\n\r\n";

            // Part 2+: Inline Attachments (CID)
            foreach ($attachments as $cid => $filePath) {
                if (file_exists($filePath)) {
                    $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
                    $mime = ($ext === 'png') ? 'image/png' : 'image/jpeg';
                    $fileContent = file_get_contents($filePath);
                    $base64Data = chunk_split(base64_encode($fileContent));
                    $filename = basename($filePath);

                    $body .= "--{$boundary}\r\n";
                    $body .= "Content-Type: {$mime}; name=\"{$filename}\"\r\n";
                    $body .= "Content-Transfer-Encoding: base64\r\n";
                    $body .= "Content-ID: <{$cid}>\r\n";
                    $body .= "Content-Disposition: inline; filename=\"{$filename}\"\r\n\r\n";
                    $body .= $base64Data . "\r\n";
                }
            }

            $body .= "--{$boundary}--\r\n";
            $emailData = $headers . $body . "\r\n.\r\n";
        } else {
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
            $emailData = $headers . $htmlBody . "\r\n.\r\n";
        }

        fputs($socket, $emailData);
        $readResponse($socket, '250');

        $sendCommand($socket, 'QUIT', '221');
        fclose($socket);

        return [
            'success' => true,
            'simulated' => false,
            'message' => "ส่งอีเมลไปยัง {$toEmail} ผ่าน Gmail SMTP สำเร็จเรียบร้อยแล้ว!"
        ];

    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}
