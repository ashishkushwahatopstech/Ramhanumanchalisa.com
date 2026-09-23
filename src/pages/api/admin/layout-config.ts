import type { APIRoute } from "astro";
import { d1GetSiteConfig, d1SaveSiteConfig } from "../../../lib/d1";
import { getSiteLayoutConfig, saveSiteLayoutConfig, type SiteLayoutConfig } from "../../../lib/siteConfig";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const GET: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = (context.locals as any)?.runtime?.env?.DB;
  let config: SiteLayoutConfig | null = null;

  if (db && typeof db.prepare === "function") {
    try {
      config = await d1GetSiteConfig(db);
    } catch (e) {
      console.warn("Notice: D1 getSiteConfig in GET API:", e);
    }
  }

  if (!config) {
    config = getSiteLayoutConfig();
  }

  return new Response(JSON.stringify(config), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = (context.locals as any)?.runtime?.env?.DB;

  try {
    const body = await context.request.json();
    const updated = saveSiteLayoutConfig(body);

    if (db && typeof db.prepare === "function") {
      try {
        await d1SaveSiteConfig(db, updated);
      } catch (e) {
        console.warn("Notice: D1 saveSiteConfig error:", e);
      }
    }

    return new Response(JSON.stringify({ success: true, config: updated }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to save site layout config:", error);
    return new Response(JSON.stringify({ error: "Failed to update layout config" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
