import type { APIRoute } from "astro";
import { d1GetSubscribers, d1DeleteSubscriber } from "../../../lib/d1";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const GET: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = (context.locals as any)?.runtime?.env?.DB;
  let dbSubscribers: any[] = [];

  if (db && typeof db.prepare === "function") {
    try {
      dbSubscribers = await d1GetSubscribers(db);
    } catch (e) {
      console.warn("Notice: D1 getSubscribers error:", e);
    }
  }

  // Merge with memory cache
  const cacheSubscribers = globalThis.__SUBSCRIBERS_CACHE__ || [];
  const knownEmails = new Set(dbSubscribers.map((s) => s.email));
  const merged = [...dbSubscribers];
  for (const item of cacheSubscribers) {
    if (!knownEmails.has(item.email)) {
      merged.push(item);
      knownEmails.add(item.email);
    }
  }

  merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return new Response(JSON.stringify({ subscribers: merged, total: merged.length }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");
  const email = url.searchParams.get("email");

  if (!id && !email) {
    return new Response(JSON.stringify({ error: "Missing id or email" }), { status: 400 });
  }

  const db = (context.locals as any)?.runtime?.env?.DB;
  if (db && typeof db.prepare === "function" && id) {
    try {
      await d1DeleteSubscriber(db, id);
    } catch (e) {
      console.warn("Notice: D1 deleteSubscriber error:", e);
    }
  }

  // Remove from cache
  if (globalThis.__SUBSCRIBERS_CACHE__) {
    globalThis.__SUBSCRIBERS_CACHE__ = globalThis.__SUBSCRIBERS_CACHE__.filter(
      (s) => s.id !== id && s.email !== email
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
