export interface WordMeaning {
  word: string;
  roman: string;
  meaning: {
    en: string;
    hi: string;
  };
}

export interface ScriptureVerse {
  id: string;
  verse_number: number | null;
  title_en: string;
  title_hi: string;
  devanagari: string;
  transliteration: string;
  word_meanings: WordMeaning[];
  literal_translation: {
    en: string;
    hi: string;
  };
  interpretive_meaning: {
    en: string;
    hi: string;
  };
  story: {
    en: string;
    hi: string;
  };
  practical_application: {
    teaching?: {
      en: string;
      hi: string;
    };
    when_to_use?: {
      en: string;
      hi: string;
    };
  };
  puranic_context?: Array<{
    id: string;
    type: string;
    priority: string;
    title: {
      en: string;
      hi: string;
    };
    icon?: string;
    story_summary: {
      en: string;
      hi: string;
    };
    theological_significance?: {
      en: string;
      hi: string;
    };
    source_texts?: Array<{
      text: string;
      section?: string;
    }>;
  }>;
}
