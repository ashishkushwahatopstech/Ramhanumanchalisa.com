"use client";

import React, { useState } from "react";

interface DailyVerse {
  chaupaiNumber: number;
  verse: string;
  hindiMeaning: string;
  englishMeaning: string;
  benefitContext: string;
}

const VERIFIED_DAILY_VERSES: DailyVerse[] = [
  {
    chaupaiNumber: 1,
    verse: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥",
    hindiMeaning: "हे ज्ञान और सद्गुणों के अगाध सागर श्री हनुमान जी, आपकी जय हो! तीनों लोकों को अपने पावन तेज से प्रकाशित करने वाले कपीश्वर, आपकी जय हो।",
    englishMeaning: "Victory to Lord Hanuman, the boundless ocean of supreme wisdom and virtue. Victory to the Lord of Vanaras who illuminates the three worlds.",
    benefitContext: "For mental clarity, wisdom, and overcoming intellectual confusion.",
  },
  {
    chaupaiNumber: 7,
    verse: "विद्यावान गुणी अति चातुर। राम काज करिबे को आतुर॥",
    hindiMeaning: "आप समस्त विद्याओं के ज्ञाता, परम गुणवान और अत्यंत चतुर हैं। आप सदैव प्रभु श्री राम के कार्यों को सिद्ध करने हेतु तत्पर रहते हैं।",
    englishMeaning: "You are master of all sciences, repository of noble virtues, and immensely wise. You are always eager to execute Lord Rama's tasks.",
    benefitContext: "For career advancement, focus, and excellence in professional work.",
  },
  {
    chaupaiNumber: 11,
    verse: "लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये॥",
    hindiMeaning: "आपने संजीवनी बूटी लाकर लक्ष्मण जी के प्राणों की रक्षा की, जिससे हर्षित होकर भगवान श्री राम ने आपको प्रेमपूर्वक हृदय से लगा लिया।",
    englishMeaning: "You brought the Sanjeevani herb and revived Lakshmana; Lord Rama embraced you with deep spiritual joy.",
    benefitContext: "For healing relationships, family peace, and overcoming delays.",
  },
  {
    chaupaiNumber: 20,
    verse: "दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥",
    hindiMeaning: "इस संसार में जितने भी कठिन से कठिन कार्य हैं, वे सभी आपकी कृपा और आशीर्वाद से अत्यंत सुगम और सरल हो जाते हैं।",
    englishMeaning: "All difficult and formidable endeavors in this world become effortlessly accomplished through your divine grace.",
    benefitContext: "For resolving complex life obstacles and insurmountable tasks.",
  },
  {
    chaupaiNumber: 24,
    verse: "भूत पिशाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥",
    hindiMeaning: "जहाँ भी महावीर हनुमान जी का पावन नाम स्मरण किया जाता है, वहाँ भूत, पिशाच, भय और नकारात्मक ऊर्जाएं कदापि निकट नहीं आ सकतीं।",
    englishMeaning: "Negative forces, nightmares, and evil spirits cannot come near the devotee who remembers the valorous name of Mahavira.",
    benefitContext: "For absolute protection from fear, anxiety, and dark vibrations.",
  },
  {
    chaupaiNumber: 25,
    verse: "नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥",
    hindiMeaning: "वीर हनुमान जी के पावन नाम का निरंतर जप करने से समस्त शारीरिक रोग नष्ट हो जाते हैं और समस्त मानसिक पीड़ाएं दूर हो जाती हैं।",
    englishMeaning: "All physical ailments are dissolved and all chronic sufferings vanish for the seeker who continuously chants the holy name of Hanuman.",
    benefitContext: "For holistic healing, vital energy restoration, and disease recovery.",
  },
  {
    chaupaiNumber: 36,
    verse: "संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥",
    hindiMeaning: "जो भी पुण्यात्मा महाबली वीर हनुमान जी का स्मरण करता है, उसके सारे संकट कट जाते हैं और सारे कष्ट सदा के लिए मिट जाते हैं।",
    englishMeaning: "All tribulations are severed and all agonies extinguished for the devotee who meditates upon the mighty hero Hanuman.",
    benefitContext: "For instant distress removal and steady inner peace.",
  },
];

export default function TodaysDevotion() {
  const [copied, setCopied] = useState(false);

  // Compute a deterministic daily index based on day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const activeVerse = VERIFIED_DAILY_VERSES[dayOfYear % VERIFIED_DAILY_VERSES.length];

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleCopy = async () => {
    const textToCopy = `🚩 आज की पावन चौपाई (Today's Sacred Verse):\n\n${activeVerse.verse}\n\nअर्थ: ${activeVerse.hindiMeaning}\n\nEnglish: ${activeVerse.englishMeaning}\n\nRead more on RamHanumanChalisa.com:\nhttps://ramhanumanchalisa.com/hanuman-chalisa-meaning`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsApp = () => {
    const text = `🚩 आज की पावन चौपाई (Today's Sacred Verse):\n\n${activeVerse.verse}\n\nअर्थ: ${activeVerse.hindiMeaning}\n\nEnglish: ${activeVerse.englishMeaning}\n\nRead full meaning & audio:\nhttps://ramhanumanchalisa.com/hanuman-chalisa-meaning`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-6" aria-label="Today's Devotion">
      <div className="devotional-card p-6 sm:p-8 bg-gradient-to-br from-[#FFFFFF] via-[#FFF9F0] to-[#FAF3E8] border-2 border-[#C9A45C]/40 shadow-md">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C9A45C]/25 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C95716] block">
                आज का पावन विचार • Today's Sacred Chaupai
              </span>
              <span className="text-xs text-[#34251D]/60 font-sans">
                {formattedDate} • चौपाई {activeVerse.chaupaiNumber}
              </span>
            </div>
          </div>

          <span className="text-[11px] font-bold text-[#4A1216] bg-[#C9A45C]/15 border border-[#C9A45C]/40 px-3 py-1 rounded-full self-start sm:self-center">
            {activeVerse.benefitContext}
          </span>
        </div>

        {/* Sacred Verse Highlight */}
        <div className="py-6 text-center space-y-3">
          <p className="font-hindi-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#4A1216] leading-relaxed">
            {activeVerse.verse}
          </p>

          <p className="font-hindi-display text-sm sm:text-base text-[#C95716] font-semibold max-w-2xl mx-auto leading-relaxed">
            {activeVerse.hindiMeaning}
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#34251D]/75 max-w-2xl mx-auto leading-relaxed italic">
            "{activeVerse.englishMeaning}"
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-[#C9A45C]/25 flex flex-wrap items-center justify-between gap-3">
          <a
            href="/hanuman-chalisa-meaning"
            className="text-xs font-bold text-[#C95716] hover:text-[#E87524] transition-colors flex items-center gap-1"
          >
            <span>Explore Word Breakdown & Meaning</span>
            <span>→</span>
          </a>

          <div className="flex items-center gap-2">
            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#C9A45C]/40 hover:border-[#E87524] text-xs font-semibold text-[#4A1216] shadow-2xs transition-colors flex items-center gap-1"
              title="Copy verse and meaning"
            >
              <span>📋</span>
              <span>{copied ? "Copied!" : "Copy Verse"}</span>
            </button>

            {/* WhatsApp Share Button */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs transition-transform hover:scale-105 flex items-center gap-1"
              title="Share to WhatsApp"
            >
              <span>💬</span>
              <span>Share WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
