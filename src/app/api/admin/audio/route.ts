import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const body = await request.json();
    const { reciterName, url, duration, description, isDefault, timestampsJSON } = body;

    if (!reciterName || !url || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

    return NextResponse.json(track);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create audio track" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, reciterName, url, duration, description, isDefault, timestampsJSON } = body;

    if (!id || !reciterName || !url || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

    return NextResponse.json(track);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update audio track" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing track ID" }, { status: 400 });
    }

    await prisma.audioTrack.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete audio track" }, { status: 500 });
  }
}
