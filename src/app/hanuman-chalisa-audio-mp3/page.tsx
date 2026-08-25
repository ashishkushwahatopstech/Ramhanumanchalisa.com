import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";
import SyncedAudioPlayer from "@/components/SyncedAudioPlayer";

export const metadata = {
  title: "Hanuman Chalisa MP3 & Audio Synced Lyrics Player",
  description: "Listen to Hanuman Chalisa MP3 and follow line-by-line synced lyrics. Click on any verse to skip audio, control speed (0.75x to 1.5x) and learn correct pronunciation.",
};

export default function AudioPage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Interactive Chanting (श्रवण साधना)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Hanuman Chalisa Synced Audio Player
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-2xl mx-auto leading-relaxed">
          Follow along with the audio player. The active verse highlights automatically, keeping you focused on the sacred Devanagari syllables. Adjust playback speeds to learn proper chanting rhythms.
        </p>
      </div>

      <CarvedDivider icon="🎵" />

      {/* AdSense Top Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
        Ad Slot — Audio Page Top (Layout Stable Skeleton)
      </div>

      {/* Interactive Synced Audio Player */}
      <SyncedAudioPlayer />

      {/* Dedicated Reciter Section: Hariharan's Sankat Mochan Hanumanashtak */}
      <section id="hariharan-ashtak" className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-6 sm:p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-marigold bg-white/10 px-2 py-0.5 rounded border border-white/20">
              Famous Chants (प्रसिद्ध पाठ)
            </span>
            <h3 className="font-serif-display text-xl sm:text-2xl text-marigold font-bold uppercase">
              Hariharan — Sankat Mochan Hanuman Ashtak
            </h3>
            <p className="text-xs sm:text-sm text-stone-ivory/80 leading-relaxed">
              Hariharan&apos;s recording of the <em>Sankat Mochan Hanumanashtak</em> is celebrated by devotees worldwide for its classical Awadhi pacing, traditional raagas, and soul-stirring energy. Listening to this rendition is known to dissolve stress, nightmares, and negative planetary configurations.
            </p>
            <p className="text-xs text-brass-gold font-semibold">
              Tip: You can listen to this track by selecting &ldquo;Sankat Mochan Hanumanashtak&rdquo; from the dropdown menu in the interactive player above.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/sankat-mochan-hanumanashtak"
              className="bg-marigold hover:bg-vermilion text-maroon-deep hover:text-stone-ivory py-2.5 px-5 rounded text-center text-xs font-bold uppercase border border-brass-gold transition-colors whitespace-nowrap"
            >
              📖 View Ashtak Lyrics & Meaning
            </Link>
          </div>
        </div>
      </section>

      <CarvedDivider icon="🕉️" />

      {/* SEO Background Section - Pronunciation Guidelines */}
      <section className="bg-stone-ivory border border-brass-gold/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
        <h3 className="font-serif-display text-lg text-maroon-deep uppercase tracking-wider font-bold border-b border-brass-gold/20 pb-2">
          Chanting & Pronunciation Guidelines (उच्चारण निर्देश)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-bold text-brass-gold uppercase tracking-wide">
              1. The Importance of Sound (Dhwani)
            </h4>
            <p className="text-charcoal-brown/80">
              In Vedic culture, the vibration (dhwani) of Sanskrit syllables is as important as the intellectual meaning. Correct pronunciation activates peaceful cognitive channels, removing mental blockages and anxiety.
            </p>
            <p className="text-charcoal-brown/80">
              Use the slow-speed option (0.75x) on our player to hear exactly how double consonants (e.g., in &ldquo;bajarangi&rdquo; or &ldquo;buddhiheen&rdquo;) are formed.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-brass-gold uppercase tracking-wide">
              2. Chanting Rhythms (Lay & Taal)
            </h4>
            <p className="text-charcoal-brown/80">
              Goswami Tulsidas composed the Chalisa using two distinct meters: the **Doha** (couplet) and the **Chaupai** (four-lined verse). Dohas are reflective and slow, paving the way for focused meditation. Chaupais are rhythmic, building an energetic tempo.
            </p>
            <p className="text-charcoal-brown/80">
              Try to sync your breath with the flow of the Chaupais. Listening to Pandit Shastri&apos;s fast chant is excellent for memorization, while the melodious choir version helps in meditative reflection.
            </p>
          </div>
        </div>

        <div className="border-t border-brass-gold/20 pt-4 text-center">
          <Link
            href="/shri-hanuman-chalisa-path-vidhi"
            className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-5 py-2 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300"
          >
            Read Complete Recitation Rules (Path Vidhi) &rarr;
          </Link>
        </div>
      </section>

      {/* AdSense Footer Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Audio Page Bottom (Layout Stable Skeleton)
      </div>

    </div>
  );
}
