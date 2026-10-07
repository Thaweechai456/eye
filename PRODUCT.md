# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: an instructor grading a university course project. The product must be usable as a demo/submission — every feature visible and explainable on demand during review.

Secondary (inferred from the implementation, not separately confirmed): Thai-speaking customers browsing and ordering prescription eyeglasses through the storefront UI.

## Product Purpose

XCOCO Eyewear is a Thai-language online eyeglass store and prescription-lens ordering system, built as a standalone course project. It exists to demonstrate a complete e-commerce + optical-service web system (membership, lens customizer, cart/checkout, email marketing, recommendations) end to end.

Success: rubric completeness and demo-ability — all five instructor-required feature areas and every implemented feature are present, runnable, and explainable when graded.

## Positioning

A no-framework, standalone web project that simulates a premium optical shop: a full prescription-lens customizer (SPH/CYL/AXIS/PD with profile auto-fill), a scoring eye-test mini-game that issues a working discount code, and real PHPMailer/Gmail SMTP email marketing — all without a build system or SPA framework, so it runs 100% on local XAMPP.

## Operating Context

- Runs standalone on XAMPP localhost (Apache + MySQL + PHP 8.x); opened via `http://localhost/eye/index.html`.
- Reviewed and graded by an instructor following documented submission guides (`docs/SUBMISSION_GUIDE.md`, `docs/PHPMAILER_TEACHER_GUIDE.md`).
- Course rubric: 5 required feature areas documented in `FEATURES.md` (membership/levels, mini-game, real email sending, rich catalog, on-site recommendations).
- LINE OA / AI chatbot auto-reply knowledge base exported as plain-text/CSV/PDF artifacts at the repo root.
- All client state lives in browser LocalStorage; PHP endpoints return JSON when requested with an `Accept: application/json` header.

## Capabilities and Constraints

Confirmed constraints (documented and exhaustive per the user — no additional durable constraints):

- Thai-only UI text, hardcoded in HTML. No i18n system.
- Standalone XAMPP deployment: no build tools, no bundler, no framework (no React/Tailwind). Vanilla HTML/CSS/JS + PHP 8.x + PHPMailer + MySQL.
- PDPA consent checkbox required in registration.
- The instructor's 5 required feature areas (see `FEATURES.md`) must remain present and working.
- Gitignored `backend/mail_config.php`; endpoints fall back to placeholders / `simulate_mode` (mail saved to `backend/mail_logs/`) when credentials are absent — demos must not depend on live SMTP.
- `$pdo` can be `null` on DB failure; PHP code must null-check before use.

Open decisions: none recorded for product scope.

## Brand Commitments

- Name: **XCOCO Eyewear**. Tagline: **"เห็นชัด ในแบบของคุณ"**.
- Coupons are fixed product facts: `XCOCO10` (10%, LINE OA welcome), `CLEAR20` (20%, promo), `XCOCO30` (30%, eye-test reward), `SURVEY5` (5%, LINE survey).
- Service guarantees stated in-product: 1-year frame/lens warranty, free lens replacement within 30 days, free nationwide shipping.
- Brand design tokens (Sky Blue `#6EA8D7`, Deep Navy `#2E3A4A`, Ice White `#F5F8FB`, etc.) are documented in `AGENTS.md` as the LINE OA / web theme consistency palette. *(Recorded as a binding asset reference from the repo docs, not as a visual directive for future design work.)*

## Evidence on Hand

- `FEATURES.md` — full Thai-language feature inventory, including the rubric mapping.
- `AGENTS.md` — architecture, conventions, brand palette, coupon codes.
- `docs/SUBMISSION_GUIDE.md`, `docs/PHPMAILER_TEACHER_GUIDE.md` — submission/testing walkthroughs for the instructor.
- `assets/images/` — 18 studio product photos, logo, email content images.
- `preview_register_email.html`, `preview_subscribe_email.html` — rendered email template previews.
- `subscribers.txt` — real emails from test runs (handle carefully).
- `ai_knowledge_pure_text.html`, `xcoco_line_ai_faq.csv`, `XCOCO_AI_Chatbot_*.pdf` — LINE chatbot knowledge base exports.

Absences future work must not fabricate: no real testimonials, customer reviews, press, case studies, benchmark data, or production deployment claims. This is a graded demo, not a live store.

## Product Principles

1. Demo first: every capability must be reachable and explainable in a review session — prefer visible, self-demonstrating flows over hidden ones.
2. Standalone by design: no build step, no framework, no external service dependency; the project runs as-is on a stock XAMPP install.
3. Rubric completeness is the floor: the five instructor-required feature areas stay intact and working through any change.
4. Truthful simulation: mocked data (products, orders, statuses) is acceptable for a demo, but claims, testimonials, and metrics must never be invented.
5. One coherent Thai storefront: all user-facing copy stays Thai, consistent with the XCOCO brand voice and fixed coupon/guarantee facts.
