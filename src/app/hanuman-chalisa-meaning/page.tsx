import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";
import hanumanChalisaData from "@/data/scriptures/hanuman-chalisa.json";
import { ScriptureVerse } from "@/types/scripture";

const verses: ScriptureVerse[] = hanumanChalisaData as ScriptureVerse[];

export const metadata = {
  title: "Hanuman Chalisa Meaning — Line by Line English & Hindi Translation",
  description: "Study the deep meaning of Hanuman Chalisa. Detailed word-by-word translations, stories, and historical interpretations in Hindi and English.",
};

export default function MeaningPage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Detailed Exposition (भावार्थ)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Hanuman Chalisa Verses & Meaning
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-2xl mx-auto leading-relaxed">
          Below is the complete line-by-line Sanskrit-Awadhi text of the Hanuman Chalisa. Explore literal translations, deep spiritual interpretations, related Puranic stories, and word-by-word meanings.
        </p>
      </div>

      <CarvedDivider icon="📖" />

      {/* AdSense Top Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
        Ad Slot — Page Top (Layout Stable Skeleton)
      </div>

      {/* Verses Meaning List */}
      <div className="space-y-12">
        {verses.map((verse) => {
          const isDoha = verse.id.startsWith("doha-");
          const verseNumberLabel = isDoha
            ? verse.id === "doha-01"
              ? "Introductory Doha 1"
              : verse.id === "doha-02"
              ? "Introductory Doha 2"
              : "Concluding Doha"
            : `Chaupai ${verse.verse_number}`;

          const anchorId = isDoha ? verse.id : `verse-${verse.verse_number}`;

          return (
            <div
              key={verse.id}
              id={anchorId}
              className="scroll-mt-20 p-6 sm:p-8 bg-stone-ivory border border-brass-gold/30 rounded-lg shadow-sm space-y-6 hover:shadow-md transition-shadow duration-200"
            >
              {/* Verse Label */}
              <div className="flex justify-between items-center border-b border-brass-gold/20 pb-3">
                <span className="text-xs font-bold tracking-wider text-brass-gold uppercase">
                  {verseNumberLabel}
                </span>
                <span className="text-[10px] text-charcoal-brown/50">
                  {isDoha ? "Couplet Meter" : "Quatrain Meter"}
                </span>
              </div>

              {/* Devanagari Script */}
              <div className="space-y-2">
                <p className="font-hindi-display text-2xl sm:text-3xl text-charcoal-brown leading-loose text-center font-bold tracking-wide">
                  {verse.devanagari}
                </p>
                {/* Transliteration */}
                <p className="text-xs sm:text-sm text-center text-charcoal-brown/70 italic max-w-xl mx-auto">
                  {verse.transliteration}
                </p>
              </div>

              {/* Translation Panels (Bilingual tabs or columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brass-gold/20">
                
                {/* English Meanings */}
                <div className="space-y-3 bg-stone-ivory/30 p-4 border border-brass-gold/10 rounded">
                  <h4 className="font-serif-display text-xs font-bold uppercase tracking-wider text-maroon-deep border-b border-brass-gold/10 pb-1 flex items-center gap-1">
                    🇺🇸 English Meaning
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="font-semibold text-charcoal-brown">
                      <span className="text-brass-gold text-[10px] uppercase font-bold mr-1 block sm:inline">Literal:</span>
                      {verse.literal_translation.en}
                    </p>
                    <p className="text-charcoal-brown/80 leading-relaxed">
                      <span className="text-brass-gold text-[10px] uppercase font-bold mr-1 block">Exposition:</span>
                      {verse.interpretive_meaning.en}
                    </p>
                  </div>
                </div>

                {/* Hindi Meanings */}
                <div className="space-y-3 bg-stone-ivory/30 p-4 border border-brass-gold/10 rounded">
                  <h4 className="font-serif-display text-xs font-bold uppercase tracking-wider text-maroon-deep border-b border-brass-gold/10 pb-1 flex items-center gap-1">
                    🇮🇳 हिंदी अर्थ
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="font-semibold text-charcoal-brown font-hindi-display text-base">
                      <span className="text-brass-gold text-[10px] uppercase font-bold mr-1 font-sans block sm:inline">शब्दार्थ:</span>
                      {verse.literal_translation.hi}
                    </p>
                    <p className="text-charcoal-brown/80 leading-relaxed font-hindi-display text-base">
                      <span className="text-brass-gold text-[10px] uppercase font-bold mr-1 font-sans block">भावार्थ:</span>
                      {verse.interpretive_meaning.hi}
                    </p>
                  </div>
                </div>

              </div>

              {/* Word by Word Dictionary (Expandable Detail) */}
              {verse.word_meanings && verse.word_meanings.length > 0 && (
                <details className="group border border-brass-gold/20 rounded bg-stone-ivory/40">
                  <summary className="cursor-pointer select-none px-4 py-2.5 font-serif-display text-xs font-bold tracking-widest text-maroon-deep hover:bg-marigold/10 transition-colors uppercase flex justify-between items-center">
                    <span>📚 Word-by-Word Dictionary (शब्दार्थ विश्लेषण)</span>
                    <span className="text-xs group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 border-t border-brass-gold/10 overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-brass-gold/20 text-brass-gold uppercase tracking-wider">
                          <th className="py-2 font-bold">Word (मूल शब्द)</th>
                          <th className="py-2 font-bold">IAST</th>
                          <th className="py-2 font-bold">Hindi Meaning</th>
                          <th className="py-2 font-bold">English Meaning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brass-gold/10 text-charcoal-brown">
                        {verse.word_meanings.map((wm, wi) => (
                          <tr key={wi} className="hover:bg-marigold/5 transition-colors">
                            <td className="py-2.5 font-bold font-hindi-display text-sm">{wm.word}</td>
                            <td className="py-2.5 italic">{wm.roman}</td>
                            <td className="py-2.5 font-hindi-display text-sm">{wm.meaning.hi}</td>
                            <td className="py-2.5">{wm.meaning.en}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              )}

              {/* Story / Puranic Legend Section */}
              {verse.story && verse.story.en && (
                <div className="bg-marigold/5 border-l-4 border-marigold p-4 rounded-r text-xs sm:text-sm">
                  <h5 className="font-serif-display font-bold uppercase tracking-wider text-maroon-deep mb-1.5 flex items-center gap-1">
                    📖 Puranic Legend (पौराणिक संदर्भ)
                  </h5>
                  <div className="space-y-2 text-charcoal-brown/95">
                    <p className="leading-relaxed">
                      {verse.story.en}
                    </p>
                    {verse.story.hi && (
                      <p className="font-hindi-display text-sm leading-relaxed border-t border-brass-gold/10 pt-2 text-charcoal-brown/85">
                        {verse.story.hi}
                      </p>
                    )}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* AdSense Footer Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Page Bottom (Layout Stable Skeleton)
      </div>

    </div>
  );
}
