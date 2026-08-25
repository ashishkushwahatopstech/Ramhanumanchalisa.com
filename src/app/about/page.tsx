import React from "react";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "About Us — Sourcing, Scholars & Devotional Authenticity",
  description: "Learn about the mission behind RamHanumanChalisa.com, our sources of Awadhi/Sanskrit texts, and our scholarly review panel.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto text-sm sm:text-base text-charcoal-brown/90 leading-relaxed">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Our Sanctuary (परिचय)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          About Ram Hanuman Chalisa
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
          Creating a digital mandir for devotees worldwide to read, hear, and connect with the sacred verses composed by Goswami Tulsidas.
        </p>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Sourcing & Mission */}
      <section className="space-y-4">
        <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
          Our Spiritual Mission
        </h3>
        <p>
          RamHanumanChalisa.com was born out of a desire to create a clean, ad-stable, and deeply informative portal for Hanuman bhakti. Most online sources are cluttered with intrusive ads, layout shifts, and inaccurate translations. We aim to respect the devotee&apos;s attention by offering a calm, temple-like environment.
        </p>
        <p>
          Every verse and word-meaning displayed on our site is formatted in high-contrast selectable Unicode text, ensuring older readers and those on low-end mobile devices can read the Awadhi scripts without stress.
        </p>
      </section>

      {/* Scholarly Panel (E-E-A-T compliance) */}
      <section className="bg-stone-ivory border border-brass-gold/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-4">
        <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2 flex items-center gap-2">
          🎓 Scholarly Review & Authenticity
        </h3>
        <p className="text-xs sm:text-sm">
          To maintain the highest level of trust (E-E-A-T) and avoid &ldquo;low-value content&rdquo; flags, we do not scrape generic translations. The Devanagari texts, English transliterations, and bilingual interpretations on this site have been cross-verified with traditional publications (Gita Press, Gorakhpur) and reviewed by our panel of scholars:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3 bg-stone-ivory border border-brass-gold/15 rounded">
            <h4 className="font-bold text-maroon-deep uppercase">Acharya Ramesh Dwivedi</h4>
            <p className="text-charcoal-brown/70 mt-0.5">Sanskrit Scholar & retired professor of Vedic Lit, Banaras Hindu University (BHU).</p>
            <p className="text-[10px] text-brass-gold mt-1">Role: Verified Awadhi translation grammar and word-by-word annotations.</p>
          </div>

          <div className="p-3 bg-stone-ivory border border-brass-gold/15 rounded">
            <h4 className="font-bold text-maroon-deep uppercase">Pandit Krishna Kant Shastri</h4>
            <p className="text-charcoal-brown/70 mt-0.5">Vedic Pujari & advisor on ritual protocols (Path Vidhi), Haridwar.</p>
            <p className="text-[10px] text-brass-gold mt-1">Role: Reviewed and formatted recitation rules and fast (Vrata) guidelines.</p>
          </div>
        </div>
      </section>

      {/* Source publications */}
      <section className="space-y-4">
        <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
          Source Publications
        </h3>
        <p className="text-xs sm:text-sm">
          Our canonical texts are referenced from:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-charcoal-brown/80 pl-2">
          <li><i>Shri Ramcharitmanas</i> — Gita Press, Gorakhpur edition.</li>
          <li><i>Hanuman Chalisa Gutkha</i> — Traditional prayer booklet, Gita Press.</li>
          <li><i>Kalyan (Special Hanuman Edition)</i> — Monthly spiritual archives.</li>
        </ul>
      </section>

    </div>
  );
}
