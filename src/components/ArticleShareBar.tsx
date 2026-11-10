"use client";

import React, { useState, useEffect } from "react";

interface ArticleShareBarProps {
  title: string;
  slug: string;
}

export default function ArticleShareBar({ title, slug }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getArticleUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://ramhanumanchalisa.com/blog/${slug}`;
  };

  const handleWhatsAppShare = () => {
    const url = getArticleUrl();
    const text = `🙏 Read "${title}" on RamHanumanChalisa.com:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = async () => {
    const url = getArticleUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    const url = getArticleUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch {
        // user cancelled or fallback
      }
    }
    handleCopyLink();
  };

  return (
    <>
      {/* Reading Progress Bar at Top of Viewport */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#C95716] via-[#E87524] to-[#C9A45C] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Share Actions Bar */}
      <div className="p-3 bg-white border border-[#C9A45C]/35 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">🚩</span>
          <span className="font-serif-display text-xs font-bold uppercase tracking-wider text-[#4A1216]">
            Share Devotional Guide
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-transform hover:scale-105 shadow-2xs"
            title="Share via WhatsApp"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </button>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF3E8] hover:bg-[#FFF9F0] border border-[#C9A45C]/40 text-[#4A1216] text-xs font-semibold transition-colors shadow-2xs"
            title="Copy link"
          >
            <span>🔗</span>
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>

          {/* Native Share */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#FAF3E8] border border-[#C9A45C]/40 text-[#4A1216] text-xs font-semibold transition-colors"
            title="Share with device"
          >
            <span>↗</span>
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </>
  );
}
