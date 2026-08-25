import React from "react";
import Link from "next/link";
import CarvedDivider from "@/components/CarvedDivider";
import ShareCardGenerator from "@/components/ShareCardGenerator";
import hanumanChalisaData from "@/data/scriptures/hanuman-chalisa.json";
import { ScriptureVerse } from "@/types/scripture";
import PrintButton from "@/components/PrintButton";

const verses: ScriptureVerse[] = hanumanChalisaData as ScriptureVerse[];

export const metadata = {
  title: "Download Hanuman Chalisa PDF — Print Ready & WhatsApp Status Share",
  description: "Print a beautifully typeset, vector-perfect Hanuman Chalisa directly, or generate custom high-quality WhatsApp status cards with any verse.",
};

export default function PdfPrintPage() {
  const openingDohas = verses.filter((v) => v.id.startsWith("doha-"));
  const chaupais = verses.filter((v) => v.id.startsWith("chaupai-"));
  const dohaClosing = openingDohas.find((v) => v.id === "doha-closing");

  return (
    <div className="space-y-12">
      
      {/* 1. Public Facing Section (no-print) */}
      <section className="no-print space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-maroon-deep bg-marigold/30 px-3 py-1 rounded border border-marigold">
            Print & Share (मुद्रण एवं साझा)
          </span>
          <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
            Print PDF & Share Status
          </h2>
          <p className="text-xs text-charcoal-brown/70 max-w-xl mx-auto leading-relaxed">
            Download a clean, print-ready PDF for your daily chanting session, or share beautiful custom verse cards on WhatsApp status.
          </p>
        </div>

        <CarvedDivider icon="📄" />

        {/* Print Action Box */}
        <div className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif-display text-lg text-marigold uppercase tracking-wider font-bold">
              Download Print-Ready PDF
            </h3>
            <p className="text-xs text-stone-ivory/80 max-w-lg leading-relaxed">
              We do not use cheap scans or blurry images. Clicking the button compiles the vector characters directly using Google Fonts into a beautiful physical double-column layout. Adjust paper to &ldquo;Save to PDF&rdquo; or print.
            </p>
          </div>
          
          <PrintButton />
        </div>

        <CarvedDivider icon="🕉️" />

        {/* WhatsApp Status card generator */}
        <ShareCardGenerator />
      </section>

      {/* 2. Print-Layout (Only visible during printing or print-previews, styled in globals.css) */}
      <section className="print-only hidden p-10 max-w-3xl mx-auto border-8 double border-black bg-white text-black space-y-6">
        
        {/* Print Header */}
        <div className="text-center border-b-2 border-black pb-4">
          <h1 className="font-serif-display text-2xl font-bold uppercase tracking-wider">
            SHREE HANUMAN CHALISA
          </h1>
          <p className="text-xs uppercase tracking-widest font-semibold mt-1">
            जय श्री राम • जय हनुमान
          </p>
          <p className="text-[10px] italic mt-0.5">
            Compiled statically for daily chanting - RamHanumanChalisa.com
          </p>
        </div>

        {/* Opening Dohas */}
        <div className="p-4 border border-black/40 rounded text-center space-y-4">
          <h2 className="text-xs uppercase font-bold tracking-widest border-b border-black/20 pb-1 max-w-[200px] mx-auto">
            Opening Couplets (दोहा)
          </h2>
          {openingDohas.filter(v => v.id !== "doha-closing").map((doha) => (
            <div key={doha.id} className="space-y-1">
              <p className="font-hindi-display text-base font-bold leading-loose">
                {doha.devanagari}
              </p>
              <p className="text-[9px] italic max-w-lg mx-auto">
                {doha.transliteration}
              </p>
            </div>
          ))}
        </div>

        {/* Double Column print layout for the 40 Chaupais */}
        <div className="print-two-columns text-xs space-y-4 pt-4 border-t border-black/20">
          {chaupais.map((verse) => (
            <div key={verse.id} className="break-inside-avoid border-b border-black/10 pb-3 mb-3">
              <div className="font-bold text-[9px] uppercase tracking-wider mb-1">
                Verse {verse.verse_number}
              </div>
              <p className="font-hindi-display text-sm font-bold leading-normal mb-1">
                {verse.devanagari}
              </p>
              <p className="text-[8px] italic text-black/60 mb-1.5">
                {verse.transliteration}
              </p>
              <p className="text-[9px] leading-relaxed font-semibold text-black/90">
                {verse.literal_translation.en}
              </p>
            </div>
          ))}
        </div>

        {/* Concluding Doha */}
        {dohaClosing && (
          <div className="p-4 border border-black/40 rounded text-center space-y-2 mt-6">
            <h2 className="text-xs uppercase font-bold tracking-widest border-b border-black/20 pb-1 max-w-[200px] mx-auto">
              Concluding Couplet (दोहा)
            </h2>
            <p className="font-hindi-display text-base font-bold leading-loose">
              {dohaClosing.devanagari}
            </p>
            <p className="text-[9px] italic mb-1">
              {dohaClosing.transliteration}
            </p>
            <p className="text-[9px] leading-relaxed font-semibold">
              {dohaClosing.literal_translation.en}
            </p>
          </div>
        )}

      </section>

    </div>
  );
}
