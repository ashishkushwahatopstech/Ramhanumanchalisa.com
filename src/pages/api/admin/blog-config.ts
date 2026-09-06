import type { APIRoute } from "astro";
import { d1GetBlogConfig, d1SaveBlogConfig } from "../../../lib/d1";
import { getBlogConfig, saveBlogConfig, type BlogLayoutConfig } from "../../../lib/dynamicContent";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const GET: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  let config: BlogLayoutConfig | null = null;

  if (db && typeof db.prepare === "function") {
    try {
      config = await d1GetBlogConfig(db);
    } catch (e) {
      console.warn("Notice: D1 getBlogConfig in GET API:", e);
    }
  }

  if (!config) {
    config = getBlogConfig();
  }

  return new Response(JSON.stringify(config), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;

  try {
    const body = await context.request.json();
    const current = getBlogConfig();
    const newConfig: BlogLayoutConfig = {
      postsPerPage: Number(body.postsPerPage) > 0 ? Math.min(100, Math.max(1, Number(body.postsPerPage))) : (current.postsPerPage || 15),
      sidebarEnabled: body.sidebarEnabled !== undefined ? Boolean(body.sidebarEnabled) : current.sidebarEnabled,
      aboutTitle: typeof body.aboutTitle === "string" ? body.aboutTitle : current.aboutTitle,
      aboutContent: typeof body.aboutContent === "string" ? body.aboutContent : current.aboutContent,
      featuredHymnTitle: typeof body.featuredHymnTitle === "string" ? body.featuredHymnTitle : current.featuredHymnTitle,
      featuredHymnUrl: typeof body.featuredHymnUrl === "string" ? body.featuredHymnUrl : current.featuredHymnUrl,
      featuredHymnDesc: typeof body.featuredHymnDesc === "string" ? body.featuredHymnDesc : current.featuredHymnDesc,
      customHtmlWidget: typeof body.customHtmlWidget === "string" ? body.customHtmlWidget : (current.customHtmlWidget || ""),
      showRecentPosts: body.showRecentPosts !== undefined ? Boolean(body.showRecentPosts) : current.showRecentPosts,
      showCategories: body.showCategories !== undefined ? Boolean(body.showCategories) : current.showCategories,
    };

    saveBlogConfig(newConfig);

    if (db && typeof db.prepare === "function") {
      try {
        await d1SaveBlogConfig(db, newConfig);
      } catch (e) {
        console.warn("Notice: D1 saveBlogConfig error:", e);
      }
    }

    return new Response(JSON.stringify({ success: true, config: newConfig }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to save blog config:", error);
    return new Response(JSON.stringify({ error: "Failed to update blog config" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
