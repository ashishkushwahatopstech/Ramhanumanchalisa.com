import React from "react";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "Disclaimer — Devotional & Spiritual Content Guidelines",
  description: "Read the Disclaimer for RamHanumanChalisa.com, outlining spiritual content guidelines and liability limits.",
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-10 max-w-3xl mx-auto text-sm text-charcoal-brown/85 leading-relaxed">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Disclaimer
        </h2>
        <p className="text-xs text-charcoal-brown/70">
          Last updated: August 25, 2026
        </p>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Content */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            1. Spiritual and Devotional Content
          </h3>
          <p>
            The content provided on RamHanumanChalisa.com, including lists of &ldquo;benefits&rdquo; and situation-based recitation guides (career, health, protection), is based on traditional Hindu scriptures, historical translations, and common devotional beliefs.
          </p>
          <p>
            These guidelines are provided for cultural, educational, and devotional purposes only. We make no claims or guarantees that reciting specific verses will cure medical diseases, resolve financial difficulties, or guarantee career promotions. Chanting is a matter of personal faith (shradha).
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            2. Medical Disclaimer
          </h3>
          <p>
            The information regarding the health benefits of reciting the Hanuman Chalisa (e.g. &ldquo;destroys all diseases and pains&rdquo;) is a translation of traditional verses and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician or healthcare provider for any health concerns or illnesses. Do not delay medical treatment in favor of devotional practices.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            3. Accuracy of Scriptures
          </h3>
          <p>
            While we have taken immense care to cross-reference our Devanagari Unicode characters with authoritative publications (such as Gita Press) and consulted pandits, typographical errors can occur. If you notice any incorrect vowel markers (mantra spelling) or translations, please write to us, and we will update them immediately.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            4. Limitation of Liability
          </h3>
          <p>
            Under no circumstances shall RamHanumanChalisa.com or its creators be held liable for any loss or damage arising from the use of, or reliance on, the information published on this website.
          </p>
        </div>
      </section>

    </div>
  );
}
