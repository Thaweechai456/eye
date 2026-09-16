<?php
// ============================================================================
// XCOCO Eyewear - SMTP Mailer Helper (mailer.php)
// ใช้งานคลาส PHPMailer อย่างเป็นทางการตามแนวทางอาจารย์ (วิชา การตลาดดิจิทัล)
// ============================================================================

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once dirname(__DIR__) . '/PHPMailer/src/PHPMailer.php';
require_once dirname(__DIR__) . '/PHPMailer/src/SMTP.php';
require_once dirname(__DIR__) . '/PHPMailer/src/Exception.php';
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
            'message' => "จำลองการส่งอีเมลไปยัง {$toEmail} สำเร็จ",
            'preview_file' => 'mail_logs/' . basename($filename)
        ];
    }

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'] ?? 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_user'];
        $mail->Password = str_replace(' ', '', $config['smtp_pass']);
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = (int)($config['smtp_port'] ?? 587);
        $mail->CharSet = 'UTF-8';

        $fromEmail = !empty($config['from_email']) ? $config['from_email'] : $config['smtp_user'];
        $fromName  = !empty($config['from_name']) ? $config['from_name'] : '👓 XCOCO Eyewear';
        $mail->setFrom($fromEmail, $fromName);

        $mail->addAddress($toEmail, $toName);

        // แนบไฟล์ภาพ Inline แบบ CID
        if (!empty($attachments)) {
            foreach ($attachments as $cid => $filePath) {
                if (file_exists($filePath)) {
                    $mail->addEmbeddedImage($filePath, $cid, basename($filePath));
                }
            }
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $htmlBody;

        $mail->send();

        return [
            'success' => true,
            'message' => "ส่งอีเมลไปยัง {$toEmail} สำเร็จเรียบร้อยแล้ว!"
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => "ส่งอีเมลไม่สำเร็จ: " . $mail->ErrorInfo
        ];
    }
}
