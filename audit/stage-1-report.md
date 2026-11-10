# Stage 1 Audit Report: System Architecture & Route Baseline
**Branch:** `admin-pagebuilder`  
**Base Tag:** `pre-pagebuilder-backup`  
**Date:** 2026-11-10  
**Status:** PASSED (Exit check fulfilled)  

---

## 1. Technical Baseline Summary

- **Framework:** Astro 5.2.0 (`output: 'server'`) with `@astrojs/cloudflare` 12.0.0 and React 19.2.8.
- **Node.js Runtime:** v24.14.1 (target compatibility: Node 20+ on Cloudflare Workers / Pages).
- **Database:** Cloudflare D1 (`jaishreeram-db`, ID `0143ff7e-7afc-4654-910b-21315a64940b`) with Prisma 5.22.0.
- **Redirects Engine:** 23 permanent 301 redirects mapped in `astro.config.mjs`.
- **AdSense & Monetization:** Google AdSense client `ca-pub-2458897753508445`, active `public/ads.txt`, slot rules in `src/components/AdSlot.astro`.
- **Analytics & Tracking:** Google Tag Manager `GTM-MJKL5P3X`, Google Analytics `G-VBBLMPSKY2`.

---

## 2. Admin Inventory

- **Current Path:** `/admin`
- **Auth Provider:** Google OAuth 2.0 (`/api/auth/signin` &rarr; `/api/auth/callback`), restricted to `ashishkushwaha88643@gmail.com`.
- **Existing Admin Capabilities:**
  - Blog Post Editor (`/admin/blog` & `/pages/api/admin/blog.ts`)
  - Benefit Editor (`/admin/benefits`)
  - FAQ Manager (`/admin/faqs`)
  - Audio & Recitations Manager (`/admin/audio`)
  - Language Banner & Translations (`/admin/languages`)
  - Jayanti Date Manager (`/admin/jayanti`)
  - Layout & Sidebar Gadgets (`/admin/layout`)
  - Web Stories Manager (`/admin/stories`)
- **Limitation Identified:** Currently, all other core pages (Homepage, `/sankat-mochan-hanumanashtak`, `/hanuman-jayanti`, `/bajrang-baan`, `/ram-chalisa`, `/hanuman-aarti`, `/hanuman-stuti`, `/hanuman-chalisa-meaning`, etc.) are completely hardcoded in static `.astro` templates. The admin has zero ability to add, edit, reorder, duplicate, or hide sections on those pages.

---

## 3. Route Discovery & Template Classification

A total of **173 discoverable routes** (138 active 200 OK + 35 consolidated legacy redirects) were mapped into `/audit/routes.json` across 7 templates:

1. **Homepage Template (1 route):** `/`
2. **Prayer & Scripture Text Template (16 routes):**
   - 10 static hymns: `/sankat-mochan-hanumanashtak`, `/bajrang-baan`, `/ram-chalisa`, `/hanuman-aarti`, `/hanuman-stuti`, `/hanuman-chalisa-meaning`, `/shri-hanuman-chalisa-path-vidhi`, `/ram-hanuman-chalisa`, `/hanuman-chalisa-audio-mp3`, `/hanuman-chalisa-pdf`.
   - 6 regional translations: `/hanuman-chalisa/[lang]` (`en`, `te`, `bn`, `kn`, `gu`, `mr`).
3. **Festival & Event Template (1 route):** `/hanuman-jayanti`.
4. **Article & Blog Template (104 active routes + 35 redirected legacy):** `/blog/[slug]`.
5. **Devotional Benefits Template (14 routes):** `/hanuman-chalisa-benefits/[slug]`.
6. **Devotional Stories Template (8 routes):** `/stories/[slug]`.
7. **Category & Informational Template (8 routes):**
   - Listing hubs (3): `/blog`, `/hanuman-chalisa-benefits`, `/stories`.
   - Legal/Informational (5): `/about`, `/contact`, `/faq`, `/privacy-policy`, `/disclaimer`.

---

## 4. Baseline Snapshot & Rendered HTML Capture

- All route metadata (status code, canonical URL, page title, meta description, H1, robots meta, JSON-LD schemas, and internal links) has been verified and saved to [`/audit/before.json`](file:///d:/ramhanumanchalisa/audit/before.json).
- Full rendered HTML snapshots have been stored in [`/audit/html_snapshots/`](file:///d:/ramhanumanchalisa/audit/html_snapshots/).
- Complete component section breakdowns for each hardcoded page are documented in [`/audit/routes.json`](file:///d:/ramhanumanchalisa/audit/routes.json).
- Systems and risk architecture documented in [`/audit/architecture.md`](file:///d:/ramhanumanchalisa/audit/architecture.md).

---

## 5. Items Marked NOT VERIFIED & Needs Approval

- **Headless Browser Automated Screenshots:** `puppeteer` or `playwright` is not installed in `package.json`. In strict compliance with Rule 4 ("Do not add a dependency... without listing under NEEDS MY APPROVAL"), we did not install Puppeteer. Marked as `NOT VERIFIED (automated screenshot rendering)` and listed under `NEEDS MY APPROVAL`.
- **Search Console & Cloudflare Dashboard Live Access:** Marked `NOT VERIFIED (external network/credential isolation)`.

---

## 6. Exit Check Verification
- [x] Routes inventoried in `/audit/routes.json`.
- [x] Baseline snapshot captured in `/audit/before.json`.
- [x] Full rendered HTML DOM snapshots stored in `/audit/html_snapshots/`.
- [x] Technical architecture & risk analysis documented in `/audit/architecture.md`.
- [x] Architectural decisions recorded in `/audit/DECISIONS.md`.
- **Stage 1 Exit Status:** PASSED. Proceeding to Stage 2.
