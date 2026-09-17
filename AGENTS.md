# AGENTS.md

## What this is

PHP + vanilla HTML/CSS/JS e-commerce site for XCOCO Eyewear (Thai language eyeglass store). No build system, no bundler, no framework. Designed to run standalone on XAMPP localhost.

## Quick start

```bash
# Local dev (XAMPP): place project in htdocs, ensure Apache + MySQL running
# Then open: http://localhost/eye/index.html

# SMTP setup: copy template and fill in Gmail App Password
cp backend/mail_config.example.php backend/mail_config.php
```

## Critical secrets

- `backend/mail_config.php` — gitignored. Contains SMTP credentials. Never commit. Use `backend/mail_config.example.php` as template.
- `subscribers.txt` — contains real email addresses from test runs. Already committed; be careful editing.

## Architecture

- **`index.html`** — single-page app, all sections/modals/drawers inline (~1000 lines)
- **`assets/js/app.js`** — all JS logic (~2370 lines): product catalog, cart, auth, quiz, recommendations, wishlist, theme toggle, nav. All state in LocalStorage.
- **`assets/css/styles.css`** — single stylesheet with CSS variables for light/dark theme
- **`backend/*.php`** — PHP API endpoints (register, login, subscribe, order email, personalized email). All use PHPMailer via `backend/mailer.php`.
- **`backend/db.php`** — MySQL PDO connection to `xcoco_db`. Auto-creates tables on connect.
- **`database/database.sql`** — full schema + mock data for manual setup
- **`PHPMailer/`** — vendored PHPMailer library (not a project dependency to manage)
- **`emailContent.php`** — HTML email template for newsletter (included by `sendMail.php`)

## No build/test/lint

There is no package.json, no test suite, no linter, no CI. The project has no automated quality gates.

## PHP backend gotchas

- Backend requires PHP 8.x and MySQL (via XAMPP). PHP endpoints fail silently if `backend/mail_config.php` is missing — they fall back to placeholder values.
- `backend/mailer.php` has a `simulate_mode` flag. When true (or when credentials are placeholder), emails are saved as HTML files in `backend/mail_logs/` instead of being sent.
- Database connection in `backend/db.php` sets `$pdo = null` on failure — PHP code must check for null before using `$pdo`.
- All PHP API endpoints return JSON when the request has `Accept: application/json` header. Otherwise they echo HTML.

## Frontend conventions

- All UI text is hardcoded in Thai in the HTML. No i18n system.
- All app state (cart, auth, wishlist, orders, recently viewed) persists in browser LocalStorage.
- Product data is a hardcoded JS array in `assets/js/app.js` (`const PRODUCTS`).
- Light/dark theme uses `data-theme` attribute on `<html>` + CSS custom properties.
- Fonts: Prompt (Thai) + Space Grotesk loaded from Google Fonts.
- No component system — all DOM manipulation is vanilla JS with `document.getElementById` / `querySelector`.

## Working with this codebase

- If editing `index.html`, note the file is very long. Sections are separated by comments.
- If adding features, follow the existing pattern: add HTML in `index.html`, logic in `assets/js/app.js`, styles in `assets/css/styles.css`.
- For new backend endpoints, follow the pattern in existing `backend/api_*.php` files — include `mailer.php`, use the `sendXcocoEmail()` helper.
- Email HTML templates use inline CSS (required for email clients). See `emailContent.php` and `backend/email_templates.php` for the pattern.
- The PHPMailer library is vendored at `PHPMailer/` — do not run `composer install` in the project root.
