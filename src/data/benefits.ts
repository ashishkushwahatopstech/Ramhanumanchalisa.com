export interface BenefitDetails {
  slug: string;
  title: string;
  situation: string;
  icon: string;
  description: string;
  recommendedChants: string; // e.g. "11 times on Saturdays"
  targetVerseNumber: number; // The verse related to this benefit
  targetVerseText: string;   // Devanagari verse
  targetVerseTranslation: string;
  detailedExposition: string;
  actionSteps: string[];
}

export const BENEFITS_DATA: Record<string, BenefitDetails> = {
  career: {
    slug: "career",
    title: "Hanuman Chalisa for Career Growth & Job Success",
    situation: "Stuck in career, seeking promotion, job insecurity, or starting a business.",
    icon: "💼",
    description: "Reciting the Hanuman Chalisa instills unwavering confidence and courage, which are key for professional growth. Hanuman represents the ultimate service (seva) and dedication, traits that lead to recognition and success in modern workplaces.",
    recommendedChants: "Read 7 times every Tuesday morning before starting work.",
    targetVerseNumber: 7,
    targetVerseText: "विद्यावान गुणी अति चातुर। राम काज करिबे को आतुर।।",
    targetVerseTranslation: "Vidhyavan Guni Ati Chatur, Ram Kaj Karibe Ko Aatur. (You are highly learned, virtuous, and wise. You are always eager to perform Lord Rama's tasks.)",
    detailedExposition: "This verse (Chaupai 7) highlights Hanuman's intellect, competence, and readiness. In a professional context, it inspires devotees to cultivate skill, virtue, and an active readiness to execute responsibilities, removing lethargy and leading directly to career advancement.",
    actionSteps: [
      "Bathe and sit facing North or East on Tuesday mornings.",
      "Light a brass diya filled with mustard oil (Sarso ka tel).",
      "Recite Chaupai 7 eleven times individually, reflecting on its meaning.",
      "Read the full Hanuman Chalisa 7 times with focused attention.",
      "Vow to work with absolute dedication, seeing your professional duty as a form of worship (seva)."
    ]
  },
  health: {
    slug: "health",
    title: "Hanuman Chalisa for Health, Healing & Disease Removal",
    situation: "Recovering from chronic illness, suffering physical pain, or facing low energy.",
    icon: "🌱",
    description: "Lord Hanuman is also referred to as 'Sankat Mochan' (remover of distress) and is traditionally invoked for physical strength. Sound vibrations from chanting particular syllables have been observed to calm the nervous system and aid in physiological healing.",
    recommendedChants: "Read 11 times on Saturday evenings, or daily during illness.",
    targetVerseNumber: 25,
    targetVerseText: "नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा।।",
    targetVerseTranslation: "Nase Rog Hare Sab Peera, Japat Nirantar Hanumat Beera. (All diseases are destroyed and all pains are removed by constantly chanting the name of the brave Lord Hanuman.)",
    detailedExposition: "Chaupai 25 is the premier healing verse in the scripture. It assures devotees that constant remembrance and chanting of Hanuman's name will act as a shield against physical and mental ailments. It represents the restoration of vital energy (Prana) inside the body.",
    actionSteps: [
      "Keep a clean copper vessel filled with water in front of Hanuman's idol.",
      "Sit comfortably and recite Chaupai 25 precisely 108 times.",
      "Recite the full Hanuman Chalisa 3 or 11 times.",
      "Drink the energized water from the copper vessel as prasadam.",
      "Maintain a pure vegetarian diet during the healing period."
    ]
  },
  exams: {
    slug: "exams",
    title: "Hanuman Chalisa for Students, Focus & Exam Success",
    situation: "Students facing exam anxiety, lack of concentration, or memory lapses.",
    icon: "🎓",
    description: "Hanuman is a master of grammar and all shastras (scriptures). He holds absolute control over his senses (Jitendriya). Chanting his praise helps students stabilize their minds, improve cognitive recall, and overcome stress during exams.",
    recommendedChants: "Read 1 time daily before study sessions, and 3 times on exam days.",
    targetVerseNumber: 3,
    targetVerseText: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर।।",
    targetVerseTranslation: "Jai Hanuman Gyan Gun Sagar, Jai Kapis Tihun Lok Ujagar. (Victory to Hanuman, who is an ocean of wisdom and virtue. Victory to the Lord of Monkeys who illuminates the three worlds.)",
    detailedExposition: "The very first Chaupai of the Chalisa describes Hanuman as the 'Ocean of Wisdom' (Gyan Gun Sagar). By meditating on this verse, students connect with the energy of wisdom and mental clarity. It helps clear intellectual clouds and improves focus.",
    actionSteps: [
      "Sit at your study desk, close your eyes, and take 3 deep breaths.",
      "Recite the opening Doha and Chaupai 1 three times.",
      "Recite the entire Chalisa once with a calm, undistracted mind.",
      "Visualize your mind becoming sharp, focused, and steady like a mountain (Sumeru).",
      "Begin your study session immediately after chanting."
    ]
  },
  protection: {
    slug: "protection",
    title: "Hanuman Chalisa for Protection & Removing Negative Energies",
    situation: "Experiencing fear, anxiety, nightmares, bad dreams, or feeling negative vibes.",
    icon: "🛡️",
    description: "Lord Hanuman holds immense power to dispel negative cosmic influences, evil eyes, and fears. His name alone is a shield that acts as a fortress around the devotee, keeping negative entities and malicious forces at bay.",
    recommendedChants: "Chant 7 times before sleeping, or any time fear strikes.",
    targetVerseNumber: 24,
    targetVerseText: "भूत पिशाच निकट नहिं आवै। महाबीर जब नाम सुनावै।।",
    targetVerseTranslation: "Bhoot Pisach Nikat Nahi Aave, Mahavir Jab Naam Sunave. (Ghosts and evil spirits do not come near when one utters the name of the great hero, Hanuman.)",
    detailedExposition: "Chaupai 24 is traditionally used for direct protection. It states that negative energies cannot enter the aura of a person who remembers the valor of Hanuman. It immediately dispels fear of the dark, ghosts, and negative projections.",
    actionSteps: [
      "Wash your hands, feet, and face before bedtime.",
      "Sit on your bed facing East.",
      "Recite Chaupai 24 eleven times with firm faith.",
      "Read the full Hanuman Chalisa or the Bajrang Baan once.",
      "Sleep with a relaxed mind, knowing that Hanuman's shield protects you."
    ]
  },
  "marriage-delays": {
    slug: "marriage-delays",
    title: "Hanuman Chalisa for Delayed Marriages & Family Conflicts",
    situation: "Unreasonable delays in marriage, finding a life partner, or household discord.",
    icon: "🤝",
    description: "Hanuman is the ultimate messenger of union. He was the one who located Mother Sita, crossed the ocean, and brought the ring of union from Lord Rama, resolving their separation. Chanting his praise helps resolve relationship blockages and brings harmony.",
    recommendedChants: "Read 11 times every Saturday morning for 21 consecutive Saturdays.",
    targetVerseNumber: 11,
    targetVerseText: "लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये।।",
    targetVerseTranslation: "Lay Sajivan Lakhan Jiyaye, Shri Raghuveer Harashi Ur Laye. (You brought the Sanjeevani herb and revived Lakshmana; Lord Rama embraced you with joy.)",
    detailedExposition: "Chaupai 11 describes the revival of Lakshmana and the joy of Lord Rama, who embraced Hanuman. This verse represents the healing of relationships, the resolution of separation, and the return of joy and union in the family.",
    actionSteps: [
      "Perform puja on Saturday mornings, offering red flowers to Hanuman.",
      "Light a diya with sesame oil (Til ka tel).",
      "Recite Chaupai 11 and Chaupai 12 eleven times each.",
      "Chant the complete Hanuman Chalisa 11 times.",
      "Pray sincerely for the resolution of relationship hurdles and family peace."
    ]
  }
};
