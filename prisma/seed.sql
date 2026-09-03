
INSERT INTO "Post" ("id", "slug", "title", "excerpt", "content", "published", "createdAt", "updatedAt")
VALUES ('post-significance-of-forty-verses', 'significance-of-forty-verses', 'Why Hanuman Chalisa Has Exactly 40 Verses', 'Explore the astronomical, biological, and scriptural significance of the number 40 in the Hanuman Chalisa composed by Tulsidas.', '
The word **Chalisa** is derived from *Chalis*, the Hindi word for forty. Goswami Tulsidas composed exactly forty quatrains (Chaupais) praising Lord Hanuman, preceded by two introductory couplets (Dohas) and followed by one concluding couplet.

But why did Tulsidas choose the number forty? In ancient Indian sciences, the number forty holds profound significance across physical, biological, and planetary cycles.

### 1. Planetary Cycles (The Mars Connection)
Lord Hanuman is closely connected to the planet Mars (*Mangal*), which represents strength, focus, and fire. In Vedic astrology, a complete cycle of Mars across constellations takes a specific duration of time, and short-term chanting disciplines of forty days (*Mandala*) are designed to align with Mars'' influence, balancing planetary alignments in the devotee''s horoscope.

### 2. Biological Regeneration
In traditional Ayurveda, the human body undergoes a complete cellular and metabolic cycle every forty days. This is known as a *Mandala* cycle. Observing a disciplined chanting session of the Hanuman Chalisa for forty consecutive days aligns with this biological clock, allowing the positive neural and mental shifts of sound chanting to become permanently integrated into the nervous system.

### 3. Psychological Habit Formation
Modern neuroscience indicates that it takes approximately 21 to 40 days to break old habit loops and construct new neural pathways. By dedicating yourself to a daily recitation of the Chalisa for forty days, you establish a peaceful routine, overwrite anxiety loops, and build deep focus.

### The Chanting Vow (Anushthan)
Chaupai 38 itself explicitly calls out the number hundred (which equals ten sets of ten or corresponds to repeating cycles):
*“Jo sat bar path kare koi, chutahi bandi maha sukh hoi.”*
(He who recites this hundred times is freed from worldly bondage and attains supreme bliss.)

Whether you recite it forty times in a single sitting on a special festival day, or read it daily for forty consecutive days, this number represents a complete spiritual cycle that purifies the devotee''s surroundings.
    ', 1, '2026-09-03T17:52:20.404Z', '2026-09-03T17:52:20.404Z')
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "excerpt" = excluded."excerpt",
  "content" = excluded."content",
  "published" = 1;


INSERT INTO "Post" ("id", "slug", "title", "excerpt", "content", "published", "createdAt", "updatedAt")
VALUES ('post-brahma-muhurat-recitation-hours', 'brahma-muhurat-recitation-hours', 'The Hours of the Gods: Chanting Hanuman Chalisa in Brahma Muhurat', 'Learn why early morning chanting (Brahma Muhurat) multiplies the spiritual and psychological effectiveness of the Chalisa.', '
Many scripture guidelines recommend that the Hanuman Chalisa should be recited during **Brahma Muhurat**. But what exactly is Brahma Muhurat, and why does chanting during these hours hold so much power?

### What is Brahma Muhurat?
Brahma Muhurat is a Sanskrit term meaning "the hours of the Creator" (Brahma). It corresponds to the period that starts 1 hour and 36 minutes before sunrise and ends 48 minutes before sunrise. Typically, this is between **4:00 AM and 5:30 AM**, depending on the season.

### The Science Behind Brahma Muhurat

#### 1. Peak Prana (Vital Energy)
During the early morning hours, the atmosphere contains a high concentration of ozone and pure vital energy (*Prana*). The environment is free from industrial pollutants and noise, making breathing exercises and chanting highly effective for oxygenating the blood.

#### 2. Dominance of Sattva Guna
Vedic philosophy classifies time and state into three Gunas: *Sattva* (purity, light), *Rajas* (action, passion), and *Tamas* (lethargy, darkness). Brahma Muhurat is dominated entirely by *Sattva Guna*. Chanting during this time fills the mind with calm thoughts and dispels lethargy, setting a peaceful tone for the entire day.

#### 3. Low Cognitive Load (Alpha Waves)
Upon waking up, the human brain operates in the Alpha frequency range (8 to 12 Hz). Alpha waves represent a relaxed, focused state of consciousness. By immediately reading the Hanuman Chalisa, you seed these receptive waves with positive vibrations, strengthening memory, concentration, and emotional stability.

### Recommended Early Morning Ritual
1. Wake up during Brahma Muhurat and wash your face and limbs (or take a bath).
2. Sit in a clean corner of your home facing East.
3. Light a ghee diya to signify the dispelling of darkness.
4. Recite the Hanuman Chalisa 3 or 11 times.
5. Spend 5 minutes in silent meditation, absorbing the vibration of the verses.
    ', 1, '2026-09-03T17:52:20.405Z', '2026-09-03T17:52:20.405Z')
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "excerpt" = excluded."excerpt",
  "content" = excluded."content",
  "published" = 1;


INSERT INTO "Benefit" ("id", "slug", "title", "situation", "icon", "description", "recommendedChants", "targetVerseNumber", "targetVerseText", "targetVerseTranslation", "detailedExposition", "actionSteps", "published", "createdAt", "updatedAt")
VALUES ('benefit-career', 'career', 'Hanuman Chalisa for Career Growth & Job Success', 'Stuck in career, seeking promotion, job insecurity, or starting a business.', '💼', 'Reciting the Hanuman Chalisa instills unwavering confidence and courage, which are key for professional growth. Hanuman represents the ultimate service (seva) and dedication, traits that lead to recognition and success in modern workplaces.', 'Read 7 times every Tuesday morning before starting work.', 7, 'विद्यावान गुणी अति चातुर। राम काज करिबे को आतुर।।', 'Vidhyavan Guni Ati Chatur, Ram Kaj Karibe Ko Aatur. (You are highly learned, virtuous, and wise. You are always eager to perform Lord Rama''s tasks.)', 'This verse (Chaupai 7) highlights Hanuman''s intellect, competence, and readiness. In a professional context, it inspires devotees to cultivate skill, virtue, and an active readiness to execute responsibilities, removing lethargy and leading directly to career advancement.', '["Bathe and sit facing North or East on Tuesday mornings.","Light a brass diya filled with mustard oil (Sarso ka tel).","Recite Chaupai 7 eleven times individually, reflecting on its meaning.","Read the full Hanuman Chalisa 7 times with focused attention.","Vow to work with absolute dedication, seeing your professional duty as a form of worship (seva)."]', 1, '2026-09-03T17:52:20.405Z', '2026-09-03T17:52:20.405Z')
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "situation" = excluded."situation",
  "description" = excluded."description",
  "detailedExposition" = excluded."detailedExposition",
  "published" = 1;


INSERT INTO "Benefit" ("id", "slug", "title", "situation", "icon", "description", "recommendedChants", "targetVerseNumber", "targetVerseText", "targetVerseTranslation", "detailedExposition", "actionSteps", "published", "createdAt", "updatedAt")
VALUES ('benefit-health', 'health', 'Hanuman Chalisa for Health, Healing & Disease Removal', 'Recovering from chronic illness, suffering physical pain, or facing low energy.', '🌱', 'Lord Hanuman is also referred to as ''Sankat Mochan'' (remover of distress) and is traditionally invoked for physical strength. Sound vibrations from chanting particular syllables have been observed to calm the nervous system and aid in physiological healing.', 'Read 11 times on Saturday evenings, or daily during illness.', 25, 'नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा।।', 'Nase Rog Hare Sab Peera, Japat Nirantar Hanumat Beera. (All diseases are destroyed and all pains are removed by constantly chanting the name of the brave Lord Hanuman.)', 'Chaupai 25 is the premier healing verse in the scripture. It assures devotees that constant remembrance and chanting of Hanuman''s name will act as a shield against physical and mental ailments. It represents the restoration of vital energy (Prana) inside the body.', '["Keep a clean copper vessel filled with water in front of Hanuman''s idol.","Sit comfortably and recite Chaupai 25 precisely 108 times.","Recite the full Hanuman Chalisa 3 or 11 times.","Drink the energized water from the copper vessel as prasadam.","Maintain a pure vegetarian diet during the healing period."]', 1, '2026-09-03T17:52:20.405Z', '2026-09-03T17:52:20.405Z')
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "situation" = excluded."situation",
  "description" = excluded."description",
  "detailedExposition" = excluded."detailedExposition",
  "published" = 1;


INSERT INTO "Benefit" ("id", "slug", "title", "situation", "icon", "description", "recommendedChants", "targetVerseNumber", "targetVerseText", "targetVerseTranslation", "detailedExposition", "actionSteps", "published", "createdAt", "updatedAt")
VALUES ('benefit-exams', 'exams', 'Hanuman Chalisa for Students, Focus & Exam Success', 'Students facing exam anxiety, lack of concentration, or memory lapses.', '🎓', 'Hanuman is a master of grammar and all shastras (scriptures). He holds absolute control over his senses (Jitendriya). Chanting his praise helps students stabilize their minds, improve cognitive recall, and overcome stress during exams.', 'Read 1 time daily before study sessions, and 3 times on exam days.', 3, 'जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर।।', 'Jai Hanuman Gyan Gun Sagar, Jai Kapis Tihun Lok Ujagar. (Victory to Hanuman, who is an ocean of wisdom and virtue. Victory to the Lord of Monkeys who illuminates the three worlds.)', 'The very first Chaupai of the Chalisa describes Hanuman as the ''Ocean of Wisdom'' (Gyan Gun Sagar). By meditating on this verse, students connect with the energy of wisdom and mental clarity. It helps clear intellectual clouds and improves focus.', '["Sit at your study desk, close your eyes, and take 3 deep breaths.","Recite the opening Doha and Chaupai 1 three times.","Recite the entire Chalisa once with a calm, undistracted mind.","Visualize your mind becoming sharp, focused, and steady like a mountain (Sumeru).","Begin your study session immediately after chanting."]', 1, '2026-09-03T17:52:20.405Z', '2026-09-03T17:52:20.405Z')
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "situation" = excluded."situation",
  "description" = excluded."description",
  "detailedExposition" = excluded."detailedExposition",
  "published" = 1;


INSERT INTO "Benefit" ("id", "slug", "title", "situation", "icon", "description", "recommendedChants", "targetVerseNumber", "targetVerseText", "targetVerseTranslation", "detailedExposition", "actionSteps", "published", "createdAt", "updatedAt")
VALUES ('benefit-protection', 'protection', 'Hanuman Chalisa for Protection & Removing Negative Energies', 'Experiencing fear, anxiety, nightmares, bad dreams, or feeling negative vibes.', '🛡️', 'Lord Hanuman holds immense power to dispel negative cosmic influences, evil eyes, and fears. His name alone is a shield that acts as a fortress around the devotee, keeping negative entities and malicious forces at bay.', 'Chant 7 times before sleeping, or any time fear strikes.', 24, 'भूत पिशाच निकट नहिं आवै। महाबीर जब नाम सुनावै।।', 'Bhoot Pisach Nikat Nahi Aave, Mahavir Jab Naam Sunave. (Ghosts and evil spirits do not come near when one utters the name of the great hero, Hanuman.)', 'Chaupai 24 is traditionally used for direct protection. It states that negative energies cannot enter the aura of a person who remembers the valor of Hanuman. It immediately dispels fear of the dark, ghosts, and negative projections.', '["Wash your hands, feet, and face before bedtime.","Sit on your bed facing East.","Recite Chaupai 24 eleven times with firm faith.","Read the full Hanuman Chalisa or the Bajrang Baan once.","Sleep with a relaxed mind, knowing that Hanuman''s shield protects you."]', 1, '2026-09-03T17:52:20.405Z', '2026-09-03T17:52:20.405Z')
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "situation" = excluded."situation",
  "description" = excluded."description",
  "detailedExposition" = excluded."detailedExposition",
  "published" = 1;


INSERT INTO "Benefit" ("id", "slug", "title", "situation", "icon", "description", "recommendedChants", "targetVerseNumber", "targetVerseText", "targetVerseTranslation", "detailedExposition", "actionSteps", "published", "createdAt", "updatedAt")
VALUES ('benefit-marriage-delays', 'marriage-delays', 'Hanuman Chalisa for Delayed Marriages & Family Conflicts', 'Unreasonable delays in marriage, finding a life partner, or household discord.', '🤝', 'Hanuman is the ultimate messenger of union. He was the one who located Mother Sita, crossed the ocean, and brought the ring of union from Lord Rama, resolving their separation. Chanting his praise helps resolve relationship blockages and brings harmony.', 'Read 11 times every Saturday morning for 21 consecutive Saturdays.', 11, 'लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये।।', 'Lay Sajivan Lakhan Jiyaye, Shri Raghuveer Harashi Ur Laye. (You brought the Sanjeevani herb and revived Lakshmana; Lord Rama embraced you with joy.)', 'Chaupai 11 describes the revival of Lakshmana and the joy of Lord Rama, who embraced Hanuman. This verse represents the healing of relationships, the resolution of separation, and the return of joy and union in the family.', '["Perform puja on Saturday mornings, offering red flowers to Hanuman.","Light a diya with sesame oil (Til ka tel).","Recite Chaupai 11 and Chaupai 12 eleven times each.","Chant the complete Hanuman Chalisa 11 times.","Pray sincerely for the resolution of relationship hurdles and family peace."]', 1, '2026-09-03T17:52:20.405Z', '2026-09-03T17:52:20.405Z')
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "situation" = excluded."situation",
  "description" = excluded."description",
  "detailedExposition" = excluded."detailedExposition",
  "published" = 1;


INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES ('lang-hi', 'hi', 'श्री हनुमान चालीसा — हिंदी अनुवाद, अर्थ, पीडीएफ और ऑडियो', 'श्री हनुमान चालीसा का पाठ मूल देवनागरी हिंदी में पढ़ें। यहाँ पर प्रत्येक चौपाई का हिंदी अर्थ, ऑडियो गायन, और पीडीएफ डाउनलोड उपलब्ध है।', '{
  "lang": "hi",
  "title": "श्री हनुमान चालीसा — हिंदी अनुवाद, अर्थ, पीडीएफ और ऑडियो",
  "metaDescription": "श्री हनुमान चालीसा का पाठ मूल देवनागरी हिंदी में पढ़ें। यहाँ पर प्रत्येक चौपाई का हिंदी अर्थ, ऑडियो गायन, और पीडीएफ डाउनलोड उपलब्ध है।",
  "h1": "श्री हनुमान चालीसा",
  "intro": "गोस्वामी तुलसीदास द्वारा रचित ४० चौपाइयों का यह दिव्य संग्रह हनुमान जी की आराधना का सर्वश्रेष्ठ साधन है।",
  "meaningSummary": "हनुमान चालीसा का अर्थ है हनुमान जी की दिव्य स्तुति, जो साधक को निर्भयता, बल, बुद्धि और सभी संकटों से मुक्ति प्रदान करती है।",
  "verses": [
    {
      "id": "doha-01",
      "verse_number": "Doha 1",
      "text": "श्रीगुरु चरन सरोज रज,\nनिज मन मुकुरु सुधारि।\nबरनउं रघुबर बिमल जसु,\nजो दायकु फल चारि।।",
      "transliteration": "Shri Guru charan saroj raj,\nNij man mukuru sudhari\nBarnau Raghubar bimal jasu,\nJo dayaku phal chari",
      "meaning": "अपने गुरु के चरण-कमलों की धूल से मैं अपने मन के दर्पण को स्वच्छ करता हूं और रघुबर (श्रीराम) के निर्मल यश का वर्णन करता हूं, जो चार फल प्रदान करता है।"
    },
    {
      "id": "doha-02",
      "verse_number": "Doha 2",
      "text": "बुद्धिहीन तनु जानिके,\nसुमिरौं पवन-कुमार।\nबल बुद्धि बिद्या देहु मोहिं,\nहरहु कलेस बिकार।।",
      "transliteration": "Buddhiheen tanu janike,\nSumirou pavan-kumar\nBal buddhi bidya dehu mohin,\nHarahu kales bikar",
      "meaning": "स्वयं को बुद्धिहीन जानकर, मैं पवनपुत्र (हनुमान) का स्मरण करता हूं। कृपया मुझे बल, बुद्धि और विद्या प्रदान करें, और मेरे कष्टों तथा विकारों को दूर कर दें।"
    },
    {
      "id": "chaupai-01",
      "verse_number": 1,
      "text": "जय हनुमान\nज्ञान गुन सागर।\nजय कपीस\nतिहुं लोक उजागर।।",
      "transliteration": "Jai Hanuman\nGyaan gun saagar\nJai Kapis\nTihun lok ujagar",
      "meaning": "जय हनुमान, ज्ञान और गुणों के सागर। जय वानर-राज, जो तीनों लोकों को प्रकाशित करते हैं।"
    },
    {
      "id": "chaupai-02",
      "verse_number": 2,
      "text": "राम दूत\nअतुलित बल धामा।\nअंजनि-पुत्र\nपवनसुत नामा।।",
      "transliteration": "Ram doot\nAtulit bal dhama\nAnjani-putra\nPavansut nama",
      "meaning": "आप राम के दूत हैं, अतुलनीय शक्ति के भंडार। आप अंजनी के पुत्र और पवन के पुत्र के रूप में जाने जाते हैं।"
    },
    {
      "id": "chaupai-03",
      "verse_number": 3,
      "text": "महाबीर\nबिक्रम बजरंगी।\nकुमति निवार\nसुमति के संगी।।",
      "transliteration": "Mahavir\nBikram bajrangi\nKumati nivar\nSumati ke sangi",
      "meaning": "हे महान वीर, अपार पराक्रम वाले, वज्र के समान मजबूत शरीर वाले, आप दुर्विचारों को दूर करते हैं और सद्विचारों के साथी हैं।"
    },
    {
      "id": "chaupai-04",
      "verse_number": 4,
      "text": "कंचन बरन बिराज सुबेसा।\nकानन कुंडल कुंचित केसा।।",
      "transliteration": "Kanchan varan viraj subesa\nKanan kundal kunchit kesa",
      "meaning": "आपका रंग सुनहरा है, और आप सुंदर वस्त्रों में शोभायमान हैं, कानों में कुंडल और घुंघराले बाल हैं।"
    },
    {
      "id": "chaupai-05",
      "verse_number": 5,
      "text": "हाथ बज्र औ ध्वजा बिराजै।\nकांधे मूंज जनेऊ साजै।।",
      "transliteration": "Hath bajra au dhvaja virajai\nKandhe moonj janeoo sajai",
      "meaning": "आपके हाथ में गदा और ध्वजा शोभायमान हैं, और आपके कंधे पर जनेऊ सुशोभित है।"
    },
    {
      "id": "chaupai-06",
      "verse_number": 6,
      "text": "शंकर सुवन केसरी नंदन।\nतेज प्रताप महा जग बंदन।।",
      "transliteration": "Shankar suvan Kesari nandan\nTej pratap maha jag bandan",
      "meaning": "आप शिव के समान हैं, केसरी के पुत्र और आनंद, महान तेज और प्रताप के स्वामी, संपूर्ण जगत द्वारा वंदित।\n"
    },
    {
      "id": "chaupai-07",
      "verse_number": 7,
      "text": "विद्यावान गुणी अति चातुर।\nराम काज करिबे को आतुर।।",
      "transliteration": "Vidyavan guni ati chatur\nRam kaaj karibe ko aatur",
      "meaning": "आप अत्यंत विद्वान, गुणवान और अत्यधिक चतुर हैं, और राम के कार्य करने के लिए उत्सुक हैं।\n"
    },
    {
      "id": "chaupai-08",
      "verse_number": 8,
      "text": "प्रभु चरित्र सुनिबे को रसिया।\nराम लखन सीता मन बसिया।।",
      "transliteration": "Prabhu charitra sunibe ko rasiya\nRam lakhan Sita man basiya",
      "meaning": "आप प्रभु की कथाओं को सुनने के प्रति उत्साही हैं, और राम, लक्ष्मण और सीता आपके हृदय में निवास करते हैं।\n"
    },
    {
      "id": "chaupai-09",
      "verse_number": 9,
      "text": "सूक्ष्म रूप धरि सियहिं दिखावा।\nबिकट रूप धरि लंक जरावा।।",
      "transliteration": "Sukshma roop dhari siyahin dikhava\nBikat roop dhari Lanka jarava",
      "meaning": "सूक्ष्म रूप धारण कर आप सीता के सामने प्रकट हुए; विशाल भयानक रूप धारण कर आपने लंका को जलाया।"
    },
    {
      "id": "chaupai-10",
      "verse_number": 10,
      "text": "भीम रूप धरि असुर संहारे।\nरामचंद्र के काज संवारे।।",
      "transliteration": "Bhima roop dhari asur sanhare\nRamchandra ke kaaj sanvare",
      "meaning": "भयानक रूप धारण कर आपने राक्षसों का संहार किया और रामचंद्र के कार्यों को पूर्ण रूप से सिद्ध किया।\n"
    },
    {
      "id": "chaupai-11",
      "verse_number": 11,
      "text": "लाय सजीवन लखन जियाये।\nश्री रघुबीर हरषि उर लाये।।",
      "transliteration": "Laaye sajeevan Lakhan jiyaye\nShri Raghubir harashi ur laye",
      "meaning": "आप संजीवनी बूटी लाए और लक्ष्मण को जीवित किया; श्री रघुवीर ने हर्ष से आपको हृदय से लगाया।"
    },
    {
      "id": "chaupai-12",
      "verse_number": 12,
      "text": "रघुपति कीन्ही बहुत बड़ाई।\nतुम मम प्रिय भरतहि सम भाई।।",
      "transliteration": "Raghupati kinhi bahut badai\nTum mam priya Bharatahi sam bhai",
      "meaning": "रघुपति ने आपकी बहुत प्रशंसा की, कहते हुए \"तुम मेरे प्रिय भरत के समान भाई हो।\"\n"
    },
    {
      "id": "chaupai-13",
      "verse_number": 13,
      "text": "सहस बदन तुम्हरो जस गावैं।\nअस कहि श्रीपति कंठ लगावैं।।",
      "transliteration": "Sahas badan tumharo jas gavain\nAs kahi Shripati kanth lagavain",
      "meaning": "\"सहस्र मुख वाला सर्प (शेषनाग) भी आपका यश गाता है,\" ऐसा कहकर, श्रीपति ने आपको गले लगाया।\n"
    },
    {
      "id": "chaupai-14",
      "verse_number": 14,
      "text": "सनकादिक ब्रह्मादि मुनीसा।\nनारद सारद सहित अहीसा।।",
      "transliteration": "Sanakadik Brahmadi munisa\nNarad Sarad sahit ahisa",
      "meaning": "चार कुमार, ब्रह्मा और अन्य देवता, महान ऋषि, नारद, सरस्वती, शेषनाग के साथ (सभी आपकी प्रशंसा गाते हैं)।"
    },
    {
      "id": "chaupai-15",
      "verse_number": 15,
      "text": "जम कुबेर दिगपाल जहां ते।\nकबि कोबिद कहि सके कहां ते।।",
      "transliteration": "Yam Kuber digpal jahan te\nKabi kobid kahi sake kahan te",
      "meaning": "यम, कुबेर, दिशाओं के रक्षक - कवि और विद्वान कहां से आपकी महिमा का वर्णन करना भी शुरू कर सकते हैं?"
    },
    {
      "id": "chaupai-16",
      "verse_number": 16,
      "text": "तुम उपकार सुग्रीवहिं कीन्हा।\nराम मिलाय राज पद दीन्हा।।",
      "transliteration": "Tum upkar Sugrivahin kinha\nRam milay raj pad dinha",
      "meaning": "आपने सुग्रीव पर बड़ा उपकार किया, उन्हें राम से मिलाकर और उन्हें उनका राज्य प्राप्त करने में सहायता करके।"
    },
    {
      "id": "chaupai-17",
      "verse_number": 17,
      "text": "तुम्हरो मंत्र बिभीषन माना।\nलंकेश्वर भए सब जग जाना।।",
      "transliteration": "Tumharo mantra Vibhishan mana\nLankeshwar bhaye sab jag jana",
      "meaning": "विभीषण ने आपकी सलाह स्वीकार की और लंका के स्वामी बने, जैसा कि संपूर्ण जगत जानता है।"
    },
    {
      "id": "chaupai-18",
      "verse_number": 18,
      "text": "जुग सहस्र जोजन पर भानू।\nलील्यो ताहि मधुर फल जानू।।",
      "transliteration": "Jug sahastra jojan par bhanu\nLeelyo tahi madhur phal janu",
      "meaning": "सूर्य, जो हजारों योजन दूर स्थित है, आप उसकी ओर कूद पड़े, उसे मधुर फल समझकर।\n"
    },
    {
      "id": "chaupai-19",
      "verse_number": 19,
      "text": "प्रभु मुद्रिका मेलि मुख माहीं।\nजलधि लांघि गये अचरज नाहीं।।",
      "transliteration": "Prabhu mudrika meli mukh mahin\nJaladhi langhi gaye acharaj nahin",
      "meaning": "प्रभु की अंगूठी को मुख में रखकर, आप समुद्र पार कर गए - यह कोई आश्चर्य नहीं है।\n"
    },
    {
      "id": "chaupai-20",
      "verse_number": 20,
      "text": "दुर्गम काज जगत के जेते।\nसुगम अनुग्रह तुम्हरे तेते।।",
      "transliteration": "Durgam kaaj jagat ke jete\nSugam anugrah tumhare tete",
      "meaning": "जगत में जितने भी कठिन कार्य हैं, वे आपकी कृपा से सरल हो जाते हैं।\n"
    },
    {
      "id": "chaupai-21",
      "verse_number": 21,
      "text": "राम दुआरे तुम रखवारे।\nहोत न आज्ञा बिनु पैसारे।।",
      "transliteration": "Ram duare tum rakhavare\nHot na agya binu paisare",
      "meaning": "आप राम के द्वार पर रक्षक हैं; आपकी आज्ञा के बिना कोई प्रवेश नहीं कर सकता।"
    },
    {
      "id": "chaupai-22",
      "verse_number": 22,
      "text": "सब सुख लहै तुम्हारी सरना।\nतुम रक्षक काहू को डर ना।।",
      "transliteration": "Sab sukh lahai tumhari sarna\nTum rakshak kahu ko dar na",
      "meaning": "आपकी शरण लेने पर सभी सुख प्राप्त होते हैं; जब आप रक्षक हों, तो कोई भय नहीं।\n"
    },
    {
      "id": "chaupai-23",
      "verse_number": 23,
      "text": "आपन तेज सम्हारो आपै।\nतीनों लोक हांक तें कांपै।।",
      "transliteration": "Aapan tej samharo aapai\nTeenon lok hank ten kanpai",
      "meaning": "आप ही अपनी शक्ति को नियंत्रित कर सकते हैं; तीनों लोक आपकी गर्जना से कांपते हैं।"
    },
    {
      "id": "chaupai-24",
      "verse_number": 24,
      "text": "भूत पिसाच निकट नहिं आवै।\nमहाबीर जब नाम सुनावै।।",
      "transliteration": "Bhoot pisach nikat nahin avai\nMahavir jab nam sunavai",
      "meaning": "भूत और पिशाच पास नहीं आते जब महावीर (हनुमान) का नाम लिया जाता है।"
    },
    {
      "id": "chaupai-25",
      "verse_number": 25,
      "text": "नासै रोग हरै सब पीरा।\nजपत निरंतर हनुमत बीरा।।",
      "transliteration": "Nasai rog harai sab peera\nJapat nirantar Hanumat beera",
      "meaning": "रोग नष्ट हो जाते हैं और सभी पीड़ाएं दूर हो जाती हैं वीर हनुमान के नाम का निरंतर जप करने से।\n"
    },
    {
      "id": "chaupai-26",
      "verse_number": 26,
      "text": "संकट तें हनुमान छुड़ावै।\nमन क्रम बचन ध्यान जो लावै।।",
      "transliteration": "Sankat ten Hanuman chhudavai\nMan kram bachan dhyan jo lavai",
      "meaning": "हनुमान उन्हें संकट से मुक्त करते हैं जो मन, कर्म और वचन से उनका ध्यान करते हैं।\n"
    },
    {
      "id": "chaupai-27",
      "verse_number": 27,
      "text": "सब पर राम तपस्वी राजा।\nतिन के काज सकल तुम साजा।।",
      "transliteration": "Sab par Ram tapasvi raja\nTin ke kaaj sakal tum saja",
      "meaning": "राम तपस्वियों में सर्वोच्च राजा हैं, और आपने उनके सभी कार्य संपन्न किए हैं।\n"
    },
    {
      "id": "chaupai-28",
      "verse_number": 28,
      "text": "और मनोरथ जो कोई लावै।\nसोई अमित जीवन फल पावै।।",
      "transliteration": "Aur manorath jo koi lavai\nSoi amit jivan phal pavai",
      "meaning": "और जो कोई भी जो भी मनोरथ रखता है, वह व्यक्ति असीम जीवन फल प्राप्त करता है।\n"
    },
    {
      "id": "chaupai-29",
      "verse_number": 29,
      "text": "चारों जुग परताप तुम्हारा।\nहै परसिद्ध जगत उजियारा।।",
      "transliteration": "Charon jug partap tumhara\nHai parsiddh jagat ujiyara",
      "meaning": "आपका प्रताप चारों युगों में प्रसिद्ध है और जगत को प्रकाशित करता है।\n"
    },
    {
      "id": "chaupai-30",
      "verse_number": 30,
      "text": "साधु संत के तुम रखवारे।\nअसुर निकंदन राम दुलारे।।",
      "transliteration": "Sadhu sant ke tum rakhavare\nAsur nikandan Ram dulare",
      "meaning": "आप साधु-संतों के रक्षक हैं, असुरों के विनाशक, और राम के प्रिय।\n"
    },
    {
      "id": "chaupai-31",
      "verse_number": 31,
      "text": "अष्ट सिद्धि नौ निधि के दाता।\nअस बर दीन जानकी माता।।",
      "transliteration": "Ashta siddhi nau nidhi ke data\nAs bar deen Janaki mata",
      "meaning": "माता जानकी ने आपको आठ सिद्धियों और नौ निधियों के दाता होने का वरदान दिया है।"
    },
    {
      "id": "chaupai-32",
      "verse_number": 32,
      "text": "राम रसायन तुम्हरे पासा।\nसदा रहो रघुपति के दासा।।",
      "transliteration": "Ram rasayan tumhare pasa\nSada raho Raghupati ke dasa",
      "meaning": "राम भक्ति का रसायन आपके पास है; आप सदा रघुपति के दास बने रहें।\n"
    },
    {
      "id": "chaupai-33",
      "verse_number": 33,
      "text": "तुम्हरे भजन राम को पावै।\nजनम जनम के दुख बिसरावै।।",
      "transliteration": "Tumhare bhajan Ram ko pavai\nJanam janam ke dukh bisaravai",
      "meaning": "आपकी भक्ति से राम को प्राप्त होता है और जन्म-जन्म के दुख भुला दिए जाते हैं।\n"
    },
    {
      "id": "chaupai-34",
      "verse_number": 34,
      "text": "अंत काल रघुबर पुर जाई।\nजहां जन्म हरिभक्त कहाई।।",
      "transliteration": "Ant kaal Raghubar pur jai\nJahan janam Haribhakt kahai",
      "meaning": "अंत काल में रघुबर पुर को जाता है, जहां जन्म लेकर हरिभक्त कहलाता है।\n"
    },
    {
      "id": "chaupai-35",
      "verse_number": 35,
      "text": "और देवता चित्त न धरई।\nहनुमत सेइ सर्व सुख करई।।",
      "transliteration": "Aur devata chitt na dharai\nHanumat sei sarva sukh karai",
      "meaning": "अन्य देवताओं को मन में रखने की आवश्यकता नहीं; केवल हनुमान की सेवा सभी सुख उत्पन्न करती है।\n"
    },
    {
      "id": "chaupai-36",
      "verse_number": 36,
      "text": "संकट कटै मिटै सब पीरा।\nजो सुमिरै हनुमत बलबीरा।।",
      "transliteration": "Sankat katai mitai sab peera\nJo sumirai Hanumat balbeera",
      "meaning": "संकट कट जाते हैं और सभी पीड़ा नष्ट हो जाती है जो बलवीर हनुमान को स्मरण करता है।\n"
    },
    {
      "id": "chaupai-37",
      "verse_number": 37,
      "text": "जै जै जै हनुमान गोसाईं।\nकृपा करहु गुरुदेव की नाईं।।",
      "transliteration": "Jai jai jai Hanuman Gosain\nKripa karahu gurudev ki nain",
      "meaning": "जय जय जय हनुमान गोसाईं! कृपा करें गुरुदेव की नाईं।\n"
    },
    {
      "id": "chaupai-38",
      "verse_number": 38,
      "text": "जो सत बार पाठ कर कोई।\nछूटहि बंदि महा सुख होई।।",
      "transliteration": "Jo sat baar path kar koi\nChhutahi bandi maha sukh hoi",
      "meaning": "जो कोई इसे सौ बार पाठ करता है वह बंधन से मुक्त होता है और महान सुख प्राप्त करता है।\n"
    },
    {
      "id": "chaupai-39",
      "verse_number": 39,
      "text": "जो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा।।",
      "transliteration": "Jo yah padhai Hanuman Chalisa\nHoye siddhi sakhi Gaurisa",
      "meaning": "जो इस हनुमान चालीसा का पाठ करता है वह सिद्धि प्राप्त करता है, भगवान गौरीसा साक्षी हैं।\n"
    },
    {
      "id": "chaupai-40",
      "verse_number": 40,
      "text": "तुलसीदास सदा हरि चेरा।\nकीजै नाथ हृदय महं डेरा।।",
      "transliteration": "Tulsidas sada Hari chera\nKeejai nath hriday mahan dera",
      "meaning": "तुलसीदास सदा हरि के चेरे हैं; हे नाथ, मेरे हृदय में अपना निवास करें।\n"
    },
    {
      "id": "doha-closing",
      "verse_number": "Doha Closing",
      "text": "पवनतनय संकट हरन,\nमंगल मूरति रूप।\nराम लखन सीता सहित,\nहृदय बसहु सुर भूप।।",
      "transliteration": "Pavantanay sankat haran,\nMangal murti roop\nRam lakhan Sita sahit,\nHriday basahu sur bhoop",
      "meaning": "हे पवन के पुत्र, संकट हरण करने वाले, मंगल मूर्ति रूप! राम, लक्ष्मण और सीता के साथ, कृपया मेरे हृदय में निवास करें, हे देवों के राजा।"
    }
  ],
  "faqs": [
    {
      "question": "हनुमान चालीसा किसने लिखी थी? (हनुमान चालीसा किसने लिखी / किसने लिखा था)",
      "answer": "हनुमान चालीसा की रचना 16वीं शताब्दी में महान कवि गोस्वामी तुलसीदास जी ने की थी।"
    },
    {
      "question": "हनुमान चालीसा पढ़ने से क्या होता है?",
      "answer": "हनुमान चालीसा का नियमित पाठ करने से सभी प्रकार के संकट, रोग, और भय दूर हो जाते हैं। यह साधक को मानसिक दृढ़ता, सुख-शांति, और शनिदेव (Saturn) के दुष्प्रभावों से सुरक्षा प्रदान करती है।"
    },
    {
      "question": "हनुमान चालीसा के क्या लाभ हैं?",
      "answer": "हनुमान चालीसा के नियमित पाठ से आत्मविश्वास बढ़ता है, सभी भय दूर होते हैं, और जीवन की बाधाएं मिटती हैं।"
    }
  ]
}', 1, '2026-09-03T17:52:20.406Z')
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;


INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES ('lang-en', 'en', 'Shree Hanuman Chalisa — English Lyrics, Translation, PDF & Audio', 'Read the complete Hanuman Chalisa lyrics in English transliteration with line-by-line English meanings, synced MP3 audio, and free PDF download.', '{
  "lang": "en",
  "title": "Shree Hanuman Chalisa — English Lyrics, Translation, PDF & Audio",
  "metaDescription": "Read the complete Hanuman Chalisa lyrics in English transliteration with line-by-line English meanings, synced MP3 audio, and free PDF download.",
  "h1": "Shree Hanuman Chalisa",
  "intro": "Composed by Goswami Tulsidas in the 16th century, these 40 verses praise the strength, devotion, and character of Lord Hanuman.",
  "meaningSummary": "The Hanuman Chalisa is a prayer of devotion that brings mental strength, intelligence, and removes all negative energies and obstacles from a devotee''s life.",
  "verses": [
    {
      "id": "doha-01",
      "verse_number": "Doha 1",
      "text": "Shri Guru charan saroj raj,\nNij man mukuru sudhari\nBarnau Raghubar bimal jasu,\nJo dayaku phal chari",
      "transliteration": "",
      "meaning": "With the dust of my Guru''s lotus feet, I cleanse the mirror of my mind and describe the pure glory of Raghubar (Lord Rama), which grants the four fruits."
    },
    {
      "id": "doha-02",
      "verse_number": "Doha 2",
      "text": "Buddhiheen tanu janike,\nSumirou pavan-kumar\nBal buddhi bidya dehu mohin,\nHarahu kales bikar",
      "transliteration": "",
      "meaning": "Knowing myself to be lacking in intelligence, I remember the son of the wind. Please grant me strength, wisdom, and knowledge, and remove my suffering and impurities."
    },
    {
      "id": "chaupai-01",
      "verse_number": 1,
      "text": "Jai Hanuman\nGyaan gun saagar\nJai Kapis\nTihun lok ujagar",
      "transliteration": "",
      "meaning": "Hail Hanuman, ocean of knowledge and virtues. Hail the lord of monkeys, who illuminates the three worlds."
    },
    {
      "id": "chaupai-02",
      "verse_number": 2,
      "text": "Ram doot\nAtulit bal dhama\nAnjani-putra\nPavansut nama",
      "transliteration": "",
      "meaning": "You are Rama''s messenger, repository of incomparable strength. You are known as the son of Anjani and the son of the wind."
    },
    {
      "id": "chaupai-03",
      "verse_number": 3,
      "text": "Mahavir\nBikram bajrangi\nKumati nivar\nSumati ke sangi",
      "transliteration": "",
      "meaning": "O great hero of immense valor, with a body strong as a thunderbolt, you remove evil thoughts and are the companion of good thoughts."
    },
    {
      "id": "chaupai-04",
      "verse_number": 4,
      "text": "Kanchan varan viraj subesa\nKanan kundal kunchit kesa",
      "transliteration": "",
      "meaning": "Your complexion is golden, and you shine in beautiful attire, with earrings in your ears and curly hair."
    },
    {
      "id": "chaupai-05",
      "verse_number": 5,
      "text": "Hath bajra au dhvaja virajai\nKandhe moonj janeoo sajai",
      "transliteration": "",
      "meaning": "In your hand shine the mace and flag, and on your shoulder rests the sacred thread."
    },
    {
      "id": "chaupai-06",
      "verse_number": 6,
      "text": "Shankar suvan Kesari nandan\nTej pratap maha jag bandan",
      "transliteration": "",
      "meaning": "You are like Shiva, son and delight of Kesari, possessing great radiance and glory, saluted by the entire world.\n"
    },
    {
      "id": "chaupai-07",
      "verse_number": 7,
      "text": "Vidyavan guni ati chatur\nRam kaaj karibe ko aatur",
      "transliteration": "",
      "meaning": "You are highly learned, virtuous, and extremely clever, and are eager to do Rama''s work.\n"
    },
    {
      "id": "chaupai-08",
      "verse_number": 8,
      "text": "Prabhu charitra sunibe ko rasiya\nRam lakhan Sita man basiya",
      "transliteration": "",
      "meaning": "You are passionate about listening to the Lord''s stories, and Rama, Lakshmana, and Sita dwell in your heart.\n"
    },
    {
      "id": "chaupai-09",
      "verse_number": 9,
      "text": "Sukshma roop dhari siyahin dikhava\nBikat roop dhari Lanka jarava",
      "transliteration": "",
      "meaning": "Taking a tiny form, you appeared before Sita; assuming a gigantic fierce form, you burned Lanka."
    },
    {
      "id": "chaupai-10",
      "verse_number": 10,
      "text": "Bhima roop dhari asur sanhare\nRamchandra ke kaaj sanvare",
      "transliteration": "",
      "meaning": "Taking a terrible form, you destroyed demons and accomplished Rama''s tasks perfectly.\n"
    },
    {
      "id": "chaupai-11",
      "verse_number": 11,
      "text": "Laaye sajeevan Lakhan jiyaye\nShri Raghubir harashi ur laye",
      "transliteration": "",
      "meaning": "You brought the Sanjeevani herb and revived Lakshmana; Rama joyfully embraced you to his chest."
    },
    {
      "id": "chaupai-12",
      "verse_number": 12,
      "text": "Raghupati kinhi bahut badai\nTum mam priya Bharatahi sam bhai",
      "transliteration": "",
      "meaning": "The Lord of the Raghu dynasty praised you greatly, saying \"You are as dear to me as my brother Bharata.\"\n"
    },
    {
      "id": "chaupai-13",
      "verse_number": 13,
      "text": "Sahas badan tumharo jas gavain\nAs kahi Shripati kanth lagavain",
      "transliteration": "",
      "meaning": "\"Even the thousand-mouthed serpent (Shesha) sings your glories,\" saying thus, the Lord embraced you.\n"
    },
    {
      "id": "chaupai-14",
      "verse_number": 14,
      "text": "Sanakadik Brahmadi munisa\nNarad Sarad sahit ahisa",
      "transliteration": "",
      "meaning": "The four Kumaras, Brahma and other gods, great sages, Narada, Saraswati, along with Shesha (all sing your praises)."
    },
    {
      "id": "chaupai-15",
      "verse_number": 15,
      "text": "Yam Kuber digpal jahan te\nKabi kobid kahi sake kahan te",
      "transliteration": "",
      "meaning": "Yama, Kubera, the guardians of directions - from where can poets and scholars even begin to describe your glory?"
    },
    {
      "id": "chaupai-16",
      "verse_number": 16,
      "text": "Tum upkar Sugrivahin kinha\nRam milay raj pad dinha",
      "transliteration": "",
      "meaning": "You did a great favor to Sugriva by uniting him with Rama and helping him obtain his kingdom."
    },
    {
      "id": "chaupai-17",
      "verse_number": 17,
      "text": "Tumharo mantra Vibhishan mana\nLankeshwar bhaye sab jag jana",
      "transliteration": "",
      "meaning": "Vibhishana accepted your counsel and became the Lord of Lanka, as the entire world knows."
    },
    {
      "id": "chaupai-18",
      "verse_number": 18,
      "text": "Jug sahastra jojan par bhanu\nLeelyo tahi madhur phal janu",
      "transliteration": "",
      "meaning": "The sun, located thousands of yojanas away, you leaped toward it, thinking it was a sweet fruit.\n"
    },
    {
      "id": "chaupai-19",
      "verse_number": 19,
      "text": "Prabhu mudrika meli mukh mahin\nJaladhi langhi gaye acharaj nahin",
      "transliteration": "",
      "meaning": "Placing the Lord''s ring in your mouth, you crossed the ocean - this is no surprise.\n"
    },
    {
      "id": "chaupai-20",
      "verse_number": 20,
      "text": "Durgam kaaj jagat ke jete\nSugam anugrah tumhare tete",
      "transliteration": "",
      "meaning": "Whatever difficult tasks exist in the world, they become easy with your grace.\n"
    },
    {
      "id": "chaupai-21",
      "verse_number": 21,
      "text": "Ram duare tum rakhavare\nHot na agya binu paisare",
      "transliteration": "",
      "meaning": "You are the guardian at Rama''s door; no one can enter without your permission."
    },
    {
      "id": "chaupai-22",
      "verse_number": 22,
      "text": "Sab sukh lahai tumhari sarna\nTum rakshak kahu ko dar na",
      "transliteration": "",
      "meaning": "Taking refuge in you, one obtains all happiness; when you are the protector, there is no fear.\n"
    },
    {
      "id": "chaupai-23",
      "verse_number": 23,
      "text": "Aapan tej samharo aapai\nTeenon lok hank ten kanpai",
      "transliteration": "",
      "meaning": "You alone can control your own power; the three worlds tremble at your roar."
    },
    {
      "id": "chaupai-24",
      "verse_number": 24,
      "text": "Bhoot pisach nikat nahin avai\nMahavir jab nam sunavai",
      "transliteration": "",
      "meaning": "Ghosts and demons do not come near when the name of Mahavir (Hanuman) is uttered."
    },
    {
      "id": "chaupai-25",
      "verse_number": 25,
      "text": "Nasai rog harai sab peera\nJapat nirantar Hanumat beera",
      "transliteration": "",
      "meaning": "Diseases are destroyed and all pain is removed by continuously chanting the name of the heroic Hanuman.\n"
    },
    {
      "id": "chaupai-26",
      "verse_number": 26,
      "text": "Sankat ten Hanuman chhudavai\nMan kram bachan dhyan jo lavai",
      "transliteration": "",
      "meaning": "Hanuman liberates from crises those who meditate on him with mind, action, and speech.\n"
    },
    {
      "id": "chaupai-27",
      "verse_number": 27,
      "text": "Sab par Ram tapasvi raja\nTin ke kaaj sakal tum saja",
      "transliteration": "",
      "meaning": "Ram is the supreme king among ascetics, and you have accomplished all his tasks.\n"
    },
    {
      "id": "chaupai-28",
      "verse_number": 28,
      "text": "Aur manorath jo koi lavai\nSoi amit jivan phal pavai",
      "transliteration": "",
      "meaning": "And whatever desire anyone harbors, that person obtains unlimited fruits of life.\n"
    },
    {
      "id": "chaupai-29",
      "verse_number": 29,
      "text": "Charon jug partap tumhara\nHai parsiddh jagat ujiyara",
      "transliteration": "",
      "meaning": "Your glory is renowned throughout the four ages and illuminates the world.\n"
    },
    {
      "id": "chaupai-30",
      "verse_number": 30,
      "text": "Sadhu sant ke tum rakhavare\nAsur nikandan Ram dulare",
      "transliteration": "",
      "meaning": "You are the protector of saints and sages, destroyer of demons, and Rama''s beloved.\n"
    },
    {
      "id": "chaupai-31",
      "verse_number": 31,
      "text": "Ashta siddhi nau nidhi ke data\nAs bar deen Janaki mata",
      "transliteration": "",
      "meaning": "Mother Sita gave you the boon of being the giver of the eight siddhis and nine nidhis."
    },
    {
      "id": "chaupai-32",
      "verse_number": 32,
      "text": "Ram rasayan tumhare pasa\nSada raho Raghupati ke dasa",
      "transliteration": "",
      "meaning": "The elixir of devotion to Rama is with you; may you always remain Rama''s servant.\n"
    },
    {
      "id": "chaupai-33",
      "verse_number": 33,
      "text": "Tumhare bhajan Ram ko pavai\nJanam janam ke dukh bisaravai",
      "transliteration": "",
      "meaning": "Through devotion to you, one attains Rama and forgets the sorrows of countless births.\n"
    },
    {
      "id": "chaupai-34",
      "verse_number": 34,
      "text": "Ant kaal Raghubar pur jai\nJahan janam Haribhakt kahai",
      "transliteration": "",
      "meaning": "At the end time, one goes to Rama''s abode, where one is born and known as a devotee of Hari.\n"
    },
    {
      "id": "chaupai-35",
      "verse_number": 35,
      "text": "Aur devata chitt na dharai\nHanumat sei sarva sukh karai",
      "transliteration": "",
      "meaning": "One need not keep other deities in mind; serving Hanuman alone creates all happiness.\n"
    },
    {
      "id": "chaupai-36",
      "verse_number": 36,
      "text": "Sankat katai mitai sab peera\nJo sumirai Hanumat balbeera",
      "transliteration": "",
      "meaning": "Crises are removed and all suffering is destroyed for one who remembers the mighty hero Hanuman.\n"
    },
    {
      "id": "chaupai-37",
      "verse_number": 37,
      "text": "Jai jai jai Hanuman Gosain\nKripa karahu gurudev ki nain",
      "transliteration": "",
      "meaning": "Hail, hail, hail Lord Hanuman! Please bestow your grace like a divine guru.\n"
    },
    {
      "id": "chaupai-38",
      "verse_number": 38,
      "text": "Jo sat baar path kar koi\nChhutahi bandi maha sukh hoi",
      "transliteration": "",
      "meaning": "Whoever recites this a hundred times is freed from bondage and attains great happiness.\n"
    },
    {
      "id": "chaupai-39",
      "verse_number": 39,
      "text": "Jo yah padhai Hanuman Chalisa\nHoye siddhi sakhi Gaurisa",
      "transliteration": "",
      "meaning": "One who recites this Hanuman Chalisa attains accomplishment/success, with Lord Shiva as witness.\n"
    },
    {
      "id": "chaupai-40",
      "verse_number": 40,
      "text": "Tulsidas sada Hari chera\nKeejai nath hriday mahan dera",
      "transliteration": "",
      "meaning": "Tulsidas is always a servant of Hari; O Lord, make your dwelling in my heart.\n"
    },
    {
      "id": "doha-closing",
      "verse_number": "Doha Closing",
      "text": "Pavantanay sankat haran,\nMangal murti roop\nRam lakhan Sita sahit,\nHriday basahu sur bhoop",
      "transliteration": "",
      "meaning": "O son of the wind, remover of crises, of auspicious form! Along with Rama, Lakshmana, and Sita, please dwell in my heart, O king of gods."
    }
  ],
  "faqs": [
    {
      "question": "Is ''Ram Chalisa'' the Same as ''Hanuman Chalisa''?",
      "answer": "No, the Ram Chalisa and Hanuman Chalisa are two distinct devotional hymns. The Hanuman Chalisa is Goswami Tulsidas''s 40-verse poem praising Lord Hanuman''s valor and loyalty, while the Shri Ram Chalisa is dedicated directly to Lord Rama. However, because Hanuman is the supreme devotee of Rama and Rama''s name is recited throughout the hymn, devotees often search for and recite both prayers together."
    },
    {
      "question": "Who wrote the Hanuman Chalisa? (who wrote hanuman chalisa)",
      "answer": "The Hanuman Chalisa was composed by the legendary poet Goswami Tulsidas in the 16th century."
    },
    {
      "question": "Does Verse 18 of the Hanuman Chalisa really describe the distance to the Sun?",
      "answer": "In <a href=\"#verse-18\" class=\"text-vermilion hover:text-marigold underline font-semibold\">Chaupai 18</a> (\"Jug sahastra jojan par bhanu, Leelyo tahi madhur phal janu\"), the hymn poetically narrates young Hanuman leaping toward the Sun mistaking it for a sweet fruit. Devotees and popular commentators often note that multiplying these traditional poetic units (''jug sahastra jojan'') yields a figure intriguingly close to the Earth-Sun distance. However, scholars emphasize this is fundamentally a devotional verse honoring Hanuman''s boundless power and courage rather than a formal scientific text."
    },
    {
      "question": "What does Hanuman Chalisa mean in English?",
      "answer": "In English, ''Hanuman Chalisa'' translates to ''Forty Verses on Lord Hanuman''—named from ''chalis'', the Hindi word for forty. Composed by saint-poet Goswami Tulsidas in Awadhi, this forty-quatrain prayer honors Hanuman''s boundless power, intellect, and selfless surrender to Lord Rama."
    },
    {
      "question": "Is there a full English translation of the Hanuman Chalisa?",
      "answer": "Yes, all 40 chaupais along with the opening and concluding dohas have complete English translations that convey their theological and philosophical depth. Our line-by-line English translation explains the meaning of each Awadhi verse clearly for devotees and learners worldwide."
    },
    {
      "question": "What is the difference between Hanuman Chalisa lyrics and its English meaning?",
      "answer": "The lyrics refer to the original Awadhi poetic verses (written in Devanagari script or phonetic English transliteration) meant for rhythmic recitation and chanting. The English meaning, by contrast, translates those sacred metaphors and mythological events into readable English prose so readers can grasp the profound spiritual lessons."
    },
    {
      "question": "What happens when you recite Hanuman Chalisa?",
      "answer": "Reciting the Hanuman Chalisa removes all obstacles, diseases, and fears. It instills inner strength, mental peace, and offers protection from the negative effects of Saturn (Shani Dev)."
    },
    {
      "question": "What are the benefits of reciting Hanuman Chalisa?",
      "answer": "Reciting it brings peace of mind, removes fear and negative influences, and gives inner courage and strength."
    }
  ]
}', 1, '2026-09-03T17:52:20.407Z')
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;


INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES ('lang-te', 'te', 'శ్రీ హనుమాన్ చాలీసా — తెలుగు లిపి, అనువాదం, పిడిఎఫ్ మరియు ఆడియో', 'శ్రీ హనుమాన్ చాలీసా తెలుగు సాహిత్యం మరియు ప్రతి పద్యం యొక్క సరళ తెలుగు అర్థం. ఇక్కడ ఆడియో మరియు పిడిఎఫ్ ఉచితంగా లభిస్తాయి.', '{
  "lang": "te",
  "title": "శ్రీ హనుమాన్ చాలీసా — తెలుగు లిపి, అనువాదం, పిడిఎఫ్ మరియు ఆడియో",
  "metaDescription": "శ్రీ హనుమాన్ చాలీసా తెలుగు సాహిత్యం మరియు ప్రతి పద్యం యొక్క సరళ తెలుగు అర్థం. ఇక్కడ ఆడియో మరియు పిడిఎఫ్ ఉచితంగా లభిస్తాయి.",
  "h1": "శ్రీ హనుమాన్ చాలీసా",
  "intro": "గోస్వామి తులసీదాస్ రచించిన ఈ 40 శ్లోకాలు హనుమంతుని శౌర్యం, భక్తి మరియు దివ్య శక్తులను కీర్తిస్తాయి.",
  "meaningSummary": "హనుమాన్ చాలీసా పఠించడం వల్ల మనశ్శాంతి లభిస్తుంది, భయాలు తొలగిపోతాయి మరియు అన్ని రకాల ఆటంకాలు నివారించబడతాయి.",
  "verses": [
    {
      "id": "doha-01",
      "verse_number": "Doha 1",
      "text": "శ్రీగురు చరన సరోజ రజ,\nనిజ మన ముకురు సుధారి।\nబరనఉం రఘుబర బిమల జసు,\nజో దాయకు ఫల చారి।।",
      "transliteration": "Shri Guru charan saroj raj,\nNij man mukuru sudhari\nBarnau Raghubar bimal jasu,\nJo dayaku phal chari",
      "meaning": "With the dust of my Guru''s lotus feet, I cleanse the mirror of my mind and describe the pure glory of Raghubar (Lord Rama), which grants the four fruits."
    },
    {
      "id": "doha-02",
      "verse_number": "Doha 2",
      "text": "బుద్ధిహీన తను జానికే,\nసుమిరౌం పవన-కుమార।\nబల బుద్ధి బిద్యా దేహు మోహిం,\nహరహు కలేస బికార।।",
      "transliteration": "Buddhiheen tanu janike,\nSumirou pavan-kumar\nBal buddhi bidya dehu mohin,\nHarahu kales bikar",
      "meaning": "Knowing myself to be lacking in intelligence, I remember the son of the wind. Please grant me strength, wisdom, and knowledge, and remove my suffering and impurities."
    },
    {
      "id": "chaupai-01",
      "verse_number": 1,
      "text": "జయ హనుమాన\nజ్ఞాన గున సాగర।\nజయ కపీస\nతిహుం లోక ఉజాగర।।",
      "transliteration": "Jai Hanuman\nGyaan gun saagar\nJai Kapis\nTihun lok ujagar",
      "meaning": "Hail Hanuman, ocean of knowledge and virtues. Hail the lord of monkeys, who illuminates the three worlds."
    },
    {
      "id": "chaupai-02",
      "verse_number": 2,
      "text": "రామ దూత\nఅతులిత బల ధామా।\nఅంజని-పుత్ర\nపవనసుత నామా।।",
      "transliteration": "Ram doot\nAtulit bal dhama\nAnjani-putra\nPavansut nama",
      "meaning": "You are Rama''s messenger, repository of incomparable strength. You are known as the son of Anjani and the son of the wind."
    },
    {
      "id": "chaupai-03",
      "verse_number": 3,
      "text": "మహాబీర\nబిక్రమ బజరంగీ।\nకుమతి నివార\nసుమతి కే సంగీ।।",
      "transliteration": "Mahavir\nBikram bajrangi\nKumati nivar\nSumati ke sangi",
      "meaning": "O great hero of immense valor, with a body strong as a thunderbolt, you remove evil thoughts and are the companion of good thoughts."
    },
    {
      "id": "chaupai-04",
      "verse_number": 4,
      "text": "కంచన బరన బిరాజ సుబేసా।\nకానన కుండల కుంచిత కేసా।।",
      "transliteration": "Kanchan varan viraj subesa\nKanan kundal kunchit kesa",
      "meaning": "Your complexion is golden, and you shine in beautiful attire, with earrings in your ears and curly hair."
    },
    {
      "id": "chaupai-05",
      "verse_number": 5,
      "text": "హాథ బజ్ర ఔ ధ్వజా బిరాజై।\nకాంధే మూంజ జనేఊ సాజై।।",
      "transliteration": "Hath bajra au dhvaja virajai\nKandhe moonj janeoo sajai",
      "meaning": "In your hand shine the mace and flag, and on your shoulder rests the sacred thread."
    },
    {
      "id": "chaupai-06",
      "verse_number": 6,
      "text": "శంకర సువన కేసరీ నందన।\nతేజ ప్రతాప మహా జగ బందన।।",
      "transliteration": "Shankar suvan Kesari nandan\nTej pratap maha jag bandan",
      "meaning": "You are like Shiva, son and delight of Kesari, possessing great radiance and glory, saluted by the entire world.\n"
    },
    {
      "id": "chaupai-07",
      "verse_number": 7,
      "text": "విద్యావాన గుణీ అతి చాతుర।\nరామ కాజ కరిబే కో ఆతుర।।",
      "transliteration": "Vidyavan guni ati chatur\nRam kaaj karibe ko aatur",
      "meaning": "You are highly learned, virtuous, and extremely clever, and are eager to do Rama''s work.\n"
    },
    {
      "id": "chaupai-08",
      "verse_number": 8,
      "text": "ప్రభు చరిత్ర సునిబే కో రసియా।\nరామ లఖన సీతా మన బసియా।।",
      "transliteration": "Prabhu charitra sunibe ko rasiya\nRam lakhan Sita man basiya",
      "meaning": "You are passionate about listening to the Lord''s stories, and Rama, Lakshmana, and Sita dwell in your heart.\n"
    },
    {
      "id": "chaupai-09",
      "verse_number": 9,
      "text": "సూక్ష్మ రూప ధరి సియహిం దిఖావా।\nబికట రూప ధరి లంక జరావా।।",
      "transliteration": "Sukshma roop dhari siyahin dikhava\nBikat roop dhari Lanka jarava",
      "meaning": "Taking a tiny form, you appeared before Sita; assuming a gigantic fierce form, you burned Lanka."
    },
    {
      "id": "chaupai-10",
      "verse_number": 10,
      "text": "భీమ రూప ధరి అసుర సంహారే।\nరామచంద్ర కే కాజ సంవారే।।",
      "transliteration": "Bhima roop dhari asur sanhare\nRamchandra ke kaaj sanvare",
      "meaning": "Taking a terrible form, you destroyed demons and accomplished Rama''s tasks perfectly.\n"
    },
    {
      "id": "chaupai-11",
      "verse_number": 11,
      "text": "లాయ సజీవన లఖన జియాయే।\nశ్రీ రఘుబీర హరషి ఉర లాయే।।",
      "transliteration": "Laaye sajeevan Lakhan jiyaye\nShri Raghubir harashi ur laye",
      "meaning": "You brought the Sanjeevani herb and revived Lakshmana; Rama joyfully embraced you to his chest."
    },
    {
      "id": "chaupai-12",
      "verse_number": 12,
      "text": "రఘుపతి కీన్హీ బహుత బड़ాఈ।\nతుమ మమ ప్రియ భరతహి సమ భాఈ।।",
      "transliteration": "Raghupati kinhi bahut badai\nTum mam priya Bharatahi sam bhai",
      "meaning": "The Lord of the Raghu dynasty praised you greatly, saying \"You are as dear to me as my brother Bharata.\"\n"
    },
    {
      "id": "chaupai-13",
      "verse_number": 13,
      "text": "సహస బదన తుమ్హరో జస గావైం।\nఅస కహి శ్రీపతి కంఠ లగావైం।।",
      "transliteration": "Sahas badan tumharo jas gavain\nAs kahi Shripati kanth lagavain",
      "meaning": "\"Even the thousand-mouthed serpent (Shesha) sings your glories,\" saying thus, the Lord embraced you.\n"
    },
    {
      "id": "chaupai-14",
      "verse_number": 14,
      "text": "సనకాదిక బ్రహ్మాది మునీసా।\nనారద సారద సహిత అహీసా।।",
      "transliteration": "Sanakadik Brahmadi munisa\nNarad Sarad sahit ahisa",
      "meaning": "The four Kumaras, Brahma and other gods, great sages, Narada, Saraswati, along with Shesha (all sing your praises)."
    },
    {
      "id": "chaupai-15",
      "verse_number": 15,
      "text": "జమ కుబేర దిగపాల జహాం తే।\nకబి కోబిద కహి సకే కహాం తే।।",
      "transliteration": "Yam Kuber digpal jahan te\nKabi kobid kahi sake kahan te",
      "meaning": "Yama, Kubera, the guardians of directions - from where can poets and scholars even begin to describe your glory?"
    },
    {
      "id": "chaupai-16",
      "verse_number": 16,
      "text": "తుమ ఉపకార సుగ్రీవహిం కీన్హా।\nరామ మిలాయ రాజ పద దీన్హా।।",
      "transliteration": "Tum upkar Sugrivahin kinha\nRam milay raj pad dinha",
      "meaning": "You did a great favor to Sugriva by uniting him with Rama and helping him obtain his kingdom."
    },
    {
      "id": "chaupai-17",
      "verse_number": 17,
      "text": "తుమ్హరో మంత్ర బిభీషన మానా।\nలంకేశ్వర భఏ సబ జగ జానా।।",
      "transliteration": "Tumharo mantra Vibhishan mana\nLankeshwar bhaye sab jag jana",
      "meaning": "Vibhishana accepted your counsel and became the Lord of Lanka, as the entire world knows."
    },
    {
      "id": "chaupai-18",
      "verse_number": 18,
      "text": "జుగ సహస్ర జోజన పర భానూ।\nలీల్యో తాహి మధుర ఫల జానూ।।",
      "transliteration": "Jug sahastra jojan par bhanu\nLeelyo tahi madhur phal janu",
      "meaning": "The sun, located thousands of yojanas away, you leaped toward it, thinking it was a sweet fruit.\n"
    },
    {
      "id": "chaupai-19",
      "verse_number": 19,
      "text": "ప్రభు ముద్రికా మేలి ముఖ మాహీం।\nజలధి లాంఘి గయే అచరజ నాహీం।।",
      "transliteration": "Prabhu mudrika meli mukh mahin\nJaladhi langhi gaye acharaj nahin",
      "meaning": "Placing the Lord''s ring in your mouth, you crossed the ocean - this is no surprise.\n"
    },
    {
      "id": "chaupai-20",
      "verse_number": 20,
      "text": "దుర్గమ కాజ జగత కే జేతే।\nసుగమ అనుగ్రహ తుమ్హరే తేతే।।",
      "transliteration": "Durgam kaaj jagat ke jete\nSugam anugrah tumhare tete",
      "meaning": "Whatever difficult tasks exist in the world, they become easy with your grace.\n"
    },
    {
      "id": "chaupai-21",
      "verse_number": 21,
      "text": "రామ దుఆరే తుమ రఖవారే।\nహోత న ఆజ్ఞా బిను పైసారే।।",
      "transliteration": "Ram duare tum rakhavare\nHot na agya binu paisare",
      "meaning": "You are the guardian at Rama''s door; no one can enter without your permission."
    },
    {
      "id": "chaupai-22",
      "verse_number": 22,
      "text": "సబ సుఖ లహై తుమ్హారీ సరనా।\nతుమ రక్షక కాహూ కో డర నా।।",
      "transliteration": "Sab sukh lahai tumhari sarna\nTum rakshak kahu ko dar na",
      "meaning": "Taking refuge in you, one obtains all happiness; when you are the protector, there is no fear.\n"
    },
    {
      "id": "chaupai-23",
      "verse_number": 23,
      "text": "ఆపన తేజ సమ్హారో ఆపై।\nతీనోం లోక హాంక తేం కాంపై।।",
      "transliteration": "Aapan tej samharo aapai\nTeenon lok hank ten kanpai",
      "meaning": "You alone can control your own power; the three worlds tremble at your roar."
    },
    {
      "id": "chaupai-24",
      "verse_number": 24,
      "text": "భూత పిసాచ నికట నహిం ఆవై।\nమహాబీర జబ నామ సునావై।।",
      "transliteration": "Bhoot pisach nikat nahin avai\nMahavir jab nam sunavai",
      "meaning": "Ghosts and demons do not come near when the name of Mahavir (Hanuman) is uttered."
    },
    {
      "id": "chaupai-25",
      "verse_number": 25,
      "text": "నాసై రోగ హరై సబ పీరా।\nజపత నిరంతర హనుమత బీరా।।",
      "transliteration": "Nasai rog harai sab peera\nJapat nirantar Hanumat beera",
      "meaning": "Diseases are destroyed and all pain is removed by continuously chanting the name of the heroic Hanuman.\n"
    },
    {
      "id": "chaupai-26",
      "verse_number": 26,
      "text": "సంకట తేం హనుమాన ఛుड़ావై।\nమన క్రమ బచన ధ్యాన జో లావై।।",
      "transliteration": "Sankat ten Hanuman chhudavai\nMan kram bachan dhyan jo lavai",
      "meaning": "Hanuman liberates from crises those who meditate on him with mind, action, and speech.\n"
    },
    {
      "id": "chaupai-27",
      "verse_number": 27,
      "text": "సబ పర రామ తపస్వీ రాజా।\nతిన కే కాజ సకల తుమ సాజా।।",
      "transliteration": "Sab par Ram tapasvi raja\nTin ke kaaj sakal tum saja",
      "meaning": "Ram is the supreme king among ascetics, and you have accomplished all his tasks.\n"
    },
    {
      "id": "chaupai-28",
      "verse_number": 28,
      "text": "ఔర మనోరథ జో కోఈ లావై।\nసోఈ అమిత జీవన ఫల పావై।।",
      "transliteration": "Aur manorath jo koi lavai\nSoi amit jivan phal pavai",
      "meaning": "And whatever desire anyone harbors, that person obtains unlimited fruits of life.\n"
    },
    {
      "id": "chaupai-29",
      "verse_number": 29,
      "text": "చారోం జుగ పరతాప తుమ్హారా।\nహై పరసిద్ధ జగత ఉజియారా।।",
      "transliteration": "Charon jug partap tumhara\nHai parsiddh jagat ujiyara",
      "meaning": "Your glory is renowned throughout the four ages and illuminates the world.\n"
    },
    {
      "id": "chaupai-30",
      "verse_number": 30,
      "text": "సాధు సంత కే తుమ రఖవారే।\nఅసుర నికందన రామ దులారే।।",
      "transliteration": "Sadhu sant ke tum rakhavare\nAsur nikandan Ram dulare",
      "meaning": "You are the protector of saints and sages, destroyer of demons, and Rama''s beloved.\n"
    },
    {
      "id": "chaupai-31",
      "verse_number": 31,
      "text": "అష్ట సిద్ధి నౌ నిధి కే దాతా।\nఅస బర దీన జానకీ మాతా।।",
      "transliteration": "Ashta siddhi nau nidhi ke data\nAs bar deen Janaki mata",
      "meaning": "Mother Sita gave you the boon of being the giver of the eight siddhis and nine nidhis."
    },
    {
      "id": "chaupai-32",
      "verse_number": 32,
      "text": "రామ రసాయన తుమ్హరే పాసా।\nసదా రహో రఘుపతి కే దాసా।।",
      "transliteration": "Ram rasayan tumhare pasa\nSada raho Raghupati ke dasa",
      "meaning": "The elixir of devotion to Rama is with you; may you always remain Rama''s servant.\n"
    },
    {
      "id": "chaupai-33",
      "verse_number": 33,
      "text": "తుమ్హరే భజన రామ కో పావై।\nజనమ జనమ కే దుఖ బిసరావై।।",
      "transliteration": "Tumhare bhajan Ram ko pavai\nJanam janam ke dukh bisaravai",
      "meaning": "Through devotion to you, one attains Rama and forgets the sorrows of countless births.\n"
    },
    {
      "id": "chaupai-34",
      "verse_number": 34,
      "text": "అంత కాల రఘుబర పుర జాఈ।\nజహాం జన్మ హరిభక్త కహాఈ।।",
      "transliteration": "Ant kaal Raghubar pur jai\nJahan janam Haribhakt kahai",
      "meaning": "At the end time, one goes to Rama''s abode, where one is born and known as a devotee of Hari.\n"
    },
    {
      "id": "chaupai-35",
      "verse_number": 35,
      "text": "ఔర దేవతా చిత్త న ధరఈ।\nహనుమత సేఇ సర్వ సుఖ కరఈ।।",
      "transliteration": "Aur devata chitt na dharai\nHanumat sei sarva sukh karai",
      "meaning": "One need not keep other deities in mind; serving Hanuman alone creates all happiness.\n"
    },
    {
      "id": "chaupai-36",
      "verse_number": 36,
      "text": "సంకట కటై మిటై సబ పీరా।\nజో సుమిరై హనుమత బలబీరా।।",
      "transliteration": "Sankat katai mitai sab peera\nJo sumirai Hanumat balbeera",
      "meaning": "Crises are removed and all suffering is destroyed for one who remembers the mighty hero Hanuman.\n"
    },
    {
      "id": "chaupai-37",
      "verse_number": 37,
      "text": "జై జై జై హనుమాన గోసాఈం।\nకృపా కరహు గురుదేవ కీ నాఈం।।",
      "transliteration": "Jai jai jai Hanuman Gosain\nKripa karahu gurudev ki nain",
      "meaning": "Hail, hail, hail Lord Hanuman! Please bestow your grace like a divine guru.\n"
    },
    {
      "id": "chaupai-38",
      "verse_number": 38,
      "text": "జో సత బార పాఠ కర కోఈ।\nఛూటహి బంది మహా సుఖ హోఈ।।",
      "transliteration": "Jo sat baar path kar koi\nChhutahi bandi maha sukh hoi",
      "meaning": "Whoever recites this a hundred times is freed from bondage and attains great happiness.\n"
    },
    {
      "id": "chaupai-39",
      "verse_number": 39,
      "text": "జో యహ పढ़ై హనుమాన చాలీసా।\nహోయ సిద్ధి సాఖీ గౌరీసా।।",
      "transliteration": "Jo yah padhai Hanuman Chalisa\nHoye siddhi sakhi Gaurisa",
      "meaning": "One who recites this Hanuman Chalisa attains accomplishment/success, with Lord Shiva as witness.\n"
    },
    {
      "id": "chaupai-40",
      "verse_number": 40,
      "text": "తులసీదాస సదా హరి చేరా।\nకీజై నాథ హృదయ మహం డేరా।।",
      "transliteration": "Tulsidas sada Hari chera\nKeejai nath hriday mahan dera",
      "meaning": "Tulsidas is always a servant of Hari; O Lord, make your dwelling in my heart.\n"
    },
    {
      "id": "doha-closing",
      "verse_number": "Doha Closing",
      "text": "పవనతనయ సంకట హరన,\nమంగల మూరతి రూప।\nరామ లఖన సీతా సహిత,\nహృదయ బసహు సుర భూప।।",
      "transliteration": "Pavantanay sankat haran,\nMangal murti roop\nRam lakhan Sita sahit,\nHriday basahu sur bhoop",
      "meaning": "O son of the wind, remover of crises, of auspicious form! Along with Rama, Lakshmana, and Sita, please dwell in my heart, O king of gods."
    }
  ],
  "faqs": [
    {
      "question": "హనుమాన్ చాలీసా ఎవరు రాశారు?",
      "answer": "హనుమాన్ చాలీసాను 16వ శతాబ్దంలో ప్రసిద్ధ కవి గోస్వామి తులసీదాస్ రచించారు."
    },
    {
      "question": "హనుమాన్ చాలీసా పఠించడం వల్ల కలిగే ప్రయోజనాలు ఏమిటి?",
      "answer": "ఇది మనశ్శాంతిని ఇస్తుంది, భయాలను తొలగిస్తుంది మరియు కష్టాలను అధిగమించడానికి ధైర్యాన్ని ఇస్తుంది."
    }
  ]
}', 1, '2026-09-03T17:52:20.408Z')
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;


INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES ('lang-bn', 'bn', 'শ্রী হনুমান চালিসা — বাংলা লিরিক্স, অনুবাদ, পিডিএফ এবং অডিও', 'বাংলায় সম্পূর্ণ হনুমান চালিসা পাঠ করুন। প্রতিটি চরণের বাংলা অর্থ, অডিও এবং পিডিএফ ফাইল এখানে পেয়ে যাবেন।', '{
  "lang": "bn",
  "title": "শ্রী হনুমান চালিসা — বাংলা লিরিক্স, অনুবাদ, পিডিএফ এবং অডিও",
  "metaDescription": "বাংলায় সম্পূর্ণ হনুমান চালিসা পাঠ করুন। প্রতিটি চরণের বাংলা অর্থ, অডিও এবং পিডিএফ ফাইল এখানে পেয়ে যাবেন।",
  "h1": "শ্রী হনুমান চালিসা",
  "intro": "গোস্বামী তুলসীদাস রচিত এই চল্লিশটি শ্লোক হনুমান জির বীরত্ব ও ভক্তির মহিমা কীর্তন করে।",
  "meaningSummary": "হনুমান চালিসা পাঠ করলে মানুষের মনের সমস্ত ভয় দূর হয় এবং জীবনে সুখ ও সমৃদ্ধি লাভ হয়।",
  "verses": [
    {
      "id": "doha-01",
      "verse_number": "Doha 1",
      "text": "শ্রীগুরু চরন সরোজ রজ,\nনিজ মন মুকুরু সুধারি।\nবরনউং রঘুবর বিমল জসু,\nজো দাযকু ফল চারি।।",
      "transliteration": "Shri Guru charan saroj raj,\nNij man mukuru sudhari\nBarnau Raghubar bimal jasu,\nJo dayaku phal chari",
      "meaning": "With the dust of my Guru''s lotus feet, I cleanse the mirror of my mind and describe the pure glory of Raghubar (Lord Rama), which grants the four fruits."
    },
    {
      "id": "doha-02",
      "verse_number": "Doha 2",
      "text": "বুদ্ধিহীন তনু জানিকে,\nসুমিরৌং পবন-কুমার।\nবল বুদ্ধি বিদ্যা দেহু মোহিং,\nহরহু কলেস বিকার।।",
      "transliteration": "Buddhiheen tanu janike,\nSumirou pavan-kumar\nBal buddhi bidya dehu mohin,\nHarahu kales bikar",
      "meaning": "Knowing myself to be lacking in intelligence, I remember the son of the wind. Please grant me strength, wisdom, and knowledge, and remove my suffering and impurities."
    },
    {
      "id": "chaupai-01",
      "verse_number": 1,
      "text": "জয হনুমান\nজ্ঞান গুন সাগর।\nজয কপীস\nতিহুং লোক উজাগর।।",
      "transliteration": "Jai Hanuman\nGyaan gun saagar\nJai Kapis\nTihun lok ujagar",
      "meaning": "Hail Hanuman, ocean of knowledge and virtues. Hail the lord of monkeys, who illuminates the three worlds."
    },
    {
      "id": "chaupai-02",
      "verse_number": 2,
      "text": "রাম দূত\nঅতুলিত বল ধামা।\nঅংজনি-পুত্র\nপবনসুত নামা।।",
      "transliteration": "Ram doot\nAtulit bal dhama\nAnjani-putra\nPavansut nama",
      "meaning": "You are Rama''s messenger, repository of incomparable strength. You are known as the son of Anjani and the son of the wind."
    },
    {
      "id": "chaupai-03",
      "verse_number": 3,
      "text": "মহাবীর\nবিক্রম বজরংগী।\nকুমতি নিবার\nসুমতি কে সংগী।।",
      "transliteration": "Mahavir\nBikram bajrangi\nKumati nivar\nSumati ke sangi",
      "meaning": "O great hero of immense valor, with a body strong as a thunderbolt, you remove evil thoughts and are the companion of good thoughts."
    },
    {
      "id": "chaupai-04",
      "verse_number": 4,
      "text": "কংচন বরন বিরাজ সুবেসা।\nকানন কুংডল কুংচিত কেসা।।",
      "transliteration": "Kanchan varan viraj subesa\nKanan kundal kunchit kesa",
      "meaning": "Your complexion is golden, and you shine in beautiful attire, with earrings in your ears and curly hair."
    },
    {
      "id": "chaupai-05",
      "verse_number": 5,
      "text": "হাথ বজ্র ঔ ধ্বজা বিরাজৈ।\nকাংধে মূংজ জনেঊ সাজৈ।।",
      "transliteration": "Hath bajra au dhvaja virajai\nKandhe moonj janeoo sajai",
      "meaning": "In your hand shine the mace and flag, and on your shoulder rests the sacred thread."
    },
    {
      "id": "chaupai-06",
      "verse_number": 6,
      "text": "শংকর সুবন কেসরী নংদন।\nতেজ প্রতাপ মহা জগ বংদন।।",
      "transliteration": "Shankar suvan Kesari nandan\nTej pratap maha jag bandan",
      "meaning": "You are like Shiva, son and delight of Kesari, possessing great radiance and glory, saluted by the entire world.\n"
    },
    {
      "id": "chaupai-07",
      "verse_number": 7,
      "text": "বিদ্যাবান গুণী অতি চাতুর।\nরাম কাজ করিবে কো আতুর।।",
      "transliteration": "Vidyavan guni ati chatur\nRam kaaj karibe ko aatur",
      "meaning": "You are highly learned, virtuous, and extremely clever, and are eager to do Rama''s work.\n"
    },
    {
      "id": "chaupai-08",
      "verse_number": 8,
      "text": "প্রভু চরিত্র সুনিবে কো রসিযা।\nরাম লখন সীতা মন বসিযা।।",
      "transliteration": "Prabhu charitra sunibe ko rasiya\nRam lakhan Sita man basiya",
      "meaning": "You are passionate about listening to the Lord''s stories, and Rama, Lakshmana, and Sita dwell in your heart.\n"
    },
    {
      "id": "chaupai-09",
      "verse_number": 9,
      "text": "সূক্ষ্ম রূপ ধরি সিযহিং দিখাবা।\nবিকট রূপ ধরি লংক জরাবা।।",
      "transliteration": "Sukshma roop dhari siyahin dikhava\nBikat roop dhari Lanka jarava",
      "meaning": "Taking a tiny form, you appeared before Sita; assuming a gigantic fierce form, you burned Lanka."
    },
    {
      "id": "chaupai-10",
      "verse_number": 10,
      "text": "ভীম রূপ ধরি অসুর সংহারে।\nরামচংদ্র কে কাজ সংবারে।।",
      "transliteration": "Bhima roop dhari asur sanhare\nRamchandra ke kaaj sanvare",
      "meaning": "Taking a terrible form, you destroyed demons and accomplished Rama''s tasks perfectly.\n"
    },
    {
      "id": "chaupai-11",
      "verse_number": 11,
      "text": "লায সজীবন লখন জিযাযে।\nশ্রী রঘুবীর হরষি উর লাযে।।",
      "transliteration": "Laaye sajeevan Lakhan jiyaye\nShri Raghubir harashi ur laye",
      "meaning": "You brought the Sanjeevani herb and revived Lakshmana; Rama joyfully embraced you to his chest."
    },
    {
      "id": "chaupai-12",
      "verse_number": 12,
      "text": "রঘুপতি কীন্হী বহুত বড়াঈ।\nতুম মম প্রিয ভরতহি সম ভাঈ।।",
      "transliteration": "Raghupati kinhi bahut badai\nTum mam priya Bharatahi sam bhai",
      "meaning": "The Lord of the Raghu dynasty praised you greatly, saying \"You are as dear to me as my brother Bharata.\"\n"
    },
    {
      "id": "chaupai-13",
      "verse_number": 13,
      "text": "সহস বদন তুম্হরো জস গাবৈং।\nঅস কহি শ্রীপতি কংঠ লগাবৈং।।",
      "transliteration": "Sahas badan tumharo jas gavain\nAs kahi Shripati kanth lagavain",
      "meaning": "\"Even the thousand-mouthed serpent (Shesha) sings your glories,\" saying thus, the Lord embraced you.\n"
    },
    {
      "id": "chaupai-14",
      "verse_number": 14,
      "text": "সনকাদিক ব্রহ্মাদি মুনীসা।\nনারদ সারদ সহিত অহীসা।।",
      "transliteration": "Sanakadik Brahmadi munisa\nNarad Sarad sahit ahisa",
      "meaning": "The four Kumaras, Brahma and other gods, great sages, Narada, Saraswati, along with Shesha (all sing your praises)."
    },
    {
      "id": "chaupai-15",
      "verse_number": 15,
      "text": "জম কুবের দিগপাল জহাং তে।\nকবি কোবিদ কহি সকে কহাং তে।।",
      "transliteration": "Yam Kuber digpal jahan te\nKabi kobid kahi sake kahan te",
      "meaning": "Yama, Kubera, the guardians of directions - from where can poets and scholars even begin to describe your glory?"
    },
    {
      "id": "chaupai-16",
      "verse_number": 16,
      "text": "তুম উপকার সুগ্রীবহিং কীন্হা।\nরাম মিলায রাজ পদ দীন্হা।।",
      "transliteration": "Tum upkar Sugrivahin kinha\nRam milay raj pad dinha",
      "meaning": "You did a great favor to Sugriva by uniting him with Rama and helping him obtain his kingdom."
    },
    {
      "id": "chaupai-17",
      "verse_number": 17,
      "text": "তুম্হরো মংত্র বিভীষন মানা।\nলংকেশ্বর ভএ সব জগ জানা।।",
      "transliteration": "Tumharo mantra Vibhishan mana\nLankeshwar bhaye sab jag jana",
      "meaning": "Vibhishana accepted your counsel and became the Lord of Lanka, as the entire world knows."
    },
    {
      "id": "chaupai-18",
      "verse_number": 18,
      "text": "জুগ সহস্র জোজন পর ভানূ।\nলীল্যো তাহি মধুর ফল জানূ।।",
      "transliteration": "Jug sahastra jojan par bhanu\nLeelyo tahi madhur phal janu",
      "meaning": "The sun, located thousands of yojanas away, you leaped toward it, thinking it was a sweet fruit.\n"
    },
    {
      "id": "chaupai-19",
      "verse_number": 19,
      "text": "প্রভু মুদ্রিকা মেলি মুখ মাহীং।\nজলধি লাংঘি গযে অচরজ নাহীং।।",
      "transliteration": "Prabhu mudrika meli mukh mahin\nJaladhi langhi gaye acharaj nahin",
      "meaning": "Placing the Lord''s ring in your mouth, you crossed the ocean - this is no surprise.\n"
    },
    {
      "id": "chaupai-20",
      "verse_number": 20,
      "text": "দুর্গম কাজ জগত কে জেতে।\nসুগম অনুগ্রহ তুম্হরে তেতে।।",
      "transliteration": "Durgam kaaj jagat ke jete\nSugam anugrah tumhare tete",
      "meaning": "Whatever difficult tasks exist in the world, they become easy with your grace.\n"
    },
    {
      "id": "chaupai-21",
      "verse_number": 21,
      "text": "রাম দুআরে তুম রখবারে।\nহোত ন আজ্ঞা বিনু পৈসারে।।",
      "transliteration": "Ram duare tum rakhavare\nHot na agya binu paisare",
      "meaning": "You are the guardian at Rama''s door; no one can enter without your permission."
    },
    {
      "id": "chaupai-22",
      "verse_number": 22,
      "text": "সব সুখ লহৈ তুম্হারী সরনা।\nতুম রক্ষক কাহূ কো ডর না।।",
      "transliteration": "Sab sukh lahai tumhari sarna\nTum rakshak kahu ko dar na",
      "meaning": "Taking refuge in you, one obtains all happiness; when you are the protector, there is no fear.\n"
    },
    {
      "id": "chaupai-23",
      "verse_number": 23,
      "text": "আপন তেজ সম্হারো আপৈ।\nতীনোং লোক হাংক তেং কাংপৈ।।",
      "transliteration": "Aapan tej samharo aapai\nTeenon lok hank ten kanpai",
      "meaning": "You alone can control your own power; the three worlds tremble at your roar."
    },
    {
      "id": "chaupai-24",
      "verse_number": 24,
      "text": "ভূত পিসাচ নিকট নহিং আবৈ।\nমহাবীর জব নাম সুনাবৈ।।",
      "transliteration": "Bhoot pisach nikat nahin avai\nMahavir jab nam sunavai",
      "meaning": "Ghosts and demons do not come near when the name of Mahavir (Hanuman) is uttered."
    },
    {
      "id": "chaupai-25",
      "verse_number": 25,
      "text": "নাসৈ রোগ হরৈ সব পীরা।\nজপত নিরংতর হনুমত বীরা।।",
      "transliteration": "Nasai rog harai sab peera\nJapat nirantar Hanumat beera",
      "meaning": "Diseases are destroyed and all pain is removed by continuously chanting the name of the heroic Hanuman.\n"
    },
    {
      "id": "chaupai-26",
      "verse_number": 26,
      "text": "সংকট তেং হনুমান ছুড়াবৈ।\nমন ক্রম বচন ধ্যান জো লাবৈ।।",
      "transliteration": "Sankat ten Hanuman chhudavai\nMan kram bachan dhyan jo lavai",
      "meaning": "Hanuman liberates from crises those who meditate on him with mind, action, and speech.\n"
    },
    {
      "id": "chaupai-27",
      "verse_number": 27,
      "text": "সব পর রাম তপস্বী রাজা।\nতিন কে কাজ সকল তুম সাজা।।",
      "transliteration": "Sab par Ram tapasvi raja\nTin ke kaaj sakal tum saja",
      "meaning": "Ram is the supreme king among ascetics, and you have accomplished all his tasks.\n"
    },
    {
      "id": "chaupai-28",
      "verse_number": 28,
      "text": "ঔর মনোরথ জো কোঈ লাবৈ।\nসোঈ অমিত জীবন ফল পাবৈ।।",
      "transliteration": "Aur manorath jo koi lavai\nSoi amit jivan phal pavai",
      "meaning": "And whatever desire anyone harbors, that person obtains unlimited fruits of life.\n"
    },
    {
      "id": "chaupai-29",
      "verse_number": 29,
      "text": "চারোং জুগ পরতাপ তুম্হারা।\nহৈ পরসিদ্ধ জগত উজিযারা।।",
      "transliteration": "Charon jug partap tumhara\nHai parsiddh jagat ujiyara",
      "meaning": "Your glory is renowned throughout the four ages and illuminates the world.\n"
    },
    {
      "id": "chaupai-30",
      "verse_number": 30,
      "text": "সাধু সংত কে তুম রখবারে।\nঅসুর নিকংদন রাম দুলারে।।",
      "transliteration": "Sadhu sant ke tum rakhavare\nAsur nikandan Ram dulare",
      "meaning": "You are the protector of saints and sages, destroyer of demons, and Rama''s beloved.\n"
    },
    {
      "id": "chaupai-31",
      "verse_number": 31,
      "text": "অষ্ট সিদ্ধি নৌ নিধি কে দাতা।\nঅস বর দীন জানকী মাতা।।",
      "transliteration": "Ashta siddhi nau nidhi ke data\nAs bar deen Janaki mata",
      "meaning": "Mother Sita gave you the boon of being the giver of the eight siddhis and nine nidhis."
    },
    {
      "id": "chaupai-32",
      "verse_number": 32,
      "text": "রাম রসাযন তুম্হরে পাসা।\nসদা রহো রঘুপতি কে দাসা।।",
      "transliteration": "Ram rasayan tumhare pasa\nSada raho Raghupati ke dasa",
      "meaning": "The elixir of devotion to Rama is with you; may you always remain Rama''s servant.\n"
    },
    {
      "id": "chaupai-33",
      "verse_number": 33,
      "text": "তুম্হরে ভজন রাম কো পাবৈ।\nজনম জনম কে দুখ বিসরাবৈ।।",
      "transliteration": "Tumhare bhajan Ram ko pavai\nJanam janam ke dukh bisaravai",
      "meaning": "Through devotion to you, one attains Rama and forgets the sorrows of countless births.\n"
    },
    {
      "id": "chaupai-34",
      "verse_number": 34,
      "text": "অংত কাল রঘুবর পুর জাঈ।\nজহাং জন্ম হরিভক্ত কহাঈ।।",
      "transliteration": "Ant kaal Raghubar pur jai\nJahan janam Haribhakt kahai",
      "meaning": "At the end time, one goes to Rama''s abode, where one is born and known as a devotee of Hari.\n"
    },
    {
      "id": "chaupai-35",
      "verse_number": 35,
      "text": "ঔর দেবতা চিত্ত ন ধরঈ।\nহনুমত সেই সর্ব সুখ করঈ।।",
      "transliteration": "Aur devata chitt na dharai\nHanumat sei sarva sukh karai",
      "meaning": "One need not keep other deities in mind; serving Hanuman alone creates all happiness.\n"
    },
    {
      "id": "chaupai-36",
      "verse_number": 36,
      "text": "সংকট কটৈ মিটৈ সব পীরা।\nজো সুমিরৈ হনুমত বলবীরা।।",
      "transliteration": "Sankat katai mitai sab peera\nJo sumirai Hanumat balbeera",
      "meaning": "Crises are removed and all suffering is destroyed for one who remembers the mighty hero Hanuman.\n"
    },
    {
      "id": "chaupai-37",
      "verse_number": 37,
      "text": "জৈ জৈ জৈ হনুমান গোসাঈং।\nকৃপা করহু গুরুদেব কী নাঈং।।",
      "transliteration": "Jai jai jai Hanuman Gosain\nKripa karahu gurudev ki nain",
      "meaning": "Hail, hail, hail Lord Hanuman! Please bestow your grace like a divine guru.\n"
    },
    {
      "id": "chaupai-38",
      "verse_number": 38,
      "text": "জো সত বার পাঠ কর কোঈ।\nছূটহি বংদি মহা সুখ হোঈ।।",
      "transliteration": "Jo sat baar path kar koi\nChhutahi bandi maha sukh hoi",
      "meaning": "Whoever recites this a hundred times is freed from bondage and attains great happiness.\n"
    },
    {
      "id": "chaupai-39",
      "verse_number": 39,
      "text": "জো যহ পঢ়ৈ হনুমান চালীসা।\nহোয সিদ্ধি সাখী গৌরীসা।।",
      "transliteration": "Jo yah padhai Hanuman Chalisa\nHoye siddhi sakhi Gaurisa",
      "meaning": "One who recites this Hanuman Chalisa attains accomplishment/success, with Lord Shiva as witness.\n"
    },
    {
      "id": "chaupai-40",
      "verse_number": 40,
      "text": "তুলসীদাস সদা হরি চেরা।\nকীজৈ নাথ হৃদয মহং ডেরা।।",
      "transliteration": "Tulsidas sada Hari chera\nKeejai nath hriday mahan dera",
      "meaning": "Tulsidas is always a servant of Hari; O Lord, make your dwelling in my heart.\n"
    },
    {
      "id": "doha-closing",
      "verse_number": "Doha Closing",
      "text": "পবনতনয সংকট হরন,\nমংগল মূরতি রূপ।\nরাম লখন সীতা সহিত,\nহৃদয বসহু সুর ভূপ।।",
      "transliteration": "Pavantanay sankat haran,\nMangal murti roop\nRam lakhan Sita sahit,\nHriday basahu sur bhoop",
      "meaning": "O son of the wind, remover of crises, of auspicious form! Along with Rama, Lakshmana, and Sita, please dwell in my heart, O king of gods."
    }
  ],
  "faqs": [
    {
      "question": "হনুমান চালিসা কে রচনা করেছিলেন?",
      "answer": "১৬শ শতাব্দীতে মহাকবি গোস্বামী তুলসীদাস হনুমান চালিসা রচনা করেছিলেন।"
    },
    {
      "question": "হনুমান চালিসা পাঠ করার উপকারিতা কী?",
      "answer": "নিয়মিত পাঠ করলে মনের শক্তি বৃদ্ধি পায়, সমস্ত ভয় ও নেতিবাচক প্রভাব দূর হয় এবং জীবনে বাধা কেটে যায়।"
    }
  ]
}', 1, '2026-09-03T17:52:20.409Z')
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;


INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES ('lang-kn', 'kn', 'ಶ್ರೀ ಹನುಮಾನ್ ಚಾಲೀಸಾ — ಕನ್ನಡ ಲಿಪಿ, ಅನುವಾದ, ಪಿಡಿಎಫ್ ಮತ್ತು ಆಡಿಯೋ', 'ಸಂಪೂರ್ಣ ಶ್ರೀ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಕನ್ನಡ ಲಿಪಿ ಮತ್ತು ಪ್ರತಿ ಸಾಲಿನ ಸರಳ ಕನ್ನಡ ಅರ್ಥ. ಆಡಿಯೋ ಮತ್ತು ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಇಲ್ಲಿದೆ.', '{
  "lang": "kn",
  "title": "ಶ್ರೀ ಹನುಮಾನ್ ಚಾಲೀಸಾ — ಕನ್ನಡ ಲಿಪಿ, ಅನುವಾದ, ಪಿಡಿಎಫ್ ಮತ್ತು ಆಡಿಯೋ",
  "metaDescription": "ಸಂಪೂರ್ಣ ಶ್ರೀ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಕನ್ನಡ ಲಿಪಿ ಮತ್ತು ಪ್ರತಿ ಸಾಲಿನ ಸರಳ ಕನ್ನಡ ಅರ್ಥ. ಆಡಿಯೋ ಮತ್ತು ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಇಲ್ಲಿದೆ.",
  "h1": "ಶ್ರೀ ಹನುಮಾನ್ ಚಾಲೀಸಾ",
  "intro": "ಗೋಸ್ವಾಮಿ ತುಳಸೀದಾಸರು ರಚಿಸಿದ ಈ 40 ಚೌಪಾಯಿಗಳು ಹನುಮಂತನ ಭಕ್ತಿ ಮತ್ತು ಶೌರ್ಯವನ್ನು ಸಾರುತ್ತವೆ.",
  "meaningSummary": "ಹನುಮಾನ್ ಚಾಲೀಸಾವನ್ನು ಭಕ್ತಿಯಿಂದ ಪಠಿಸುವುದರಿಂದ ಮನಸ್ಸಿನ ಭಯ ನಿವಾರಣೆಯಾಗಿ ಸಕಲ ಕಷ್ಟಗಳೂ ದೂರವಾಗುತ್ತವೆ.",
  "verses": [
    {
      "id": "doha-01",
      "verse_number": "Doha 1",
      "text": "ಶ್ರೀಗುರು ಚರನ ಸರೋಜ ರಜ,\nನಿಜ ಮನ ಮುಕುರು ಸುಧಾರಿ।\nಬರನಉಂ ರಘುಬರ ಬಿಮಲ ಜಸು,\nಜೋ ದಾಯಕು ಫಲ ಚಾರಿ।।",
      "transliteration": "Shri Guru charan saroj raj,\nNij man mukuru sudhari\nBarnau Raghubar bimal jasu,\nJo dayaku phal chari",
      "meaning": "With the dust of my Guru''s lotus feet, I cleanse the mirror of my mind and describe the pure glory of Raghubar (Lord Rama), which grants the four fruits."
    },
    {
      "id": "doha-02",
      "verse_number": "Doha 2",
      "text": "ಬುದ್ಧಿಹೀನ ತನು ಜಾನಿಕೇ,\nಸುಮಿರೌಂ ಪವನ-ಕುಮಾರ।\nಬಲ ಬುದ್ಧಿ ಬಿದ್ಯಾ ದೇಹು ಮೋಹಿಂ,\nಹರಹು ಕಲೇಸ ಬಿಕಾರ।।",
      "transliteration": "Buddhiheen tanu janike,\nSumirou pavan-kumar\nBal buddhi bidya dehu mohin,\nHarahu kales bikar",
      "meaning": "Knowing myself to be lacking in intelligence, I remember the son of the wind. Please grant me strength, wisdom, and knowledge, and remove my suffering and impurities."
    },
    {
      "id": "chaupai-01",
      "verse_number": 1,
      "text": "ಜಯ ಹನುಮಾನ\nಜ್ಞಾನ ಗುನ ಸಾಗರ।\nಜಯ ಕಪೀಸ\nತಿಹುಂ ಲೋಕ ಉಜಾಗರ।।",
      "transliteration": "Jai Hanuman\nGyaan gun saagar\nJai Kapis\nTihun lok ujagar",
      "meaning": "Hail Hanuman, ocean of knowledge and virtues. Hail the lord of monkeys, who illuminates the three worlds."
    },
    {
      "id": "chaupai-02",
      "verse_number": 2,
      "text": "ರಾಮ ದೂತ\nಅತುಲಿತ ಬಲ ಧಾಮಾ।\nಅಂಜನಿ-ಪುತ್ರ\nಪವನಸುತ ನಾಮಾ।।",
      "transliteration": "Ram doot\nAtulit bal dhama\nAnjani-putra\nPavansut nama",
      "meaning": "You are Rama''s messenger, repository of incomparable strength. You are known as the son of Anjani and the son of the wind."
    },
    {
      "id": "chaupai-03",
      "verse_number": 3,
      "text": "ಮಹಾಬೀರ\nಬಿಕ್ರಮ ಬಜರಂಗೀ।\nಕುಮತಿ ನಿವಾರ\nಸುಮತಿ ಕೇ ಸಂಗೀ।।",
      "transliteration": "Mahavir\nBikram bajrangi\nKumati nivar\nSumati ke sangi",
      "meaning": "O great hero of immense valor, with a body strong as a thunderbolt, you remove evil thoughts and are the companion of good thoughts."
    },
    {
      "id": "chaupai-04",
      "verse_number": 4,
      "text": "ಕಂಚನ ಬರನ ಬಿರಾಜ ಸುಬೇಸಾ।\nಕಾನನ ಕುಂಡಲ ಕುಂಚಿತ ಕೇಸಾ।।",
      "transliteration": "Kanchan varan viraj subesa\nKanan kundal kunchit kesa",
      "meaning": "Your complexion is golden, and you shine in beautiful attire, with earrings in your ears and curly hair."
    },
    {
      "id": "chaupai-05",
      "verse_number": 5,
      "text": "ಹಾಥ ಬಜ್ರ ಔ ಧ್ವಜಾ ಬಿರಾಜೈ।\nಕಾಂಧೇ ಮೂಂಜ ಜನೇಊ ಸಾಜೈ।।",
      "transliteration": "Hath bajra au dhvaja virajai\nKandhe moonj janeoo sajai",
      "meaning": "In your hand shine the mace and flag, and on your shoulder rests the sacred thread."
    },
    {
      "id": "chaupai-06",
      "verse_number": 6,
      "text": "ಶಂಕರ ಸುವನ ಕೇಸರೀ ನಂದನ।\nತೇಜ ಪ್ರತಾಪ ಮಹಾ ಜಗ ಬಂದನ।।",
      "transliteration": "Shankar suvan Kesari nandan\nTej pratap maha jag bandan",
      "meaning": "You are like Shiva, son and delight of Kesari, possessing great radiance and glory, saluted by the entire world.\n"
    },
    {
      "id": "chaupai-07",
      "verse_number": 7,
      "text": "ವಿದ್ಯಾವಾನ ಗುಣೀ ಅತಿ ಚಾತುರ।\nರಾಮ ಕಾಜ ಕರಿಬೇ ಕೋ ಆತುರ।।",
      "transliteration": "Vidyavan guni ati chatur\nRam kaaj karibe ko aatur",
      "meaning": "You are highly learned, virtuous, and extremely clever, and are eager to do Rama''s work.\n"
    },
    {
      "id": "chaupai-08",
      "verse_number": 8,
      "text": "ಪ್ರಭು ಚರಿತ್ರ ಸುನಿಬೇ ಕೋ ರಸಿಯಾ।\nರಾಮ ಲಖನ ಸೀತಾ ಮನ ಬಸಿಯಾ।।",
      "transliteration": "Prabhu charitra sunibe ko rasiya\nRam lakhan Sita man basiya",
      "meaning": "You are passionate about listening to the Lord''s stories, and Rama, Lakshmana, and Sita dwell in your heart.\n"
    },
    {
      "id": "chaupai-09",
      "verse_number": 9,
      "text": "ಸೂಕ್ಷ್ಮ ರೂಪ ಧರಿ ಸಿಯಹಿಂ ದಿಖಾವಾ।\nಬಿಕಟ ರೂಪ ಧರಿ ಲಂಕ ಜರಾವಾ।।",
      "transliteration": "Sukshma roop dhari siyahin dikhava\nBikat roop dhari Lanka jarava",
      "meaning": "Taking a tiny form, you appeared before Sita; assuming a gigantic fierce form, you burned Lanka."
    },
    {
      "id": "chaupai-10",
      "verse_number": 10,
      "text": "ಭೀಮ ರೂಪ ಧರಿ ಅಸುರ ಸಂಹಾರೇ।\nರಾಮಚಂದ್ರ ಕೇ ಕಾಜ ಸಂವಾರೇ।।",
      "transliteration": "Bhima roop dhari asur sanhare\nRamchandra ke kaaj sanvare",
      "meaning": "Taking a terrible form, you destroyed demons and accomplished Rama''s tasks perfectly.\n"
    },
    {
      "id": "chaupai-11",
      "verse_number": 11,
      "text": "ಲಾಯ ಸಜೀವನ ಲಖನ ಜಿಯಾಯೇ।\nಶ್ರೀ ರಘುಬೀರ ಹರಷಿ ಉರ ಲಾಯೇ।।",
      "transliteration": "Laaye sajeevan Lakhan jiyaye\nShri Raghubir harashi ur laye",
      "meaning": "You brought the Sanjeevani herb and revived Lakshmana; Rama joyfully embraced you to his chest."
    },
    {
      "id": "chaupai-12",
      "verse_number": 12,
      "text": "ರಘುಪತಿ ಕೀನ್ಹೀ ಬಹುತ ಬಡ಼ಾಈ।\nತುಮ ಮಮ ಪ್ರಿಯ ಭರತಹಿ ಸಮ ಭಾಈ।।",
      "transliteration": "Raghupati kinhi bahut badai\nTum mam priya Bharatahi sam bhai",
      "meaning": "The Lord of the Raghu dynasty praised you greatly, saying \"You are as dear to me as my brother Bharata.\"\n"
    },
    {
      "id": "chaupai-13",
      "verse_number": 13,
      "text": "ಸಹಸ ಬದನ ತುಮ್ಹರೋ ಜಸ ಗಾವೈಂ।\nಅಸ ಕಹಿ ಶ್ರೀಪತಿ ಕಂಠ ಲಗಾವೈಂ।।",
      "transliteration": "Sahas badan tumharo jas gavain\nAs kahi Shripati kanth lagavain",
      "meaning": "\"Even the thousand-mouthed serpent (Shesha) sings your glories,\" saying thus, the Lord embraced you.\n"
    },
    {
      "id": "chaupai-14",
      "verse_number": 14,
      "text": "ಸನಕಾದಿಕ ಬ್ರಹ್ಮಾದಿ ಮುನೀಸಾ।\nನಾರದ ಸಾರದ ಸಹಿತ ಅಹೀಸಾ।।",
      "transliteration": "Sanakadik Brahmadi munisa\nNarad Sarad sahit ahisa",
      "meaning": "The four Kumaras, Brahma and other gods, great sages, Narada, Saraswati, along with Shesha (all sing your praises)."
    },
    {
      "id": "chaupai-15",
      "verse_number": 15,
      "text": "ಜಮ ಕುಬೇರ ದಿಗಪಾಲ ಜಹಾಂ ತೇ।\nಕಬಿ ಕೋಬಿದ ಕಹಿ ಸಕೇ ಕಹಾಂ ತೇ।।",
      "transliteration": "Yam Kuber digpal jahan te\nKabi kobid kahi sake kahan te",
      "meaning": "Yama, Kubera, the guardians of directions - from where can poets and scholars even begin to describe your glory?"
    },
    {
      "id": "chaupai-16",
      "verse_number": 16,
      "text": "ತುಮ ಉಪಕಾರ ಸುಗ್ರೀವಹಿಂ ಕೀನ್ಹಾ।\nರಾಮ ಮಿಲಾಯ ರಾಜ ಪದ ದೀನ್ಹಾ।।",
      "transliteration": "Tum upkar Sugrivahin kinha\nRam milay raj pad dinha",
      "meaning": "You did a great favor to Sugriva by uniting him with Rama and helping him obtain his kingdom."
    },
    {
      "id": "chaupai-17",
      "verse_number": 17,
      "text": "ತುಮ್ಹರೋ ಮಂತ್ರ ಬಿಭೀಷನ ಮಾನಾ।\nಲಂಕೇಶ್ವರ ಭಏ ಸಬ ಜಗ ಜಾನಾ।।",
      "transliteration": "Tumharo mantra Vibhishan mana\nLankeshwar bhaye sab jag jana",
      "meaning": "Vibhishana accepted your counsel and became the Lord of Lanka, as the entire world knows."
    },
    {
      "id": "chaupai-18",
      "verse_number": 18,
      "text": "ಜುಗ ಸಹಸ್ರ ಜೋಜನ ಪರ ಭಾನೂ।\nಲೀಲ್ಯೋ ತಾಹಿ ಮಧುರ ಫಲ ಜಾನೂ।।",
      "transliteration": "Jug sahastra jojan par bhanu\nLeelyo tahi madhur phal janu",
      "meaning": "The sun, located thousands of yojanas away, you leaped toward it, thinking it was a sweet fruit.\n"
    },
    {
      "id": "chaupai-19",
      "verse_number": 19,
      "text": "ಪ್ರಭು ಮುದ್ರಿಕಾ ಮೇಲಿ ಮುಖ ಮಾಹೀಂ।\nಜಲಧಿ ಲಾಂಘಿ ಗಯೇ ಅಚರಜ ನಾಹೀಂ।।",
      "transliteration": "Prabhu mudrika meli mukh mahin\nJaladhi langhi gaye acharaj nahin",
      "meaning": "Placing the Lord''s ring in your mouth, you crossed the ocean - this is no surprise.\n"
    },
    {
      "id": "chaupai-20",
      "verse_number": 20,
      "text": "ದುರ್ಗಮ ಕಾಜ ಜಗತ ಕೇ ಜೇತೇ।\nಸುಗಮ ಅನುಗ್ರಹ ತುಮ್ಹರೇ ತೇತೇ।।",
      "transliteration": "Durgam kaaj jagat ke jete\nSugam anugrah tumhare tete",
      "meaning": "Whatever difficult tasks exist in the world, they become easy with your grace.\n"
    },
    {
      "id": "chaupai-21",
      "verse_number": 21,
      "text": "ರಾಮ ದುಆರೇ ತುಮ ರಖವಾರೇ।\nಹೋತ ನ ಆಜ್ಞಾ ಬಿನು ಪೈಸಾರೇ।।",
      "transliteration": "Ram duare tum rakhavare\nHot na agya binu paisare",
      "meaning": "You are the guardian at Rama''s door; no one can enter without your permission."
    },
    {
      "id": "chaupai-22",
      "verse_number": 22,
      "text": "ಸಬ ಸುಖ ಲಹೈ ತುಮ್ಹಾರೀ ಸರನಾ।\nತುಮ ರಕ್ಷಕ ಕಾಹೂ ಕೋ ಡರ ನಾ।।",
      "transliteration": "Sab sukh lahai tumhari sarna\nTum rakshak kahu ko dar na",
      "meaning": "Taking refuge in you, one obtains all happiness; when you are the protector, there is no fear.\n"
    },
    {
      "id": "chaupai-23",
      "verse_number": 23,
      "text": "ಆಪನ ತೇಜ ಸಮ್ಹಾರೋ ಆಪೈ।\nತೀನೋಂ ಲೋಕ ಹಾಂಕ ತೇಂ ಕಾಂಪೈ।।",
      "transliteration": "Aapan tej samharo aapai\nTeenon lok hank ten kanpai",
      "meaning": "You alone can control your own power; the three worlds tremble at your roar."
    },
    {
      "id": "chaupai-24",
      "verse_number": 24,
      "text": "ಭೂತ ಪಿಸಾಚ ನಿಕಟ ನಹಿಂ ಆವೈ।\nಮಹಾಬೀರ ಜಬ ನಾಮ ಸುನಾವೈ।।",
      "transliteration": "Bhoot pisach nikat nahin avai\nMahavir jab nam sunavai",
      "meaning": "Ghosts and demons do not come near when the name of Mahavir (Hanuman) is uttered."
    },
    {
      "id": "chaupai-25",
      "verse_number": 25,
      "text": "ನಾಸೈ ರೋಗ ಹರೈ ಸಬ ಪೀರಾ।\nಜಪತ ನಿರಂತರ ಹನುಮತ ಬೀರಾ।।",
      "transliteration": "Nasai rog harai sab peera\nJapat nirantar Hanumat beera",
      "meaning": "Diseases are destroyed and all pain is removed by continuously chanting the name of the heroic Hanuman.\n"
    },
    {
      "id": "chaupai-26",
      "verse_number": 26,
      "text": "ಸಂಕಟ ತೇಂ ಹನುಮಾನ ಛುಡ಼ಾವೈ।\nಮನ ಕ್ರಮ ಬಚನ ಧ್ಯಾನ ಜೋ ಲಾವೈ।।",
      "transliteration": "Sankat ten Hanuman chhudavai\nMan kram bachan dhyan jo lavai",
      "meaning": "Hanuman liberates from crises those who meditate on him with mind, action, and speech.\n"
    },
    {
      "id": "chaupai-27",
      "verse_number": 27,
      "text": "ಸಬ ಪರ ರಾಮ ತಪಸ್ವೀ ರಾಜಾ।\nತಿನ ಕೇ ಕಾಜ ಸಕಲ ತುಮ ಸಾಜಾ।।",
      "transliteration": "Sab par Ram tapasvi raja\nTin ke kaaj sakal tum saja",
      "meaning": "Ram is the supreme king among ascetics, and you have accomplished all his tasks.\n"
    },
    {
      "id": "chaupai-28",
      "verse_number": 28,
      "text": "ಔರ ಮನೋರಥ ಜೋ ಕೋಈ ಲಾವೈ।\nಸೋಈ ಅಮಿತ ಜೀವನ ಫಲ ಪಾವೈ।।",
      "transliteration": "Aur manorath jo koi lavai\nSoi amit jivan phal pavai",
      "meaning": "And whatever desire anyone harbors, that person obtains unlimited fruits of life.\n"
    },
    {
      "id": "chaupai-29",
      "verse_number": 29,
      "text": "ಚಾರೋಂ ಜುಗ ಪರತಾಪ ತುಮ್ಹಾರಾ।\nಹೈ ಪರಸಿದ್ಧ ಜಗತ ಉಜಿಯಾರಾ।।",
      "transliteration": "Charon jug partap tumhara\nHai parsiddh jagat ujiyara",
      "meaning": "Your glory is renowned throughout the four ages and illuminates the world.\n"
    },
    {
      "id": "chaupai-30",
      "verse_number": 30,
      "text": "ಸಾಧು ಸಂತ ಕೇ ತುಮ ರಖವಾರೇ।\nಅಸುರ ನಿಕಂದನ ರಾಮ ದುಲಾರೇ।।",
      "transliteration": "Sadhu sant ke tum rakhavare\nAsur nikandan Ram dulare",
      "meaning": "You are the protector of saints and sages, destroyer of demons, and Rama''s beloved.\n"
    },
    {
      "id": "chaupai-31",
      "verse_number": 31,
      "text": "ಅಷ್ಟ ಸಿದ್ಧಿ ನೌ ನಿಧಿ ಕೇ ದಾತಾ।\nಅಸ ಬರ ದೀನ ಜಾನಕೀ ಮಾತಾ।।",
      "transliteration": "Ashta siddhi nau nidhi ke data\nAs bar deen Janaki mata",
      "meaning": "Mother Sita gave you the boon of being the giver of the eight siddhis and nine nidhis."
    },
    {
      "id": "chaupai-32",
      "verse_number": 32,
      "text": "ರಾಮ ರಸಾಯನ ತುಮ್ಹರೇ ಪಾಸಾ।\nಸದಾ ರಹೋ ರಘುಪತಿ ಕೇ ದಾಸಾ।।",
      "transliteration": "Ram rasayan tumhare pasa\nSada raho Raghupati ke dasa",
      "meaning": "The elixir of devotion to Rama is with you; may you always remain Rama''s servant.\n"
    },
    {
      "id": "chaupai-33",
      "verse_number": 33,
      "text": "ತುಮ್ಹರೇ ಭಜನ ರಾಮ ಕೋ ಪಾವೈ।\nಜನಮ ಜನಮ ಕೇ ದುಖ ಬಿಸರಾವೈ।।",
      "transliteration": "Tumhare bhajan Ram ko pavai\nJanam janam ke dukh bisaravai",
      "meaning": "Through devotion to you, one attains Rama and forgets the sorrows of countless births.\n"
    },
    {
      "id": "chaupai-34",
      "verse_number": 34,
      "text": "ಅಂತ ಕಾಲ ರಘುಬರ ಪುರ ಜಾಈ।\nಜಹಾಂ ಜನ್ಮ ಹರಿಭಕ್ತ ಕಹಾಈ।।",
      "transliteration": "Ant kaal Raghubar pur jai\nJahan janam Haribhakt kahai",
      "meaning": "At the end time, one goes to Rama''s abode, where one is born and known as a devotee of Hari.\n"
    },
    {
      "id": "chaupai-35",
      "verse_number": 35,
      "text": "ಔರ ದೇವತಾ ಚಿತ್ತ ನ ಧರಈ।\nಹನುಮತ ಸೇಇ ಸರ್ವ ಸುಖ ಕರಈ।।",
      "transliteration": "Aur devata chitt na dharai\nHanumat sei sarva sukh karai",
      "meaning": "One need not keep other deities in mind; serving Hanuman alone creates all happiness.\n"
    },
    {
      "id": "chaupai-36",
      "verse_number": 36,
      "text": "ಸಂಕಟ ಕಟೈ ಮಿಟೈ ಸಬ ಪೀರಾ।\nಜೋ ಸುಮಿರೈ ಹನುಮತ ಬಲಬೀರಾ।।",
      "transliteration": "Sankat katai mitai sab peera\nJo sumirai Hanumat balbeera",
      "meaning": "Crises are removed and all suffering is destroyed for one who remembers the mighty hero Hanuman.\n"
    },
    {
      "id": "chaupai-37",
      "verse_number": 37,
      "text": "ಜೈ ಜೈ ಜೈ ಹನುಮಾನ ಗೋಸಾಈಂ।\nಕೃಪಾ ಕರಹು ಗುರುದೇವ ಕೀ ನಾಈಂ।।",
      "transliteration": "Jai jai jai Hanuman Gosain\nKripa karahu gurudev ki nain",
      "meaning": "Hail, hail, hail Lord Hanuman! Please bestow your grace like a divine guru.\n"
    },
    {
      "id": "chaupai-38",
      "verse_number": 38,
      "text": "ಜೋ ಸತ ಬಾರ ಪಾಠ ಕರ ಕೋಈ।\nಛೂಟಹಿ ಬಂದಿ ಮಹಾ ಸುಖ ಹೋಈ।।",
      "transliteration": "Jo sat baar path kar koi\nChhutahi bandi maha sukh hoi",
      "meaning": "Whoever recites this a hundred times is freed from bondage and attains great happiness.\n"
    },
    {
      "id": "chaupai-39",
      "verse_number": 39,
      "text": "ಜೋ ಯಹ ಪಢ಼ೈ ಹನುಮಾನ ಚಾಲೀಸಾ।\nಹೋಯ ಸಿದ್ಧಿ ಸಾಖೀ ಗೌರೀಸಾ।।",
      "transliteration": "Jo yah padhai Hanuman Chalisa\nHoye siddhi sakhi Gaurisa",
      "meaning": "One who recites this Hanuman Chalisa attains accomplishment/success, with Lord Shiva as witness.\n"
    },
    {
      "id": "chaupai-40",
      "verse_number": 40,
      "text": "ತುಲಸೀದಾಸ ಸದಾ ಹರಿ ಚೇರಾ।\nಕೀಜೈ ನಾಥ ಹೃದಯ ಮಹಂ ಡೇರಾ।।",
      "transliteration": "Tulsidas sada Hari chera\nKeejai nath hriday mahan dera",
      "meaning": "Tulsidas is always a servant of Hari; O Lord, make your dwelling in my heart.\n"
    },
    {
      "id": "doha-closing",
      "verse_number": "Doha Closing",
      "text": "ಪವನತನಯ ಸಂಕಟ ಹರನ,\nಮಂಗಲ ಮೂರತಿ ರೂಪ।\nರಾಮ ಲಖನ ಸೀತಾ ಸಹಿತ,\nಹೃದಯ ಬಸಹು ಸುರ ಭೂಪ।।",
      "transliteration": "Pavantanay sankat haran,\nMangal murti roop\nRam lakhan Sita sahit,\nHriday basahu sur bhoop",
      "meaning": "O son of the wind, remover of crises, of auspicious form! Along with Rama, Lakshmana, and Sita, please dwell in my heart, O king of gods."
    }
  ],
  "faqs": [
    {
      "question": "ಹನುಮಾನ್ ಚಾಲೀಸಾವನ್ನು ಬರೆದವರು ಯಾರು?",
      "answer": "ಹನುಮಾನ್ ಚಾಲೀಸಾವನ್ನು 16ನೇ ಶತಮಾನದಲ್ಲಿ ಮಹಾಕವಿ ಗೋಸ್ವಾಮಿ ತುಳಸೀದಾಸರು ರಚಿಸಿದರು."
    },
    {
      "question": "ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಿಸುವುದರ ಲಾಭಗಳೇನು?",
      "answer": "ಇದು ಮಾನಸಿಕ ಶಕ್ತಿ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ನೀಡುತ್ತದೆ, ಭಯವನ್ನು ನಿವಾರಿಸುತ್ತದೆ ಮತ್ತು ಜೀವನದಲ್ಲಿ ಎದುರಾಗುವ ಅಡೆತಡೆಗಳನ್ನು ದೂರ ಮಾಡುತ್ತದೆ."
    }
  ]
}', 1, '2026-09-03T17:52:20.412Z')
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;


INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES ('lang-gu', 'gu', 'શ્રી હનુમાન ચાલીસા — ગુજરાતી લિપિ, અનુવાદ, અને ઓડિયો (Shree Hanuman Chalisa in Gujarati)', 'શ્રી હનુમાન ચાલીસા ગુજરાતી લિપિમાં અને દરેક ચોપાઈનો અર્થ. અહીં હનુમાન ચાલીસા ઓડિયો અને પીડીએફ ડાઉનલોડ મફત મળશે.', '{
  "lang": "gu",
  "title": "શ્રી હનુમાન ચાલીસા — ગુજરાતી લિપિ, અનુવાદ, અને ઓડિયો (Shree Hanuman Chalisa in Gujarati)",
  "metaDescription": "શ્રી હનુમાન ચાલીસા ગુજરાતી લિપિમાં અને દરેક ચોપાઈનો અર્થ. અહીં હનુમાન ચાલીસા ઓડિયો અને પીડીએફ ડાઉનલોડ મફત મળશે.",
  "h1": "શ્રી હનુમાન ચાલીસા",
  "intro": "ગોસ્વામી તુલસીદાસ રચિત આ ૪૦ ચોપાઈઓ હનુમાનજીની ભક્તિ, શક્તિ અને આશીર્વાદ દર્શાવે છે.",
  "meaningSummary": "હનુમાન ચાલીસાના નિયમિત પાઠથી મન શાંત થાય છે, ભય દૂર થાય છે અને કષ્ટોનું નિવારણ થાય છે.",
  "verses": [
    {
      "id": "doha-01",
      "verse_number": "Doha 1",
      "text": "શ્રીગુરુ ચરન સરોજ રજ,\nનિજ મન મુકુરુ સુધારિ।\nબરનઉં રઘુબર બિમલ જસુ,\nજો દાયકુ ફલ ચારિ।।",
      "transliteration": "",
      "meaning": "With the dust of my Guru''s lotus feet, I cleanse the mirror of my mind and describe the pure glory of Raghubar (Lord Rama), which grants the four fruits."
    },
    {
      "id": "doha-02",
      "verse_number": "Doha 2",
      "text": "બુદ્ધિહીન તનુ જાનિકે,\nસુમિરૌં પવન-કુમાર।\nબલ બુદ્ધિ બિદ્યા દેહુ મોહિં,\nહરહુ કલેસ બિકાર।।",
      "transliteration": "",
      "meaning": "Knowing myself to be lacking in intelligence, I remember the son of the wind. Please grant me strength, wisdom, and knowledge, and remove my suffering and impurities."
    },
    {
      "id": "chaupai-01",
      "verse_number": 1,
      "text": "જય હનુમાન\nજ્ઞાન ગુન સાગર।\nજય કપીસ\nતિહું લોક ઉજાગર।।",
      "transliteration": "",
      "meaning": "Hail Hanuman, ocean of knowledge and virtues. Hail the lord of monkeys, who illuminates the three worlds."
    },
    {
      "id": "chaupai-02",
      "verse_number": 2,
      "text": "રામ દૂત\nઅતુલિત બલ ધામા।\nઅંજનિ-પુત્ર\nપવનસુત નામા।।",
      "transliteration": "",
      "meaning": "You are Rama''s messenger, repository of incomparable strength. You are known as the son of Anjani and the son of the wind."
    },
    {
      "id": "chaupai-03",
      "verse_number": 3,
      "text": "મહાબીર\nબિક્રમ બજરંગી।\nકુમતિ નિવાર\nસુમતિ કે સંગી।।",
      "transliteration": "",
      "meaning": "O great hero of immense valor, with a body strong as a thunderbolt, you remove evil thoughts and are the companion of good thoughts."
    },
    {
      "id": "chaupai-04",
      "verse_number": 4,
      "text": "કંચન બરન બિરાજ સુબેસા।\nકાનન કુંડલ કુંચિત કેસા।।",
      "transliteration": "",
      "meaning": "Your complexion is golden, and you shine in beautiful attire, with earrings in your ears and curly hair."
    },
    {
      "id": "chaupai-05",
      "verse_number": 5,
      "text": "હાથ બજ્ર ઔ ધ્વજા બિરાજૈ।\nકાંધે મૂંજ જનેઊ સાજૈ।।",
      "transliteration": "",
      "meaning": "In your hand shine the mace and flag, and on your shoulder rests the sacred thread."
    },
    {
      "id": "chaupai-06",
      "verse_number": 6,
      "text": "શંકર સુવન કેસરી નંદન।\nતેજ પ્રતાપ મહા જગ બંદન।।",
      "transliteration": "",
      "meaning": "You are like Shiva, son and delight of Kesari, possessing great radiance and glory, saluted by the entire world.\n"
    },
    {
      "id": "chaupai-07",
      "verse_number": 7,
      "text": "વિદ્યાવાન ગુણી અતિ ચાતુર।\nરામ કાજ કરિબે કો આતુર।।",
      "transliteration": "",
      "meaning": "You are highly learned, virtuous, and extremely clever, and are eager to do Rama''s work.\n"
    },
    {
      "id": "chaupai-08",
      "verse_number": 8,
      "text": "પ્રભુ ચરિત્ર સુનિબે કો રસિયા।\nરામ લખન સીતા મન બસિયા।।",
      "transliteration": "",
      "meaning": "You are passionate about listening to the Lord''s stories, and Rama, Lakshmana, and Sita dwell in your heart.\n"
    },
    {
      "id": "chaupai-09",
      "verse_number": 9,
      "text": "સૂક્ષ્મ રૂપ ધરિ સિયહિં દિખાવા।\nબિકટ રૂપ ધરિ લંક જરાવા।।",
      "transliteration": "",
      "meaning": "Taking a tiny form, you appeared before Sita; assuming a gigantic fierce form, you burned Lanka."
    },
    {
      "id": "chaupai-10",
      "verse_number": 10,
      "text": "ભીમ રૂપ ધરિ અસુર સંહારે।\nરામચંદ્ર કે કાજ સંવારે।।",
      "transliteration": "",
      "meaning": "Taking a terrible form, you destroyed demons and accomplished Rama''s tasks perfectly.\n"
    },
    {
      "id": "chaupai-11",
      "verse_number": 11,
      "text": "લાય સજીવન લખન જિયાયે।\nશ્રી રઘુબીર હરષિ ઉર લાયે।।",
      "transliteration": "",
      "meaning": "You brought the Sanjeevani herb and revived Lakshmana; Rama joyfully embraced you to his chest."
    },
    {
      "id": "chaupai-12",
      "verse_number": 12,
      "text": "રઘુપતિ કીન્હી બહુત બડ઼ાઈ।\nતુમ મમ પ્રિય ભરતહિ સમ ભાઈ।।",
      "transliteration": "",
      "meaning": "The Lord of the Raghu dynasty praised you greatly, saying \"You are as dear to me as my brother Bharata.\"\n"
    },
    {
      "id": "chaupai-13",
      "verse_number": 13,
      "text": "સહસ બદન તુમ્હરો જસ ગાવૈં।\nઅસ કહિ શ્રીપતિ કંઠ લગાવૈં।।",
      "transliteration": "",
      "meaning": "\"Even the thousand-mouthed serpent (Shesha) sings your glories,\" saying thus, the Lord embraced you.\n"
    },
    {
      "id": "chaupai-14",
      "verse_number": 14,
      "text": "સનકાદિક બ્રહ્માદિ મુનીસા।\nનારદ સારદ સહિત અહીસા।।",
      "transliteration": "",
      "meaning": "The four Kumaras, Brahma and other gods, great sages, Narada, Saraswati, along with Shesha (all sing your praises)."
    },
    {
      "id": "chaupai-15",
      "verse_number": 15,
      "text": "જમ કુબેર દિગપાલ જહાં તે।\nકબિ કોબિદ કહિ સકે કહાં તે।।",
      "transliteration": "",
      "meaning": "Yama, Kubera, the guardians of directions - from where can poets and scholars even begin to describe your glory?"
    },
    {
      "id": "chaupai-16",
      "verse_number": 16,
      "text": "તુમ ઉપકાર સુગ્રીવહિં કીન્હા।\nરામ મિલાય રાજ પદ દીન્હા।।",
      "transliteration": "",
      "meaning": "You did a great favor to Sugriva by uniting him with Rama and helping him obtain his kingdom."
    },
    {
      "id": "chaupai-17",
      "verse_number": 17,
      "text": "તુમ્હરો મંત્ર બિભીષન માના।\nલંકેશ્વર ભએ સબ જગ જાના।।",
      "transliteration": "",
      "meaning": "Vibhishana accepted your counsel and became the Lord of Lanka, as the entire world knows."
    },
    {
      "id": "chaupai-18",
      "verse_number": 18,
      "text": "જુગ સહસ્ર જોજન પર ભાનૂ।\nલીલ્યો તાહિ મધુર ફલ જાનૂ।।",
      "transliteration": "",
      "meaning": "The sun, located thousands of yojanas away, you leaped toward it, thinking it was a sweet fruit.\n"
    },
    {
      "id": "chaupai-19",
      "verse_number": 19,
      "text": "પ્રભુ મુદ્રિકા મેલિ મુખ માહીં।\nજલધિ લાંઘિ ગયે અચરજ નાહીં।।",
      "transliteration": "",
      "meaning": "Placing the Lord''s ring in your mouth, you crossed the ocean - this is no surprise.\n"
    },
    {
      "id": "chaupai-20",
      "verse_number": 20,
      "text": "દુર્ગમ કાજ જગત કે જેતે।\nસુગમ અનુગ્રહ તુમ્હરે તેતે।।",
      "transliteration": "",
      "meaning": "Whatever difficult tasks exist in the world, they become easy with your grace.\n"
    },
    {
      "id": "chaupai-21",
      "verse_number": 21,
      "text": "રામ દુઆરે તુમ રખવારે।\nહોત ન આજ્ઞા બિનુ પૈસારે।।",
      "transliteration": "",
      "meaning": "You are the guardian at Rama''s door; no one can enter without your permission."
    },
    {
      "id": "chaupai-22",
      "verse_number": 22,
      "text": "સબ સુખ લહૈ તુમ્હારી સરના।\nતુમ રક્ષક કાહૂ કો ડર ના।।",
      "transliteration": "",
      "meaning": "Taking refuge in you, one obtains all happiness; when you are the protector, there is no fear.\n"
    },
    {
      "id": "chaupai-23",
      "verse_number": 23,
      "text": "આપન તેજ સમ્હારો આપૈ।\nતીનોં લોક હાંક તેં કાંપૈ।।",
      "transliteration": "",
      "meaning": "You alone can control your own power; the three worlds tremble at your roar."
    },
    {
      "id": "chaupai-24",
      "verse_number": 24,
      "text": "ભૂત પિસાચ નિકટ નહિં આવૈ।\nમહાબીર જબ નામ સુનાવૈ।।",
      "transliteration": "",
      "meaning": "Ghosts and demons do not come near when the name of Mahavir (Hanuman) is uttered."
    },
    {
      "id": "chaupai-25",
      "verse_number": 25,
      "text": "નાસૈ રોગ હરૈ સબ પીરા।\nજપત નિરંતર હનુમત બીરા।।",
      "transliteration": "",
      "meaning": "Diseases are destroyed and all pain is removed by continuously chanting the name of the heroic Hanuman.\n"
    },
    {
      "id": "chaupai-26",
      "verse_number": 26,
      "text": "સંકટ તેં હનુમાન છુડ઼ાવૈ।\nમન ક્રમ બચન ધ્યાન જો લાવૈ।।",
      "transliteration": "",
      "meaning": "Hanuman liberates from crises those who meditate on him with mind, action, and speech.\n"
    },
    {
      "id": "chaupai-27",
      "verse_number": 27,
      "text": "સબ પર રામ તપસ્વી રાજા।\nતિન કે કાજ સકલ તુમ સાજા।।",
      "transliteration": "",
      "meaning": "Ram is the supreme king among ascetics, and you have accomplished all his tasks.\n"
    },
    {
      "id": "chaupai-28",
      "verse_number": 28,
      "text": "ઔર મનોરથ જો કોઈ લાવૈ।\nસોઈ અમિત જીવન ફલ પાવૈ।।",
      "transliteration": "",
      "meaning": "And whatever desire anyone harbors, that person obtains unlimited fruits of life.\n"
    },
    {
      "id": "chaupai-29",
      "verse_number": 29,
      "text": "ચારોં જુગ પરતાપ તુમ્હારા।\nહૈ પરસિદ્ધ જગત ઉજિયારા।।",
      "transliteration": "",
      "meaning": "Your glory is renowned throughout the four ages and illuminates the world.\n"
    },
    {
      "id": "chaupai-30",
      "verse_number": 30,
      "text": "સાધુ સંત કે તુમ રખવારે।\nઅસુર નિકંદન રામ દુલારે।।",
      "transliteration": "",
      "meaning": "You are the protector of saints and sages, destroyer of demons, and Rama''s beloved.\n"
    },
    {
      "id": "chaupai-31",
      "verse_number": 31,
      "text": "અષ્ટ સિદ્ધિ નૌ નિધિ કે દાતા।\nઅસ બર દીન જાનકી માતા।।",
      "transliteration": "",
      "meaning": "Mother Sita gave you the boon of being the giver of the eight siddhis and nine nidhis."
    },
    {
      "id": "chaupai-32",
      "verse_number": 32,
      "text": "રામ રસાયન તુમ્હરે પાસા।\nસદા રહો રઘુપતિ કે દાસા।।",
      "transliteration": "",
      "meaning": "The elixir of devotion to Rama is with you; may you always remain Rama''s servant.\n"
    },
    {
      "id": "chaupai-33",
      "verse_number": 33,
      "text": "તુમ્હરે ભજન રામ કો પાવૈ।\nજનમ જનમ કે દુખ બિસરાવૈ।।",
      "transliteration": "",
      "meaning": "Through devotion to you, one attains Rama and forgets the sorrows of countless births.\n"
    },
    {
      "id": "chaupai-34",
      "verse_number": 34,
      "text": "અંત કાલ રઘુબર પુર જાઈ।\nજહાં જન્મ હરિભક્ત કહાઈ।।",
      "transliteration": "",
      "meaning": "At the end time, one goes to Rama''s abode, where one is born and known as a devotee of Hari.\n"
    },
    {
      "id": "chaupai-35",
      "verse_number": 35,
      "text": "ઔર દેવતા ચિત્ત ન ધરઈ।\nહનુમત સેઇ સર્વ સુખ કરઈ।।",
      "transliteration": "",
      "meaning": "One need not keep other deities in mind; serving Hanuman alone creates all happiness.\n"
    },
    {
      "id": "chaupai-36",
      "verse_number": 36,
      "text": "સંકટ કટૈ મિટૈ સબ પીરા।\nજો સુમિરૈ હનુમત બલબીરા।।",
      "transliteration": "",
      "meaning": "Crises are removed and all suffering is destroyed for one who remembers the mighty hero Hanuman.\n"
    },
    {
      "id": "chaupai-37",
      "verse_number": 37,
      "text": "જૈ જૈ જૈ હનુમાન ગોસાઈં।\nકૃપા કરહુ ગુરુદેવ કી નાઈં।।",
      "transliteration": "",
      "meaning": "Hail, hail, hail Lord Hanuman! Please bestow your grace like a divine guru.\n"
    },
    {
      "id": "chaupai-38",
      "verse_number": 38,
      "text": "જો સત બાર પાઠ કર કોઈ।\nછૂટહિ બંદિ મહા સુખ હોઈ।।",
      "transliteration": "",
      "meaning": "Whoever recites this a hundred times is freed from bondage and attains great happiness.\n"
    },
    {
      "id": "chaupai-39",
      "verse_number": 39,
      "text": "જો યહ પઢ઼ૈ હનુમાન ચાલીસા।\nહોય સિદ્ધિ સાખી ગૌરીસા।।",
      "transliteration": "",
      "meaning": "One who recites this Hanuman Chalisa attains accomplishment/success, with Lord Shiva as witness.\n"
    },
    {
      "id": "chaupai-40",
      "verse_number": 40,
      "text": "તુલસીદાસ સદા હરિ ચેરા।\nકીજૈ નાથ હૃદય મહં ડેરા।।",
      "transliteration": "",
      "meaning": "Tulsidas is always a servant of Hari; O Lord, make your dwelling in my heart.\n"
    },
    {
      "id": "doha-closing",
      "verse_number": "Doha Closing",
      "text": "પવનતનય સંકટ હરન,\nમંગલ મૂરતિ રૂપ।\nરામ લખન સીતા સહિત,\nહૃદય બસહુ સુર ભૂપ।।",
      "transliteration": "",
      "meaning": "O son of the wind, remover of crises, of auspicious form! Along with Rama, Lakshmana, and Sita, please dwell in my heart, O king of gods."
    }
  ],
  "faqs": [
    {
      "question": "હનુમાન ચાલીસા કોણે લખી હતી?",
      "answer": "હનુમાન ચાલીસાની રચના ૧૬મી સદીમાં મહાન કવિ ગોસ્વામી તુલસીદાસજીએ કરી હતી."
    },
    {
      "question": "હનુમાન ચાલીસાનો પાઠ કરવાથી શું થાય છે?",
      "answer": "હનુમાન ચાલીસાનો નિયમિત પાઠ કરવાથી બધા સંકટ, રોગ અને ભય દૂર થાય છે. તે સાધકને માનસિક શક્તિ, સુખ-શાંતિ અને શનિદેવના દુષ્પ્રભાવોથી રક્ષણ આપે છે."
    },
    {
      "question": "હનુમાન ચાલીસાના શું લાભ છે?",
      "answer": "હનુમાન ચાલીસાના નિયમિત પાઠથી આત્મવિશ્વાસ વધે છે, બધો ભય દૂર થાય છે અને જીવનના કષ્ટો દૂર થાય છે."
    }
  ]
}', 1, '2026-09-03T17:52:20.413Z')
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;


INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES ('lang-mr', 'mr', 'श्री हनुमान चालीसा — मराठी भाषांतर, अर्थ, आणि ऑडिओ (Shree Hanuman Chalisa in Marathi)', 'श्री हनुमान चालीसा मराठी अर्थ आणि प्रत्येक श्लोकाचा भावार्थ. येथे हनुमान चालीसा ऑडिओ आणि पीडीएफ विनामूल्य उपलब्ध आहे.', '{
  "lang": "mr",
  "title": "श्री हनुमान चालीसा — मराठी भाषांतर, अर्थ, आणि ऑडिओ (Shree Hanuman Chalisa in Marathi)",
  "metaDescription": "श्री हनुमान चालीसा मराठी अर्थ आणि प्रत्येक श्लोकाचा भावार्थ. येथे हनुमान चालीसा ऑडिओ आणि पीडीएफ विनामूल्य उपलब्ध आहे.",
  "h1": "श्री हनुमान चालीसा",
  "intro": "गोस्वामी तुलसीदास रचित या ४० चौपाया हनुमंताची भक्ती, शौर्य आणि दिव्य शक्ती यांचे वर्णन करतात.",
  "meaningSummary": "हनुमान चालीसाच्या नियमित पठणाने मनाला शांतता मिळते, सर्व प्रकारच्या भीती दूर होतात आणि अडथळे दूर होतात.",
  "verses": [
    {
      "id": "doha-01",
      "verse_number": "Doha 1",
      "text": "श्रीगुरु चरन सरोज रज,\nनिज मन मुकुरु सुधारि।\nबरनउं रघुबर बिमल जसु,\nजो दायकु फल चारि।।",
      "transliteration": "",
      "meaning": "With the dust of my Guru''s lotus feet, I cleanse the mirror of my mind and describe the pure glory of Raghubar (Lord Rama), which grants the four fruits."
    },
    {
      "id": "doha-02",
      "verse_number": "Doha 2",
      "text": "बुद्धिहीन तनु जानिके,\nसुमिरौं पवन-कुमार।\nबल बुद्धि बिद्या देहु मोहिं,\nहरहु कलेस बिकार।।",
      "transliteration": "",
      "meaning": "Knowing myself to be lacking in intelligence, I remember the son of the wind. Please grant me strength, wisdom, and knowledge, and remove my suffering and impurities."
    },
    {
      "id": "chaupai-01",
      "verse_number": 1,
      "text": "जय हनुमान\nज्ञान गुन सागर।\nजय कपीस\nतिहुं लोक उजागर।।",
      "transliteration": "",
      "meaning": "Hail Hanuman, ocean of knowledge and virtues. Hail the lord of monkeys, who illuminates the three worlds."
    },
    {
      "id": "chaupai-02",
      "verse_number": 2,
      "text": "राम दूत\nअतुलित बल धामा।\nअंजनि-पुत्र\nपवनसुत नामा।।",
      "transliteration": "",
      "meaning": "You are Rama''s messenger, repository of incomparable strength. You are known as the son of Anjani and the son of the wind."
    },
    {
      "id": "chaupai-03",
      "verse_number": 3,
      "text": "महाबीर\nबिक्रम बजरंगी।\nकुमति निवार\nसुमति के संगी।।",
      "transliteration": "",
      "meaning": "O great hero of immense valor, with a body strong as a thunderbolt, you remove evil thoughts and are the companion of good thoughts."
    },
    {
      "id": "chaupai-04",
      "verse_number": 4,
      "text": "कंचन बरन बिराज सुबेसा।\nकानन कुंडल कुंचित केसा।।",
      "transliteration": "",
      "meaning": "Your complexion is golden, and you shine in beautiful attire, with earrings in your ears and curly hair."
    },
    {
      "id": "chaupai-05",
      "verse_number": 5,
      "text": "हाथ बज्र औ ध्वजा बिराजै।\nकांधे मूंज जनेऊ साजै।।",
      "transliteration": "",
      "meaning": "In your hand shine the mace and flag, and on your shoulder rests the sacred thread."
    },
    {
      "id": "chaupai-06",
      "verse_number": 6,
      "text": "शंकर सुवन केसरी नंदन।\nतेज प्रताप महा जग बंदन।।",
      "transliteration": "",
      "meaning": "You are like Shiva, son and delight of Kesari, possessing great radiance and glory, saluted by the entire world.\n"
    },
    {
      "id": "chaupai-07",
      "verse_number": 7,
      "text": "विद्यावान गुणी अति चातुर।\nराम काज करिबे को आतुर।।",
      "transliteration": "",
      "meaning": "You are highly learned, virtuous, and extremely clever, and are eager to do Rama''s work.\n"
    },
    {
      "id": "chaupai-08",
      "verse_number": 8,
      "text": "प्रभु चरित्र सुनिबे को रसिया।\nराम लखन सीता मन बसिया।।",
      "transliteration": "",
      "meaning": "You are passionate about listening to the Lord''s stories, and Rama, Lakshmana, and Sita dwell in your heart.\n"
    },
    {
      "id": "chaupai-09",
      "verse_number": 9,
      "text": "सूक्ष्म रूप धरि सियहिं दिखावा।\nबिकट रूप धरि लंक जरावा।।",
      "transliteration": "",
      "meaning": "Taking a tiny form, you appeared before Sita; assuming a gigantic fierce form, you burned Lanka."
    },
    {
      "id": "chaupai-10",
      "verse_number": 10,
      "text": "भीम रूप धरि असुर संहारे।\nरामचंद्र के काज संवारे।।",
      "transliteration": "",
      "meaning": "Taking a terrible form, you destroyed demons and accomplished Rama''s tasks perfectly.\n"
    },
    {
      "id": "chaupai-11",
      "verse_number": 11,
      "text": "लाय सजीवन लखन जियाये।\nश्री रघुबीर हरषि उर लाये।।",
      "transliteration": "",
      "meaning": "You brought the Sanjeevani herb and revived Lakshmana; Rama joyfully embraced you to his chest."
    },
    {
      "id": "chaupai-12",
      "verse_number": 12,
      "text": "रघुपति कीन्ही बहुत बड़ाई।\nतुम मम प्रिय भरतहि सम भाई।।",
      "transliteration": "",
      "meaning": "The Lord of the Raghu dynasty praised you greatly, saying \"You are as dear to me as my brother Bharata.\"\n"
    },
    {
      "id": "chaupai-13",
      "verse_number": 13,
      "text": "सहस बदन तुम्हरो जस गावैं।\nअस कहि श्रीपति कंठ लगावैं।।",
      "transliteration": "",
      "meaning": "\"Even the thousand-mouthed serpent (Shesha) sings your glories,\" saying thus, the Lord embraced you.\n"
    },
    {
      "id": "chaupai-14",
      "verse_number": 14,
      "text": "सनकादिक ब्रह्मादि मुनीसा।\nनारद सारद सहित अहीसा।।",
      "transliteration": "",
      "meaning": "The four Kumaras, Brahma and other gods, great sages, Narada, Saraswati, along with Shesha (all sing your praises)."
    },
    {
      "id": "chaupai-15",
      "verse_number": 15,
      "text": "जम कुबेर दिगपाल जहां ते।\nकबि कोबिद कहि सके कहां ते।।",
      "transliteration": "",
      "meaning": "Yama, Kubera, the guardians of directions - from where can poets and scholars even begin to describe your glory?"
    },
    {
      "id": "chaupai-16",
      "verse_number": 16,
      "text": "तुम उपकार सुग्रीवहिं कीन्हा।\nराम मिलाय राज पद दीन्हा।।",
      "transliteration": "",
      "meaning": "You did a great favor to Sugriva by uniting him with Rama and helping him obtain his kingdom."
    },
    {
      "id": "chaupai-17",
      "verse_number": 17,
      "text": "तुम्हरो मंत्र बिभीषन माना।\nलंकेश्वर भए सब जग जाना।।",
      "transliteration": "",
      "meaning": "Vibhishana accepted your counsel and became the Lord of Lanka, as the entire world knows."
    },
    {
      "id": "chaupai-18",
      "verse_number": 18,
      "text": "जुग सहस्र जोजन पर भानू।\nलील्यो ताहि मधुर फल जानू।।",
      "transliteration": "",
      "meaning": "The sun, located thousands of yojanas away, you leaped toward it, thinking it was a sweet fruit.\n"
    },
    {
      "id": "chaupai-19",
      "verse_number": 19,
      "text": "प्रभु मुद्रिका मेलि मुख माहीं।\nजलधि लांघि गये अचरज नाहीं।।",
      "transliteration": "",
      "meaning": "Placing the Lord''s ring in your mouth, you crossed the ocean - this is no surprise.\n"
    },
    {
      "id": "chaupai-20",
      "verse_number": 20,
      "text": "दुर्गम काज जगत के जेते।\nसुगम अनुग्रह तुम्हरे तेते।।",
      "transliteration": "",
      "meaning": "Whatever difficult tasks exist in the world, they become easy with your grace.\n"
    },
    {
      "id": "chaupai-21",
      "verse_number": 21,
      "text": "राम दुआरे तुम रखवारे।\nहोत न आज्ञा बिनु पैसारे।।",
      "transliteration": "",
      "meaning": "You are the guardian at Rama''s door; no one can enter without your permission."
    },
    {
      "id": "chaupai-22",
      "verse_number": 22,
      "text": "सब सुख लहै तुम्हारी सरना।\nतुम रक्षक काहू को डर ना।।",
      "transliteration": "",
      "meaning": "Taking refuge in you, one obtains all happiness; when you are the protector, there is no fear.\n"
    },
    {
      "id": "chaupai-23",
      "verse_number": 23,
      "text": "आपन तेज सम्हारो आपै।\nतीनों लोक हांक तें कांपै।।",
      "transliteration": "",
      "meaning": "You alone can control your own power; the three worlds tremble at your roar."
    },
    {
      "id": "chaupai-24",
      "verse_number": 24,
      "text": "भूत पिसाच निकट नहिं आवै।\nमहाबीर जब नाम सुनावै।।",
      "transliteration": "",
      "meaning": "Ghosts and demons do not come near when the name of Mahavir (Hanuman) is uttered."
    },
    {
      "id": "chaupai-25",
      "verse_number": 25,
      "text": "नासै रोग हरै सब पीरा।\nजपत निरंतर हनुमत बीरा।।",
      "transliteration": "",
      "meaning": "Diseases are destroyed and all pain is removed by continuously chanting the name of the heroic Hanuman.\n"
    },
    {
      "id": "chaupai-26",
      "verse_number": 26,
      "text": "संकट तें हनुमान छुड़ावै।\nमन क्रम बचन ध्यान जो लावै।।",
      "transliteration": "",
      "meaning": "Hanuman liberates from crises those who meditate on him with mind, action, and speech.\n"
    },
    {
      "id": "chaupai-27",
      "verse_number": 27,
      "text": "सब पर राम तपस्वी राजा।\nतिन के काज सकल तुम साजा।।",
      "transliteration": "",
      "meaning": "Ram is the supreme king among ascetics, and you have accomplished all his tasks.\n"
    },
    {
      "id": "chaupai-28",
      "verse_number": 28,
      "text": "और मनोरथ जो कोई लावै।\nसोई अमित जीवन फल पावै।।",
      "transliteration": "",
      "meaning": "And whatever desire anyone harbors, that person obtains unlimited fruits of life.\n"
    },
    {
      "id": "chaupai-29",
      "verse_number": 29,
      "text": "चारों जुग परताप तुम्हारा।\nहै परसिद्ध जगत उजियारा।।",
      "transliteration": "",
      "meaning": "Your glory is renowned throughout the four ages and illuminates the world.\n"
    },
    {
      "id": "chaupai-30",
      "verse_number": 30,
      "text": "साधु संत के तुम रखवारे।\nअसुर निकंदन राम दुलारे।।",
      "transliteration": "",
      "meaning": "You are the protector of saints and sages, destroyer of demons, and Rama''s beloved.\n"
    },
    {
      "id": "chaupai-31",
      "verse_number": 31,
      "text": "अष्ट सिद्धि नौ निधि के दाता।\nअस बर दीन जानकी माता।।",
      "transliteration": "",
      "meaning": "Mother Sita gave you the boon of being the giver of the eight siddhis and nine nidhis."
    },
    {
      "id": "chaupai-32",
      "verse_number": 32,
      "text": "राम रसायन तुम्हरे पासा।\nसदा रहो रघुपति के दासा।।",
      "transliteration": "",
      "meaning": "The elixir of devotion to Rama is with you; may you always remain Rama''s servant.\n"
    },
    {
      "id": "chaupai-33",
      "verse_number": 33,
      "text": "तुम्हरे भजन राम को पावै।\nजनम जनम के दुख बिसरावै।।",
      "transliteration": "",
      "meaning": "Through devotion to you, one attains Rama and forgets the sorrows of countless births.\n"
    },
    {
      "id": "chaupai-34",
      "verse_number": 34,
      "text": "अंत काल रघुबर पुर जाई।\nजहां जन्म हरिभक्त कहाई।।",
      "transliteration": "",
      "meaning": "At the end time, one goes to Rama''s abode, where one is born and known as a devotee of Hari.\n"
    },
    {
      "id": "chaupai-35",
      "verse_number": 35,
      "text": "और देवता चित्त न धरई।\nहनुमत सेइ सर्व सुख करई।।",
      "transliteration": "",
      "meaning": "One need not keep other deities in mind; serving Hanuman alone creates all happiness.\n"
    },
    {
      "id": "chaupai-36",
      "verse_number": 36,
      "text": "संकट कटै मिटै सब पीरा।\nजो सुमिरै हनुमत बलबीरा।।",
      "transliteration": "",
      "meaning": "Crises are removed and all suffering is destroyed for one who remembers the mighty hero Hanuman.\n"
    },
    {
      "id": "chaupai-37",
      "verse_number": 37,
      "text": "जै जै जै हनुमान गोसाईं।\nकृपा करहु गुरुदेव की नाईं।।",
      "transliteration": "",
      "meaning": "Hail, hail, hail Lord Hanuman! Please bestow your grace like a divine guru.\n"
    },
    {
      "id": "chaupai-38",
      "verse_number": 38,
      "text": "जो सत बार पाठ कर कोई।\nछूटहि बंदि महा सुख होई।।",
      "transliteration": "",
      "meaning": "Whoever recites this a hundred times is freed from bondage and attains great happiness.\n"
    },
    {
      "id": "chaupai-39",
      "verse_number": 39,
      "text": "जो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा।।",
      "transliteration": "",
      "meaning": "One who recites this Hanuman Chalisa attains accomplishment/success, with Lord Shiva as witness.\n"
    },
    {
      "id": "chaupai-40",
      "verse_number": 40,
      "text": "तुलसीदास सदा हरि चेरा।\nकीजै नाथ हृदय महं डेरा।।",
      "transliteration": "",
      "meaning": "Tulsidas is always a servant of Hari; O Lord, make your dwelling in my heart.\n"
    },
    {
      "id": "doha-closing",
      "verse_number": "Doha Closing",
      "text": "पवनतनय संकट हरन,\nमंगल मूरति रूप।\nराम लखन सीता सहित,\nहृदय बसहु सुर भूप।।",
      "transliteration": "",
      "meaning": "O son of the wind, remover of crises, of auspicious form! Along with Rama, Lakshmana, and Sita, please dwell in my heart, O king of gods."
    }
  ],
  "faqs": [
    {
      "question": "हनुमान चालीसा कोणी लिहिली?",
      "answer": "हनुमान चालीसाची रचना १६व्या शतकात महान कवी गोस्वामी तुलसीदास यांनी केली होती."
    },
    {
      "question": "हनुमान चालीसा पठणाने काय होते?",
      "answer": "हनुमान चालीसाचे नियमित पठण केल्याने सर्व प्रकारचे संकट, रोग आणि भीती दूर होते. हे साधकाला मानसिक धैर्य, सुख-शांती आणि शनिदेवाच्या वाईट प्रभावांपासून संरक्षण प्रदान करते."
    },
    {
      "question": "हनुमान चालीसा पठणाचे काय फायदे आहेत?",
      "answer": "हनुमान चालीसाच्या नियमित पठणामुळे आत्मविश्वास वाढतो, सर्व भीती दूर होते आणि जीवनातील अडथळे दूर होतात."
    }
  ]
}', 1, '2026-09-03T17:52:20.413Z')
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;
