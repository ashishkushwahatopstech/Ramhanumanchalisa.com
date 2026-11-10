# Architectural Decisions & Assumptions Log
**Project:** RamHanumanChalisa.com — Admin Pagebuilder & CMS Upgrade  
**Branch:** `admin-pagebuilder`  
**Created:** 2026-11-10  

---

## 1. Principles & Non-Negotiable Hard Rules
- **Rule 1 (Branch Safety):** All work conducted exclusively on `admin-pagebuilder`. Base tagged at `pre-pagebuilder-backup`. Production (`main`) is NEVER touched.
- **Rule 2 (Zero URL/SEO Regressions):** 100% of existing routes, canonicals, H1s, meta descriptions, schemas, AdSlots (`ca-pub-2458897753508445`), GTM (`GTM-MJKL5P3X`), GA (`G-VBBLMPSKY2`), and `ads.txt` must remain completely intact.
- **Rule 3 (Scripture Immutability):** Scripture texts (Chalisas, Ashtak, Baan, Mantras, Chaupais) must be byte-for-byte identical. Scripture components are defined as `LOCKED` blocks editable only by users with explicit Scripture Editor permissions.
- **Rule 4 (Zero Unapproved Dependencies):** All block definitions, content models, and page schemas prefer Git-based storage (`src/data/pages/*.json`, `src/data/blocks/*.json`) compatible with Cloudflare Pages without adding unapproved packages.
- **Rule 5 (Secret Protection):** No credentials, D1 database tokens, or OAuth secrets in client bundles or public repositories.
- **Rule 6 (Truthfulness):** Any unverified external tool/site (live site network access, Cloudflare dashboard, Search Console, Instagram scraping) is explicitly designated as `NOT VERIFIED`.

---

## 2. Key Decisions

### Decision 1: Hybrid Content Storage (Git + D1 Ready)
- **Problem:** Admin must be able to add, edit, reorder, duplicate, hide, and remove sections across all pages without requiring a developer. Cloudflare Pages runs static and edge SSR code.
- **Decision:** Use a file-based JSON schema store (`src/data/pagebuilder/pages/*.json`) committed in Git as the authoritative ground truth for all pages, with an edge-caching and Cloudflare D1 synchronization layer.
- **Rationale:** 
  1. Content in Git enables full version history, rollbacks ("reset to original"), and builds without database latency.
  2. Complies 100% with Rule 4 (no paid CMS, no external DB required).
  3. Seamless SSR and static build compatibility on Cloudflare Pages.

### Decision 2: Locked Blocks for Sacred Scriptures
- **Problem:** Rule 3 strictly forbids modifying sacred verses.
- **Decision:** Block types `scripture_verses`, `chalisa_recitation`, `hanumanashtak_recitation`, and `bajrang_baan_recitation` are flagged with `locked: true` in the block registry schema. Editing in Admin UI requires explicit `scripture_editor` mode with a permanent religious integrity warning.

### Decision 3: Zero Headless Browser Installations
- **Problem:** Taking automated browser screenshots requires installing `puppeteer` (~300MB chromium download).
- **Decision:** In accordance with Rule 4 ("Do not add a dependency... without listing under NEEDS MY APPROVAL"), we capture complete rendered HTML DOM snapshots and HTTP metadata for all 149 routes in `audit/before.json` and `audit/html_snapshots/`, and list `puppeteer` in `NEEDS MY APPROVAL`.

---

## 3. Log of Completed Stages
- [x] Pre-pagebuilder backup git tag created: `pre-pagebuilder-backup`
- [x] Branch initialized: `admin-pagebuilder`
- [ ] Stage 1: Complete Website Audit & Baseline Snapshot
- [ ] Stage 2: Block System Architecture & Schema Specification
- [ ] Stage 3: Zero-Change Migration of Existing Pages
- [ ] Stage 4: Admin Editing Interface Upgrade
- [ ] Stage 5: Social, Embeds, and Performance Verification
- [ ] Stage 6: Final Regression Diff & Preview Deployment
