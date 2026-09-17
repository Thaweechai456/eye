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
  <a href="?type=subscribe" style="display: inline-block; padding: 6px 14px; border-radius: 6px; font-size: 13px; text-decoration: none; font-weight: 600; margin-right: 8px; <?= $type === 'subscribe' ? 'background: #ffffff; color: #000000;' : 'background: #27272a; color: #e4e4e7;' ?>">
    📬 อีเมลรับข่าวสาร (Subscribe)
  </a>
  <a href="?type=order" style="display: inline-block; padding: 6px 14px; border-radius: 6px; font-size: 13px; text-decoration: none; font-weight: 600; <?= $type === 'order' ? 'background: #ffffff; color: #000000;' : 'background: #27272a; color: #e4e4e7;' ?>">
    🧾 อีเมลธุรกรรมใบเสร็จสั่งซื้อ (Order Receipt)
  </a>
  <a href="../index.html" style="display: inline-block; padding: 6px 14px; border-radius: 6px; font-size: 13px; text-decoration: none; color: #71717a; margin-left: 15px;">
    ← กลับหน้าร้าน
  </a>
</div>

<?php
if ($type === 'register') {
    echo getRegisterEmailTemplate($demoUser, 'https://thaweechai456.github.io/eye', true);
} elseif ($type === 'order') {
    $demoOrder = [
        'orderId' => '#XC-88921',
        'customerName' => 'คุณสมชาย สายตาดี',
        'email' => 'robloxmakethegame123@gmail.com',
        'deliveryAddress' => '123/45 หมู่ 6 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110 (โทร 081-234-5678)',
        'items' => [
            [
                'name' => 'Titanium Hexagon Modern (กรอบไทเทเนียม)',
                'quantity' => 1,
                'unitPrice' => 1590,
                'rxSummary' => 'ขวา: SPH -1.50, CYL -0.50, AXIS 90 / ซ้าย: SPH -1.50'
            ],
            [
                'name' => 'Nano Anti-Fog Lens Cleaner Kit',
                'quantity' => 1,
                'unitPrice' => 390,
                'rxSummary' => ''
            ]
        ],
        'subtotal' => 1980,
        'discountAmount' => 198,
        'grandTotal' => 1782,
        'date' => date('d M Y')
    ];
    echo getOrderReceiptEmailTemplate($demoOrder, 'https://thaweechai456.github.io/eye');
} else {
    echo getSubscribeEmailTemplate('customer@example.com', 'https://thaweechai456.github.io/eye', true);
}
?>
