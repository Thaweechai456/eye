-- ============================================================================
-- XCOCO Eyewear - MySQL Database Schema
-- Database: `xcoco_db`
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `xcoco_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `xcoco_db`;

-- ----------------------------------------------------------------------------
-- 1. Table: `subscribers` (สำหรับเก็บรายชื่อผู้ติดตามข่าวสาร / Newsletter)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `status` ENUM('active', 'unsubscribed') DEFAULT 'active',
  `ip_address` VARCHAR(45) NULL,
  `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Table: `users` (สำหรับเก็บข้อมูลสมาชิก, ที่อยู่ และค่าสายตา)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
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
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Mock Data ตัวอย่างเริ่มต้น
-- ----------------------------------------------------------------------------
-- ข้อมูลตัวอย่าง Subscriber
INSERT IGNORE INTO `subscribers` (`id`, `email`) VALUES
(1, 'demo@xcoco.com');

-- ข้อมูลตัวอย่าง User (รหัสผ่าน 1234 แฮชด้วย BCRYPT)
INSERT IGNORE INTO `users` (`id`, `name`, `phone`, `email`, `birthdate`, `address`, `password`, `right_sph`, `left_sph`, `pd`) VALUES
(1, 'คุณสมชาย สายตาดี', '0812345678', 'demo@xcoco.com', '1998-05-15', '123/45 หมู่ 6 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', '$2y$10$w8T.N0V35m0/Q.sYp17iROv79.xY/UeO3pD1b6iQfO118/K8H0v8e', '-1.50', '-1.50', 62);
