"use client";

import React from "react";
import CarvedDivider from "@/components/CarvedDivider";
import DiyaCounter from "@/components/DiyaCounter";
import type { LocalizedChalisa } from "@/lib/getChalisaData";

interface ChalisaTemplateProps {
  data: LocalizedChalisa;
}

export default function ChalisaTemplate({ data }: ChalisaTemplateProps) {
  // Extract Dohas and Chaupais from Localized verses list
  const doha1 = data.verses.find((v) => v.id === "doha-01");
  const doha2 = data.verses.find((v) => v.id === "doha-02");
  const dohaClosing = data.verses.find((v) => v.id === "doha-closing");
  const chaupais = data.verses.filter((v) => v.id.startsWith("chaupai-"));

  const getScriptClass = (lang: string) => {
    switch (lang) {
      case "hi":
      case "te":
      case "bn":
      case "kn":
        return "font-hindi-display text-2xl sm:text-3xl text-charcoal-brown leading-loose text-center font-bold tracking-wide";
      default:
        return "font-serif-display text-lg sm:text-xl text-charcoal-brown leading-loose text-center font-bold tracking-wide";
    }
  };

  return (
    <div className="space-y-12">
      
      {/* 1. Garbhagriha Hero Section (Sanctum) */}
      <section className="relative overflow-hidden w-full bg-gradient-to-b from-marigold/5 to-transparent border border-brass-gold/20 rounded-lg shadow-sm max-w-4xl mx-auto">

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-4xl mx-auto py-8 space-y-6 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded-full border border-marigold">
            जय श्री राम • जय हनुमान
          </span>
          
          {/* Torana Arch Framing the Opening Doha */}
          <div className="torana-arch py-12 px-6 sm:px-12 rounded-t-full shadow-lg border-t-4 border-brass-gold flex flex-col items-center justify-center bg-stone-ivory/95">
            <span className="text-3xl filter drop-shadow mb-4 select-none">🕉️</span>
            
            <h2 className="font-serif-display text-xl sm:text-2xl text-maroon-deep uppercase tracking-widest font-bold border-b border-brass-gold/30 pb-2 mb-6">
              {data.h1}
            </h2>

            {/* Doha 1 & 2 Inside Sanctum */}
            <div className="space-y-6 max-w-2xl font-semibold">
              {doha1 && (
                <div className="space-y-2">
                  <p className={getScriptClass(data.lang)}>
                    {doha1.text}
                  </p>
                  {doha1.transliteration && (
                    <p className="font-sans text-xs tracking-wide text-maroon-deep/80 font-normal italic text-center">
                      &ldquo;{doha1.transliteration}&rdquo;
                    </p>
                  )}
                </div>
              )}
              
              <div className="w-16 h-0.5 bg-brass-gold/30 mx-auto" />
              
              {/* Doha 2 */}
              {doha2 && (
                <div className="space-y-2">
                  <p className={getScriptClass(data.lang)}>
                    {doha2.text}
                  </p>
                  {doha2.transliteration && (
                    <p className="font-sans text-xs tracking-wide text-maroon-deep/80 font-normal italic text-center">
                      &ldquo;{doha2.transliteration}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Live Diya Counter Block */}
          <div className="mt-8">
            <DiyaCounter />
          </div>
        </div>
      </section>

      <CarvedDivider icon="🔔" />

      {/* 2. Pillars Leading Off the Courtyard (Navigation Shortcuts) */}
      <section className="bg-stone-ivory border-2 border-brass-gold/40 p-6 sm:p-8 rounded-lg shadow-sm max-w-5xl mx-auto">
        <h3 className="font-serif-display text-lg text-center uppercase tracking-widest text-maroon-deep font-bold mb-6">
          Temple Courtyard Navigation
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/hanuman-chalisa-meaning"
            className="flex flex-col items-center p-4 bg-maroon-deep border border-brass-gold hover:border-marigold text-stone-ivory hover:text-marigold rounded text-center transition-all duration-300 hover:-translate-y-1 shadow-md"
          >
            <span className="text-2xl mb-2">📖</span>
            <span className="font-serif-display font-bold uppercase tracking-wider text-xs sm:text-sm">Bilingual Meaning</span>
            <span className="text-[10px] text-stone-ivory/60 mt-1">Line-by-line translations</span>
          </a>

          <a
            href="/hanuman-chalisa-audio-mp3"
            className="flex flex-col items-center p-4 bg-maroon-deep border border-brass-gold hover:border-marigold text-stone-ivory hover:text-marigold rounded text-center transition-all duration-300 hover:-translate-y-1 shadow-md"
          >
            <span className="text-2xl mb-2">🎵</span>
            <span className="font-serif-display font-bold uppercase tracking-wider text-xs sm:text-sm">Audio & Highlights</span>
            <span className="text-[10px] text-stone-ivory/60 mt-1">Play synced recitation</span>
          </a>

          <a
            href="/shri-hanuman-chalisa-path-vidhi"
            className="flex flex-col items-center p-4 bg-maroon-deep border border-brass-gold hover:border-marigold text-stone-ivory hover:text-marigold rounded text-center transition-all duration-300 hover:-translate-y-1 shadow-md"
          >
            <span className="text-2xl mb-2">✨</span>
            <span className="font-serif-display font-bold uppercase tracking-wider text-xs sm:text-sm">Path Vidhi</span>
            <span className="text-[10px] text-stone-ivory/60 mt-1">How and when to recite</span>
          </a>

          <a
            href="/hanuman-chalisa-pdf"
            className="flex flex-col items-center p-4 bg-maroon-deep border border-brass-gold hover:border-marigold text-stone-ivory hover:text-marigold rounded text-center transition-all duration-300 hover:-translate-y-1 shadow-md"
          >
            <span className="text-2xl mb-2">📄</span>
            <span className="font-serif-display font-bold uppercase tracking-wider text-xs sm:text-sm">PDF & Statuses</span>
            <span className="text-[10px] text-stone-ivory/60 mt-1">Download and share</span>
          </a>
        </div>
      </section>

      <CarvedDivider icon="🕉️" />

      {/* 3. AdSense Upper Slot Placeholder */}
      <div className="no-print w-full max-w-4xl mx-auto h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
        Ad Slot — Above the Fold (Layout Stable Skeleton)
      </div>

      {/* 4. Full 40 Verses (Chaupais) */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="font-serif-display text-2xl uppercase tracking-wider font-bold text-maroon-deep">
            {data.lang === "hi" ? "चालीसा चौपाई — श्लोक" : "Chalisa Chaupais — The Verses"}
          </h3>
          <p className="text-xs text-charcoal-brown/70 mt-1">
            {data.intro}
          </p>
        </div>

        <div className="space-y-6">
          {chaupais.map((verse) => (
            <div
              key={verse.id}
              className="p-6 bg-stone-ivory border-l-4 border-maroon-deep border-r border-t border-b border-brass-gold/30 rounded-r shadow-sm space-y-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Verse Header */}
              <div className="flex justify-between items-center text-xs font-bold text-brass-gold tracking-widest uppercase">
                <span>Chaupai {verse.verse_number}</span>
                <a
                  href={`/hanuman-chalisa-meaning#verse-${verse.verse_number}`}
                  className="text-vermilion hover:text-marigold transition-colors flex items-center gap-1 font-semibold"
                >
                  View Meaning &rarr;
                </a>
              </div>

              {/* Localized Verse Text */}
              <p className={getScriptClass(data.lang)}>
                {verse.text}
              </p>

              {/* English Transliteration (if not English page) */}
              {verse.transliteration && (
                <p className="text-xs sm:text-sm text-center text-charcoal-brown/70 italic max-w-xl mx-auto">
                  {verse.transliteration}
                </p>
              )}

              {/* Translation Meaning */}
              <div className="border-t border-brass-gold/20 pt-3">
                <p className="text-xs sm:text-sm text-charcoal-brown/90 leading-relaxed text-center font-semibold max-w-2xl mx-auto">
                  {verse.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Doha Closing */}
        {dohaClosing && (
          <div className="p-8 bg-maroon-deep border-2 border-brass-gold text-stone-ivory rounded shadow-md text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-marigold">
              Concluding Doha (दोहा)
            </span>
            <p className={getScriptClass(data.lang) + " !text-stone-ivory"}>
              {dohaClosing.text}
            </p>
            {dohaClosing.transliteration && (
              <p className="text-xs sm:text-sm italic text-stone-ivory/70 max-w-lg mx-auto">
                {dohaClosing.transliteration}
              </p>
            )}
            <div className="border-t border-brass-gold/30 pt-3">
              <p className="text-xs sm:text-sm text-marigold tracking-wide leading-relaxed font-semibold max-w-xl mx-auto">
                {dohaClosing.meaning}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 5. In-content AdSense Slot */}
      <div className="no-print w-full max-w-4xl mx-auto h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — In-Content (Layout Stable Skeleton)
      </div>

      {/* 6. Quick Benefits & Localized FAQs */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Benefits Box */}
        <div className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-6 rounded-lg shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-serif-display text-lg uppercase tracking-widest text-marigold font-bold">
              Blessings & Benefits
            </h3>
            <p className="text-xs text-stone-ivory/80 leading-relaxed">
              {data.meaningSummary}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2 border-t border-brass-gold/20 pt-2">
              <span>💪</span>
              <p className="text-stone-ivory/70"><strong>Fearlessness:</strong> Dispel anxiety, fear, and bad influences (Sankat Mochan).</p>
            </div>
            <div className="flex items-start gap-2">
              <span>🎓</span>
              <p className="text-stone-ivory/70"><strong>Wisdom:</strong> Boost intellectual clarity and focus (Kumati Nivaar Sumati Ke Sangee).</p>
            </div>
          </div>

          <div className="pt-2 border-t border-brass-gold/20">
            <a
              href="/hanuman-chalisa-benefits"
              className="text-xs uppercase font-bold text-marigold hover:text-stone-ivory underline transition-colors"
            >
              Read full benefits list &rarr;
            </a>
          </div>
        </div>

        {/* Localized FAQ Box */}
        <div className="bg-stone-ivory border-2 border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-widest text-maroon-deep font-bold">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1 text-sm">
                <h4 className="font-bold text-charcoal-brown">{faq.question}</h4>
                <p className="text-xs text-charcoal-brown/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
