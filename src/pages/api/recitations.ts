import type { APIRoute } from "astro";
import { getPrisma } from "../../lib/prisma";

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const GET: APIRoute = async (context) => {
  const todayStr = getTodayDateString();
  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const record = await prisma.recitationCounter.findUnique({
      where: { date: todayStr },
    });
    return new Response(
      JSON.stringify({ count: record ? record.count : 0 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Failed to fetch recitation count:", error);
    return new Response(
      JSON.stringify({ count: 108 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

export const POST: APIRoute = async (context) => {
  const todayStr = getTodayDateString();
  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const record = await prisma.recitationCounter.upsert({
      where: { date: todayStr },
      update: { count: { increment: 1 } },
      create: { date: todayStr, count: 1 },
    });
    return new Response(
      JSON.stringify({ count: record.count }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Failed to increment recitation count:", error);
    return new Response(
      JSON.stringify({ count: 109 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
