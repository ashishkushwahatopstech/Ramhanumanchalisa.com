import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CarvedDivider from "@/components/CarvedDivider";
import JayantiManagerForm from "@/components/JayantiManagerForm";
import prisma from "@/lib/prisma";

export default async function AdminJayantiPage() {
  // Server-side security check
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  if (!session || session.user?.email !== "ashishkushwaha88643@gmail.com") {
    redirect("/unauthorized");
  }

  // Pre-load all configurations
  let initialConfigs: any[] = [];
  try {
    initialConfigs = await prisma.jayantiConfig.findMany({
      orderBy: { year: "desc" },
    });
  } catch (error) {
    console.error("Error pre-loading Jayanti configs:", error);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-maroon-deep border-2 border-brass-gold p-4 sm:p-6 rounded-lg text-stone-ivory">
        <div className="space-y-1">
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-marigold uppercase">
            Jayanti Festival Configurations
          </h2>
          <p className="text-xs text-stone-ivory/70">
            Configure dates, moon timings (tithis), and recommended puja muhurat periods displayed on the evergreen festival page.
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

      {/* Jayanti Manager Form Component */}
      <JayantiManagerForm initialConfigs={initialConfigs} />

    </div>
  );
}

import Link from "next/link";
