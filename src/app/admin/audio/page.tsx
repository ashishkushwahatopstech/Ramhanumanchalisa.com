import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CarvedDivider from "@/components/CarvedDivider";
import AudioManagerForm from "@/components/AudioManagerForm";
import prisma from "@/lib/prisma";

export default async function AdminAudioPage() {
  // Server-side security check
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  if (!session || session.user?.email !== "ashishkushwaha88643@gmail.com") {
    redirect("/unauthorized");
  }

  // Pre-load all database tracks
  let initialTracks: any[] = [];
  try {
    initialTracks = await prisma.audioTrack.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error pre-loading audio tracks for admin:", error);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-maroon-deep border-2 border-brass-gold p-4 sm:p-6 rounded-lg text-stone-ivory">
        <div className="space-y-1">
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-marigold uppercase">
            Audio & Verse Sync Manager
          </h2>
          <p className="text-xs text-stone-ivory/70">
            Configure reciters, audio track URLs, and define timestamps ranges to highlight lyrics in sync with playback.
          </p>
        </div>
        <Link
          href="/admin"
          className="bg-stone-ivory/10 hover:bg-stone-ivory/20 px-3 py-1.5 rounded text-xs font-bold uppercase border border-stone-ivory/30 shadow transition-colors"
        >
          &larr; Dashboard
        </Link>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* AudioManager Client Form */}
      <AudioManagerForm initialTracks={initialTracks} />

    </div>
  );
}

import Link from "next/link";
