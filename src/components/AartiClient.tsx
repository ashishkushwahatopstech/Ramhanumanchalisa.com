"use client";

import React from "react";
import Link from "next/link";
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
          "text": "Hanuman Aarti (Aarti Kije Hanuman Lala Ki) is a traditional devotional prayer sung at the end of worship rituals to express deep gratitude and seek the blessings of Lord Hanuman."
        }
      },
      {
        "@type": "Question",
        "name": "Who wrote Hanuman Aarti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Hanuman Aarti is traditionally attributed to the great 16th-century sage and poet Goswami Tulsidas, written alongside his other devotional masterpieces."
        }
      },
      {
        "@type": "Question",
        "name": "When should Hanuman Aarti be performed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It should be performed at the conclusion of any puja or recitation of the Hanuman Chalisa, Bajrang Baan, or Hanumanashtak. It is typically performed daily during morning and evening sandhya timings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of performing Hanuman Aarti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Singing the Aarti brings mental peace, purifies the surrounding environment, dispels negative energy, and completes the worship ritual, invoking the grace of Hanumanji."
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
            Devotional Closing (आरती पूजा)
          </span>
          <h1 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
            Shree Hanuman Aarti
          </h1>
          <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
            Read and listen to the synced audio of Hanuman Aarti lyrics (*Aarti Kije Hanuman Lala Ki*). Perfect your recitation with Devanagari text, Romanized transliteration, and English translations.
          </p>
        </div>

        <CarvedDivider icon="🔔" />

        {/* Quick Facts Table */}
        <section className="bg-stone-ivory border-2 border-brass-gold/30 rounded-lg p-6 shadow-sm space-y-4">
          <h3 className="font-serif-display text-sm font-bold uppercase tracking-wider text-maroon-deep text-center">
            Shree Hanuman Aarti Quick Facts
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-charcoal-brown">
              <tbody>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider w-1/3">Deity (देवता)</td>
                  <td className="py-2.5">Lord Hanuman (श्री हनुमान)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Aarti Title</td>
                  <td className="py-2.5">Aarti Kije Hanuman Lala Ki (आरती कीजै हनुमान लला की)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Composer</td>
                  <td className="py-2.5">Goswami Tulsidas (गोस्वामी तुलसीदास)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Best Times to Perform</td>
                  <td className="py-2.5">Daily during Morning & Evening sandhya (सुबह और शाम)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Purpose</td>
                  <td className="py-2.5">Devotional conclusion of prayers, expressing deep gratitude</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Synced Audio Player */}
        <section className="space-y-4">
          <h3 className="font-serif-display text-base font-bold uppercase tracking-wider text-maroon-deep text-center">
            Listen & Chant Hanuman Aarti
          </h3>
          <div className="border border-brass-gold/30 rounded-lg p-4 bg-stone-ivory shadow-sm">
            <SyncedAudioPlayer defaultTrackId="track-3" />
          </div>
        </section>

        {/* Meaning & Importance */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Meaning & Importance
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal-brown/90">
            The **Hanuman Aarti** serves as the concluding offering of love, surrender, and respect to Bajrangbali. The hymn, starting with <em>&quot;Aarti Kije Hanuman Lala Ki&quot;</em>, lists the glorious tasks performed by Hanumanji in service to Lord Rama: crossing the ocean to search for Mother Sita, setting fire to Ravana&apos;s golden fortress, vanquishing demonic forces, and saving Lakshmana&apos;s life with the Sanjeevani herb. Performing the Aarti completes worship, rectifies any inadvertent pronunciation mistakes during Chalisa chanting, and leaves the home filled with peace.
          </p>
        </section>

        {/* Recitation Guide (Gayan Vidhi) */}
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
            Chanting the Aarti releases positive devotional frequencies in the mind, dissolving negativity, stress, and anxiety. To explore the wider spiritual benefits of Hanuman devotion in detail, view our shared <Link href="/hanuman-chalisa-benefits" className="text-vermilion hover:underline font-bold">Hanuman Chalisa Benefits page</Link>.
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
            <Link href="/bajrang-baan" className="text-vermilion hover:text-marigold underline">
              Bajrang Baan
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
