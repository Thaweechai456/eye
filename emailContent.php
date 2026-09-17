<?php
// ============================================================================
// emailContent.php - ไฟล์เนื้อหาอีเมลตามแนวทางอาจารย์ (วิชา การตลาดดิจิทัล)
// ดีไซน์สวยงาม ตัวหนังสือจริง คัดลอกได้ แนบรูปสินค้าด้วย CID และปุ่มกดได้จริง 100%
// ============================================================================

// ดึงการตั้งค่า Base URL ของเว็บไซต์
$cfg = file_exists(__DIR__ . '/backend/mail_config.php') ? require __DIR__ . '/backend/mail_config.php' : [];
$baseUrl = !empty($cfg['base_url']) ? rtrim($cfg['base_url'], '/') : 'http://localhost/eye';
$shopUrl = $baseUrl . '/#products';
$quizUrl = $baseUrl . '/#quiz';

// 1. แนบรูปภาพสินค้าแนะนำสำหรับลูกค้าใหม่ด้วย CID Inline Embedding ตามโจทย์อาจารย์
$productImgPath = __DIR__ . '/assets/images/glasses_titanium_hexagon_1787762363088.jpg';
if (file_exists($productImgPath)) {
    $mail->addEmbeddedImage($productImgPath, 'product_img', 'titanium_hexagon.jpg');
}

$receiverEmailDisplay = htmlspecialchars($email);

// 2. สร้างโครงสร้างเนื้อหาอีเมลแบบ Responsive HTML แท้ (ตัวหนังสือจริง + ปุ่มคลิกได้จริง)
$bodyContent = '
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ขอบคุณที่สมัครรับข่าวสาร - XCOCO Eyewear</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Prompt\', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <div style="display: none; font-size: 1px; color: #0c0c0e; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ขอบคุณที่สมัครรับข่าวสาร XCOCO Eyewear พร้อมรับสิทธิพิเศษและเทคนิคการดูแลสายตาก่อนใคร
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0c0e; padding: 30px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: 0 auto; background-color: #141416; border: 1px solid #232328; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.85);">
          
          <!-- Brand Header -->
          <tr>
            <td align="center" style="padding: 32px 24px 14px;">
              <div style="font-size: 11px; color: #52525b; letter-spacing: 1.5px; margin-bottom: 12px; text-transform: uppercase;">XCOCO Eyewear</div>
              <div style="font-size: 26px; font-weight: 800; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">XCOCO</div>
              <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #a1a1aa; margin-top: 2px; text-transform: uppercase;">EYEWEAR</div>
              <div style="font-size: 13px; color: #71717a; margin-top: 6px;">เห็นชัด ในแบบของคุณ</div>
            </td>
          </tr>

          <!-- Title & Welcome Message -->
          <tr>
            <td style="padding: 14px 28px 20px; text-align: center;">
              <h2 style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;">
                ขอบคุณที่สมัครรับข่าวสาร ✨
              </h2>
              <p style="margin: 0 0 10px; font-size: 13.5px; color: #d4d4d8; line-height: 1.6;">
                อีเมล <strong style="color: #ffffff; text-decoration: underline;">' . $receiverEmailDisplay . '</strong> ได้รับการเพิ่มในรายชื่อสมาชิก XCOCO เรียบร้อยแล้ว
              </p>
              <p style="margin: 0; font-size: 13px; color: #a1a1aa; line-height: 1.5;">
                ต่อจากนี้คุณจะได้รับข่าวสารกรอบแว่นคอลเลกชันใหม่ เทคนิคการดูแลสายตา และโปรโมชั่นสุดพิเศษก่อนใครผ่านอีเมลนี้
              </p>
            </td>
          </tr>

          <!-- Tip Box: Face Shape Quiz (คลิกได้จริง) -->
          <tr>
            <td style="padding: 0 28px 22px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1f; border: 1px solid #2d2d36; border-radius: 12px; padding: 14px 16px;">
                <tr>
                  <td width="32" valign="middle" style="font-size: 22px; line-height: 1;">💡</td>
                  <td style="font-size: 12.5px; color: #e4e4e7; line-height: 1.5;">
                    <strong style="color: #ffffff;">แนะนำ:</strong> ใช้ตัวช่วย <a href="' . $quizUrl . '" target="_blank" style="color: #fcd34d; font-weight: 600; text-decoration: none;">Face Shape Quiz</a> บนเว็บไซต์ เพื่อค้นหากรอบแว่นที่เหมาะกับรูปหน้าของคุณได้อย่างมั่นใจ
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Recommended Product Showcase (รูปสินค้าเดี่ยว คมชัด ไม่ใช่รูปแคปทั้งอีเมล) -->
          <tr>
            <td style="padding: 0 28px 24px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1e; border: 1px solid #282830; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td align="center" style="padding: 20px; background-color: #ffffff;">
                    <img src="cid:product_img" alt="Titanium Hexagon Glasses" width="100%" style="display: block; max-width: 380px; height: auto; border: none; outline: none; margin: 0 auto;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">
                      👓 สินค้าแนะนำยอดนิยม: Titanium Hexagon
                    </div>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12.5px; color: #a1a1aa; line-height: 1.6; margin-bottom: 14px;">
                      <tr><td style="padding: 2px 0;">• <strong>รูปทรงกรอบ:</strong> ทรงหกเหลี่ยมโมเดิร์น (Modern Hexagon)</td></tr>
                      <tr><td style="padding: 2px 0;">• <strong>วัสดุ:</strong> ไทเทเนียมแท้ น้ำหนักเบาพิเศษเพียง 12 กรัม</td></tr>
                      <tr><td style="padding: 2px 0;">• <strong>คุณสมบัติ:</strong> ยืดหยุ่นสูง ไม่กดทับดั้งจมูก ใส่สบายตลอดวัน</td></tr>
                      <tr><td style="padding: 2px 0;">• <strong>การตัดเลนส์:</strong> รองรับสายตาสั้น / ยาว / เอียง / กรองแสงสีฟ้า</td></tr>
                    </table>
                    
                    <div style="display: flex; align-items: baseline; margin-top: 10px;">
                      <span style="font-size: 20px; font-weight: 800; color: #ffffff;">ราคา ฿1,590</span>
                      <span style="font-size: 13px; color: #71717a; text-decoration: line-through; margin-left: 8px;">฿2,200</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Two Real Interactive Action Buttons (กดได้จริงทั้ง 2 ปุ่ม) -->
          <tr>
            <td align="center" style="padding: 0 28px 30px;">
              <!-- ปุ่มที่ 1: ดูสินค้าที่แนะนำนี้ -->
              <a href="' . $shopUrl . '" target="_blank" style="display: block; width: 85%; max-width: 320px; background-color: #ffffff; color: #000000; text-align: center; text-decoration: none; padding: 14px 0; border-radius: 9999px; font-weight: 700; font-size: 14.5px; letter-spacing: 0.4px; box-shadow: 0 6px 20px rgba(255,255,255,0.18); cursor: pointer; margin-bottom: 12px;">
                ดูสินค้าที่แนะนำนี้ 👓
              </a>
              <!-- ปุ่มที่ 2: ดูสินค้าทั้งหมด -->
              <a href="' . $shopUrl . '" target="_blank" style="display: block; width: 85%; max-width: 320px; background-color: #1f1f26; border: 1px solid #33333f; color: #e4e4e7; text-align: center; text-decoration: none; padding: 13px 0; border-radius: 9999px; font-weight: 600; font-size: 14px; letter-spacing: 0.3px; cursor: pointer;">
                ดูสินค้าทั้งหมด 🛍️
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #0d0d0f; padding: 22px 20px; border-top: 1px solid #1f1f26;">
              <div style="font-size: 12px; color: #71717a; margin-bottom: 6px;">
                XCOCO Eyewear · เห็นชัด ในแบบของคุณ
              </div>
              <div style="font-size: 11px; color: #52525b;">
                © 2026 XCOCO Eyewear Inc. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
';
