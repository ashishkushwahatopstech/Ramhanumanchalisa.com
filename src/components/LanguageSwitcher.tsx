"use client";

import React from "react";
export default function LanguageSwitcher() {
  const setLangCookie = (lang: string) => {
    document.cookie = `user-selected-lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-brass-gold font-bold bg-stone-ivory/5 border border-brass-gold/20 rounded px-2.5 py-1">
      <a href="/" onClick={() => setLangCookie("hi")} className="hover:text-marigold transition-colors">
        हिं
      </a>
      <span className="text-brass-gold/30">|</span>
      <a href="/hanuman-chalisa/en" onClick={() => setLangCookie("en")} className="hover:text-marigold transition-colors">
        EN
      </a>
      <span className="text-brass-gold/30">|</span>
      <a href="/hanuman-chalisa/te" onClick={() => setLangCookie("te")} className="hover:text-marigold transition-colors">
        తె
      </a>
      <span className="text-brass-gold/30">|</span>
      <a href="/hanuman-chalisa/bn" onClick={() => setLangCookie("bn")} className="hover:text-marigold transition-colors">
        বাং
      </a>
      <span className="text-brass-gold/30">|</span>
      <a href="/hanuman-chalisa/kn" onClick={() => setLangCookie("kn")} className="hover:text-marigold transition-colors">
        ಕನ್ನಡ
      </a>
    </div>
  );
}
