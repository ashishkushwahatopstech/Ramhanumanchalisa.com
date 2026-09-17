import type { APIRoute } from "astro";
import { FALLBACK_BLOG_POSTS } from "../../data/blog";
import { BENEFITS_DATA } from "../../data/benefits";

export interface SearchItem {
  title: string;
  url: string;
  category: "Scripture" | "Aarti" | "Language" | "Guide" | "Audio/PDF" | "Benefit";
  description: string;
  keywords?: string;
}

const STATIC_SEARCH_ITEMS: SearchItem[] = [
  {
    title: "Shree Hanuman Chalisa (श्री हनुमान चालीसा)",
    url: "/",
    category: "Scripture",
    description: "Complete 40 Chaupais, opening and closing dohas with authentic audio and Hindi meaning.",
    keywords: "hanuman chalisa lyrics 40 chaupai doha hindi tulsidas"
  },
  {
    title: "Shree Ram Chalisa (श्री राम चालीसा)",
    url: "/ram-chalisa",
    category: "Scripture",
    description: "Full 40 chaupais of Bhagwan Shri Ram Chandra with verse translations and print format.",
    keywords: "ram chalisa lyrics hindi ramchandra tulsidas"
  },
  {
    title: "Shree Bajrang Baan (श्री बजरंग बाण)",
    url: "/bajrang-baan",
    category: "Scripture",
    description: "Powerful Rudra protection hymn with original Devanagari, English transliteration, and path vidhi.",
    keywords: "bajrang baan lyrics path vidhi rudra protection tulsidas"
  },
  {
    title: "Sankat Mochan Hanumanashtak (संकट मोचन हनुमानाष्टक)",
    url: "/sankat-mochan-hanumanashtak",
    category: "Scripture",
    description: "8-verse sacred Ashtak reciting the heroic deeds of Lord Hanuman with synced audio.",
    keywords: "sankat mochan hanuman ashtak lyrics audio 8 verses"
  },
  {
    title: "Shree Hanuman Aarti (आरती कीजै हनुमान लला की)",
    url: "/hanuman-aarti",
    category: "Aarti",
    description: "Traditional Hanuman Aarti with synced audio player, complete meaning, and puja vidhi.",
    keywords: "hanuman aarti aarti kije hanuman lala ki lyrics audio"
  },
  {
    title: "Shree Hanuman Stuti (श्री हनुमान स्तुति)",
    url: "/hanuman-stuti",
    category: "Scripture",
    description: "Sacred Stuti praising the divine form, humility, and valor of Lord Hanuman.",
    keywords: "hanuman stuti lyrics sanskrit meaning"
  },
  {
    title: "Hanuman Chalisa Meaning & Verse Translation",
    url: "/hanuman-chalisa-meaning",
    category: "Guide",
    description: "Detailed word-by-word and line-by-line Hindi and English explanation of all 40 chaupais.",
    keywords: "hanuman chalisa meaning translation word by word explanation"
  },
  {
    title: "Hanuman Chalisa Audio MP3 with Synced Lyrics",
    url: "/hanuman-chalisa-audio-mp3",
    category: "Audio/PDF",
    description: "Traditional mandir recitation audio with real-time synchronized karaoke-style verses.",
    keywords: "hanuman chalisa audio mp3 song player listen synced lyrics"
  },
  {
    title: "Hanuman Chalisa PDF Download — Free Printable Sheet",
    url: "/hanuman-chalisa-pdf",
    category: "Audio/PDF",
    description: "Clean, high-resolution vector PDF booklet in Hindi, English, and Telugu for offline chanting.",
    keywords: "hanuman chalisa pdf download free printable booklet sheet print"
  },
  {
    title: "Hanuman Chalisa Path Vidhi & Recitation Rules",
    url: "/shri-hanuman-chalisa-path-vidhi",
    category: "Guide",
    description: "Authentic rules, ideal directions, Brahma Muhurat timings, and 108 recitation anushthan protocols.",
    keywords: "path vidhi rules how to chant anushthan brahma muhurat"
  },
  {
    title: "Ram-Hanuman Connection & Spiritual Unity",
    url: "/ram-hanuman-chalisa",
    category: "Guide",
    description: "The theological and devotional bond between Lord Rama and his greatest devotee Hanuman.",
    keywords: "ram hanuman connection bhakti story significance"
  },
  {
    title: "Hanuman Jayanti Date, Muhurat & Puja Vidhi",
    url: "/hanuman-jayanti",
    category: "Guide",
    description: "Festival dates, auspicious puja muhurat timings, rituals, and offerings for Hanuman Janmotsav.",
    keywords: "hanuman jayanti date muhurat puja vidhi rituals"
  },
  {
    title: "Hanuman Chalisa Telugu (శ్రీ హనుమాన్ చాలీసా)",
    url: "/hanuman-chalisa/te",
    category: "Language",
    description: "Telugu script, audio player, verse-by-verse Telugu meaning, and printable PDF.",
    keywords: "hanuman chalisa telugu lyrics pdf meaning audio"
  },
  {
    title: "Hanuman Chalisa Kannada (ಶ್ರೀ ಹನುಮಾನ್ ಚಾಲೀಸಾ)",
    url: "/hanuman-chalisa/kn",
    category: "Language",
    description: "Kannada script with word meaning, audio player, and free Kannada PDF booklet.",
    keywords: "hanuman chalisa kannada lyrics pdf meaning audio"
  },
  {
    title: "Hanuman Chalisa Gujarati (શ્રી હનુમાન ચાલીસા)",
    url: "/hanuman-chalisa/gu",
    category: "Language",
    description: "Gujarati script, audio recitation, Gujarati translation, and printable PDF.",
    keywords: "hanuman chalisa gujarati lyrics pdf meaning audio"
  },
  {
    title: "Hanuman Chalisa Bengali (শ্রী হনুমান চালীসা)",
    url: "/hanuman-chalisa/bn",
    category: "Language",
    description: "Bengali script with audio player, verse meaning, and printable Bengali PDF.",
    keywords: "hanuman chalisa bengali lyrics pdf meaning audio"
  },
  {
    title: "Hanuman Chalisa Marathi (श्री हनुमान चालीसा)",
    url: "/hanuman-chalisa/mr",
    category: "Language",
    description: "Marathi script with audio recitation, Marathi explanation, and printable PDF.",
    keywords: "hanuman chalisa marathi lyrics pdf meaning audio"
  },
  {
    title: "Hanuman Chalisa in English with Audio & Meaning",
    url: "/hanuman-chalisa/en",
    category: "Language",
    description: "Complete English edition with audio player, English translation, and printable PDF.",
    keywords: "hanuman chalisa english audio meaning pdf lyrics"
  },
  {
    title: "Hanuman Chalisa English Chanting Guide (Romanized)",
    url: "/hanuman-chalisa-english",
    category: "Language",
    description: "Line-by-line phonetic transliteration guide for easy chanting in English.",
    keywords: "hanuman chalisa english transliteration phonetic chanting guide"
  }
];

export const GET: APIRoute = async () => {
  // 1. Benefits items
  const benefitItems: SearchItem[] = Object.values(BENEFITS_DATA).map((b) => ({
    title: `Hanuman Chalisa for ${b.title}`,
    url: `/hanuman-chalisa-benefits/${b.slug}`,
    category: "Benefit",
    description: b.situation || b.description || "Spiritual and psychological benefits of focused recitation.",
    keywords: `benefits ${b.slug} ${b.title} ${b.situation}`
  }));

  // 2. Blog items
  const blogItems: SearchItem[] = FALLBACK_BLOG_POSTS.map((post) => {
    let cat: SearchItem["category"] = "Guide";
    const lower = post.title.toLowerCase();
    if (lower.includes("aarti")) cat = "Aarti";
    else if (lower.includes("chalisa") || lower.includes("stotra") || lower.includes("path")) cat = "Scripture";

    return {
      title: post.title,
      url: `/blog/${post.slug}`,
      category: cat,
      description: post.excerpt ? post.excerpt.slice(0, 140) + "..." : "Devotional hymns, lyrics, and spiritual recitation guide.",
      keywords: `${post.category || ""} ${post.title}`.toLowerCase()
    };
  });

  const allItems: SearchItem[] = [...STATIC_SEARCH_ITEMS, ...benefitItems, ...blogItems];

  return new Response(JSON.stringify(allItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Edge caching: Cache for 1 hour in browser, 24 hours at Cloudflare edge with stale-while-revalidate
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
    }
  });
};
