import type { APIRoute } from "astro";
import { getPrisma } from "../../lib/prisma";
import { d1GetRecitations, d1IncrementRecitations } from "../../lib/d1";

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// In-memory sliding window rate limiter for edge worker
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string, requestedAmount: number): boolean {
  const now = Date.now();
  const windowMs = 10_000; // 10 seconds window
  const maxAllowedPerWindow = 30; // Devotees can chant/click up to 30 times every 10 seconds

  // Clean stale entries periodically if map grows
  if (rateLimitMap.size > 2000) {
    for (const [key, entry] of rateLimitMap.entries()) {
      if (entry.resetAt < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  const current = rateLimitMap.get(ip);
  if (!current || current.resetAt < now) {
    rateLimitMap.set(ip, { count: requestedAmount, resetAt: now + windowMs });
    return false;
  }

  if (current.count + requestedAmount > maxAllowedPerWindow) {
    return true; // Exceeded limit
  }

  current.count += requestedAmount;
  return false;
}

export const GET: APIRoute = async (context) => {
  const todayStr = getTodayDateString();
  const db = context.locals.runtime?.env?.DB;

  try {
    let count = 0;
    if (db && typeof db.prepare === "function") {
      count = await d1GetRecitations(db, todayStr);
    } else {
      const prisma = getPrisma(db);
      const record = await prisma.recitationCounter.findUnique({
        where: { date: todayStr },
      });
      count = record ? record.count : 0;
    }

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Edge cache for 10 seconds so 100k users don't exhaust DB
        "Cache-Control": "public, max-age=5, s-maxage=10, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Failed to fetch recitation count:", error);
    return new Response(JSON.stringify({ count: 108 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async (context) => {
  const todayStr = getTodayDateString();
  const db = context.locals.runtime?.env?.DB;

  // Extract client IP
  const ip =
    context.request.headers.get("cf-connecting-ip") ||
    context.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";

  // Parse batch increment if sent
  let batchCount = 1;
  try {
    const contentType = context.request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await context.request.json();
      if (typeof body.batch === "number" && body.batch > 0) {
        batchCount = Math.min(Math.floor(body.batch), 10); // Cap at max 10 per sync
      }
    }
  } catch {
    batchCount = 1;
  }

  // Check rate limit
  const rateLimited = isRateLimited(ip, batchCount);

  try {
    let count = 0;

    if (rateLimited) {
      // Return current count without incrementing to silently block spam bots
      if (db && typeof db.prepare === "function") {
        count = await d1GetRecitations(db, todayStr);
      } else {
        const prisma = getPrisma(db);
        const record = await prisma.recitationCounter.findUnique({ where: { date: todayStr } });
        count = record ? record.count : 0;
      }
      return new Response(JSON.stringify({ count, rateLimited: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }

    if (db && typeof db.prepare === "function") {
      count = await d1IncrementRecitations(db, todayStr, batchCount);
    } else {
      const prisma = getPrisma(db);
      const record = await prisma.recitationCounter.upsert({
        where: { date: todayStr },
        update: { count: { increment: batchCount } },
        create: { date: todayStr, count: batchCount },
      });
      count = record.count;
    }

    return new Response(JSON.stringify({ count, batchAccepted: batchCount }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to increment recitation count:", error);
    return new Response(JSON.stringify({ count: 109 }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
};
