"use client";

import { useEffect, useState } from "react";

const languageNames: Record<string, string> = {
  te: "తెలుగు (Telugu)",
  bn: "বাংলা (Bengali)",
  kn: "ಕನ್ನಡ (Kannada)",
  gu: "ગુજરાતી (Gujarati)",
  mr: "मराठी (Marathi)",
  en: "English",
};

export default function LanguageBanner() {
  const [suggestedLang, setSuggestedLang] = useState<string | null>(null);

  useEffect(() => {
    // Check if dismissed
    const dismissed = localStorage.getItem("dismissed-lang-banner");
    if (dismissed === "true") return;

    // Check if arrived from search engine referrers
    const referrer = document.referrer || "";
    if (
      referrer.includes("google.") ||
      referrer.includes("bing.") ||
      referrer.includes("yahoo.") ||
      referrer.includes("duckduckgo.")
    ) {
      return;
    }

    // Detect browser language
    const browserLang = navigator.language || "";
    const primaryCode = browserLang.split("-")[0].toLowerCase();

    // Check for query param parameter for testing (e.g. ?lang=te)
    const urlParams = new URLSearchParams(window.location.search);
    const testLang = urlParams.get("lang");

    const activeCode = testLang || primaryCode;

    if (["te", "bn", "kn", "gu", "mr", "en"].includes(activeCode)) {
      setSuggestedLang(activeCode);
    }
  }, []);

  if (!suggestedLang) return null;

  const handleDismiss = () => {
    localStorage.setItem("dismissed-lang-banner", "true");
    setSuggestedLang(null);
  };

  return (
    <div className="no-print fixed bottom-20 md:bottom-6 right-4 max-w-md bg-stone-ivory border-2 border-brass-gold text-maroon-deep py-3 px-4 text-xs sm:text-sm font-semibold flex items-center justify-between rounded-xl shadow-2xl z-50 transition-all duration-300">
      <div className="flex-grow pr-3 leading-snug">
        📯 Looks like you might prefer the {languageNames[suggestedLang]} version of Shree Hanuman Chalisa.{" "}
        <a
          href={`/hanuman-chalisa/${suggestedLang}`}
          onClick={() => {
            document.cookie = `user-selected-lang=${suggestedLang}; path=/; max-age=31536000; SameSite=Lax`;
          }}
          className="underline hover:text-vermilion font-bold transition-colors ml-1 inline-block"
        >
          Switch now &rarr;
        </a>
      </div>
      <button
        onClick={handleDismiss}
        className="text-maroon-deep/70 hover:text-maroon-deep font-bold text-lg leading-none p-1 transition-colors hover:scale-110 shrink-0"
        aria-label="Dismiss banner"
      >
        &times;
      </button>
    </div>
  );
}
