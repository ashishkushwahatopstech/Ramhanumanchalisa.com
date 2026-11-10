# Not-Migrated & Safe Database Pages

As per **Safety Rule 2** and **Stage 3 Guidelines**, pages that cannot be migrated safely or are already dynamically managed by Cloudflare D1/Prisma without static regressions remain in their current high-performance dynamic state.

## Dynamic Database Routes (Maintained in Cloudflare D1 / Prisma)
The following categories of dynamic pages remain safely served by existing database tables and dynamic endpoints:
1. **Dynamic Blog Articles (~130 articles)**: Managed via existing `/admin/blog` and D1 database `jaishreeram-db`. They can be imported into the Pagebuilder on-demand as block pages if customized.
2. **Dynamic Story Viewers (`/stories/*`)**: Handled via custom React Web Story player components with specialized touch gestures and dynamic audio sync.
3. **Legacy Redirection Slugs (e.g. `/hanuman-ji-ki-aarti`, consolidated slugs)**: Redirected with HTTP 301 permanently to prevent canonical duplicate penalties.
4. **Interactive Language Subpaths (`/hanuman-chalisa/[lang]`)**: Handled via multilingual JSON scripture bundles.

All 19 primary core pages (Homepage, Sankat Mochan Hanuman Ashtak, Hanuman Jayanti, Bajrang Baan, Ram Chalisa, Hanuman Aarti, Hanuman Stuti, Path Vidhi, Meaning, MP3, PDF, About, Contact, Disclaimer, Privacy Policy, FAQ, and Pilot Articles) have been successfully migrated to the Block Pagebuilder System with original baseline snapshots stored.
