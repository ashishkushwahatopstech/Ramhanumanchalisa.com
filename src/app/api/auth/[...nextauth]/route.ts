import { NextResponse } from "next/server";

export const runtime = "edge";

// Mock authOptions to bypass OIDC loading during edge compilation
export const authOptions: any = {
  providers: [],
  secret: "fallback-secret-key-123456",
};

export async function GET() {
  return new NextResponse("NextAuth Bypassed", { status: 200 });
}

export async function POST() {
  return new NextResponse("NextAuth Bypassed", { status: 200 });
}
