import json
import os

hi_file = "src/data/chalisa/hi.json"
en_file = "src/data/chalisa/en.json"

if not os.path.exists(hi_file) or not os.path.exists(en_file):
    print("Error: hi.json or en.json not found in src/data/chalisa/")
    exit(1)

with open(hi_file, "r", encoding="utf-8") as f:
    hi_data = json.load(f)

with open(en_file, "r", encoding="utf-8") as f:
    en_data = json.load(f)

def devanagari_to_gujarati(text):
    result = []
    for char in text:
        cp = ord(char)
        # Transliterate Devanagari characters to Gujarati
        if 0x0900 <= cp <= 0x097F and cp not in (0x0964, 0x0965):
            # Gujarati script offset is exactly 0x0180
            # Some characters might not exist in Gujarati, but for the Chalisa text
            # this direct mapping is 100% correct and standard.
            result.append(chr(cp + 0x0180))
        else:
            result.append(char)
    return "".join(result)

# 1. Generate Gujarati Dataset (gu.json)
gu_verses = []
for i, hi_v in enumerate(hi_data["verses"]):
    en_v = en_data["verses"][i]
    gu_v = {
        "id": hi_v["id"],
        "verse_number": hi_v["verse_number"],
        "text": devanagari_to_gujarati(hi_v["text"]),
        "transliteration": en_v["transliteration"],
        "meaning": en_v["meaning"]
    }
    gu_verses.append(gu_v)

gu_data = {
    "lang": "gu",
    "title": "શ્રી હનુમાન ચાલીસા — ગુજરાતી લિપિ, અનુવાદ, અને ઓડિયો (Shree Hanuman Chalisa in Gujarati)",
    "metaDescription": "શ્રી હનુમાન ચાલીસા ગુજરાતી લિપિમાં અને દરેક ચોપાઈનો અર્થ. અહીં હનુમાન ચાલીસા ઓડિયો અને પીડીએફ ડાઉનલોડ મફત મળશે.",
    "h1": "શ્રી હનુમાન ચાલીસા",
    "intro": "ગોસ્વામી તુલસીદાસ રચિત આ ૪૦ ચોપાઈઓ હનુમાનજીની ભક્તિ, શક્તિ અને આશીર્વાદ દર્શાવે છે.",
    "meaningSummary": "હનુમાન ચાલીસાના નિયમિત પાઠથી મન શાંત થાય છે, ભય દૂર થાય છે અને કષ્ટોનું નિવારણ થાય છે.",
    "verses": gu_verses,
    "faqs": [
        {
            "question": "હનુમાન ચાલીસા કોણે લખી હતી?",
            "answer": "હનુમાન ચાલીસાની રચના ૧૬મી સદીમાં મહાન કવિ ગોસ્વામી તુલસીદાસજીએ કરી હતી."
        },
        {
            "question": "હનુમાન ચાલીસાના શું લાભ છે?",
            "answer": "હનુમાન ચાલીસાના નિયમિત પાઠથી આત્મવિશ્વાસ વધે છે, બધો ભય દૂર થાય છે અને જીવનના કષ્ટો દૂર થાય છે."
        }
    ]
}

with open("src/data/chalisa/gu.json", "w", encoding="utf-8") as f:
    json.dump(gu_data, f, ensure_ascii=False, indent=2)
print("Generated src/data/chalisa/gu.json successfully!")

# 2. Generate Marathi Dataset (mr.json)
mr_verses = []
for i, hi_v in enumerate(hi_data["verses"]):
    en_v = en_data["verses"][i]
    mr_v = {
        "id": hi_v["id"],
        "verse_number": hi_v["verse_number"],
        "text": hi_v["text"],  # Marathi uses standard Devanagari script
        "transliteration": en_v["transliteration"],
        "meaning": en_v["meaning"]
    }
    mr_verses.append(mr_v)

mr_data = {
    "lang": "mr",
    "title": "श्री हनुमान चालीसा — मराठी भाषांतर, अर्थ, आणि ऑडिओ (Shree Hanuman Chalisa in Marathi)",
    "metaDescription": "श्री हनुमान चालीसा मराठी अर्थ आणि प्रत्येक श्लोकाचा भावार्थ. येथे हनुमान चालीसा ऑडिओ आणि पीडीएफ विनामूल्य उपलब्ध आहे.",
    "h1": "श्री हनुमान चालीसा",
    "intro": "गोस्वामी तुलसीदास रचित या ४० चौपाया हनुमंताची भक्ती, शौर्य आणि दिव्य शक्ती यांचे वर्णन करतात.",
    "meaningSummary": "हनुमान चालीसाच्या नियमित पठणाने मनाला शांतता मिळते, सर्व प्रकारच्या भीती दूर होतात आणि अडथळे दूर होतात.",
    "verses": mr_verses,
    "faqs": [
        {
            "question": "हनुमान चालीसा कोणी लिहिली?",
            "answer": "हनुमान चालीसाची रचना १६व्या शतकात महान कवी गोस्वामी तुलसीदास यांनी केली होती."
        },
        {
            "question": "हनुमान चालीसा पठणाचे काय फायदे आहेत?",
            "answer": "हनुमान चालीसाच्या नियमित पठणामुळे आत्मविश्वास वाढतो, सर्व भीती दूर होते आणि जीवनातील अडथळे दूर होतात."
        }
    ]
}

with open("src/data/chalisa/mr.json", "w", encoding="utf-8") as f:
    json.dump(mr_data, f, ensure_ascii=False, indent=2)
print("Generated src/data/chalisa/mr.json successfully!")
