"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

interface SearchItem {
  title: string;
  url: string;
  category: string;
  description: string;
  keywords?: string;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollDeltaRef = useRef(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);

  // Professional Damped Scroll Handling (like Material Extended FAB / Apple iOS)
  useEffect(() => {
    lastScrollYRef.current = window.scrollY || 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Always show expanded pill near top of page
      if (currentScrollY < 120) {
        setIsCollapsed(false);
        scrollDeltaRef.current = 0;
        return;
      }

      // Directional accumulation with threshold to prevent twitchy jitter
      if (delta > 0) {
        // Scrolling DOWN
        scrollDeltaRef.current = Math.max(0, scrollDeltaRef.current + delta);
        if (scrollDeltaRef.current > 45) {
          setIsCollapsed(true);
        }
      } else if (delta < -15) {
        // Scrolling UP (user wants to search/navigate)
        scrollDeltaRef.current = 0;
        setIsCollapsed(false);
      }

      // Calm, slow idle expansion when user stops scrolling for 1.2s
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = setTimeout(() => {
        setIsCollapsed(false);
      }, 1200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  // Listen for Ctrl+K or Cmd+K or / keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Load search index on open
  useEffect(() => {
    if (isOpen && items.length === 0) {
      setIsLoading(true);
      fetch("/api/search-index.json")
        .then((res) => res.json())
        .then((data: SearchItem[]) => {
          setItems(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load search index:", err);
          setIsLoading(false);
        });
    }

    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filtered search results
  const filteredItems = useMemo(() => {
    if (!items.length) return [];
    const q = query.trim().toLowerCase();

    return items
      .filter((item) => {
        const matchesCat =
          selectedCategory === "All" ||
          (selectedCategory === "Scriptures" && item.category === "Scripture") ||
          (selectedCategory === "Aartis" && item.category === "Aarti") ||
          (selectedCategory === "Languages" && item.category === "Language") ||
          (selectedCategory === "Audio/PDF" && item.category === "Audio/PDF") ||
          (selectedCategory === "Guides" && (item.category === "Guide" || item.category === "Benefit"));

        if (!matchesCat) return false;
        if (!q) return true;

        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description.toLowerCase().includes(q);
        const kwMatch = item.keywords ? item.keywords.toLowerCase().includes(q) : false;
        const urlMatch = item.url.toLowerCase().includes(q);

        return titleMatch || descMatch || kwMatch || urlMatch;
      })
      .slice(0, 30);
  }, [items, query, selectedCategory]);

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      window.location.href = filteredItems[selectedIndex].url;
    }
  };

  const categories = ["All", "Scriptures", "Aartis", "Languages", "Audio/PDF", "Guides"];

  return (
    <>
      {/* Floating Pill Search Button (Stacked directly above ScrollToTop) */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label="Search scriptures and hymns"
        title="Search scriptures (Ctrl+K / ⌘K)"
        className={`no-print fixed z-40 right-4 sm:right-8 bottom-33 sm:bottom-22 bg-maroon-deep/95 hover:bg-maroon-deep text-stone-ivory border-2 border-brass-gold/80 hover:border-marigold shadow-xl hover:shadow-2xl rounded-full h-11 sm:h-12 flex items-center justify-center cursor-pointer backdrop-blur-sm group active:scale-95 focus:outline-none focus:ring-2 focus:ring-marigold overflow-hidden transition-[max-width,padding,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCollapsed
            ? "max-w-[44px] sm:max-w-[48px] px-2.5 sm:px-3 shadow-md"
            : "max-w-[170px] px-3.5 sm:px-4 shadow-[0_4px_20px_rgba(80,16,20,0.4)]"
        }`}
      >
        {/* Search Icon (Always visible and anchored) */}
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-marigold group-hover:scale-110 transition-transform duration-300 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Pill Label: smoothly slides & fades in/out with gentle cubic-bezier curve */}
        <div
          className={`flex items-center gap-1.5 overflow-hidden transition-[max-width,opacity,margin,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCollapsed
              ? "max-w-0 opacity-0 ml-0 translate-x-2 pointer-events-none"
              : "max-w-[110px] opacity-100 ml-2 translate-x-0"
          }`}
        >
          <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-stone-ivory group-hover:text-marigold whitespace-nowrap">
            Search
          </span>
          <kbd className="hidden lg:inline-flex items-center bg-black/30 border border-brass-gold/40 rounded px-1.5 py-0.5 text-[10px] text-marigold font-mono">
            ⌘K
          </kbd>
        </div>
      </button>

      {/* Search Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="w-full max-w-2xl bg-[#FBF8F2] border-2 border-brass-gold rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slideDown"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search Scriptures & Aartis"
          >
            {/* Header / Input Bar */}
            <div className="p-4 bg-maroon-deep border-b-2 border-brass-gold text-stone-ivory">
              <div className="flex items-center gap-3 bg-black/25 border border-brass-gold/50 rounded-xl px-3.5 py-2.5 shadow-inner">
                <span className="text-lg text-marigold select-none">🕉️</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search Chalisa, Aarti, Telugu, Audio, Meaning..."
                  className="w-full bg-transparent text-sm sm:text-base text-stone-ivory placeholder-stone-ivory/50 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="text-stone-ivory/60 hover:text-marigold p-1 text-sm transition-colors"
                    aria-label="Clear query"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs bg-stone-ivory/15 hover:bg-vermilion text-stone-ivory px-2 py-1 rounded border border-brass-gold/40 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedIndex(0);
                    }}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200 font-medium ${
                      selectedCategory === cat
                        ? "bg-marigold text-maroon-deep font-bold shadow-sm"
                        : "bg-black/20 text-stone-ivory/70 hover:text-stone-ivory hover:bg-black/40 border border-brass-gold/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-brass-gold/15">
              {isLoading ? (
                <div className="py-12 text-center text-charcoal-brown/60 space-y-2">
                  <span className="text-3xl animate-spin inline-block">🕉️</span>
                  <p className="text-xs font-serif">Loading sacred library...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="py-12 text-center text-charcoal-brown/60 space-y-2">
                  <span className="text-3xl">🪔</span>
                  <p className="text-sm font-bold text-maroon-deep">No matching scriptures found</p>
                  <p className="text-xs max-w-sm mx-auto text-charcoal-brown/70">
                    Try searching for &ldquo;Hanuman Chalisa&rdquo;, &ldquo;Aarti&rdquo;, &ldquo;Telugu&rdquo;, &ldquo;PDF&rdquo;, or &ldquo;Meaning&rdquo;.
                  </p>
                </div>
              ) : (
                <ul ref={resultsRef} className="space-y-1.5">
                  {filteredItems.map((item, idx) => (
                    <li key={item.url + idx}>
                      <a
                        href={item.url}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group block p-3 rounded-xl transition-all duration-150 border ${
                          selectedIndex === idx
                            ? "bg-marigold/15 border-brass-gold/60 shadow-sm translate-x-1"
                            : "bg-stone-ivory/60 hover:bg-marigold/10 border-brass-gold/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                  item.category === "Scripture"
                                    ? "bg-vermilion/10 text-vermilion border-vermilion/30"
                                    : item.category === "Aarti"
                                    ? "bg-marigold/30 text-maroon-deep border-marigold"
                                    : item.category === "Language"
                                    ? "bg-blue-50 text-blue-800 border-blue-200"
                                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                                }`}
                              >
                                {item.category}
                              </span>
                              <h4 className="font-serif-display font-bold text-sm sm:text-base text-maroon-deep group-hover:text-vermilion truncate">
                                {item.title}
                              </h4>
                            </div>
                            <p className="text-xs text-charcoal-brown/75 line-clamp-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <span className="text-brass-gold group-hover:text-vermilion text-sm shrink-0 pt-1 transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="p-2.5 px-4 bg-[#F2ECE1] border-t border-brass-gold/30 text-[11px] text-charcoal-brown/60 flex items-center justify-between select-none">
              <span className="flex items-center gap-1.5">
                <span className="text-xs">🙏</span>
                <span>{filteredItems.length} sacred pages indexed</span>
              </span>
              <div className="hidden sm:flex items-center gap-3">
                <span>Navigate: <kbd className="px-1 bg-stone-ivory border rounded">↑</kbd> <kbd className="px-1 bg-stone-ivory border rounded">↓</kbd></span>
                <span>Select: <kbd className="px-1.5 bg-stone-ivory border rounded">Enter</kbd></span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
