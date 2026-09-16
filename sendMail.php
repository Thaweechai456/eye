<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// โหลดไฟล์ class ตามโครงสร้างอาจารย์
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

// ดึงค่าการตั้งค่าจาก mail_config.php เพื่อความปลอดภัย (ไม่เปิดเผยรหัสผ่านบน Git)
$config = file_exists(__DIR__ . '/backend/mail_config.php') ? require __DIR__ . '/backend/mail_config.php' : [];
$smtpUser = !empty($config['smtp_user']) ? $config['smtp_user'] : 'your_email@gmail.com';
$smtpPass = !empty($config['smtp_pass']) ? str_replace(' ', '', $config['smtp_pass']) : 'your_app_password';

// ตรวจสอบการส่งข้อมูลผ่าน POST ที่ส่งจากฟอร์ม subscribe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    if ($email) {
        $mail = new PHPMailer(true);
        try {
            // ตั้งค่า SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUser; // ระบุอีเมลล์ผู้ส่ง
            $mail->Password = $smtpPass; // ใช้ app password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->CharSet = 'UTF-8'; // รองรับภาษาไทย

            $mail->setFrom($smtpUser, '👓 XCOCO Eyewear'); // ระบุ email ผู้ส่งเป็นชื่อร้านค้า
            
            // อีเมลล์ผู้รับ (รับตัวแปรจากฟอร์ม subscribe)
            $mail->addAddress($email);

            include "emailContent.php";

            $mail->isHTML(true);
            $mail->Subject = '✨ ยินดีต้อนรับสู่ XCOCO Eyewear - สิทธิพิเศษและข่าวสารสำหรับคุณ';
            $mail->Body = $bodyContent;
            $mail->send();

            file_put_contents("subscribers.txt", $email . "\n", FILE_APPEND);

            // บันทึกลงฐานข้อมูล MySQL (ถ้ามีตาราง subscribers)
            if (file_exists(__DIR__ . '/backend/db.php')) {
                require_once __DIR__ . '/backend/db.php';
                if (isset($pdo) && $pdo !== null) {
                    try {
                        $stmt = $pdo->prepare("INSERT INTO subscribers (email) VALUES (:email) ON DUPLICATE KEY UPDATE subscribed_at = CURRENT_TIMESTAMP");
                        $stmt->execute([':email' => $email]);
                    } catch (\Exception $dbEx) {
                        // ignore if table not created
                    }
                }
            }

            // ถ้าส่งมาจาก Fetch / AJAX ให้ตอบกลับเป็น JSON
            if (!empty($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode([
                    'success' => true,
                    'message' => "Subscription สำเร็จ. คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์: $email"
                ]);
                exit;
            }

            // แสดงผลลัพธ์ข้อความตามแนวทางอาจารย์พร้อมดีไซน์สวยงาม
            echo "<!DOCTYPE html><html lang='th'><head><meta charset='UTF-8'><title>Subscription สำเร็จ</title>";
            echo "<link href='https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700&display=swap' rel='stylesheet'>";
            echo "<style>body{font-family:'Prompt',sans-serif;background:#0c0c0e;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;padding:20px;}";
            echo ".box{background:#18181b;border:1px solid #27272a;border-radius:20px;padding:36px;max-width:480px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.6);}";
            echo ".msg{font-size:17px;line-height:1.6;color:#e4e4e7;margin:18px 0 24px;}";
            echo ".btn{display:inline-block;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.2s;}";
            echo ".btn-main{background:#fff;color:#000;margin-left:10px;}.btn-sub{background:#27272a;color:#a1a1aa;}</style></head><body>";
            echo "<div class='box'>";
            echo "<div style='font-size:48px;margin-bottom:12px;'>✔️</div>";
            echo "<h2 style='margin:0;color:#22c55e;'>Subscription สำเร็จ</h2>";
            echo "<div class='msg'>คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์: <strong style='color:#38bdf8;word-break:break-all;'>$email</strong></div>";
            echo "<div><a href='subscribe_form.php' class='btn btn-sub'>← กลับหน้าฟอร์ม</a> <a href='index.html' class='btn btn-main'>ไปยังหน้าร้าน XCOCO 👓</a></div>";
            echo "</div></body></html>";

        } catch (Exception $e) {
            if (!empty($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode([
                    'success' => false,
                    'message' => "ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}"
                ]);
                exit;
            }
            echo "❌ เกิดข้อผิดพลาด : ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}";
        }
    } else {
        echo "⚠️ ไม่มีอีเมลล์นี้";
    }
} else {
    echo "Access Denied.";
}
?>
