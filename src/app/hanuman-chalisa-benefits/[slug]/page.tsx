import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CarvedDivider from "@/components/CarvedDivider";
import { BENEFITS_DATA } from "@/data/benefits";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const benefit = BENEFITS_DATA[slug];
  if (!benefit) return {};

  return {
    title: `${benefit.title} — Hanuman Chalisa Chanting Guide`,
    description: `Learn how chanting Hanuman Chalisa Chaupai ${benefit.targetVerseNumber} resolves issues with ${benefit.situation}. Recommended schedules and step-by-step guidelines.`,
  };
}

export async function generateStaticParams() {
  return Object.keys(BENEFITS_DATA).map((slug) => ({ slug }));
}

export default async function BenefitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const benefit = BENEFITS_DATA[slug];

  if (!benefit) {
    notFound();
  }

  // Get other benefits to display in the sidebar
  const otherBenefits = Object.values(BENEFITS_DATA).filter(
    (b) => b.slug !== slug
  );

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      
      {/* Breadcrumbs */}
      <nav className="text-xs text-charcoal-brown/50 font-semibold" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex gap-2">
          <li className="flex items-center">
            <Link href="/" className="hover:text-maroon-deep">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/hanuman-chalisa-benefits" className="hover:text-maroon-deep">Benefits</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-maroon-deep truncate max-w-[200px]" aria-current="page">
            {benefit.title.split(" — ")[0]}
          </li>
        </ol>
      </nav>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Detail Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-3 bg-marigold/15 rounded-full border border-marigold/30">
                {benefit.icon}
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-maroon-deep leading-tight">
                {benefit.title}
              </h2>
            </div>
            <p className="text-sm font-bold text-brass-gold uppercase tracking-wider">
              Life Challenge: {benefit.situation}
            </p>
            <p className="text-sm sm:text-base text-charcoal-brown/90 leading-relaxed">
              {benefit.description}
            </p>
          </div>

          <CarvedDivider icon="🕉️" />

          {/* Connected Verse Box (The core focal point) */}
          <div className="p-6 sm:p-8 bg-maroon-deep text-stone-ivory border-2 border-brass-gold rounded-lg shadow-md space-y-4 text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-marigold">
              Focal Verse for Chanting (Chaupai {benefit.targetVerseNumber})
            </span>
            <p className="font-hindi-display text-xl sm:text-2xl md:text-3xl leading-loose font-bold tracking-wide">
              {benefit.targetVerseText}
            </p>
            <p className="text-xs sm:text-sm italic text-stone-ivory/70 max-w-xl mx-auto">
              {benefit.targetVerseTranslation}
            </p>
          </div>

          {/* Detailed Exposition */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-lg text-maroon-deep uppercase tracking-wider font-bold border-b border-brass-gold/20 pb-2">
              Spiritual Explanation & Significance
            </h3>
            <p className="text-sm sm:text-base text-charcoal-brown/90 leading-relaxed whitespace-pre-line">
              {benefit.detailedExposition}
            </p>
          </div>

          {/* Step-by-Step Puja Vidhi Guide */}
          <div className="bg-stone-ivory border border-brass-gold/30 p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif-display text-lg text-maroon-deep uppercase tracking-wider font-bold">
                Recitation Schedule & Rituals (अनुष्ठान विधि)
              </h3>
              <p className="text-xs text-brass-gold font-bold uppercase">
                Recommended: {benefit.recommendedChants}
              </p>
            </div>

            <ol className="relative border-l border-brass-gold/30 ml-4 space-y-6 text-sm text-charcoal-brown/90">
              {benefit.actionSteps.map((step, idx) => (
                <li key={idx} className="mb-2 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-marigold text-maroon-deep rounded-full -left-3 font-bold text-xs shadow-sm select-none border border-brass-gold">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed font-semibold">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Sidebar (Links to other situations) */}
        <div className="space-y-6">
          
          {/* Ad Slot */}
          <div className="no-print w-full h-64 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner">
            Ad Slot — Sidebar Sticky
          </div>

          <div className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
            <h4 className="font-serif-display text-sm uppercase tracking-wider font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
              Other Situations
            </h4>
            
            <div className="space-y-3">
              {otherBenefits.map((b) => (
                <Link
                  key={b.slug}
                  href={`/hanuman-chalisa-benefits/${b.slug}`}
                  className="block p-3 border border-brass-gold/15 hover:border-marigold hover:bg-marigold/5 rounded transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{b.icon}</span>
                    <h5 className="font-serif-display font-bold text-xs sm:text-sm text-maroon-deep uppercase leading-tight">
                      {b.title.split(" for ")[1] || b.title}
                    </h5>
                  </div>
                  <p className="text-[10px] text-charcoal-brown/60 leading-relaxed truncate">
                    {b.situation}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* AdSense Footer Slot */}
      <div className="no-print w-full h-24 bg-stone-ivory border border-brass-gold/20 flex items-center justify-center text-xs text-charcoal-brown/40 tracking-widest uppercase rounded shadow-inner my-12">
        Ad Slot — Detail Bottom (Layout Stable Skeleton)
      </div>

    </div>
  );
}
