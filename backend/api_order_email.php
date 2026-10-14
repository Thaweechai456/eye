<?php
// ============================================================================
// XCOCO Eyewear - API Order Transactional Email (api_order_email.php)
// ส่งอีเมลธุรกรรมยืนยันคำสั่งซื้อและใบเสร็จดิจิทัล (Digital Receipt) อัตโนมัติเมื่อกดสั่งซื้อ
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
require_once __DIR__ . '/email_templates.php';

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);
if (!$input) {
    $input = $_POST;
}

$email = trim($input['email'] ?? '');
$customerName = trim($input['customerName'] ?? 'คุณลูกค้า');
$orderId = trim($input['orderId'] ?? '#XC-' . rand(10000, 99999));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'กรุณาระบุอีเมลที่ถูกต้องสำหรับจัดส่งใบเสร็จ'
    ]);
    exit;
}

$config = require __DIR__ . '/mail_config.php';
$baseUrl = $config['base_url'] ?? 'https://thaweechai456.github.io/eye';

// เตรียมข้อมูล Order
$orderData = [
    'orderId' => $orderId,
    'customerName' => $customerName,
    'email' => $email,
    'deliveryAddress' => $input['deliveryAddress'] ?? 'จัดส่งตามที่อยู่ที่ระบุไว้กับทีมงาน',
    'items' => $input['items'] ?? [],
    'subtotal' => $input['subtotal'] ?? 0,
    'discountAmount' => $input['discountAmount'] ?? 0,
    'grandTotal' => $input['grandTotal'] ?? 0,
    'date' => $input['date'] ?? date('d M Y')
];

// สร้าง HTML อีเมลใบเสร็จ
$emailHtml = getOrderReceiptEmailTemplate($orderData, $baseUrl);
$subject = "ยืนยันคำสั่งซื้อ {$orderId} & ใบเสร็จรับเงินดิจิทัล - XCOCO Eyewear 👓";

// ส่งอีเมลผ่าน PHPMailer SMTP
$mailResult = sendXcocoEmail($email, $customerName, $subject, $emailHtml);

// บันทึกคำสั่งซื้อลงตาราง orders ใน MySQL
if (isset($pdo) && $pdo !== null) {
    try {
        $stmtOrder = $pdo->prepare("INSERT INTO orders (order_code, customer_name, email, phone, delivery_address, items_json, subtotal, discount_amount, grand_total, status) VALUES (:code, :name, :email, :phone, :addr, :items, :sub, :disc, :grand, 'pending')");
        $stmtOrder->execute([
            ':code' => $orderId,
            ':name' => $customerName,
            ':email' => $email,
            ':phone' => $input['phone'] ?? '',
            ':addr' => $orderData['deliveryAddress'],
            ':items' => json_encode($orderData['items'], JSON_UNESCAPED_UNICODE),
            ':sub' => $orderData['subtotal'],
            ':disc' => $orderData['discountAmount'],
            ':grand' => $orderData['grandTotal']
        ]);
    } catch (PDOException $e) {
        // Silently skip if DB error
    }

    // ซิงก์ยอดสะสม + ระดับสมาชิกในตาราง users ให้ตรงกับคำสั่งซื้อจริง
    // (หน้าแอดมินอ่านค่านี้ ถ้าไม่อัปเดตจะค้าง 0/Classic ตลอดไป)
    try {
        $grand = (float)($orderData['grandTotal'] ?? 0);
        if ($grand > 0 && !empty($email)) {
            $stmtSync = $pdo->prepare("UPDATE users SET total_spent = COALESCE(total_spent, 0) + :grand WHERE email = :email");
            $stmtSync->execute([':grand' => $grand, ':email' => $email]);

            $stmtSum = $pdo->prepare("SELECT COALESCE(SUM(grand_total), 0) FROM orders WHERE email = :email AND status != 'cancelled'");
            $stmtSum->execute([':email' => $email]);
            $lifetime = (float)$stmtSum->fetchColumn();
            $tier = ($lifetime >= 3500) ? 'VIP Member' : (($lifetime >= 1500) ? 'Silver Member' : 'Classic Member');

            $stmtTier = $pdo->prepare("UPDATE users SET member_tier = :tier WHERE email = :email");
            $stmtTier->execute([':tier' => $tier, ':email' => $email]);
        }
    } catch (PDOException $e) {
        // Silently skip if DB error
    }
}

echo json_encode([
    'success' => $mailResult['success'] ?? true,
    'message' => 'ส่งใบเสร็จคำสั่งซื้อไปยัง ' . $email . ' สำเร็จเรียบร้อยแล้ว!',
    'order_id' => $orderId,
    'mail_result' => $mailResult
]);
