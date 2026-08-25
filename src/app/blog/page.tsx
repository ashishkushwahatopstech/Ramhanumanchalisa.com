import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import CarvedDivider from "@/components/CarvedDivider";
import { FALLBACK_BLOG_POSTS, BlogPost } from "@/data/blog";

export const metadata = {
  title: "Bhakti Blog — Hanuman Chalisa Insights & Devotional Articles",
  description: "Read scholarly articles on the Hanuman Chalisa, including history, scriptural context, pronunciation, and spiritual guides.",
};

export default async function BlogIndexPage() {
  let posts: BlogPost[] = [];

  try {
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbPosts.length > 0) {
      posts = dbPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        createdAt: p.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        author: "Admin",
        readTime: "5 min read",
      }));
    } else {
      posts = FALLBACK_BLOG_POSTS;
    }
  } catch (error) {
    console.error("Failed to query DB posts, falling back to static posts:", error);
    posts = FALLBACK_BLOG_POSTS;
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Spiritual Wisdom (ज्ञान गंगा)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Hanuman Bhakti Blog
        </h2>
        <p className="text-xs text-charcoal-brown/70 leading-relaxed">
          Deepen your understanding of Hanuman worship. Learn the history of Tulsidas, astronomical secrets in the quatrains, and recitation guidelines.
        </p>
      </div>

      <CarvedDivider icon="📖" />

      {/* AdSense Top Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
        Ad Slot — Blog Top (Layout Stable)
      </div>

      {/* Articles List */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-6 bg-stone-ivory border border-brass-gold/25 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 space-y-3"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-brass-gold font-bold">
              <span>{post.createdAt}</span>
              <span className="text-charcoal-brown/30">•</span>
              <span>By {post.author}</span>
              <span className="text-charcoal-brown/30">•</span>
              <span>{post.readTime}</span>
            </div>

            <h3 className="font-serif-display text-xl font-bold text-maroon-deep hover:text-marigold transition-colors uppercase leading-snug">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-brown/80 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="pt-2">
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs uppercase font-bold text-vermilion hover:text-marigold transition-colors"
              >
                Read Article &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* AdSense Footer Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Blog Bottom (Layout Stable)
      </div>

    </div>
  );
}
