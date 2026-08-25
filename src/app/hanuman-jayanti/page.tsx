import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "Hanuman Jayanti 2026 — Date, Puja Muhurat & Significance",
  description: "Find the exact date, puja muhurat times, and spiritual significance of Hanuman Jayanti. Learn how to fast and perform puja at home.",
};

export default function JayantiPage() {
  // We can configure this block to read from database if populated, otherwise use static fallback
  const jayantiDate = "Thursday, April 2, 2026";
  const purnimaTithiStart = "April 1, 2026, 06:12 PM";
  const purnimaTithiEnd = "April 2, 2026, 08:35 PM";
  const recommendedPujaTime = "06:05 AM to 08:32 AM (Brahma Muhurat & Sunrise)";

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Hanuman Birth Anniversary (जन्मोत्सव)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Hanuman Jayanti Date & Muhurat
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
          Hanuman Jayanti celebrates the divine birth of Lord Hanuman to Mother Anjana and King Kesari, under the influence of the Wind God (Vayu Dev).
        </p>
      </div>

      <CarvedDivider icon="🎂" />

      {/* Date & Muhurat details */}
      <section className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-6 sm:p-8 rounded-lg shadow-md space-y-6">
        <div className="text-center">
          <span className="text-xs text-marigold font-bold uppercase tracking-widest block">
            Upcoming Festival Date
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mt-1">
            {jayantiDate}
          </h3>
          <p className="text-xs text-stone-ivory/60 mt-1">
            Celebrated on Chaitra Purnima (Full Moon Day in the Hindu month of Chaitra)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brass-gold/30 pt-6 text-xs sm:text-sm">
          <div className="bg-stone-ivory/5 p-4 rounded border border-brass-gold/20 space-y-2">
            <h4 className="font-bold text-marigold uppercase tracking-wider">
              Tithi Timings
            </h4>
            <p className="text-xs text-stone-ivory/80">
              <b>Purnima Tithi Begins:</b> {purnimaTithiStart}
            </p>
            <p className="text-xs text-stone-ivory/80">
              <b>Purnima Tithi Ends:</b> {purnimaTithiEnd}
            </p>
          </div>

          <div className="bg-stone-ivory/5 p-4 rounded border border-brass-gold/20 space-y-2">
            <h4 className="font-bold text-marigold uppercase tracking-wider">
              Recommended Puja Muhurat
            </h4>
            <p className="text-xs text-stone-ivory/80">
              <b>Sunrise Puja:</b> {recommendedPujaTime}
            </p>
            <p className="text-xs text-stone-ivory/80 leading-relaxed">
              Hanuman was born at sunrise, making the early morning puja period highly auspicious.
            </p>
          </div>
        </div>
      </section>

      <CarvedDivider icon="🕉️" />

      {/* Puja Vidhi and Fasting details */}
      <section className="bg-stone-ivory border border-brass-gold/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
        <h3 className="font-serif-display text-lg text-maroon-deep uppercase tracking-wider font-bold border-b border-brass-gold/20 pb-2">
          How to Celebrate Hanuman Jayanti at Home
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-charcoal-brown/85">
          <div className="space-y-3">
            <h4 className="font-bold text-brass-gold uppercase tracking-wide">
              1. Fasting (Vrata) Rules
            </h4>
            <p>
              Many devotees observe a complete or partial fast (Vrat) on Hanuman Jayanti. The fast begins at sunrise and is broken in the evening after offering prayers to Lord Hanuman. During the fast, take only fruits, milk, and water. Maintain complete celibacy (Brahmacharya).
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-brass-gold uppercase tracking-wide">
              2. Puja Setup & Offering
            </h4>
            <p>
              Decorate Lord Hanuman&apos;s photo with red flowers and marigold garlands. Apply orange sindoor mixed with sesame oil to the idol or photo. Offer red Boondi, Besan Ladoo, bananas, and sweet leaves (Paan) as prasadam.
            </p>
            <p>
              Recite the **Hanuman Chalisa** 11 times or chant the **Bajrang Baan** to seek protection and blessing.
            </p>
          </div>
        </div>

        <div className="border-t border-brass-gold/20 pt-4 text-center">
          <Link
            href="/"
            className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-5 py-2.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300"
          >
            Chant Hanuman Chalisa Now &rarr;
          </Link>
        </div>
      </section>

      {/* AdSense Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Page Bottom (Layout Stable)
      </div>

    </div>
  );
}
