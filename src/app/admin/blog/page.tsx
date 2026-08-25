import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CarvedDivider from "@/components/CarvedDivider";
import BlogEditorForm from "@/components/BlogEditorForm";
import prisma from "@/lib/prisma";

export default async function AdminBlogPage() {
  // Server-side security check
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  if (!session || session.user?.email !== "ashishkushwaha88643@gmail.com") {
    redirect("/unauthorized");
  }

  // Pre-load current posts
  let initialPosts: any[] = [];
  try {
    initialPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Serialize Dates
    initialPosts = initialPosts.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString()
    }));
  } catch (error) {
    console.error("Error fetching admin blog list:", error);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-maroon-deep border-2 border-brass-gold p-4 sm:p-6 rounded-lg text-stone-ivory">
        <div className="space-y-1">
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-marigold uppercase">
            Blog Articles Manager
          </h2>
          <p className="text-xs text-stone-ivory/70">
            Publish SEO articles to improve search indexing and provide E-E-A-T background value.
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

      {/* Editor Form Component (Client Side) */}
      <BlogEditorForm initialPosts={initialPosts} />

    </div>
  );
}

// Inline small Link wrapper for Server Component imports
import Link from "next/link";
