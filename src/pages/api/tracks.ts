import type { APIRoute } from "astro";
import { getPrisma } from "../../lib/prisma";

export const GET: APIRoute = async (context) => {
  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const tracks = await prisma.audioTrack.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Map tracks to client schema
    const formatted = tracks.map((t) => ({
      id: t.id,
      name: t.reciterName,
      reciter: t.reciterName,
      url: t.url,
      duration: t.duration,
      description: t.description || "",
    }));
    
    return new Response(JSON.stringify(formatted), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Public audio tracks fetch query warning:", error);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
