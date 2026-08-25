import React from "react";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "Contact Us — Feedback & Devotional Queries",
  description: "Get in touch with the team at RamHanumanChalisa.com for feedback, text corrections, or scholarly submissions.",
};

export default function ContactPage() {
  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Get in Touch (संपर्क)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Contact Us
        </h2>
        <p className="text-xs text-charcoal-brown/70 leading-relaxed">
          Have feedback on our synced audio? Spotted a spelling error in the Devanagari Unicode? Want to submit a scholar review? We welcome your input.
        </p>
      </div>

      <CarvedDivider icon="✉️" />

      {/* Form / Contacts */}
      <section className="bg-stone-ivory border border-brass-gold/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-maroon-deep uppercase tracking-wider text-xs">
              Email Correspondence
            </h4>
            <p className="text-sm font-semibold text-brass-gold select-all">
              support@ramhanumanchalisa.com
            </p>
            <p className="text-xs text-charcoal-brown/60 leading-relaxed">
              We typically respond to spiritual and technical queries within 48 hours.
            </p>
          </div>

          <hr className="border-brass-gold/20" />

          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-maroon-deep uppercase tracking-wider text-xs">
              Address (Karyalaya)
            </h4>
            <p className="text-xs text-charcoal-brown/80 leading-relaxed">
              Ram Hanuman Chalisa Devotional Hub<br />
              Varanasi, Uttar Pradesh, India - 221005
            </p>
          </div>
        </div>

        <hr className="border-brass-gold/20" />

        {/* Devotional Feedback Note */}
        <p className="text-xs text-charcoal-brown/60 italic leading-relaxed text-center">
          &ldquo;Lord Hanuman resides wherever the name of Shri Rama is chanted with pure intention.&rdquo; Thank you for helping us maintain this clean digital mandir.
        </p>
      </section>

    </div>
  );
}
