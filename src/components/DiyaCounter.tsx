"use client";

import React, { useEffect, useState } from "react";

export default function DiyaCounter() {
  const [count, setCount] = useState<number>(0);
  const [hasRecited, setHasRecited] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    // Fetch today's count on load
    fetch("/api/recitations")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
      })
      .catch((err) => console.error("Error loading counter:", err));

    // Check if already recited today
    const lastRecitation = localStorage.getItem("lastRecitationDate");
    const todayStr = new Date().toDateString();
    if (lastRecitation === todayStr) {
      setHasRecited(true);
    }
  }, []);

  // Web Audio API Temple Bell Sound Synthesizer
  const playBellSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Fundamental temple bell frequencies (inharmonic partials for realistic ring)
      const frequencies = [415.3, 523.25, 659.25, 830.6, 987.77, 1318.51, 1661.22];
      const gains = [0.6, 0.35, 0.25, 0.18, 0.1, 0.06, 0.03];
      const decayTimes = [1.8, 1.4, 1.1, 0.8, 0.5, 0.3, 0.15];

      frequencies.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        // Exponential decay envelope
        gainNode.gain.setValueAtTime(gains[index], audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + decayTimes[index]);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + decayTimes[index]);
      });
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  };

  const handleRecite = async () => {
    setIsAnimating(true);
    playBellSound();

    // Reset bell shake animation after 600ms
    setTimeout(() => setIsAnimating(false), 600);

    try {
      const res = await fetch("/api/recitations", { method: "POST" });
      const data = await res.json();
      setCount(data.count);
      
      const todayStr = new Date().toDateString();
      localStorage.setItem("lastRecitationDate", todayStr);
      setHasRecited(true);
    } catch (err) {
      console.error("Error updating counter:", err);
      setCount((prev) => prev + 1); // client fallback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-maroon-deep border-2 border-brass-gold rounded-lg shadow-xl max-w-sm mx-auto text-stone-ivory select-none">
      
      {/* Diya SVG & Animation */}
      <div className="relative flex items-center justify-center h-20 w-24">
        {/* Diya Lamp */}
        <svg viewBox="0 0 100 60" className="w-20 h-12 fill-brass-gold filter drop-shadow">
          <path d="M 10,40 Q 50,60 90,40 Q 100,20 50,20 Q 0,20 10,40 Z" />
          <path d="M 45,20 L 55,20 L 50,10 Z" fill="#2B1B12" />
        </svg>
        {/* Diya Flame */}
        <div className="absolute top-1 left-[45%] w-4 h-8 bg-gradient-to-t from-vermilion via-marigold to-yellow-200 rounded-b-full rounded-t-full diya-flame" />
      </div>

      <div className="text-center mt-3">
        <p className="font-serif-display text-sm tracking-widest text-brass-gold uppercase">
          Today&apos;s Puja Counter
        </p>
        <h4 className="text-2xl font-bold font-sans text-marigold mt-1">
          {count} Recitations
        </h4>
        <p className="text-xs text-stone-ivory/70 mt-0.5">
          bhakts recited globally today
        </p>
      </div>

      <button
        onClick={handleRecite}
        disabled={hasRecited}
        className={`mt-4 flex items-center gap-2 px-6 py-2.5 rounded font-bold uppercase text-sm border-2 border-brass-gold shadow-md transition-all duration-300 ${
          hasRecited
            ? "bg-stone-ivory/10 border-stone-ivory/30 text-stone-ivory/50 cursor-not-allowed"
            : "bg-vermilion text-stone-ivory hover:bg-marigold hover:text-maroon-deep cursor-pointer scale-100 hover:scale-105 active:scale-95"
        }`}
      >
        <span className={`text-base ${isAnimating ? "animate-bounce inline-block" : ""}`}>
          🔔
        </span>
        {hasRecited ? "Recited Today" : "I Recited Today"}
      </button>

      {hasRecited && (
        <p className="text-[10px] text-marigold/80 mt-2 italic">
          May Lord Hanuman bless you with strength and wisdom!
        </p>
      )}
    </div>
  );
}
