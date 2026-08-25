"use client";

import React, { useState, useEffect } from "react";

export default function LanguageManagerForm() {
  const [lang, setLang] = useState("hi");
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [contentJSON, setContentJSON] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isValidJSON, setIsValidJSON] = useState(true);

  // Load language settings on mount & lang switch
  useEffect(() => {
    async function loadLangData() {
      setLoading(true);
      setMessage(null);
      try {
        const res = await fetch(`/api/admin/languages?lang=${lang}`);
        if (!res.ok) throw new Error("Failed to fetch language config");
        const data = await res.json();

        if (data.dbRecord) {
          setTitle(data.dbRecord.title);
          setMetaDescription(data.dbRecord.metaDescription);
          setPublished(data.dbRecord.published);
          
          // Format saved JSON
          try {
            const parsed = JSON.parse(data.dbRecord.contentJSON);
            setContentJSON(JSON.stringify(parsed, null, 2));
            setIsValidJSON(true);
          } catch {
            setContentJSON(data.dbRecord.contentJSON);
            setIsValidJSON(false);
          }
        } else {
          // Use static fallback configs
          const fallback = data.staticFallback;
          setTitle(fallback.title);
          setMetaDescription(fallback.metaDescription);
          setPublished(false);

          // Build clean content structure
          const structure = {
            h1: fallback.h1,
            intro: fallback.intro,
            meaningSummary: fallback.meaningSummary,
            verses: fallback.verses,
            faqs: fallback.faqs,
          };
          setContentJSON(JSON.stringify(structure, null, 2));
          setIsValidJSON(true);
        }
      } catch (error: any) {
        setMessage({ type: "error", text: error.message || "Failed to load database records." });
      } finally {
        setLoading(false);
      }
    }

    loadLangData();
  }, [lang]);

  // Real-time JSON validation check
  const handleJSONChange = (val: string) => {
    setContentJSON(val);
    try {
      JSON.parse(val);
      setIsValidJSON(true);
    } catch {
      setIsValidJSON(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidJSON) {
      setMessage({ type: "error", text: "Cannot save. The Content JSON structure is currently invalid." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/languages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          title,
          metaDescription,
          contentJSON: JSON.stringify(JSON.parse(contentJSON)),
          published,
        }),
      });

      if (!res.ok) throw new Error("Failed to save changes to the database.");
      setMessage({ type: "success", text: "Language configuration saved and applied successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save records." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {message && (
        <div
          className={`p-4 rounded text-sm ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-brown mb-2">
          Select Target Language
        </label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          disabled={loading || saving}
          className="w-full sm:w-1/3 bg-stone-ivory border border-brass-gold/40 rounded p-2 text-sm font-semibold focus:outline-none focus:border-maroon-deep text-charcoal-brown"
        >
          <option value="hi">हिंदी (Hindi - Root)</option>
          <option value="en">English (Translation & Transliteration)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm text-charcoal-brown/50 tracking-widest uppercase">
          Loading language configuration...
        </div>
      ) : (
        <>
          {/* Metadata */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-brown mb-2">
                SEO Page Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-stone-ivory border border-brass-gold/30 rounded p-2 text-sm focus:outline-none focus:border-maroon-deep text-charcoal-brown"
                placeholder="Target SEO Title Tag"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-brown mb-2">
                SEO Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                required
                rows={3}
                className="w-full bg-stone-ivory border border-brass-gold/30 rounded p-2 text-sm focus:outline-none focus:border-maroon-deep text-charcoal-brown"
                placeholder="Target SEO Meta Description Description"
              />
            </div>
          </div>

          {/* Published Switch */}
          <div className="flex items-center gap-3 bg-stone-ivory/50 border border-brass-gold/15 p-4 rounded">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-maroon-deep focus:ring-maroon-deep border-brass-gold/35 rounded"
            />
            <label htmlFor="published" className="text-xs font-bold uppercase tracking-wider text-charcoal-brown select-none">
              Publish Language Route (Serve live alternate page URLs)
            </label>
          </div>

          {/* Verses & FAQs Editor */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-brown">
                Content & Scripture Structure JSON
              </label>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                  isValidJSON ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800 animate-pulse"
                }`}
              >
                {isValidJSON ? "✓ Valid JSON" : "✗ Invalid JSON"}
              </span>
            </div>
            <p className="text-[10px] text-charcoal-brown/60 mb-2 leading-relaxed">
              Caution: Edits inside this block must match the structural format containing <code>h1</code>, <code>intro</code>, <code>meaningSummary</code>, <code>verses</code> (array of 43 items: dohas and chaupais), and <code>faqs</code>.
            </p>
            <textarea
              value={contentJSON}
              onChange={(e) => handleJSONChange(e.target.value)}
              rows={22}
              className="w-full font-mono text-xs bg-charcoal-brown text-stone-ivory rounded p-4 focus:outline-none focus:ring-1 focus:ring-marigold leading-relaxed border border-brass-gold/30 shadow-inner"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={saving || !isValidJSON}
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep disabled:bg-charcoal-brown/20 disabled:text-charcoal-brown/40 px-6 py-2.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300"
            >
              {saving ? "Saving Changes..." : "Save Configuration"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
