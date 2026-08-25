"use client";

import React from "react";

export default function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-6 py-3 rounded font-bold uppercase text-xs tracking-wider border-2 border-brass-gold shadow-md transition-all duration-300 w-full md:w-auto text-center"
    >
      🖨️ Print / Save as PDF
    </button>
  );
}
