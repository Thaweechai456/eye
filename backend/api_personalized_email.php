<?php
// ============================================================================
// XCOCO Eyewear - API Personalized Recommendation Email (api_personalized_email.php)
// ส่งอีเมลแนะนำแว่นตาที่คัดสรรเฉพาะบุคคลตามรูปหน้า/สไตล์ความสนใจ (ตามโจทย์ข้อ 3)
// ============================================================================

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/mailer.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$email = trim($input['email'] ?? '');
$name = trim($input['name'] ?? '');
$faceShape = trim($input['face_shape'] ?? 'oval');

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง'
    ]);
    exit;
}

$config = require __DIR__ . '/mail_config.php';
$baseUrl = $config['base_url'] ?? 'http://localhost/eye';

// สร้างเนื้อหาอีเมล Personalized Recommendation
$emailHtml = getPersonalizedRecommendationEmailTemplate($email, $name, $faceShape, $baseUrl);
$subject = 'ผลวิเคราะห์รูปหน้า & กรอบแว่นตาคู่แท้ของคุณ - XCOCO Eyewear 👓';

// เลือกรูปภาพ showcase
$recommendImg = dirname(__DIR__) . '/assets/images/glasses_inner_showcase.jpg';
if (!file_exists($recommendImg)) {
    $recommendImg = dirname(__DIR__) . '/assets/images/glasses_minimal_round_1787761859075.jpg';
}

$mailResult = sendXcocoEmail($email, $name ?: 'Subscriber', $subject, $emailHtml, [
    'recommend_image' => $recommendImg
]);

echo json_encode([
    'success' => true,
    'message' => 'ส่งสรุปผลวิเคราะห์และแว่นตาที่แนะนำไปยัง ' . $email . ' สำเร็จแล้ว!',
    'mail_result' => $mailResult
]);
