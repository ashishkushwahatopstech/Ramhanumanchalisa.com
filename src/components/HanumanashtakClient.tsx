"use client";

import React from "react";
import CarvedDivider from "@/components/CarvedDivider";
import SyncedAudioPlayer from "@/components/SyncedAudioPlayer";
import { ScriptureVerse } from "@/types/scripture";

interface HanumanashtakClientProps {
  verses: ScriptureVerse[];
}

export default function HanumanashtakClient({ verses }: HanumanashtakClientProps) {
  // FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Hanuman Ashtak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hanuman Ashtak is a devotional hymn consisting of eight verses (Ashtak) composed by Goswami Tulsidas in praise of Lord Hanuman, highlighting his legendary strengths and exploits."
        }
      },
      {
        "@type": "Question",
        "name": "What is Sankat Mochan Hanuman Ashtak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sankat Mochan Hanuman Ashtak is the specific, most widely recited version of Hanuman Ashtak. Composed in the Awadhi language, it is traditionally chanted to seek protection from severe difficulties, distress, and obstacles."
        }
      },
      {
        "@type": "Question",
        "name": "Who wrote Hanuman Ashtak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hanuman Ashtak was composed by the 16th-century saint and poet Goswami Tulsidas, who also composed the Shree Hanuman Chalisa and Ramcharitmanas."
        }
      },
      {
        "@type": "Question",
        "name": "When to read Hanuman Ashtak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hanuman Ashtak can be recited at any time, but it is traditionally chanted during morning or evening prayers on Tuesdays and Saturdays. It is especially recommended to recite it during times of deep crisis, anxiety, or fear."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of Hanuman Ashtak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chanting Hanuman Ashtak removes fear, provides relief from planetary afflictions (especially Shani Dev / Saturn), builds mental courage, and dissolves physical and spiritual obstacles."
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
            Crisis Solver (संकट मोचन)
          </span>
          <h1 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
            Sankat Mochan Hanuman Ashtak
          </h1>
          <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
            A powerful 8-verse prayer composed by Goswami Tulsidas. Recite or listen to the synced audio of Hanuman Ashtak lyrics to dispel all fear, obstacles, and difficulties.
          </p>
        </div>

        <CarvedDivider icon="🕉️" />

        {/* Quick Facts Table (Snippet Optimization) */}
        <section className="bg-stone-ivory border-2 border-brass-gold/30 rounded-lg p-6 shadow-sm space-y-4">
          <h3 className="font-serif-display text-sm font-bold uppercase tracking-wider text-maroon-deep text-center">
            Sankat Mochan Hanuman Ashtak Quick Facts
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-charcoal-brown">
              <tbody>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider w-1/3">Deity (देवता)</td>
                  <td className="py-2.5">Lord Hanuman (श्री हनुमान)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Composer (रचयिता)</td>
                  <td className="py-2.5">Goswami Tulsidas (गोस्वामी तुलसीदास)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Language (भाषा)</td>
                  <td className="py-2.5">Awadhi (अवधी)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Best Days to Recite</td>
                  <td className="py-2.5">Tuesday & Saturday (मंगलवार और शनिवार)</td>
                </tr>
                <tr className="border-b border-brass-gold/25">
                  <td className="py-2.5 font-bold uppercase tracking-wider">Occasion</td>
                  <td className="py-2.5">Crisis Relief, Protection, Planetary afflictons (शनि ग्रह दोष)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold uppercase tracking-wider">Formats Available</td>
                  <td className="py-2.5">Synced MP3 Audio, Devanagari Lyrics, English Meaning, PDF Print</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Synced Audio Player */}
        <section className="space-y-4">
          <h3 className="font-serif-display text-base font-bold uppercase tracking-wider text-maroon-deep text-center">
            Listen with Synced Lyrics
          </h3>
          <div className="border border-brass-gold/30 rounded-lg p-4 bg-stone-ivory shadow-sm">
            <SyncedAudioPlayer defaultTrackId="track-2" />
          </div>
        </section>

        {/* PDF Download Action Banner */}
        <div className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif-display text-lg text-marigold uppercase tracking-wider font-bold">
              Download Hanuman Ashtak PDF
            </h3>
            <p className="text-xs text-stone-ivory/80 max-w-lg leading-relaxed">
              Generate a vector-clear print layout of the Hanuman Ashtak lyrics for offline chanting.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-5 py-2.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300 whitespace-nowrap"
          >
            🖨️ Print / Save PDF
          </button>
        </div>

        {/* Meaning & Importance */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Meaning & Importance (महत्व)
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal-brown/90">
            <strong>Sankat Mochan Hanuman Ashtak</strong> is a devotional masterpiece consisting of eight stanzas in praise of Lord Hanuman. The phrase <em>&quot;Sankat Mochan&quot;</em> translates to &quot;reliever of crises&quot; or &quot;liberator from distress.&quot; Written by Goswami Tulsidas, each verse lists a great crisis faced by the gods or humans—such as the sun being swallowed, Sugriva being chased, or Lakshmana lying unconscious—and reminds us how Hanumanji immediately resolved it. Reciting it instills deep confidence that no challenge is too heavy for Bajrangbali to dismantle.
          </p>
        </section>

        {/* Recitation Guide (Paath Vidhi) */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Recitation Guide (पाठ विधि)
          </h3>
          <ul className="list-disc pl-5 text-xs sm:text-sm leading-relaxed space-y-2 text-charcoal-brown/90">
            <li><strong>Preparation</strong>: Wake up during Brahma Muhurat or schedule during evening sandhya hours. Bathe and sit facing East or North on a clean mat (Asana).</li>
            <li><strong>Chanting</strong>: Light a ghee or mustard oil diya in front of Hanumanji&apos;s photo or idol. Chants can be done 1, 3, 7, or 11 times.</li>
            <li><strong>Chanting Focus</strong>: Recite with pure heart, focusing on the meaning of each stanza. This hymn is especially powerful when chanted collectively during family difficulties.</li>
          </ul>
        </section>

        {/* Benefits Section */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Benefits of Hanuman Ashtak Chanting
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal-brown/90">
            Consistent chanting of the Hanuman Ashtak provides a protective shield around the devotee. It is widely known to:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm leading-relaxed space-y-2 text-charcoal-brown/90">
            <li><strong>Alleviate Shani Sadhe Sati</strong>: Resolves the negative configurations of Saturn (Shani Dev) and Rahu-Ketu.</li>
            <li><strong>Eradicate Fear</strong>: Gives instant relief from nightmares, anxiety, and panic attacks.</li>
            <li><strong>Dissolve Business Obstacles</strong>: Clears blockages in career progression or stalled financial works.</li>
          </ul>
          <p className="text-xs pt-2">
            For a more comprehensive look at ritual benefits, visit our dedicated <a href="/hanuman-chalisa-benefits" className="text-vermilion hover:underline font-bold">Hanuman Chalisa Benefits Guide</a>.
          </p>
        </section>

        {/* Hariharan Reciter Block */}
        <section className="bg-maroon-deep border-2 border-brass-gold p-6 rounded-lg shadow-md text-stone-ivory space-y-4">
          <h3 className="font-serif-display text-lg text-marigold uppercase tracking-wider font-bold">
            Featured Reciter: Hariharan
          </h3>
          <p className="text-xs text-stone-ivory/80 leading-relaxed">
            The legendary playback singer **Hariharan** has recorded one of the most spiritually stirring renditions of the Sankat Mochan Hanuman Ashtak. His calm vocal delivery combined with classical raagas creates a deep meditative experience.
          </p>
          <div className="pt-2">
            <a
              href="/hanuman-chalisa-audio-mp3#hariharan-ashtak"
              className="inline-block bg-marigold hover:bg-vermilion text-maroon-deep hover:text-stone-ivory px-4 py-2 rounded text-xs font-bold uppercase transition-colors"
            >
              Listen to Hariharan&apos;s Rendition &rarr;
            </a>
          </div>
        </section>

        {/* Visible Q&A FAQs */}
        <section className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-lg uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 divide-y divide-brass-gold/15">
            <div className="pt-2 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान अष्टक क्या है? / What is Hanuman Ashtak?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                Hanuman Ashtak is a traditional devotional prayer composed of eight stanzas (Ashtak) that praise the divine qualities, childhood adventures, and heroic works of Lord Hanuman.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">संकट मोचन हनुमानाष्टक क्या है? / What is Sankat Mochan Hanuman Ashtak?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                Sankat Mochan Hanuman Ashtak is the specific, popular variation of Hanuman Ashtak written in the Awadhi dialect by Goswami Tulsidas. It is chanted specifically to secure immediate relief from crises.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान अष्टक किसने लिखा? / Who wrote Hanuman Ashtak?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                The Sankat Mochan Hanumanashtak was composed by saint Goswami Tulsidas, the revered 16th-century poet who also compiled the Shree Hanuman Chalisa and Ramcharitmanas.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान अष्टक कब पढ़ें? / When to read Hanuman Ashtak?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                While it can be chanted daily, the most auspicious days are Tuesday and Saturday mornings or evenings. Devotees also recite it whenever they face distress, fear, or a severe crisis.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <h4 className="font-bold text-sm text-charcoal-brown">हनुमान अष्टक के लाभ क्या हैं? / What are the benefits of Hanuman Ashtak?</h4>
              <p className="text-xs text-charcoal-brown/80 leading-relaxed">
                It removes mental blockages, dispels all fear, helps resolve conflicts, pacifies planetary configurations, and delivers protection from critical emergencies.
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
            <a href="/hanuman-aarti" className="text-vermilion hover:text-marigold underline">
              Hanuman Aarti
            </a>
            <span className="text-brass-gold/40">•</span>
            <a href="/bajrang-baan" className="text-vermilion hover:text-marigold underline">
              Bajrang Baan
            </a>
          </div>
        </section>

      </div>

      {/* 2. Print Layout (Only visible when printing) */}
      <div className="print-only hidden p-10 max-w-3xl mx-auto border-8 double border-black bg-white text-black space-y-6">
        <div className="text-center border-b-2 border-black pb-4">
          <h1 className="font-serif-display text-2xl font-bold uppercase tracking-wider">
            SANKAT MOCHAN HANUMAN ASHTAK
          </h1>
          <p className="text-xs uppercase tracking-widest font-semibold mt-1">
            जय श्री राम • जय हनुमान
          </p>
          <p className="text-[10px] italic mt-0.5">
            Compiled for daily chanting - RamHanumanChalisa.com
          </p>
        </div>

        <div className="space-y-6">
          {verses.map((verse) => (
            <div key={verse.id} className="space-y-2 text-center pb-4 border-b border-black/10">
              <span className="text-[10px] font-bold uppercase">Verse {verse.verse_number}</span>
              <p className="font-hindi-display text-lg font-bold leading-loose">
                {verse.devanagari}
              </p>
              <p className="text-xs italic text-black/75">
                {verse.transliteration}
              </p>
              <p className="text-xs font-semibold max-w-xl mx-auto">
                {verse.literal_translation.en}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
