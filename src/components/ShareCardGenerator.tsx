"use client";

import React, { useRef, useState, useEffect } from "react";
import hanumanChalisaData from "@/data/scriptures/hanuman-chalisa.json";
import { ScriptureVerse } from "@/types/scripture";

const verses: ScriptureVerse[] = hanumanChalisaData as ScriptureVerse[];

export default function ShareCardGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedVerseId, setSelectedVerseId] = useState<string>("chaupai-01");
  const [theme, setTheme] = useState<"maroon" | "gold">("maroon");
  
  const selectedVerse = verses.find((v) => v.id === selectedVerseId) || verses[2]; // fallback to chaupai-1

  useEffect(() => {
    drawCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVerseId, theme]);

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set dimensions for WhatsApp Status (1080x1920 px)
    canvas.width = 1080;
    canvas.height = 1920;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (theme === "maroon") {
      gradient.addColorStop(0, "#4a1215"); // deep maroon shade 1
      gradient.addColorStop(0.5, "#6B1E23"); // deep maroon main
      gradient.addColorStop(1, "#2b0608"); // deep maroon shade 2
    } else {
      gradient.addColorStop(0, "#fdfcf7"); // ivory white shade
      gradient.addColorStop(0.5, "#F3EAD8"); // stone-ivory main
      gradient.addColorStop(1, "#e6dab3"); // soft gold shade
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Decorative Borders
    const padding = 60;
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#C89B3C"; // brass-gold border
    ctx.strokeRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);

    // Double double lines on border
    ctx.lineWidth = 2;
    ctx.strokeRect(padding + 12, padding + 12, canvas.width - (padding + 12) * 2, canvas.height - (padding + 12) * 2);

    // 3. Draw Torana Temple Arch
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#C89B3C";
    
    // Simple SVG arch equivalent
    ctx.beginPath();
    const archTop = 400;
    const archLeft = padding + 40;
    const archRight = canvas.width - padding - 40;
    const archWidth = archRight - archLeft;
    
    // Drawing a dome-like arch
    ctx.moveTo(archLeft, archTop + 600);
    ctx.lineTo(archLeft, archTop + 200);
    ctx.quadraticCurveTo(archLeft, archTop, archLeft + archWidth / 2, archTop);
    ctx.quadraticCurveTo(archRight, archTop, archRight, archTop + 200);
    ctx.lineTo(archRight, archTop + 600);
    ctx.stroke();

    // 4. Draw Ambient Symbol in Arch Peak
    ctx.font = "80px Arial";
    ctx.fillStyle = "#E8A33D"; // marigold accent
    ctx.textAlign = "center";
    ctx.fillText("🕉️", canvas.width / 2, archTop + 140);

    // 5. Draw Header
    ctx.font = "bold 44px 'Times New Roman', serif";
    ctx.fillStyle = theme === "maroon" ? "#E8A33D" : "#6B1E23";
    ctx.fillText("SHREE HANUMAN CHALISA", canvas.width / 2, 280);

    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "#C89B3C";
    ctx.fillText("श्री राम जय राम जय जय राम", canvas.width / 2, 330);

    // 6. Draw Devanagari Verse (Split line by line)
    ctx.font = "bold 46px Arial, 'Tiro Devanagari Hindi', serif";
    ctx.fillStyle = theme === "maroon" ? "#F3EAD8" : "#2B1B12";
    
    const rawDevanagari = selectedVerse.devanagari;
    // Split on spaces or sentence ends to make it wrap nicely
    const lines = rawDevanagari.split("\n").map(l => l.trim()).filter(Boolean);
    
    let currentY = 740;
    lines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, currentY);
      currentY += 100;
    });

    // 7. Draw English Transliteration
    ctx.font = "italic 32px 'Times New Roman', serif";
    ctx.fillStyle = "#E8A33D";
    
    const transliteratedLines = selectedVerse.transliteration.split("\n").map(l => l.trim()).filter(Boolean);
    currentY += 80;
    transliteratedLines.forEach((line) => {
      ctx.fillText(`"${line}"`, canvas.width / 2, currentY);
      currentY += 70;
    });

    // 8. Draw Translation
    ctx.font = "bold 32px Arial, sans-serif";
    ctx.fillStyle = theme === "maroon" ? "#ffffff" : "#2B1B12";
    
    const translationText = selectedVerse.literal_translation.en;
    // Word-wrap function for canvas text
    wrapText(ctx, translationText, canvas.width / 2, currentY + 100, 800, 50);

    // 9. Draw Footer Branding
    ctx.font = "bold 30px 'Times New Roman', serif";
    ctx.fillStyle = "#C89B3C";
    ctx.fillText("🔔 RamHanumanChalisa.com", canvas.width / 2, canvas.height - 150);

    ctx.font = "24px Arial";
    ctx.fillStyle = theme === "maroon" ? "rgba(243, 234, 216, 0.4)" : "rgba(43, 27, 18, 0.4)";
    ctx.fillText("Recited with devotion • Daily Puja Blessings", canvas.width / 2, canvas.height - 100);
  };

  // Helper function to wrap text on canvas
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to URL representation
    const imageURI = canvas.toDataURL("image/png");
    
    // Create download link
    const link = document.createElement("a");
    const num = selectedVerse.verse_number ? `chaupai-${selectedVerse.verse_number}` : selectedVerse.id;
    link.download = `hanuman_chalisa_${num}.png`;
    link.href = imageURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center p-6 bg-stone-ivory border-2 border-brass-gold/30 rounded-lg shadow-sm">
      
      {/* Settings / Controls Column */}
      <div className="flex-1 space-y-6 max-w-sm w-full">
        <div className="space-y-2">
          <h4 className="font-serif-display text-lg font-bold text-maroon-deep uppercase">
            WhatsApp Status Creator
          </h4>
          <p className="text-xs text-charcoal-brown/70 leading-relaxed">
            Create beautifully typeset images of any verse. Select your favorite verse, customize the theme, and download it instantly to share on WhatsApp or social media.
          </p>
        </div>

        {/* 1. Verse Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs uppercase font-bold text-brass-gold">
            Select Verse
          </label>
          <select
            value={selectedVerseId}
            onChange={(e) => setSelectedVerseId(e.target.value)}
            className="w-full text-sm bg-stone-ivory border border-brass-gold/40 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
          >
            {verses.map((v) => {
              const label = v.id.startsWith("doha-")
                ? v.id === "doha-01"
                  ? "Opening Doha 1"
                  : v.id === "doha-02"
                  ? "Opening Doha 2"
                  : "Concluding Doha"
                : `Chaupai ${v.verse_number} - ${v.title_en.split(":")[1] || v.title_en}`;
              return (
                <option key={v.id} value={v.id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        {/* 2. Theme Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs uppercase font-bold text-brass-gold">
            Card Theme
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme("maroon")}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded border transition-colors ${
                theme === "maroon"
                  ? "bg-maroon-deep text-stone-ivory border-brass-gold"
                  : "bg-stone-ivory border-brass-gold/30 text-charcoal-brown/60 hover:bg-marigold/10"
              }`}
            >
              Maroon Stone
            </button>
            <button
              onClick={() => setTheme("gold")}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded border transition-colors ${
                theme === "gold"
                  ? "bg-marigold text-maroon-deep border-brass-gold"
                  : "bg-stone-ivory border-brass-gold/30 text-charcoal-brown/60 hover:bg-marigold/10"
              }`}
            >
              Temple Ivory
            </button>
          </div>
        </div>

        {/* 3. Action Buttons */}
        <button
          onClick={handleDownload}
          className="w-full bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep py-3 rounded font-bold uppercase text-xs tracking-wider border-2 border-brass-gold shadow-md transition-all duration-300"
        >
          📥 Download Image (1080x1920)
        </button>
        
        <p className="text-[10px] text-charcoal-brown/50 text-center italic">
          Perfect dimensions for WhatsApp status, Instagram stories, or wallpaper.
        </p>
      </div>

      {/* Preview Column (Scaled Canvas for mobile responsive render) */}
      <div className="flex-grow flex items-center justify-center">
        <div className="border-4 border-brass-gold shadow-xl rounded-lg overflow-hidden max-w-[280px] sm:max-w-[340px]">
          <canvas
            ref={canvasRef}
            className="w-full h-auto bg-maroon-deep cursor-pointer"
            style={{ aspectRatio: "9/16" }}
            onClick={drawCard} // Redraw if user clicks canvas
          />
        </div>
      </div>

    </div>
  );
}
