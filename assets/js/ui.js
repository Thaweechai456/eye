/* ============================================================
 * XCOCO UI Delights — shared across index / auth / orders
 * - showToast()   : branded toast notifications (replaces native alert)
 * - fireConfetti(): dependency-free canvas confetti for celebrations
 * - scroll progress bar, announcement marquee, section scroll-reveal,
 *   hero stat counters (auto-init on DOM ready)
 * Vanilla JS only — no libraries, no build step.
 * ============================================================ */
(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ----------------------------------------------------------
   * Toast notifications
   * ---------------------------------------------------------- */
  var TOAST_ICONS = {
    success: "\u2705",
    error: "\u274C",
    warning: "\u26A0\uFE0F",
    info: "\u2139\uFE0F",
    cart: "\u1F6D2",
    reward: "\u1F389"
  };

  function getToastContainer() {
    var c = document.getElementById("toastContainer");
    if (!c) {
      c = document.createElement("div");
      c.id = "toastContainer";
      c.className = "toast-container";
      c.setAttribute("role", "status");
      c.setAttribute("aria-live", "polite");
      document.body.appendChild(c);
    }
    return c;
  }

  function showToast(message, type, duration) {
    try {
      if (!document.body) return;
      var container = getToastContainer();
      var t = type && TOAST_ICONS[type] ? type : "info";
      var text = String(message == null ? "" : message);

      var toast = document.createElement("div");
      toast.className = "toast toast-" + t;

      var icon = document.createElement("span");
      icon.className = "toast-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = TOAST_ICONS[t];

      var msg = document.createElement("span");
      msg.className = "toast-msg";
      msg.textContent = text; // textContent = safe from HTML injection

      toast.appendChild(icon);
      toast.appendChild(msg);
      container.appendChild(toast);

      // Keep the stack short: drop the oldest toast beyond 3
      while (container.children.length > 3) {
        container.removeChild(container.firstElementChild);
      }

      // Trigger slide-in on next frame (element must exist in layout first)
      requestAnimationFrame(function () {
        toast.classList.add("toast-in");
      });

      var ms = duration || Math.min(7000, 3200 + text.length * 25);
      setTimeout(function () {
        toast.classList.remove("toast-in");
        toast.classList.add("toast-out");
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 450);
      }, ms);
    } catch (e) {
      /* never break the calling flow because of a toast */
    }
  }

  /* ----------------------------------------------------------
   * Confetti (canvas, self-cleaning, reduced-motion aware)
   * ---------------------------------------------------------- */
  var confettiRunning = false;

  function fireConfetti(options) {
    if (prefersReducedMotion() || confettiRunning || !document.body) return;

    var opts = options || {};
    var count = opts.count || 140;
    var durationMs = opts.duration || 3200;

    var canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    confettiRunning = true;

    var ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.parentNode.removeChild(canvas);
      confettiRunning = false;
      return;
    }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function size() {
      canvas.width = Math.max(1, window.innerWidth * dpr);
      canvas.height = Math.max(1, window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();

    var colors = ["#6EA8D7", "#AFCBE8", "#2E3A4A", "#FFFFFF", "#FFD166", "#10b981"];
    var particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * window.innerHeight * 0.6,
        w: 5 + Math.random() * 6,
        h: 7 + Math.random() * 7,
        vx: -1.4 + Math.random() * 2.8,
        vy: 1.6 + Math.random() * 2.8,
        rot: Math.random() * Math.PI,
        vr: -0.16 + Math.random() * 0.32,
        color: colors[Math.floor(Math.random() * colors.length)],
        sway: Math.random() * Math.PI * 2
      });
    }

    var start = performance.now();
    var rafId = 0;
    var cleaned = false;

    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", size);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      confettiRunning = false;
    }

    function frame(now) {
      var elapsed = now - start;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      var fade = elapsed > durationMs - 700 ? Math.max(0, (durationMs - elapsed) / 700) : 1;
      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.sway += 0.05;
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        p.vy += 0.035; // gravity
        p.vx *= 0.995; // drag
        p.rot += p.vr;
        if (p.y > window.innerHeight + 30) {
          // recycle while the show lasts so density stays up
          p.y = -20;
          p.x = Math.random() * window.innerWidth;
          p.vy = 1.6 + Math.random() * 2.2;
        }
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (elapsed < durationMs) {
        rafId = requestAnimationFrame(frame);
      } else {
        cleanup();
      }
    }

    window.addEventListener("resize", size);
    rafId = requestAnimationFrame(frame);
    // Safety net in case the tab was backgrounded (rAF paused)
    setTimeout(cleanup, durationMs + 2000);
  }

  /* ----------------------------------------------------------
   * Scroll progress bar (thin brand gradient, top of viewport)
   * ---------------------------------------------------------- */
  function initScrollProgress() {
    if (!document.body) return;
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      bar.style.transform = "scaleX(" + p + ")";
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ----------------------------------------------------------
   * Announcement bar marquee (JS clones content so it works at
   * any viewport width; no-JS keeps the static centered bar)
   * ---------------------------------------------------------- */
  function initAnnouncementMarquee() {
    var track = document.querySelector(".announcement-content");
    if (!track || track.getAttribute("data-marquee")) return;
    if (prefersReducedMotion()) return;
    var base = track.querySelector("span");
    if (!base) return;

    track.setAttribute("data-marquee", "1");
    track.classList.add("marquee-active");

    // Clone until the track covers 2 full viewports (seamless -50% loop)
    var copies = 1;
    while (track.scrollWidth < window.innerWidth * 2 && copies < 16) {
      var clone = base.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
      copies++;
    }
    if (copies % 2 !== 0) {
      // even copy count => -50% lands exactly on a copy boundary
      var extra = base.cloneNode(true);
      extra.setAttribute("aria-hidden", "true");
      track.appendChild(extra);
    }

    // Constant-ish speed (~90px/s) regardless of track length
    track.style.animationDuration = Math.max(18, track.scrollWidth / 90) + "s";
  }

  /* ----------------------------------------------------------
   * Section scroll-reveal (content stays visible if JS/reduced
   * motion is off — arming happens only when animating)
   * ---------------------------------------------------------- */
  function initScrollReveal() {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    var sections = Array.prototype.slice.call(document.querySelectorAll("main > section"));
    if (!sections.length) return;

    var targets = sections.filter(function (s) {
      return s.getClientRects().length > 0; // skip hidden sections
    });
    if (!targets.length) return;

    targets.forEach(function (s, i) {
      s.classList.add("reveal-armed");
      s.style.transitionDelay = Math.min(i, 3) * 70 + "ms";
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("reveal-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    targets.forEach(function (s) {
      io.observe(s);
    });
  }

  /* ----------------------------------------------------------
   * Hero stat counters — animates only clean numeric values
   * ("100%": yes; "ฟรี" / "1-3 วัน": left untouched)
   * ---------------------------------------------------------- */
  function initStatCounters() {
    if (prefersReducedMotion()) return;
    var nums = document.querySelectorAll(".hero-stats .stat-num");
    Array.prototype.forEach.call(nums, function (el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^([\d,]+)([%+]*)$/);
      if (!m) return;
      var target = parseInt(m[1].replace(/,/g, ""), 10);
      if (!isFinite(target) || target < 1) return;
      var suffix = m[2] || "";

      el.textContent = "0" + suffix; // no flash of the final value
      var startTime = performance.now();
      var dur = 1200;
      function step(now) {
        var t = Math.min(1, (now - startTime) / dur);
        var eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = raw; // exact original text
      }
      requestAnimationFrame(step);
    });
  }

  /* ----------------------------------------------------------
   * Auto-init
   * ---------------------------------------------------------- */
  function initUiDelights() {
    initScrollProgress();
    initAnnouncementMarquee();
    initScrollReveal();
    initStatCounters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUiDelights);
  } else {
    initUiDelights();
  }

  // Public API (used by app.js and the inline page scripts)
  window.showToast = showToast;
  window.fireConfetti = fireConfetti;
})();
