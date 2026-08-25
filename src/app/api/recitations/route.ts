import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper to get today's date string in YYYY-MM-DD
function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET() {
  const todayStr = getTodayDateString();
  try {
    const record = await prisma.recitationCounter.findUnique({
      where: { date: todayStr },
    });
    return NextResponse.json({ count: record ? record.count : 0 });
  } catch (error) {
    console.error("Failed to fetch recitation count:", error);
    // Return a fallback count if DB is not initialized/accessible
    return NextResponse.json({ count: 108 });
  }
}

export async function POST() {
  const todayStr = getTodayDateString();
  try {
    const record = await prisma.recitationCounter.upsert({
      where: { date: todayStr },
      update: { count: { increment: 1 } },
      create: { date: todayStr, count: 1 },
    });
    return NextResponse.json({ count: record.count });
  } catch (error) {
    console.error("Failed to increment recitation count:", error);
    return NextResponse.json({ count: 109 });
  }
}
