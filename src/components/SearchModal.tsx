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

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);

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
      {/* Header Search Trigger Buttons */}
      <div className="flex items-center">
        {/* Desktop trigger */}
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="Search site"
          className="hidden sm:flex items-center gap-2 bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-3 py-1.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300 cursor-pointer group"
        >
          <span className="text-sm group-hover:scale-110 transition-transform">🔍</span>
          <span>Search</span>
          <kbd className="hidden md:inline-flex items-center bg-black/25 border border-brass-gold/30 rounded px-1.5 py-0.5 text-[10px] text-yellow-200 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Mobile icon trigger */}
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="Search site"
          className="sm:hidden p-2 rounded text-marigold hover:bg-stone-ivory/10 border border-brass-gold/40 transition-colors cursor-pointer flex items-center justify-center"
        >
          <span className="text-base">🔍</span>
        </button>
      </div>

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
