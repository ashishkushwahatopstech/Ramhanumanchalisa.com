import React from "react";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "Hanuman Chalisa Path Vidhi — Rules, Times & Guidelines",
  description: "Learn the correct rules and best times to recite Hanuman Chalisa. Detailed guidance on purity, days (Tuesdays/Saturdays), and frequently asked questions.",
};

// FAQ Data for Schema and render
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the best time to recite the Hanuman Chalisa?",
    answer: "The absolute best time to chant the Hanuman Chalisa is during the Brahma Muhurat (4:00 AM to 6:00 AM) or during sandhya hours (sunset/dusk). However, you can recite it at any time of day or night when feeling anxious or seeking strength."
  },
  {
    question: "Which days are most auspicious for Hanuman Chalisa recitation?",
    answer: "Tuesdays and Saturdays are considered the most auspicious days for Lord Hanuman worship, as they are planetary days connected to Mars (Mangal) and Saturn (Shani), cosmic forces that Hanuman balances."
  },
  {
    question: "Can women recite the Hanuman Chalisa?",
    answer: "Yes, women can absolutely recite the Hanuman Chalisa. Lord Hanuman is a symbol of supreme devotion and respect, and his blessings are open to all devotees regardless of gender. Some traditions recommend women avoid touching the idol directly, but there is no restriction on chanting and praying."
  },
  {
    question: "How many times should I recite the Chalisa?",
    answer: "Traditionally, chanting the Chalisa 1 time, 3 times, 7 times, 11 times, or 108 times are common practices. Chaupai 38 itself states: 'Jo sat bar path kare koi, chutahi bandi maha sukh hoi' (He who recites this 100 times is freed from bondage and gains great joy)."
  },
  {
    question: "Do I need to maintain a vegetarian diet to chant?",
    answer: "Yes, to receive the maximum spiritual benefits of the chanting, it is highly recommended to maintain a clean vegetarian diet and avoid alcohol and tobacco on the days you recite, keeping the body and mind in a pure sattvic state."
  }
];

export default function PathVidhiPage() {
  
  // Construct JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Recite the Hanuman Chalisa",
    "description": "Step-by-step instructions for correctly reciting the Hanuman Chalisa to obtain spiritual and physical blessings.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Purify Yourself",
        "text": "Take a bath and wear clean clothes (preferably yellow or red, colors dear to Lord Hanuman) before beginning the prayer."
      },
      {
        "@type": "HowToStep",
        "name": "Prepare the Altar",
        "text": "Sit in a quiet space in front of an idol or photo of Lord Hanuman. Clean the area and light a mustard oil or ghee diya."
      },
      {
        "@type": "HowToStep",
        "name": "Pray to Lord Rama First",
        "text": "Before chanting to Hanuman, offer a short prayer to Lord Rama (e.g. chanting 'Jai Shree Ram' 3 times), as Hanuman is first and foremost Rama's devotee."
      },
      {
        "@type": "HowToStep",
        "name": "Recite with Devotion",
        "text": "Recite the full Chalisa (the 2 opening dohas, the 40 chaupais, and the closing doha) with a clear mind and slow pronunciation, focusing on the meanings of the verses."
      }
    ]
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* JSON-LD Schemas injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
          Recitation Protocol (पाठ विधि)
        </span>
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Hanuman Chalisa Path Vidhi & Rules
        </h2>
        <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
          Unlock the complete spiritual energies of Tulsidas&apos;s composition. Establish a discipline by following proper guidelines of physical and mental purity.
        </p>
      </div>

      <CarvedDivider icon="✨" />

      {/* Step by Step instructions */}
      <section className="bg-stone-ivory border border-brass-gold/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
        <h3 className="font-serif-display text-lg text-maroon-deep uppercase tracking-wider font-bold border-b border-brass-gold/20 pb-2">
          Step-by-Step Chanting Ritual
        </h3>
        
        <div className="space-y-6 text-sm text-charcoal-brown/90 leading-relaxed">
          <div className="flex gap-4">
            <span className="text-xl font-bold text-maroon-deep bg-marigold/20 w-8 h-8 flex items-center justify-center rounded-full shrink-0 border border-brass-gold">1</span>
            <div>
              <h4 className="font-bold text-maroon-deep">Physical Cleanliness (शारीरिक शुद्धि)</h4>
              <p className="text-xs text-charcoal-brown/80 mt-1">
                Always take a bath and wash your limbs before chanting. Chanting should be done while wearing clean clothes. Yellow or saffron-colored fabrics are traditionally preferred as they correspond to Jupiter and spiritual growth.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-xl font-bold text-maroon-deep bg-marigold/20 w-8 h-8 flex items-center justify-center rounded-full shrink-0 border border-brass-gold">2</span>
            <div>
              <h4 className="font-bold text-maroon-deep">Altar Preparation (आसन एवं दीप)</h4>
              <p className="text-xs text-charcoal-brown/80 mt-1">
                Sit on a clean woollen or cotton rug (Asana) facing East (representing rising sun/knowledge) or North (representing stability). Light a diya filled with ghee (for general auspiciousness) or sesame/mustard oil (for removing Saturn hurdles and warding off negativity).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-xl font-bold text-maroon-deep bg-marigold/20 w-8 h-8 flex items-center justify-center rounded-full shrink-0 border border-brass-gold">3</span>
            <div>
              <h4 className="font-bold text-maroon-deep">Invoking Lord Rama First (राम स्मरण)</h4>
              <p className="text-xs text-charcoal-brown/80 mt-1">
                Hanuman is the ultimate servant of Lord Rama. He is most pleased when Rama is remembered. Always begin your recitation by chanting &ldquo;Jai Shree Ram&rdquo; three times, or offering a silent prayer to Rama and Sita.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-xl font-bold text-maroon-deep bg-marigold/20 w-8 h-8 flex items-center justify-center rounded-full shrink-0 border border-brass-gold">4</span>
            <div>
              <h4 className="font-bold text-maroon-deep">Mindful Chanting (ध्यानपूर्वक पाठ)</h4>
              <p className="text-xs text-charcoal-brown/80 mt-1">
                Chant the 43 verses with slow, clear pronunciation. Try to contemplate the meanings of the verses as you read rather than rushing to finish the count. Devotion (Bhav) is far more important than quantity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CarvedDivider icon="🕉️" />

      {/* Accordion FAQ Area */}
      <section className="space-y-6">
        <h3 className="font-serif-display text-xl text-center uppercase tracking-wider font-bold text-maroon-deep">
          Frequently Asked Questions (प्रश्न एवं समाधान)
        </h3>

        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((faq, index) => (
            <details
              key={index}
              className="group p-4 bg-stone-ivory border border-brass-gold/25 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <summary className="cursor-pointer select-none font-bold text-sm text-maroon-deep flex justify-between items-center pr-2 uppercase font-serif-display tracking-wide">
                <span>{faq.question}</span>
                <span className="text-xs group-open:rotate-180 transition-transform duration-200">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-charcoal-brown/85 leading-relaxed border-t border-brass-gold/15 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* AdSense Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Path Vidhi Bottom (Layout Stable Skeleton)
      </div>

    </div>
  );
}
