<?php
// ============================================================================
// XCOCO Eyewear - Luxury Email Templates (Pure Dynamic HTML/CSS)
// ดีไซน์หรูหรา ไร้รอยต่อ ตัวหนังสือจริง คัดลอกได้ และปุ่มคลิกเฉพาะจุด
// ============================================================================

/**
 * 1. Template สำหรับอีเมล Subscribe ข่าวสาร (Luxury Edition)
 */
function getSubscribeEmailTemplate($subscriberEmail, $baseUrl = 'http://localhost/eye', $isWebPreview = false) {
    $imgProduct = $isWebPreview ? 'assets/images/email_glasses_sub_opt.jpg' : 'cid:product_image';
    $targetShop = rtrim($baseUrl, '/') . '#products';
    $targetQuiz = rtrim($baseUrl, '/') . '#quiz';

    return <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ขอบคุณที่สมัครรับข่าวสาร - XCOCO Eyewear</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Prompt', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
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
              <div style="font-size: 11px; color: #52525b; letter-spacing: 1.5px; margin-bottom: 12px;">XCOCO Eyewear</div>
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
                อีเมล <strong style="color: #ffffff; text-decoration: underline;">{$subscriberEmail}</strong> ได้รับการเพิ่มในรายชื่อสมาชิก XCOCO เรียบร้อยแล้ว
              </p>
              <p style="margin: 0; font-size: 13px; color: #a1a1aa; line-height: 1.5;">
                ต่อจากนี้คุณจะได้รับข่าวสารกรอบแว่นคอลเลกชันใหม่ เทคนิคการดูแลสายตา และโปรโมชั่นสุดพิเศษก่อนใครผ่านอีเมลนี้
              </p>
            </td>
          </tr>

          <!-- Tip Box: Face Shape Quiz -->
          <tr>
            <td style="padding: 0 28px 22px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1f; border: 1px solid #2d2d36; border-radius: 12px; padding: 14px 16px;">
                <tr>
                  <td width="32" valign="middle" style="font-size: 22px; line-height: 1;">💡</td>
                  <td style="font-size: 12.5px; color: #e4e4e7; line-height: 1.5;">
                    <strong style="color: #ffffff;">แนะนำ:</strong> ใช้ตัวช่วย <a href="{$targetQuiz}" target="_blank" style="color: #fcd34d; font-weight: 600; text-decoration: none;">Face Shape Quiz</a> บนเว็บไซต์ เพื่อค้นหากรอบแว่นที่เหมาะกับรูปหน้าของคุณได้อย่างมั่นใจ
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Recommended Product Showcase -->
          <tr>
            <td style="padding: 0 28px 24px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1e; border: 1px solid #282830; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td align="center" style="padding: 16px; background-color: #ffffff;">
                    <img src="{$imgProduct}" alt="Titanium Hexagon Glasses" width="100%" style="display: block; max-width: 380px; height: auto; border: none; outline: none;">
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

          <!-- Two Action Buttons: Recommended Product & All Products -->
          <tr>
            <td align="center" style="padding: 0 28px 30px;">
              <!-- Button 1: Recommended Product -->
              <a href="{$targetShop}" target="_blank" style="display: block; width: 85%; max-width: 320px; background-color: #ffffff; color: #000000; text-align: center; text-decoration: none; padding: 14px 0; border-radius: 9999px; font-weight: 700; font-size: 14.5px; letter-spacing: 0.4px; box-shadow: 0 6px 20px rgba(255,255,255,0.18); cursor: pointer; margin-bottom: 12px;">
                ดูสินค้าที่แนะนำนี้ 👓
              </a>
              <!-- Button 2: All Products -->
              <a href="{$targetShop}" target="_blank" style="display: block; width: 85%; max-width: 320px; background-color: #1f1f26; border: 1px solid #33333f; color: #e4e4e7; text-align: center; text-decoration: none; padding: 13px 0; border-radius: 9999px; font-weight: 600; font-size: 14px; letter-spacing: 0.3px; cursor: pointer;">
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
HTML;
}

/**
 * 2. Template สำหรับอีเมลยืนยันการสมัครสมาชิกใหม่ (Luxury Dynamic Edition)
 */
function getRegisterEmailTemplate($userData, $baseUrl = 'http://localhost/eye', $isWebPreview = false) {
    $imgGlasses = $isWebPreview ? 'assets/images/glasses_inner_showcase.jpg' : 'cid:showcase_image';
    $targetUrl = rtrim($baseUrl, '/') . '#products';

    $name = htmlspecialchars($userData['name'] ?? 'สมาชิก XCOCO', ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($userData['email'] ?? '', ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($userData['phone'] ?? '-', ENT_QUOTES, 'UTF-8');
    $address = htmlspecialchars($userData['address'] ?? '-', ENT_QUOTES, 'UTF-8');
    $rightSph = htmlspecialchars($userData['right_sph'] ?? '0.00', ENT_QUOTES, 'UTF-8');
    $leftSph = htmlspecialchars($userData['left_sph'] ?? '0.00', ENT_QUOTES, 'UTF-8');
    $pd = htmlspecialchars($userData['pd'] ?? '62', ENT_QUOTES, 'UTF-8');
    $tier = htmlspecialchars($userData['member_tier'] ?? 'VIP Member', ENT_QUOTES, 'UTF-8');

    return <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ยินดีต้อนรับสมาชิกใหม่ - XCOCO Eyewear</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Prompt', Helvetica, Arial, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased;">
  
  <!-- Hidden Preheader for Email Inbox Snippet -->
  <div style="display: none; font-size: 1px; color: #0c0c0e; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ยินดีต้อนรับคุณ {$name} สู่ครอบครัว XCOCO บันทึกค่าสายตาเรียบร้อย พร้อมรับโค้ดส่วนลด 20% (CLEAR20)
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0c0e; padding: 30px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: 0 auto; background-color: #141416; border: 1px solid #232328; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.85);">
          
          <!-- Top Preheader text -->
          <tr>
            <td align="center" style="padding-top: 24px;">
              <div style="color: #52525b; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">
                XCOCO Eyewear
              </div>
            </td>
          </tr>

          <!-- Brand Header -->
          <tr>
            <td align="center" style="padding: 16px 24px 8px;">
              <div style="font-size: 28px; font-weight: 800; letter-spacing: 3.5px; color: #ffffff; text-transform: uppercase;">
                XCOCO
              </div>
              <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #a1a1aa; margin-top: 2px; text-transform: uppercase;">
                EYEWEAR
              </div>
              <div style="font-size: 13px; color: #71717a; margin-top: 6px; font-weight: 400;">
                เห็นชัด ในแบบของคุณ
              </div>
            </td>
          </tr>

          <!-- Welcome Title -->
          <tr>
            <td align="center" style="padding: 16px 24px 18px;">
              <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;">
                ยินดีต้อนรับสมาชิกใหม่ 🎉
              </h2>
            </td>
          </tr>

          <!-- Member Profile Card (Real selectable HTML text) -->
          <tr>
            <td style="padding: 0 24px 12px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #19191d; border: 1px solid #292932; border-radius: 14px; padding: 18px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                <!-- Header of Card -->
                <tr>
                  <td style="padding-bottom: 14px; border-bottom: 1px solid #262630;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="left" style="font-size: 17px; font-weight: 700; color: #ffffff;">
                          {$name}
                        </td>
                        <td align="right">
                          <span style="display: inline-block; background-color: #2b230d; border: 1px solid #785a18; color: #fbbf24; font-size: 10.5px; font-weight: 700; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px;">
                            ★ XCOCO {$tier}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Details Rows -->
                <tr>
                  <td style="padding-top: 14px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12.5px; line-height: 1.7; color: #d4d4d8;">
                      <tr>
                        <td style="color: #71717a; width: 85px; padding: 3px 0;" valign="top">Email:</td>
                        <td style="color: #f4f4f5; font-weight: 500; padding: 3px 0;">{$email}</td>
                      </tr>
                      <tr>
                        <td style="color: #71717a; padding: 3px 0;" valign="top">Phone:</td>
                        <td style="color: #f4f4f5; font-weight: 500; padding: 3px 0;">{$phone}</td>
                      </tr>
                      <tr>
                        <td style="color: #71717a; padding: 3px 0;" valign="top">Address:</td>
                        <td style="color: #d4d4d8; padding: 3px 0;">{$address}</td>
                      </tr>
                      <tr>
                        <td style="color: #71717a; padding: 3px 0;" valign="top">Prescription:</td>
                        <td style="color: #ffffff; font-weight: 600; padding: 3px 0;">
                          ตาขวา: {$rightSph} &nbsp;|&nbsp; ตาซ้าย: {$leftSph} &nbsp;|&nbsp; PD: {$pd} มม.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Floating 3D Glasses on Pedestal (Seamless Blend, No box frame) -->
          <tr>
            <td align="center" style="padding: 0; line-height: 0; background-color: #161616;">
              <img src="{$imgGlasses}" alt="XCOCO Premium 3D Glasses" width="100%" style="display: block; width: 100%; max-width: 500px; height: auto; border: none; outline: none; text-decoration: none;">
            </td>
          </tr>

          <!-- Coupon Voucher Box (Dashed ticket with selectable code) -->
          <tr>
            <td style="padding: 8px 24px 22px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121214; border: 1px dashed #3a3a44; border-radius: 14px; padding: 18px 16px; text-align: center;">
                <tr>
                  <td align="center">
                    <div style="font-size: 12px; color: #a1a1aa; margin-bottom: 5px; letter-spacing: 0.5px;">
                      โค้ดส่วนลดคูปอง
                    </div>
                    <div style="font-size: 32px; font-weight: 900; letter-spacing: 4px; color: #ffffff; margin-bottom: 4px; font-family: 'Courier New', monospace, sans-serif;">
                      CLEAR20
                    </div>
                    <div style="font-size: 13px; color: #a1a1aa; margin-bottom: 12px;">
                      (ส่วนลด 20%)
                    </div>
                    <div style="border-top: 1px dashed #272730; padding-top: 10px; font-size: 11.5px; color: #71717a;">
                      *รับประกันเปลี่ยนเลนส์แว่นตา 30 วัน
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Single Interactive Button (Only this button has cursor: pointer) -->
          <tr>
            <td align="center" style="padding: 0 24px 28px;">
              <a href="{$targetUrl}" target="_blank" style="display: block; width: 85%; max-width: 320px; background-color: #ffffff; color: #000000; text-align: center; text-decoration: none; padding: 15px 0; border-radius: 9999px; font-weight: 700; font-size: 15px; letter-spacing: 0.5px; box-shadow: 0 6px 20px rgba(255,255,255,0.18); cursor: pointer;">
                เริ่มสั่งตัดแว่นตาของคุณ 👓
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #0c0c0e; padding: 22px 20px; border-top: 1px solid #1f1f26;">
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
HTML;
}

/**
 * 3. Template สำหรับอีเมล Personalized Marketing แนะนำสินค้าตามรูปหน้า/ความสนใจ (Luxury Edition)
 */
function getPersonalizedRecommendationEmailTemplate($email, $name, $shapeKey = 'oval', $baseUrl = 'http://localhost/eye', $isWebPreview = false) {
    $imgProduct = $isWebPreview ? 'assets/images/glasses_inner_showcase.jpg' : 'cid:recommend_image';
    $targetShop = rtrim($baseUrl, '/') . '#products';

    $shapeMap = [
        'oval' => [
            'title' => 'หน้ารูปไข่ (Oval Face)',
            'tips' => 'โครงหน้าสมส่วน เข้าได้กับแว่นเกือบทุกทรง แนะนำทรงเหลี่ยม หรือ ทรงนักบิน (Aviator) เพื่อเพิ่มมิติความคมชัด',
            'productName' => 'Classic Aviator Pilot',
            'productDesc' => 'กรอบทรงนักบินสะพานคู่ คลาสสิกเหนือกาลเวลา ลุคสมาร์ต เพิ่มมิติให้ใบหน้าดูโดดเด่น',
            'price' => '฿1,190',
            'origPrice' => '฿1,590'
        ],
        'round' => [
            'title' => 'หน้ากลม (Round Face)',
            'tips' => 'แนะนำแว่นทรงเหลี่ยม หรือ ทรง Cat-Eye ที่มีมุมยกขึ้น ช่วยนำสายตาให้ใบหน้าดูเรียวและยาวขึ้นอย่างลงตัว',
            'productName' => 'Cat-Eye Sleek Luxury',
            'productDesc' => 'ทรงตาแมวยกมุม เพิ่มความเฉี่ยว มีสไตล์ ช่วยให้ใบหน้าดูเรียวยาวและคมชัดขึ้น',
            'price' => '฿1,290',
            'origPrice' => '฿1,890'
        ],
        'square' => [
            'title' => 'หน้าเหลี่ยม (Square Face)',
            'tips' => 'แนะนำแว่นทรงกลมมน (Round) หรือ ทรงรี ช่วยลดความคมของแนวกราม ปรับเส้นโครงหน้าให้ดูนุ่มนวลและอ่อนหวานขึ้น',
            'productName' => 'Minimalist Round Matte',
            'productDesc' => 'กรอบกลมมินิมอล น้ำหนักเบาเพียง 12 กรัม ปรับโครงหน้าเหลี่ยมให้อ่อนละมุน สบายตา',
            'price' => '฿890',
            'origPrice' => '฿1,290'
        ],
        'heart' => [
            'title' => 'หน้ารูปหัวใจ (Heart Face)',
            'tips' => 'แนะนำแว่นทรงไร้กรอบ (Rimless) หรือ ทรงคิ้ว Browline ที่ฐานกรอบกว้าง ช่วยสร้างความสมดุลระหว่างหน้าผากและคาง',
            'productName' => 'Titanium Rimless Ultra-Float',
            'productDesc' => 'แว่นไร้กรอบไทเทเนียมแท้ เบาโปร่งสบาย ปรับสมดุลใบหน้าได้อย่างสมบูรณ์แบบ',
            'price' => '฿1,590',
            'origPrice' => '฿2,290'
        ]
    ];

    $info = $shapeMap[$shapeKey] ?? $shapeMap['oval'];
    $safeName = htmlspecialchars($name ?: 'คุณลูกค้าคนพิเศษ', ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');

    return <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ผลวิเคราะห์แว่นตาที่เหมาะกับคุณ - XCOCO Eyewear</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Prompt', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <div style="display: none; font-size: 1px; color: #0c0c0e; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ผลวิเคราะห์รูปหน้า {$info['title']} และกรอบแว่นที่เหมาะกับคุณโดยเฉพาะจาก XCOCO Eyewear
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0c0e; padding: 30px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: 0 auto; background-color: #141416; border: 1px solid #232328; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.85);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 30px 24px 10px;">
              <div style="font-size: 11px; color: #52525b; letter-spacing: 1.5px; margin-bottom: 8px;">PERSONALIZED RECOMMENDATION</div>
              <div style="font-size: 26px; font-weight: 800; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">XCOCO</div>
              <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #a1a1aa; margin-top: 2px;">EYEWEAR</div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding: 14px 28px 18px; text-align: center;">
              <div style="display: inline-block; background-color: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.4); color: #fbbf24; font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 9999px; margin-bottom: 12px;">
                🎯 AI Face Shape Matching Result
              </div>
              <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #ffffff;">
                สวัสดีครับคุณ {$safeName} ✨
              </h2>
              <p style="margin: 0; font-size: 13.5px; color: #a1a1aa; line-height: 1.6;">
                นี่คือสรุปผลการวิเคราะห์รูปหน้าและกรอบแว่นตาที่คัดสรรมาเพื่อคุณโดยเฉพาะ
              </p>
            </td>
          </tr>

          <!-- Face Shape Analysis Box -->
          <tr>
            <td style="padding: 0 28px 20px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a20; border: 1px solid #2d2d38; border-radius: 14px; padding: 18px 20px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">โครงหน้าของคุณ:</div>
                    <div style="font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
                      👓 {$info['title']}
                    </div>
                    <div style="font-size: 13px; color: #d4d4d8; line-height: 1.6;">
                      {$info['tips']}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Recommended Product Showcase -->
          <tr>
            <td style="padding: 0 28px 24px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #161619; border: 1px solid #282830; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td align="center" style="background-color: #ffffff; padding: 16px;">
                    <img src="{$imgProduct}" alt="{$info['productName']}" width="100%" style="display: block; max-width: 380px; height: auto;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11.5px; color: #fbbf24; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                      ★ กรอบแว่นคู่แท้แนะนำสำหรับคุณ
                    </div>
                    <div style="font-size: 17px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
                      {$info['productName']}
                    </div>
                    <p style="margin: 0 0 14px; font-size: 12.5px; color: #a1a1aa; line-height: 1.6;">
                      {$info['productDesc']}
                    </p>
                    <div style="display: flex; align-items: baseline;">
                      <span style="font-size: 20px; font-weight: 800; color: #ffffff;">{$info['price']}</span>
                      <span style="font-size: 13px; color: #71717a; text-decoration: line-through; margin-left: 8px;">{$info['origPrice']}</span>
                      <span style="margin-left: auto; font-size: 11px; background-color: #27272a; color: #a1a1aa; padding: 3px 8px; border-radius: 4px;">พร้อมตัดเลนส์</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td align="center" style="padding: 0 28px 30px;">
              <a href="{$targetShop}" target="_blank" style="display: block; width: 85%; max-width: 320px; background-color: #ffffff; color: #000000; text-align: center; text-decoration: none; padding: 14px 0; border-radius: 9999px; font-weight: 700; font-size: 14.5px; letter-spacing: 0.4px; box-shadow: 0 6px 20px rgba(255,255,255,0.18);">
                ดูแว่นตาที่เหมาะกับคุณบนเว็บ 👓
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #0c0c0e; padding: 20px; border-top: 1px solid #1f1f26;">
              <div style="font-size: 12px; color: #71717a; margin-bottom: 4px;">
                XCOCO Eyewear · เห็นชัด ในแบบของคุณ
              </div>
              <div style="font-size: 11px; color: #52525b;">
                อีเมลนี้ส่งถึง {$safeEmail} ตามผลการเลือกบนเว็บไซต์
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

/**
 * 4. Template สำหรับอีเมลธุรกรรมยืนยันคำสั่งซื้อและใบเสร็จดิจิทัล (Transactional Order Receipt)
 */
function getOrderReceiptEmailTemplate($orderData, $baseUrl = 'http://localhost/eye') {
    $safeOrderId = htmlspecialchars($orderData['orderId'] ?? '#XC-' . rand(10000, 99999), ENT_QUOTES, 'UTF-8');
    $safeName = htmlspecialchars($orderData['customerName'] ?? 'คุณลูกค้า', ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($orderData['email'] ?? '', ENT_QUOTES, 'UTF-8');
    $safeAddress = nl2br(htmlspecialchars($orderData['deliveryAddress'] ?? 'จัดส่งตามที่อยู่ที่ระบุไว้กับทีมงาน', ENT_QUOTES, 'UTF-8'));
    $safeDate = htmlspecialchars($orderData['date'] ?? date('d M Y'), ENT_QUOTES, 'UTF-8');
    $subtotal = number_format($orderData['subtotal'] ?? 0);
    $discountAmount = number_format($orderData['discountAmount'] ?? 0);
    $grandTotal = number_format($orderData['grandTotal'] ?? 0);
    $targetUrl = rtrim($baseUrl, '/') . '#profile';

    $itemsHtml = '';
    if (!empty($orderData['items']) && is_array($orderData['items'])) {
        foreach ($orderData['items'] as $item) {
            $name = htmlspecialchars($item['name'] ?? 'กรอบแว่นตา XCOCO', ENT_QUOTES, 'UTF-8');
            $qty = (int)($item['quantity'] ?? 1);
            $price = number_format(($item['unitPrice'] ?? 0) * $qty);
            $rx = !empty($item['rxSummary']) ? htmlspecialchars($item['rxSummary'], ENT_QUOTES, 'UTF-8') : '';

            $itemsHtml .= '
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #232328;">
                <div style="font-weight: 600; color: #ffffff; font-size: 14px;">' . $name . '</div>';
            if ($rx) {
                $itemsHtml .= '<div style="font-size: 11.5px; color: #a1a1aa; margin-top: 3px;">🔍 ค่าสายตา: ' . $rx . '</div>';
            }
            $itemsHtml .= '
                <div style="font-size: 12px; color: #71717a; margin-top: 2px;">จำนวน: ' . $qty . ' ชิ้น</div>
              </td>
              <td align="right" style="padding: 12px 0; border-bottom: 1px solid #232328; font-weight: 700; color: #ffffff; font-size: 14px; vertical-align: top;">
                ฿' . $price . '
              </td>
            </tr>';
        }
    } else {
        $itemsHtml = '<tr><td colspan="2" style="padding: 12px 0; color: #a1a1aa;">ไม่มีรายการสินค้า</td></tr>';
    }

    $discountRowHtml = '';
    if (!empty($orderData['discountAmount']) && $orderData['discountAmount'] > 0) {
        $discountRowHtml = '
        <tr>
          <td style="padding: 5px 0; color: #34d399; font-size: 13px;">ส่วนลดโปรโมชัน:</td>
          <td align="right" style="padding: 5px 0; color: #34d399; font-weight: 600; font-size: 13px;">-฿' . $discountAmount . '</td>
        </tr>';
    }

    return <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ใบเสร็จคำสั่งซื้อ {$safeOrderId} - XCOCO Eyewear</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Prompt', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <div style="display: none; font-size: 1px; color: #0c0c0e; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ยืนยันคำสั่งซื้อ {$safeOrderId} ขอบคุณที่สั่งซื้อกับ XCOCO Eyewear ยอดรวม ฿{$grandTotal}
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0c0e; padding: 30px 12px;">
    <tr>
      <td align="center">
        <!-- Main Receipt Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; margin: 0 auto; background-color: #141416; border: 1px solid #232328; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.85);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 32px 24px 16px;">
              <div style="font-size: 11px; color: #52525b; letter-spacing: 1.5px; margin-bottom: 10px;">XCOCO EYEWEAR · TRANSACTIONAL RECEIPT</div>
              <div style="font-size: 26px; font-weight: 800; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">XCOCO</div>
              <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #a1a1aa; margin-top: 2px; text-transform: uppercase;">EYEWEAR</div>
              <div style="font-size: 12.5px; color: #71717a; margin-top: 6px;">เห็นชัด ในแบบของคุณ</div>
            </td>
          </tr>

          <!-- Success Badge Banner -->
          <tr>
            <td style="padding: 0 28px 20px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.08) 100%); border: 1px solid rgba(16,185,129,0.3); border-radius: 14px; padding: 18px 20px; text-align: center;">
                <tr>
                  <td>
                    <div style="font-size: 28px; line-height: 1; margin-bottom: 8px;">🎉</div>
                    <div style="font-size: 18px; font-weight: 700; color: #6ee7b7; margin-bottom: 4px;">สั่งซื้อและชำระเงินสำเร็จ!</div>
                    <div style="font-size: 13px; color: #d1fae5; line-height: 1.5;">
                      ขอบคุณ <strong style="color: #ffffff;">{$safeName}</strong> ที่ไว้วางใจให้เราดูแลสายตาคุณ
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Meta (ID & Date) -->
          <tr>
            <td style="padding: 0 28px 18px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1f; border: 1px solid #282830; border-radius: 12px; padding: 14px 18px;">
                <tr>
                  <td style="font-size: 12.5px; color: #a1a1aa;">
                    หมายเลขคำสั่งซื้อ: <strong style="color: #ffffff; font-family: monospace; font-size: 13.5px;">{$safeOrderId}</strong>
                  </td>
                  <td align="right" style="font-size: 12.5px; color: #a1a1aa;">
                    วันที่: <strong style="color: #ffffff;">{$safeDate}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 28px 20px;">
              <div style="font-size: 12px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                📍 ที่อยู่จัดส่งพัสดุ
              </div>
              <div style="background-color: #1a1a1f; border: 1px solid #282830; border-radius: 12px; padding: 14px 18px; font-size: 13px; color: #e4e4e7; line-height: 1.6;">
                {$safeAddress}
              </div>
            </td>
          </tr>

          <!-- Order Items Table -->
          <tr>
            <td style="padding: 0 28px 16px;">
              <div style="font-size: 12px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                🛍️ รายการสินค้าที่สั่งตัด
              </div>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                {$itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Cost Breakdown & Grand Total -->
          <tr>
            <td style="padding: 0 28px 24px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 16px 20px;">
                <tr>
                  <td style="padding: 4px 0; color: #a1a1aa; font-size: 13px;">ราคารวมสินค้า:</td>
                  <td align="right" style="padding: 4px 0; color: #ffffff; font-size: 13px;">฿{$subtotal}</td>
                </tr>
                {$discountRowHtml}
                <tr>
                  <td style="padding: 4px 0; color: #a1a1aa; font-size: 13px;">ค่าจัดส่ง:</td>
                  <td align="right" style="padding: 4px 0; color: #34d399; font-weight: 600; font-size: 13px;">ฟรี (โปรโมชัน)</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 10px 0 6px;"><div style="border-top: 1px solid #2f2f38;"></div></td>
                </tr>
                <tr>
                  <td style="font-size: 15px; font-weight: 700; color: #ffffff;">ยอดชำระสุทธิ:</td>
                  <td align="right" style="font-size: 20px; font-weight: 800; color: #facc15;">฿{$grandTotal}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 4-Step Order Tracker Progress -->
          <tr>
            <td style="padding: 0 28px 24px;">
              <div style="font-size: 12px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                🚚 ขั้นตอนการดำเนินการผลิตและจัดส่ง
              </div>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1f; border: 1px solid #282830; border-radius: 12px; padding: 16px 14px;">
                <tr>
                  <td align="center" width="25%" style="font-size: 11px; color: #34d399; font-weight: 600;">
                    <div style="width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #059669; color: #ffffff; font-size: 12px; margin: 0 auto 6px;">✓</div>
                    1. ได้รับคำสั่งซื้อ
                  </td>
                  <td align="center" width="25%" style="font-size: 11px; color: #60a5fa; font-weight: 700;">
                    <div style="width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #2563eb; color: #ffffff; font-size: 12px; margin: 0 auto 6px; box-shadow: 0 0 10px rgba(37,99,235,0.6);">⚡</div>
                    2. เจียระไนเลนส์
                  </td>
                  <td align="center" width="25%" style="font-size: 11px; color: #71717a;">
                    <div style="width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #27272a; color: #71717a; font-size: 12px; margin: 0 auto 6px;">3</div>
                    3. QC ตรวจสอบ
                  </td>
                  <td align="center" width="25%" style="font-size: 11px; color: #71717a;">
                    <div style="width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #27272a; color: #71717a; font-size: 12px; margin: 0 auto 6px;">4</div>
                    4. จัดส่งพัสดุ
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Button: Track Order -->
          <tr>
            <td align="center" style="padding: 0 28px 24px;">
              <a href="{$targetUrl}" target="_blank" style="display: block; width: 85%; max-width: 320px; background-color: #ffffff; color: #000000; text-align: center; text-decoration: none; padding: 14px 0; border-radius: 9999px; font-weight: 700; font-size: 14.5px; letter-spacing: 0.4px; box-shadow: 0 6px 20px rgba(255,255,255,0.18);">
                ดูประวัติคำสั่งซื้อบนเว็บไซต์ 👓
              </a>
            </td>
          </tr>

          <!-- Help / Contact Support -->
          <tr>
            <td style="padding: 0 28px 24px;">
              <div style="border: 1px dashed #2f2f38; border-radius: 10px; padding: 12px 16px; text-align: center; font-size: 11.5px; color: #a1a1aa; line-height: 1.6;">
                💬 หากต้องการสอบถามสถานะ หรือส่งใบวัดสายตาเพิ่มเติม สามารถตอบกลับอีเมลนี้ หรือแอด LINE: <strong style="color: #ffffff;">@xcoco</strong> ได้ตลอด 24 ชม.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #0c0c0e; padding: 20px; border-top: 1px solid #1f1f26;">
              <div style="font-size: 12px; color: #71717a; margin-bottom: 4px;">
                XCOCO Eyewear · เห็นชัด ในแบบของคุณ
              </div>
              <div style="font-size: 11px; color: #52525b;">
                อีเมลนี้เป็นเอกสารธุรกรรมอัตโนมัติ ส่งถึง {$safeEmail} สำหรับคำสั่งซื้อ {$safeOrderId}
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

