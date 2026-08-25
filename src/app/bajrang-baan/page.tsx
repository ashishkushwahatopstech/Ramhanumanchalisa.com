import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";
import bajrangBaanData from "@/data/scriptures/bajrang-baan.json";
import { ScriptureVerse } from "@/types/scripture";

const verses: ScriptureVerse[] = bajrangBaanData as ScriptureVerse[];

export const metadata = {
  title: "Shree Bajrang Baan — Lyrics in English, Hindi & Full Translation",
  description: "Read the powerful Bajrang Baan with original Devanagari verses, English transliteration, line-by-line Hindi/English meanings, and protection rules.",
};

export default function BajrangBaanPage() {
  const openingDohas = verses.filter((v) => v.id.startsWith("doha-") && v.id !== "doha-closing");
  const closingDoha = verses.find((v) => v.id === "doha-closing");
  const chaupais = verses.filter((v) => v.id.startsWith("chaupai-"));

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Protection Shield (सुरक्षा कवच)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Shree Bajrang Baan
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
          The Bajrang Baan is an arrow (baan) of protection dedicated to Lord Hanuman. Devotees chant it to dispel fear, remove negative influences, and overcome severe obstacles.
        </p>
      </div>

      <CarvedDivider icon="🏹" />

      {/* AdSense Top Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
        Ad Slot — Page Top (Layout Stable)
      </div>

      {/* 1. Opening Dohas */}
      {openingDohas.length > 0 && (
        <section className="p-6 bg-stone-ivory border-2 border-brass-gold text-charcoal-brown rounded shadow-sm text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-brass-gold">
            Opening Couplets (दोहा)
          </span>
          {openingDohas.map((doha) => (
            <div key={doha.id} className="space-y-2">
              <p className="font-hindi-display text-lg sm:text-xl leading-loose font-bold">
                {doha.devanagari}
              </p>
              <p className="text-xs text-charcoal-brown/60 italic">
                {doha.transliteration}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-maroon-deep">
                {doha.literal_translation.en}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* 2. Main Verses (Chaupais) */}
      <section className="space-y-6">
        <h3 className="font-serif-display text-xl uppercase tracking-wider font-bold text-center text-maroon-deep">
          The Bajrang Baan Verses
        </h3>

        <div className="space-y-6">
          {chaupais.map((verse) => (
            <div
              key={verse.id}
              className="p-6 bg-stone-ivory border-l-4 border-brass-gold border-r border-t border-b border-brass-gold/20 rounded-r shadow-sm space-y-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-[10px] font-bold text-brass-gold tracking-widest uppercase">
                Verse {verse.verse_number}
              </div>

              {/* Devanagari */}
              <p className="font-hindi-display text-lg sm:text-xl text-charcoal-brown tracking-wide leading-loose text-center font-bold">
                {verse.devanagari}
              </p>

              {/* Transliteration */}
              <p className="text-xs text-center text-charcoal-brown/70 italic max-w-lg mx-auto">
                {verse.transliteration}
              </p>

              {/* English Translation */}
              <div className="border-t border-brass-gold/25 pt-3">
                <p className="text-xs sm:text-sm text-charcoal-brown leading-relaxed text-center font-semibold">
                  {verse.literal_translation.en}
                </p>
                {verse.interpretive_meaning && verse.interpretive_meaning.en && (
                  <p className="text-[11px] text-charcoal-brown/60 mt-1.5 text-center leading-relaxed max-w-2xl mx-auto">
                    {verse.interpretive_meaning.en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Closing Doha */}
      {closingDoha && (
        <section className="p-6 bg-maroon-deep border-2 border-brass-gold text-stone-ivory rounded shadow-md text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-marigold">
            Concluding Couplet (दोहा)
          </span>
          <p className="font-hindi-display text-lg sm:text-xl leading-loose font-bold">
            {closingDoha.devanagari}
          </p>
          <p className="text-xs text-stone-ivory/70 italic">
            {closingDoha.transliteration}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-marigold">
            {closingDoha.literal_translation.en}
          </p>
        </section>
      )}

      {/* 4. Caution Guideline (SEO / Scholar E-E-A-T guideline) */}
      <section className="bg-vermilion/5 border-l-4 border-vermilion p-6 rounded-r space-y-3 text-sm leading-relaxed">
        <h4 className="font-serif-display font-bold uppercase tracking-wider text-vermilion flex items-center gap-1.5">
          ⚠️ Important Recitation Warning (सावधानी निर्देश)
        </h4>
        <p className="text-charcoal-brown/95">
          Unlike the Hanuman Chalisa, which is gentle and can be chanted casually at any time, the **Bajrang Baan** contains seed mantras (bij mantras like <i>hrim, klim, shrim</i>) and involves making a vow (shapath) in the name of Lord Rama to compel Hanuman to act.
        </p>
        <p className="text-charcoal-brown/85">
          Therefore, traditional pandits advise that the Bajrang Baan should **only** be recited when facing severe crisis, extreme fear, or insurmountable difficulties. It should not be chanted for trivial desires or material greed, and the chanter must maintain high physical and moral cleanliness (such as avoiding non-vegetarian food).
        </p>
      </section>

      {/* Related Content Links */}
      <section className="bg-stone-ivory border border-brass-gold/25 p-6 rounded-lg text-center space-y-3">
        <h4 className="font-serif-display text-sm font-bold uppercase text-maroon-deep">
          Related Devotional Chants (संबंधित पाठ)
        </h4>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
          <Link href="/" className="text-vermilion hover:text-marigold underline">
            Shree Hanuman Chalisa
          </Link>
          <span className="text-brass-gold/40">•</span>
          <Link href="/hanuman-chalisa-meaning" className="text-vermilion hover:text-marigold underline">
            Bilingual Meaning
          </Link>
          <span className="text-brass-gold/40">•</span>
          <Link href="/sankat-mochan-hanumanashtak" className="text-vermilion hover:text-marigold underline">
            Hanumanashtak
          </Link>
          <span className="text-brass-gold/40">•</span>
          <Link href="/hanuman-aarti" className="text-vermilion hover:text-marigold underline">
            Hanuman Aarti
          </Link>
        </div>
      </section>

      {/* AdSense Footer Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Page Bottom (Layout Stable)
      </div>

    </div>
  );
}
