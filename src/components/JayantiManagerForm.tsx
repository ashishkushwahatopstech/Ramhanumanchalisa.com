"use client";

import React, { useState } from "react";

interface Config {
  id: string;
  year: number;
  date: string;
  pujaMuhurat: string;
  description: string | null;
}

interface JayantiManagerFormProps {
  initialConfigs: Config[];
}

export default function JayantiManagerForm({ initialConfigs }: JayantiManagerFormProps) {
  const [configs, setConfigs] = useState<Config[]>(initialConfigs);
  
  // Form States
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [date, setDate] = useState<string>("");
  const [pujaMuhurat, setPujaMuhurat] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleEdit = (conf: Config) => {
    setYear(conf.year);
    setDate(conf.date);
    setPujaMuhurat(conf.pujaMuhurat);
    setDescription(conf.description || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      year,
      date,
      pujaMuhurat,
      description,
    };

    try {
      const res = await fetch("/api/admin/jayanti", {
        method: "POST", // upserts based on year
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        // Upsert state
        const exists = configs.some((c) => c.year === year);
        if (exists) {
          setConfigs(configs.map((c) => (c.year === year ? data : c)));
        } else {
          setConfigs([data, ...configs].sort((a, b) => b.year - a.year));
        }
        setMessage({ text: `Jayanti config for year ${year} saved successfully!`, type: "success" });
        // Clear fields except year
        setDate("");
        setPujaMuhurat("");
        setDescription("");
      } else {
        setMessage({ text: data.error || "Failed to save config", type: "error" });
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
            Configure Jayanti Dates (साल के अनुसार तिथियां)
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
            {/* Year */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Target Year</label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
                className="w-40 text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none"
              />
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Jayanti Date (Devotional Format)</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Thursday, April 2, 2026"
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Muhurat */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Puja Muhurat Timings</label>
              <input
                type="text"
                required
                value={pujaMuhurat}
                onChange={(e) => setPujaMuhurat(e.target.value)}
                placeholder="e.g. 06:11 AM to 08:30 AM (Sunrise Puja)"
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Additional Details / Moon timings (Tithis)</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Purnima Tithi begins at 06:12 PM on April 1..."
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown focus:outline-none focus:ring-1 focus:ring-marigold leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-6 py-2.5 rounded font-bold uppercase tracking-wider border border-brass-gold shadow transition-colors cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Save Config"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* List Column */}
      <div className="space-y-4">
        <div className="bg-stone-ivory border border-brass-gold/30 p-4 rounded-lg shadow-sm h-[600px] overflow-y-auto space-y-4">
          <h4 className="font-serif-display text-sm uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Configured Years ({configs.length})
          </h4>

          {configs.length === 0 ? (
            <p className="text-xs text-charcoal-brown/50 text-center py-6">No configs saved yet. Using static fallback page configuration.</p>
          ) : (
            <div className="space-y-3">
              {configs.map((conf) => (
                <div
                  key={conf.id}
                  className="p-3 border border-brass-gold/15 bg-stone-ivory/50 rounded space-y-2"
                >
                  <div className="space-y-1">
                    <h5 className="font-bold text-charcoal-brown uppercase text-sm">
                      Year {conf.year}
                    </h5>
                    <p className="text-xs text-maroon-deep font-semibold">
                      Date: {conf.date}
                    </p>
                    <p className="text-[10px] text-brass-gold font-bold uppercase tracking-wide">
                      Muhurat: {conf.pujaMuhurat}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-brass-gold/10">
                    <button
                      onClick={() => handleEdit(conf)}
                      className="w-full bg-marigold hover:bg-maroon-deep text-maroon-deep hover:text-stone-ivory py-1.5 rounded text-center font-bold uppercase text-[9px] border border-brass-gold/30 transition-colors"
                    >
                      Load & Edit
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
