export const runtime = 'edge';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tracks = await prisma.audioTrack.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Map tracks to client schema
    const formatted = tracks.map((t) => ({
      id: t.id,
      name: t.reciterName, // fallback name mapping
      reciter: t.reciterName,
      url: t.url,
      duration: t.duration,
      description: t.description || "",
    }));
    
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Public audio tracks fetch query warning:", error);
    // Return empty array on failure so client uses static defaults
    return NextResponse.json([]);
  }
}
