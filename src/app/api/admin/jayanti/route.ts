export const runtime = 'edge';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export async function GET() {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const configs = await prisma.jayantiConfig.findMany({
      orderBy: { year: "desc" },
    });
    return NextResponse.json(configs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Jayanti configurations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const body = await request.json();
    const { year, date, pujaMuhurat, description } = body;

    if (!year || !date || !pujaMuhurat) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const config = await prisma.jayantiConfig.upsert({
      where: { year: parseInt(year) },
      update: {
        date,
        pujaMuhurat,
        description: description || "",
      },
      create: {
        year: parseInt(year),
        date,
        pujaMuhurat,
        description: description || "",
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save Jayanti configuration" }, { status: 500 });
  }
}
