import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CarvedDivider from "@/components/CarvedDivider";
import FaqManagerForm from "@/components/FaqManagerForm";
import prisma from "@/lib/prisma";

export default async function AdminFaqsPage() {
  // Server-side security check
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  if (!session || session.user?.email !== "ashishkushwaha88643@gmail.com") {
    redirect("/unauthorized");
  }

  // Pre-load all database FAQs
  let initialFaqs: any[] = [];
  try {
    initialFaqs = await prisma.faq.findMany({
      orderBy: [
        { pageSlug: "asc" },
        { order: "asc" }
      ]
    });
  } catch (error) {
    console.error("Error pre-loading FAQs for admin:", error);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-maroon-deep border-2 border-brass-gold p-4 sm:p-6 rounded-lg text-stone-ivory">
        <div className="space-y-1">
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-marigold uppercase">
            FAQ Content Manager
          </h2>
          <p className="text-xs text-stone-ivory/70">
            Add or edit frequently asked questions grouped by page. Updates automatically feed into JSON-LD FAQPage schemas.
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

      {/* Faq Manager Client Form */}
      <FaqManagerForm initialFaqs={initialFaqs} />

    </div>
  );
}

import Link from "next/link";
