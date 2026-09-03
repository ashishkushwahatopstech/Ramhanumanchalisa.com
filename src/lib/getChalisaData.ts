import { getPrisma } from "@/lib/prisma";
import hiData from "@/data/chalisa/hi.json";
import enData from "@/data/chalisa/en.json";
import teData from "@/data/chalisa/te.json";
import bnData from "@/data/chalisa/bn.json";
import knData from "@/data/chalisa/kn.json";
import guData from "@/data/chalisa/gu.json";
import mrData from "@/data/chalisa/mr.json";

const localFallbacks: Record<string, any> = {
  hi: hiData,
  en: enData,
  te: teData,
  bn: bnData,
  kn: knData,
  gu: guData,
  mr: mrData,
};

export interface LocalizedVerse {
  id: string;
  verse_number: string | number;
  text: string;
  transliteration: string;
  meaning: string;
}

export interface LocalizedFAQ {
  question: string;
  answer: string;
}

export interface LocalizedChalisa {
  lang: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  meaningSummary: string;
  verses: LocalizedVerse[];
  faqs: LocalizedFAQ[];
}

export async function getChalisaData(lang: string, db?: any): Promise<LocalizedChalisa> {
  const fallback = localFallbacks[lang] || hiData;

  try {
    const client = getPrisma(db);
    if (client?.languageContent) {
      const dbRecord = await client.languageContent.findUnique({
        where: { lang },
      });

      if (dbRecord && dbRecord.published && dbRecord.contentJSON) {
        const parsed = JSON.parse(dbRecord.contentJSON);
        return {
          lang: dbRecord.lang,
          title: dbRecord.title || fallback.title,
          metaDescription: dbRecord.metaDescription || fallback.metaDescription,
          h1: parsed.h1 || fallback.h1,
          intro: parsed.intro || fallback.intro,
          meaningSummary: parsed.meaningSummary || fallback.meaningSummary,
          verses: parsed.verses || fallback.verses,
          faqs: parsed.faqs || fallback.faqs,
        };
      }
    }
  } catch (e) {
    console.warn(`Notice: Failed to load language ${lang} from DB, using static fallback:`, e);
  }

  return fallback as LocalizedChalisa;
}
