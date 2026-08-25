import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CarvedDivider from "@/components/CarvedDivider";
import { FALLBACK_BLOG_POSTS, BlogPost } from "@/data/blog";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPost | undefined;

  try {
    const dbPost = await prisma.post.findUnique({ where: { slug } });
    if (dbPost) {
      post = {
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        createdAt: dbPost.createdAt.toDateString(),
        author: "Admin",
        readTime: "5 min read",
      };
    }
  } catch (e) {
    // ignore
  }

  if (!post) {
    post = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);
  }

  if (!post) return {};

  return {
    title: `${post.title} — Hanuman Bhakti Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  try {
    const dbPosts = await prisma.post.findMany({ select: { slug: true } });
    const paths = dbPosts.map((p) => ({ slug: p.slug }));
    
    // Add static paths
    FALLBACK_BLOG_POSTS.forEach((p) => {
      if (!paths.some((path) => path.slug === p.slug)) {
        paths.push({ slug: p.slug });
      }
    });
    return paths;
  } catch (e) {
    return FALLBACK_BLOG_POSTS.map((p) => ({ slug: p.slug }));
  }
}

// Simple parser for standard markdown elements without third party packages
function renderMarkdown(content: string) {
  const sections = content.split("\n\n").map((section) => section.trim()).filter(Boolean);

  return sections.map((sec, index) => {
    if (sec.startsWith("### ")) {
      return (
        <h4 key={index} className="font-serif-display text-lg font-bold text-maroon-deep mt-6 mb-2">
          {sec.replace("### ", "")}
        </h4>
      );
    }
    if (sec.startsWith("## ")) {
      return (
        <h3 key={index} className="font-serif-display text-xl font-bold text-maroon-deep mt-8 mb-3">
          {sec.replace("## ", "")}
        </h3>
      );
    }
    if (sec.startsWith("*") && sec.endsWith("*")) {
      return (
        <p key={index} className="text-xs sm:text-sm text-charcoal-brown/70 italic my-3 text-center">
          {sec.replace(/\*/g, "")}
        </p>
      );
    }
    if (sec.startsWith("- ")) {
      // List
      const items = sec.split("\n").map(item => item.replace("- ", "").trim());
      return (
        <ul key={index} className="list-disc list-inside space-y-2 text-xs sm:text-sm text-charcoal-brown/85 my-4 pl-4">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="text-xs sm:text-sm text-charcoal-brown/95 leading-relaxed my-3">
        {sec}
      </p>
    );
  });
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPost | undefined;

  try {
    const dbPost = await prisma.post.findUnique({ where: { slug } });
    if (dbPost && dbPost.published) {
      post = {
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        createdAt: dbPost.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        author: "Admin",
        readTime: "5 min read",
      };
    }
  } catch (error) {
    console.error("Error reading blog post from DB:", error);
  }

  if (!post) {
    post = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Breadcrumbs */}
      <nav className="text-xs text-charcoal-brown/50 font-semibold" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex gap-2">
          <li className="flex items-center">
            <Link href="/" className="hover:text-maroon-deep">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/blog" className="hover:text-maroon-deep">Blog</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-maroon-deep truncate max-w-[200px]" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Post Header */}
      <div className="space-y-4 text-center sm:text-left">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-maroon-deep uppercase leading-tight">
          {post.title}
        </h2>
        
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs text-brass-gold font-bold">
          <span>{post.createdAt}</span>
          <span>•</span>
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Ad Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-6">
        Ad Slot — Article Top (Layout Stable)
      </div>

      {/* Main Post Content */}
      <article className="bg-stone-ivory border border-brass-gold/30 p-6 sm:p-8 rounded-lg shadow-sm">
        {renderMarkdown(post.content)}
      </article>

      <div className="text-center pt-4">
        <Link
          href="/blog"
          className="text-xs uppercase font-bold text-maroon-deep hover:text-marigold transition-colors border-b-2 border-maroon-deep/30 hover:border-marigold"
        >
          &larr; Back to all articles
        </Link>
      </div>

      {/* Ad Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Article Bottom (Layout Stable)
      </div>

    </div>
  );
}
