import type { APIRoute } from "astro";
import { getPrisma } from "../../../lib/prisma";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const POST: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const body = await context.request.json();
    const { reciterName, url, duration, description, isDefault, timestampsJSON } = body;

    if (!reciterName || !url || !duration) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const track = await prisma.audioTrack.create({
      data: {
        reciterName,
        url,
        duration: parseInt(duration),
        description: description || "",
        isDefault: !!isDefault,
        timestampsJSON: timestampsJSON || null,
      },
    });

    return new Response(JSON.stringify(track), { status: 200 });
  } catch (error) {
    console.error("Failed to create audio track:", error);
    return new Response(JSON.stringify({ error: "Failed to create audio track" }), { status: 500 });
  }
};

export const PUT: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const body = await context.request.json();
    const { id, reciterName, url, duration, description, isDefault, timestampsJSON } = body;

    if (!id || !reciterName || !url || !duration) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const track = await prisma.audioTrack.update({
      where: { id },
      data: {
        reciterName,
        url,
        duration: parseInt(duration),
        description: description || "",
        isDefault: !!isDefault,
        timestampsJSON: timestampsJSON || null,
      },
    });

    return new Response(JSON.stringify(track), { status: 200 });
  } catch (error) {
    console.error("Failed to update audio track:", error);
    return new Response(JSON.stringify({ error: "Failed to update audio track" }), { status: 500 });
  }
};

export const DELETE: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const { searchParams } = new URL(context.request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing track ID" }), { status: 400 });
    }

    await prisma.audioTrack.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to delete audio track:", error);
    return new Response(JSON.stringify({ error: "Failed to delete audio track" }), { status: 500 });
  }
};
