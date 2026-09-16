<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>สมัครรับข่าวสาร - XCOCO Eyewear</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    body {
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .subscribe-card {
      background: #ffffff;
      width: 100%;
      max-width: 440px;
      padding: 38px 30px;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.04);
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    .card-title {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .card-title .dot {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: #f97316;
      border-radius: 50%;
    }
    .card-subtitle {
      font-size: 13.5px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 26px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .input-email {
      width: 100%;
      padding: 14px 18px;
      font-size: 14.5px;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      outline: none;
      transition: all 0.2s ease;
      background: #f9fafb;
      color: #111827;
    }
    .input-email:focus {
      border-color: #f97316;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12);
    }
    .input-email::placeholder {
      color: #9ca3af;
    }
    .btn-submit {
      width: 100%;
      padding: 14px 20px;
      background: linear-gradient(135deg, #fb923c 0%, #ea580c 100%);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35);
      transition: all 0.2s ease;
    }
    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(234, 88, 12, 0.45);
    }
    .btn-submit:active {
      transform: translateY(0);
    }
    .back-home {
      margin-top: 22px;
      font-size: 13px;
    }
    .back-home a {
      color: #6b7280;
      text-decoration: none;
      transition: color 0.2s;
    }
    .back-home a:hover {
      color: #ea580c;
    }
  </style>
</head>
<body>

  <div class="subscribe-card">
    <h2 class="card-title">
      สมัครรับข่าวสาร <span class="dot"></span>
    </h2>
    <p class="card-subtitle">
      รับข่าวสารและโปรโมชั่นพิเศษก่อนใคร ส่งตรงไปยังอีเมลของคุณ 👓
    </p>

    <form action="sendMail.php" method="POST">
      <div class="form-group">
        <input 
          type="email" 
          name="email" 
          class="input-email" 
          placeholder="กรอกอีเมลของคุณ" 
          required 
          autocomplete="email"
        >
      </div>

      <button type="submit" class="btn-submit">
        สมัครเลย
      </button>
    </form>

    <div class="back-home">
      <a href="index.html">← กลับไปยังหน้าร้าน XCOCO Eyewear</a>
    </div>
  </div>

</body>
</html>
