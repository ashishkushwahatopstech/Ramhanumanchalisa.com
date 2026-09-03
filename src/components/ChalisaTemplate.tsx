"use client";

import React from "react";
import CarvedDivider from "@/components/CarvedDivider";
import DiyaCounter from "@/components/DiyaCounter";
import type { LocalizedChalisa } from "@/lib/getChalisaData";

interface ChalisaTemplateProps {
  data: LocalizedChalisa;
  isHomepage?: boolean;
}

export default function ChalisaTemplate({ data, isHomepage = false }: ChalisaTemplateProps) {
  // Extract Dohas and Chaupais from Localized verses list
  const doha1 = data.verses.find((v) => v.id === "doha-01");
  const doha2 = data.verses.find((v) => v.id === "doha-02");
  const dohaClosing = data.verses.find((v) => v.id === "doha-closing");
  const allChaupais = data.verses.filter((v) => v.id.startsWith("chaupai-"));
  const chaupais = isHomepage ? allChaupais.slice(0, 3) : allChaupais;

  // Translation groups for English full translation accordion
  const translationGroups = data.lang === "en" ? [
    {
      title: "Opening Dohas (Couplets 1 & 2)",
      verses: [
        ...(doha1 ? [{ label: "Opening Doha 1", transliteration: doha1.text.split("\n")[0], meaning: doha1.meaning }] : []),
        ...(doha2 ? [{ label: "Opening Doha 2", transliteration: doha2.text.split("\n")[0], meaning: doha2.meaning }] : []),
      ]
    },
    {
      title: "Chaupais 1 – 10: Divine Form & Incomparable Valor",
      verses: chaupais.slice(0, 10).map((v) => ({
        label: `Chaupai ${v.verse_number}`,
        transliteration: v.text.split("\n")[0],
        meaning: v.meaning
      }))
    },
    {
      title: "Chaupais 11 – 20: Feats for Lord Rama, Sugriva & Lanka",
      verses: chaupais.slice(10, 20).map((v) => ({
        label: `Chaupai ${v.verse_number}`,
        transliteration: v.text.split("\n")[0],
        meaning: v.meaning
      }))
    },
    {
      title: "Chaupais 21 – 30: Protection, Healing & Divine Siddhis",
      verses: chaupais.slice(20, 30).map((v) => ({
        label: `Chaupai ${v.verse_number}`,
        transliteration: v.text.split("\n")[0],
        meaning: v.meaning
      }))
    },
    {
      title: "Chaupais 31 – 40: Supreme Devotion, Grace & Phalasruti",
      verses: chaupais.slice(30, 40).map((v) => ({
        label: `Chaupai ${v.verse_number}`,
        transliteration: v.text.split("\n")[0],
        meaning: v.meaning
      }))
    },
    {
      title: "Concluding Doha: Dwelling in the Devotee's Heart",
      verses: [
        ...(dohaClosing ? [{ label: "Concluding Doha", transliteration: dohaClosing.text.split("\n")[0], meaning: dohaClosing.meaning }] : []),
      ]
    }
  ] : [];

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };

  return (
    <div className="space-y-12">
      {/* FAQ Schema Insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
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
            
            <h1 className="font-serif-display text-xl sm:text-2xl text-maroon-deep uppercase tracking-widest font-bold border-b border-brass-gold/30 pb-2 mb-6">
              {data.h1}
            </h1>

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
        {data.lang === "en" && (
          <div className="bg-stone-ivory border-2 border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl uppercase tracking-wider font-bold text-maroon-deep">
              How to Read the English Transliteration
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-brown/85 leading-relaxed">
              The verses presented below feature phonetic English transliteration (Romanized Awadhi), allowing devotees to chant each sacred syllable with authentic pronunciation even without reading Devanagari script. Transliteration preserves the musical rhythm and chanting resonance of Tulsidas's poetry, whereas a translation explains its theological and spiritual meaning. To study the line-by-line meaning of each verse, explore our <a href="#full-translation" className="text-vermilion hover:text-marigold underline font-semibold">Hanuman Chalisa in English — Full Translation</a> section below.
            </p>
          </div>
        )}

        <div className="text-center">
          <h3 className="font-serif-display text-2xl uppercase tracking-wider font-bold text-maroon-deep">
            {data.lang === "hi" ? (isHomepage ? "चालीसा चौपाई (प्रारंभिक श्लोक)" : "चालीसा चौपाई — श्लोक") : "Chalisa Chaupais — The Verses"}
          </h3>
          <p className="text-xs text-charcoal-brown/70 mt-1">
            {isHomepage ? "श्री हनुमान चालीसा के पवित्र प्रारंभिक श्लोक। संपूर्ण ४० चौपाइयों व शब्दार्थ विश्लेषण हेतु नीचे दिए गए लिंक पर जाएं।" : data.intro}
          </p>
        </div>

        <div className="space-y-6">
          {chaupais.map((verse) => (
            <div
              key={verse.id}
              id={`verse-${verse.verse_number}`}
              className="p-6 bg-stone-ivory border-l-4 border-maroon-deep border-r border-t border-b border-brass-gold/30 rounded-r shadow-sm space-y-4 hover:shadow-md transition-shadow duration-200 scroll-mt-24"
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

        {/* Homepage CTA Callout to Meaning Page */}
        {isHomepage && (
          <div className="p-8 sm:p-10 bg-gradient-to-b from-stone-ivory to-marigold/15 border-2 border-brass-gold/50 rounded-xl shadow-md text-center space-y-5 my-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-maroon-deep text-marigold text-2xl shadow-inner border border-brass-gold/40">
              📖
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-maroon-deep bg-marigold/30 px-2.5 py-0.5 rounded border border-marigold inline-block">
                Complete Scripture • संपूर्ण भावार्थ
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-maroon-deep">
                Read All 40 Chaupais with Line-by-Line Meaning
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-brown/80 max-w-xl mx-auto leading-relaxed">
                Study the complete 40 verses of the Shree Hanuman Chalisa along with word-by-word Sanskrit-Awadhi vocabulary, authentic Hindi translation, English exposition, audio recitation, and Puranic background.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="/hanuman-chalisa-meaning"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-maroon-deep text-marigold hover:bg-maroon-deep/90 border-2 border-brass-gold font-bold text-sm uppercase tracking-wider rounded-lg shadow-md hover:shadow-xl transition-all group hover:scale-105"
              >
                <span>Read the full meaning, chaupai by chaupai</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </div>
        )}

        {/* Doha Closing (Rendered when not in homepage preview mode) */}
        {!isHomepage && dohaClosing && (
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

      {/* English Full Translation Section */}
      {data.lang === "en" && (
        <section id="full-translation" className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
              Complete Verses Meaning (संपूर्ण भावार्थ)
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl uppercase tracking-wider font-bold text-maroon-deep">
              Hanuman Chalisa in English — Full Translation
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-brown/70 max-w-2xl mx-auto leading-relaxed">
              Read the complete verse-by-verse English translation of Goswami Tulsidas's sacred hymn. Click on any section below to expand and study the concise theological meaning of all 40 chaupais and dohas.
            </p>
          </div>

          <div className="space-y-4">
            {translationGroups.map((group, gIdx) => (
              <details
                key={gIdx}
                className="bg-stone-ivory border-2 border-brass-gold/30 rounded-lg p-4 sm:p-5 shadow-sm group transition-all duration-200 hover:border-brass-gold"
                open={gIdx === 0}
              >
                <summary className="font-serif-display font-bold text-maroon-deep text-sm sm:text-base cursor-pointer flex justify-between items-center select-none">
                  <span>{group.title}</span>
                  <span className="text-xs text-brass-gold font-sans font-semibold group-open:text-vermilion">
                    Tap to Expand &darr;
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-brass-gold/20 space-y-3">
                  {group.verses.map((v, vIdx) => (
                    <div key={vIdx} className="p-3 bg-stone-ivory/80 rounded border border-brass-gold/20 space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-maroon-deep">
                        <span>{v.label}</span>
                        <span className="text-[11px] text-brass-gold italic font-normal truncate max-w-[240px]">
                          &ldquo;{v.transliteration}&rdquo;
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal-brown/90 leading-relaxed font-sans">
                        {v.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <CarvedDivider icon="🕉️" />
        </section>
      )}

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

          {data.lang === "en" && (
            <div className="p-4 bg-marigold/10 border border-brass-gold/40 rounded-lg space-y-2">
              <h2 className="font-serif-display text-sm sm:text-base uppercase tracking-wider font-bold text-maroon-deep">
                Is 'Ram Chalisa' the Same as 'Hanuman Chalisa'?
              </h2>
              <p className="text-xs text-charcoal-brown/85 leading-relaxed">
                No, the "Ram Chalisa" and "Hanuman Chalisa" are distinct devotional hymns. The Hanuman Chalisa is Goswami Tulsidas's 40-verse poem praising Lord Hanuman's valor and loyalty, while the Shri Ram Chalisa is dedicated directly to Lord Rama's life, virtues, and worship. However, because Hanuman is the supreme devotee of Lord Rama and Rama's name is chanted throughout the hymn, devotees often search for and recite both prayers together.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {data.faqs
              .filter((faq) => data.lang !== "en" || faq.question !== "Is 'Ram Chalisa' the Same as 'Hanuman Chalisa'?")
              .map((faq, idx) => (
                <div key={idx} className="space-y-1 text-sm">
                  <h4 className="font-bold text-charcoal-brown">{faq.question}</h4>
                  <p
                    className="text-xs text-charcoal-brown/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              ))}
          </div>
        </div>

      </section>

    </div>
  );
}
