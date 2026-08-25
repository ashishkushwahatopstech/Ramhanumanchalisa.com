"use client";

import React, { useState } from "react";

interface FaqItem {
  id: string;
  pageSlug: string;
  question: string;
  answer: string;
  order: number;
}

interface FaqManagerFormProps {
  initialFaqs: FaqItem[];
}

export default function FaqManagerForm({ initialFaqs }: FaqManagerFormProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pageSlug, setPageSlug] = useState<string>("path-vidhi");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [order, setOrder] = useState<number>(0);
  
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resetForm = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setOrder(0);
  };

  const handleEdit = (faq: FaqItem) => {
    setEditingId(faq.id);
    setPageSlug(faq.pageSlug);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(faq.order);
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
    } catch (err) {
      setMessage({ text: "Network error occurred", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      id: editingId,
      pageSlug,
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
    } catch (err) {
      setMessage({ text: "Network error occurred", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs">
      
      {/* Form Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            {editingId ? "✏️ Edit FAQ Entry" : "➕ Create New FAQ Entry"}
          </h3>

          {message && (
            <div
              className={`p-3 rounded font-bold text-center ${
                message.type === "success"
                  ? "bg-marigold/20 text-maroon-deep border border-marigold"
                  : "bg-vermilion/10 text-vermilion border border-vermilion/30"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Target Page */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Target Page Slug</label>
              <select
                value={pageSlug}
                onChange={(e) => setPageSlug(e.target.value)}
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
              >
                <option value="path-vidhi">Path Vidhi Page (/shri-hanuman-chalisa-path-vidhi)</option>
                <option value="benefits">Benefits Hub Page (/hanuman-chalisa-benefits)</option>
                <option value="general-faq">General FAQ Page (/faq)</option>
                <option value="homepage">Homepage (/)</option>
              </select>
            </div>

            {/* Question */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Question (English or Hindi)</label>
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Can I recite the Chalisa at night?"
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Answer */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Answer</label>
              <textarea
                required
                rows={5}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write the detailed answer here..."
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown focus:outline-none focus:ring-1 focus:ring-marigold leading-relaxed"
              />
            </div>

            {/* Sorting Order */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Display Order (Sorting)</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-40 text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none"
              />
              <p className="text-[10px] text-charcoal-brown/50">Lighter numbers sort first (e.g. 0, 1, 2, ...)</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-stone-ivory hover:bg-stone-ivory/80 text-charcoal-brown border border-brass-gold/40 px-4 py-2.5 rounded font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-6 py-2.5 rounded font-bold uppercase tracking-wider border border-brass-gold shadow transition-colors cursor-pointer"
              >
                {isSubmitting ? "Saving..." : editingId ? "Update FAQ" : "Create FAQ"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* List Column */}
      <div className="space-y-4">
        <div className="bg-stone-ivory border border-brass-gold/30 p-4 rounded-lg shadow-sm h-[600px] overflow-y-auto space-y-4">
          <h4 className="font-serif-display text-sm uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Active FAQ List ({faqs.length})
          </h4>

          {faqs.length === 0 ? (
            <p className="text-xs text-charcoal-brown/50 text-center py-6">No FAQs created yet.</p>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-3 border border-brass-gold/15 bg-stone-ivory/50 rounded space-y-2"
                >
                  <div>
                    <span className="text-[9px] uppercase font-bold text-brass-gold block mb-1">
                      Page: {faq.pageSlug} (Order: {faq.order})
                    </span>
                    <h5 className="font-bold text-charcoal-brown uppercase leading-tight line-clamp-2">
                      {faq.question}
                    </h5>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-brass-gold/10">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="flex-1 bg-marigold hover:bg-maroon-deep text-maroon-deep hover:text-stone-ivory py-1 rounded text-center font-bold uppercase text-[9px] border border-brass-gold/30 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="flex-1 bg-vermilion/10 hover:bg-vermilion text-vermilion hover:text-stone-ivory py-1 rounded text-center font-bold uppercase text-[9px] border border-vermilion/20 transition-colors"
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
  );
}
