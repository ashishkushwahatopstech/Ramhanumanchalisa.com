"use client";

import React, { useState } from "react";

interface DailyVerse {
  chaupaiNumber: number;
  verse: string;
  hindiMeaning: string;
  englishMeaning: string;
  benefitContext: string;
  beejMantra: string;
}

const VERIFIED_DAILY_VERSES: DailyVerse[] = [
  {
    chaupaiNumber: 1,
    verse: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥",
    hindiMeaning: "हे ज्ञान और सद्गुणों के अगाध सागर श्री हनुमान जी, आपकी जय हो! तीनों लोकों को अपने पावन तेज से प्रकाशित करने वाले कपीश्वर, आपकी जय हो।",
    englishMeaning: "Victory to Lord Hanuman, the boundless ocean of supreme wisdom and virtue. Victory to the Lord of Vanaras who illuminates the three worlds.",
    benefitContext: "बुद्धि, ज्ञान एवं सद्विचार की प्राप्ति (Mental Clarity & Wisdom)",
    beejMantra: "ॐ हं हनुमते नमः",
  },
  {
    chaupaiNumber: 7,
    verse: "विद्यावान गुणी अति चातुर। राम काज करिबे को आतुर॥",
    hindiMeaning: "आप समस्त विद्याओं के ज्ञाता, परम गुणवान और अत्यंत चतुर हैं। आप सदैव प्रभु श्री राम के कार्यों को सिद्ध करने हेतु तत्पर रहते हैं।",
    englishMeaning: "You are the master of all sciences, repository of noble virtues, and immensely wise. You are always eager to execute Lord Rama's tasks.",
    benefitContext: "कार्य-व्यापार में सफलता एवं एकाग्रता (Career Excellence & Focus)",
    beejMantra: "ॐ नमो भगवते आंजनेयाय महाबलाय स्वाहा",
  },
  {
    chaupaiNumber: 11,
    verse: "लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये॥",
    hindiMeaning: "आपने संजीवनी बूटी लाकर लक्ष्मण जी के प्राणों की रक्षा की, जिससे हर्षित होकर भगवान श्री राम ने आपको प्रेमपूर्वक हृदय से लगा लिया।",
    englishMeaning: "You brought the Sanjeevani herb and revived Lakshmana; Lord Rama embraced you with deep spiritual joy.",
    benefitContext: "पारिवारिक सौहार्द एवं संकट से जीवन रक्षा (Family Peace & Healing)",
    beejMantra: "ॐ हं हनुमते रुद्रात्मकाय हुं फट्",
  },
  {
    chaupaiNumber: 20,
    verse: "दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥",
    hindiMeaning: "इस संसार में जितने भी कठिन से कठिन कार्य हैं, वे सभी आपकी असीम कृपा और आशीर्वाद से अत्यंत सुगम और सरल हो जाते हैं।",
    englishMeaning: "All difficult and formidable endeavors in this world become effortlessly accomplished through your divine grace.",
    benefitContext: "कठिन कार्यों की सहज सिद्धि (Overcoming Life Obstacles)",
    beejMantra: "ॐ तेजसे नमः",
  },
  {
    chaupaiNumber: 24,
    verse: "भूत पिशाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥",
    hindiMeaning: "जहाँ भी महावीर हनुमान जी का पावन नाम स्मरण किया जाता है, वहाँ नकारात्मक ऊर्जाएं, भय और संकट कदापि निकट नहीं आ सकते।",
    englishMeaning: "Negative vibrations, nightmares, and fear cannot approach the devotee who meditates upon the valorous name of Mahavira.",
    benefitContext: "भय, दुःस्वप्न एवं नकारात्मकता से रक्षा (Protection from Negative Energies)",
    beejMantra: "ॐ दक्षिणमुखाय पञ्चमुखहनुमते करालास्याय नमः",
  },
  {
    chaupaiNumber: 25,
    verse: "नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥",
    hindiMeaning: "वीर हनुमान जी के पावन नाम का निरंतर जप करने से समस्त शारीरिक व्याधियां नष्ट हो जाती हैं और समस्त मानसिक पीड़ाएं दूर हो जाती हैं।",
    englishMeaning: "All physical ailments are dissolved and all chronic agonies vanish for the seeker who continuously chants the holy name of Hanuman.",
    benefitContext: "आरोग्य, ऊर्जा एवं स्वास्थ्य लाभ (Holistic Health & Vitality)",
    beejMantra: "ॐ आरोग्य प्रदायकाय नमः",
  },
  {
    chaupaiNumber: 36,
    verse: "संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥",
    hindiMeaning: "जो भी पुण्यात्मा महाबली वीर हनुमान जी का श्रद्धापूर्वक स्मरण करता है, उसके सारे संकट कट जाते हैं और सारे कष्ट सदा के लिए मिट जाते हैं।",
    englishMeaning: "All tribulations are severed and all agonies extinguished for the devotee who meditates upon the mighty hero Hanuman.",
    benefitContext: "तात्कालिक संकट निवारण (Instant Tribulation Removal)",
    beejMantra: "ॐ सर्वदुःखहराय नमः",
  },
  {
    chaupaiNumber: 38,
    verse: "जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥",
    hindiMeaning: "जो भी भक्त इस चालीसा का श्रद्धापूर्वक सौ बार पाठ करता है, वह समस्त बंधनों और कष्टों से मुक्त होकर परम सुख और शांति प्राप्त करता है।",
    englishMeaning: "Whoever recites this Chalisa with devotion a hundred times is liberated from all bondages and attains supreme spiritual joy.",
    benefitContext: "बंधन मुक्ति एवं परम शांति (Spiritual Liberation & Bliss)",
    beejMantra: "ॐ रामदूताय नमः",
  },
];

export default function DailySadhana() {
  const [copied, setCopied] = useState(false);
  const [chantCount, setChantCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Compute deterministic daily index based on day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const activeVerse = VERIFIED_DAILY_VERSES[dayOfYear % VERIFIED_DAILY_VERSES.length];

  const dayOfWeek = now.getDay(); // 2 = Tuesday, 6 = Saturday
  const isSpecialDay = dayOfWeek === 2 || dayOfWeek === 6;
  const specialDayTitle = dayOfWeek === 2 ? "मंगलवार पावन साधना" : dayOfWeek === 6 ? "शनिवार विशेष साधना" : "नित्य हनुमान साधना";

  const formattedDate = now.toLocaleDateString("hi-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleIncrement = () => {
    if (chantCount < 11) {
      const next = chantCount + 1;
      setChantCount(next);
      if (next === 11) {
        setIsCompleted(true);
      }
    }
  };

  const handleReset = () => {
    setChantCount(0);
    setIsCompleted(false);
  };

  const handleCopy = async () => {
    const textToCopy = `🚩 आज की पावन साधना (Today's Sacred Verse):\n\n${activeVerse.verse}\n\nभावार्थ: ${activeVerse.hindiMeaning}\n\nEnglish: ${activeVerse.englishMeaning}\n\nफल: ${activeVerse.benefitContext}\n\nबीज मंत्र: ${activeVerse.beejMantra}\n\nसम्पूर्ण पाठ एवं शब्दार्थ पढ़ें:\nhttps://ramhanumanchalisa.com/`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsApp = () => {
    const text = `🚩 आज की पावन साधना (Today's Sacred Verse):\n\n${activeVerse.verse}\n\nभावार्थ: ${activeVerse.hindiMeaning}\n\nEnglish: ${activeVerse.englishMeaning}\n\nफल: ${activeVerse.benefitContext}\n\nबीज मंत्र: ${activeVerse.beejMantra}\n\nश्री हनुमान चालीसा सस्वर पाठ:\nhttps://ramhanumanchalisa.com/`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const progressPercent = Math.min(100, Math.round((chantCount / 11) * 100));

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6" aria-label="Daily Devotion and Sadhana Hub">
      <div className="devotional-card bg-gradient-to-br from-[#FFFFFF] via-[#FFF9F0] to-[#F6EFE3] border-2 border-[#C9A45C]/50 shadow-xl overflow-hidden rounded-2xl">
        
        {/* Top Sacred Sadhana Banner */}
        <div className={`px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white ${
          isSpecialDay 
            ? "bg-gradient-to-r from-[#992200] via-[#C95716] to-[#E87524]" 
            : "bg-gradient-to-r from-[#4A1216] via-[#6B1E23] to-[#845B10]"
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="text-xl animate-pulse">🪔</span>
            <div>
              <span className="text-xs sm:text-sm font-hindi-display font-bold tracking-wide block">
                {specialDayTitle} • श्री हनुमान जी कृपा
              </span>
              <span className="text-[11px] text-white/80 font-sans block">
                {formattedDate} • चौपाई संख्या {activeVerse.chaupaiNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold bg-black/30 border border-[#C9A45C]/50 px-3 py-1 rounded-full backdrop-blur-xs text-[#FFF9F0]">
              {activeVerse.benefitContext.split("(")[0]}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Maha-Mantra Invocation Pill */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E87524]/10 border border-[#C9A45C]/40 text-[#C95716] text-xs font-bold font-hindi-display">
              <span>॥ नित्य बीज मंत्र ॥</span>
              <span className="font-mono text-[#4A1216] font-bold">{activeVerse.beejMantra}</span>
            </span>
          </div>

          {/* Featured Verse Callout */}
          <div className="text-center space-y-4 max-w-3xl mx-auto bg-white/80 border border-[#C9A45C]/30 p-6 sm:p-8 rounded-xl shadow-xs">
            <div className="text-xs font-bold text-[#C9A45C] uppercase tracking-widest font-serif-display">
              — आज का अमृत श्लोक • Sacred Chaupai of the Day —
            </div>
            
            <p className="font-hindi-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A1216] leading-relaxed drop-shadow-2xs">
              {activeVerse.verse}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#C9A45C]/20">
              <p className="font-hindi-display text-base sm:text-lg text-[#C95716] font-semibold leading-relaxed">
                <span className="font-bold text-[#4A1216]">भावार्थ: </span>
                {activeVerse.hindiMeaning}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#34251D]/75 leading-relaxed italic">
                "{activeVerse.englishMeaning}"
              </p>
            </div>
          </div>

          {/* Interactive 11-Chant Japa Tracker */}
          <div className="bg-[#FAF3E8] border border-[#C9A45C]/40 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-serif-display text-sm sm:text-base font-bold text-[#4A1216] flex items-center gap-2">
                  <span>📿</span>
                  <span>दैनिक ११ पाठ संकल्प (Daily 11 Recitation Counter)</span>
                </h4>
                <p className="text-xs text-[#34251D]/70 font-sans mt-0.5">
                  Tap each time you complete chanting this sacred chaupai to complete your daily sadhana.
                </p>
              </div>

              {/* Counter Badge */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs font-bold text-[#C95716] bg-white px-3 py-1 rounded-full border border-[#C9A45C]/40 shadow-2xs font-mono">
                  {chantCount} / 11 पाठ
                </span>
                {chantCount > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] text-[#34251D]/60 hover:text-[#C95716] underline transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white h-3 rounded-full overflow-hidden border border-[#C9A45C]/30 p-0.5">
              <div
                className="bg-gradient-to-r from-[#C95716] via-[#E87524] to-[#C9A45C] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Tap Counter Button or Completion Banner */}
            {isCompleted ? (
              <div className="bg-[#E87524]/10 border border-[#C95716] p-4 rounded-xl text-center space-y-2 animate-fade-in">
                <p className="font-hindi-display text-base sm:text-lg font-bold text-[#C95716]">
                  🌸 जय श्री राम! आपकी आज की ११ आवृत्ति साधना सम्पन्न हुई।
                </p>
                <p className="text-xs text-[#34251D]/80 font-sans">
                  श्री हनुमान जी महाराज आपके समस्त मनोरथ सिद्ध करें और जीवन में सुख, शांति, आरोग्य प्रदान करें।
                </p>
                <div className="pt-1 flex items-center justify-center gap-3">
                  <a
                    href="#chalisa-recitation"
                    className="text-xs font-bold text-white bg-[#C95716] hover:bg-[#E87524] px-4 py-2 rounded-full shadow-xs transition-colors"
                  >
                    सम्पूर्ण चालीसा पाठ पढ़ें →
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-[#4A1216] bg-white border border-[#C9A45C] px-3 py-2 rounded-full hover:bg-[#FFF9F0] cursor-pointer"
                  >
                    पुनः आरम्भ करें (Restart)
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center pt-1">
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#C95716] to-[#E87524] hover:from-[#E87524] hover:to-[#C95716] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 border border-[#C9A45C] active:scale-95 cursor-pointer"
                >
                  <span className="text-base">📿</span>
                  <span>१ पाठ पूर्ण • मनका फेरें (Count +1)</span>
                  <span className="text-xs opacity-80">({11 - chantCount} शेष)</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-4 border-t border-[#C9A45C]/25 flex flex-wrap items-center justify-between gap-3">
            <a
              href="#chalisa-recitation"
              className="text-xs sm:text-sm font-bold text-[#C95716] hover:text-[#E87524] transition-colors flex items-center gap-1.5"
            >
              <span>सम्पूर्ण ४० चौपाई पाठ एवं शब्दार्थ</span>
              <span>→</span>
            </a>

            <div className="flex items-center gap-2.5">
              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-lg bg-white border border-[#C9A45C]/40 hover:border-[#E87524] text-xs font-semibold text-[#4A1216] shadow-2xs hover:shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy verse and meaning"
              >
                <span>📋</span>
                <span>{copied ? "कॉपी हो गया!" : "Copy Chaupai"}</span>
              </button>

              {/* WhatsApp Share Button */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all hover:scale-103 flex items-center gap-1.5 cursor-pointer"
                title="Share to WhatsApp"
              >
                <span>💬</span>
                <span>Share WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
