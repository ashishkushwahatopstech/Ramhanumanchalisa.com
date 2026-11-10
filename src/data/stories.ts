export interface StorySlide {
  id: string;
  title: string;
  subtitle?: string;
  verse?: string;
  verseMeaning?: string;
  text: string;
  image?: string;
  bgGradient?: string;
  badge?: string;
}

export interface DevotionalStory {
  id: string;
  slug: string;
  title: string;
  hindiTitle: string;
  category: string;
  coverImage?: string;
  coverIcon: string;
  published: boolean;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  relatedUrl: string;
  relatedLabel: string;
  slides: StorySlide[];
}

export const DEVOTIONAL_STORIES: DevotionalStory[] = [
  {
    id: "story-1",
    slug: "shri-hanuman-chalisa-origin",
    title: "Origins of Hanuman Chalisa",
    hindiTitle: "हनुमान चालीसा प्राकट्य कथा",
    category: "Hanuman Chalisa",
    coverIcon: "🕉️",
    published: true,
    publishedAt: "2026-09-01",
    metaTitle: "Story: Origin of Shri Hanuman Chalisa by Goswami Tulsidas",
    metaDescription: "Discover how Goswami Tulsidas composed the 40 chaupais of Shree Hanuman Chalisa with faith and divine protection.",
    relatedUrl: "/hanuman-chalisa-meaning",
    relatedLabel: "Read Complete Meaning",
    slides: [
      {
        id: "slide-1",
        title: "Tulsidas in Fatehpur Sikri",
        badge: "प्राकट्य कथा • १",
        text: "In the 16th century, Goswami Tulsidas visited the imperial court in Fatehpur Sikri. When requested to display a miracle, he humbly replied: 'I possess no miraculous powers; I know only the holy name of Shri Rama.'",
        bgGradient: "from-[#4A1216] via-[#6B1E23] to-[#2B1B12]",
      },
      {
        id: "slide-2",
        title: "The Forty Days of Surrender",
        badge: "अखंड साधना • २",
        text: "Imprisoned within the royal fort, Tulsidas surrendered his heart to Mahavira Hanuman. Each day, with unbroken devotion, he composed and meditated upon sacred Awadhi quatrains praising Hanumanji's infinite valor and mercy.",
        bgGradient: "from-[#C95716] via-[#6B1E23] to-[#34251D]",
      },
      {
        id: "slide-3",
        title: "The Forty Quatrains (Chaupais)",
        badge: "सिद्ध स्तोत्र • ३",
        verse: "जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई।।",
        verseMeaning: "He who recites this sacred prayer one hundred times is freed from all bondage and attains supreme bliss.",
        text: "On the fortieth day, a legion of monkeys surrounded the royal ramparts. Recognizing the divine sanction, the Emperor released the revered saint with full honor, immortalizing the forty verses as an invincible shield.",
        bgGradient: "from-[#E87524] via-[#C95716] to-[#4A1216]",
      },
    ],
  },
  {
    id: "story-2",
    slug: "bajrang-baan-sacred-shield",
    title: "The Bajrang Baan Shield",
    hindiTitle: "श्री बजरंग बाण रक्षा कवच",
    category: "Bajrang Baan",
    coverIcon: "⚡",
    published: true,
    publishedAt: "2026-09-05",
    metaTitle: "Story: The Invincible Shield of Shri Bajrang Baan",
    metaDescription: "Understand the sacred oaths and spiritual discipline of reciting the Shree Bajrang Baan for dispelling fear and distress.",
    relatedUrl: "/bajrang-baan",
    relatedLabel: "Recite Bajrang Baan",
    slides: [
      {
        id: "slide-1",
        title: "The Sacred Oath of Lord Rama",
        badge: "राम शपथ • १",
        text: "The Bajrang Baan is a potent esoteric hymn that invokes the sacred vow and promise made by Bhagwan Shri Ram Chandra to protect all earnest devotees who take refuge in his holy name.",
        bgGradient: "from-[#34251D] via-[#6B1E23] to-[#C95716]",
      },
      {
        id: "slide-2",
        title: "When to Recite Bajrang Baan",
        badge: "नियम एवं विधि • २",
        verse: "इन्हें मारु तोहि सपथ राम की। राखु नाथ मरजाद नाम की।।",
        verseMeaning: "O Hanuman! Dispel these adversities in the sacred name of Lord Rama and protect the dignity of his holy vow.",
        text: "Tradition teaches that Bajrang Baan should be recited during acute crises, night terrors, or severe planetary distress. It should always be approached with physical purity and selfless devotion.",
        bgGradient: "from-[#C95716] via-[#4A1216] to-[#2B1B12]",
      },
    ],
  },
  {
    id: "story-3",
    slug: "sanjeevani-mountain-feat",
    title: "Bringing the Sanjeevani",
    hindiTitle: "संजीवनी बूटी एवं द्रोणागिरि",
    category: "Ramayana Stories",
    coverIcon: "🏔️",
    published: true,
    publishedAt: "2026-09-10",
    metaTitle: "Story: How Lord Hanuman Brought Mount Dronagiri for Lakshmana",
    metaDescription: "Explore the epic devotion of Lord Hanuman leaping to the Himalayas to bring the Sanjeevani herb to revive Lakshmana.",
    relatedUrl: "/hanuman-chalisa-benefits/health",
    relatedLabel: "Healing Chaupai Vidhi",
    slides: [
      {
        id: "slide-1",
        title: "The Midnight Peril on the Battlefield",
        badge: "युद्ध काण्ड • १",
        text: "When Lakshmana was struck unconscious by Meghnad's Shakti spear, the royal Vaidya Sushena declared that only the Sanjeevani herb from the distant Dronagiri mountain in the Himalayas could revive him before sunrise.",
        bgGradient: "from-[#2B1B12] via-[#4A1216] to-[#6B1E23]",
      },
      {
        id: "slide-2",
        title: "Lifting the Entire Mountain",
        badge: "अतुलित बल • २",
        verse: "लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये।।",
        verseMeaning: "You brought the Sanjeevani herb and revived Lakshmana; Lord Rama embraced you with profound joy.",
        text: "Unable to distinguish the exact glowing herb upon reaching Dronagiri, Hanuman assumed his colossal Mahavira form, lifted the entire mountain on his palm, and flew back through the night sky to save Lakshmana.",
        bgGradient: "from-[#C95716] via-[#E87524] to-[#6B1E23]",
      },
    ],
  },
  {
    id: "story-4",
    slug: "panchamukhi-hanuman-significance",
    title: "The 5 Divine Faces",
    hindiTitle: "पंचमुखी हनुमान जी का रहस्य",
    category: "Hanuman Ji Facts",
    coverIcon: "🛡️",
    published: true,
    publishedAt: "2026-09-12",
    metaTitle: "Story: The Secrets of Panchamukhi Hanuman",
    metaDescription: "Learn the spiritual significance of the five sacred faces of Lord Hanuman: Vanara, Garuda, Varaha, Narasimha, and Hayagriva.",
    relatedUrl: "/hanuman-stuti",
    relatedLabel: "Explore Hanuman Stuti",
    slides: [
      {
        id: "slide-1",
        title: "Extinguishing the Five Lamps",
        badge: "पाताल विजय • १",
        text: "To vanquish Ahiravana in Patala Loka and rescue Shri Rama and Lakshmana, Hanumanji needed to extinguish five mystical lamps pointing in five directions at the exact same instant.",
        bgGradient: "from-[#4A1216] via-[#6B1E23] to-[#34251D]",
      },
      {
        id: "slide-2",
        title: "The Five Sacred Manifestations",
        badge: "पंच रूप • २",
        text: "He manifested five divine faces: East (Sri Hanuman for purity), South (Sri Narasimha for courage), West (Sri Garuda for protection against poisons), North (Sri Varaha for prosperity), and Skyward (Sri Hayagriva for supreme wisdom).",
        bgGradient: "from-[#E87524] via-[#C95716] to-[#4A1216]",
      },
    ],
  },
  {
    id: "story-5",
    slug: "sacred-hanuman-mantras",
    title: "Sacred Hanuman Mantras",
    hindiTitle: "सिद्ध हनुमान बीज मंत्र",
    category: "Mantras",
    coverIcon: "🪔",
    published: true,
    publishedAt: "2026-09-14",
    metaTitle: "Story: Powerful Daily Hanuman Mantras for Peace & Power",
    metaDescription: "Discover authentic Vedic and Puranic mantras dedicated to Lord Hanuman for clarity, fearlessness, and divine grace.",
    relatedUrl: "/hanuman-chalisa-meaning",
    relatedLabel: "Learn Mantra Breakdown",
    slides: [
      {
        id: "slide-1",
        title: "The Mool Beej Mantra",
        badge: "बीज मंत्र • १",
        verse: "ॐ हं हनुमते नमः॥",
        verseMeaning: "Om Ham Hanumate Namah - I bow with absolute surrender to the invincible Lord Hanuman.",
        text: "This single-seed mantra resonates with the solar plexus (Manipura chakra), awakening inner confidence, mental clarity, and dissolving negative emotional states.",
        bgGradient: "from-[#C95716] via-[#6B1E23] to-[#2B1B12]",
      },
      {
        id: "slide-2",
        title: "The Manojavam Stotram",
        badge: "मनोजवं मारुततुल्यवेगं • २",
        verse: "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥",
        verseMeaning: "I surrender to the messenger of Shri Rama, who is swift as thought, fast as the wind, master of senses, and supreme among the wise.",
        text: "Reciting this classical Sanskrit verse before any recitation or journey invites divine clarity and removes obstacles from one's path.",
        bgGradient: "from-[#34251D] via-[#C95716] to-[#E87524]",
      },
    ],
  },
  {
    id: "story-6",
    slug: "brahma-muhurat-chanting-rules",
    title: "Brahma Muhurat Sadhana",
    hindiTitle: "ब्रह्म मुहूर्त साधना नियम",
    category: "Puja Vidhi",
    coverIcon: "🌅",
    published: true,
    publishedAt: "2026-09-16",
    metaTitle: "Story: Sacred Rules for Chanting Hanuman Chalisa at Dawn",
    metaDescription: "Learn why dawn recitation during Brahma Muhurat creates harmonizing vibrations and clears mental anxiety.",
    relatedUrl: "/shri-hanuman-chalisa-path-vidhi",
    relatedLabel: "Read Complete Vidhi",
    slides: [
      {
        id: "slide-1",
        title: "The Hours of the Gods",
        badge: "अमृत बेला • १",
        text: "Brahma Muhurat begins 1 hour and 36 minutes before sunrise (roughly 4:00 AM to 5:30 AM). The environment is saturated with pure Sattva Guna and vital atmospheric Prana, calming the reciter's mind.",
        bgGradient: "from-[#4A1216] via-[#6B1E23] to-[#34251D]",
      },
      {
        id: "slide-2",
        title: "Lighting the Pure Ghee Diya",
        badge: "दीप प्रज्वलन • २",
        text: "Sit on a clean wool or kusha grass mat facing East. Illuminate a brass diya with pure cow ghee or sesame oil. Devotees who recite 3, 7, or 11 times consistently experience boundless peace and resilience.",
        bgGradient: "from-[#E87524] via-[#C95716] to-[#4A1216]",
      },
    ],
  },
  {
    id: "story-7",
    slug: "hanuman-jayanti-celebration",
    title: "Hanuman Jayanti Rituals",
    hindiTitle: "हनुमान जयंती पूजन विधि",
    category: "Festivals",
    coverIcon: "🚩",
    published: true,
    publishedAt: "2026-09-18",
    metaTitle: "Story: Auspicious Celebrations of Hanuman Jayanti",
    metaDescription: "Understand the sacred rituals, sindoor offering, and vrata guidelines for Shri Hanuman Jayanti.",
    relatedUrl: "/hanuman-jayanti",
    relatedLabel: "Jayanti Puja Guide",
    slides: [
      {
        id: "slide-1",
        title: "The Chaitra Purnima Descent",
        badge: "अवतरण दिवस • १",
        text: "Lord Hanuman appeared on the full moon day (Purnima) of Chaitra month as the spiritual son of Mata Anjana and Kesari, blessed by Vayu Deva, to serve Bhagwan Shri Ram Chandra.",
        bgGradient: "from-[#34251D] via-[#6B1E23] to-[#C95716]",
      },
      {
        id: "slide-2",
        title: "Offering Chola & Sindoor",
        badge: "सिंदूर अर्पण • २",
        text: "Offering orange sindoor blended with jasmine (chameli) oil symbolizes complete self-effacing surrender to Lord Rama. On Jayanti, reciting the Chalisa 100 times fulfills auspicious sankalpas.",
        bgGradient: "from-[#C95716] via-[#E87524] to-[#4A1216]",
      },
    ],
  },
  {
    id: "story-8",
    slug: "sundarkand-triumph-over-distress",
    title: "The Power of Sundarkand",
    hindiTitle: "सुंदरकांड का आध्यात्मिक प्रभाव",
    category: "Spiritual Knowledge",
    coverIcon: "📜",
    published: true,
    publishedAt: "2026-09-20",
    metaTitle: "Story: Why Reciting Sundarkand Overcomes All Adversities",
    metaDescription: "Discover why the Sundarkand chapter of Ramcharitmanas brings mental peace, victory over fear, and auspicious blessings.",
    relatedUrl: "/ram-hanuman-chalisa",
    relatedLabel: "Explore Ram-Hanuman Bond",
    slides: [
      {
        id: "slide-1",
        title: "The Chapter of Triumph",
        badge: "विजय काण्ड • १",
        text: "Sundarkand is the only chapter in the Ramayana where Mahavira Hanuman is the central hero. It portrays boundless faith turning the seemingly impossible into effortless victory.",
        bgGradient: "from-[#4A1216] via-[#6B1E23] to-[#2B1B12]",
      },
      {
        id: "slide-2",
        title: "Dissolving Household Discord",
        badge: "सकल मंगल • २",
        text: "Chanting Sundarkand on Tuesdays or Saturdays infuses the home with courage and removes psychological shadows. It reminds every seeker that devotion to Rama makes every hardship sugameva (effortless).",
        bgGradient: "from-[#E87524] via-[#C95716] to-[#4A1216]",
      },
    ],
  },
];
