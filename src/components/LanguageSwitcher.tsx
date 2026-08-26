"use client";

import React, { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState("hi");

  useEffect(() => {
    // Detect current language from URL path
    const path = window.location.pathname;
    if (path.includes("/hanuman-chalisa/en")) setSelectedLang("en");
    else if (path.includes("/hanuman-chalisa/te")) setSelectedLang("te");
    else if (path.includes("/hanuman-chalisa/bn")) setSelectedLang("bn");
    else if (path.includes("/hanuman-chalisa/kn")) setSelectedLang("kn");
    else if (path.includes("/hanuman-chalisa/gu")) setSelectedLang("gu");
    else if (path.includes("/hanuman-chalisa/mr")) setSelectedLang("mr");
    else setSelectedLang("hi");
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    // Set cookie for browser redirection logic
    document.cookie = `user-selected-lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Redirect to the correct page
    if (lang === "hi") {
      window.location.href = "/";
    } else {
      window.location.href = `/hanuman-chalisa/${lang}`;
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedLang}
        onChange={handleLanguageChange}
        className="appearance-none bg-maroon-deep text-stone-ivory text-xs font-bold border border-brass-gold/40 hover:border-marigold rounded pl-7 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-marigold cursor-pointer select-none"
        aria-label="Select Language"
      >
        <option value="hi" className="bg-maroon-deep text-stone-ivory font-bold">हिन्दी</option>
        <option value="en" className="bg-maroon-deep text-stone-ivory font-bold">English</option>
        <option value="te" className="bg-maroon-deep text-stone-ivory font-bold">తెలుగు</option>
        <option value="bn" className="bg-maroon-deep text-stone-ivory font-bold">বাংলা</option>
        <option value="kn" className="bg-maroon-deep text-stone-ivory font-bold">ಕನ್ನಡ</option>
        <option value="gu" className="bg-maroon-deep text-stone-ivory font-bold">ગુજરાતી</option>
        <option value="mr" className="bg-maroon-deep text-stone-ivory font-bold">मराठी</option>
      </select>
      
      {/* 🌐 Globe Icon positioned absolutely */}
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-brass-gold select-none pointer-events-none">
        🌐
      </span>
      {/* ▾ Arrow positioned absolutely */}
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-brass-gold select-none pointer-events-none">
        ▼
      </span>
    </div>
  );
}
