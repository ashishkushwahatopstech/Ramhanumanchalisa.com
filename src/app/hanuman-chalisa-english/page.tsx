import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";
import hanumanChalisaData from "@/data/scriptures/hanuman-chalisa.json";
import { ScriptureVerse } from "@/types/scripture";

const verses: ScriptureVerse[] = hanumanChalisaData as ScriptureVerse[];

export const metadata = {
  title: "Hanuman Chalisa Lyrics in English — Transliteration & Translation",
  description: "Read the complete Hanuman Chalisa in English transliteration (romanized text) alongside clear English translations of all 40 verses.",
};

export default function EnglishLyricsPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Romanized Translation (English Script)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Hanuman Chalisa English Lyrics
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
          Perfect for daily recitation if you cannot read Devanagari. Follow the transliterated English syllables along with direct translation.
        </p>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* AdSense Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
        Ad Slot — Lyrics Page Top (Layout Stable Skeleton)
      </div>

      {/* Verses Layout */}
      <div className="space-y-8">
        {verses.map((verse) => {
          const isDoha = verse.id.startsWith("doha-");
          const verseLabel = isDoha
            ? verse.id === "doha-01"
              ? "Opening Doha 1"
              : verse.id === "doha-02"
              ? "Opening Doha 2"
              : "Concluding Doha"
            : `Chaupai ${verse.verse_number}`;

          return (
            <div
              key={verse.id}
              className="p-6 bg-stone-ivory border border-brass-gold/30 rounded shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-[10px] font-bold text-brass-gold tracking-widest uppercase mb-3">
                {verseLabel}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                
                {/* English Transliteration (Selectable lyrics) */}
                <div className="space-y-1">
                  <p className="font-serif-display text-base sm:text-lg font-bold text-maroon-deep leading-relaxed whitespace-pre-line">
                    {verse.transliteration}
                  </p>
                  <p className="text-[10px] text-charcoal-brown/40 uppercase font-bold tracking-widest pt-1">
                    Transliteration / Syllables
                  </p>
                </div>

                {/* English Translation */}
                <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-brass-gold/20 pt-3 md:pt-0 md:pl-6">
                  <p className="text-xs sm:text-sm text-charcoal-brown/90 leading-relaxed font-semibold">
                    {verse.literal_translation.en}
                  </p>
                  <p className="text-xs text-charcoal-brown/60 mt-2 leading-relaxed">
                    {verse.interpretive_meaning.en}
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* AdSense Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Lyrics Page Bottom (Layout Stable Skeleton)
      </div>

    </div>
  );
}
