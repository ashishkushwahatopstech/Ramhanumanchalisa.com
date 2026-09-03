"use client";

import React, { useState } from "react";

export interface FaqItem {
  id: string;
  pageSlug: string;
  question: string;
  answer: string;
  order: number;
}

interface FaqManagerFormProps {
  initialFaqs: FaqItem[];
}

const PAGE_OPTIONS = [
  { slug: "homepage", label: "Homepage (/)" },
  { slug: "path-vidhi", label: "Path Vidhi (/shri-hanuman-chalisa-path-vidhi)" },
  { slug: "meaning", label: "Meaning & Translation (/hanuman-chalisa-meaning)" },
  { slug: "audio", label: "Synced Audio MP3 (/hanuman-chalisa-audio-mp3)" },
  { slug: "pdf", label: "PDF Download & Print (/hanuman-chalisa-pdf)" },
  { slug: "benefits", label: "Benefits Hub (/hanuman-chalisa-benefits)" },
  { slug: "hanumanashtak", label: "Sankat Mochan Hanumanashtak (/sankat-mochan-hanumanashtak)" },
  { slug: "aarti", label: "Hanuman Aarti (/hanuman-aarti)" },
  { slug: "bajrang-baan", label: "Bajrang Baan (/bajrang-baan)" },
  { slug: "ram-hanuman-chalisa", label: "Ram-Hanuman Connection (/ram-hanuman-chalisa)" },
  { slug: "hanuman-jayanti", label: "Hanuman Jayanti (/hanuman-jayanti)" },
  { slug: "general-faq", label: "General FAQ Page (/faq)" },
  { slug: "about", label: "About Us (/about)" },
  { slug: "contact", label: "Contact Us (/contact)" },
  { slug: "custom", label: "➕ Custom Page Slug / Path..." },
];

export default function FaqManagerForm({ initialFaqs }: FaqManagerFormProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);

  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPageOption, setSelectedPageOption] = useState<string>("homepage");
  const [customPageSlug, setCustomPageSlug] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [order, setOrder] = useState<number>(0);

  // Filter state for viewing list by page
  const [filterPage, setFilterPage] = useState<string>("all");

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const activePageSlug = selectedPageOption === "custom" ? customPageSlug.trim().toLowerCase() : selectedPageOption;

  const resetForm = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setOrder(0);
    if (selectedPageOption === "custom") {
      setCustomPageSlug("");
    }
  };

  const handleEdit = (faq: FaqItem) => {
    setEditingId(faq.id);
    const matchedOption = PAGE_OPTIONS.find((p) => p.slug === faq.pageSlug);
    if (matchedOption) {
      setSelectedPageOption(faq.pageSlug);
      setCustomPageSlug("");
    } else {
      setSelectedPageOption("custom");
      setCustomPageSlug(faq.pageSlug);
    }
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(faq.order);
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ entry?")) return;

    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFaqs(faqs.filter((f) => f.id !== id));
        setMessage({ text: "FAQ deleted successfully!", type: "success" });
        if (editingId === id) resetForm();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to delete FAQ", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error occurred", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePageSlug) {
      alert("Please select or enter a page slug for this FAQ.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      id: editingId,
      pageSlug: activePageSlug,
      question,
      answer,
      order,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/admin/faqs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (editingId) {
          setFaqs(faqs.map((f) => (f.id === editingId ? data : f)));
          setMessage({ text: "FAQ updated successfully!", type: "success" });
        } else {
          setFaqs([...faqs, data].sort((a, b) => a.order - b.order));
          setMessage({ text: "FAQ created successfully!", type: "success" });
        }
        resetForm();
      } else {
        setMessage({ text: data.error || "Failed to save FAQ", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error occurred", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered FAQs
  const filteredFaqs =
    filterPage === "all"
      ? faqs
      : faqs.filter(
          (f) =>
            f.pageSlug === filterPage ||
            (filterPage === "general-faq" && f.pageSlug === "faq") ||
            (filterPage === "path-vidhi" && f.pageSlug === "shri-hanuman-chalisa-path-vidhi")
        );

  return (
    <div className="space-y-8 text-xs">
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center justify-between shadow-md text-sm font-semibold ${
            message.type === "success"
              ? "bg-emerald-900/20 border-2 border-emerald-600 text-emerald-800"
              : "bg-red-900/20 border-2 border-red-600 text-red-800"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs font-bold underline ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Page Filter Bar */}
      <div className="bg-stone-ivory border-2 border-brass-gold/40 p-4 rounded-xl shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase font-bold text-maroon-deep flex items-center gap-1.5">
            <span>🔍</span> Filter FAQs By Target Page:
          </span>
          <span className="text-xs font-bold text-brass-gold">
            Showing {filteredFaqs.length} of {faqs.length} total FAQs
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setFilterPage("all")}
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
              filterPage === "all"
                ? "bg-maroon-deep text-white shadow-sm"
                : "bg-white border border-brass-gold/30 text-charcoal-brown hover:bg-marigold/20"
            }`}
          >
            All Pages ({faqs.length})
          </button>

          {PAGE_OPTIONS.filter((p) => p.slug !== "custom").map((p) => {
            const count = faqs.filter(
              (f) =>
                f.pageSlug === p.slug ||
                (p.slug === "general-faq" && f.pageSlug === "faq") ||
                (p.slug === "path-vidhi" && f.pageSlug === "shri-hanuman-chalisa-path-vidhi")
            ).length;

            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setFilterPage(p.slug)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
                  filterPage === p.slug
                    ? "bg-maroon-deep text-white shadow-sm"
                    : "bg-white border border-brass-gold/30 text-charcoal-brown hover:bg-marigold/20"
                }`}
              >
                {p.label.split(" (")[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-ivory border-2 border-brass-gold/40 p-6 rounded-xl shadow-sm space-y-4">
            <div className="border-b border-brass-gold/20 pb-2 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase text-brass-gold">
                  {editingId ? "✏️ Edit Mode" : "✨ Create New FAQ"}
                </span>
                <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep">
                  {editingId ? "Update Page FAQ Entry" : "Add FAQ to Any Page"}
                </h3>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-charcoal-brown/70 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Target Page Selection */}
              <div className="space-y-1.5">
                <label className="block uppercase font-bold text-maroon-deep">
                  Target Page <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPageOption}
                  onChange={(e) => setSelectedPageOption(e.target.value)}
                  className="w-full text-xs bg-white border border-brass-gold/40 rounded p-2.5 text-charcoal-brown font-semibold outline-none focus:border-maroon-deep"
                >
                  {PAGE_OPTIONS.map((opt) => (
                    <option key={opt.slug} value={opt.slug}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Page Slug input if Custom is chosen */}
              {selectedPageOption === "custom" && (
                <div className="space-y-1.5 bg-marigold/10 p-3 rounded-lg border border-marigold/40">
                  <label className="block uppercase font-bold text-maroon-deep">
                    Enter Custom Page Slug / Path (e.g. &quot;my-custom-page&quot; or &quot;blog/post-slug&quot;)
                  </label>
                  <input
                    type="text"
                    required
                    value={customPageSlug}
                    onChange={(e) => setCustomPageSlug(e.target.value)}
                    placeholder="e.g. hanuman-chalisa-meaning or career"
                    className="w-full text-xs bg-white border border-brass-gold/40 rounded p-2 text-charcoal-brown outline-none"
                  />
                  <p className="text-[11px] text-charcoal-brown/60">
                    This FAQ will be rendered on the page matching this slug.
                  </p>
                </div>
              )}

              {/* Question */}
              <div className="space-y-1.5">
                <label className="block uppercase font-bold text-maroon-deep">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. Can I recite the Hanuman Chalisa at night?"
                  className="w-full text-xs bg-white border border-brass-gold/40 rounded p-2.5 text-charcoal-brown outline-none focus:border-maroon-deep"
                />
              </div>

              {/* Answer */}
              <div className="space-y-1.5">
                <label className="block uppercase font-bold text-maroon-deep">
                  Answer (Search Console Answer) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write the comprehensive, devotional answer here..."
                  className="w-full text-xs bg-white border border-brass-gold/40 rounded p-3 text-charcoal-brown outline-none focus:border-maroon-deep leading-relaxed"
                />
              </div>

              {/* Sorting Order */}
              <div className="space-y-1.5">
                <label className="block uppercase font-bold text-maroon-deep">Display Order (Sorting)</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                  className="w-36 text-xs bg-white border border-brass-gold/40 rounded p-2 text-charcoal-brown font-semibold outline-none"
                />
                <p className="text-[10px] text-charcoal-brown/50">Lower numbers appear first (0, 1, 2...)</p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-brass-gold/20">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-stone-ivory hover:bg-stone-ivory/80 text-charcoal-brown border border-brass-gold/40 rounded font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-maroon-deep hover:bg-vermilion text-stone-ivory px-6 py-2.5 rounded font-bold uppercase tracking-wider border border-brass-gold shadow transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingId ? "Update FAQ" : "Save Page FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="space-y-4">
          <div className="bg-stone-ivory border-2 border-brass-gold/40 p-4 rounded-xl shadow-sm max-h-[700px] overflow-y-auto space-y-4">
            <div className="border-b border-brass-gold/20 pb-2">
              <h4 className="font-serif-display text-sm uppercase font-bold text-maroon-deep">
                {filterPage === "all" ? "All Page FAQs" : `FAQs for ${filterPage}`} ({filteredFaqs.length})
              </h4>
            </div>

            {filteredFaqs.length === 0 ? (
              <p className="text-xs text-charcoal-brown/50 text-center py-6 italic">
                No FAQs found for this page filter. Add one using the form!
              </p>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-3.5 border border-brass-gold/20 bg-white rounded-lg space-y-2 shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] uppercase font-bold bg-marigold/20 text-maroon-deep px-2 py-0.5 rounded border border-marigold/40">
                          {faq.pageSlug}
                        </span>
                        <span className="text-[9px] font-mono text-charcoal-brown/50">
                          Order: {faq.order}
                        </span>
                      </div>
                      <h5 className="font-bold text-maroon-deep leading-snug line-clamp-2">
                        {faq.question}
                      </h5>
                      <p className="text-[11px] text-charcoal-brown/70 line-clamp-2 mt-1">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-brass-gold/10">
                      <button
                        type="button"
                        onClick={() => handleEdit(faq)}
                        className="flex-1 bg-marigold hover:bg-brass-gold text-maroon-deep py-1 rounded text-center font-bold uppercase text-[9px] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(faq.id)}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-1 rounded text-center font-bold uppercase text-[9px] border border-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
