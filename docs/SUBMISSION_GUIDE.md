# 👓 คู่มือสรุปโปรเจกต์ XCOCO Eyewear & รายการไฟล์สำหรับส่งงานอาจารย์

**แบรนด์:** XCOCO Eyewear  
**สโลแกน:** "เห็นชัด ในแบบของคุณ"  
**ธีมหลัก:** มินิมอลขาว-ดำ (Monochrome Luxury)  

---

## 📁 โครงสร้างโฟลเดอร์โปรเจกต์

```
eye/
├── index.html                          ← หน้าเว็บหลัก
├── assets/
│   ├── css/
│   │   └── styles.css                  ← ไฟล์ตกแต่งหน้าเว็บ
│   ├── js/
│   │   └── app.js                      ← โค้ด JavaScript ระบบทั้งหมด
│   └── images/
│       ├── Logo.png                    ← โลโก้แบรนด์
│       ├── email_content_subscribe.*   ← ภาพ Content Email Subscribe
│       ├── email_content_register.*    ← ภาพ Content Email สมัครสมาชิก
│       └── glasses_*.jpg               ← ภาพสินค้าแว่นตา 5 รุ่น
├── backend/
│   ├── api_subscribe.php               ← API รับสมัครข่าวสาร
│   ├── api_register.php                ← API สมัครสมาชิก
│   ├── api_login.php                   ← API เข้าสู่ระบบ
│   ├── mail_config.php                 ← ตั้งค่า Gmail SMTP
│   ├── mailer.php                      ← ฟังก์ชันส่งอีเมล
│   ├── email_templates.php             ← HTML Template อีเมล
│   ├── db.php                          ← เชื่อมต่อ MySQL
│   └── preview_email.php               ← พรีวิวอีเมลผ่านเบราว์เซอร์
├── database/
│   └── database.sql                    ← สคริปต์สร้างฐานข้อมูล
└── docs/
    ├── SUBMISSION_GUIDE.md             ← คู่มือนี้
    └── PHPMAILER_TEACHER_GUIDE.md      ← คู่มือสำหรับอาจารย์ตรวจ
```

---

## 📌 ส่วนที่ 1: งานที่ต้องส่งในสัปดาห์นี้ (Content รูปภาพ Email)

อาจารย์มอบหมายให้ส่ง **Content รูปภาพสำหรับส่ง Email** มีทั้งหมด 2 ภาพพร้อมส่งได้ทันที:

### 1. 📧 ภาพ Content Email: หลังจากลูกค้า Subscribe ข่าวสาร
* **ชื่อไฟล์:** [`email_content_subscribe.jpg`](file:///d:/eye/assets/images/email_content_subscribe.jpg) (หรือ [`email_content_subscribe.png`](file:///d:/eye/assets/images/email_content_subscribe.png))
* **จุดเด่น / องค์ประกอบในภาพ:**
  * **Header:** โลโก้แบรนด์ XCOCO EYEWEAR พร้อมสโลแกน *"เห็นชัด ในแบบของคุณ"*
  * **ข้อความต้อนรับ:** ขอบคุณที่สมัครรับข่าวสาร พร้อมระบุอีเมลผู้รับ
  * **กล่องแนะนำ (Tip Box):** แนะนำตัวช่วยวิเคราะห์รูปหน้า *Face Shape Quiz*
  * **การ์ดแนะนำสินค้า:** แว่นตารุ่นยอดนิยม **Titanium Hexagon** (น้ำหนักเบา 12g) พร้อมระบุสเปก ราคา ฿1,590 (จากปกติ ฿2,200)
  * **ปุ่ม Call to Action:**
    * `[ ดูสินค้าที่แนะนำนี้ 👓 ]`
    * `[ ดูสินค้าทั้งหมด 🛍️ ]`
    * `[ กลับไปที่หน้าร้าน XCOCO ]`

---

### 2. 📧 ภาพ Content Email: หลังจากลูกค้า สมัครสมาชิกใหม่
* **ชื่อไฟล์:** [`email_content_register.jpg`](file:///d:/eye/assets/images/email_content_register.jpg) (หรือ [`email_content_register.png`](file:///d:/eye/assets/images/email_content_register.png))
* **จุดเด่น / องค์ประกอบในภาพ:**
  * **Header & หัวข้อ:** "ยินดีต้อนรับสมาชิกใหม่ 🎉"
  * **การ์ดข้อมูลส่วนตัว (User Account Card):**
    * ชื่อสมาชิก: คุณสมชาย สายตาดี
    * ป้ายสถานะ: ⭐ **XCOCO VIP Member**
    * อีเมล: `robloxmakethegame123@gmail.com`
    * เบอร์โทร: `081-234-5678`
    * ที่อยู่จัดส่ง: `123/45 หมู่ 6 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110`
    * **ค่าสายตาประจำตัว:** `ตาขวา: -1.50 | ตาซ้าย: -1.50 | PD: 62 มม.` *(ฟอนต์คมชัด สะกดถูกต้อง 100%)*
  * **รูปแว่นตา 3D พรีเมียม:** โชว์แว่นตาวางบนแท่นดีไซน์หรูหรา
  * **กล่องคูปองส่วนลด:** โค้ดลับ **`CLEAR20`** (ส่วนลด 20%) พร้อมเงื่อนไขรับประกันเลนส์ 30 วัน
  * **ปุ่มกด:** `[ เริ่มสั่งตัดแว่นตาของคุณ 👓 ]`

---

## 💻 ส่วนที่ 2: งานที่ต้องส่งในสัปดาห์หน้า (สัปดาห์ส่งไฟล์ .php)

ระบบ Backend, ฐานข้อมูล MySQL และระบบส่งอีเมล Gmail SMTP ได้ถูกจัดเตรียมไว้ให้พร้อมใช้งานทั้งหมดแล้ว:

| ชื่อไฟล์ | ที่อยู่ | หน้าที่การทำงาน |
| :--- | :---: | :--- |
| [`api_subscribe.php`](file:///d:/eye/backend/api_subscribe.php) | `backend/` | รับอีเมลคนกดรับข่าวสาร บันทึกลง MySQL และส่ง Email แนะนำสินค้า |
| [`api_register.php`](file:///d:/eye/backend/api_register.php) | `backend/` | รับข้อมูลคนสมัครสมาชิก บันทึกลง MySQL และส่ง Email ยืนยันข้อมูลสมาชิก |
| [`api_login.php`](file:///d:/eye/backend/api_login.php) | `backend/` | ตรวจสอบอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบสมาชิก |
| [`mail_config.php`](file:///d:/eye/backend/mail_config.php) | `backend/` | ไฟล์ตั้งค่าเชื่อมต่อ Gmail SMTP และใส่ App Password 16 หลักของคุณ |
| [`mailer.php`](file:///d:/eye/backend/mailer.php) | `backend/` | ฟังก์ชันส่งอีเมลด้วย Socket / STARTTLS (ไม่จำเป็นต้องลง Composer) |
| [`email_templates.php`](file:///d:/eye/backend/email_templates.php) | `backend/` | โค้ดสร้างหน้าตาอีเมล HTML Template ทั้ง 2 รูปแบบ |
| [`db.php`](file:///d:/eye/backend/db.php) | `backend/` | ไฟล์เชื่อมต่อฐานข้อมูล MySQL (PDO) รองรับภาษาไทย UTF-8 |
| [`database.sql`](file:///d:/eye/database/database.sql) | `database/` | สคริปต์สร้าง Database `xcoco_db` พร้อมตาราง `users` และ `subscribers` |
| [`preview_email.php`](file:///d:/eye/backend/preview_email.php) | `backend/` | หน้าเว็บสำหรับเปิดพรีวิวดูตัวอย่างอีเมลทั้ง 2 ฉบับผ่านเบราว์เซอร์ |

---

## 🗄️ โครงสร้างฐานข้อมูล MySQL (`database.sql`)

### 1. ตาราง `subscribers` (ผู้ติดตามข่าวสาร)
* `id` (INT Auto Increment)
* `email` (VARCHAR 255)
* `status` (ENUM active/unsubscribed)
* `ip_address` (VARCHAR 45)
* `subscribed_at` (TIMESTAMP)

### 2. ตาราง `users` (ข้อมูลสมาชิก & ค่าสายตา)
* `id` (INT Auto Increment)
* `name` (VARCHAR 150) - ชื่อสมาชิก
* `phone` (VARCHAR 20) - เบอร์โทรศัพท์
* `email` (VARCHAR 255) - อีเมลเข้าสู่ระบบ
* `birthdate` (DATE) - วันเกิด
* `address` (TEXT) - ที่อยู่จัดส่งสินค้า
* `password` (VARCHAR 255) - รหัสผ่าน (เข้ารหัสความปลอดภัย BCRYPT)
* `right_sph` (VARCHAR 10) - ค่าสายตาสั้น/ยาว ตาขวา
* `left_sph` (VARCHAR 10) - ค่าสายตาสั้น/ยาว ตาซ้าย
* `pd` (INT) - ระยะห่างตาดำ (Pupillary Distance)
* `member_tier` (VARCHAR 50) - ระดับสมาชิก (VIP Member)
* `agreed_pdpa` (TINYINT) - กดยินยอมข้อตกลงและนโยบายความเป็นส่วนตัว

---

## 🚀 ขั้นตอนการเปิดใช้งานระบบเมื่อถึงสัปดาห์ส่งไฟล์ PHP

1. **เปิดโปรแกรมจำลองเซิร์ฟเวอร์ (เช่น XAMPP):**
   * กด `Start` ที่ **Apache** และ **MySQL**
2. **นำฐานข้อมูลเข้า (Import Database):**
   * เข้าเว็บเบราว์เซอร์: `http://localhost/phpmyadmin`
   * กดแท็บ **Import** -> เลือกไฟล์ [`database.sql`](file:///d:/eye/database/database.sql) -> กด **Go**
3. **เปิดใช้งานเว็บไซต์:**
   * นำโฟลเดอร์โปรเจกต์ไปวางไว้ใน `C:\xampp\htdocs\eye`
   * เปิดเข้าเว็บผ่าน: `http://localhost/eye/index.html`
4. **เปิดดูหน้าพรีวิวอีเมล:**
   * อีเมล Subscribe: `http://localhost/eye/backend/preview_email.php?type=subscribe`
   * อีเมล สมัครสมาชิก: `http://localhost/eye/backend/preview_email.php?type=register`

---
*จัดทำขึ้นสำหรับมินิโปรเจกต์วิชาการตลาด XCOCO Eyewear*
