import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { savePage } from "../../../../lib/pagebuilder/store";
import { validatePage } from "../../../../lib/pagebuilder/validator";
import type { PageModel } from "../../../../lib/pagebuilder/schema";

const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { page, isScriptureEditor } = body;
  if (!page || !page.slug) {
    return new Response(JSON.stringify({ error: "Page data and slug are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Load original snapshot to verify against
  const fileKey = page.slug === "/" || page.slug === "home" ? "home" : page.slug.replace(/^\/+|\/+$/g, "").replace(/\//g, "__");
  const origPath = path.join(ORIGINALS_DIR, `${fileKey}.json`);
  let originalPage: PageModel | null = null;
  if (fs.existsSync(origPath)) {
    try {
      originalPage = JSON.parse(fs.readFileSync(origPath, "utf8"));
    } catch (e) {
      console.warn("Could not parse original snapshot:", e);
    }
  }

  // HARD SAFETY RULE: Scripture Verses byte-for-byte protection (Rule 3)
  if (originalPage) {
    for (const s of page.sections || []) {
      for (const c of s.containers || []) {
        for (const col of c.columns || []) {
          for (const b of col.blocks || []) {
            if (b.type === "scripture_verses") {
              // Find matching block in original
              for (const origS of originalPage.sections || []) {
                for (const origC of origS.containers || []) {
                  for (const origCol of origC.columns || []) {
                    for (const origB of origCol.blocks || []) {
                      if (origB.id === b.id) {
                        const origVerses = JSON.stringify(origB.content?.verses || "");
                        const curVerses = JSON.stringify(b.content?.verses || "");
                        if (origVerses !== curVerses) {
                          if (!isScriptureEditor) {
                            return new Response(
                              JSON.stringify({
                                error: "HARD SAFETY RULE 3 VIOLATION: Sacred scripture text is LOCKED. Any modification requires explicit 'Scripture Editor' authorization and confirmation."
                              }),
                              { status: 403, headers: { "Content-Type": "application/json" } }
                            );
                          }
                          page.auditMeta = {
                            ...(page.auditMeta || {}),
                            hasScriptureModifications: true
                          };
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Run build-time schema validator
  const validation = validatePage(page, originalPage);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({
        error: "Schema Validation Failed",
        errors: validation.errors,
        warnings: validation.warnings
      }),
      { status: 422, headers: { "Content-Type": "application/json" } }
    );
  }

  // Save to page store
  const saveResult = savePage(page, "ashishkushwaha88643@gmail.com");
  if (!saveResult.success) {
    return new Response(JSON.stringify({ error: saveResult.error || "Failed to persist page model" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: `Page "${page.slug}" saved successfully.`,
      warnings: validation.warnings,
      version: page.auditMeta?.version || 1
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
