import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChalisaData } from "@/lib/getChalisaData";
import ChalisaTemplate from "@/components/ChalisaTemplate";

interface PageProps {
  params: Promise<{ lang: string }>;
}

const SUPPORTED_LANGS = ["en", "te", "bn", "kn"];

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) {
    return {};
  }

  const data = await getChalisaData(lang);

  const siteUrl = "https://ramhanumanchalisa.com";
  const canonicalUrl = `${siteUrl}/hanuman-chalisa/${lang}`;

  return {
    title: data.title,
    description: data.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "hi": siteUrl,
        "en": `${siteUrl}/hanuman-chalisa/en`,
        "te": `${siteUrl}/hanuman-chalisa/te`,
        "bn": `${siteUrl}/hanuman-chalisa/bn`,
        "kn": `${siteUrl}/hanuman-chalisa/kn`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
    },
  };
}

export default async function LanguagePage({ params }: PageProps) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang)) {
    notFound();
  }

  const data = await getChalisaData(lang);

  return <ChalisaTemplate data={data} />;
}
