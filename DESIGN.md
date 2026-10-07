---
name: XCOCO Eyewear
description: Thai-language premium eyewear storefront — "เห็นชัด ในแบบของคุณ"
colors:
  sky-blue: "#6EA8D7"
  deep-navy: "#2E3A4A"
  soft-mist: "#AFCBE8"
  ice-white: "#F5F8FB"
  frost-border: "#E6ECF3"
  surface-white: "#FFFFFF"
  soft-pill: "#E8F2FA"
  ink-secondary: "#5C6B7E"
  ink-muted: "#617287"
  night-bg: "#151B23"
  night-surface: "#1E2633"
  night-elevated: "#263242"
typography:
  display:
    fontFamily: "Prompt, 'Space Grotesk', sans-serif"
    fontSize: "3.1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-1px"
  headline:
    fontFamily: "Prompt, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.5px"
  title:
    fontFamily: "Prompt, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Prompt, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Prompt, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.full}"
    padding: "0.65rem 1.4rem"
  button-primary-hover:
    backgroundColor: "#1E2632"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.soft-pill}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.full}"
    padding: "0.65rem 1.4rem"
  tab-active:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1.1rem"
  card-product:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.lg}"
    padding: "1.5rem 1.35rem 1.35rem"
  input-search:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.full}"
    padding: "0.55rem 1rem 0.55rem 2.4rem"
  badge-soft:
    backgroundColor: "{colors.soft-pill}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.65rem"
---

# Design System: XCOCO Eyewear

## Overview

**Creative North Star: "The Ice-Blue Lookbook"**

XCOCO is a premium-clean-minimal Thai optical storefront that reads like a well-lit lookbook page: ice-white canvas, quiet hairline borders, and one cool blue accent doing all the talking. Density is airy — large hero, spacious 3–4 column catalog, generous card padding — because the product photography and prescription tables need room to breathe. Nothing shouts; trust is built through alignment, restraint, and consistent pill geometry.

The system is dual-theme by contract (light is normative, dark is a full companion), tonal before shadowy, and pill-first in every interactive element. Thai text sets in Prompt; Latin numerals, prices, and brand marks switch to Space Grotesk / Montserrat for a crisp optical-instrument edge.

**Key Characteristics:**
- Premium clean minimal: airy, trustworthy, fashion-quiet
- Ice-white canvas with tonal layering, not heavy shadows
- Pill-first controls (buttons, tabs, badges, inputs all fully rounded)
- Refined and restrained component feel — 1px lifts, quiet borders
- Dual-CTA contract: Deep Navy CTA in light, Sky Blue CTA in dark

## Colors

A single cool accent on an ice-neutral field; rarity of blue is the point.

### Primary
- **Lookbook Sky** (#6EA8D7): The only true accent. Active states, focus rings, tab underlines, price highlights, lookbook-thumb active, badge borders. Used on ≤10% of any screen.
- **Deep Optical Navy** (#2E3A4A): Light-theme CTA fill, headings, body text, prices. In dark theme it becomes the text-inverse and the CTA flips to Sky.

### Secondary
- **Soft Mist** (#AFCBE8): Secondary tint — dark-theme secondary text, subtle washes, hover backgrounds. Never a CTA fill on its own.
- **Soft Pill Wash** (#E8F2FA): Light-theme pill badge background (`--badge-bg`). Badges, promo tags, selected-filter washes.

### Neutral
- **Ice White** (#F5F8FB): Light `--bg-primary`. The page canvas.
- **Surface White** (#FFFFFF): Light `--bg-surface`. Product cards, containers, search inputs.
- **Frost Border** (#E6ECF3): Hairline borders and dividers in light (`--border-color`). Card strokes, nav bottom border, footer rules.
- **Ink Secondary** (#5C6B7E): Light secondary text — descriptions, subtitles, footer links.
- **Ink Muted** (#617287): Light muted text — category eyebrows, captions, empty states.
- **Night Canvas** (#151B23): Dark `--bg-primary`.
- **Night Surface** (#1E2633): Dark `--bg-surface` — cards, modals.
- **Night Elevated** (#263242): Dark `--bg-surface-elevated` — icon buttons, option cards, elevated wells.

### Named Rules
**The One Voice Rule.** Lookbook Sky (#6EA8D7) appears on ≤10% of any screen — active pill, focus ring, or single highlight. If two blues compete, remove one.
**The Dual-CTA Rule.** Light CTA is Deep Navy (#2E3A4A on #FFFFFF); dark CTA is Sky (#6EA8D7 on #151B23). Never use Navy fill in dark or Sky fill for large light-theme buttons.

## Typography

**Display Font:** Prompt (Thai-capable) with Space Grotesk fallback for Latin/numerals
**Body Font:** Prompt (with system sans fallback)
**Label/Mono Font:** Prompt for labels; Space Grotesk for prices, totals, and codes (letter-spaced)

**Character:** Quiet Thai voice with an instrument edge — Prompt carries friendly legibility at 1.6 line-height, while Space Grotesk / Montserrat handle every number, price, and badge so figures look calibrated, not typeset.

### Hierarchy
- **Display** (700, 3.1rem, 1.2, -1px): Hero title only (`.hero-title`). One per page.
- **Headline** (700, 1.85rem, 1.3, -0.5px): Section titles (`.section-title`). Catalog, guide, reviews.
- **Title** (600, 1.12rem, 1.35): Product names, modal titles, carousel headings (`.product-name`, `.modal-title`).
- **Body** (400, 0.85–1.1rem, 1.6): Descriptions, hero lede (1.1rem, max 580px), review text (0.88rem). Max line length ~65ch.
- **Label** (500–700, 0.72–0.86rem, 0.06em, uppercase where noted): Nav links (0.86rem, 500), category eyebrows (0.72rem, uppercase, 0.6px), badges (0.72–0.85rem, 600–700), footer headings (0.8rem, uppercase, 0.08em).
- **Numeric** (Space Grotesk 700, 1.28–1.5rem): Prices (`.product-price` 1.28rem, `.total-amount` 1.5rem), stats (`.stat-num` 1.4rem), reward codes (1.35rem, 2px spacing).

### Named Rules
**The Two-Voice Rule.** Thai prose never leaves Prompt; digits, prices, and codes never leave Space Grotesk / Montserrat. No Inter, no system serif, no third voice.

## Layout

Centered single-column canvas, max 1200px (`catalog`, `hero`, `footer`), with the navbar stretched to 1440px in a 3-column grid (brand / links / actions). Hero is 1.1fr + 0.9fr two-column with a 55%-width lookbook poster masked by a right-to-left surface gradient; below 900px it collapses to centered single column.

Catalog rhythm: `product-grid` is `repeat(auto-fill, minmax(280px, 1fr))` with a spacious 2rem (32px) gap; card internals pad 1.5rem / 1.35rem. Section vertical rhythm is 3rem top / 5rem bottom; hero pads 4rem. Spacing scale is 8px (chip/tab gaps) / 16px (card rhythm) / 32px (grid gaps).

Responsive behavior: 1280px and 1200px tighten containers; 1040/960px reflow nav; 900px is the master breakpoint (hero stacks, footer 2-col); 640px stacks drawers and modals full-bleed; 540px goes single-column footer. Anchored sections hold `scroll-margin-top: 85px` clear of the sticky glass nav.

## Elevation & Depth

Soft layered tonal first, shadow only as a state response. At rest, surfaces separate by tint steps (`--bg-surface` → `--bg-surface-elevated` → `--bg-subtle`: #FFFFFF → #F8FAFD → #EBF2F8 in light) with a 1px Frost Border; there is no resting drop shadow on most cards (`product-card` rests at a near-flat `0 4px 20px -6px rgba(0,0,0,0.05)`).

Lift appears on interaction: product/review/step cards rise 4–6px with a wide diffuse glow (`0 18px 40px -14px rgba(46,58,74,0.22)`), carousel cards deepen (`0 20px 40px -15px rgba(0,0,0,0.15)`), modals float on a blurred backdrop (`blur(8px)` + `0 25px 50px -12px rgba(0,0,0,0.7)`). Dark theme leans harder on tonal steps and a single ambient shadow (`0 10px 30px -10px rgba(0,0,0,0.5)`).

### Shadow Vocabulary
- **Resting whisper** (`box-shadow: 0 4px 20px -6px rgba(0,0,0,0.05)`): Product cards at rest in light.
- **Hover lift** (`box-shadow: 0 18px 40px -14px rgba(46,58,74,0.22)`): Product/review/step card hover, with `translateY(-4px to -6px)`.
- **Carousel float** (`box-shadow: 0 20px 40px -15px rgba(0,0,0,0.15)`): Hero carousel card.
- **Modal veil** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7)` + `backdrop-filter: blur(8px)`): Dialogs and drawers.
- **Nav hairline** (`box-shadow: 0 2px 12px rgba(46,58,74,0.03)`): Sticky glass navbar under-blur.

### Named Rules
**The Tonal-First Rule.** Separate surfaces with the next tint step + 1px Frost Border before reaching for shadow. Shadow is a verb (hover, open, focus) — never a resting identity.

## Shapes

Pill-first, card-second. Every control that can be a pill is a pill (`9999px`): `.btn`, `.tab-btn`, `.search-input`, `.product-badge`, `.hero-badge`, `.icon-btn` (38px circle), `.cart-btn`, `.nav-auth-btn`, `.carousel-dots .dot.active` (8px → 24px pill). Cards and containers are large-soft rectangles (`20px` / `--radius-lg`): hero, product cards, review cards, step cards, modals. Inner wells step down to `14px` (`--radius-md`: option cards, image wells, user menus) and `8px` (`--radius-sm`: promo badges, code tags, color tiles, text inputs).

Borders are 1px hairlines in Frost Border; dashed borders are reserved for promotions and dropzones (`.promo-card`, `.game-reward-box`, `.upload-box`). Product imagery sits in a `16/11` well with a subtle diagonal tint (`160deg, --bg-subtle → --bg-surface-elevated`) and scales to 1.04–1.06 on hover; nothing is clipped to circles except avatars, icon buttons, and swatches.

## Components

All components are refined and restrained: quiet borders, 0.2s state fades, 1px lifts — never bouncy or neon.

### Buttons
- **Shape:** Fully rounded pill (9999px).
- **Primary:** Deep Navy fill (#2E3A4A) with white text in light; Sky fill (#6EA8D7) with dark text in dark. Padding 0.65rem 1.4rem, 600 weight, 0.95rem. Shadow `0 4px 14px rgba(0,0,0,0.2)`.
- **Hover / Focus:** Darken to (#1E2632) in light / lighten to (#89bced) in dark, `translateY(-1px)`; focus shows 2px Sky outline offset 2px; active presses to `scale(0.98)`.
- **Secondary / Ghost:** Elevated-tint fill (`--bg-surface-elevated`) with 1px Frost Border and primary text; hover shifts to `--bg-subtle` with Sky border.

### Chips
- **Style:** Category tabs (`.tab-btn`) are pills with surface fill, 1px Frost Border, secondary text (0.85rem). Badges (`.product-badge`, `.promo-badge`) are pills with Soft Pill Wash (#E8F2FA) and Navy text (0.72–0.75rem, 600–700), plus a 1px border and whisper shadow.
- **State:** Selected tab inverts to CTA fill (Navy light / Sky dark) with inverse text and 600 weight; unselected hover warms to `--bg-subtle`.

### Cards / Containers
- **Corner Style:** Large-soft (20px).
- **Background:** Surface White (#FFFFFF) in light; Night Surface (#1E2633) in dark. Image wells use the diagonal subtle tint.
- **Shadow Strategy:** Resting whisper; hover lift per Elevation & Depth.
- **Border:** 1px Frost Border; turns Sky (`--border-focus`) on hover.
- **Internal Padding:** Product info 1.5rem 1.35rem; reviews/steps 1.75rem; dividers are 1px Frost Border with footer pinned to top border.

### Inputs / Fields
- **Style:** Pill search (surface fill, 1px Frost Border, 0.55rem 1rem 0.55rem 2.4rem, 0.85rem) with left icon; rectangular text/selects (`8px`) with surface fill and 0.45rem 0.6rem padding; prescription tables use 0.85rem cells with bottom hairlines.
- **Focus:** Border shifts to Sky (#6EA8D7); search and fields add no glow beyond the border (glow `0 0 0 3px` accent-subtle is reserved for special focus demos).
- **Error / Disabled:** Red-ink text (#ef4444 in dark, deepened in light) for destructive/logout; helper text in Ink Muted (0.75rem).

### Navigation
- Glass sticky bar (`blur(16px)`, `--nav-bg`: white 0.92 / night 0.88) with 1px bottom border. Links are 0.86rem/500 secondary; hover/active go primary with a 2px Sky underline pill that scales in (`cubic-bezier(0.4,0,0.2,1)`). Actions are 38px pill/circle groups (icon, auth, cart with count pill). Mobile collapses behind a 38px toggle below 960–1040px.

### Promo / Game Signature
- Dashed Sky-border promo card (`linear-gradient(135deg, elevated, surface)`, `20px`, centered) with Navy CTA badge and click-to-copy `code-tag` (mono-spaced, 1px letter-spacing; hover inverts to CTA). Mini-game lives in a `20px` surface shell with an elevated `14px` play well (`min-height: 320px`) and a dashed reward box.

## Do's and Don'ts

### Do:
- **Do** keep the canvas Ice White (#F5F8FB) with Surface White (#FFFFFF) cards and 1px Frost Border (#E6ECF3) hairlines in light.
- **Do** make every button, tab, badge, and search input a full pill (9999px); reserve 20px for cards, 14px for wells, 8px for fields.
- **Do** set Thai copy in Prompt and all prices/codes/stats in Space Grotesk / Montserrat.
- **Do** separate surfaces tonally first (`surface → elevated → subtle`); add hover-lift shadow only as a state response.
- **Do** honor the Dual-CTA Rule — Navy CTA in light, Sky CTA in dark — and the 2px Sky focus outline.
- **Do** use dashed Sky borders only for promos, rewards, and upload dropzones.

### Don't:
- **Don't** introduce a second accent hue (no green/orange/purple CTAs) — success red (#ef4444) is for destructive/logout only.
- **Don't** rest cards on heavy shadows; the resting vocabulary is flat + hairline, lift is hover-only.
- **Don't** square off buttons or mix 4px/6px radii — the scale is 8 / 14 / 20 / full, nothing else.
- **Don't** set body copy below 0.8rem or above 1.15rem, and don't exceed ~65ch line length.
- **Don't** invent testimonials, reviews, or metrics — the review cards in code are demo placeholders, not system proof.
- **Don't** break the Thai-only UI contract or add an i18n switch as part of a visual change.
