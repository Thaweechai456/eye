# 📋 สรุปไฟล์หลัก PHPMailer & Gmail SMTP สำหรับเปิดให้อาจารย์ตรวจ

ใช้สำหรับเปิดโค้ดและพรีเซนต์ให้อาจารย์ดูการทำงานของระบบส่งอีเมล (XCOCO Eyewear)

---

## 📂 4 ไฟล์หลักที่ต้องเปิดให้อาจารย์ดู

### 1. `mail_config.php` ⭐ (ไฟล์ตั้งค่า SMTP)
* **เปิดไฟล์:** [`mail_config.php`](file:///d:/eye/backend/mail_config.php)
* **สิ่งที่อาจารย์จะตรวจ:**
  1. การชี้ไปยัง Host: `smtp.gmail.com` และ Port: `587` (TLS)
  2. อีเมลผู้ส่ง: บัญชี Gmail ของเรา
  3. รหัสผ่านความปลอดภัย: **Google App Password 16 หลัก**
* **คำพูดพรีเซนต์:**  
  > *"ไฟล์นี้เป็นไฟล์ Config สำหรับตั้งค่าเชื่อมต่อกับเซิร์ฟเวอร์ Gmail SMTP ของ Google ด้วยรหัสผ่าน App Password แบบ 16 หลัก เพื่อความปลอดภัยครับ"*

---

### 2. `mailer.php` ⭐ (Core Engine ระบบส่งอีเมล)
* **เปิดไฟล์:** [`mailer.php`](file:///d:/eye/backend/mailer.php)
* **สิ่งที่อาจารย์จะตรวจ:**
  1. ฟังก์ชัน `sendXcocoEmail($toEmail, $toName, $subject, $htmlBody)`
  2. คำสั่งเชื่อมต่อ Socket พอร์ต 587 และเข้ารหัสด้วย `STARTTLS`
  3. การยืนยันตัวตน `AUTH LOGIN` กับ Gmail และคำสั่งโปรโตคอล `MAIL FROM` / `RCPT TO` / `DATA`
  4. การตั้งค่า Header อีเมลเป็น `Content-Type: text/html; charset=UTF-8` เพื่อรองรับภาษาไทย 100%
* **คำพูดพรีเซนต์:**  
  > *"ไฟล์นี้คือตัวส่งอีเมลหลัก (Engine) ที่ติดต่อกับเซิร์ฟเวอร์ Mail โดยตรงผ่านคำสั่ง SMTP แท้ๆ รองรับการส่ง HTML Template ภาษาไทยเข้ากล่อง Inbox จริงครับ"*

---

### 3. `email_templates.php` (ไฟล์หน้าตาและ Content อีเมล)
* **เปิดไฟล์:** [`email_templates.php`](file:///d:/eye/backend/email_templates.php)
* **สิ่งที่อาจารย์จะตรวจ:**
  1. ฟังก์ชัน `getSubscribeEmailTemplate()`: สร้าง HTML อีเมลข่าวสาร มีการ์ดแนะนำแว่น Titanium Hexagon และปุ่มกด 3 ปุ่ม
  2. ฟังก์ชัน `getRegisterEmailTemplate()`: สร้าง HTML อีเมลสมัครสมาชิก สรุปข้อมูลส่วนตัว ค่าสายตา และโค้ดส่วนลด 20%
* **คำพูดพรีเซนต์:**  
  > *"ไฟล์นี้เป็นส่วน Content Marketing ที่เขียนด้วย HTML/CSS สำหรับสร้างเนื้อหาและดีไซน์อีเมลทั้ง 2 รูปแบบส่งไปให้ลูกค้าครับ"*

---

### 4. `api_subscribe.php` & `api_register.php` (ตัวเชื่อมต่อหน้าเว็บกับระบบส่งเมล)
* **เปิดไฟล์:** [`api_subscribe.php`](file:///d:/eye/backend/api_subscribe.php) และ [`api_register.php`](file:///d:/eye/backend/api_register.php)
* **สิ่งที่อาจารย์จะตรวจ:**
  1. การรับค่าจากฟอร์มหน้าเว็บ (AJAX POST)
  2. การบันทึกข้อมูลลงฐานข้อมูล MySQL (`subscribers` หรือ `users`)
  3. คำสั่งเรียกใช้ `sendXcocoEmail()` เพื่อส่งอีเมลออกไปหาลูกค้ารายนั้นทันที
* **คำพูดพรีเซนต์:**  
  > *"สองไฟล์นี้เป็น Controller API ครับ เมื่อลูกค้ากดปุ่มที่หน้าเว็บ ระบบจะบันทึกลง Database ก่อน แล้วดึงอีเมลของลูกค้าส่งต่อไปให้ฟังก์ชัน `sendXcocoEmail()` ทำงานอัตโนมัติทันทีครับ"*

---

## 🔄 สรุป Flow การทำงานสั้นๆ (อธิบายอาจารย์ใน 4 บรรทัด)

```text
1. ลูกค้ากรอกข้อมูลบนหน้าเว็บ (สมัครสมาชิก หรือ รับข่าวสาร)
2. หน้าเว็บส่งข้อมูล (POST) มาที่ backend/api_register.php หรือ backend/api_subscribe.php
3. API บันทึกข้อมูลลงฐานข้อมูล MySQL (ตาราง users / subscribers)
4. mailer.php เชื่อมต่อ Gmail SMTP (พอร์ต 587 TLS) แล้วยิง HTML Email เข้ากล่องจดหมายลูกค้าทันที
```

---

## 🖥️ วิธีเปิด Live Demo ให้อาจารย์ดูหน้าตาอีเมลสดๆ บนเบราว์เซอร์

หากอาจารย์ต้องการดูผลลัพธ์ของอีเมลที่ระบบสร้างขึ้นมาแบบ Real-time:
* **เปิดดูอีเมล Subscribe ข่าวสาร:**  
  `http://localhost/eye/backend/preview_email.php?type=subscribe`
* **เปิดดูอีเมล สมัครสมาชิกใหม่:**  
  `http://localhost/eye/backend/preview_email.php?type=register`
