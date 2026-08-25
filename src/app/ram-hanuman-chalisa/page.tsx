import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "Ram Hanuman Connection — The Union of Master and Servant",
  description: "Explore the profound relationship between Lord Rama and Hanuman. Understand how Hanuman's devotion represents the pinnacle of Bhakti Yoga and selflessness.",
};

export default function RamHanumanPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Divine Relationship (स्वामी-सेवक भाव)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Shree Ram & Hanuman Connection
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
          Hanuman&apos;s devotion to Lord Rama is the highest expression of Bhakti (devotion). In Hindu theology, Hanuman is the bridge that leads the seeker to Lord Rama.
        </p>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Detail text */}
        <div className="md:col-span-2 space-y-6 text-sm sm:text-base text-charcoal-brown/90 leading-relaxed">
          
          <div className="space-y-2">
            <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
              The Essence of Dasya Bhakti (दास्य भक्ति)
            </h3>
            <p>
              In spiritual paths, there are various ways to connect with the Divine. Hanuman represents <i>Dasya Bhakti</i>—the devotion of a loving servant towards their master. This is not a relationship of subordination, but one of complete freedom and pure love.
            </p>
            <p>
              Hanuman surrendered his ego completely to Lord Rama. By having no separate desires of his own, he became a channel of infinite strength and cosmic intelligence. He accomplished tasks that even gods found impossible—like crossing the ocean or carrying the Dronagiri mountain.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
              Why Hanuman Chants Rama&apos;s Name
            </h3>
            <p>
              It is said that Lord Hanuman is constantly immersed in the chanting of Rama&apos;s name (<i>Ram Naam Chanting</i>). For Hanuman, the name of Rama is more sweet and powerful than Rama himself.
            </p>
            <p>
              When Rama offered Hanuman any boon at the end of the Treta Yuga, Hanuman requested only one thing: to remain on Earth in physical form as long as the name of Rama is chanted by humans. This makes Hanuman a living, breathing immortal deity (Chiranjeevi) who protects devotees today.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
              Chanting Rule: Rama First
            </h3>
            <p>
              Lord Hanuman is known as <i>Ram Doot</i> (the messenger of Rama). Devotees seeking the protection of Hanuman should always start by remembering Lord Rama. Chanting &ldquo;Jai Shree Ram&rdquo; before reading the Hanuman Chalisa immediately pleases Hanuman and invokes his protective presence.
            </p>
          </div>

          <div className="pt-4 border-t border-brass-gold/20 flex flex-wrap gap-4">
            <Link
              href="/"
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-5 py-2.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300"
            >
              Chant Hanuman Chalisa &rarr;
            </Link>
            <Link
              href="/shri-hanuman-chalisa-path-vidhi"
              className="bg-stone-ivory hover:bg-marigold/10 text-maroon-deep px-5 py-2.5 rounded text-xs font-bold uppercase border border-brass-gold/40 shadow-sm transition-all duration-300"
            >
              Learn Chanting Rules &rarr;
            </Link>
          </div>

        </div>

        {/* Sidebar Panel */}
        <div className="space-y-6">
          <div className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
            <h4 className="font-serif-display text-sm uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
              Key Milestones
            </h4>
            
            <ul className="space-y-3 text-xs text-charcoal-brown/80 leading-relaxed">
              <li className="flex gap-2">
                <span>💍</span>
                <span><b>The Ring of Hope:</b> Hanuman located Sita in Ravana&apos;s Ashok Vatika, bringing her Rama&apos;s ring as a sign of hope.</span>
              </li>
              <li className="flex gap-2">
                <span>⛰️</span>
                <span><b>The Sanjeevani Herb:</b> Hanuman carried an entire mountain to save Lakshmana, proving his resourcefulness.</span>
              </li>
              <li className="flex gap-2">
                <span>🔥</span>
                <span><b>Burning of Lanka:</b> With his tail set on fire, Hanuman burned golden Lanka, shattering Ravana&apos;s pride.</span>
              </li>
            </ul>
          </div>

          {/* Ad Slot */}
          <div className="no-print w-full h-48 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
            Ad Slot — Sidebar
          </div>
        </div>

      </div>

    </div>
  );
}
