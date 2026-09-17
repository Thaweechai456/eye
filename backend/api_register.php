<?php
// ============================================================================
// XCOCO Eyewear - API Register (api_register.php)
// รับข้อมูลสมัครสมาชิก -> บันทึกลง MySQL -> ส่งอีเมลยืนยันข้อมูลสมาชิก
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

$name = trim($input['name'] ?? '');
$phone = trim($input['phone'] ?? '');
$email = trim($input['email'] ?? '');
$birthdate = trim($input['birthdate'] ?? '');
$address = trim($input['address'] ?? '');
$password = trim($input['password'] ?? '');
$rightSph = trim($input['right_sph'] ?? '-1.50');
$leftSph = trim($input['left_sph'] ?? '-1.50');
$pd = (int)($input['pd'] ?? 62);

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'กรุณากรอกข้อมูลที่จำเป็น (ชื่อ, อีเมล, รหัสผ่าน) ให้ครบถ้วน'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'รูปแบบอีเมลไม่ถูกต้อง'
    ]);
    exit;
}

$db_saved = false;
$userId = null;
$db_msg = '';

// 1. ตรวจสอบและบันทึกลง MySQL
if (isset($pdo) && $pdo !== null) {
    try {
        // เช็คว่ามีอีเมลนี้อยู่แล้วหรือไม่
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
        $checkStmt->execute([':email' => $email]);
        if ($checkStmt->fetch()) {
            echo json_encode([
                'success' => false,
                'message' => 'อีเมลนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบ หรือใช้อีเมลอื่น'
            ]);
            exit;
        }

        // แฮชรหัสผ่านเพื่อความปลอดภัย (BCRYPT)
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("
            INSERT INTO users (name, phone, email, birthdate, address, password, right_sph, left_sph, pd, member_tier, total_spent)
            VALUES (:name, :phone, :email, :birthdate, :address, :password, :right_sph, :left_sph, :pd, 'Classic Member', 0.00)
        ");

        $stmt->execute([
            ':name'      => $name,
            ':phone'     => $phone,
            ':email'     => $email,
            ':birthdate' => !empty($birthdate) ? $birthdate : null,
            ':address'   => $address,
            ':password'  => $hashedPassword,
            ':right_sph' => $rightSph,
            ':left_sph'  => $leftSph,
            ':pd'        => $pd > 0 ? $pd : 62
        ]);

        $userId = $pdo->lastInsertId();
        $db_saved = true;

    } catch (PDOException $e) {
        $db_msg = 'บันทึก DB ไม่สำเร็จ: ' . $e->getMessage();
    }
}

// 2. สร้าง Content อีเมลต้อนรับสมาชิกใหม่
$config = require __DIR__ . '/mail_config.php';
$baseUrl = $config['base_url'] ?? 'https://thaweechai456.github.io/eye';

$userData = [
    'name'      => $name,
    'email'     => $email,
    'phone'     => $phone,
    'birthdate' => $birthdate,
    'address'   => $address,
    'right_sph' => $rightSph,
    'left_sph'  => $leftSph,
    'pd'        => $pd > 0 ? $pd : 62
];

$emailHtml = getRegisterEmailTemplate($userData, $baseUrl);
$subject = 'ยินดีต้อนรับคุณ ' . $name . ' สู่สมาชิก XCOCO Eyewear 🎉';

// 3. ส่งอีเมลผ่าน SMTP (แนบภาพแบบ CID Inline Attachment ทำให้รูปโชว์ใน Gmail 100%)
$showcaseImg = dirname(__DIR__) . '/assets/images/glasses_inner_showcase.jpg';
$mailResult = sendXcocoEmail($email, $name, $subject, $emailHtml, [
    'showcase_image' => $showcaseImg
]);

echo json_encode([
    'success' => true,
    'message' => 'สมัครสมาชิกสำเร็จ! ยินดีต้อนรับสู่ XCOCO เราได้ส่งอีเมลยืนยันข้อมูลไปยัง ' . $email . ' แล้ว',
    'user' => [
        'id'        => $userId,
        'name'      => $name,
        'email'     => $email,
        'phone'     => $phone,
        'birthdate' => $birthdate,
        'address'   => $address,
        'right_sph' => $rightSph,
        'left_sph'  => $leftSph,
        'pd'        => $pd > 0 ? $pd : 62,
        'member_tier' => 'Classic Member',
        'total_spent' => 0.00
    ],
    'db_saved' => $db_saved,
    'db_notice' => $db_msg,
    'mail_result' => $mailResult
]);
