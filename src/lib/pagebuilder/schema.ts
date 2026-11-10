/**
 * Block System Core Schema & Type Definitions
 * RamHanumanChalisa.com — Admin Pagebuilder
 */

export type TemplateType =
  | "homepage"
  | "prayer_text"
  | "festival"
  | "article"
  | "benefit"
  | "story"
  | "category"
  | "legal_informational";

export type BlockType =
  | "hero"
  | "scripture_verses"
  | "meaning_explanation"
  | "rich_text"
  | "heading_paragraph"
  | "image"
  | "gallery"
  | "divider_spacer"
  | "container_columns"
  | "links_list"
  | "call_to_action"
  | "audio_embed"
  | "video_embed"
  | "faq_block"
  | "sidebar_block"
  | "category_cards"
  | "related_articles"
  | "latest_posts"
  | "instagram_card"
  | "instagram_grid"
  | "whatsapp_share"
  | "social_channels"
  | "newsletter"
  | "custom_html"
  | "ad_slot";

export interface BlockInstance {
  id: string;
  type: BlockType;
  visible: boolean;
  order: number;
  locked?: boolean;
  settings?: Record<string, any>;
  content: Record<string, any>;
}

export interface ColumnModel {
  id: string;
  span?: number;
  blocks: BlockInstance[];
}

export interface ContainerModel {
  id: string;
  columnsCount: 1 | 2 | 3 | 4;
  columns: ColumnModel[];
}

export interface SectionModel {
  id: string;
  name: string;
  visible: boolean;
  order: number;
  settings: {
    background?: "warm_cream" | "soft_bg" | "maroon_deep" | "dark_brown" | "gradient_saffron" | "transparent";
    paddingY?: "none" | "small" | "medium" | "large";
    width?: "contained_4xl" | "contained_6xl" | "contained_7xl" | "full_width";
    hideOnMobile?: boolean;
    dividerTop?: boolean;
    dividerBottom?: boolean;
    customCssClass?: string;
  };
  containers: ContainerModel[];
}

export interface PageModel {
  slug: string;
  template: TemplateType;
  status: "published" | "draft";
  redirectTarget?: string;
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImage?: string;
    ogType?: "website" | "article";
    noindex?: boolean;
    language?: string;
    structuredData?: Record<string, any>;
  };
  h1: {
    text: string;
    subheading?: string;
    devanagariTag?: string;
  };
  sections: SectionModel[];
  auditMeta: {
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
    hasScriptureModifications: boolean;
  };
}
