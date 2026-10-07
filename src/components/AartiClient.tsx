"use client";

import React from "react";
import CarvedDivider from "@/components/CarvedDivider";
import SyncedAudioPlayer from "@/components/SyncedAudioPlayer";

const AARTI_VERSES = [
  {
    title: "प्रारंभिक दोहा (Opening Couplet)",
    devanagari: "लाल देह लाली लसे, अरु धरि लाल लंगूर।\nबज्र देह दानव दलन, जय जय जय कपिसूर।।",
    transliteration: "Lal deh lalee lase, aru dhari lal langoor |\nBajra deh danav dalan, jai jai jai kapeesoor ||",
    meaning: "Adorned in radiant red complexion and sporting a long red tail, with a thunderbolt-like mighty frame that crushes demons, victory unto the lord of monkeys!"
  },
  {
    title: "आरती पद १ (Verse 1)",
    devanagari: "आरती कीजै हनुमान लला की। दुष्ट दलन रघुनाथ कला की।।\nजाके बल से गिरिवर कांपै। रोग दोष जाके निकट न झांपै।।",
    transliteration: "Aarti kije Hanuman lala ki | Dusht dalan Raghunath kala ki ||\nJake bal se girivar kampe | Rog dosh jake nikat na jhampe ||",
    meaning: "Perform the sacred Aarti of beloved child Hanuman, the annihilator of wickedness and divine spark of Lord Rama. By whose strength even great mountains tremble, and near whom diseases and flaws dare not approach."
  },
  {
    title: "आरती पद २ (Verse 2)",
    devanagari: "अंजनि पुत्र महा बलदाई। संतन के प्रभु सदा सहाई।।\nदे बीरा रघुनाथ पठाये। लंका जारि सिया सुधि लाये।।",
    transliteration: "Anjani putra maha baladai | Santan ke prabhu sada sahai ||\nDe beera Raghunath pathaye | Lanka jari siya sudhi laye ||",
    meaning: "O son of Mother Anjana, reservoir of supreme power, ever the savior of holy saints! Commissioned by Lord Rama, you burnt the city of Lanka and brought back auspicious news of Mother Sita."
  },
  {
    title: "आरती पद ३ (Verse 3)",
    devanagari: "लंका सो कोट समुद्र सी खाई। जात पवनसुत बार न लाई।।\nलंक जारि असुर संहारे। सियारामजी के काज संवारे।।",
    transliteration: "Lanka so kot samudra si khai | Jat pavansut bar na lai ||\nLank jari asur sanhare | Siyarambhaji ke kaj sanvare ||",
    meaning: "The fortress was Lanka and the ocean was its deep moat, yet the son of the wind crossed it without a moment's hesitation. Burning Lanka and slaying demons, he accomplished the divine mission of Sita and Rama."
  },
  {
    title: "आरती पद ४ (Verse 4)",
    devanagari: "लक्ष्मण मूर्छित पड़े सकारे, आनि संजीवन प्राण उबारे।\nपैठि पाताल तोरि जम-कारे, अहिरावण की भुजा उखारे।।",
    transliteration: "Lakshman murchhit pade sakare, aani sanjeevan pran ubare |\nPaithi patal tori jam-kare, Ahiravan ki bhuja ukhare ||",
    meaning: "When Lakshmana lay unconscious at dawn, he brought the Sanjeevani herb and revived his life breath. Entering the netherworld, shattering Yamaraj's shackles, he tore off the arms of sorcerer Ahiravana."
  },
  {
    title: "आरती पद ५ (Verse 5)",
    devanagari: "बाएं भुजा असुर दल मारे। दाहिने भुजा संतजन तारे।।\nसुर नर मुनि जन आरती उतारें। जय जय जय हनुमान उचारें।।",
    transliteration: "Baen bhuja asur dal mare | Dahine bhuja santajan tare ||\nSur nar muni jan aarti utaren | Jai jai jai Hanuman ucharen ||",
    meaning: "With his left hand he vanquished the army of demons, while with his right hand he gave sanctuary to saints. Devas, mortals, and sages join in waving the holy lamps, chanting: 'Hail, all victory to Lord Hanuman!'"
  },
  {
    title: "आरती पद ६ व फलश्रुति (Verse 6 & Phalasruti)",
    devanagari: "कंचन थार कपूर सुहाई। आरती करत अंजना माई।।\nजो हनुमानजी की आरती गावै। बसि बैकुंठ परम पद पावै।।",
    transliteration: "Kanchan thar kapoor suhai | Aarti karat Anjana mai ||\nJo Hanumanji ki aarti gavai | Basi baikunth param pad pavai ||",
    meaning: "Mother Anjana offers the golden platter fragrant with burning camphor. Whoever sings this devotional Aarti of Hanuman attains residence in Vaikuntha, the supreme spiritual abode."
  }
];

export default function AartiClient() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* 1. Public Layout (no-print) */}
      <div className="no-print space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
            Devotional Worship (आरती पूजा)
          </span>
          <h1 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
            Shree Hanuman Aarti
          </h1>
          <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
            Sing along to the traditional Aarti composed by Goswami Tulsidas. Wave the diya, ring the bell, and immerse yourself in praise of Hanuman Lala.
          </p>
        </div>

        <CarvedDivider icon="🕉️" />

        {/* Complete Scripture Lyrics */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif-display text-2xl uppercase tracking-wider font-bold text-maroon-deep">
              Shree Hanuman Aarti Lyrics & Meaning
            </h2>
            <p className="text-xs text-charcoal-brown/60">आरती कीजै हनुमान लला की — संपूर्ण पद एवं हिंदी भावार्थ</p>
          </div>

          <div className="space-y-4">
            {AARTI_VERSES.map((v, idx) => (
              <div key={idx} className="p-6 bg-stone-ivory border border-brass-gold/30 rounded-lg shadow-sm space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brass-gold block">
                  {v.title}
                </span>
                <p className="font-hindi-display text-xl sm:text-2xl text-maroon-deep font-bold text-center leading-loose whitespace-pre-line">
                  {v.devanagari}
                </p>
                <p className="text-xs text-charcoal-brown/70 italic text-center whitespace-pre-line">
                  {v.transliteration}
                </p>
                <div className="pt-2 border-t border-brass-gold/20 text-xs sm:text-sm text-charcoal-brown/90 leading-relaxed">
                  <strong className="text-vermilion block text-[11px] uppercase tracking-wider mb-0.5">Meaning:</strong>
                  {v.meaning}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Synced Audio Player */}
        <section className="space-y-4">
          <h2 className="font-serif-display text-base font-bold uppercase tracking-wider text-maroon-deep text-center">
            Listen with Synced Lyrics
          </h2>
          <div className="border border-brass-gold/30 rounded-lg p-4 bg-stone-ivory shadow-sm">
            <SyncedAudioPlayer defaultTrackId="track-3" />
          </div>
        </section>

        {/* PDF Download Action Banner */}
        <div className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="font-serif-display text-lg text-marigold uppercase tracking-wider font-bold">
              Print Hanuman Aarti Lyrics
            </h2>
            <p className="text-xs text-stone-ivory/80 max-w-lg leading-relaxed">
              Generate a vector-clear print format of the Aarti lyrics for offline worship.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-5 py-2.5 rounded text-xs font-bold uppercase border border-brass-gold shadow-sm transition-all duration-300 whitespace-nowrap"
          >
            🖨️ Print / Save PDF
          </button>
        </div>

        {/* Recitation Guide */}
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
            Chanting the Aarti releases positive devotional frequencies in the mind, dissolving negativity, stress, and anxiety. To explore the wider spiritual benefits of Hanuman devotion in detail, view our shared <a href="/hanuman-chalisa-benefits" className="text-vermilion hover:underline font-bold">Hanuman Chalisa Benefits page</a>.
          </p>
        </section>

        {/* Related Content Links */}
        <section className="bg-stone-ivory border border-brass-gold/25 p-6 rounded-lg text-center space-y-3">
          <h3 className="font-serif-display text-sm font-bold uppercase text-maroon-deep">
            Related Devotional Chants (संबंधित पाठ)
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <a href="/" className="text-vermilion hover:text-marigold underline">
              Shree Hanuman Chalisa
            </a>
            <span className="text-brass-gold/40">•</span>
            <a href="/hanuman-chalisa-meaning" className="text-vermilion hover:text-marigold underline">
              Bilingual Meaning
            </a>
            <span className="text-brass-gold/40">•</span>
            <a href="/sankat-mochan-hanumanashtak" className="text-vermilion hover:text-marigold underline">
              Hanumanashtak
            </a>
            <span className="text-brass-gold/40">•</span>
            <a href="/bajrang-baan" className="text-vermilion hover:text-marigold underline">
              Bajrang Baan
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
