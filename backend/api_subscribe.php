<?php
// ============================================================================
// XCOCO Eyewear - API Subscribe (api_subscribe.php)
// รับอีเมล -> บันทึกลง MySQL -> ส่งอีเมลขอบคุณพร้อมแนะนำสินค้า
// ============================================================================

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/mailer.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$email = trim($input['email'] ?? '');

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง'
    ]);
    exit;
}

$db_saved = false;
$db_msg = '';

// 1. บันทึกลงฐานข้อมูล MySQL
if (isset($pdo) && $pdo !== null) {
    try {
        $stmt = $pdo->prepare("INSERT INTO `subscribers` (`email`, `ip_address`) VALUES (:email, :ip) 
                               ON DUPLICATE KEY UPDATE `status` = 'active', `subscribed_at` = CURRENT_TIMESTAMP");
        $ip = $_SERVER['REMOTE_ADDR'] ?? '';
        $stmt->execute([':email' => $email, ':ip' => $ip]);
        $db_saved = true;
    } catch (PDOException $e) {
        $db_msg = 'บันทึก DB ไม่สำเร็จ: ' . $e->getMessage();
    }
}

// 2. สร้าง Content อีเมลตาม Template
$config = require __DIR__ . '/mail_config.php';
$baseUrl = $config['base_url'] ?? 'http://localhost/eye';
$emailHtml = getSubscribeEmailTemplate($email, $baseUrl);
$subject = 'ขอบคุณที่สมัครรับข่าวสาร - XCOCO Eyewear 👓✨';

// 3. ส่งอีเมลผ่าน SMTP (แนบภาพแบบ CID Inline Attachment ทำให้รูปโชว์ใน Gmail 100%)
$productImg = dirname(__DIR__) . '/assets/images/email_glasses_sub_opt.jpg';
$mailResult = sendXcocoEmail($email, 'Subscriber', $subject, $emailHtml, [
    'product_image' => $productImg
]);

echo json_encode([
    'success' => true,
    'message' => 'สมัครรับข่าวสารสำเร็จ! ระบบได้ส่งอีเมลแนะนำสินค้าและโปรโมชั่นไปยัง ' . $email . ' เรียบร้อยแล้ว',
    'db_saved' => $db_saved,
    'db_notice' => $db_msg,
    'mail_result' => $mailResult
]);
