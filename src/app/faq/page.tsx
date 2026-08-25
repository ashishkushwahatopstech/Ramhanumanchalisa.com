import React from "react";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "Hanuman Chalisa FAQ — Common Questions Answered",
  description: "Get answers to frequently asked questions about the Hanuman Chalisa. Learn its history, language, and guidelines for recitation.",
};

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Who composed the Hanuman Chalisa?",
    a: "The Hanuman Chalisa was composed by Goswami Tulsidas, a legendary poet-saint best known for authoring the Ramcharitmanas. He composed it in the 16th century while imprisoned in Delhi."
  },
  {
    q: "In what language is the Hanuman Chalisa written?",
    a: "The Hanuman Chalisa is written in Awadhi, an Indo-Aryan language that is a dialect of Hindi, spoken primarily in the Awadh region of Uttar Pradesh."
  },
  {
    q: "Why is it called 'Chalisa'?",
    a: "The word 'Chalisa' is derived from 'chalis' in Hindi, which means forty. The hymn is called Chalisa because it consists of forty chaupais (verses or quatrains), excluding the opening and closing couplets."
  },
  {
    q: "Can anyone chant the Hanuman Chalisa?",
    a: "Yes, anyone can chant the Hanuman Chalisa regardless of age, caste, race, or gender. Hanuman is a compassionate deity who responds to any devotee who approaches him with faith and clean intention."
  },
  {
    q: "Is there any danger in reciting the Bajrang Baan or Hanumanashtak?",
    a: "The Hanumanashtak is a gentle, praise-based hymn and is perfectly safe for daily recitation. The Bajrang Baan, however, is a strong shield prayer involving a vow in the name of Lord Rama. Devotees are advised to chant the Bajrang Baan only during times of severe distress or fear."
  }
];

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          General Inquiries (सामान्य जिज्ञासा)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-charcoal-brown/70 leading-relaxed">
          Common historical, spiritual, and grammatical questions regarding the Hanuman Chalisa and related bhakti scriptures answered by scholars.
        </p>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Accordions */}
      <section className="space-y-4">
        {FAQS.map((faq, index) => (
          <details
            key={index}
            className="group p-5 bg-stone-ivory border border-brass-gold/25 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <summary className="cursor-pointer select-none font-bold text-sm text-maroon-deep flex justify-between items-center pr-2 uppercase font-serif-display tracking-wide">
              <span>{faq.q}</span>
              <span className="text-xs group-open:rotate-180 transition-transform duration-200">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-charcoal-brown/85 leading-relaxed border-t border-brass-gold/15 pt-3">
              {faq.a}
            </p>
          </details>
        ))}
      </section>

      {/* AdSense Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Page Bottom (Layout Stable)
      </div>

    </div>
  );
}
