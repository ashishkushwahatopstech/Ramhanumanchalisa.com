/**
 * Script to generate Pilot Page Models for Stage 3 Migration
 * RamHanumanChalisa.com — Admin Pagebuilder
 */

import fs from "node:fs";
import path from "node:path";

const PAGES_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

// 1. Pilot Page: Sankat Mochan Hanuman Ashtak
const ashtakVersesRaw = fs.readFileSync(
  path.resolve(process.cwd(), "src/data/scriptures/sankat-mochan-hanumanashtak.json"),
  "utf8"
);
const ashtakVerses = JSON.parse(ashtakVersesRaw);

const hanumanashtakFaqs = [
  {
    question: "What is Hanuman Ashtak?",
    answer: "Hanuman Ashtak is a devotional hymn consisting of eight verses (Ashtak) composed by Goswami Tulsidas in praise of Lord Hanuman, highlighting his legendary strengths and exploits."
  },
  {
    question: "What is Sankat Mochan Hanuman Ashtak?",
    answer: "Sankat Mochan Hanuman Ashtak is the specific, most widely recited version of Hanuman Ashtak. Composed in the Awadhi language, it is traditionally chanted to seek protection from severe difficulties, distress, and obstacles."
  },
  {
    question: "Who wrote Hanuman Ashtak?",
    answer: "Hanuman Ashtak was composed by the 16th-century saint and poet Goswami Tulsidas, who also composed the Shree Hanuman Chalisa and Ramcharitmanas."
  },
  {
    question: "When to read Hanuman Ashtak?",
    answer: "Hanuman Ashtak can be recited at any time, but it is traditionally chanted during morning or evening prayers on Tuesdays and Saturdays. It is especially recommended to recite it during times of deep crisis, anxiety, or fear."
  },
  {
    question: "What are the benefits of Hanuman Ashtak?",
    answer: "Chanting Hanuman Ashtak removes fear, provides relief from planetary afflictions (especially Shani Dev / Saturn), builds mental courage, and dissolves physical and spiritual obstacles."
  },
  {
    question: "What are the lyrics of Sankat Mochan Hanuman Ashtak in English?",
    answer: "The Sankat Mochan Hanuman Ashtak consists of 8 sacred Awadhi verses starting with 'Bal samay ravi bhaksh liyo tab, teenahun lok bhayo andhiyaron...'. The complete romanized English lyrics and translations for all eight stanzas are provided line-by-line on this page."
  }
];

const sankatMochanPage = {
  slug: "sankat-mochan-hanumanashtak",
  template: "prayer_text",
  status: "published",
  seo: {
    title: "Sankat Mochan Hanuman Ashtak — Lyrics, Meaning & Audio",
    description: "Read Sankat Mochan Hanuman Ashtak lyrics in Hindi & English with line-by-line meaning, synced audio, and printable PDF.",
    canonicalUrl: "https://ramhanumanchalisa.com/sankat-mochan-hanumanashtak",
    language: "hi"
  },
  h1: {
    text: "संकट मोचन हनुमानाष्टक (Sankat Mochan Hanuman Ashtak)",
    subheading: "Complete lyrics with word-by-word meaning, verse translations, and audio recitation",
    devanagariTag: "॥ संकटमोचन हनुमानाष्टक ॥"
  },
  sections: [
    {
      id: "sec-header",
      name: "Header & Introduction",
      visible: true,
      order: 1,
      settings: {
        background: "transparent",
        paddingY: "small",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-header",
          columnsCount: 1,
          columns: [
            {
              id: "col-header",
              blocks: [
                {
                  id: "blk-intro-heading",
                  type: "heading_paragraph",
                  visible: true,
                  order: 1,
                  content: {
                    level: "h2",
                    tag: "॥ संकटमोचन हनुमानाष्टक ॥",
                    heading: "श्री संकट मोचन हनुमानाष्टक पाठ",
                    paragraph: "गोस्वामी तुलसीदास द्वारा रचित श्री संकट मोचन हनुमानाष्टक का नित्य पाठ करने से जीवन के सभी भय, रोग, संकट और ग्रह दोष दूर होते हैं।"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-scripture",
      name: "Scripture Verses (LOCKED)",
      visible: true,
      order: 2,
      settings: {
        background: "transparent",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-scripture",
          columnsCount: 1,
          columns: [
            {
              id: "col-scripture",
              blocks: [
                {
                  id: "blk-ashtak-verses",
                  type: "scripture_verses",
                  visible: true,
                  order: 1,
                  locked: true,
                  content: {
                    title: "श्री संकट मोचन हनुमानाष्टक",
                    intro: "Awadhi lyrics composed by Goswami Tulsidas. Sacred text locked byte-for-byte.",
                    verses: ashtakVerses
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-faqs",
      name: "Frequently Asked Questions",
      visible: true,
      order: 3,
      settings: {
        background: "warm_cream",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-faqs",
          columnsCount: 1,
          columns: [
            {
              id: "col-faqs",
              blocks: [
                {
                  id: "blk-ashtak-faqs",
                  type: "faq_block",
                  visible: true,
                  order: 1,
                  content: {
                    title: "Hanuman Ashtak FAQs",
                    faqs: hanumanashtakFaqs
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-social-ad",
      name: "Social Share & Ad Slot",
      visible: true,
      order: 4,
      settings: {
        background: "transparent",
        paddingY: "small",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-social",
          columnsCount: 1,
          columns: [
            {
              id: "col-social",
              blocks: [
                {
                  id: "blk-wa-share",
                  type: "whatsapp_share",
                  visible: true,
                  order: 1,
                  content: {
                    title: "Share Sankat Mochan Hanuman Ashtak with Family & Friends",
                    shareText: "जय श्री राम! संकट मोचन हनुमानाष्टक का सम्पूर्ण पाठ अर्थ सहित यहाँ पढ़ें: https://ramhanumanchalisa.com/sankat-mochan-hanumanashtak"
                  }
                },
                {
                  id: "blk-ad-bottom",
                  type: "ad_slot",
                  visible: true,
                  order: 2,
                  locked: true,
                  content: {
                    slotId: "footer",
                    label: "Advertisement"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  auditMeta: {
    createdAt: "2026-11-10T12:00:00Z",
    updatedAt: "2026-11-10T12:00:00Z",
    updatedBy: "system_migration",
    version: 1,
    hasScriptureModifications: false
  }
};

// 2. Pilot Page: Hanuman Jayanti
const hanumanJayantiPage = {
  slug: "hanuman-jayanti",
  template: "festival",
  status: "published",
  seo: {
    title: "Hanuman Jayanti 2026 — Date, Shubh Muhurat & Puja Vidhi",
    description: "Find Hanuman Jayanti 2026 date, shubh muhurat timings, fasting rules, and puja vidhi to worship Lord Hanuman for blessings.",
    canonicalUrl: "https://ramhanumanchalisa.com/hanuman-jayanti",
    language: "en"
  },
  h1: {
    text: "Hanuman Jayanti Date & Muhurat",
    subheading: "Hanuman Jayanti celebrates the divine birth of Lord Hanuman to Mother Anjana and King Kesari, under the influence of the Wind God (Vayu Dev).",
    devanagariTag: "Hanuman Birth Anniversary (जन्मोत्सव)"
  },
  sections: [
    {
      id: "sec-jayanti-date",
      name: "Upcoming Festival Date & Muhurat",
      visible: true,
      order: 1,
      settings: {
        background: "maroon_deep",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-jayanti-date",
          columnsCount: 1,
          columns: [
            {
              id: "col-jayanti-date",
              blocks: [
                {
                  id: "blk-jayanti-date-banner",
                  type: "rich_text",
                  visible: true,
                  order: 1,
                  content: {
                    title: "Upcoming Festival Date",
                    html: `
<div class="text-center space-y-3">
  <span class="text-xs text-[#E5A93C] font-bold uppercase tracking-widest block">Upcoming Festival Date</span>
  <h2 class="font-serif-display text-2xl sm:text-3xl font-bold text-white">Thursday, April 2, 2026</h2>
  <p class="text-xs text-white/70 mt-1">Celebrated on Chaitra Purnima (Full Moon Day in the Hindu month of Chaitra)</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#C9A45C]/30 pt-6 text-xs sm:text-sm mt-6">
  <div class="bg-white/10 p-4 rounded border border-[#C9A45C]/20 space-y-2 text-white">
    <h3 class="font-bold text-[#E5A93C] uppercase tracking-wider text-sm">Tithi Timings</h3>
    <p class="text-xs text-white/80"><b>Purnima Tithi Begins:</b> April 1, 2026, 06:12 PM</p>
    <p class="text-xs text-white/80"><b>Purnima Tithi Ends:</b> April 2, 2026, 08:35 PM</p>
  </div>
  <div class="bg-white/10 p-4 rounded border border-[#C9A45C]/20 space-y-2 text-white">
    <h3 class="font-bold text-[#E5A93C] uppercase tracking-wider text-sm">Recommended Puja Muhurat</h3>
    <p class="text-xs text-white/80"><b>Sunrise Puja:</b> 06:05 AM to 08:32 AM (Brahma Muhurat & Sunrise)</p>
    <p class="text-xs text-white/80 leading-relaxed">Hanuman was born at sunrise, making the early morning puja period highly auspicious.</p>
  </div>
</div>`
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-jayanti-vidhi",
      name: "How to Celebrate & Puja Vidhi",
      visible: true,
      order: 2,
      settings: {
        background: "warm_cream",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-jayanti-vidhi",
          columnsCount: 1,
          columns: [
            {
              id: "col-jayanti-vidhi",
              blocks: [
                {
                  id: "blk-vidhi-content",
                  type: "rich_text",
                  visible: true,
                  order: 1,
                  content: {
                    title: "How to Celebrate Hanuman Jayanti at Home",
                    html: `
<div class="space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-[#34251D]/85">
    <div class="space-y-3">
      <h3 class="font-bold text-[#C95716] uppercase tracking-wide text-sm">1. Fasting (Vrata) Rules</h3>
      <p>Many devotees observe a complete or partial fast (Vrat) on Hanuman Jayanti. The fast begins at sunrise and is broken in the evening after offering prayers to Lord Hanuman. During the fast, take only fruits, milk, and water. Maintain complete celibacy (Brahmacharya).</p>
    </div>
    <div class="space-y-3">
      <h3 class="font-bold text-[#C95716] uppercase tracking-wide text-sm">2. Puja Setup & Offering</h3>
      <p>Decorate Lord Hanuman's photo with red flowers and marigold garlands. Apply orange sindoor mixed with sesame oil to the idol or photo. Offer red Boondi, Besan Ladoo, bananas, and sweet leaves (Paan) as prasadam.</p>
      <p>Recite the <b>Hanuman Chalisa</b> 11 times or chant the <b>Bajrang Baan</b> to seek protection and blessing.</p>
    </div>
  </div>
  <div class="border-t border-[#C9A45C]/20 pt-4 text-center">
    <a href="/" class="inline-block bg-[#C95716] hover:bg-[#E5A93C] text-white hover:text-[#4A1216] px-5 py-2.5 rounded text-xs font-bold uppercase border border-[#C9A45C] shadow-sm transition-all duration-300">Chant Hanuman Chalisa Now &rarr;</a>
  </div>
</div>`
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-jayanti-faqs",
      name: "Hanuman Jayanti FAQs",
      visible: true,
      order: 3,
      settings: {
        background: "transparent",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-jayanti-faqs",
          columnsCount: 1,
          columns: [
            {
              id: "col-jayanti-faqs",
              blocks: [
                {
                  id: "blk-jayanti-faqs",
                  type: "faq_block",
                  visible: true,
                  order: 1,
                  content: {
                    title: "Hanuman Jayanti FAQs",
                    faqs: [
                      {
                        question: "When is Hanuman Jayanti celebrated?",
                        answer: "In North India, Hanuman Jayanti is celebrated on Chaitra Purnima (full moon day of Chaitra month). In South Indian traditions (such as Andhra Pradesh and Telangana), Hanuman Jayanti is celebrated on Krishna Paksha Dashami of Vaishakha month."
                      },
                      {
                        question: "What is the best time to do Hanuman Jayanti Puja?",
                        answer: "Because Lord Hanuman was born at the hour of sunrise, the Brahma Muhurat (around 06:05 AM to 08:32 AM) is considered the most auspicious window for chanting and performing puja."
                      },
                      {
                        question: "What offerings are dear to Lord Hanuman?",
                        answer: "Sindoor mixed with jasmine/sesame oil (Chola), red flowers, bananas, motichoor or besan ladoos, and sweet betel leaf (meetha paan) are revered offerings."
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  auditMeta: {
    createdAt: "2026-11-10T12:00:00Z",
    updatedAt: "2026-11-10T12:00:00Z",
    updatedBy: "system_migration",
    version: 1,
    hasScriptureModifications: false
  }
};

// 3. Pilot Page: Homepage
const homePage = {
  slug: "home",
  template: "homepage",
  status: "published",
  seo: {
    title: "हनुमान चालीसा लिरिक्स अर्थ सहित | Hanuman Chalisa Lyrics",
    description: "सम्पूर्ण श्री हनुमान चालीसा लिरिक्स हिंदी और English अर्थ सहित पढ़ें। Read complete Hanuman Chalisa lyrics with full meaning.",
    canonicalUrl: "https://ramhanumanchalisa.com/",
    language: "hi"
  },
  h1: {
    text: "श्री हनुमान चालीसा (Shree Hanuman Chalisa)",
    subheading: "सम्पूर्ण ४० चौपाई एवं दोहे हिंदी व English अर्थ सहित",
    devanagariTag: "॥ श्री सीताराम ॥ • ॥ श्रीहनुमते नमः ॥"
  },
  sections: [
    {
      id: "sec-home-hero",
      name: "Cinematic Full-Width Hero",
      visible: true,
      order: 1,
      settings: {
        background: "transparent",
        paddingY: "none",
        width: "full_width"
      },
      containers: [
        {
          id: "cont-home-hero",
          columnsCount: 1,
          columns: [
            {
              id: "col-home-hero",
              blocks: [
                {
                  id: "blk-hero-poster",
                  type: "hero",
                  visible: true,
                  order: 1,
                  content: {
                    headline: "श्री हनुमान चालीसा",
                    subheading: "Shree Hanuman Chalisa",
                    description: "Awadhi text composed by Goswami Tulsidas with word-by-word meaning, audio recitation, and printable format.",
                    badge: "॥ श्री सीताराम ॥ • ॥ श्रीहनुमते नमः ॥",
                    primaryCtaText: "Recite Chalisa Now ↓",
                    primaryCtaUrl: "#chalisa-recitation",
                    secondaryCtaText: "Hanuman Ashtak",
                    secondaryCtaUrl: "/sankat-mochan-hanumanashtak"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-home-categories",
      name: "Sacred Treasury Categories",
      visible: true,
      order: 2,
      settings: {
        background: "transparent",
        paddingY: "medium",
        width: "contained_6xl"
      },
      containers: [
        {
          id: "cont-home-categories",
          columnsCount: 1,
          columns: [
            {
              id: "col-home-categories",
              blocks: [
                {
                  id: "blk-home-categories",
                  type: "category_cards",
                  visible: true,
                  order: 1,
                  content: {
                    title: "सम्पूर्ण स्तोत्र एवं चालीसा संग्रह",
                    subtitle: "Recite timeless Vedic and Awadhi prayers dedicated to Lord Rama and Mahavira Hanuman with authentic lyrics and translations."
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-home-articles",
      name: "Featured Devotional Insights",
      visible: true,
      order: 3,
      settings: {
        background: "warm_cream",
        paddingY: "medium",
        width: "contained_6xl"
      },
      containers: [
        {
          id: "cont-home-articles",
          columnsCount: 1,
          columns: [
            {
              id: "col-home-articles",
              blocks: [
                {
                  id: "blk-home-related-articles",
                  type: "related_articles",
                  visible: true,
                  order: 1,
                  content: {
                    title: "Featured Insights on Hanuman Sadhana"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-home-social-news",
      name: "Social Community & Newsletter",
      visible: true,
      order: 4,
      settings: {
        background: "transparent",
        paddingY: "medium",
        width: "contained_6xl"
      },
      containers: [
        {
          id: "cont-home-social",
          columnsCount: 1,
          columns: [
            {
              id: "col-home-social",
              blocks: [
                {
                  id: "blk-home-social",
                  type: "social_channels",
                  visible: true,
                  order: 1,
                  content: {
                    title: "Connect With Our Devotional Satsang",
                    subtitle: "Receive daily sacred chaupais, festival muhurat alerts, and spiritual commentary."
                  }
                },
                {
                  id: "blk-home-newsletter",
                  type: "newsletter",
                  visible: true,
                  order: 2,
                  content: {
                    title: "Daily Morning Hanuman Blessings",
                    subtitle: "Receive daily Chaupai verses, auspicious tithis, and divine audio directly in your inbox."
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  auditMeta: {
    createdAt: "2026-11-10T12:00:00Z",
    updatedAt: "2026-11-10T12:00:00Z",
    updatedBy: "system_migration",
    version: 1,
    hasScriptureModifications: false
  }
};

// 4. Pilot Page: One Article (Significance of Forty Verses)
const articlePage = {
  slug: "blog__significance-of-forty-verses",
  template: "article",
  status: "published",
  seo: {
    title: "Why Hanuman Chalisa Has Exactly 40 Verses",
    description: "Explore the astronomical, biological, and scriptural significance of the number 40 in the Hanuman Chalisa composed by Tulsidas.",
    canonicalUrl: "https://ramhanumanchalisa.com/blog/significance-of-forty-verses",
    ogType: "article",
    language: "en"
  },
  h1: {
    text: "Why Hanuman Chalisa Has Exactly 40 Verses",
    subheading: "By Ram Hanuman Chalisa Editorial • 4 min read",
    devanagariTag: "Vedic Numerology & Planetary Cycles"
  },
  sections: [
    {
      id: "sec-art-content",
      name: "Article Content",
      visible: true,
      order: 1,
      settings: {
        background: "transparent",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-art-content",
          columnsCount: 1,
          columns: [
            {
              id: "col-art-content",
              blocks: [
                {
                  id: "blk-art-body",
                  type: "rich_text",
                  visible: true,
                  order: 1,
                  content: {
                    html: `
<p>The word <b>Chalisa</b> is derived from <i>Chalis</i>, the Hindi word for forty. Goswami Tulsidas composed exactly forty quatrains (Chaupais) praising Lord Hanuman, preceded by two introductory couplets (Dohas) and followed by one concluding couplet.</p>
<p>But why did Tulsidas choose the number forty? In ancient Indian sciences, the number forty holds profound significance across physical, biological, and planetary cycles.</p>
<h3>1. Planetary Cycles (The Mars Connection)</h3>
<p>Lord Hanuman is closely connected to the planet Mars (<i>Mangal</i>), which represents strength, focus, and fire. In Vedic astrology, a complete cycle of Mars across constellations takes a specific duration of time, and short-term chanting disciplines of forty days (<i>Mandala</i>) are designed to align with Mars' influence, balancing planetary alignments in the devotee's horoscope.</p>
<h3>2. Biological Regeneration</h3>
<p>In traditional Ayurveda, the human body undergoes a complete cellular and metabolic cycle every forty days. This is known as a <i>Mandala</i> cycle. Observing a disciplined chanting session of the Hanuman Chalisa for forty consecutive days aligns with this biological clock, allowing the positive neural and mental shifts of sound chanting to become permanently integrated into the nervous system.</p>
<h3>3. Psychological Habit Formation</h3>
<p>Modern neuroscience indicates that it takes approximately 21 to 40 days to break old habit loops and construct new neural pathways. By dedicating yourself to a daily recitation of the Chalisa for forty days, you establish a peaceful routine, overwrite anxiety loops, and build deep focus.</p>
<h3>The Chanting Vow (Anushthan)</h3>
<p>Chaupai 38 itself explicitly calls out the number hundred (which equals ten sets of ten or corresponds to repeating cycles):<br>
<i>“Jo sat bar path kare koi, chutahi bandi maha sukh hoi.”</i><br>
(He who recites this hundred times is freed from worldly bondage and attains supreme bliss.)</p>
<p>Whether you recite it forty times in a single sitting on a special festival day, or read it daily for forty consecutive days, this number represents a complete spiritual cycle that purifies the devotee's surroundings.</p>`
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sec-art-related",
      name: "Related Insights",
      visible: true,
      order: 2,
      settings: {
        background: "warm_cream",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-art-related",
          columnsCount: 1,
          columns: [
            {
              id: "col-art-related",
              blocks: [
                {
                  id: "blk-art-related",
                  type: "related_articles",
                  visible: true,
                  order: 1,
                  content: {
                    title: "Explore More Sacred Insights"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  auditMeta: {
    createdAt: "2026-11-10T12:00:00Z",
    updatedAt: "2026-11-10T12:00:00Z",
    updatedBy: "system_migration",
    version: 1,
    hasScriptureModifications: false
  }
};

const pilotPages = [sankatMochanPage, hanumanJayantiPage, homePage, articlePage];

for (const p of pilotPages) {
  const filePath = path.join(PAGES_DIR, `${p.slug}.json`);
  const origPath = path.join(ORIGINALS_DIR, `${p.slug}.json`);

  fs.writeFileSync(filePath, JSON.stringify(p, null, 2), "utf8");
  fs.writeFileSync(origPath, JSON.stringify(p, null, 2), "utf8");
  console.log(`Generated pilot page & snapshot: ${p.slug}.json`);
}

console.log("Pilot pages generation complete!");
