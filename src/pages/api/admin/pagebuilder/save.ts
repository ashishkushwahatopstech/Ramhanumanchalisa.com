import type { APIRoute } from "astro";
import { savePage, getPageBySlugWithDb } from "../../../../lib/pagebuilder/store";
import { validatePage } from "../../../../lib/pagebuilder/validator";

export const POST: APIRoute = async (context) => {
  const sessionCookie = context.cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body: any;
  try {
    body = await context.request.json();
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

  const db = (context.locals as any)?.runtime?.env?.DB;

  // Load original baseline snapshot to verify against
  const originalPage = await getPageBySlugWithDb(page.slug, db);

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

  // Save to page store and D1
  const saveResult = await savePage(page, "ashishkushwaha88643@gmail.com", db);
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
