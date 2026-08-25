"use client";

import React from "react";
import CarvedDivider from "@/components/CarvedDivider";
import SyncedAudioPlayer from "@/components/SyncedAudioPlayer";

export default function AartiClient() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Hanuman Aarti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hanuman Aarti (Aarti Kije Hanuman Lala Ki) is a traditional devotional prayer sung at the end of worship rituals to express gratitude and seek the blessings of Lord Hanuman."
        }
      },
      {
        "@type": "Question",
        "name": "Who wrote Hanuman Aarti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Hanuman Aarti is traditionally composed by saint Goswami Tulsidas, the revered 16th-century poet who also compiled the Shree Hanuman Chalisa."
        }
      },
      {
        "@type": "Question",
        "name": "When should Hanuman Aarti be performed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is traditionally sung at the conclusion of daily pujas, Hanuman Chalisa chantings, or weekly Tuesday and Saturday worship sessions."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of performing Hanuman Aarti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chanting it cleanses negative vibrations from the environment, clears fear and anxiety, and builds a powerful shield of spiritual energy around the family."
        }
      }
    ]
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Public Layout (no-print) */}
      <div className="no-print space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
            Devotional Worship (आरती पूजा)
          </span>
          <h1 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
            Shree Hanuman Aarti
          </h1>
          <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
            Sing along to the traditional Aarti composed by Goswami Tulsidas. Wave the diya, ring the bell, and immerse yourself in praise of Hanuman Lala.
          </p>
        </div>

        <CarvedDivider icon="🕉️" />

        {/* Synced Audio Player */}
        <section className="space-y-4">
          <h3 className="font-serif-display text-base font-bold uppercase tracking-wider text-maroon-deep text-center">
            Listen with Synced Lyrics
          </h3>
          <div className="border border-brass-gold/30 rounded-lg p-4 bg-stone-ivory shadow-sm">
            <SyncedAudioPlayer defaultTrackId="track-3" />
          </div>
        </section>

        {/* PDF Download Action Banner */}
        <div className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif-display text-lg text-marigold uppercase tracking-wider font-bold">
              Print Hanuman Aarti Lyrics
            </h3>
            <p className="text-xs text-stone-ivory/80 max-w-lg leading-relaxed">
              Generate a vector-clear print format of the Aarti lyrics for offline worship.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-5 py-2.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300 whitespace-nowrap"
          >
            🖨️ Print / Save PDF
          </button>
        </div>

        {/* Recitation Guide */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Recitation Guide (गायन विधि)
          </h3>
          <ul className="list-disc pl-5 text-xs sm:text-sm leading-relaxed space-y-2 text-charcoal-brown/90">
            <li><strong>The Platter (Thali)</strong>: Set up a copper or silver plate with camphor, a ghee wick, flowers, and sweet Prasad (such as laddoo or gram).</li>
            <li><strong>Worship Flow</strong>: Wave the lighted camphor/ghee flame in circular clockwise movements in front of Hanumanji&apos;s photo while singing. Ring the temple bell or clap rhythmically.</li>
            <li><strong>Concluding</strong>: Once the Aarti is complete, offer the flowers, bow down to touch the ground, and share the Prasad with family members.</li>
          </ul>
        </section>

        {/* Benefits Section */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Benefits of Hanuman Aarti
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal-brown/90">
            Chanting the Aarti releases positive devotional frequencies in the mind, dissolving negativity, stress, and anxiety. To explore the wider spiritual benefits of Hanuman devotion in detail, view our shared <a href="/hanuman-chalisa-benefits" className="text-vermilion hover:underline font-bold">Hanuman Chalisa Benefits page</a>.
          </p>
        </section>

        {/* Q&A FAQs */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 divide-y divide-brass-gold/15">
            <div className="pt-2 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान आरती क्या है? / What is Hanuman Aarti?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                Hanuman Aarti is a devotional hymn starting with *Aarti Kije Hanuman Lala Ki*, sung with temple bells and camphor fire at the end of worship rituals to seek Hanumanji&apos;s blessings.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान आरती किसने लिखी? / Who wrote Hanuman Aarti?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                The Aarti is traditionally attributed to saint Goswami Tulsidas, the compiler of the Hanuman Chalisa.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान आरती कब करनी चाहिए? / When should Hanuman Aarti be performed?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                It is sung at the conclusion of all prayers (prarthana) or Hanuman Chalisa recitations. Devotees perform it daily during morning or evening temple hours.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान आरती करने के क्या लाभ हैं? / What are the benefits of performing Hanuman Aarti?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                It clears negative energies, builds inner harmony, purifies the home environment, and ensures the completion of your spiritual worship.
              </p>
            </div>
          </div>
        </section>

        {/* Related Content Links */}
        <section className="bg-stone-ivory border border-brass-gold/25 p-6 rounded-lg text-center space-y-3">
          <h4 className="font-serif-display text-sm font-bold uppercase text-maroon-deep">
            Related Devotional Chants (संबंधित पाठ)
          </h4>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <a href="/" className="text-vermilion hover:text-marigold underline">
              Shree Hanuman Chalisa
            </a>
            <span className="text-brass-gold/40">•</span>
            <a href="/hanuman-chalisa-meaning" className="text-vermilion hover:text-marigold underline">
              Bilingual Meaning
            </a>
            <span className="text-brass-gold/40">•</span>
            <a href="/sankat-mochan-hanumanashtak" className="text-vermilion hover:text-marigold underline">
              Hanumanashtak
            </a>
            <span className="text-brass-gold/40">•</span>
            <a href="/bajrang-baan" className="text-vermilion hover:text-marigold underline">
              Bajrang Baan
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
