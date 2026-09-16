<?php
// ============================================================================
// XCOCO Eyewear - Database Connection (db.php)
// ============================================================================

$db_host = 'localhost';
$db_name = 'xcoco_db';
$db_user = 'root';
$db_pass = '';
$db_port = 3306;

try {
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // สร้างตารางอัตโนมัติหากยังไม่มี
    $pdo->exec("CREATE TABLE IF NOT EXISTS `subscribers` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `status` ENUM('active', 'unsubscribed') DEFAULT 'active',
        `ip_address` VARCHAR(45) NULL,
        `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    $pdo->exec("CREATE TABLE IF NOT EXISTS `users` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(150) NOT NULL,
        `phone` VARCHAR(20) NOT NULL,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `birthdate` DATE NULL,
        `address` TEXT NULL,
        `password` VARCHAR(255) NOT NULL,
        `right_sph` VARCHAR(10) DEFAULT '0.00',
        `left_sph` VARCHAR(10) DEFAULT '0.00',
        `pd` INT DEFAULT 62,
        `member_tier` VARCHAR(50) DEFAULT 'Classic Member',
        `total_spent` DECIMAL(10,2) DEFAULT 0.00,
        `agreed_pdpa` TINYINT(1) DEFAULT 1,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
} catch (PDOException $e) {
    // ถ้ายังไม่ได้เชื่อมต่อฐานข้อมูล ให้ส่งสถานะ false เพื่อให้ระบบจัดการต่อไปได้
    $pdo = null;
    $db_error = $e->getMessage();
}
