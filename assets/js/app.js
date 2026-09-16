/**
 * XCOCO Eyewear - E-commerce Store Logic
 * Slogan: "เห็นชัด ในแบบของคุณ"
 */

// ==========================================
// 1. Mock Data: ข้อมูลสินค้าแว่นตา 10 รุ่นครบทุกสไตล์
// ==========================================
const PRODUCTS = [
  {
    id: "frame_minimal_01",
    name: "Minimalist Round Matte",
    category: "minimal",
    categoryLabel: "สไตล์มินิมอล",
    price: 890,
    originalPrice: 1290,
    badge: "ขายดี 🔥",
    desc: "กรอบกลมทรงเกาหลี น้ำหนักเบาเพียง 12 กรัม ใส่สบายไม่กดดั้ง เหมาะกับทุกรูปหน้า",
    image: "assets/images/glasses_minimal_round_1787761859075.jpg"
  },
  {
    id: "frame_vintage_02",
    name: "Classic Aviator Pilot",
    category: "vintage",
    categoryLabel: "วินเทจ/คลาสสิก",
    price: 1190,
    originalPrice: 1590,
    badge: "ยอดนิยม",
    desc: "กรอบทรงนักบินสะพานคู่ คลาสสิกเหนือกาลเวลา ลุคเท่ สมาร์ต มั่นใจ",
    image: "assets/images/glasses_classic_aviator_1787761881857.jpg"
  },
  {
    id: "frame_gaming_03",
    name: "Cyber Square Gamer Shield",
    category: "gaming",
    categoryLabel: "เกมมิ่ง & กรองแสง",
    price: 990,
    originalPrice: 1450,
    badge: "แนะนำ 💻",
    desc: "ออกแบบพิเศษสำหรับสายหน้าจอ ขาแว่นยืดหยุ่นใส่ครอบหูฟังได้ไม่เจ็บขมับ",
    image: "assets/images/glasses_cyber_square_1787762109576.jpg"
  },
  {
    id: "frame_fashion_04",
    name: "Cat-Eye Sleek Luxury",
    category: "fashion",
    categoryLabel: "สายแฟชั่น",
    price: 1290,
    originalPrice: 1890,
    badge: "คอลเลกชันใหม่ ✨",
    desc: "ทรงตาแมวยกมุม เพิ่มความเฉี่ยว มีสไตล์ ช่วยให้ใบหน้าดูเรียวยาวและโดดเด่น",
    image: "assets/images/glasses_cateye_luxury_1787762132982.jpg"
  },
  {
    id: "frame_titanium_05",
    name: "Titanium Hexagon Slim",
    category: "titanium",
    categoryLabel: "ไทเทเนียมพรีเมียม",
    price: 1390,
    originalPrice: 1990,
    badge: "เบาพิเศษ 🪶",
    desc: "กรอบหกเหลี่ยมไทเทเนียม ทรงโมเดิร์น แข็งแรงทนทาน น้ำหนักเบา ใส่ได้ทุกโอกาส",
    image: "assets/images/glasses_titanium_hexagon_1787762363088.jpg"
  },
  {
    id: "frame_titanium_06",
    name: "Titanium Rimless Ultra-Float",
    category: "titanium",
    categoryLabel: "ไทเทเนียมพรีเมียม",
    price: 1590,
    originalPrice: 2290,
    badge: "ไร้กรอบหรู 💎",
    desc: "แว่นไร้กรอบไทเทเนียมแท้ เบาเหมือนลอยได้ ไม่บดบังดวงตา ให้ลุคสุภาพหรูหรา",
    image: "assets/images/glasses_rimless_clean.jpg"
  },
  {
    id: "frame_vintage_07",
    name: "Tortoiseshell Heritage Round",
    category: "vintage",
    categoryLabel: "วินเทจ/คลาสสิก",
    price: 1250,
    originalPrice: 1690,
    badge: "คลาสสิก 🍂",
    desc: "กรอบกลมลายกระทำจากอะซิเตทคุณภาพสูง ผิวสัมผัสเงางาม เสริมลุควินเทจมีรสนิยม",
    image: "assets/images/glasses_tortoiseshell_clean.jpg"
  },
  {
    id: "frame_minimal_08",
    name: "Nordic Matte Black Rectangle",
    category: "minimal",
    categoryLabel: "สไตล์มินิมอล",
    price: 890,
    originalPrice: 1350,
    badge: "เรียบหรู 🖤",
    desc: "กรอบเหลี่ยมมินิมอลสีดำด้าน สไตล์สแกนดิเนเวีย ใส่ทำงานก็เท่ ใส่ไปเที่ยวก็คูล",
    image: "assets/images/glasses_matte_square_clean.jpg"
  },
  {
    id: "frame_gaming_09",
    name: "Pro Streamer Blueblock Lite",
    category: "gaming",
    categoryLabel: "เกมมิ่ง & กรองแสง",
    price: 1050,
    originalPrice: 1490,
    badge: "สายสตรีม 🎮",
    desc: "กรอบสี่เหลี่ยมโค้งมน ตัดแสงสะท้อนจากจอและไฟสตูดิโอ ถนอมสายตาระดับสูงสุด",
    image: "assets/images/glasses_cyber_square_1787762109576.jpg"
  },
  {
    id: "frame_fashion_10",
    name: "Chic Paris Oversized Gold",
    category: "fashion",
    categoryLabel: "สายแฟชั่น",
    price: 1350,
    originalPrice: 1950,
    badge: "ดาราใส่เพียบ 🌟",
    desc: "กรอบ Oversized ขาสีทอง ลุคคุณหนูปารีส ถ่ายรูปขึ้นกล้องสุดๆ",
    image: "assets/images/glasses_oversized_gold.jpg"
  },
  {
    id: "frame_titanium_11",
    name: "Titanium Alpha Ultra-Light",
    category: "titanium",
    categoryLabel: "ไทเทเนียมพรีเมียม",
    price: 1490,
    originalPrice: 2200,
    badge: "พรีเมียม 💎",
    desc: "ไทเทเนียมบริสุทธิ์ 100% เบาเหมือนไม่ได้ใส่ ทนทานต่อการบิดงอและเหงื่อ",
    image: "assets/images/glasses_titanium_hexagon_1787762363088.jpg"
  },
  {
    id: "frame_minimal_12",
    name: "Korean Clear Crystal Round",
    category: "minimal",
    categoryLabel: "สไตล์มินิมอล",
    price: 790,
    originalPrice: 1150,
    badge: "มินิมอล 🤍",
    desc: "กรอบกลมอะคริลิกใสโปร่งแสง สไตล์เกาหลี หน้าสว่าง ละมุนตา ไม่หลอกรูปหน้า",
    image: "assets/images/glasses_minimal_round_1787761859075.jpg"
  },
  {
    id: "frame_vintage_13",
    name: "Browline Retro Clubmaster",
    category: "vintage",
    categoryLabel: "วินเทจ/คลาสสิก",
    price: 1150,
    originalPrice: 1590,
    badge: "เรโทร 📻",
    desc: "คิ้วหนาสไตล์เรโทรยุค 60s ให้ลุคสุภาพ ภูมิฐาน ใส่ทำงานหรือไปเที่ยวก็ดูดี",
    image: "assets/images/glasses_classic_aviator_1787761881857.jpg"
  },
  {
    id: "frame_titanium_14",
    name: "Pure Minimal Rimless Oval",
    category: "titanium",
    categoryLabel: "ไทเทเนียมพรีเมียม",
    price: 1650,
    originalPrice: 2350,
    badge: "โปร่งเบา 🪶",
    desc: "แว่นไร้กรอบทรงรีไทเทเนียมระดับสั่งตัดพิเศษ ออกแบบเพื่อความสบายสูงสุดยามสวมใส่",
    image: "assets/images/glasses_rimless_clean.jpg"
  },
  {
    id: "frame_vintage_15",
    name: "Amber Boston Retro Acetate",
    category: "vintage",
    categoryLabel: "วินเทจ/คลาสสิก",
    price: 1290,
    originalPrice: 1750,
    badge: "วินเทจ 🕶️",
    desc: "ทรงบอสตันสีชาอำพัน กรอบโค้งมนลงตัว แมตช์กับการแต่งตัวสไตล์วินเทจและเอิร์ธโทน",
    image: "assets/images/glasses_tortoiseshell_clean.jpg"
  },
  {
    id: "frame_gaming_16",
    name: "Ergonomic Dark Stealth Gamer",
    category: "gaming",
    categoryLabel: "เกมมิ่ง & กรองแสง",
    price: 990,
    originalPrice: 1390,
    badge: "เกมเมอร์ ⚡",
    desc: "กรอบสปอร์ตสีดำล้วน ออกแบบตามสรีระใบหน้า ขาแว่นหนึบกระชับไม่ลื่นหลุด",
    image: "assets/images/glasses_matte_square_clean.jpg"
  },
  {
    id: "frame_care_17",
    name: "Nano Anti-Fog Lens Cleaner Kit",
    category: "care",
    categoryLabel: "อุปกรณ์ดูแลแว่น",
    price: 290,
    originalPrice: 450,
    badge: "ไอเทมคู่หู 🧼",
    desc: "สเปรย์ทำความสะอาดเลนส์นาโนกันฝ้า 30ml พร้อมผ้าไมโครไฟเบอร์พรีเมียม ไม่ทิ้งคราบ",
    image: "assets/images/lens_cleaner_kit.jpg"
  },
  {
    id: "frame_care_18",
    name: "Handcrafted Magnetic Leather Case",
    category: "care",
    categoryLabel: "อุปกรณ์ดูแลแว่น",
    price: 390,
    originalPrice: 650,
    badge: "หนังแท้ 🎁",
    desc: "กล่องใส่แว่นตาหนังแท้เย็บมือ ฝาปิดแม่เหล็ก บุผ้ากำมะหยี่ด้านใน กันรอยขีดข่วน 100%",
    image: "assets/images/leather_glasses_case.jpg"
  }
];

// Slides for Hero Carousel Showcase
const HERO_SLIDES = [
  {
    id: "frame_minimal_01",
    name: "Minimalist Round Matte",
    badge: "🔥 Best Seller #1",
    desc: "กรอบกลมทรงเกาหลี น้ำหนักเบาเพียง 12 กรัม ใส่สบายไม่กดดั้ง",
    price: 890,
    image: "assets/images/glasses_minimal_round_1787761859075.jpg"
  },
  {
    id: "frame_vintage_02",
    name: "Classic Aviator Pilot",
    badge: "✨ Classic Icon",
    desc: "กรอบทรงนักบินสะพานคู่ คลาสสิกเหนือกาลเวลา ลุคเท่ดูมั่นใจ",
    price: 1190,
    image: "assets/images/glasses_classic_aviator_1787761881857.jpg"
  },
  {
    id: "frame_gaming_03",
    name: "Cyber Square Gamer Shield",
    badge: "💻 Gaming Choice",
    desc: "ออกแบบพิเศษสำหรับสายหน้าจอ ขาแว่นใส่ครอบหูฟังได้ไม่เจ็บ",
    price: 990,
    image: "assets/images/glasses_cyber_square_1787762109576.jpg"
  },
  {
    id: "frame_fashion_04",
    name: "Cat-Eye Sleek Luxury",
    badge: "🌟 Fashion Trend",
    desc: "ทรงตาแมวยกมุม เพิ่มความเฉี่ยว มีสไตล์ ช่วยให้ใบหน้าดูเรียวยาว",
    price: 1290,
    image: "assets/images/glasses_cateye_luxury_1787762132982.jpg"
  },
  {
    id: "frame_titanium_05",
    name: "Titanium Hexagon Slim",
    badge: "🪶 Ultra Light Weight",
    desc: "กรอบหกเหลี่ยมไทเทเนียม ทรงโมเดิร์น แข็งแรงทนทาน ใส่ได้ทุกโอกาส",
    price: 1390,
    image: "assets/images/glasses_titanium_hexagon_1787762363088.jpg"
  }
];

// ==========================================
// 2. Application State & Storage
// ==========================================
let currentTheme = localStorage.getItem("xcoco_theme") || "light";
let cart = JSON.parse(localStorage.getItem("xcoco_cart")) || [];
let currentUser = JSON.parse(localStorage.getItem("xcoco_current_user")) || null;
let registeredUsers = JSON.parse(localStorage.getItem("xcoco_users")) || [
  {
    name: "คุณสมชาย มุ่งมั่น",
    phone: "0812345678",
    email: "demo@xcoco.com",
    birthdate: "1998-05-15",
    address: "123/45 หมู่ 6 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    password: "1234",
    rx: { rSph: "-2.00", lSph: "-1.75", pd: "62" }
  }
];

// Wishlist, Recently Viewed, Order History & AI Recommendation State
let wishlist = JSON.parse(localStorage.getItem("xcoco_wishlist")) || [];
let recentlyViewed = JSON.parse(localStorage.getItem("xcoco_recently_viewed")) || ["frame_minimal_01", "frame_vintage_02", "frame_titanium_06"];
let orderHistory = JSON.parse(localStorage.getItem("xcoco_order_history")) || [
  {
    orderId: "#XC-84291",
    date: "8 ก.ย. 2026",
    items: [
      {
        productId: "frame_minimal_01",
        name: "Minimalist Round Matte",
        unitPrice: 890,
        quantity: 1,
        image: "assets/images/glasses_minimal_round_1787761859075.jpg",
        rxSummary: "เลนส์สายตา (R: -1.50, L: -1.50, PD: 62mm)"
      }
    ],
    subtotal: 890,
    discountAmount: 0,
    total: 890,
    deliveryAddress: "คุณสมชาย สายตาดี - 123/45 หมู่ 6 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    status: "processing",
    statusText: "กำลังเจียระไนเลนส์",
    step: 2
  }
];
let activeRecomFilter = "all";
let currentFaceShape = "oval";
let pendingOrderData = null;
let currentLensTint = "clear";

async function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const birthdate = document.getElementById("regBirthdate").value;
  const address = document.getElementById("regAddress") ? document.getElementById("regAddress").value.trim() : "";
  const pass = document.getElementById("regPassword").value;
  const agreeTerms = document.getElementById("regAgreeTerms").checked;
  const rSph = document.getElementById("regRightSph").value || "-1.50";
  const lSph = document.getElementById("regLeftSph").value || "-1.50";
  const pd = document.getElementById("regPd").value || "62";
  const errorMsg = document.getElementById("regErrorMsg");

  if (!agreeTerms) {
    errorMsg.innerText = "❌ กรุณาทำเครื่องหมายยินยอมตามเงื่อนไขการให้บริการและนโยบายความเป็นส่วนตัว";
    return;
  }

  const newUser = {
    name,
    phone,
    email,
    birthdate,
    address,
    password: pass,
    right_sph: rSph,
    left_sph: lSph,
    pd: parseInt(pd, 10) || 62,
    member_tier: "Classic Member",
    totalSpent: 0,
    rx: { rSph, lSph, pd }
  };

  // Local Storage Save
  if (!registeredUsers.some(u => u.email.toLowerCase() === email)) {
    registeredUsers.push(newUser);
    localStorage.setItem("xcoco_users", JSON.stringify(registeredUsers));
  }
  currentUser = newUser;
  localStorage.setItem("xcoco_current_user", JSON.stringify(currentUser));
  initAuthUI();
  closeAuthModal();

  // Call PHP Backend API (MySQL + PHPMailer SMTP)
  try {
    const res = await fetch("backend/api_register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    const data = await res.json();
    if (data && data.success) {
      alert(`🎉 สมัครสมาชิกสำเร็จ!\n\nยินดีต้อนรับคุณ ${name} สู่ครอบครัว XCOCO\n📧 ระบบได้จัดส่งอีเมลสรุปข้อมูลสมาชิกและโค้ดลับ 20% ไปยัง ${email} แล้วครับ`);
      return;
    }
  } catch (err) {
    // Graceful fallback for local file:/// preview
    console.log("PHP API Notice:", err);
  }

  alert(`🎉 สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${name} สู่ครอบครัว XCOCO Eyewear\n(ระบบได้ส่งอีเมลยืนยันข้อมูลสมาชิกไปยัง ${email} เรียบร้อยแล้ว)`);
}

// Newsletter Subscription Handler
async function handleNewsletterSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById("newsletterEmail");
  const msgEl = document.getElementById("newsletterMsg");
  const btn = document.getElementById("newsletterBtn");
  const email = emailInput.value.trim().toLowerCase();

  if (!email) return;

  msgEl.className = "newsletter-msg";
  msgEl.innerText = "⏳ กำลังดำเนินการและส่งอีเมล...";
  if (btn) btn.disabled = true;

  try {
    const res = await fetch("backend/api_subscribe.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data && data.success) {
      msgEl.className = "newsletter-msg success";
      msgEl.innerHTML = `🎉 <strong>สมัครรับข่าวสารสำเร็จ!</strong><br>ระบบได้ส่งอีเมลแนะนำสินค้าคอลเลกชันใหม่ และโค้ดส่วนลด 10% ไปยัง <strong>${email}</strong> เรียบร้อยแล้ว 👓`;
      emailInput.value = "";
      if (btn) btn.disabled = false;
      return;
    } else {
      msgEl.className = "newsletter-msg error";
      msgEl.innerText = data.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    }
  } catch (err) {
    // Fallback if PHP server is not active
    msgEl.className = "newsletter-msg success";
    msgEl.innerHTML = `🎉 <strong>สมัครรับข่าวสารสำเร็จ!</strong><br>ระบบได้จำลองการส่งอีเมลแนะนำสินค้าและโค้ดส่วนลดไปยัง <strong>${email}</strong> เรียบร้อยแล้ว 👓`;
    emailInput.value = "";
  }

  if (btn) btn.disabled = false;
}

function toggleTermsDetail() {
  const box = document.getElementById("termsDetailBox");
  if (box) {
    box.style.display = box.style.display === "none" ? "block" : "none";
  }
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("xcoco_current_user");
  initAuthUI();
  document.getElementById("userMenuContent").style.display = "none";
  alert("ออกจากระบบเรียบร้อยแล้ว 🕶️");
}

function openProfileModal(initialTab = 'info') {
  if (!currentUser) {
    openAuthModal('login');
    return;
  }
  toggleEditProfileMode(false);
  const menu = document.getElementById("userMenuContent");
  if (menu) menu.style.display = "none";
  
  document.getElementById("profileUserName").innerText = currentUser.name;
  document.getElementById("profileUserEmail").innerText = currentUser.email;
  
  // Phone, Birthdate & Address
  document.getElementById("profileUserPhone").innerText = currentUser.phone || "-";
  
  if (currentUser.birthdate) {
    const d = new Date(currentUser.birthdate);
    const dateStr = d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById("profileUserBirthdate").innerText = dateStr;
  } else {
    document.getElementById("profileUserBirthdate").innerText = "-";
  }

  document.getElementById("profileUserAddress").innerText = currentUser.address || "ยังไม่ได้ระบุที่อยู่";

  const rx = currentUser.rx || { rSph: "-1.50", lSph: "-1.50", pd: "62" };
  document.getElementById("profileRightSph").innerText = rx.rSph;
  document.getElementById("profileLeftSph").innerText = rx.lSph;
  document.getElementById("profilePd").innerText = `${rx.pd} mm`;

  updateMemberTierUI();
  switchProfileTab(initialTab);

  document.getElementById("profileModal").classList.add("active");
}

function switchProfileTab(tab) {
  const tabInfoBtn = document.getElementById("tabProfileInfoBtn");
  const tabOrdersBtn = document.getElementById("tabProfileOrdersBtn");
  const infoContent = document.getElementById("profileInfoTabContent");
  const ordersContent = document.getElementById("profileOrdersTabContent");
  const editBtn = document.getElementById("btnEditProfileMode");

  if (!tabInfoBtn || !tabOrdersBtn) return;

  if (tab === "orders") {
    tabInfoBtn.classList.remove("active");
    tabOrdersBtn.classList.add("active");
    if (infoContent) infoContent.style.display = "none";
    if (ordersContent) ordersContent.style.display = "block";
    if (editBtn) editBtn.style.display = "none";
    renderOrderHistory();
  } else {
    tabInfoBtn.classList.add("active");
    tabOrdersBtn.classList.remove("active");
    if (infoContent) infoContent.style.display = "block";
    if (ordersContent) ordersContent.style.display = "none";
    if (editBtn) editBtn.style.display = "inline-block";
  }
}

function renderOrderHistory() {
  const container = document.getElementById("ordersListContainer");
  const ordersCountEl = document.getElementById("profileOrdersCount");
  if (ordersCountEl) ordersCountEl.innerText = orderHistory.length;
  if (!container) return;

  if (orderHistory.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view" style="padding: 2.5rem 1rem;">
        <span style="font-size: 3rem;">📦</span>
        <h4>ยังไม่มีประวัติการสั่งซื้อ</h4>
        <p>คุณยังไม่ได้สั่งตัดแว่นตากับ XCOCO เริ่มสั่งแว่นตาชิ้นแรกพร้อมรับสิทธิพิเศษได้เลยครับ</p>
        <button class="btn btn-primary mt-2" onclick="closeProfileModal(); window.location.href='#products';">เลือกชมแว่นตาเลย 👓</button>
      </div>
    `;
    return;
  }

  container.innerHTML = orderHistory.map(order => `
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <span class="order-id">${order.orderId}</span>
          <div class="order-date">📅 สั่งซื้อเมื่อ: ${order.date}</div>
        </div>
        <span class="order-status-badge ${order.status === 'completed' ? 'status-completed' : 'status-in-progress'}">
          ${order.status === 'completed' ? '🟢 จัดส่งสำเร็จ' : '🟡 กำลังประกอบเลนส์ (QC)'}
        </span>
      </div>

      <!-- 4-Step Production Timeline Stepper -->
      <div class="order-stepper">
        <div class="step-node done">
          <span class="step-circle">✓</span>
          <span>1. รับออเดอร์</span>
        </div>
        <div class="step-node ${order.step >= 2 ? 'done' : 'current'}">
          <span class="step-circle">${order.step >= 2 ? '✓' : '2'}</span>
          <span>2. เจียรเลนส์</span>
        </div>
        <div class="step-node ${order.step >= 3 ? 'done' : (order.step === 2 ? 'current' : '')}">
          <span class="step-circle">${order.step >= 3 ? '✓' : '3'}</span>
          <span>3. ตรวจ QC</span>
        </div>
        <div class="step-node ${order.step >= 4 ? 'done' : ''}">
          <span class="step-circle">4</span>
          <span>4. จัดส่งด่วน</span>
        </div>
      </div>

      <div class="order-items-list">
        ${order.items.map(item => `
          <div class="order-item-mini">
            <img src="${item.image || 'assets/images/glasses_minimal_round_1787761859075.jpg'}" alt="${item.name}">
            <div class="order-item-mini-info">
              <strong>${item.name} x ${item.quantity}</strong>
              <small>${item.rxSummary || 'เลนส์มาตรฐาน'}</small>
            </div>
            <div style="font-weight: 700; font-size: 0.9rem;">฿${(item.unitPrice * item.quantity).toLocaleString()}</div>
          </div>
        `).join("")}
      </div>

      <div class="order-card-footer">
        <div class="order-total-text">
          ยอดรวมสุทธิ: <strong style="color: var(--accent-primary);">฿${order.total.toLocaleString()}</strong>
        </div>
        <div class="order-actions-wrap">
          <button class="btn btn-secondary btn-sm" onclick="printReceiptForOrder('${order.orderId}')">🖨️ พิมพ์ใบเสร็จ</button>
          <button class="btn btn-primary btn-sm" onclick="reorderItems('${order.orderId}')">🔄 สั่งซื้ออีกครั้ง</button>
        </div>
      </div>
    </div>
  `).join("");
}

function reorderItems(orderId) {
  const order = orderHistory.find(o => o.orderId === orderId);
  if (!order) return;

  order.items.forEach(item => {
    cart.push({
      cartId: "item_" + Date.now() + Math.floor(Math.random() * 1000),
      productId: item.productId || "frame_minimal_01",
      name: item.name,
      categoryLabel: item.categoryLabel || "แว่นตาสั่งตัด",
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      image: item.image,
      rxSummary: item.rxSummary,
      options: item.options || {}
    });
  });

  saveCart();
  closeProfileModal();
  openCartDrawer();
  alert(`🛒 เพิ่มรายการจากคำสั่งซื้อ ${orderId} ลงในตะกร้าเรียบร้อยแล้วครับ!`);
}

function printReceiptForOrder(orderId) {
  const order = orderHistory.find(o => o.orderId === orderId);
  if (!order) return;

  document.getElementById("receiptOrderId").innerText = order.orderId;
  document.getElementById("receiptDate").innerText = order.date;
  const addressEl = document.getElementById("receiptDeliveryAddress");
  if (addressEl) addressEl.innerText = order.deliveryAddress || "จัดส่งตามที่อยู่โปรไฟล์";

  const receiptList = document.getElementById("receiptItemsList");
  receiptList.innerHTML = order.items.map(item => `
    <div class="receipt-item-row">
      <span>${item.name} x ${item.quantity}</span>
      <strong>฿${(item.unitPrice * item.quantity).toLocaleString()}</strong>
    </div>
    <small style="color: var(--text-muted); font-size: 0.75rem;">${item.rxSummary}</small>
  `).join("");

  document.getElementById("receiptFinalTotal").innerText = `฿${order.total.toLocaleString()}`;
  closeProfileModal();
  document.getElementById("checkoutModal").classList.add("active");
}

function closeProfileModal() {
  const modal = document.getElementById("profileModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function toggleEditProfileMode(isEdit) {
  const viewSection = document.getElementById("profileViewSection");
  const editSection = document.getElementById("profileEditSection");
  const viewFooter = document.getElementById("profileViewFooter");
  const editFooter = document.getElementById("profileEditFooter");

  if (isEdit) {
    if (!currentUser) return;
    viewSection.style.display = "none";
    editSection.style.display = "block";
    viewFooter.style.display = "none";
    editFooter.style.display = "flex";

    // Populate current values into edit form
    document.getElementById("editProfilePhone").value = currentUser.phone || "";
    document.getElementById("editProfileAddress").value = currentUser.address || "";
    
    const rx = currentUser.rx || { rSph: "-1.50", lSph: "-1.50", pd: "62" };
    const rightSelect = document.getElementById("editProfileRightSph");
    const leftSelect = document.getElementById("editProfileLeftSph");
    const pdInput = document.getElementById("editProfilePd");

    // Match SPH dropdowns
    const setSelectVal = (selectEl, val) => {
      if (!selectEl) return;
      let num = parseFloat(val);
      if (isNaN(num)) num = -1.50;
      if (Math.abs(num) >= 50) num = -num / 100;
      let formatted = (num > 0 ? "+" : "") + num.toFixed(2);
      if (num === 0) formatted = "0.00";
      for (let opt of selectEl.options) {
        if (opt.value === formatted || parseFloat(opt.value) === num) {
          selectEl.value = opt.value;
          return;
        }
      }
    };

    setSelectVal(rightSelect, rx.rSph);
    setSelectVal(leftSelect, rx.lSph);
    if (pdInput) pdInput.value = rx.pd || "62";

  } else {
    viewSection.style.display = "block";
    editSection.style.display = "none";
    viewFooter.style.display = "flex";
    editFooter.style.display = "none";
  }
}

function saveProfileChanges() {
  if (!currentUser) return;

  const newPhone = document.getElementById("editProfilePhone").value.trim();
  const newAddress = document.getElementById("editProfileAddress").value.trim();
  const newRightSph = document.getElementById("editProfileRightSph").value;
  const newLeftSph = document.getElementById("editProfileLeftSph").value;
  const newPd = document.getElementById("editProfilePd").value.trim() || "62";

  // Update current user
  currentUser.phone = newPhone;
  currentUser.address = newAddress;
  currentUser.rx = {
    rSph: newRightSph,
    lSph: newLeftSph,
    pd: newPd
  };

  // Update in users array
  const userIdx = registeredUsers.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
  if (userIdx !== -1) {
    registeredUsers[userIdx] = currentUser;
    localStorage.setItem("xcoco_users", JSON.stringify(registeredUsers));
  }
  localStorage.setItem("xcoco_current_user", JSON.stringify(currentUser));

  // Refresh profile display
  openProfileModal();
  alert("💾 บันทึกข้อมูลและค่าสายตาใหม่เรียบร้อยแล้ว!");
}

// ==========================================
// 2.1 Wishlist Management (❤️)
// ==========================================
function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx !== -1) {
    wishlist.splice(idx, 1);
  } else {
    wishlist.push(productId);
  }
  localStorage.setItem("xcoco_wishlist", JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
  renderSmartRecommendations();
}

function updateWishlistUI() {
  const badge = document.getElementById("wishlistBadge");
  const drawerCount = document.getElementById("wishlistDrawerCount");
  const container = document.getElementById("wishlistItemsContainer");

  if (badge) {
    badge.innerText = wishlist.length;
    badge.style.display = wishlist.length > 0 ? "inline-block" : "none";
  }
  if (drawerCount) drawerCount.innerText = wishlist.length;

  if (container) {
    if (wishlist.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-view" style="padding: 3rem 1.5rem;">
          <span style="font-size: 3rem;">🤍</span>
          <h4>ยังไม่มีสินค้าที่ถูกใจ</h4>
          <p>กดไอคอนหัวใจที่มุมรูปแว่นตา เพื่อบันทึกสินค้าที่คุณชอบไว้ดูภายหลัง</p>
        </div>
      `;
      return;
    }

    const wishProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
    container.innerHTML = wishProducts.map(p => `
      <div class="cart-item-card">
        <img src="${p.image}" alt="${p.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4 class="cart-item-title" title="${p.name}">${p.name}</h4>
          <span class="cart-item-price">฿${p.price.toLocaleString()}</span>
          <div style="display: flex; gap: 0.4rem; margin-top: 0.4rem;">
            <button class="btn btn-primary btn-sm" onclick="closeWishlistDrawer(); openCustomizerModal('${p.id}');" style="padding: 0.35rem 0.75rem; font-size: 0.82rem;">สั่งตัดเลนส์ 👓</button>
            <button class="btn btn-secondary btn-sm" onclick="toggleWishlist('${p.id}')" style="padding: 0.35rem 0.6rem; font-size: 0.82rem; color: #ef4444;" title="ลบออกจากรายการที่ชอบ">ลบออก</button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function openWishlistDrawer() {
  updateWishlistUI();
  const backdrop = document.getElementById("wishlistBackdrop");
  const drawer = document.getElementById("wishlistDrawer");
  if (backdrop) backdrop.classList.add("active");
  if (drawer) drawer.classList.add("active");
}

function closeWishlistDrawer() {
  const backdrop = document.getElementById("wishlistBackdrop");
  const drawer = document.getElementById("wishlistDrawer");
  if (backdrop) backdrop.classList.remove("active");
  if (drawer) drawer.classList.remove("active");
}

// ==========================================
// 2.2 AI & Behavioral Recommendations (Requirement #5)
// ==========================================
function trackProductView(productId) {
  if (!recentlyViewed.includes(productId)) {
    recentlyViewed.unshift(productId);
    if (recentlyViewed.length > 8) recentlyViewed.pop();
    localStorage.setItem("xcoco_recently_viewed", JSON.stringify(recentlyViewed));
    renderSmartRecommendations();
  }
}

function filterRecommendations(filterType) {
  activeRecomFilter = filterType;
  const chips = document.querySelectorAll(".recom-chip");
  chips.forEach(c => c.classList.toggle("active", c.getAttribute("data-recom") === filterType));
  renderSmartRecommendations();
}

function renderSmartRecommendations() {
  const container = document.getElementById("recommendProductGrid");
  if (!container) return;

  let list = [];
  
  if (activeRecomFilter === "recent") {
    list = PRODUCTS.filter(p => recentlyViewed.includes(p.id)).map(p => ({
      ...p,
      reasonBadge: "👁️ เพิ่งดูล่าสุด"
    }));
  } else if (activeRecomFilter === "face") {
    const faceCatMap = {
      oval: ["vintage", "titanium"],
      round: ["fashion", "gaming"],
      square: ["minimal", "vintage"],
      heart: ["titanium", "vintage"]
    };
    const cats = faceCatMap[currentFaceShape] || ["vintage", "titanium"];
    list = PRODUCTS.filter(p => cats.includes(p.category)).map(p => ({
      ...p,
      reasonBadge: `🎯 แมตช์ตาม${FACE_MATCH_DATA[currentFaceShape]?.title || "รูปหน้าคุณ"}`
    }));
  } else if (activeRecomFilter === "wishlist") {
    list = PRODUCTS.filter(p => wishlist.includes(p.id)).map(p => ({
      ...p,
      reasonBadge: "❤️ จากรายการที่คุณถูกใจ"
    }));
    if (list.length === 0) {
      list = PRODUCTS.slice(0, 4).map(p => ({ ...p, reasonBadge: "🔥 แนะนำสำหรับคุณ" }));
    }
  } else if (activeRecomFilter === "cross") {
    list = PRODUCTS.filter(p => p.category === "care" || p.price <= 990).slice(0, 4).map(p => ({
      ...p,
      reasonBadge: "✨ ไอเทมคู่หูสำหรับคุณ"
    }));
  } else {
    // "all": Smart curated mix
    const recents = PRODUCTS.filter(p => recentlyViewed.includes(p.id)).slice(0, 2).map(p => ({ ...p, reasonBadge: "👁️ แวะดูล่าสุด" }));
    const faceMatches = PRODUCTS.filter(p => p.id === "frame_titanium_06" || p.id === "frame_fashion_04").map(p => ({ ...p, reasonBadge: "🎯 เหมาะกับรูปหน้า" }));
    const careItems = PRODUCTS.filter(p => p.category === "care").slice(0, 1).map(p => ({ ...p, reasonBadge: "✨ ไอเทมคู่หูดูแลแว่น" }));
    const trending = PRODUCTS.filter(p => p.id === "frame_vintage_07").map(p => ({ ...p, reasonBadge: "🔥 รุ่นยอดนิยมประจำสัปดาห์" }));

    const combined = [...recents, ...faceMatches, ...careItems, ...trending];
    const seen = new Set();
    list = combined.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }

  if (list.length === 0) {
    list = PRODUCTS.slice(0, 4).map(p => ({ ...p, reasonBadge: "🔥 แนะนำสำหรับคุณ" }));
  }

  container.innerHTML = list.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    return `
      <div class="product-card">
        <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}')" title="บันทึกในรายการที่ชอบ">
          ${isWishlisted ? '❤️' : '🤍'}
        </button>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
          <div class="recom-reason-tag">${product.reasonBadge || "🤖 AI คัดสรร"}</div>
          <span class="product-cat">${product.categoryLabel}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.desc}</p>
          <div class="product-footer">
            <div class="product-price-box">
              <span class="product-price">฿${product.price.toLocaleString()}</span>
              ${product.originalPrice ? `<span class="old-price">฿${product.originalPrice.toLocaleString()}</span>` : ""}
            </div>
            <button class="btn btn-primary btn-select-rx" onclick="openCustomizerModal('${product.id}')">
              ${product.category === 'care' ? 'สั่งซื้อเลย 🛒' : 'ตัดเลนส์ / เลือก 👓'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

let activeCategory = "all";
let searchQuery = "";
let currentSelectingProduct = null;
let appliedDiscount = 0;
let uploadedSlipData = null;

// Hero Carousel state
let currentSlideIndex = 0;
let carouselTimer = null;

// Mini-game state
let gameScore = 0;
let gameTimerSeconds = 15;
let gameTimerInterval = null;
let gameTargetScore = 5;

// ==========================================
// 3. Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initAuthUI();
  populatePrescriptionDropdowns();
  renderProducts();
  setupCategoryTabs();
  updateCartUI();
  updateWishlistUI();
  renderSmartRecommendations();
  renderOrderHistory();
  initHeroCarousel();
  initNavScrollSpy();

  // Attach event listeners
  document.getElementById("themeToggleBtn").addEventListener("click", toggleTheme);
  document.getElementById("cartBtn").addEventListener("click", openCartDrawer);

  // Close user dropdown when clicking outside
  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("userProfileDropdown");
    const menu = document.getElementById("userMenuContent");
    if (dropdown && !dropdown.contains(e.target) && menu) {
      menu.style.display = "none";
    }
  });
});

// ==========================================
// 4. Hero Carousel Slider Showcase
// ==========================================
function initHeroCarousel() {
  updateSlide();
  startCarouselAutoPlay();
}

function updateSlide() {
  const slide = HERO_SLIDES[currentSlideIndex];
  if (!slide) return;

  const imgEl = document.getElementById("slideImg");
  const badgeEl = document.getElementById("slideBadge");
  const titleEl = document.getElementById("slideTitle");
  const descEl = document.getElementById("slideDesc");
  const priceEl = document.getElementById("slidePrice");
  const actionBtn = document.getElementById("slideActionBtn");

  if (imgEl) {
    imgEl.style.opacity = "0";
    setTimeout(() => {
      imgEl.src = slide.image;
      imgEl.style.opacity = "1";
    }, 150);
  }

  if (badgeEl) badgeEl.innerText = slide.badge;
  if (titleEl) titleEl.innerText = slide.name;
  if (descEl) descEl.innerText = slide.desc;
  if (priceEl) priceEl.innerText = `฿${slide.price.toLocaleString()}`;
  if (actionBtn) {
    actionBtn.onclick = () => openCustomizerModal(slide.id);
  }

  // Update dots
  const dots = document.querySelectorAll(".carousel-dots .dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % HERO_SLIDES.length;
  updateSlide();
  resetCarouselAutoPlay();
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  updateSlide();
  resetCarouselAutoPlay();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlide();
  resetCarouselAutoPlay();
}

function startCarouselAutoPlay() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % HERO_SLIDES.length;
    updateSlide();
  }, 4500);
}

function resetCarouselAutoPlay() {
  startCarouselAutoPlay();
}

// Model Lookbook Background Switcher
const MODEL_PHOTOS = [
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80"
];

function switchModelBg(index, btnEl) {
  const modelImg = document.getElementById("activeModelBg");
  const buttons = document.querySelectorAll(".lookbook-thumb-btn");

  buttons.forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  if (modelImg) {
    modelImg.style.opacity = "0";
    setTimeout(() => {
      modelImg.src = MODEL_PHOTOS[index];
      modelImg.style.opacity = document.documentElement.getAttribute("data-theme") === "dark" ? "0.22" : "0.28";
    }, 200);
  }
}

// ==========================================
// 5. Theme Toggle (Black & White / Dark & Light)
// ==========================================
function initTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("xcoco_theme", currentTheme);
}

// ==========================================
// 6. User Authentication & Profile & Loyalty Tier
// ==========================================
function calculateMemberTier(spent = 0) {
  spent = Number(spent) || 0;
  if (spent >= 3500) {
    return {
      tier: "vip",
      name: "VIP Member",
      badgeText: "👑 VIP",
      badgeClass: "tier-vip",
      nextTierText: "ระดับสูงสุด VIP แล้ว ✨",
      progressPercent: 100
    };
  } else if (spent >= 1500) {
    const needed = 3500 - spent;
    const pct = Math.min(100, Math.max(10, Math.round(((spent - 1500) / 2000) * 100)));
    return {
      tier: "silver",
      name: "Silver Member",
      badgeText: "🥈 Silver",
      badgeClass: "tier-silver",
      nextTierText: `อีก ฿${needed.toLocaleString()} สู่ VIP 👑`,
      progressPercent: pct
    };
  } else {
    const needed = 1500 - spent;
    const pct = Math.min(100, Math.max(0, Math.round((spent / 1500) * 100)));
    return {
      tier: "classic",
      name: "Classic Member",
      badgeText: "🥉 Classic",
      badgeClass: "tier-classic",
      nextTierText: `อีก ฿${needed.toLocaleString()} สู่ Silver`,
      progressPercent: pct
    };
  }
}

function updateMemberTierUI() {
  if (!currentUser) return;
  const spent = currentUser.totalSpent || 0;
  const tierInfo = calculateMemberTier(spent);
  currentUser.member_tier = tierInfo.name;

  // Nav Badge
  const navBadge = document.getElementById("navUserTierBadge");
  if (navBadge) {
    navBadge.className = `user-tier-badge ${tierInfo.badgeClass}`;
    navBadge.innerText = tierInfo.badgeText;
  }

  // Dropdown Menu
  const menuBadge = document.getElementById("menuUserTierBadge");
  if (menuBadge) {
    menuBadge.className = `user-tier-badge ${tierInfo.badgeClass}`;
    menuBadge.innerText = tierInfo.badgeText;
  }

  const menuSpent = document.getElementById("menuUserSpent");
  if (menuSpent) menuSpent.innerText = `฿${spent.toLocaleString()}`;

  const nextTierText = document.getElementById("menuNextTierText");
  if (nextTierText) nextTierText.innerText = tierInfo.nextTierText;

  const progressFill = document.getElementById("menuTierProgressFill");
  if (progressFill) progressFill.style.width = `${tierInfo.progressPercent}%`;

  // Profile Modal (if open)
  const profileBadge = document.getElementById("profileTierBadge");
  if (profileBadge) {
    profileBadge.className = `user-tier-badge ${tierInfo.badgeClass}`;
    profileBadge.innerText = `${tierInfo.badgeText} Member`;
  }

  const profileSpent = document.getElementById("profileTotalSpent");
  if (profileSpent) profileSpent.innerText = `฿${spent.toLocaleString()}`;

  const profileNextDesc = document.getElementById("profileNextTierDesc");
  if (profileNextDesc) profileNextDesc.innerText = tierInfo.nextTierText;
}

function initAuthUI() {
  const authBtn = document.getElementById("authBtn");
  const userProfileDropdown = document.getElementById("userProfileDropdown");
  const btnAutofill = document.getElementById("btnAutofillProfile");

  if (currentUser) {
    if (typeof currentUser.totalSpent === "undefined") {
      currentUser.totalSpent = 0;
    }
    authBtn.style.display = "none";
    userProfileDropdown.style.display = "block";
    document.getElementById("navUserName").innerText = currentUser.name.split(" ")[0];
    document.getElementById("menuUserFullName").innerText = currentUser.name;
    document.getElementById("menuUserEmail").innerText = currentUser.email;
    if (btnAutofill) btnAutofill.style.display = "inline-flex";

    updateMemberTierUI();
  } else {
    authBtn.style.display = "inline-flex";
    userProfileDropdown.style.display = "none";
    if (btnAutofill) btnAutofill.style.display = "none";
  }
}

function toggleUserMenu() {
  const menu = document.getElementById("userMenuContent");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function openAuthModal(mode = "login") {
  switchAuthTab(mode);
  document.getElementById("authModal").classList.add("active");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active");
  document.getElementById("loginErrorMsg").innerText = "";
  document.getElementById("regErrorMsg").innerText = "";
}

function switchAuthTab(mode) {
  const tabLogin = document.getElementById("tabLoginBtn");
  const tabReg = document.getElementById("tabRegisterBtn");
  const formLogin = document.getElementById("loginForm");
  const formReg = document.getElementById("registerForm");

  if (mode === "login") {
    tabLogin.classList.add("active");
    tabReg.classList.remove("active");
    formLogin.style.display = "flex";
    formReg.style.display = "none";
    document.getElementById("authModalTitle").innerText = "เข้าสู่ระบบสมาชิก XCOCO";
    document.getElementById("authModalSub").innerText = "เข้าสู่ระบบเพื่อรับสิทธิพิเศษและบันทึกค่าสายตา";
  } else {
    tabReg.classList.add("active");
    tabLogin.classList.remove("active");
    formReg.style.display = "flex";
    formLogin.style.display = "none";
    document.getElementById("authModalTitle").innerText = "สมัครสมาชิกใหม่ XCOCO";
    document.getElementById("authModalSub").innerText = "สมัครวันนี้รับสิทธิบันทึกค่าสายตาประจำตัวและโปรโมชันพิเศษ";
  }
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const pass = document.getElementById("loginPassword").value;
  const errorMsg = document.getElementById("loginErrorMsg");

  errorMsg.innerText = "⏳ กำลังเข้าสู่ระบบ...";

  // 1. Try PHP API (MySQL)
  try {
    const res = await fetch("backend/api_login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();
    if (data && data.success && data.user) {
      currentUser = {
        ...data.user,
        totalSpent: parseFloat(data.user.total_spent) || 0,
        rx: {
          rSph: data.user.right_sph || "-1.50",
          lSph: data.user.left_sph || "-1.50",
          pd: data.user.pd || 62
        }
      };
      localStorage.setItem("xcoco_current_user", JSON.stringify(currentUser));
      initAuthUI();
      closeAuthModal();
      alert(`🎉 ยินดีต้อนรับคุณ ${currentUser.name}! เข้าสู่ระบบเรียบร้อยแล้ว`);
      return;
    } else if (data && !data.success) {
      errorMsg.innerText = "❌ " + (data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return;
    }
  } catch (err) {
    console.log("PHP Login fallback:", err);
  }

  // 2. Fallback to LocalStorage (Demo / offline)
  const user = registeredUsers.find(u => u.email.toLowerCase() === email && u.password === pass);
  if (user) {
    currentUser = user;
    localStorage.setItem("xcoco_current_user", JSON.stringify(currentUser));
    initAuthUI();
    closeAuthModal();
    alert(`🎉 ยินดีต้อนรับคุณ ${user.name}! เข้าสู่ระบบเรียบร้อยแล้ว`);
  } else {
    errorMsg.innerText = "❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง (ลอง demo@xcoco.com / 1234)";
  }
}

function autofillRxFromProfile() {
  if (!currentUser || !currentUser.rx) {
    alert("ยังไม่มีค่าสายตาบันทึกไว้ในโปรไฟล์");
    return;
  }

  const { rSph, lSph, pd } = currentUser.rx;
  
  const rightSphSelect = document.getElementById("rightSph");
  const leftSphSelect = document.getElementById("leftSph");
  const pdInput = document.getElementById("inputPd");

  // Helper to normalize and select matching option (e.g. -2 or 100 -> -2.00 or -1.00)
  const setSelectValue = (selectEl, rawVal) => {
    if (!selectEl) return;
    let target = rawVal.toString().trim();
    
    // Check direct match
    for (let opt of selectEl.options) {
      if (opt.value === target) {
        selectEl.value = opt.value;
        return;
      }
    }

    // Try parsing as float (handles 100 -> -1.00 or -2 -> -2.00)
    let num = parseFloat(target);
    if (!isNaN(num)) {
      if (Math.abs(num) >= 50) num = -num / 100; // if user typed 100 or 200
      let formatted = (num > 0 ? "+" : "") + num.toFixed(2);
      if (num === 0) formatted = "0.00";
      
      for (let opt of selectEl.options) {
        if (opt.value === formatted || parseFloat(opt.value) === num) {
          selectEl.value = opt.value;
          return;
        }
      }
    }
  };

  setSelectValue(rightSphSelect, rSph);
  setSelectValue(leftSphSelect, lSph);
  if (pdInput && pd) pdInput.value = pd;

  alert(`⚡ ดึงค่าสายตาของคุณ ${currentUser.name} เรียบร้อยแล้ว (R: ${rightSphSelect ? rightSphSelect.value : rSph}, L: ${leftSphSelect ? leftSphSelect.value : lSph}, PD: ${pd || 62}mm)`);
}

// ==========================================
// 7. Product Grid, Search & Categories
// ==========================================
function renderProducts() {
  const grid = document.getElementById("productGrid");
  let filtered = PRODUCTS;

  // Filter by category
  if (activeCategory !== "all") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // Filter by search query
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q) || 
      p.categoryLabel.toLowerCase().includes(q)
    );
  }

  // Update count badge
  const countAll = document.getElementById("countAll");
  if (countAll) countAll.innerText = PRODUCTS.length;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-search-box">
        <span style="font-size: 2.5rem;">🔍</span>
        <h4>ไม่พบแว่นตาที่ค้นหา "${searchQuery}"</h4>
        <p>ลองค้นหาด้วยคำอื่น เช่น "มินิมอล", "เกมมิ่ง", "ไทเทเนียม" หรือกดเลือกดูทั้งหมด</p>
        <button class="btn btn-secondary mt-2" onclick="clearSearch()">ดูสินค้าทั้งหมด</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    return `
    <div class="product-card">
      <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}')" title="${isWishlisted ? 'ลบออกจากรายการที่ชอบ' : 'บันทึกเป็นสินค้าที่ชอบ'}">
        ${isWishlisted ? '❤️' : '🤍'}
      </button>
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-cat">${product.categoryLabel}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="product-footer">
          <div class="product-price-box">
            <span class="product-price">฿${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span class="old-price">฿${product.originalPrice.toLocaleString()}</span>` : ""}
          </div>
          <button class="btn btn-primary btn-select-rx" onclick="openCustomizerModal('${product.id}')">
            ${product.category === 'care' ? 'สั่งซื้อเลย 🛒' : 'ตัดเลนส์ / เลือก 👓'}
          </button>
        </div>
      </div>
    </div>
  `;
  }).join("");
}

function handleSearch(event) {
  searchQuery = event.target.value;
  renderProducts();
}

function clearSearch() {
  searchQuery = "";
  const input = document.getElementById("productSearchInput");
  if (input) input.value = "";
  activeCategory = "all";
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(t => t.classList.remove("active"));
  const firstTab = document.querySelector('.tab-btn[data-category="all"]');
  if (firstTab) firstTab.classList.add("active");
  renderProducts();
}

function setupCategoryTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.getAttribute("data-category");
      renderProducts();
    });
  });
}

// ==========================================
// 8. Prescription Dropdown Setup (SPH & CYL)
// ==========================================
function populatePrescriptionDropdowns() {
  const rightSph = document.getElementById("rightSph");
  const leftSph = document.getElementById("leftSph");
  const regRightSph = document.getElementById("regRightSph");
  const regLeftSph = document.getElementById("regLeftSph");
  const editProfileRightSph = document.getElementById("editProfileRightSph");
  const editProfileLeftSph = document.getElementById("editProfileLeftSph");
  const rightCyl = document.getElementById("rightCyl");
  const leftCyl = document.getElementById("leftCyl");

  // Sphere options: 0.00 to -10.00 (step 0.25) & +0.25 to +4.00
  let sphHtml = `<option value="0.00">0.00 (ปกติ)</option>`;
  
  // Nearsighted (สั้น)
  sphHtml += `<optgroup label="สายตาสั้น (-)">`;
  for (let i = -0.25; i >= -10.00; i -= 0.25) {
    const val = i.toFixed(2);
    sphHtml += `<option value="${val}" ${val === "-1.50" ? "selected" : ""}>${val}</option>`;
  }
  sphHtml += `</optgroup>`;

  // Farsighted (ยาว)
  sphHtml += `<optgroup label="สายตายาว (+)">`;
  for (let i = 0.25; i <= 4.00; i += 0.25) {
    const val = `+${i.toFixed(2)}`;
    sphHtml += `<option value="${val}">${val}</option>`;
  }
  sphHtml += `</optgroup>`;

  if (rightSph) rightSph.innerHTML = sphHtml;
  if (leftSph) leftSph.innerHTML = sphHtml;
  if (regRightSph) regRightSph.innerHTML = sphHtml;
  if (regLeftSph) regLeftSph.innerHTML = sphHtml;
  if (editProfileRightSph) editProfileRightSph.innerHTML = sphHtml;
  if (editProfileLeftSph) editProfileLeftSph.innerHTML = sphHtml;

  // Cylinder (เอียง): 0.00 to -4.00
  let cylHtml = `<option value="0.00">0.00 (ไม่มีค่าเอียง)</option>`;
  for (let i = -0.25; i >= -4.00; i -= 0.25) {
    const val = i.toFixed(2);
    cylHtml += `<option value="${val}">${val}</option>`;
  }
  if (rightCyl) rightCyl.innerHTML = cylHtml;
  if (leftCyl) leftCyl.innerHTML = cylHtml;
}

// ==========================================
// 9. Prescription Modal Configurator
// ==========================================
function openCustomizerModal(productId) {
  currentSelectingProduct = PRODUCTS.find(p => p.id === productId);
  if (!currentSelectingProduct) return;

  // Track product view for AI Recommendations (Requirement #5)
  trackProductView(productId);

  document.getElementById("modalProductName").innerText = currentSelectingProduct.name;
  document.getElementById("modalProductPrice").innerText = `ราคาเริ่มต้น ฿${currentSelectingProduct.price.toLocaleString()}`;
  
  // Set product image
  const thumbWrap = document.getElementById("modalProductImg");
  thumbWrap.src = currentSelectingProduct.image;

  // Reset lens tint simulator
  simulateLensTint("clear");

  // Reset to default settings
  document.querySelector('input[name="lensType"][value="prescription"]').checked = true;
  document.querySelector('input[name="lensUpgrade"][value="standard"]').checked = true;
  switchRxMode("manual");
  toggleLensForm();
  updateModalTotal();

  document.getElementById("customizerModal").classList.add("active");
}

function simulateLensTint(type) {
  currentLensTint = type;
  const overlay = document.getElementById("lensTintOverlay");
  const chips = document.querySelectorAll(".lens-sim-chip");
  chips.forEach(c => c.classList.remove("active"));
  
  const activeBtn = Array.from(chips).find(c => c.getAttribute("onclick")?.includes(type));
  if (activeBtn) activeBtn.classList.add("active");

  if (overlay) {
    overlay.className = "lens-tint-overlay";
    if (type === "blue") overlay.classList.add("tint-blue");
    else if (type === "photo") overlay.classList.add("tint-photo");
    else if (type === "dark") overlay.classList.add("tint-dark");
  }
}

function closeCustomizerModal() {
  document.getElementById("customizerModal").classList.remove("active");
  currentSelectingProduct = null;
  uploadedSlipData = null;
  document.getElementById("uploadSuccessText").style.display = "none";
}

function toggleLensForm() {
  const selectedType = document.querySelector('input[name="lensType"]:checked').value;
  const rxSection = document.getElementById("prescriptionFieldsSection");
  const upgradeSection = document.getElementById("lensUpgradeSection");
  
  if (selectedType === "prescription") {
    rxSection.style.display = "block";
    upgradeSection.style.display = "block";
  } else if (selectedType === "bluelight") {
    rxSection.style.display = "none";
    upgradeSection.style.display = "block";
  } else {
    // เฉพาะกรอบแว่น: ซ่อนทั้งฟอร์มค่าสายตา และตัวเลือกอัปเกรดเลนส์
    rxSection.style.display = "none";
    upgradeSection.style.display = "none";
  }
  updateModalTotal();
}

function switchRxMode(mode) {
  const btnManual = document.getElementById("tabManual");
  const btnUpload = document.getElementById("tabUpload");
  const contentManual = document.getElementById("manualRxContent");
  const contentUpload = document.getElementById("uploadRxContent");

  if (mode === "manual") {
    btnManual.classList.add("active");
    btnUpload.classList.remove("active");
    contentManual.style.display = "block";
    contentUpload.style.display = "none";
  } else {
    btnUpload.classList.add("active");
    btnManual.classList.remove("active");
    contentManual.style.display = "none";
    contentUpload.style.display = "block";
  }
}

function handleSlipUpload(event) {
  const file = event.target.files[0];
  if (file) {
    uploadedSlipData = file.name;
    document.getElementById("uploadSuccessText").style.display = "block";
    document.getElementById("uploadSuccessText").innerText = `✅ แนบไฟล์ "${file.name}" เรียบร้อยแล้ว`;
  }
}

function updateModalTotal() {
  if (!currentSelectingProduct) return;

  const selectedType = document.querySelector('input[name="lensType"]:checked').value;
  let total = currentSelectingProduct.price;

  if (selectedType !== "frameonly") {
    const selectedUpgrade = document.querySelector('input[name="lensUpgrade"]:checked');
    if (selectedUpgrade) {
      total += parseInt(selectedUpgrade.getAttribute("data-price") || "0", 10);
    }
  }

  document.getElementById("modalTotalCalculated").innerText = `฿${total.toLocaleString()}`;
}

// ==========================================
// 10. Cart Management
// ==========================================
function confirmAddToCart() {
  if (!currentSelectingProduct) return;

  const lensType = document.querySelector('input[name="lensType"]:checked').value;
  const lensUpgradeRadio = document.querySelector('input[name="lensUpgrade"]:checked');
  let upgradePrice = 0;
  
  let upgradeName = "เลนส์ใสมาตรฐาน";
  if (lensType !== "frameonly") {
    upgradePrice = parseInt(lensUpgradeRadio.getAttribute("data-price") || "0", 10);
    if (lensUpgradeRadio.value === "blueblock") upgradeName = "เลนส์ Blue Block (+฿350)";
    if (lensUpgradeRadio.value === "auto_photo") upgradeName = "เลนส์ Auto ปรับแสง (+฿750)";
  }

  let rxSummaryText = "";
  if (lensType === "prescription") {
    const isUploadMode = document.getElementById("tabUpload").classList.contains("active");
    if (isUploadMode && uploadedSlipData) {
      rxSummaryText = `📄 รูปใบวัด: ${uploadedSlipData} | ${upgradeName}`;
    } else {
      const rSph = document.getElementById("rightSph").value;
      const rCyl = document.getElementById("rightCyl").value;
      const rAxis = document.getElementById("rightAxis").value || "-";
      const lSph = document.getElementById("leftSph").value;
      const lCyl = document.getElementById("leftCyl").value;
      const lAxis = document.getElementById("leftAxis").value || "-";
      const pd = document.getElementById("inputPd").value || "62";

      rxSummaryText = `R: ${rSph} (CYL ${rCyl} AXIS ${rAxis}) | L: ${lSph} (CYL ${lCyl} AXIS ${lAxis}) | PD ${pd}mm | ${upgradeName}`;
    }
  } else if (lensType === "bluelight") {
    rxSummaryText = `💻 เลนส์กรองแสงคอมพิวเตอร์ (ไม่มีค่าสายตา) | ${upgradeName}`;
  } else {
    rxSummaryText = `📦 เฉพาะกรอบแว่นตา`;
  }

  const unitPrice = currentSelectingProduct.price + upgradePrice;

  // Add to cart
  const cartItem = {
    cartId: "item_" + Date.now(),
    productId: currentSelectingProduct.id,
    name: currentSelectingProduct.name,
    lensType: lensType,
    rxSummary: rxSummaryText,
    unitPrice: unitPrice,
    quantity: 1
  };

  cart.push(cartItem);
  saveCart();
  closeCustomizerModal();
  openCartDrawer();
}

function saveCart() {
  localStorage.setItem("xcoco_cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const countBadge = document.getElementById("cartCount");
  const drawerCount = document.getElementById("cartDrawerCount");
  const container = document.getElementById("cartItemsContainer");

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  countBadge.innerText = totalQty;
  drawerCount.innerText = totalQty;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <span class="empty-cart-icon">🛒</span>
        <p>ยังไม่มีสินค้าในตะกร้า</p>
        <button class="btn btn-secondary" onclick="closeCartDrawer()">ไปเลือกแว่นตากัน</button>
      </div>
    `;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-header">
          <div>
            <h4 class="cart-item-name">${item.name}</h4>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem('${item.cartId}')" title="ลบรายการ">&times;</button>
        </div>
        <div class="cart-item-rx-details">
          ${item.rxSummary}
        </div>
        <div class="cart-item-footer">
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="changeQty('${item.cartId}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty('${item.cartId}', 1)">+</button>
          </div>
          <span class="cart-item-price">฿${(item.unitPrice * item.quantity).toLocaleString()}</span>
        </div>
      </div>
    `).join("");
  }

  // Calculate pricing breakdown
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount);

  document.getElementById("cartSubtotal").innerText = `฿${subtotal.toLocaleString()}`;
  document.getElementById("cartGrandTotal").innerText = `฿${grandTotal.toLocaleString()}`;

  const discountRow = document.getElementById("discountRow");
  if (appliedDiscount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("discountLabel").innerText = `${appliedDiscount}%`;
    document.getElementById("cartDiscount").innerText = `-฿${discountAmount.toLocaleString()}`;
  } else {
    discountRow.style.display = "none";
  }
}

function changeQty(cartId, delta) {
  const item = cart.find(i => i.cartId === cartId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.cartId !== cartId);
  }
  saveCart();
}

function removeCartItem(cartId) {
  cart = cart.filter(i => i.cartId !== cartId);
  saveCart();
}

function openCartDrawer() {
  // Pre-fill user address if logged in and cart address field is empty
  const addressInput = document.getElementById("checkoutAddress");
  if (addressInput && currentUser && currentUser.address && !addressInput.value) {
    addressInput.value = `${currentUser.name} (${currentUser.phone || ''}) - ${currentUser.address}`;
  }

  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartDrawerBackdrop").classList.add("active");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartDrawerBackdrop").classList.remove("active");
}

// ==========================================
// 11. Marketing Promotions & Coupons
// ==========================================
function applyCoupon() {
  const code = document.getElementById("couponInput").value.trim().toUpperCase();
  const msgEl = document.getElementById("couponMessage");

  if (code === "CLEAR20" || code === "VISION2026") {
    appliedDiscount = 20;
    msgEl.className = "coupon-msg success";
    msgEl.innerText = "🎉 ใช้โค้ดสำเร็จ! ลด 20% สำหรับคำสั่งซื้อนี้";
  } else if (code === "XCOCO30" || code === "GAMER30") {
    appliedDiscount = 30;
    msgEl.className = "coupon-msg success";
    msgEl.innerText = "🔥 โค้ดลับมินิเกมสำเร็จ! ลด 30% ทันที";
  } else if (code === "") {
    appliedDiscount = 0;
    msgEl.innerText = "";
  } else {
    appliedDiscount = 0;
    msgEl.className = "coupon-msg error";
    msgEl.innerText = "❌ ไม่พบโค้ดส่วนลดนี้ หรือหมดอายุแล้ว";
  }
  updateCartUI();
}

function copyPromo(code) {
  navigator.clipboard.writeText(code);
  alert(`คัดลอกโค้ด "${code}" เรียบร้อยแล้ว! สามารถนำไปวางในตะกร้าสินค้าได้เลย`);
}

function copyAndApplyPromo(code) {
  navigator.clipboard.writeText(code);
  appliedDiscount = 30;
  updateCartUI();
  openCartDrawer();
  document.getElementById("couponInput").value = code;
  document.getElementById("couponMessage").className = "coupon-msg success";
  document.getElementById("couponMessage").innerText = "🔥 โค้ดลับมินิเกม 30% ถูกใส่ในตะกร้าแล้ว!";
}

// ==========================================
// 12. Interactive Eye Test Mini-Game
// ==========================================
function startEyeGame() {
  gameScore = 0;
  gameTimerSeconds = 15;
  document.getElementById("gameScore").innerText = gameScore;
  document.getElementById("gameTimer").innerText = gameTimerSeconds;

  document.getElementById("gameStartScreen").style.display = "none";
  document.getElementById("gameResultScreen").style.display = "none";
  document.getElementById("gamePlayScreen").style.display = "flex";

  renderColorGrid();

  clearInterval(gameTimerInterval);
  gameTimerInterval = setInterval(() => {
    gameTimerSeconds--;
    document.getElementById("gameTimer").innerText = gameTimerSeconds;

    if (gameTimerSeconds <= 0) {
      endEyeGame();
    }
  }, 1000);
}

function renderColorGrid() {
  const container = document.getElementById("colorGrid");
  container.innerHTML = "";

  // Generate base color HSL
  const hue = Math.floor(Math.random() * 360);
  const sat = Math.floor(Math.random() * 40) + 40;
  const lightness = Math.floor(Math.random() * 40) + 30;
  
  const delta = Math.max(7, 22 - (gameScore * 2.5));
  const diffLightness = lightness + (Math.random() > 0.5 ? delta : -delta);

  const baseColor = `hsl(${hue}, ${sat}%, ${lightness}%)`;
  const diffColor = `hsl(${hue}, ${sat}%, ${diffLightness}%)`;

  const totalTiles = 9;
  const specialIndex = Math.floor(Math.random() * totalTiles);

  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.className = "color-tile";
    
    if (i === specialIndex) {
      tile.style.backgroundColor = diffColor;
      tile.onclick = () => handleCorrectTile();
    } else {
      tile.style.backgroundColor = baseColor;
      tile.onclick = () => handleWrongTile();
    }
    container.appendChild(tile);
  }
}

function handleCorrectTile() {
  gameScore++;
  document.getElementById("gameScore").innerText = gameScore;
  
  if (gameScore >= gameTargetScore) {
    endEyeGame(true);
  } else {
    renderColorGrid();
  }
}

function handleWrongTile() {
  gameTimerSeconds = Math.max(0, gameTimerSeconds - 1);
  document.getElementById("gameTimer").innerText = gameTimerSeconds;
}

function endEyeGame(instantWin = false) {
  clearInterval(gameTimerInterval);
  document.getElementById("gamePlayScreen").style.display = "none";
  document.getElementById("gameResultScreen").style.display = "flex";

  const resultIcon = document.getElementById("gameResultIcon");
  const resultTitle = document.getElementById("gameResultTitle");
  const resultDesc = document.getElementById("gameResultDesc");
  const rewardBox = document.getElementById("gameRewardBox");

  if (gameScore >= gameTargetScore || instantWin) {
    resultIcon.innerText = "🎉";
    resultTitle.innerText = "สุดยอด! สายตาของคุณเฉียบคมมาก";
    resultDesc.innerText = `คุณทำคะแนนได้ ${gameScore} คะแนน ผ่านเกณฑ์รับรางวัลพิเศษ!`;
    rewardBox.style.display = "flex";
  } else {
    resultIcon.innerText = "💪";
    resultTitle.innerText = "เกือบผ่านแล้ว! พยายามอีกนิดนะ";
    resultDesc.innerText = `คุณทำได้ ${gameScore} คะแนน (เป้าหมายคือ ${gameTargetScore} คะแนน)`;
    rewardBox.style.display = "none";
  }
}

function restartEyeGame() {
  startEyeGame();
}

// ==========================================
// 13. Checkout & Success Modal
// ==========================================
let pendingOrderTotal = 0;

function openCheckoutModal() {
  if (cart.length === 0) {
    alert("กรุณาเลือกสินค้าใส่ตะกร้าก่อนดำเนินการสั่งซื้อครับ 🕶️");
    return;
  }

  const deliveryAddressInput = document.getElementById("checkoutAddress");
  const deliveryAddress = (deliveryAddressInput && deliveryAddressInput.value.trim()) 
    ? deliveryAddressInput.value.trim() 
    : (currentUser && currentUser.address ? `${currentUser.name} - ${currentUser.address}` : "จัดส่งตามที่อยู่ที่ระบุไว้กับทีมงาน");

  const orderId = "#XC-" + Math.floor(10000 + Math.random() * 90000);
  const today = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });

  document.getElementById("receiptOrderId").innerText = orderId;
  document.getElementById("receiptDate").innerText = today;
  
  const receiptAddressEl = document.getElementById("receiptDeliveryAddress");
  if (receiptAddressEl) {
    receiptAddressEl.innerText = deliveryAddress;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount);
  pendingOrderTotal = grandTotal;

  pendingOrderData = {
    orderId,
    date: today,
    items: JSON.parse(JSON.stringify(cart)),
    subtotal,
    discountAmount,
    grandTotal,
    deliveryAddress
  };

  const receiptList = document.getElementById("receiptItemsList");
  receiptList.innerHTML = cart.map(item => `
    <div class="receipt-item-row">
      <span>${item.name} x ${item.quantity}</span>
      <strong>฿${(item.unitPrice * item.quantity).toLocaleString()}</strong>
    </div>
    <small style="color: var(--text-muted); font-size: 0.75rem;">${item.rxSummary}</small>
  `).join("");

  document.getElementById("receiptFinalTotal").innerText = `฿${grandTotal.toLocaleString()}`;

  closeCartDrawer();
  document.getElementById("checkoutModal").classList.add("active");
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("active");
}

function finishOrderAndClear() {
  // 1. Accumulate spending if user logged in
  if (currentUser) {
    const oldTier = calculateMemberTier(currentUser.totalSpent || 0).tier;
    currentUser.totalSpent = (currentUser.totalSpent || 0) + pendingOrderTotal;
    const newTierInfo = calculateMemberTier(currentUser.totalSpent);
    currentUser.member_tier = newTierInfo.name;
    
    // Save to LocalStorage
    localStorage.setItem("xcoco_current_user", JSON.stringify(currentUser));
    
    // Also sync with registeredUsers list if exists
    const idx = registeredUsers.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (idx !== -1) {
      registeredUsers[idx].totalSpent = currentUser.totalSpent;
      registeredUsers[idx].member_tier = newTierInfo.name;
      localStorage.setItem("xcoco_registered_users", JSON.stringify(registeredUsers));
    }

    updateMemberTierUI();

    // Check for Tier Upgrade Celebration
    if (oldTier !== newTierInfo.tier) {
      setTimeout(() => {
        if (newTierInfo.tier === "vip") {
          alert(`👑 ว้าววว! ยินดีด้วยครับคุณ ${currentUser.name}!\n\nยอดสั่งซื้อสะสมของคุณถึง ฿${currentUser.totalSpent.toLocaleString()} แล้ว\nคุณได้รับการเลื่อนขั้นเป็น ⭐ VIP Member เรียบร้อยแล้วครับ!\n\n✨ รับสิทธิประโยชน์ส่งฟรีตลอดชีพ และบริการตัดเลนส์ระดับพรีเมียม`);
        } else if (newTierInfo.tier === "silver") {
          alert(`🥈 ยินดีด้วยครับคุณ ${currentUser.name}!\n\nยอดสั่งซื้อสะสมของคุณถึง ฿${currentUser.totalSpent.toLocaleString()} แล้ว\nคุณได้รับการเลื่อนขั้นเป็น Silver Member เรียบร้อยแล้วครับ! 🎉`);
        }
      }, 500);
    }
  }

  // 2. Save Order to Order History (Requirement: Order History & AI Data)
  if (pendingOrderData) {
    orderHistory.unshift({
      orderId: pendingOrderData.orderId,
      date: pendingOrderData.date,
      items: [...pendingOrderData.items],
      subtotal: pendingOrderData.subtotal,
      discountAmount: pendingOrderData.discountAmount,
      total: pendingOrderData.grandTotal,
      deliveryAddress: pendingOrderData.deliveryAddress,
      status: "processing",
      statusText: "กำลังเจียระไนเลนส์",
      step: 2
    });
    localStorage.setItem("xcoco_order_history", JSON.stringify(orderHistory));
    renderOrderHistory();
    renderSmartRecommendations();
  }

  cart = [];
  appliedDiscount = 0;
  pendingOrderTotal = 0;
  saveCart();
  closeCheckoutModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 14. Prescription Guide Modal
// ==========================================
function openPrescriptionGuide() {
  document.getElementById("guideModal").classList.add("active");
}

function closeGuideModal() {
  document.getElementById("guideModal").classList.remove("active");
}

// ==========================================
// 15. Face Shape Matcher Quiz Logic (Requirement #3 & #5)
// ==========================================
const FACE_MATCH_DATA = {
  oval: {
    title: "หน้ารูปไข่ (Oval)",
    desc: "เข้าได้กับแว่นทุกทรง แนะนำทรงเหลี่ยม หรือ ทรงนักบิน เพื่อเพิ่มมิติ",
    recommendedCategory: "vintage"
  },
  round: {
    title: "หน้ากลม (Round)",
    desc: "แนะนำแว่นทรงเหลี่ยม หรือ ทรง Cat-Eye ช่วยให้ใบหน้าดูเรียวยาวขึ้น",
    recommendedCategory: "fashion"
  },
  square: {
    title: "หน้าเหลี่ยม (Square)",
    desc: "แนะนำแว่นทรงกลมมน หรือ วงรี ช่วยปรับเส้นโครงหน้าให้ดูนุ่มนวล",
    recommendedCategory: "minimal"
  },
  heart: {
    title: "หน้ารูปหัวใจ (Heart)",
    desc: "แนะนำแว่นทรง Browline หรือ แว่นไร้กรอบ ช่วยสร้างความสมดุล",
    recommendedCategory: "titanium"
  }
};

function selectFaceShape(shapeKey) {
  currentFaceShape = shapeKey;
  const cards = document.querySelectorAll(".face-card");
  cards.forEach(c => c.classList.remove("active"));
  
  // Find clicked card
  const clickedCard = Array.from(cards).find(c => c.getAttribute("onclick")?.includes(shapeKey));
  if (clickedCard) clickedCard.classList.add("active");

  const data = FACE_MATCH_DATA[shapeKey];
  if (!data) return;

  const resultContainer = document.getElementById("faceMatchResult");
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="match-result-text">
        <span>🎯 แว่นตาที่แนะนำสำหรับ <strong>${data.title}</strong>: ${data.desc}</span>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm" onclick="filterByFaceMatch('${shapeKey}')">กรองดูแว่นที่แนะนำทันที ✨</button>
          <button class="btn btn-primary btn-sm" onclick="triggerFaceMatchEmail('${shapeKey}')">📩 ส่งแว่นที่เหมาะกับฉันเข้าอีเมล</button>
        </div>
      </div>
    `;
  }

  renderSmartRecommendations();
}

function filterByFaceMatch(shapeKey) {
  const data = FACE_MATCH_DATA[shapeKey];
  if (!data) return;

  activeCategory = data.recommendedCategory;
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(t => {
    t.classList.toggle("active", t.getAttribute("data-category") === activeCategory);
  });

  renderProducts();
  window.location.href = "#products";
}

// Personalized Email Trigger Functions (Requirement #3)
function triggerFaceMatchEmail(shapeKey) {
  currentFaceShape = shapeKey;
  renderSmartRecommendations();

  if (currentUser && currentUser.email) {
    sendFaceMatchEmailDirect(currentUser.email, currentUser.name, shapeKey);
  } else {
    const modal = document.getElementById("faceEmailModal");
    const shapeHidden = document.getElementById("faceShapeHidden");
    if (shapeHidden) shapeHidden.value = shapeKey;
    if (modal) modal.classList.add("active");
  }
}

function closeFaceEmailModal() {
  const modal = document.getElementById("faceEmailModal");
  if (modal) modal.classList.remove("active");
}

async function handleSendFaceEmailSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("faceEmailInput").value.trim();
  const name = document.getElementById("faceNameInput").value.trim() || "คุณลูกค้าคนสำคัญ";
  const shape = document.getElementById("faceShapeHidden").value || "oval";
  const statusMsg = document.getElementById("faceEmailStatusMsg");
  const submitBtn = document.getElementById("faceEmailSubmitBtn");

  if (!email) return;

  submitBtn.disabled = true;
  submitBtn.innerText = "⏳ กำลังส่งผลวิเคราะห์...";

  try {
    const res = await fetch("backend/api_personalized_email.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, face_shape: shape })
    });
    const data = await res.json();
    if (data.success) {
      alert(`🎉 ส่งผลวิเคราะห์รูปหน้าและแว่นตาแนะนำไปยัง ${email} สำเร็จเรียบร้อยแล้วครับ! ตรวจสอบ Inbox ได้เลย`);
      closeFaceEmailModal();
    } else {
      statusMsg.style.display = "block";
      statusMsg.innerText = "❌ " + (data.message || "เกิดข้อผิดพลาดในการส่งอีเมล");
    }
  } catch (err) {
    statusMsg.style.display = "block";
    statusMsg.innerText = "❌ ไม่สามารถติดต่อเซิร์ฟเวอร์ได้: " + err.message;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "🚀 ส่งผลวิเคราะห์เข้าอีเมลทันที";
  }
}

async function sendFaceMatchEmailDirect(email, name, shape) {
  try {
    const res = await fetch("backend/api_personalized_email.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, face_shape: shape })
    });
    const data = await res.json();
    if (data.success) {
      alert(`🎉 ส่งผลวิเคราะห์รูปหน้าและแว่นตาแนะนำไปยังอีเมล (${email}) เรียบร้อยแล้วครับ!`);
    } else {
      alert("⚠️ " + (data.message || "ไม่สามารถส่งอีเมลได้"));
    }
  } catch (err) {
    alert("⚠️ เกิดข้อผิดพลาดในการส่งอีเมล: " + err.message);
  }
}

// ==========================================
// 16. FAQ Accordion Logic
// ==========================================
function toggleFaq(buttonEl) {
  const faqItem = buttonEl.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all other items
  document.querySelectorAll(".faq-item").forEach(item => {
    item.classList.remove("active");
  });

  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// ==========================================
// 17. Active Navigation Link on Scroll & Click (ScrollSpy)
// ==========================================
function initNavScrollSpy() {
  const navLinks = document.querySelectorAll(".nav-links .nav-link");
  if (!navLinks.length) return;

  const sectionMap = [];
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const section = document.querySelector(href);
      if (section) {
        sectionMap.push({ link, section, id: href });
      }
    }
  });

  if (!sectionMap.length) return;

  let isManualClick = false;
  let clickTimeout = null;

  function setActive(activeLink) {
    navLinks.forEach(link => {
      if (link === activeLink) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function updateActiveOnScroll() {
    if (isManualClick) return;

    const navbar = document.querySelector(".navbar");
    const navHeight = navbar ? navbar.offsetHeight : 70;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Check if scrolled near the very bottom of the page
    if (window.scrollY + windowHeight >= docHeight - 80) {
      setActive(sectionMap[sectionMap.length - 1].link);
      return;
    }

    // Find which section is currently in view
    let currentItem = null;
    for (let i = sectionMap.length - 1; i >= 0; i--) {
      const item = sectionMap[i];
      const top = item.section.offsetTop;
      if (window.scrollY + navHeight + 120 >= top) {
        currentItem = item;
        break;
      }
    }

    // Default to first nav item if above the first section
    if (!currentItem) {
      currentItem = sectionMap[0];
    }

    if (currentItem) {
      setActive(currentItem.link);
    }
  }

  // Smooth scroll and immediate highlight on click
  sectionMap.forEach(item => {
    item.link.addEventListener("click", function(e) {
      e.preventDefault();
      isManualClick = true;
      clearTimeout(clickTimeout);

      setActive(this);

      const navbar = document.querySelector(".navbar");
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const targetY = item.section.getBoundingClientRect().top + window.scrollY - navHeight + 4;

      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });

      try {
        history.pushState(null, null, item.id);
      } catch (err) {}

      clickTimeout = setTimeout(() => {
        isManualClick = false;
      }, 700);
    });
  });

  // Passive scroll listener with requestAnimationFrame
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial update
  updateActiveOnScroll();
}

