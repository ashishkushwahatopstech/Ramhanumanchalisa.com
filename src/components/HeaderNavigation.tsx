"use client";

import React, { useState, useEffect, useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavDropdownItem {
  title: string;
  hindiTitle?: string;
  href: string;
  desc?: string;
  icon?: string;
  badge?: string;
}

interface NavSection {
  label: string;
  hindiLabel?: string;
  items: NavDropdownItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Scriptures & Stotras",
    hindiLabel: "चालीसा व स्तोत्र",
    items: [
      {
        title: "Shri Hanuman Chalisa",
        hindiTitle: "श्री हनुमान चालीसा",
        href: "/",
        desc: "Complete 40 chaupais composed by Goswami Tulsidas",
        icon: "🕉️",
        badge: "मूल पाठ",
      },
      {
        title: "Shri Ram Chalisa",
        hindiTitle: "श्री राम चालीसा",
        href: "/ram-chalisa",
        desc: "40 verses revering Bhagwan Shri Ram Chandra",
        icon: "🏹",
      },
      {
        title: "Shri Bajrang Baan",
        hindiTitle: "श्री बजरंग बाण",
        href: "/bajrang-baan",
        desc: "Invincible protection shield invoking sacred oaths",
        icon: "⚡",
      },
      {
        title: "Sankat Mochan Hanumanashtak",
        hindiTitle: "संकटमोचन हनुमानाष्टक",
        href: "/sankat-mochan-hanumanashtak",
        desc: "8 couplets celebrating Mahavira's miraculous feats",
        icon: "🛡️",
      },
      {
        title: "Shri Hanuman Aarti",
        hindiTitle: "हनुमान जी की आरती",
        href: "/hanuman-aarti",
        desc: "Traditional twilight temple prayer 'Aarti Kije'",
        icon: "🪔",
      },
      {
        title: "Shri Hanuman Stuti",
        hindiTitle: "हनुमान स्तुति",
        href: "/hanuman-stuti",
        desc: "Classical Awadhi-Sanskrit verses revering strength",
        icon: "🌺",
      },
      {
        title: "Chanting Path Vidhi",
        hindiTitle: "शास्त्रोक्त पाठ विधि",
        href: "/shri-hanuman-chalisa-path-vidhi",
        desc: "Timings, asana, diya rules, and sankalpa guidelines",
        icon: "📜",
        badge: "नियम",
      },
    ],
  },
  {
    label: "Study & Audio",
    hindiLabel: "साधना एवं अर्थ",
    items: [
      {
        title: "Verse-by-Verse Meaning",
        hindiTitle: "सम्पूर्ण अर्थ एवं भावार्थ",
        href: "/hanuman-chalisa-meaning",
        desc: "Detailed Awadhi vocabulary and Hindi-English commentary",
        icon: "📖",
        badge: "विस्तृत",
      },
      {
        title: "Synced Audio MP3 Studio",
        hindiTitle: "सस्वर ऑडियो पाठ",
        href: "/hanuman-chalisa-audio-mp3",
        desc: "Listen with real-time synchronized karaoke verse highlighting",
        icon: "🎵",
        badge: "ऑडियो",
      },
      {
        title: "Printable Altar PDF",
        hindiTitle: "मुद्रण योग्य PDF",
        href: "/hanuman-chalisa-pdf",
        desc: "High-resolution clean sheets in Hindi, English & Telugu",
        icon: "📥",
      },
      {
        title: "Hanuman Jayanti Guide",
        hindiTitle: "हनुमान जयंती विशेष",
        href: "/hanuman-jayanti",
        desc: "Auspicious tithis, puja rituals, and vrata rules",
        icon: "🚩",
      },
      {
        title: "Ram-Hanuman Connection",
        hindiTitle: "राम-हनुमान तत्त्व संबंध",
        href: "/ram-hanuman-chalisa",
        desc: "The sacred bond linking Rama's holy name with grace",
        icon: "✨",
      },
    ],
  },
  {
    label: "Chaupai Benefits",
    hindiLabel: "चालीसा फलश्रुति",
    items: [
      {
        title: "40 Chaupai Benefits Hub",
        hindiTitle: "चालीसा फलश्रुति संग्रह",
        href: "/hanuman-chalisa-benefits",
        desc: "How each specific verse resolves life hurdles",
        icon: "⭐",
        badge: "फलश्रुति",
      },
      {
        title: "Career & Promotion",
        hindiTitle: "कार्यक्षेत्र एवं पदोन्नति",
        href: "/hanuman-chalisa-benefits/career",
        desc: "Chaupai 7 for skill, wisdom, and professional success",
        icon: "💼",
      },
      {
        title: "Health & Disease Healing",
        hindiTitle: "रोग एवं कष्ट निवारण",
        href: "/hanuman-chalisa-benefits/health",
        desc: "Chaupai 25: 'Nasai rog harai sab peera'",
        icon: "🌱",
      },
      {
        title: "Students & Exam Focus",
        hindiTitle: "विद्यार्थी एवं परीक्षा सफलता",
        href: "/hanuman-chalisa-benefits/exams",
        desc: "Chaupai 1 for intellectual illumination & sharp memory",
        icon: "🎓",
      },
      {
        title: "Protection & Removing Fear",
        hindiTitle: "भय एवं नकारात्मकता निवारण",
        href: "/hanuman-chalisa-benefits/protection",
        desc: "Chaupai 24: 'Bhoot pisach nikat nahi aave'",
        icon: "🛡️",
      },
      {
        title: "Marriage Delays & Peace",
        hindiTitle: "विवाह बाधा एवं पारिवारिक शांति",
        href: "/hanuman-chalisa-benefits/marriage-delays",
        desc: "Chaupai 11 for resolving discord & relationship delay",
        icon: "🤝",
      },
    ],
  },
  {
    label: "Languages",
    hindiLabel: "भाषाएं",
    items: [
      {
        title: "हिन्दी (Hindi - मूल)",
        href: "/",
        desc: "Original Awadhi text in authentic Devanagari script",
        icon: "🕉️",
      },
      {
        title: "English Edition",
        href: "/hanuman-chalisa/en",
        desc: "Romanized phonetic pronunciation with English meaning",
        icon: "🔤",
      },
      {
        title: "తెలుగు (Telugu)",
        href: "/hanuman-chalisa/te",
        desc: "శ్రీ హనుమాన్ చాలీసా తెలుగు లిపిలో",
        icon: "🚩",
      },
      {
        title: "বাংলা (Bengali)",
        href: "/hanuman-chalisa/bn",
        desc: "শ্রী হনুমান চালীসা বাংলা লিপিতে",
        icon: "🪔",
      },
      {
        title: "ಕನ್ನಡ (Kannada)",
        href: "/hanuman-chalisa/kn",
        desc: "ಶ್ರೀ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ",
        icon: "✨",
      },
      {
        title: "ગુજરાતી (Gujarati)",
        href: "/hanuman-chalisa/gu",
        desc: "શ્રી હનુમાન ચાલીસા ગુજરાતી લિપિમાં",
        icon: "📜",
      },
      {
        title: "मराठी (Marathi)",
        href: "/hanuman-chalisa/mr",
        desc: "श्री हनुमान चालीसा मराठी आवृत्ती",
        icon: "🌺",
      },
    ],
  },
  {
    label: "Editorial & Blog",
    hindiLabel: "ज्ञान गंगा",
    items: [
      {
        title: "Devotional Gazette & Articles",
        hindiTitle: "समस्त आलेख एवं शोध",
        href: "/blog",
        desc: "Theological treatises, history, and sacred hymns",
        icon: "📰",
      },
      {
        title: "Recitation FAQs",
        hindiTitle: "नित्य प्रश्नोत्तरी",
        href: "/faq",
        desc: "Authentic answers regarding vidhi, timings, and dietary vows",
        icon: "❓",
      },
    ],
  },
];

interface HeaderNavigationProps {
  siteNotice?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeaderNavigation({
  siteNotice = "✨ सीताराम सीताराम सीताराम सीताराम • Sita Ram Sita Ram Sita Ram Sita Ram • सीताराम सीताराम सीताराम सीताराम •",
  ctaText = "How to Recite",
  ctaHref = "/shri-hanuman-chalisa-path-vidhi",
}: HeaderNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<number | null>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle ESC key to close menus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleOpenSearch = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-search-modal"));
    }
  };

  return (
    <header className="no-print w-full sticky top-0 z-50 shadow-md">
      {/* Top Main Navigation Bar */}
      <div className="w-full bg-[#4A1216] border-b-2 border-[#C9A45C] text-[#FFF9F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            
            {/* Logo / Sacred Branding */}
            <a href="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
              <span className="text-2xl sm:text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-300">
                🔔
              </span>
              <div>
                <span className="font-serif-display text-lg sm:text-xl font-bold tracking-wider text-[#E8A33D] uppercase leading-none block">
                  Ram Hanuman Chalisa
                </span>
                <p className="font-hindi-display text-xs text-[#C9A45C] tracking-widest leading-none mt-1">
                  श्री राम जय राम जय जय राम
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links with Dropdowns */}
            <nav
              ref={dropdownRef}
              className="hidden lg:flex items-center space-x-1 font-semibold tracking-wide text-sm"
              aria-label="Main Navigation"
            >
              {NAV_SECTIONS.map((section, idx) => {
                const isOpen = openDropdown === idx;
                return (
                  <div key={section.label} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : idx)}
                      onMouseEnter={() => setOpenDropdown(idx)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs xl:text-sm font-medium ${
                        isOpen
                          ? "bg-[#6B1E23] text-[#E8A33D]"
                          : "text-[#FFF9F0]/90 hover:text-[#E8A33D] hover:bg-[#6B1E23]/60"
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span>{section.hindiLabel || section.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 text-[#C9A45C] ${
                          isOpen ? "rotate-180 text-[#E8A33D]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu Panel */}
                    {isOpen && (
                      <div
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 mt-1 w-80 sm:w-96 bg-[#FFFFFF] text-[#34251D] border-2 border-[#C9A45C] rounded-lg shadow-2xl py-2 z-50 animate-fadeIn"
                        role="menu"
                      >
                        <div className="px-4 py-2 bg-[#F6F0E8] border-b border-[#C9A45C]/30 flex items-center justify-between">
                          <span className="font-serif-display text-xs font-bold text-[#6B1E23] uppercase tracking-wider">
                            {section.label}
                          </span>
                          <span className="font-hindi-display text-xs text-[#C95716] font-semibold">
                            {section.hindiLabel}
                          </span>
                        </div>

                        <div className="max-h-[65vh] overflow-y-auto py-1">
                          {section.items.map((item) => (
                            <a
                              key={item.href + item.title}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className="group/item flex items-start gap-3 px-4 py-2.5 hover:bg-[#FFF9F0] transition-colors border-b border-[#F6F0E8] last:border-b-0"
                              role="menuitem"
                            >
                              <span className="text-lg shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                                {item.icon || "🕉️"}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#4A1216] group-hover/item:text-[#E87524] transition-colors">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] bg-[#E87524]/10 text-[#C95716] border border-[#C9A45C]/40 px-1.5 py-0.5 rounded font-bold">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.desc && (
                                  <p className="text-xs text-[#34251D]/75 line-clamp-1 mt-0.5 font-sans">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                              <span className="text-xs text-[#C9A45C] group-hover/item:text-[#E87524] group-hover/item:translate-x-0.5 transition-all self-center">
                                →
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Quick Actions (Right Header) */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* CTA Button: How to Recite */}
              <a
                href={ctaHref}
                className="hidden md:inline-flex items-center gap-1 bg-[#C95716] hover:bg-[#E87524] text-[#FFF9F0] px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-[#C9A45C] shadow-sm transition-colors whitespace-nowrap"
              >
                <span>📜</span>
                <span>{ctaText}</span>
              </a>

              {/* Mobile Drawer Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md bg-[#340B0F] hover:bg-[#6B1E23] text-[#E8A33D] border border-[#C9A45C]/40 focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Infinite Sita Ram Chanting Notice Marquee */}
      {siteNotice && (
        <div className="w-full bg-[#E8A33D] text-[#340B0F] font-bold py-1 border-b border-[#C9A45C]/40 text-xs tracking-wide select-none overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex motion-reduce:animate-none">
            <span className="font-serif-display shrink-0">&nbsp;{siteNotice}&nbsp;</span>
            <span className="font-serif-display shrink-0">&nbsp;{siteNotice}&nbsp;</span>
          </div>
        </div>
      )}

      {/* Slide-out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#34251D]/70 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#FFF9F0] text-[#34251D] shadow-2xl flex flex-col z-10 border-l-2 border-[#C9A45C] overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 bg-[#4A1216] text-[#FFF9F0] border-b-2 border-[#C9A45C] flex items-center justify-between">
              <a href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                <div>
                  <span className="font-serif-display text-sm font-bold text-[#E8A33D] tracking-wider uppercase block">
                    Ram Hanuman Chalisa
                  </span>
                  <span className="font-hindi-display text-[10px] text-[#C9A45C]">
                    श्री राम जय राम जय जय राम
                  </span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-[#FFF9F0] hover:text-[#E8A33D] hover:bg-[#6B1E23] transition-colors"
                aria-label="Close navigation menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Action Pills in Drawer */}
            <div className="p-3 bg-[#F6F0E8] border-b border-[#C9A45C]/30 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenSearch();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#FFFFFF] border border-[#C9A45C]/40 hover:border-[#E87524] py-2 px-3 rounded text-xs font-bold text-[#4A1216] shadow-xs"
              >
                <span>🔍</span>
                <span>Search Hymns</span>
              </button>
              <div className="shrink-0">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Scrollable Accordion Navigation of ALL Links */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {NAV_SECTIONS.map((section, sIdx) => {
                const isExpanded = mobileExpandedSection === sIdx;
                return (
                  <div key={section.label} className="border border-[#C9A45C]/35 rounded-lg overflow-hidden bg-[#FFFFFF]">
                    <button
                      type="button"
                      onClick={() => setMobileExpandedSection(isExpanded ? null : sIdx)}
                      className="w-full flex items-center justify-between px-3.5 py-3 bg-[#F6F0E8] hover:bg-[#FFF9F0] text-left transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif-display font-bold text-xs text-[#4A1216] uppercase tracking-wide">
                          {section.label}
                        </span>
                        <span className="text-xs text-[#C95716] font-semibold">
                          ({section.hindiLabel})
                        </span>
                      </div>
                      <svg
                        className={`w-4 h-4 text-[#C9A45C] transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#C95716]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="divide-y divide-[#F6F0E8] bg-[#FFFFFF]">
                        {section.items.map((item) => (
                          <a
                            key={item.href + item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between px-3.5 py-2.5 hover:bg-[#FFF9F0] transition-colors text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{item.icon || "🕉️"}</span>
                              <div>
                                <span className="font-semibold text-[#34251D] block">
                                  {item.title}
                                </span>
                                {item.desc && (
                                  <span className="text-[11px] text-[#34251D]/65 line-clamp-1">
                                    {item.desc}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-[#C95716]">→</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Informational & Compliance Links Block */}
              <div className="pt-2 border-t border-[#C9A45C]/30">
                <div className="text-[11px] font-bold text-[#C95716] uppercase tracking-widest px-1 mb-2">
                  Mandir Information
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-[#FFFFFF] border border-[#C9A45C]/30 rounded hover:border-[#E87524] text-[#34251D]"
                  >
                    About Us
                  </a>
                  <a
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-[#FFFFFF] border border-[#C9A45C]/30 rounded hover:border-[#E87524] text-[#34251D]"
                  >
                    Contact
                  </a>
                  <a
                    href="/privacy-policy"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-[#FFFFFF] border border-[#C9A45C]/30 rounded hover:border-[#E87524] text-[#34251D]"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/disclaimer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-[#FFFFFF] border border-[#C9A45C]/30 rounded hover:border-[#E87524] text-[#34251D]"
                  >
                    Disclaimer
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer with Verified Instagram & WhatsApp */}
            <div className="p-3 bg-[#F6F0E8] border-t border-[#C9A45C]/30 flex items-center justify-between text-xs">
              <a
                href="https://www.instagram.com/ramhanumanchalisadotcom/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#C95716] font-bold hover:underline"
              >
                <span>📷</span>
                <span>Follow on Instagram</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  const url = typeof window !== "undefined" ? window.location.href : "https://ramhanumanchalisa.com/";
                  const text = `🙏 Jai Shree Ram! Recite Shree Hanuman Chalisa with authentic meanings & audio:\n${url}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="flex items-center gap-1 bg-[#25D366] text-white px-2.5 py-1 rounded font-bold shadow-xs"
              >
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
