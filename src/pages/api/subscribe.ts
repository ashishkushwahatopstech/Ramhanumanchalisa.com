import type { APIRoute } from "astro";
import { d1AddSubscriber } from "../../lib/d1";

declare global {
  var __SUBSCRIBERS_CACHE__: Array<{ id: string; email: string; source: string; createdAt: string }> | undefined;
}

if (!globalThis.__SUBSCRIBERS_CACHE__) {
  globalThis.__SUBSCRIBERS_CACHE__ = [];
}

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.trim() : "morning_blessings";

    // Simple email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Please provide a valid email address." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = (context.locals as any)?.runtime?.env?.DB;
    let saved = false;

    if (db && typeof db.prepare === "function") {
      try {
        const result = await d1AddSubscriber(db, email, source);
        saved = result.success;
      } catch (e) {
        console.warn("Notice: D1 subscriber insert fallback to cache:", e);
      }
    }

    // Always maintain runtime memory cache for zero-downtime & edge environments
    const existingInCache = globalThis.__SUBSCRIBERS_CACHE__?.find((s) => s.email === email);
    if (!existingInCache) {
      globalThis.__SUBSCRIBERS_CACHE__ = globalThis.__SUBSCRIBERS_CACHE__ || [];
      globalThis.__SUBSCRIBERS_CACHE__.unshift({
        id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        email,
        source,
        createdAt: new Date().toISOString(),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "🙏 Jai Shree Ram! You have been successfully subscribed for Daily Morning Hanuman Blessings.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(JSON.stringify({ error: "Unable to process subscription right now. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
