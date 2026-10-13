<?php
// ============================================================================
// XCOCO Eyewear - API Admin Management (api_admin.php)
// จัดการข้อมูลหลังบ้าน: สมาชิก, การลบบัญชี, คำสั่งซื้อ, สถิติร้านค้า
// ============================================================================

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?: $_POST;

if (empty($action)) {
    $action = $input['action'] ?? 'get_stats';
}

switch ($action) {

    // ------------------------------------------------------------------------
    // 1. ดึงสถิติภาพรวมร้านค้า (Stats Overview)
    // ------------------------------------------------------------------------
    case 'get_stats':
        $stats = [
            'total_users' => 0,
            'total_orders' => 0,
            'total_subscribers' => 0,
            'total_revenue' => 0
        ];

        if (isset($pdo) && $pdo !== null) {
            try {
                // จำนวนสมาชิก
                $stmt = $pdo->query("SELECT COUNT(*) FROM users WHERE role != 'admin'");
                $stats['total_users'] = (int) $stmt->fetchColumn();

                // จำนวนคำสั่งซื้อ
                $stmt = $pdo->query("SELECT COUNT(*), COALESCE(SUM(grand_total), 0) FROM orders WHERE status != 'cancelled'");
                $row = $stmt->fetch(PDO::FETCH_NUM);
                $stats['total_orders'] = (int) ($row[0] ?? 0);
                $stats['total_revenue'] = (float) ($row[1] ?? 0);

                // จำนวน Subscribers
                $stmt = $pdo->query("SELECT COUNT(*) FROM subscribers WHERE status = 'active'");
                $stats['total_subscribers'] = (int) $stmt->fetchColumn();
            } catch (PDOException $e) {
                // Fallback stats
            }
        } else {
            // Mock Fallback
            $stats['total_users'] = 8;
            $stats['total_orders'] = 14;
            $stats['total_subscribers'] = 25;
            $stats['total_revenue'] = 24900;
        }

        echo json_encode([
            'success' => true,
            'stats' => $stats
        ]);
        break;

    // ------------------------------------------------------------------------
    // 2. ดึงรายชื่อสมาชิกทั้งหมด (Get Users)
    // ------------------------------------------------------------------------
    case 'get_users':
        $users = [];
        if (isset($pdo) && $pdo !== null) {
            try {
                $stmt = $pdo->query("SELECT id, name, phone, email, birthdate, address, right_sph, left_sph, pd, member_tier, total_spent, role, created_at FROM users ORDER BY id DESC");
                $users = $stmt->fetchAll();
            } catch (PDOException $e) {
                $users = [];
            }
        }

        // หากยังไม่มีข้อมูลใน DB ให้ส่ง Mock Users เป็น fallback
        if (empty($users)) {
            $users = [
                [
                    'id' => 1,
                    'name' => 'คุณสมชาย สายตาดี',
                    'email' => 'demo@xcoco.com',
                    'phone' => '0812345678',
                    'birthdate' => '1998-05-15',
                    'address' => '123/45 แขวงคลองเตย กรุงเทพฯ 10110',
                    'right_sph' => '-1.50',
                    'left_sph' => '-1.50',
                    'pd' => 62,
                    'member_tier' => 'Gold Member',
                    'total_spent' => 4500.00,
                    'role' => 'customer',
                    'created_at' => date('Y-m-d H:i:s', strtotime('-10 days'))
                ],
                [
                    'id' => 2,
                    'name' => 'คุณพิมพ์นารา มั่นคง',
                    'email' => 'pimnara@example.com',
                    'phone' => '0898765432',
                    'birthdate' => '2000-08-20',
                    'address' => '55/9 ถ.พหลโยธิน จ.ปทุมธานี 12120',
                    'right_sph' => '-2.25',
                    'left_sph' => '-2.00',
                    'pd' => 60,
                    'member_tier' => 'Silver Member',
                    'total_spent' => 2180.00,
                    'role' => 'customer',
                    'created_at' => date('Y-m-d H:i:s', strtotime('-5 days'))
                ],
                [
                    'id' => 3,
                    'name' => 'คุณธนภัทร รุ่งเรือง',
                    'email' => 'thanapat@example.com',
                    'phone' => '0865551234',
                    'birthdate' => '1995-12-04',
                    'address' => '999 อาคารสุขุมวิทการ์เดน กรุงเทพฯ 10110',
                    'right_sph' => '-0.75',
                    'left_sph' => '-0.75',
                    'pd' => 64,
                    'member_tier' => 'VIP Member',
                    'total_spent' => 7890.00,
                    'role' => 'customer',
                    'created_at' => date('Y-m-d H:i:s', strtotime('-2 days'))
                ]
            ];
        }

        echo json_encode([
            'success' => true,
            'users' => $users,
            'count' => count($users)
        ]);
        break;

    // ------------------------------------------------------------------------
    // 3. ลบบัญชีผู้ใช้งาน / สมาชิก (Delete User with Protection)
    // ------------------------------------------------------------------------
    case 'delete_user':
        $targetUserId = (int) ($input['id'] ?? $_GET['id'] ?? 0);

        if ($targetUserId <= 0) {
            echo json_encode([
                'success' => false,
                'message' => 'ระบุรหัสสมาชิกที่ต้องการลบไม่ถูกต้อง'
            ]);
            exit;
        }

        if (isset($pdo) && $pdo !== null) {
            try {
                // ตรวจสอบข้อมูลผู้ใช้เป้าหมายก่อน
                $stmt = $pdo->prepare("SELECT id, name, email, role FROM users WHERE id = :id LIMIT 1");
                $stmt->execute([':id' => $targetUserId]);
                $targetUser = $stmt->fetch();

                if (!$targetUser) {
                    echo json_encode([
                        'success' => false,
                        'message' => 'ไม่พบบัญชีผู้ใช้งานที่ต้องการลบ หรืออาจถูกลบไปแล้ว'
                    ]);
                    exit;
                }

                // การป้องกันความปลอดภัย: ห้ามลบบัญชีแอดมิน
                if ($targetUser['role'] === 'admin') {
                    echo json_encode([
                        'success' => false,
                        'message' => '⚠️ ไม่สามารถลบบัญชีผู้ดูแลระบบ (Admin) ได้ เพื่อความปลอดภัย'
                    ]);
                    exit;
                }

                // ดำเนินการลบบัญชี
                $delStmt = $pdo->prepare("DELETE FROM users WHERE id = :id AND role != 'admin'");
                $delStmt->execute([':id' => $targetUserId]);

                echo json_encode([
                    'success' => true,
                    'message' => "ลบบัญชีของ '{$targetUser['name']}' ({$targetUser['email']}) เรียบร้อยแล้ว",
                    'deleted_id' => $targetUserId
                ]);
                exit;
            } catch (PDOException $e) {
                echo json_encode([
                    'success' => false,
                    'message' => 'เกิดข้อผิดพลาดในการลบข้อมูล: ' . $e->getMessage()
                ]);
                exit;
            }
        } else {
            // Standalone Demo Success
            echo json_encode([
                'success' => true,
                'message' => "ลบบัญชีสมาชิก ID #{$targetUserId} เรียบร้อยแล้ว (Demo Mode)",
                'deleted_id' => $targetUserId
            ]);
        }
        break;

    // ------------------------------------------------------------------------
    // 4. ดึงรายการคำสั่งซื้อทั้งหมด (Get Orders)
    // ------------------------------------------------------------------------
    case 'get_orders':
        $orders = [];
        if (isset($pdo) && $pdo !== null) {
            try {
                $stmt = $pdo->query("SELECT * FROM orders ORDER BY id DESC LIMIT 50");
                $orders = $stmt->fetchAll();
                foreach ($orders as &$ord) {
                    $ord['items'] = json_decode($ord['items_json'] ?? '[]', true);
                }
            } catch (PDOException $e) {
                $orders = [];
            }
        }

        echo json_encode([
            'success' => true,
            'orders' => $orders
        ]);
        break;

    // ------------------------------------------------------------------------
    // 5. อัปเดตสถานะคำสั่งซื้อและเลขพัสดุ (Update Order Status)
    // ------------------------------------------------------------------------
    case 'update_order_status':
        $orderCode = trim($input['order_code'] ?? '');
        $status = trim($input['status'] ?? 'pending');
        $trackingNumber = trim($input['tracking_number'] ?? '');

        if (empty($orderCode)) {
            echo json_encode(['success' => false, 'message' => 'ไม่พบรหัสคำสั่งซื้อ']);
            exit;
        }

        if (isset($pdo) && $pdo !== null) {
            try {
                $stmt = $pdo->prepare("UPDATE orders SET status = :status, tracking_number = :track, updated_at = NOW() WHERE order_code = :code");
                $stmt->execute([
                    ':status' => $status,
                    ':track' => $trackingNumber,
                    ':code' => $orderCode
                ]);
                echo json_encode(['success' => true, 'message' => 'อัปเดตสถานะคำสั่งซื้อสำเร็จ']);
                exit;
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => $e->getMessage()]);
                exit;
            }
        }

        echo json_encode(['success' => true, 'message' => 'อัปเดตสถานะสำเร็จ (Demo Mode)']);
        break;

    // ------------------------------------------------------------------------
    // 6. ดึงรายชื่อผู้ติดตามข่าวสาร (Get Subscribers)
    // ------------------------------------------------------------------------
    case 'get_subscribers':
        $subs = [];
        if (isset($pdo) && $pdo !== null) {
            try {
                $stmt = $pdo->query("SELECT id, email, status, subscribed_at FROM subscribers ORDER BY id DESC LIMIT 100");
                $subs = $stmt->fetchAll();
            } catch (PDOException $e) {
                $subs = [];
            }
        }

        // ตรวจสอบไฟล์ subscribers.txt สำรอง
        $txtFile = __DIR__ . '/../subscribers.txt';
        if (empty($subs) && file_exists($txtFile)) {
            $lines = file($txtFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $idx = 1;
            foreach ($lines as $line) {
                if (filter_var(trim($line), FILTER_VALIDATE_EMAIL)) {
                    $subs[] = [
                        'id' => $idx++,
                        'email' => trim($line),
                        'status' => 'active',
                        'subscribed_at' => date('Y-m-d H:i:s')
                    ];
                }
            }
        }

        echo json_encode([
            'success' => true,
            'subscribers' => $subs
        ]);
        break;

    default:
        echo json_encode([
            'success' => false,
            'message' => 'Action ไม่ถูกต้อง'
        ]);
        break;
}
