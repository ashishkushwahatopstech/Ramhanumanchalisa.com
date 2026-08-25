import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CarvedDivider from "@/components/CarvedDivider";
import Link from "next/link";
import LanguageManagerForm from "@/components/LanguageManagerForm";

export default async function AdminLanguagesPage() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };

  if (!session || session.user?.email !== "ashishkushwaha88643@gmail.com") {
    redirect("/unauthorized");
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-maroon-deep border-2 border-brass-gold p-6 rounded-lg text-stone-ivory">
        <div className="space-y-1">
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-marigold uppercase text-center sm:text-left">
            Multi-Language Manager
          </h2>
          <p className="text-xs text-stone-ivory/80 text-center sm:text-left">
            Configure regional translations, page titles, and schema metadata.
          </p>
        </div>
        <div>
          <Link
            href="/admin"
            className="bg-stone-ivory/10 hover:bg-stone-ivory/20 px-4 py-2 rounded text-xs font-bold uppercase border border-stone-ivory/30 shadow transition-colors block text-center"
          >
            &larr; Admin Dashboard
          </Link>
        </div>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Editor Form */}
      <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm">
        <LanguageManagerForm />
      </section>

    </div>
  );
}
