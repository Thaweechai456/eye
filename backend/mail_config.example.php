<?php
// ============================================================================
// XCOCO Eyewear - Gmail SMTP Configuration Template (mail_config.example.php)
// Copy this file to mail_config.php and fill in your real credentials
// ============================================================================

return [
    // ข้อมูลเซิร์ฟเวอร์ SMTP
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    
    // บัญชี Gmail ของคุณ
    'smtp_user' => 'your_email@gmail.com', 
    'smtp_pass' => 'your_16_char_app_password', // รหัสผ่านแอป 16 หลักจาก Google App Passwords
    
    // ข้อมูลผู้ส่งที่แสดงในอีเมล
    'from_email' => 'your_email@gmail.com',
    'from_name'  => 'XCOCO Eyewear',

    // URL ของเว็บไซต์
    'base_url'   => 'http://localhost/eye',
    
    // โหมดจำลอง (true = บันทึก log แทนการส่งจริง, false = ส่งจริง)
    'simulate_mode' => false
];
