"use client";

import React, { useState, useEffect } from "react";

export default function DesktopSideDock() {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [diyaBlessed, setDiyaBlessed] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("Ram Hanuman Chalisa");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
      setPageTitle(document.title || "Ram Hanuman Chalisa");
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
    }
  };

  const handleWhatsAppShare = () => {
    const text = `🙏 Read and recite: "${pageTitle}" on RamHanumanChalisa.com\n${pageUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const handleTwitterShare = () => {
    const text = `🙏 Recite and discover the divine meaning of ${pageTitle}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDiyaClick = async () => {
    setDiyaBlessed(true);
    try {
      // Optional ambient increment to recitation counter
      const today = new Date().toISOString().slice(0, 10);
      fetch(`/api/recitations?date=${today}`, { method: "POST" }).catch(() => {});
    } catch {
      // ignore
    }
    setTimeout(() => setDiyaBlessed(false), 3000);
  };

  return (
    <aside
      aria-label="Desktop quick actions"
      className="no-print hidden xl:flex fixed left-3 2xl:left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 p-2 bg-maroon-deep/95 backdrop-blur-md border-2 border-brass-gold/60 shadow-[0_8px_30px_rgba(80,16,20,0.4)] rounded-full transition-all duration-300"
    >
      {/* 1. Google Source Preference Button */}
      <div className="relative group flex items-center">
        <a
          href="https://www.google.com/preferences/source?q=ramhanumanchalisa.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Add RamHanumanChalisa.com as Google Preferred Source"
          aria-label="Add site to Google Preferred Sources"
          className="w-10 h-10 rounded-full bg-white hover:bg-stone-50 border border-brass-gold/50 flex items-center justify-center shadow transition-all duration-200 hover:scale-110 active:scale-95 group-hover:border-marigold"
        >
          {/* Authentic Google 4-Color G Logo */}
          <svg className="w-5 h-5 filter drop-shadow-xs" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </a>

        {/* Tooltip */}
        <div className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 bg-charcoal-brown text-stone-ivory text-xs font-semibold rounded-md shadow-xl whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-brass-gold/30 flex items-center gap-1.5 z-50">
          <span>⭐ Follow on Google</span>
          <span className="text-[10px] text-marigold font-mono">(Preferred Source)</span>
        </div>
      </div>

      <div className="w-5 border-t border-brass-gold/30 my-0.5" />

      {/* 2. Copy Link Button */}
      <div className="relative group flex items-center">
        <button
          type="button"
          onClick={handleCopyLink}
          title="Copy link to this page"
          aria-label="Copy page URL to clipboard"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer border ${
            copied
              ? "bg-emerald-600 text-white border-emerald-400"
              : "bg-black/30 hover:bg-black/50 text-stone-ivory border-brass-gold/40 hover:border-marigold hover:text-marigold"
          }`}
        >
          {copied ? (
            <svg className="w-5 h-5 animate-scaleCheck" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>

        {/* Tooltip */}
        <div className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 bg-charcoal-brown text-stone-ivory text-xs font-semibold rounded-md shadow-xl whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-brass-gold/30 z-50">
          {copied ? "✓ Copied to Clipboard!" : "📋 Copy Page Link"}
        </div>
      </div>

      {/* 3. Direct WhatsApp Share */}
      <div className="relative group flex items-center">
        <button
          type="button"
          onClick={handleWhatsAppShare}
          title="Share on WhatsApp"
          aria-label="Share directly on WhatsApp"
          className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white border border-brass-gold/40 flex items-center justify-center shadow transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </button>

        {/* Tooltip */}
        <div className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 bg-charcoal-brown text-stone-ivory text-xs font-semibold rounded-md shadow-xl whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-brass-gold/30 z-50">
          💬 Share on WhatsApp
        </div>
      </div>

      {/* 4. More Social Platforms Flyout */}
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={() => setShowShareMenu(!showShareMenu)}
          title="Share on other platforms"
          aria-label="More share options"
          className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-stone-ivory border border-brass-gold/40 hover:border-marigold hover:text-marigold flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>

        {/* Share Popover Flyout */}
        {showShareMenu && (
          <div className="absolute left-full ml-3 p-2 bg-charcoal-brown text-stone-ivory rounded-xl border border-brass-gold/60 shadow-2xl space-y-1.5 w-44 z-50 animate-fadeIn">
            <span className="text-[10px] uppercase font-bold tracking-wider text-marigold px-2 block border-b border-brass-gold/20 pb-1 mb-1">
              Share Devotion
            </span>
            <button
              type="button"
              onClick={handleTwitterShare}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-black/30 hover:text-marigold transition-colors cursor-pointer text-left"
            >
              <span>𝕏</span> <span>Share on X</span>
            </button>
            <button
              type="button"
              onClick={handleFacebookShare}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-black/30 hover:text-marigold transition-colors cursor-pointer text-left"
            >
              <span className="text-blue-400 font-bold">f</span> <span>Share on Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => {
                window.open(`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`, "_blank");
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-black/30 hover:text-marigold transition-colors cursor-pointer text-left"
            >
              <span className="text-sky-400">✈️</span> <span>Share on Telegram</span>
            </button>
          </div>
        )}
      </div>

      <div className="w-5 border-t border-brass-gold/30 my-0.5" />

      {/* 5. Print / Save as PDF */}
      <div className="relative group flex items-center">
        <button
          type="button"
          onClick={handlePrint}
          title="Print page or save as PDF"
          aria-label="Print or save as PDF"
          className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-stone-ivory border border-brass-gold/40 hover:border-marigold hover:text-marigold flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <span className="text-lg">🖨️</span>
        </button>

        {/* Tooltip */}
        <div className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 bg-charcoal-brown text-stone-ivory text-xs font-semibold rounded-md shadow-xl whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-brass-gold/30 z-50">
          🖨️ Print / Save PDF
        </div>
      </div>

      {/* 6. Light a Diya / Devotional Offering */}
      <div className="relative group flex items-center">
        <button
          type="button"
          onClick={handleDiyaClick}
          title="Light a Diya for blessings"
          aria-label="Light a Diya"
          className={`w-10 h-10 rounded-full border flex items-center justify-center shadow transition-all duration-300 cursor-pointer ${
            diyaBlessed
              ? "bg-marigold text-maroon-deep border-marigold scale-125 shadow-[0_0_15px_#F59E0B]"
              : "bg-black/30 hover:bg-black/50 text-stone-ivory border-brass-gold/40 hover:border-marigold hover:scale-110"
          }`}
        >
          <span className="text-lg filter drop-shadow">🪔</span>
        </button>

        {/* Tooltip / Blessed Badge */}
        <div className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 bg-charcoal-brown text-stone-ivory text-xs font-semibold rounded-md shadow-xl whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-brass-gold/30 z-50">
          {diyaBlessed ? "✨ Jai Shree Ram! Diya Lit 🙏" : "🪔 Light a Diya"}
        </div>
      </div>
    </aside>
  );
}
