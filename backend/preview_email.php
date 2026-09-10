<?php
// ============================================================================
// XCOCO Eyewear - Live Email Template Previewer (preview_email.php)
// ใช้สำหรับดูตัวอย่างหน้าตาอีเมลจริงในเบราว์เซอร์ และใช้พรีเซนต์ส่งงานอาจารย์
// ============================================================================

require_once __DIR__ . '/email_templates.php';

$type = $_GET['type'] ?? 'register';

$demoUser = [
    'name'        => 'คุณสมชาย สายตาดี',
    'email'       => 'robloxmakethegame123@gmail.com',
    'phone'       => '081-234-5678',
    'birthdate'   => '1998-05-15',
    'address'     => '123/45 หมู่ 6 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
    'right_sph'   => '-1.50',
    'left_sph'    => '-1.50',
    'pd'          => 62,
    'member_tier' => 'VIP Member'
];

?>
<!-- Top Navigation Toolbar for Easy Review -->
<div style="background: #18181b; padding: 10px 20px; border-bottom: 1px solid #27272a; text-align: center; font-family: sans-serif; position: sticky; top: 0; z-index: 9999;">
  <span style="color: #a1a1aa; font-size: 13px; margin-right: 15px;">🔍 เลือกดูตัวอย่างอีเมล:</span>
  <a href="?type=register" style="display: inline-block; padding: 6px 14px; border-radius: 6px; font-size: 13px; text-decoration: none; font-weight: 600; margin-right: 8px; <?= $type === 'register' ? 'background: #ffffff; color: #000000;' : 'background: #27272a; color: #e4e4e7;' ?>">
    📧 อีเมลต้อนรับสมาชิกใหม่ (Register)
  </a>
  <a href="?type=subscribe" style="display: inline-block; padding: 6px 14px; border-radius: 6px; font-size: 13px; text-decoration: none; font-weight: 600; <?= $type === 'subscribe' ? 'background: #ffffff; color: #000000;' : 'background: #27272a; color: #e4e4e7;' ?>">
    📬 อีเมลรับข่าวสาร (Subscribe)
  </a>
  <a href="../index.html" style="display: inline-block; padding: 6px 14px; border-radius: 6px; font-size: 13px; text-decoration: none; color: #71717a; margin-left: 15px;">
    ← กลับหน้าร้าน
  </a>
</div>

<?php
if ($type === 'register') {
    echo getRegisterEmailTemplate($demoUser, '../index.html', true);
} else {
    echo getSubscribeEmailTemplate('customer@example.com', '../index.html', true);
}
?>
