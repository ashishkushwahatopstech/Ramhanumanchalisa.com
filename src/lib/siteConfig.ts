// Site Layout & Predefined Gadgets Configuration System

export interface HeaderMenuItem {
  id: string;
  label: string;
  href: string;
  isEnabled: boolean;
  openNewTab?: boolean;
}

export interface HeaderCtaConfig {
  label: string;
  href: string;
  isEnabled: boolean;
}

export interface HeaderNoticeConfig {
  text: string;
  isEnabled: boolean;
}

export interface AdSlotConfig {
  enabled: boolean;
  mode: "adsense" | "customHtml" | "banner";
  code?: string; // HTML/JS/AdSense unit code
  bannerImg?: string;
  bannerUrl?: string;
  label?: string;
}

export interface AdSlotsConfig {
  aboveFold: AdSlotConfig;
  inContent: AdSlotConfig;
  sidebar: AdSlotConfig;
  footer: AdSlotConfig;
}

export type GadgetType = 
  | "list" 
  | "contact_form" 
  | "popular_posts" 
  | "featured_post" 
  | "html_js" 
  | "subscription";

export interface ListItem {
  label: string;
  url: string;
  icon?: string;
  description?: string;
  badge?: string;
}

export interface GadgetInstance {
  id: string;
  type: GadgetType;
  title: string;
  isEnabled: boolean;
  order: number;
  config: {
    // List Gadget
    items?: ListItem[];
    
    // Contact Form Gadget
    subtitle?: string;
    recipientNote?: string;
    
    // Popular Posts Gadget
    postsLimit?: number;
    showRanking?: boolean;
    
    // Featured Post Gadget
    badgeText?: string;
    featuredTitle?: string;
    featuredUrl?: string;
    featuredDesc?: string;
    featuredButtonText?: string;
    
    // HTML / JS Gadget
    rawHtml?: string;
    
    // Subscription Gadget
    subscriptionSubtitle?: string;
    buttonText?: string;
    placeholder?: string;
    disclaimer?: string;
  };
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  brandingTitle: string;
  brandingTagline: string;
  brandingDesc: string;
  copyrightText: string;
  disclaimerText: string;
  quickLinks: FooterLink[];
  devotionalLinks: FooterLink[];
  complianceLinks: FooterLink[];
}

export interface SiteLayoutConfig {
  headerMenu: HeaderMenuItem[];
  headerCta: HeaderCtaConfig;
  headerNotice: HeaderNoticeConfig;
  sidebarEnabled: boolean;
  sidebarGadgets: GadgetInstance[];
  adSlots: AdSlotsConfig;
  footer: FooterConfig;
}

export const DEFAULT_SITE_LAYOUT_CONFIG: SiteLayoutConfig = {
  headerMenu: [
    { id: "hm-1", label: "Hanuman Chalisa", href: "/hanuman-chalisa-meaning", isEnabled: true },
    { id: "hm-2", label: "Ram Chalisa", href: "/ram-chalisa", isEnabled: true },
    { id: "hm-3", label: "Synced Audio", href: "/hanuman-chalisa-audio-mp3", isEnabled: true },
    { id: "hm-4", label: "Hanumanashtak", href: "/sankat-mochan-hanumanashtak", isEnabled: true },
    { id: "hm-5", label: "Aarti", href: "/hanuman-aarti", isEnabled: true },
    { id: "hm-6", label: "Blog", href: "/blog", isEnabled: true },
  ],
  headerCta: {
    label: "How to Recite",
    href: "/shri-hanuman-chalisa-path-vidhi",
    isEnabled: true,
  },
  headerNotice: {
    text: "✨ सीताराम सीताराम सीताराम सीताराम • Sita Ram Sita Ram Sita Ram Sita Ram • सीताराम सीताराम सीताराम सीताराम • Sita Ram Sita Ram Sita Ram Sita Ram •",
    isEnabled: true,
  },
  sidebarEnabled: true,
  sidebarGadgets: [
    {
      id: "gadget-sub-1",
      type: "subscription",
      title: "Daily Morning Hanuman Blessings",
      isEnabled: true,
      order: 1,
      config: {
        subscriptionSubtitle: "Receive daily Chaupai verses, auspicious tithis, and divine audio directly in your inbox.",
        buttonText: "Receive Blessings 🙏",
        placeholder: "Enter your email address...",
        disclaimer: "No spam. Pure devotional blessings sent every morning.",
      },
    },
    {
      id: "gadget-feat-1",
      type: "featured_post",
      title: "Featured Sacred Hymn",
      isEnabled: true,
      order: 2,
      config: {
        badgeText: "⭐ Featured Hymn",
        featuredTitle: "Shri Hanuman Chalisa (हिंदी व English)",
        featuredUrl: "/hanuman-chalisa-meaning",
        featuredDesc: "Recite the original 40 quatrains composed by Goswami Tulsidas with line-by-line meaning and synced audio.",
        featuredButtonText: "Recite Now →",
      },
    },
    {
      id: "gadget-pop-1",
      type: "popular_posts",
      title: "Latest Sacred Hymns",
      isEnabled: true,
      order: 3,
      config: {
        postsLimit: 5,
        showRanking: true,
      },
    },
    {
      id: "gadget-list-1",
      type: "list",
      title: "Sacred Deity Collections",
      isEnabled: true,
      order: 4,
      config: {
        items: [
          { label: "Hanuman Ji", url: "/blog?category=Hanuman%20Ji", icon: "🚩" },
          { label: "Shri Ram", url: "/blog?category=Shri%20Ram", icon: "🏹" },
          { label: "Lord Shiva", url: "/blog?category=Lord%20Shiva", icon: "🔱" },
          { label: "Lord Ganesh", url: "/blog?category=Lord%20Ganesh", icon: "🐘" },
          { label: "Lord Krishna", url: "/blog?category=Lord%20Krishna", icon: "🦚" },
          { label: "Maa Durga & Devis", url: "/blog?category=Maa%20Durga%20%26%20Devis", icon: "🪔" },
          { label: "Devtas & Saints", url: "/blog?category=Devtas%20%26%20Saints", icon: "🛕" },
          { label: "Devotional Prayers", url: "/blog?category=Devotional%20Prayers", icon: "📜" },
        ],
      },
    },
  ],
  adSlots: {
    aboveFold: {
      enabled: false,
      mode: "customHtml",
      label: "Above the Fold Ad Slot",
      code: "",
    },
    inContent: {
      enabled: false,
      mode: "customHtml",
      label: "In-Content Scripture Ad Slot",
      code: "",
    },
    sidebar: {
      enabled: false,
      mode: "customHtml",
      label: "Sidebar Ad Slot",
      code: "",
    },
    footer: {
      enabled: false,
      mode: "customHtml",
      label: "Above Footer Ad Slot",
      code: "",
    },
  },
  footer: {
    brandingTitle: "Ram Hanuman Chalisa",
    brandingTagline: "श्री राम जय राम जय जय राम",
    brandingDesc: "A digital sanctum created to offer devotees a pure, immersive, and educational space to read, hear, and digest the glorious verses composed by Goswami Tulsidas. Reviewed by traditional scholars to ensure absolute accuracy of translation and context.",
    copyrightText: "RamHanumanChalisa.com. All Rights Reserved.",
    disclaimerText: "Disclaimer: The materials provided are for devotional, cultural, and educational purposes. AdSense slots are integrated layout-stable.",
    quickLinks: [
      { label: "Hanuman Chalisa Text", href: "/" },
      { label: "Bilingual Meanings", href: "/hanuman-chalisa-meaning" },
      { label: "Audio Synced Player", href: "/hanuman-chalisa-audio-mp3" },
      { label: "Hanuman Chalisa in English", href: "/hanuman-chalisa-english" },
      { label: "40 Chaupai Benefits & Meaning", href: "/hanuman-chalisa-benefits" },
      { label: "Recitation Rules", href: "/shri-hanuman-chalisa-path-vidhi" },
      { label: "📥 Download & Save Prayers (PDF, Verses & Cards)", href: "/hanuman-chalisa-pdf" },
    ],
    devotionalLinks: [
      { label: "Shri Ram Chalisa", href: "/ram-chalisa" },
      { label: "Hanuman Stuti", href: "/hanuman-stuti" },
      { label: "Bajrang Baan", href: "/bajrang-baan" },
      { label: "Hanumanashtak", href: "/sankat-mochan-hanumanashtak" },
      { label: "Hanuman Aarti", href: "/hanuman-aarti" },
      { label: "Shree Ram & Hanuman", href: "/ram-hanuman-chalisa" },
      { label: "Hanuman Jayanti", href: "/hanuman-jayanti" },
      { label: "Bhakti Blog", href: "/blog" },
    ],
    complianceLinks: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Bhakti Blog", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "FAQ", href: "/faq" },
    ],
  },
};

declare global {
  var __SITE_LAYOUT_CONFIG__: SiteLayoutConfig | undefined;
}

export function getSiteLayoutConfig(): SiteLayoutConfig {
  return globalThis.__SITE_LAYOUT_CONFIG__ || DEFAULT_SITE_LAYOUT_CONFIG;
}

export function saveSiteLayoutConfig(config: Partial<SiteLayoutConfig>): SiteLayoutConfig {
  const current = getSiteLayoutConfig();
  globalThis.__SITE_LAYOUT_CONFIG__ = {
    ...current,
    ...config,
    headerMenu: config.headerMenu || current.headerMenu,
    headerCta: { ...current.headerCta, ...(config.headerCta || {}) },
    headerNotice: { ...current.headerNotice, ...(config.headerNotice || {}) },
    adSlots: { ...current.adSlots, ...(config.adSlots || {}) },
    sidebarGadgets: config.sidebarGadgets || current.sidebarGadgets,
    footer: { ...current.footer, ...(config.footer || {}) },
  };
  return globalThis.__SITE_LAYOUT_CONFIG__;
}
