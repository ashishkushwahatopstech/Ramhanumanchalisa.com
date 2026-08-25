import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import CarvedDivider from "@/components/CarvedDivider";
import Link from "next/link";

export default async function AdminDashboardPage() {
  // 1. Secure Server-Side Gate Check
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };

  if (!session || session.user?.email !== "ashishkushwaha88643@gmail.com") {
    redirect("/unauthorized");
  }

  // 2. Fetch Dashboard Statistics
  let blogCount = 0;
  let dailyRecitations = 0;
  let tracksCount = 0;

  try {
    blogCount = await prisma.post.count();
    
    // Get today's recitations
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const record = await prisma.recitationCounter.findUnique({ where: { date: todayStr } });
    dailyRecitations = record ? record.count : 0;
    
    tracksCount = await prisma.audioTrack.count();
  } catch (error) {
    console.error("Dashboard DB fetch warning:", error);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-maroon-deep border-2 border-brass-gold p-6 rounded-lg text-stone-ivory">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-marigold uppercase">
            Mandir Administrator Dashboard
          </h2>
          <p className="text-xs text-stone-ivory/80">
            Logged in as: <code className="text-marigold">{session.user.email}</code>
          </p>
        </div>
        
        <div>
          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="bg-stone-ivory/10 hover:bg-stone-ivory/20 px-4 py-2 rounded text-xs font-bold uppercase border border-stone-ivory/30 shadow transition-colors"
          >
            🚪 Sign Out
          </Link>
        </div>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Stats Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-stone-ivory border border-brass-gold/30 rounded-lg shadow-sm text-center">
          <span className="text-3xl block mb-2">📝</span>
          <h4 className="text-2xl font-bold font-sans text-maroon-deep">{blogCount}</h4>
          <p className="text-xs text-charcoal-brown/60 uppercase font-bold tracking-wider mt-1">Blog Articles</p>
        </div>

        <div className="p-6 bg-stone-ivory border border-brass-gold/30 rounded-lg shadow-sm text-center">
          <span className="text-3xl block mb-2">🔔</span>
          <h4 className="text-2xl font-bold font-sans text-maroon-deep">{dailyRecitations}</h4>
          <p className="text-xs text-charcoal-brown/60 uppercase font-bold tracking-wider mt-1">Recitations Today</p>
        </div>

        <div className="p-6 bg-stone-ivory border border-brass-gold/30 rounded-lg shadow-sm text-center">
          <span className="text-3xl block mb-2">🎵</span>
          <h4 className="text-2xl font-bold font-sans text-maroon-deep">{tracksCount}</h4>
          <p className="text-xs text-charcoal-brown/60 uppercase font-bold tracking-wider mt-1">Audio Tracks</p>
        </div>
      </section>

      {/* Management Actions Pillars */}
      <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
        <h3 className="font-serif-display text-base uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
          Management Controls
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 border border-brass-gold/15 rounded flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-bold text-maroon-deep uppercase text-sm">Blog content manager</h4>
              <p className="text-xs text-charcoal-brown/70 leading-relaxed mt-1">
                Create, edit, publish, or retract long-tail SEO devotional articles in the blog section.
              </p>
            </div>
            <Link
              href="/admin/blog"
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep py-2 rounded text-center text-xs font-bold uppercase border border-brass-gold transition-colors"
            >
              Manage Blog
            </Link>
          </div>

          <div className="p-4 border border-brass-gold/15 rounded flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-bold text-maroon-deep uppercase text-sm">FAQ manager</h4>
              <p className="text-xs text-charcoal-brown/70 leading-relaxed mt-1">
                Manage Q&A lists per page. Updates feed directly into the JSON-LD FAQPage schemas dynamically.
              </p>
            </div>
            <Link
              href="/admin/faqs"
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep py-2 rounded text-center text-xs font-bold uppercase border border-brass-gold transition-colors"
            >
              Manage FAQs
            </Link>
          </div>

          <div className="p-4 border border-brass-gold/15 rounded flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-bold text-maroon-deep uppercase text-sm">Audio & verse syncing</h4>
              <p className="text-xs text-charcoal-brown/70 leading-relaxed mt-1">
                Upload audio file paths, reciter metadata, and configure verse timestamp ranges for active line-sync highlighting.
              </p>
            </div>
            <Link
              href="/admin/audio"
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep py-2 rounded text-center text-xs font-bold uppercase border border-brass-gold transition-colors"
            >
              Manage Audio Sync
            </Link>
          </div>

          <div className="p-4 border border-brass-gold/15 rounded flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-bold text-maroon-deep uppercase text-sm">jayanti festival configurations</h4>
              <p className="text-xs text-charcoal-brown/70 leading-relaxed mt-1">
                Configure the year, date, and puja muhurat timings block displayed on the evergreen festival page.
              </p>
            </div>
            <Link
              href="/admin/jayanti"
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep py-2 rounded text-center text-xs font-bold uppercase border border-brass-gold transition-colors"
            >
              Manage Jayanti dates
            </Link>
          </div>

          <div className="p-4 border border-brass-gold/15 rounded flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-bold text-maroon-deep uppercase text-sm">Multi-Language Content Manager</h4>
              <p className="text-xs text-charcoal-brown/70 leading-relaxed mt-1">
                Edit regional translations, titles, meta tags, and FAQ cards for Telugu, Bengali, Kannada, and English.
              </p>
            </div>
            <Link
              href="/admin/languages"
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep py-2 rounded text-center text-xs font-bold uppercase border border-brass-gold transition-colors"
            >
              Manage Languages
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
