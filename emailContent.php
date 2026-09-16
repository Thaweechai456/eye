<?php
// ============================================================================
// emailContent.php - ไฟล์เนื้อหาอีเมลตามแนวทางอาจารย์ (วิชา การตลาดดิจิทัล)
// ============================================================================

// แนบรูปภาพโปสเตอร์สินค้าแนะนำสำหรับลูกค้าใหม่ด้วย CID Inline Embedding
$posterPath = __DIR__ . '/assets/images/email_content_subscribe.jpg';
if (file_exists($posterPath)) {
    $mail->addEmbeddedImage($posterPath, 'poster_img');
}

// หรือแนบรูปแว่นตาแนะนำเพิ่มเติม
$glassesPath = __DIR__ . '/assets/images/glasses_oversized_gold.jpg';
if (file_exists($glassesPath)) {
    $mail->addEmbeddedImage($glassesPath, 'glasses_img');
}

$receiverEmailDisplay = htmlspecialchars($email);

$bodyContent = '
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>ยินดีต้อนรับสู่ XCOCO Eyewear</title>
</head>
<body style="margin: 0; padding: 25px 12px; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Prompt\', Helvetica, Arial, sans-serif; color: #ededed;">
  
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0c0e;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: 0 auto; background-color: #141416; border: 1px solid #232328; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.85);">
          
          <!-- Brand Header -->
          <tr>
            <td align="center" style="padding: 30px 24px 12px;">
              <div style="font-size: 11px; color: #71717a; letter-spacing: 2px; text-transform: uppercase;">XCOCO EYEWEAR</div>
              <div style="font-size: 26px; font-weight: 800; letter-spacing: 3px; color: #ffffff; text-transform: uppercase; margin-top: 4px;">XCOCO</div>
              <div style="font-size: 12px; color: #a1a1aa; margin-top: 4px;">เห็นชัด ในแบบของคุณ</div>
            </td>
          </tr>

          <!-- Welcome Title -->
          <tr>
            <td style="padding: 10px 28px 16px; text-align: center;">
              <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #ffffff;">
                ยินดีต้อนรับสู่ XCOCO Eyewear ✨
              </h2>
              <p style="margin: 0 0 8px; font-size: 13.5px; color: #d4d4d8; line-height: 1.6;">
                อีเมล <strong style="color: #ffffff; text-decoration: underline;">' . $receiverEmailDisplay . '</strong> ได้รับการบันทึกในรายชื่อสมาชิกเรียบร้อยแล้ว
              </p>
              <p style="margin: 0; font-size: 13px; color: #a1a1aa; line-height: 1.5;">
                ต่อจากนี้คุณจะได้รับข่าวสารกรอบแว่นคอลเลกชันใหม่ เทคนิคการดูแลสายตา และโปรโมชั่นสุดพิเศษก่อนใคร
              </p>
            </td>
          </tr>

          <!-- Poster Image with CID Embedding (ตามข้อกำหนดของอาจารย์) -->
          <tr>
            <td align="center" style="padding: 8px 24px 20px;">
              <div style="border-radius: 14px; overflow: hidden; border: 1px solid #2a2a32; box-shadow: 0 12px 30px rgba(0,0,0,0.6);">
                <img src="cid:poster_img" alt="XCOCO สินค้าแนะนำสำหรับลูกค้าใหม่" width="100%" style="display: block; width: 100%; max-width: 480px; height: auto; border: none;">
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td align="center" style="padding: 0 28px 28px;">
              <a href="http://localhost/eye/#products" target="_blank" style="display: block; width: 85%; max-width: 300px; background-color: #ffffff; color: #000000; text-align: center; text-decoration: none; padding: 14px 0; border-radius: 9999px; font-weight: 700; font-size: 14.5px; letter-spacing: 0.3px; box-shadow: 0 6px 20px rgba(255,255,255,0.18);">
                เริ่มเลือกชมแว่นตา 👓
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #0d0d0f; padding: 20px; border-top: 1px solid #1f1f26; font-size: 11px; color: #71717a;">
              <div>XCOCO Eyewear · เห็นชัด ในแบบของคุณ</div>
              <div style="margin-top: 4px;">© 2026 XCOCO Eyewear Inc. All rights reserved.</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
';
