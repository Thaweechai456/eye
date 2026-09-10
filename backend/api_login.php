<?php
// ============================================================================
// XCOCO Eyewear - API Login (api_login.php)
// ตรวจสอบข้อมูลอีเมลและรหัสผ่านจาก MySQL
// ============================================================================

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');

if (empty($email) || empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'กรุณากรอกอีเมลและรหัสผ่าน'
    ]);
    exit;
}

// 1. ตรวจสอบใน MySQL
if (isset($pdo) && $pdo !== null) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']); // ไม่ส่งรหัสผ่านกลับไป
            echo json_encode([
                'success' => true,
                'message' => 'เข้าสู่ระบบสำเร็จ!',
                'user' => $user
            ]);
            exit;
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
            ]);
            exit;
        }
    } catch (PDOException $e) {
        // กรณีเกิดข้อผิดพลาด ให้ลองตรวจสอบบัญชีเดโม่
    }
}

// 2. Demo Fallback ถ้ายังไม่ได้เชื่อม MySQL
if ($email === 'demo@xcoco.com' && $password === '1234') {
    echo json_encode([
        'success' => true,
        'message' => 'เข้าสู่ระบบสำเร็จ (Demo Account)',
        'user' => [
            'name' => 'คุณสมชาย สายตาดี',
            'email' => 'demo@xcoco.com',
            'phone' => '0812345678',
            'birthdate' => '1998-05-15',
            'address' => '123/45 หมู่ 6 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
            'right_sph' => '-1.50',
            'left_sph' => '-1.50',
            'pd' => 62,
            'member_tier' => 'Classic Member',
            'total_spent' => 0.00
        ]
    ]);
    exit;
}

echo json_encode([
    'success' => false,
    'message' => 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
]);
