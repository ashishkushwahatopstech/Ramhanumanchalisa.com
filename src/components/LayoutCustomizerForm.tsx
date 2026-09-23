"use client";

import React, { useState, useEffect } from "react";
import {
  type SiteLayoutConfig,
  type HeaderMenuItem,
  type GadgetInstance,
  type GadgetType,
  type ListItem,
  DEFAULT_SITE_LAYOUT_CONFIG,
} from "../lib/siteConfig";

export default function LayoutCustomizerForm() {
  const [config, setConfig] = useState<SiteLayoutConfig>(DEFAULT_SITE_LAYOUT_CONFIG);
  const [activeSubTab, setActiveSubTab] = useState<"header" | "gadgets" | "ads" | "footer" | "subscribers">("header");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Subscribers state
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [copiedEmails, setCopiedEmails] = useState(false);

  // Load layout configuration on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/layout-config");
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (err: any) {
        console.error("Failed to load layout config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Load subscribers when tab is selected
  useEffect(() => {
    if (activeSubTab === "subscribers") {
      fetchSubscribers();
    }
  }, [activeSubTab]);

  const fetchSubscribers = async () => {
    setLoadingSubs(true);
    try {
      const res = await fetch("/api/admin/subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (e) {
      console.error("Failed to fetch subscribers:", e);
    } finally {
      setLoadingSubs(false);
    }
  };

  const deleteSubscriber = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove subscriber: ${email}?`)) return;
    try {
      const res = await fetch(`/api/admin/subscribers?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id && s.email !== email));
      }
    } catch {
      alert("Failed to delete subscriber.");
    }
  };

  const copyAllEmails = () => {
    const emailList = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emailList);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 3000);
  };

  const exportSubscribersCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," + ["Email,Source,SubscribedAt"].concat(
      subscribers.map((s) => `"${s.email}","${s.source || ""}","${s.createdAt || ""}"`)
    ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save changes to API
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/layout-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error("Server responded with error");
      const data = await res.json();
      setConfig(data.config);
      setMessage({ type: "success", text: "Site layout and gadgets saved successfully!" });
      setTimeout(() => setMessage(null), 5000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save configuration." });
    } finally {
      setSaving(false);
    }
  };

  // Reset to default preset
  const handleResetDefaults = () => {
    if (confirm("Reset layout, menus, and gadgets to original defaults? Any custom modifications will be replaced.")) {
      setConfig(DEFAULT_SITE_LAYOUT_CONFIG);
      setMessage({ type: "success", text: "Reset to default layout preset. Click 'Save Changes' to apply." });
    }
  };

  // --- HEADER HELPERS ---
  const updateMenuItem = (index: number, patch: Partial<HeaderMenuItem>) => {
    const items = [...config.headerMenu];
    items[index] = { ...items[index], ...patch };
    setConfig({ ...config, headerMenu: items });
  };

  const moveMenuItem = (index: number, direction: "up" | "down") => {
    const items = [...config.headerMenu];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const temp = items[index];
    items[index] = items[target];
    items[target] = temp;
    setConfig({ ...config, headerMenu: items });
  };

  const removeMenuItem = (index: number) => {
    const items = config.headerMenu.filter((_, i) => i !== index);
    setConfig({ ...config, headerMenu: items });
  };

  const addMenuItem = () => {
    const newItem: HeaderMenuItem = {
      id: `hm-${Date.now()}`,
      label: "New Nav Link",
      href: "/new-page",
      isEnabled: true,
    };
    setConfig({ ...config, headerMenu: [...config.headerMenu, newItem] });
  };

  // --- GADGET HELPERS ---
  const moveGadget = (index: number, direction: "up" | "down") => {
    const gadgets = [...config.sidebarGadgets];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= gadgets.length) return;
    const temp = gadgets[index];
    gadgets[index] = gadgets[target];
    gadgets[target] = temp;
    // Reindex order
    gadgets.forEach((g, i) => (g.order = i + 1));
    setConfig({ ...config, sidebarGadgets: gadgets });
  };

  const updateGadget = (index: number, patch: Partial<GadgetInstance>) => {
    const gadgets = [...config.sidebarGadgets];
    gadgets[index] = {
      ...gadgets[index],
      ...patch,
      config: { ...gadgets[index].config, ...(patch.config || {}) },
    };
    setConfig({ ...config, sidebarGadgets: gadgets });
  };

  const removeGadget = (index: number) => {
    const gadgets = config.sidebarGadgets.filter((_, i) => i !== index);
    gadgets.forEach((g, i) => (g.order = i + 1));
    setConfig({ ...config, sidebarGadgets: gadgets });
  };

  const addPredefinedGadget = (type: GadgetType) => {
    const newId = `gadget-${type}-${Date.now().toString(36)}`;
    let newGadget: GadgetInstance;

    switch (type) {
      case "subscription":
        newGadget = {
          id: newId,
          type: "subscription",
          title: "Daily Morning Hanuman Blessings",
          isEnabled: true,
          order: config.sidebarGadgets.length + 1,
          config: {
            subscriptionSubtitle: "Receive daily Chaupai verses, auspicious tithis, and divine audio in your inbox.",
            buttonText: "Receive Blessings 🙏",
            placeholder: "Enter your email address...",
            disclaimer: "No spam. Pure devotional blessings sent every morning.",
          },
        };
        break;
      case "contact_form":
        newGadget = {
          id: newId,
          type: "contact_form",
          title: "Devotee Inquiries & Prayers",
          isEnabled: true,
          order: config.sidebarGadgets.length + 1,
          config: {
            subtitle: "Have questions or prayer intentions? Share them with our seva team.",
            recipientNote: "All inquiries are kept confidential and pure.",
          },
        };
        break;
      case "popular_posts":
        newGadget = {
          id: newId,
          type: "popular_posts",
          title: "Popular Sacred Hymns",
          isEnabled: true,
          order: config.sidebarGadgets.length + 1,
          config: {
            postsLimit: 5,
            showRanking: true,
          },
        };
        break;
      case "featured_post":
        newGadget = {
          id: newId,
          type: "featured_post",
          title: "Featured Sacred Hymn",
          isEnabled: true,
          order: config.sidebarGadgets.length + 1,
          config: {
            badgeText: "⭐ Featured Hymn",
            featuredTitle: "Shri Hanuman Chalisa (हिंदी व English)",
            featuredUrl: "/hanuman-chalisa-meaning",
            featuredDesc: "Recite the original 40 quatrains with line-by-line meaning and synced audio.",
            featuredButtonText: "Recite Now →",
          },
        };
        break;
      case "list":
        newGadget = {
          id: newId,
          type: "list",
          title: "Sacred Deity Collections",
          isEnabled: true,
          order: config.sidebarGadgets.length + 1,
          config: {
            items: [
              { label: "Hanuman Ji", url: "/blog?category=Hanuman%20Ji", icon: "🚩" },
              { label: "Shri Ram", url: "/blog?category=Shri%20Ram", icon: "🏹" },
              { label: "Lord Shiva", url: "/blog?category=Lord%20Shiva", icon: "🔱" },
              { label: "Lord Ganesh", url: "/blog?category=Lord%20Ganesh", icon: "🐘" },
            ],
          },
        };
        break;
      case "html_js":
        newGadget = {
          id: newId,
          type: "html_js",
          title: "Custom Devotional Widget",
          isEnabled: true,
          order: config.sidebarGadgets.length + 1,
          config: {
            rawHtml: `<div class="p-3 bg-marigold/10 border border-marigold/40 rounded text-center text-xs">\n  <span>✨ जय बजरंगबली ✨</span>\n</div>`,
          },
        };
        break;
    }

    setConfig({ ...config, sidebarGadgets: [...config.sidebarGadgets, newGadget] });
  };

  if (loading) {
    return (
      <div className="bg-stone-ivory border-2 border-brass-gold/30 rounded-xl p-12 text-center space-y-3">
        <span className="text-3xl animate-spin block">⏳</span>
        <p className="text-sm font-bold text-maroon-deep">Loading Site Layout & Gadgets Studio...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Studio Header & Action Bar */}
      <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <h2 className="font-serif-display text-lg sm:text-xl font-bold text-maroon-deep uppercase tracking-wider">
              Site Layout, Menus & Gadgets Studio
            </h2>
          </div>
          <p className="text-xs text-charcoal-brown/75 mt-0.5">
            Configure header menus, sidebars, predefined gadgets, ad units, and devotional footer columns.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-2 bg-stone-ivory hover:bg-stone-200 text-charcoal-brown border border-brass-gold/40 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 bg-vermilion hover:bg-marigold hover:text-maroon-deep text-stone-ivory rounded-lg text-xs font-bold uppercase tracking-wider border border-brass-gold/60 shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <span className="animate-spin text-sm">⏳</span>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-bold animate-fadeIn ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-red-50 text-red-800 border-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{message.type === "success" ? "✅" : "⚠️"}</span>
            <span>{message.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="text-stone-500 hover:text-stone-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-brass-gold/20 pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab("header")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "header"
              ? "bg-maroon-deep text-stone-ivory shadow"
              : "bg-stone-ivory text-charcoal-brown hover:bg-brass-gold/20 border border-brass-gold/30"
          }`}
        >
          <span>🧭</span>
          <span>Header & Top Bar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("gadgets")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "gadgets"
              ? "bg-maroon-deep text-stone-ivory shadow"
              : "bg-stone-ivory text-charcoal-brown hover:bg-brass-gold/20 border border-brass-gold/30"
          }`}
        >
          <span>🧩</span>
          <span>Sidebar & Gadgets ({config.sidebarGadgets.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("ads")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "ads"
              ? "bg-maroon-deep text-stone-ivory shadow"
              : "bg-stone-ivory text-charcoal-brown hover:bg-brass-gold/20 border border-brass-gold/30"
          }`}
        >
          <span>📢</span>
          <span>Ad Slots</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("footer")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "footer"
              ? "bg-maroon-deep text-stone-ivory shadow"
              : "bg-stone-ivory text-charcoal-brown hover:bg-brass-gold/20 border border-brass-gold/30"
          }`}
        >
          <span>🦶</span>
          <span>Footer Columns</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("subscribers")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "subscribers"
              ? "bg-maroon-deep text-stone-ivory shadow"
              : "bg-stone-ivory text-charcoal-brown hover:bg-brass-gold/20 border border-brass-gold/30"
          }`}
        >
          <span>📬</span>
          <span>Subscribers ({subscribers.length})</span>
        </button>
      </div>

      {/* ==================== TAB 1: HEADER & TOP BAR ==================== */}
      {activeSubTab === "header" && (
        <div className="space-y-6">
          {/* Header Menus Management */}
          <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-brass-gold/20 pb-3">
              <div>
                <h3 className="font-serif-display text-base font-bold text-maroon-deep uppercase">
                  Header Navigation Links
                </h3>
                <p className="text-xs text-charcoal-brown/70 mt-0.5">
                  Customize the links displayed in the desktop header navbar. Order is rendered left to right.
                </p>
              </div>
              <button
                type="button"
                onClick={addMenuItem}
                className="px-3 py-1.5 bg-marigold hover:bg-brass-gold text-maroon-deep font-bold text-xs rounded border border-marigold shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>➕</span> Add Link
              </button>
            </div>

            <div className="space-y-3">
              {config.headerMenu.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-3.5 bg-white border rounded-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
                    item.isEnabled ? "border-brass-gold/40" : "border-gray-200 opacity-60 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 w-full md:w-auto">
                    <span className="font-mono text-xs text-brass-gold font-bold w-6">
                      #{index + 1}
                    </span>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateMenuItem(index, { label: e.target.value })}
                      placeholder="Menu Label"
                      className="px-3 py-1.5 border border-brass-gold/30 rounded text-xs font-bold text-maroon-deep w-40 outline-none focus:border-maroon-deep"
                    />
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateMenuItem(index, { href: e.target.value })}
                      placeholder="/url-slug"
                      className="px-3 py-1.5 border border-brass-gold/30 rounded text-xs font-mono text-charcoal-brown flex-1 md:w-56 outline-none focus:border-maroon-deep"
                    />
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <label className="flex items-center gap-1.5 text-xs text-charcoal-brown cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.openNewTab || false}
                        onChange={(e) => updateMenuItem(index, { openNewTab: e.target.checked })}
                        className="rounded text-maroon-deep"
                      />
                      <span>New Tab</span>
                    </label>

                    <label className="flex items-center gap-1.5 text-xs font-bold text-charcoal-brown cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isEnabled}
                        onChange={(e) => updateMenuItem(index, { isEnabled: e.target.checked })}
                        className="rounded text-maroon-deep"
                      />
                      <span>Enabled</span>
                    </label>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveMenuItem(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 rounded bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-xs cursor-pointer"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => moveMenuItem(index, "down")}
                        disabled={index === config.headerMenu.length - 1}
                        title="Move Down"
                        className="p-1 rounded bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-xs cursor-pointer"
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        onClick={() => removeMenuItem(index)}
                        title="Delete Link"
                        className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-xs ml-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Header Action Button (How to Recite) & Sita Ram Chant Marquee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Header CTA Button */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-brass-gold/20 pb-2">
                <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                  Header Action Button
                </h4>
                <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.headerCta?.isEnabled ?? true}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        headerCta: { ...config.headerCta, isEnabled: e.target.checked },
                      })
                    }
                  />
                  <span>Show Button</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-brown mb-1">Button Label</label>
                <input
                  type="text"
                  value={config.headerCta?.label || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      headerCta: { ...config.headerCta, label: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs text-charcoal-brown outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-brown mb-1">Target URL</label>
                <input
                  type="text"
                  value={config.headerCta?.href || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      headerCta: { ...config.headerCta, href: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs font-mono text-charcoal-brown outline-none"
                />
              </div>
            </div>

            {/* Marquee Banner */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-brass-gold/20 pb-2">
                <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                  Sita Ram Chanting Marquee
                </h4>
                <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.headerNotice?.isEnabled ?? true}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        headerNotice: { ...config.headerNotice, isEnabled: e.target.checked },
                      })
                    }
                  />
                  <span>Show Marquee</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-brown mb-1">Marquee Text</label>
                <textarea
                  value={config.headerNotice?.text || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      headerNotice: { ...config.headerNotice, text: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs text-charcoal-brown outline-none resize-none font-hindi-display"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: SIDEBAR & GADGETS ==================== */}
      {activeSubTab === "gadgets" && (
        <div className="space-y-6">
          {/* Global Sidebar Toggle & Quick Predefined Gadget Library */}
          <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brass-gold/20 pb-3">
              <div>
                <h3 className="font-serif-display text-base font-bold text-maroon-deep uppercase">
                  Sidebar & Predefined Gadgets
                </h3>
                <p className="text-xs text-charcoal-brown/75">
                  Select and place interactive widgets across your site. Click any gadget template below to add it instantly.
                </p>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-maroon-deep cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-brass-gold/30 shadow-xs">
                <input
                  type="checkbox"
                  checked={config.sidebarEnabled}
                  onChange={(e) => setConfig({ ...config, sidebarEnabled: e.target.checked })}
                />
                <span>Enable Sitewide Sidebar</span>
              </label>
            </div>

            {/* Predefined Gadgets Palette */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brass-gold block mb-2">
                ➕ Add Predefined Gadget to Sidebar:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  type="button"
                  onClick={() => addPredefinedGadget("subscription")}
                  className="p-2.5 bg-white border border-brass-gold/40 rounded-lg hover:border-maroon-deep hover:bg-marigold/10 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xl block mb-1">📬</span>
                  <span className="text-xs font-bold text-maroon-deep block group-hover:text-vermilion">
                    Subscriptions
                  </span>
                  <span className="text-[10px] text-charcoal-brown/60">Morning Blessings</span>
                </button>

                <button
                  type="button"
                  onClick={() => addPredefinedGadget("contact_form")}
                  className="p-2.5 bg-white border border-brass-gold/40 rounded-lg hover:border-maroon-deep hover:bg-marigold/10 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xl block mb-1">✉️</span>
                  <span className="text-xs font-bold text-maroon-deep block group-hover:text-vermilion">
                    Contact Form
                  </span>
                  <span className="text-[10px] text-charcoal-brown/60">Prayer inquiries</span>
                </button>

                <button
                  type="button"
                  onClick={() => addPredefinedGadget("popular_posts")}
                  className="p-2.5 bg-white border border-brass-gold/40 rounded-lg hover:border-maroon-deep hover:bg-marigold/10 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xl block mb-1">📜</span>
                  <span className="text-xs font-bold text-maroon-deep block group-hover:text-vermilion">
                    Popular Posts
                  </span>
                  <span className="text-[10px] text-charcoal-brown/60">Top read articles</span>
                </button>

                <button
                  type="button"
                  onClick={() => addPredefinedGadget("featured_post")}
                  className="p-2.5 bg-white border border-brass-gold/40 rounded-lg hover:border-maroon-deep hover:bg-marigold/10 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xl block mb-1">⭐</span>
                  <span className="text-xs font-bold text-maroon-deep block group-hover:text-vermilion">
                    Featured Post
                  </span>
                  <span className="text-[10px] text-charcoal-brown/60">Highlight card</span>
                </button>

                <button
                  type="button"
                  onClick={() => addPredefinedGadget("list")}
                  className="p-2.5 bg-white border border-brass-gold/40 rounded-lg hover:border-maroon-deep hover:bg-marigold/10 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xl block mb-1">🪔</span>
                  <span className="text-xs font-bold text-maroon-deep block group-hover:text-vermilion">
                    Custom List
                  </span>
                  <span className="text-[10px] text-charcoal-brown/60">Devotional links</span>
                </button>

                <button
                  type="button"
                  onClick={() => addPredefinedGadget("html_js")}
                  className="p-2.5 bg-white border border-brass-gold/40 rounded-lg hover:border-maroon-deep hover:bg-marigold/10 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xl block mb-1">💻</span>
                  <span className="text-xs font-bold text-maroon-deep block group-hover:text-vermilion">
                    HTML / JS
                  </span>
                  <span className="text-[10px] text-charcoal-brown/60">Embed custom code</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Gadgets List with Accordion / Edit Fields */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase tracking-wider">
              Configured Active Gadgets ({config.sidebarGadgets.length})
            </h4>

            {config.sidebarGadgets.length === 0 ? (
              <div className="p-8 bg-stone-ivory border-2 border-dashed border-brass-gold/30 rounded-xl text-center">
                <span className="text-2xl block mb-1">📭</span>
                <p className="text-xs text-charcoal-brown/70 font-semibold">
                  No gadgets currently in sidebar. Click any gadget button above to add one!
                </p>
              </div>
            ) : (
              config.sidebarGadgets.map((gadget, index) => (
                <div
                  key={gadget.id}
                  className={`bg-stone-ivory border-2 rounded-xl p-5 shadow-sm space-y-4 transition-all ${
                    gadget.isEnabled ? "border-brass-gold/40" : "border-gray-200 opacity-60 bg-gray-50"
                  }`}
                >
                  {/* Gadget Card Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brass-gold/20 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-marigold/30 text-maroon-deep font-bold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-xl">
                        {gadget.type === "subscription" && "📬"}
                        {gadget.type === "contact_form" && "✉️"}
                        {gadget.type === "popular_posts" && "📜"}
                        {gadget.type === "featured_post" && "⭐"}
                        {gadget.type === "list" && "🪔"}
                        {gadget.type === "html_js" && "💻"}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-serif-display font-bold text-maroon-deep text-sm">
                            {gadget.title}
                          </h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-black/5 text-charcoal-brown/70 border border-black/10">
                            {gadget.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-charcoal-brown cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gadget.isEnabled}
                          onChange={(e) => updateGadget(index, { isEnabled: e.target.checked })}
                          className="rounded text-maroon-deep"
                        />
                        <span>Enabled</span>
                      </label>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveGadget(index, "up")}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-1.5 rounded bg-white border border-brass-gold/30 hover:bg-stone-100 disabled:opacity-30 text-xs cursor-pointer"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => moveGadget(index, "down")}
                          disabled={index === config.sidebarGadgets.length - 1}
                          title="Move Down"
                          className="p-1.5 rounded bg-white border border-brass-gold/30 hover:bg-stone-100 disabled:opacity-30 text-xs cursor-pointer"
                        >
                          ▼
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGadget(index)}
                          title="Delete Gadget"
                          className="p-1.5 rounded bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 text-xs ml-1 cursor-pointer"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Gadget Title Editing */}
                  <div>
                    <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                      Gadget Heading / Title
                    </label>
                    <input
                      type="text"
                      value={gadget.title}
                      onChange={(e) => updateGadget(index, { title: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs font-bold text-maroon-deep outline-none"
                    />
                  </div>

                  {/* Type Specific Fields */}
                  {gadget.type === "subscription" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                          Subtitle / Call to Action
                        </label>
                        <input
                          type="text"
                          value={gadget.config?.subscriptionSubtitle || ""}
                          onChange={(e) =>
                            updateGadget(index, {
                              config: { ...gadget.config, subscriptionSubtitle: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                          Submit Button Text
                        </label>
                        <input
                          type="text"
                          value={gadget.config?.buttonText || ""}
                          onChange={(e) =>
                            updateGadget(index, {
                              config: { ...gadget.config, buttonText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                          Disclaimer Note
                        </label>
                        <input
                          type="text"
                          value={gadget.config?.disclaimer || ""}
                          onChange={(e) =>
                            updateGadget(index, {
                              config: { ...gadget.config, disclaimer: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {gadget.type === "contact_form" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={gadget.config?.subtitle || ""}
                          onChange={(e) =>
                            updateGadget(index, {
                              config: { ...gadget.config, subtitle: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                          Confidentiality Note
                        </label>
                        <input
                          type="text"
                          value={gadget.config?.recipientNote || ""}
                          onChange={(e) =>
                            updateGadget(index, {
                              config: { ...gadget.config, recipientNote: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {gadget.type === "popular_posts" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                          Number of Posts to Show
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={15}
                          value={gadget.config?.postsLimit || 5}
                          onChange={(e) =>
                            updateGadget(index, {
                              config: { ...gadget.config, postsLimit: Number(e.target.value) },
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                        />
                      </div>
                      <div className="flex items-center mt-5">
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={gadget.config?.showRanking ?? true}
                            onChange={(e) =>
                              updateGadget(index, {
                                config: { ...gadget.config, showRanking: e.target.checked },
                              })
                            }
                          />
                          <span>Show Number Ranking Badges (1, 2, 3...)</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {gadget.type === "featured_post" && (
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                            Badge Label
                          </label>
                          <input
                            type="text"
                            value={gadget.config?.badgeText || ""}
                            onChange={(e) =>
                              updateGadget(index, {
                                config: { ...gadget.config, badgeText: e.target.value },
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                            Hymn / Article Title
                          </label>
                          <input
                            type="text"
                            value={gadget.config?.featuredTitle || ""}
                            onChange={(e) =>
                              updateGadget(index, {
                                config: { ...gadget.config, featuredTitle: e.target.value },
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                            Destination URL
                          </label>
                          <input
                            type="text"
                            value={gadget.config?.featuredUrl || ""}
                            onChange={(e) =>
                              updateGadget(index, {
                                config: { ...gadget.config, featuredUrl: e.target.value },
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs font-mono outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                            CTA Button Text
                          </label>
                          <input
                            type="text"
                            value={gadget.config?.featuredButtonText || ""}
                            onChange={(e) =>
                              updateGadget(index, {
                                config: { ...gadget.config, featuredButtonText: e.target.value },
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                          Description
                        </label>
                        <textarea
                          value={gadget.config?.featuredDesc || ""}
                          onChange={(e) =>
                            updateGadget(index, {
                              config: { ...gadget.config, featuredDesc: e.target.value },
                            })
                          }
                          rows={2}
                          className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {gadget.type === "list" && (
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-charcoal-brown">
                          List Items ({gadget.config?.items?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const curItems = gadget.config?.items || [];
                            updateGadget(index, {
                              config: {
                                ...gadget.config,
                                items: [...curItems, { label: "New Item", url: "/blog", icon: "🚩" }],
                              },
                            });
                          }}
                          className="text-[11px] text-vermilion hover:underline font-bold"
                        >
                          ➕ Add Item
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(gadget.config?.items || []).map((li, lIndex) => (
                          <div key={lIndex} className="flex items-center gap-2 bg-white p-2 rounded border border-brass-gold/20">
                            <input
                              type="text"
                              value={li.icon || ""}
                              onChange={(e) => {
                                const newItems = [...(gadget.config?.items || [])];
                                newItems[lIndex] = { ...newItems[lIndex], icon: e.target.value };
                                updateGadget(index, { config: { ...gadget.config, items: newItems } });
                              }}
                              placeholder="Icon"
                              className="w-12 px-2 py-1 border border-stone-200 rounded text-xs text-center"
                            />
                            <input
                              type="text"
                              value={li.label}
                              onChange={(e) => {
                                const newItems = [...(gadget.config?.items || [])];
                                newItems[lIndex] = { ...newItems[lIndex], label: e.target.value };
                                updateGadget(index, { config: { ...gadget.config, items: newItems } });
                              }}
                              placeholder="Label"
                              className="flex-1 px-2 py-1 border border-stone-200 rounded text-xs"
                            />
                            <input
                              type="text"
                              value={li.url}
                              onChange={(e) => {
                                const newItems = [...(gadget.config?.items || [])];
                                newItems[lIndex] = { ...newItems[lIndex], url: e.target.value };
                                updateGadget(index, { config: { ...gadget.config, items: newItems } });
                              }}
                              placeholder="/url"
                              className="flex-1 px-2 py-1 border border-stone-200 rounded text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = (gadget.config?.items || []).filter((_, i) => i !== lIndex);
                                updateGadget(index, { config: { ...gadget.config, items: newItems } });
                              }}
                              className="text-red-600 hover:text-red-800 text-xs px-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {gadget.type === "html_js" && (
                    <div className="pt-2">
                      <label className="block text-[11px] font-bold text-charcoal-brown mb-1">
                        Custom HTML / JavaScript / Embed Code
                      </label>
                      <textarea
                        value={gadget.config?.rawHtml || ""}
                        onChange={(e) =>
                          updateGadget(index, {
                            config: { ...gadget.config, rawHtml: e.target.value },
                          })
                        }
                        rows={4}
                        placeholder="<div>...</div> or <script>...</script>"
                        className="w-full px-3 py-2 bg-black/90 text-emerald-400 font-mono text-xs rounded border border-brass-gold/40 outline-none"
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 3: AD SLOTS ==================== */}
      {activeSubTab === "ads" && (
        <div className="space-y-6">
          <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-2">
            <h3 className="font-serif-display text-base font-bold text-maroon-deep uppercase">
              Monetization & Ad Units Management
            </h3>
            <p className="text-xs text-charcoal-brown/75">
              Control placement, enable/disable ad slots, and inject AdSense tags, custom HTML scripts, or direct affiliate banners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Slot 1: Above The Fold */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-brass-gold/20 pb-2">
                <div>
                  <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                    Above The Fold (Top Banner)
                  </h4>
                  <span className="text-[10px] text-charcoal-brown/60">Target: 728x90 / responsive</span>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.adSlots?.aboveFold?.enabled ?? false}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          aboveFold: { ...config.adSlots.aboveFold, enabled: e.target.checked },
                        },
                      })
                    }
                  />
                  <span>Active</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Ad Type</label>
                <select
                  value={config.adSlots?.aboveFold?.mode || "customHtml"}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      adSlots: {
                        ...config.adSlots,
                        aboveFold: { ...config.adSlots.aboveFold, mode: e.target.value as any },
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                >
                  <option value="customHtml">Custom HTML / Script / AdSense Code</option>
                  <option value="adsense">AdSense Auto Unit</option>
                  <option value="banner">Image Banner with Link</option>
                </select>
              </div>

              {config.adSlots?.aboveFold?.mode === "banner" ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Banner Image URL"
                    value={config.adSlots?.aboveFold?.bannerImg || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          aboveFold: { ...config.adSlots.aboveFold, bannerImg: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs font-mono outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Destination Link URL"
                    value={config.adSlots?.aboveFold?.bannerUrl || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          aboveFold: { ...config.adSlots.aboveFold, bannerUrl: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs font-mono outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Ad Tag / Code</label>
                  <textarea
                    rows={4}
                    value={config.adSlots?.aboveFold?.code || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          aboveFold: { ...config.adSlots.aboveFold, code: e.target.value },
                        },
                      })
                    }
                    placeholder="<ins class='adsbygoogle' ...></ins>"
                    className="w-full px-3 py-1.5 bg-black/90 text-emerald-400 font-mono text-xs rounded border border-brass-gold/40 outline-none"
                  />
                </div>
              )}
            </div>

            {/* Slot 2: Sidebar Ad */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-brass-gold/20 pb-2">
                <div>
                  <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                    Sidebar Ad Unit
                  </h4>
                  <span className="text-[10px] text-charcoal-brown/60">Target: 300x250 square</span>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.adSlots?.sidebar?.enabled ?? false}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          sidebar: { ...config.adSlots.sidebar, enabled: e.target.checked },
                        },
                      })
                    }
                  />
                  <span>Active</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Ad Type</label>
                <select
                  value={config.adSlots?.sidebar?.mode || "customHtml"}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      adSlots: {
                        ...config.adSlots,
                        sidebar: { ...config.adSlots.sidebar, mode: e.target.value as any },
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                >
                  <option value="customHtml">Custom HTML / Script / AdSense Code</option>
                  <option value="adsense">AdSense Auto Unit</option>
                  <option value="banner">Image Banner with Link</option>
                </select>
              </div>

              {config.adSlots?.sidebar?.mode === "banner" ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Banner Image URL"
                    value={config.adSlots?.sidebar?.bannerImg || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          sidebar: { ...config.adSlots.sidebar, bannerImg: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs font-mono outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Destination Link URL"
                    value={config.adSlots?.sidebar?.bannerUrl || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          sidebar: { ...config.adSlots.sidebar, bannerUrl: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs font-mono outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Ad Tag / Code</label>
                  <textarea
                    rows={4}
                    value={config.adSlots?.sidebar?.code || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          sidebar: { ...config.adSlots.sidebar, code: e.target.value },
                        },
                      })
                    }
                    placeholder="<ins class='adsbygoogle' ...></ins>"
                    className="w-full px-3 py-1.5 bg-black/90 text-emerald-400 font-mono text-xs rounded border border-brass-gold/40 outline-none"
                  />
                </div>
              )}
            </div>

            {/* Slot 3: In-Content Scripture Ad */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-brass-gold/20 pb-2">
                <div>
                  <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                    In-Content Scripture Ad
                  </h4>
                  <span className="text-[10px] text-charcoal-brown/60">Mid-article / Between chaupais</span>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.adSlots?.inContent?.enabled ?? false}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          inContent: { ...config.adSlots.inContent, enabled: e.target.checked },
                        },
                      })
                    }
                  />
                  <span>Active</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Ad Tag / Code</label>
                <textarea
                  rows={4}
                  value={config.adSlots?.inContent?.code || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      adSlots: {
                        ...config.adSlots,
                        inContent: { ...config.adSlots.inContent, code: e.target.value },
                      },
                    })
                  }
                  placeholder="<ins class='adsbygoogle' ...></ins>"
                  className="w-full px-3 py-1.5 bg-black/90 text-emerald-400 font-mono text-xs rounded border border-brass-gold/40 outline-none"
                />
              </div>
            </div>

            {/* Slot 4: Footer Ad */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-brass-gold/20 pb-2">
                <div>
                  <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                    Above Footer Ad
                  </h4>
                  <span className="text-[10px] text-charcoal-brown/60">Bottom horizontal banner</span>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.adSlots?.footer?.enabled ?? false}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        adSlots: {
                          ...config.adSlots,
                          footer: { ...config.adSlots.footer, enabled: e.target.checked },
                        },
                      })
                    }
                  />
                  <span>Active</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Ad Tag / Code</label>
                <textarea
                  rows={4}
                  value={config.adSlots?.footer?.code || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      adSlots: {
                        ...config.adSlots,
                        footer: { ...config.adSlots.footer, code: e.target.value },
                      },
                    })
                  }
                  placeholder="<ins class='adsbygoogle' ...></ins>"
                  className="w-full px-3 py-1.5 bg-black/90 text-emerald-400 font-mono text-xs rounded border border-brass-gold/40 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: FOOTER ==================== */}
      {activeSubTab === "footer" && (
        <div className="space-y-6">
          {/* Branding & Notices */}
          <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif-display text-base font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
              Mandir Sanctum Footer Branding & Legal Disclaimers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-brown mb-1">Branding Title</label>
                <input
                  type="text"
                  value={config.footer?.brandingTitle || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      footer: { ...config.footer, brandingTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-brown mb-1">Copyright Notice</label>
                <input
                  type="text"
                  value={config.footer?.copyrightText || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      footer: { ...config.footer, copyrightText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-brown mb-1">About / Sanctum Mission Text</label>
              <textarea
                rows={3}
                value={config.footer?.brandingDesc || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    footer: { ...config.footer, brandingDesc: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-brown mb-1">Disclaimer Text</label>
              <textarea
                rows={2}
                value={config.footer?.disclaimerText || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    footer: { ...config.footer, disclaimerText: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs outline-none resize-none"
              />
            </div>
          </div>

          {/* Quick Links & Devotional Texts Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Quick Links Column */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b border-brass-gold/20 pb-2">
                <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                  Pillars & Quick Links
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const links = config.footer?.quickLinks || [];
                    setConfig({
                      ...config,
                      footer: {
                        ...config.footer,
                        quickLinks: [...links, { label: "New Pillar", href: "/" }],
                      },
                    });
                  }}
                  className="text-xs text-vermilion hover:underline font-bold"
                >
                  ➕ Add Link
                </button>
              </div>

              <div className="space-y-2">
                {(config.footer?.quickLinks || []).map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border border-brass-gold/20">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...(config.footer?.quickLinks || [])];
                        newLinks[idx] = { ...newLinks[idx], label: e.target.value };
                        setConfig({ ...config, footer: { ...config.footer, quickLinks: newLinks } });
                      }}
                      className="flex-1 px-2 py-1 border border-stone-200 rounded text-xs"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...(config.footer?.quickLinks || [])];
                        newLinks[idx] = { ...newLinks[idx], href: e.target.value };
                        setConfig({ ...config, footer: { ...config.footer, quickLinks: newLinks } });
                      }}
                      className="flex-1 px-2 py-1 border border-stone-200 rounded text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = (config.footer?.quickLinks || []).filter((_, i) => i !== idx);
                        setConfig({ ...config, footer: { ...config.footer, quickLinks: newLinks } });
                      }}
                      className="text-red-600 hover:text-red-800 text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Devotional Texts Column */}
            <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b border-brass-gold/20 pb-2">
                <h4 className="font-serif-display text-sm font-bold text-maroon-deep uppercase">
                  Devotional Texts Column
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const links = config.footer?.devotionalLinks || [];
                    setConfig({
                      ...config,
                      footer: {
                        ...config.footer,
                        devotionalLinks: [...links, { label: "New Text", href: "/" }],
                      },
                    });
                  }}
                  className="text-xs text-vermilion hover:underline font-bold"
                >
                  ➕ Add Link
                </button>
              </div>

              <div className="space-y-2">
                {(config.footer?.devotionalLinks || []).map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border border-brass-gold/20">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...(config.footer?.devotionalLinks || [])];
                        newLinks[idx] = { ...newLinks[idx], label: e.target.value };
                        setConfig({ ...config, footer: { ...config.footer, devotionalLinks: newLinks } });
                      }}
                      className="flex-1 px-2 py-1 border border-stone-200 rounded text-xs"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...(config.footer?.devotionalLinks || [])];
                        newLinks[idx] = { ...newLinks[idx], href: e.target.value };
                        setConfig({ ...config, footer: { ...config.footer, devotionalLinks: newLinks } });
                      }}
                      className="flex-1 px-2 py-1 border border-stone-200 rounded text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = (config.footer?.devotionalLinks || []).filter((_, i) => i !== idx);
                        setConfig({ ...config, footer: { ...config.footer, devotionalLinks: newLinks } });
                      }}
                      className="text-red-600 hover:text-red-800 text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 5: SUBSCRIBERS HUB ==================== */}
      {activeSubTab === "subscribers" && (
        <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brass-gold/20 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📬</span>
                <h3 className="font-serif-display text-base sm:text-lg font-bold text-maroon-deep uppercase">
                  Daily Morning Blessings Subscribers ({subscribers.length})
                </h3>
              </div>
              <p className="text-xs text-charcoal-brown/75 mt-0.5">
                Devotees who registered via the Subscription Gadget for daily Chaupai & morning blessings.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyAllEmails}
                disabled={subscribers.length === 0}
                className="px-3 py-1.5 bg-marigold hover:bg-brass-gold text-maroon-deep font-bold text-xs rounded border border-marigold shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>{copiedEmails ? "✅ Copied!" : "📋 Copy All Emails"}</span>
              </button>

              <button
                type="button"
                onClick={exportSubscribersCsv}
                disabled={subscribers.length === 0}
                className="px-3 py-1.5 bg-maroon-deep hover:bg-vermilion text-stone-ivory font-bold text-xs rounded shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>📥 Export CSV</span>
              </button>
            </div>
          </div>

          {loadingSubs ? (
            <div className="p-8 text-center text-xs text-charcoal-brown font-bold">
              ⏳ Loading subscribers...
            </div>
          ) : subscribers.length === 0 ? (
            <div className="p-8 bg-white border border-dashed border-brass-gold/30 rounded-xl text-center space-y-1">
              <span className="text-2xl block">📭</span>
              <p className="text-xs font-bold text-maroon-deep">No email subscribers logged yet.</p>
              <p className="text-[11px] text-charcoal-brown/60">
                When visitors submit their email in the Subscription Gadget, they will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg border border-brass-gold/20 shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-maroon-deep uppercase font-mono text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Email Address</th>
                    <th className="py-2.5 px-4">Source</th>
                    <th className="py-2.5 px-4">Registered Date</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {subscribers.map((sub, i) => (
                    <tr key={sub.id || i} className="hover:bg-stone-50 transition-colors">
                      <td className="py-2 px-4 font-mono text-stone-400">{i + 1}</td>
                      <td className="py-2 px-4 font-bold text-maroon-deep">{sub.email}</td>
                      <td className="py-2 px-4 text-charcoal-brown/70 font-mono text-[11px]">{sub.source || "sidebar"}</td>
                      <td className="py-2 px-4 text-charcoal-brown/60 text-[11px]">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="py-2 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => deleteSubscriber(sub.id, sub.email)}
                          className="text-red-600 hover:text-red-800 text-[11px] font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
