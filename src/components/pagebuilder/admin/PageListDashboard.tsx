"use client";

import React, { useState, useEffect } from "react";

export interface PageSummary {
  slug: string;
  title: string;
  template: string;
  status: "published" | "draft";
  updatedAt: string;
  version: number;
  hasOriginalSnapshot: boolean;
  isModifiedFromOriginal: boolean;
}

interface Props {
  initialPages?: PageSummary[];
}

export default function PageListDashboard({ initialPages = [] }: Props) {
  const [pages, setPages] = useState<PageSummary[]>(initialPages);
  const [loading, setLoading] = useState(initialPages.length === 0);
  const [search, setSearch] = useState("");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [resetConfirmSlug, setResetConfirmSlug] = useState<string | null>(null);

  const fetchPages = async () => {
    if (pages.length === 0) setLoading(true);
    try {
      const res = await fetch("/api/admin/pagebuilder/pages");
      const data = await res.json();
      if (data.success && Array.isArray(data.pages)) {
        setPages(data.pages);
      } else {
        if (pages.length === 0) {
          setActionMessage({ text: data.error || "Failed to load pages.", type: "error" });
        }
      }
    } catch (err: any) {
      if (pages.length === 0) {
        setActionMessage({ text: "Failed to load pages: " + err.message, type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pages.length === 0) {
      fetchPages();
    }
  }, []);

  const handleResetToOriginal = async (slug: string) => {
    try {
      const res = await fetch("/api/admin/pagebuilder/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage({ text: data.message, type: "success" });
        setResetConfirmSlug(null);
        fetchPages();
      } else {
        setActionMessage({ text: data.error || "Reset failed.", type: "error" });
      }
    } catch (e: any) {
      setActionMessage({ text: "Reset error: " + e.message, type: "error" });
    }
  };

  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());
    const matchesTemplate = templateFilter === "all" || p.template === templateFilter;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesTemplate && matchesStatus;
  });

  const templateOptions = [
    { value: "all", label: "All Templates" },
    { value: "homepage", label: "Homepage" },
    { value: "prayer_text", label: "Prayer Text" },
    { value: "festival", label: "Festival" },
    { value: "article", label: "Article" },
    { value: "legal_informational", label: "Legal & Info" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Info */}
      <div className="bg-[#FFF9F0] border border-[#C9A45C]/35 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧱</span>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#4A1216]">
              Visual Page Builder Management
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#34251D]/75 mt-1 max-w-2xl leading-relaxed">
            Manage every section, container, block, and SEO field across all pages without touching code. Sacred scripture remains locked and byte-for-byte protected.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/admin/pagebuilder/test-preview"
            className="inline-flex items-center gap-1.5 bg-[#C95716] hover:bg-[#A8450F] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <span>🧪</span> Test Preview Sandbox
          </a>
        </div>
      </div>

      {actionMessage && (
        <div
          className={`p-4 rounded-lg text-xs font-semibold flex items-center justify-between ${
            actionMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
              : "bg-red-50 text-red-800 border border-red-300"
          }`}
        >
          <span>{actionMessage.text}</span>
          <button
            onClick={() => setActionMessage(null)}
            className="text-stone-500 hover:text-stone-800 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-white border border-[#C9A45C]/25 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#34251D]/40 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by slug or page title..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C95716]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white text-[#34251D] focus:ring-2 focus:ring-[#C95716]"
          >
            {templateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white text-[#34251D] focus:ring-2 focus:ring-[#C95716]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <span className="text-xs text-[#34251D]/60 font-mono ml-auto">
            {filteredPages.length} {filteredPages.length === 1 ? "Page" : "Pages"}
          </span>
        </div>
      </div>

      {/* Table of Pages */}
      <div className="bg-white border border-[#C9A45C]/30 rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#34251D]/60 font-mono">
            Loading pages from repository...
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#34251D]/60">
            No pages found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFF9F0] border-b border-[#C9A45C]/25 text-[11px] font-bold uppercase tracking-wider text-[#4A1216]">
                  <th className="py-3 px-4">Page Title & Slug</th>
                  <th className="py-3 px-4">Template</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {filteredPages.map((page) => (
                  <tr key={page.slug} className="hover:bg-[#FFFDF9] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#4A1216] text-sm">
                        {page.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-[11px] text-[#34251D]/60 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                          /{page.slug === "home" ? "" : page.slug}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-stone-400">
                          (Read-Only URL)
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize inline-block bg-[#C9A45C]/15 text-[#4A1216] font-semibold text-[11px] px-2.5 py-1 rounded-full border border-[#C9A45C]/30 font-mono">
                        {page.template.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          page.status === "published"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {page.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#34251D]/75">
                      v{page.version}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/admin/pagebuilder/${page.slug}`}
                        className="inline-flex items-center gap-1 bg-[#4A1216] hover:bg-[#681B20] text-white px-3 py-1.5 rounded text-xs font-bold transition-all shadow-xs"
                      >
                        <span>✏️</span> Edit Blocks
                      </a>
                      <a
                        href={page.slug === "home" ? "/" : `/${page.slug.replace(/__/g, "/")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-[#34251D] px-2.5 py-1.5 rounded text-xs font-semibold border border-stone-300 transition-all"
                      >
                        <span>👁️</span> Live
                      </a>
                      {page.hasOriginalSnapshot && (
                        <button
                          type="button"
                          onClick={() => setResetConfirmSlug(page.slug)}
                          className="inline-flex items-center gap-1 bg-stone-50 hover:bg-amber-50 text-amber-900 border border-amber-300/60 px-2.5 py-1.5 rounded text-xs font-semibold transition-all"
                          title="Reset to Original Baseline Snapshot"
                        >
                          <span>↺</span> Reset
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Reset to Original */}
      {resetConfirmSlug && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-brass-gold space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <span className="text-3xl">⚠️</span>
              <h3 className="font-serif-display text-lg font-bold text-[#4A1216]">
                Confirm Reset to Original
              </h3>
            </div>
            <p className="text-xs text-[#34251D]/80 leading-relaxed">
              Are you sure you want to reset <b>/{resetConfirmSlug}</b> back to its verified original baseline snapshot? Any uncommitted block additions or custom edits will be reverted.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetConfirmSlug(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleResetToOriginal(resetConfirmSlug)}
                className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all"
              >
                Yes, Revert to Baseline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
