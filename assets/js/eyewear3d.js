/**
 * XCOCO Eyewear 3D Interactive Studio
 * Ultra-lightweight Three.js procedural 3D model
 * 60fps smooth rotation, materials switching, zero external model dependencies
 */

(function () {
  let scene, camera, renderer, glassesGroup;
  let frameMaterials = {};
  let lensMaterial;
  let activeFrameColor = "black";
  let activeLensType = "clear";
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let targetRotation = { x: 0.15, y: -0.35 };
  let currentRotation = { x: 0.15, y: -0.35 };
  let isAutoRotating = true;
  let animFrameId = null;
  let isInitialized = false;

  // Frame Color Palette
  const COLOR_PALETTE = {
    black: { color: 0x18181b, roughness: 0.55, metalness: 0.25 },
    gold: { color: 0xd4af37, roughness: 0.25, metalness: 0.88 },
    silver: { color: 0xd0d2d8, roughness: 0.20, metalness: 0.95 },
    rosegold: { color: 0xb76e79, roughness: 0.28, metalness: 0.85 }
  };

  // Lens Tints
  const LENS_CONFIG = {
    clear: {
      color: 0xffffff,
      transmission: 0.94,
      opacity: 0.82,
      roughness: 0.04,
      metalness: 0.08,
      sheenColor: 0x38bdf8
    },
    blue: {
      color: 0xf0f7ff,
      transmission: 0.88,
      opacity: 0.85,
      roughness: 0.06,
      metalness: 0.15,
      sheenColor: 0x6366f1
    },
    dark: {
      color: 0x1a1a1e,
      transmission: 0.15,
      opacity: 0.88,
      roughness: 0.12,
      metalness: 0.35,
      sheenColor: 0x334155
    }
  };

  function init3DStudio() {
    const container = document.getElementById("hero3DWrap");
    const canvas = document.getElementById("hero3DCanvas");
    if (!container || !canvas || typeof THREE === "undefined") return;

    if (isInitialized) {
      onResize();
      startLoop();
      return;
    }

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    camera.position.set(0, 1.2, 19);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 4. Lighting System (Studio Key, Fill, Rim & Floor Ambient)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(6, 8, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.65);
    fillLight.position.set(-8, 4, 6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.1);
    rimLight.position.set(0, -6, -8);
    scene.add(rimLight);

    // Anti-reflective coating gleam light (creates realistic AR lens sheen)
    const arLight = new THREE.PointLight(0x60a5fa, 0.9, 20);
    arLight.position.set(-2, 3, 5);
    scene.add(arLight);

    // 5. Build Eyewear Model
    buildEyewear();

    // 6. Floor Shadow
    createSoftShadow();

    // 7. Event Listeners
    setupControls(container);
    window.addEventListener("resize", onResize);

    isInitialized = true;
    startLoop();
  }

  function createMaterials() {
    Object.keys(COLOR_PALETTE).forEach((key) => {
      const cfg = COLOR_PALETTE[key];
      frameMaterials[key] = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: cfg.roughness,
        metalness: cfg.metalness
      });
    });

    const lensCfg = LENS_CONFIG[activeLensType];
    lensMaterial = new THREE.MeshPhysicalMaterial({
      color: lensCfg.color,
      transmission: lensCfg.transmission,
      opacity: lensCfg.opacity,
      transparent: true,
      roughness: lensCfg.roughness,
      metalness: lensCfg.metalness,
      ior: 1.52,
      reflectivity: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }

  function buildEyewear() {
    createMaterials();
    glassesGroup = new THREE.Group();

    const frameMat = frameMaterials[activeFrameColor];

    // Helper: Rounded Rectangle Rim Curve
    function createRimCurve(centerX) {
      const points = [
        new THREE.Vector3(centerX - 2.15, 1.25, 0.12),
        new THREE.Vector3(centerX + 1.85, 1.35, 0.08),
        new THREE.Vector3(centerX + 2.25, 0.90, 0.02),
        new THREE.Vector3(centerX + 2.05, -1.05, 0.02),
        new THREE.Vector3(centerX + 1.30, -1.45, 0.06),
        new THREE.Vector3(centerX - 1.55, -1.45, 0.08),
        new THREE.Vector3(centerX - 2.15, -0.95, 0.10),
        new THREE.Vector3(centerX - 2.35, 0.75, 0.12)
      ];
      return new THREE.CatmullRomCurve3(points, true, "centripetal");
    }

    // --- 1. RIMS (Left & Right) ---
    const leftCurve = createRimCurve(-2.95);
    const rightCurve = createRimCurve(2.95);

    const rimGeoLeft = new THREE.TubeGeometry(leftCurve, 64, 0.13, 14, true);
    const rimGeoRight = new THREE.TubeGeometry(rightCurve, 64, 0.13, 14, true);

    const leftRim = new THREE.Mesh(rimGeoLeft, frameMat);
    const rightRim = new THREE.Mesh(rimGeoRight, frameMat);
    leftRim.name = "framePart";
    rightRim.name = "framePart";
    glassesGroup.add(leftRim);
    glassesGroup.add(rightRim);

    // --- 2. LENSES (Left & Right) ---
    function createLensShape() {
      const s = new THREE.Shape();
      s.moveTo(-2.0, 1.15);
      s.quadraticCurveTo(0, 1.4, 1.8, 1.25);
      s.quadraticCurveTo(2.15, 0.8, 1.95, -0.95);
      s.quadraticCurveTo(1.2, -1.35, -1.45, -1.35);
      s.quadraticCurveTo(-2.1, -0.9, -2.15, 0.7);
      s.closePath();
      return s;
    }

    const lensShape = createLensShape();
    const lensGeo = new THREE.ShapeGeometry(lensShape, 32);

    const leftLens = new THREE.Mesh(lensGeo, lensMaterial);
    leftLens.position.set(-2.95, 0, 0.04);
    leftLens.name = "lensPart";

    const rightLens = new THREE.Mesh(lensGeo, lensMaterial);
    rightLens.position.set(2.95, 0, 0.04);
    rightLens.name = "lensPart";

    glassesGroup.add(leftLens);
    glassesGroup.add(rightLens);

    // --- 3. NOSE BRIDGE ---
    const bridgeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.0, 0.45, 0.05),
      new THREE.Vector3(-0.5, 0.95, 0.15),
      new THREE.Vector3(0.0, 1.05, 0.18),
      new THREE.Vector3(0.5, 0.95, 0.15),
      new THREE.Vector3(1.0, 0.45, 0.05)
    ]);
    const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 24, 0.11, 12, false);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, frameMat);
    bridgeMesh.name = "framePart";
    glassesGroup.add(bridgeMesh);

    // --- 4. NOSE PADS (Air Cushion Silicone) ---
    const siliconeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.35,
      metalness: 0.05
    });

    [-1, 1].forEach((dir) => {
      // Small metal bracket
      const padArmCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(dir * 1.1, 0.1, 0.0),
        new THREE.Vector3(dir * 0.75, -0.25, -0.45),
        new THREE.Vector3(dir * 0.65, -0.55, -0.7)
      ]);
      const padArmGeo = new THREE.TubeGeometry(padArmCurve, 12, 0.05, 8, false);
      const padArmMesh = new THREE.Mesh(padArmGeo, frameMat);
      padArmMesh.name = "framePart";
      glassesGroup.add(padArmMesh);

      // Silicone pad
      const padGeo = new THREE.SphereGeometry(0.3, 16, 12);
      padGeo.scale(0.55, 1.25, 0.45);
      const padMesh = new THREE.Mesh(padGeo, siliconeMat);
      padMesh.position.set(dir * 0.65, -0.58, -0.72);
      padMesh.rotation.y = dir * 0.3;
      glassesGroup.add(padMesh);
    });

    // --- 5. HINGES & TEMPLES (ขาแว่นตาทรง Ergonomic) ---
    [-1, 1].forEach((dir) => {
      // Hinge Block
      const hingeGeo = new THREE.BoxGeometry(0.25, 0.28, 0.45);
      const hinge = new THREE.Mesh(hingeGeo, frameMat);
      hinge.position.set(dir * 5.15, 0.75, -0.15);
      hinge.name = "framePart";
      glassesGroup.add(hinge);

      // Temple Arm Curve (extends backward and curves downward over the ear)
      const templeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(dir * 5.15, 0.75, -0.2),
        new THREE.Vector3(dir * 5.10, 0.85, -3.5),
        new THREE.Vector3(dir * 5.00, 0.80, -7.0),
        new THREE.Vector3(dir * 4.90, 0.65, -8.5),
        new THREE.Vector3(dir * 4.65, -0.50, -10.2),
        new THREE.Vector3(dir * 4.55, -1.20, -11.0)
      ]);

      const templeGeo = new THREE.TubeGeometry(templeCurve, 48, 0.11, 12, false);
      const temple = new THREE.Mesh(templeGeo, frameMat);
      temple.name = "framePart";
      glassesGroup.add(temple);
    });

    // Center & balance glasses
    glassesGroup.position.set(0, 0, 4.5);
    scene.add(glassesGroup);
  }

  function createSoftShadow() {
    // Canvas-based radial gradient texture for natural shadow
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.35)");
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.12)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(16, 12);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });

    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -3.2, 0);
    scene.add(shadowMesh);
  }

  function setupControls(container) {
    let touchStartX = 0;
    let touchStartY = 0;

    // Mouse Events
    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      isAutoRotating = false;
      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      // Resume slow auto-rotation after 3 seconds of idle
      clearTimeout(window._3dIdleTimer);
      window._3dIdleTimer = setTimeout(() => {
        isAutoRotating = true;
      }, 2500);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      targetRotation.y += deltaX * 0.012;
      targetRotation.x += deltaY * 0.010;

      // Clamp vertical rotation so it doesn't flip upside down
      targetRotation.x = Math.max(-0.65, Math.min(0.75, targetRotation.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    // Touch Events for Mobile / Tablet
    container.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isAutoRotating = false;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    container.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;

      targetRotation.y += deltaX * 0.014;
      targetRotation.x += deltaY * 0.012;
      targetRotation.x = Math.max(-0.65, Math.min(0.75, targetRotation.x));

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    container.addEventListener("touchend", () => {
      isDragging = false;
      clearTimeout(window._3dIdleTimer);
      window._3dIdleTimer = setTimeout(() => {
        isAutoRotating = true;
      }, 2500);
    });
  }

  function onResize() {
    const container = document.getElementById("hero3DWrap");
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function startLoop() {
    if (animFrameId) return;

    let time = 0;
    function render() {
      animFrameId = requestAnimationFrame(render);
      time += 0.02;

      // Auto rotation & subtle floating motion when idle
      if (isAutoRotating) {
        targetRotation.y += 0.007;
      }

      // Smooth inertia lerp
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

      if (glassesGroup) {
        glassesGroup.rotation.x = currentRotation.x;
        glassesGroup.rotation.y = currentRotation.y;
        // Natural gentle floating bob
        glassesGroup.position.y = Math.sin(time) * 0.15;
      }

      renderer.render(scene, camera);
    }

    render();
  }

  function stopLoop() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  // --- Public APIs for UI Controls ---

  window.setGlassesColor = function (colorName, btnEl) {
    if (!COLOR_PALETTE[colorName]) return;
    activeFrameColor = colorName;

    // Update active button state
    if (btnEl) {
      const siblings = btnEl.parentElement.querySelectorAll(".swatch-btn");
      siblings.forEach((b) => b.classList.remove("active"));
      btnEl.classList.add("active");
    }

    if (!glassesGroup) return;
    const newMat = frameMaterials[colorName];
    glassesGroup.traverse((child) => {
      if (child.name === "framePart") {
        child.material = newMat;
      }
    });
  };

  window.setLensTint = function (lensType, btnEl) {
    if (!LENS_CONFIG[lensType]) return;
    activeLensType = lensType;

    // Update active button state
    if (btnEl) {
      const siblings = btnEl.parentElement.querySelectorAll(".lens-pill-btn");
      siblings.forEach((b) => b.classList.remove("active"));
      btnEl.classList.add("active");
    }

    if (!glassesGroup) return;
    const cfg = LENS_CONFIG[lensType];

    glassesGroup.traverse((child) => {
      if (child.name === "lensPart") {
        child.material.color.setHex(cfg.color);
        child.material.transmission = cfg.transmission;
        child.material.opacity = cfg.opacity;
        child.material.roughness = cfg.roughness;
        child.material.metalness = cfg.metalness;
        child.material.needsUpdate = true;
      }
    });
  };

  window.switchHeroView = function (mode) {
    const photoWrap = document.querySelector(".carousel-img-wrap");
    const wrap3D = document.getElementById("hero3DWrap");
    const btnPhoto = document.getElementById("btnViewPhoto");
    const btn3D = document.getElementById("btnView3D");
    const prevBtn = document.querySelector(".carousel-nav.prev-btn");
    const nextBtn = document.querySelector(".carousel-nav.next-btn");
    const dotsWrap = document.getElementById("carouselDots");

    if (mode === "3d") {
      if (btnPhoto) btnPhoto.classList.remove("active");
      if (btn3D) btn3D.classList.add("active");
      if (photoWrap) photoWrap.style.display = "none";
      if (wrap3D) {
        wrap3D.style.display = "flex";
        setTimeout(() => {
          init3DStudio();
        }, 50);
      }
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      if (dotsWrap) dotsWrap.style.opacity = "0.3";

      // Contextual card info for 3D
      const slideBadge = document.getElementById("slideBadge");
      const slideTitle = document.getElementById("slideTitle");
      const slideDesc = document.getElementById("slideDesc");
      const slidePrice = document.getElementById("slidePrice");
      const actionBtn = document.getElementById("slideActionBtn");
      if (slideBadge) slideBadge.innerText = "🧊 3D Studio";
      if (slideTitle) slideTitle.innerText = "XCOCO Cyber Craft 360°";
      if (slideDesc) slideDesc.innerText = "หมุนสำรวจโครงสร้างแว่นตา 360° ปรับสีกรอบและชนิดเลนส์ได้แบบ Real-time";
      if (slidePrice) slidePrice.innerText = "฿990";
      if (actionBtn) {
        actionBtn.onclick = () => {
          if (typeof openCustomizerModal === "function") {
            openCustomizerModal("frame_cyber_04");
          }
        };
      }
    } else {
      if (btnPhoto) btnPhoto.classList.add("active");
      if (btn3D) btn3D.classList.remove("active");
      if (photoWrap) photoWrap.style.display = "flex";
      if (wrap3D) wrap3D.style.display = "none";
      if (prevBtn) prevBtn.style.display = "flex";
      if (nextBtn) nextBtn.style.display = "flex";
      if (dotsWrap) dotsWrap.style.opacity = "1";

      // Restore original slide info
      if (typeof updateSlide === "function") {
        updateSlide();
      }
      stopLoop();
    }
  };

  // Auto initialize on DOM ready if 3D is active
  document.addEventListener("DOMContentLoaded", () => {
    // Ready
  });
})();
