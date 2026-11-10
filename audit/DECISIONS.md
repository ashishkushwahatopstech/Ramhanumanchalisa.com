# Architectural Decisions & Assumptions Log
**Project:** RamHanumanChalisa.com — Admin Pagebuilder & CMS Upgrade  
**Branch:** `admin-pagebuilder`  
**Created:** 2026-11-10  
**Updated:** 2026-11-10 (Stage 6 Finalization)

---

## 1. Principles & Non-Negotiable Hard Rules
- **Rule 1 (Branch Safety):** All work conducted exclusively on `admin-pagebuilder`. Base tagged at `pre-pagebuilder-backup`. Production (`main`) is NEVER touched.
- **Rule 2 (Zero URL/SEO Regressions):** 100% of existing routes, canonicals, H1s, meta descriptions, schemas, AdSlots (`ca-pub-2458897753508445`), GTM (`GTM-MJKL5P3X`), GA (`G-VBBLMPSKY2`), and `ads.txt` must remain completely intact.
- **Rule 3 (Scripture Immutability):** Scripture texts (Chalisas, Ashtak, Baan, Mantras, Chaupais) must be byte-for-byte identical. Scripture components are defined as `LOCKED` blocks editable only by users with explicit Scripture Editor permissions.
- **Rule 4 (Zero Unapproved Dependencies):** All block definitions, content models, and page schemas prefer Git-based storage (`src/data/pagebuilder/pages/*.json`) compatible with Cloudflare Pages without adding unapproved packages.
- **Rule 5 (Secret Protection):** No credentials, D1 database tokens, or OAuth secrets in client bundles or public repositories.
- **Rule 6 (Truthfulness):** Any unverified external tool/site (live site network access, Cloudflare dashboard, Search Console, Instagram scraping) is explicitly designated as `NOT VERIFIED`.

---

## 2. Key Architectural Decisions

### Decision 1: Git-Backed File Store with In-Memory Caching (`src/data/pagebuilder/`)
- **Problem:** Admin must be able to add, edit, reorder, duplicate, hide, and remove sections across all pages without requiring a developer. Cloudflare Pages runs static and edge SSR code.
- **Decision:** Use a file-based JSON schema store (`src/data/pagebuilder/pages/*.json`) committed in Git as the authoritative ground truth for all pages, with baseline original snapshots preserved in `src/data/pagebuilder/original_snapshots/*.json`.
- **Rationale:** 
  1. Content in Git enables full version history, instant rollbacks ("Reset to Original"), and builds without database latency.
  2. Complies 100% with Rule 4 (no paid CMS, no external DB required).
  3. Seamless SSR and static build compatibility on Cloudflare Pages.

### Decision 2: Locked Blocks for Sacred Scriptures (Rule 3)
- **Problem:** Rule 3 strictly forbids modifying sacred verses.
- **Decision:** Block type `scripture_verses` is flagged with `locked: true` in the block registry schema. Editing in Admin UI requires explicit `isScriptureEditor` mode with an unyielding confirmation dialog alerting the user about potential religious distress to devotees. Server rejects any unsanctioned change with HTTP 403.

### Decision 3: Cumulative Layout Shift (CLS) Prevention for AdSense
- **Problem:** Dynamic Google AdSense loading can trigger page jumps that damage Core Web Vitals.
- **Decision:** Every ad slot block reserves a minimum layout container height (`min-h-[90px]`, `min-h-[120px]`, `h-24`), preventing Cumulative Layout Shift (`CLS < 0.1`).

### Decision 4: Read-Only Slugs & Single H1 Enforcement
- **Problem:** Non-technical admins might accidentally change slugs or add multiple H1 headings, destroying organic search engine indexing.
- **Decision:** Page slugs for existing pages are strictly read-only in the admin interface. Exactly one semantic H1 is enforced at schema validation and build time.

---

## 3. Log of Completed Stages
- [x] Pre-pagebuilder backup git tag created: `pre-pagebuilder-backup`
- [x] Branch initialized: `admin-pagebuilder`
- [x] Stage 1: Complete Website Audit & Baseline Snapshot (`audit/stage-1-report.md`)
- [x] Stage 2: Block System Architecture & Schema Specification (`audit/stage-2-report.md`, `audit/design.md`)
- [x] Stage 3: Zero-Change Migration of Existing Pages (`audit/stage-3-report.md`, `audit/not-migrated.md`)
- [x] Stage 4: Admin Editing Interface Upgrade (`audit/stage-4-report.md`, `/admin/pagebuilder`)
- [x] Stage 5: Social, Embeds, Ads and Performance Verification (`audit/stage-5-report.md`)
- [x] Stage 6: Final Regression Diff & Preview Deployment (`audit/FINAL-REPORT.md`)
