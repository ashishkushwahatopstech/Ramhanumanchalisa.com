"use client";

import React, { useEffect, useState, useRef } from "react";

interface FloatingParticle {
  id: number;
  text: string;
  x: number;
}

const BLESSING_PHRASES = [
  "+1 🙏",
  "जय श्री राम",
  "ॐ हनुमते नमः",
  "+1 📿",
  "जय बजरंगबली",
  "+1 🌺",
];

export default function DiyaCounter() {
  const [globalCount, setGlobalCount] = useState<number>(0);
  const [personalCount, setPersonalCount] = useState<number>(0);
  const [isFlaring, setIsFlaring] = useState<boolean>(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lastMilestone, setLastMilestone] = useState<string | null>(null);

  const [remoteActivityToast, setRemoteActivityToast] = useState<string | null>(null);

  const pendingBatchRef = useRef<number>(0);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const particleIdRef = useRef<number>(0);
  const latestServerCountRef = useRef<number>(0);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getStorageKey = () => {
    const d = new Date();
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return `rhc_sadhana_count_${dateKey}`;
  };

  // Helper to fetch latest global count (AJAX)
  const fetchGlobalCount = async (isBackgroundPoll = false) => {
    if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
    if (typeof navigator !== "undefined" && !navigator.onLine) return;

    try {
      const res = await fetch("/api/recitations");
      if (!res.ok) return;
      const data = await res.json();

      if (typeof data.count === "number") {
        const serverCount = data.count;
        const prevServer = latestServerCountRef.current;

        // Detect if someone from a remote area chanted
        if (isBackgroundPoll && prevServer > 0 && serverCount > prevServer) {
          const delta = serverCount - prevServer;
          setRemoteActivityToast(
            delta === 1
              ? "✨ A devotee just offered a recitation!"
              : `✨ ${delta} recitations offered by devotees live!`
          );

          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
          toastTimeoutRef.current = setTimeout(() => {
            setRemoteActivityToast(null);
          }, 3000);

          // Subtle diya sparkle
          setIsFlaring(true);
          setTimeout(() => setIsFlaring(false), 250);
        }

        latestServerCountRef.current = serverCount;
        setGlobalCount((prev) => Math.max(prev, serverCount + pendingBatchRef.current));
      }
    } catch {
      // Quietly ignore network blips during polling
    }
  };

  // 1. Initial load & live AJAX synchronization loop
  useEffect(() => {
    // Load personal count for today
    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) setPersonalCount(val);
      }
    } catch (e) {
      console.warn("Could not read personal sadhana count:", e);
    }

    // Initial fetch
    fetchGlobalCount(false);

    // Live AJAX polling every 3.5 seconds across active devotees
    const pollInterval = setInterval(() => {
      fetchGlobalCount(true);
    }, 3500);

    // Immediate sync when tab becomes visible or browser comes online
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchGlobalCount(true);
      }
    };

    const handleOnline = () => {
      fetchGlobalCount(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);

    return () => {
      clearInterval(pollInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // 2. Synthesize authentic bronze temple bell chime
  const playBellSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          audioCtxRef.current = new AudioCtxClass();
        }
      }

      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Temple bell harmonic overtones
      const frequencies = [415.3, 523.25, 659.25, 830.6, 1046.5];
      const gains = [0.45, 0.28, 0.2, 0.12, 0.08];
      const decayTimes = [1.6, 1.2, 0.9, 0.7, 0.4];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.7, ctx.currentTime);
      masterGain.connect(ctx.destination);

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(gains[i], ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decayTimes[i]);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + decayTimes[i]);
      });
    } catch {
      // Audio not supported or autoplay blocked
    }
  };

  // 3. Debounced batch flush to backend API
  const flushBatch = () => {
    const toSend = pendingBatchRef.current;
    if (toSend <= 0) return;
    pendingBatchRef.current = 0;

    fetch("/api/recitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batch: toSend }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          latestServerCountRef.current = data.count;
          // Sync server count smoothly with any concurrent clicks
          setGlobalCount((prev) => Math.max(prev, data.count + pendingBatchRef.current));
        }
      })
      .catch((err) => {
        console.warn("Counter batch sync deferred:", err);
      });
  };

  // 4. Instant click handler (<5ms feedback)
  const handleRecite = () => {
    // A. Local immediate increment
    const newPersonal = personalCount + 1;
    setPersonalCount(newPersonal);
    setGlobalCount((prev) => prev + 1);

    // B. Save to localStorage
    try {
      localStorage.setItem(getStorageKey(), String(newPersonal));
    } catch {
      // ignore quota or private browsing errors
    }

    // C. Check Mala milestones (11, 21, 51, 108)
    if (newPersonal === 11) setLastMilestone("📿 Choti Mala (11 Recitations) Accomplished!");
    else if (newPersonal === 21) setLastMilestone("✨ 21 Recitations Sankalp Fulfilled!");
    else if (newPersonal === 51) setLastMilestone("🌟 51 Recitations Sankat Nashak Path!");
    else if (newPersonal === 108) setLastMilestone("🌺 Siddhi Maha Mala (108 Recitations) Completed!");

    // D. Animate flame & sound
    setIsFlaring(true);
    playBellSound();
    setTimeout(() => setIsFlaring(false), 350);

    // E. Spawn floating blessing particle
    const randomPhrase = BLESSING_PHRASES[Math.floor(Math.random() * BLESSING_PHRASES.length)];
    const randomOffset = (Math.random() - 0.5) * 60;
    const pId = ++particleIdRef.current;

    setParticles((prev) => [...prev.slice(-6), { id: pId, text: randomPhrase, x: randomOffset }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== pId));
    }, 1100);

    // F. Queue batch increment and debounce network call
    pendingBatchRef.current += 1;
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(flushBatch, 1500);
  };

  // Next target milestone calculation
  const getNextMilestone = () => {
    if (personalCount < 11) return { target: 11, label: "Choti Mala (11)" };
    if (personalCount < 21) return { target: 21, label: "Sankalp (21)" };
    if (personalCount < 51) return { target: 51, label: "Ardh Mala (51)" };
    if (personalCount < 108) return { target: 108, label: "Maha Mala (108)" };
    const next108Multiple = Math.ceil((personalCount + 1) / 108) * 108;
    return { target: next108Multiple, label: `Maha Mala (${next108Multiple})` };
  };

  const nextMilestone = getNextMilestone();
  const progressPercent = Math.min(100, Math.round((personalCount / nextMilestone.target) * 100));

  return (
    <section className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-b from-[#3a0b0e] via-[#481014] to-[#2b080a] border-2 border-brass-gold/60 rounded-2xl shadow-2xl max-w-md mx-auto text-stone-ivory select-none">
      {/* Decorative Mandir Corner Accents */}
      <div className="absolute top-2 left-2 text-brass-gold/30 text-xs font-serif">❖</div>
      <div className="absolute top-2 right-2 text-brass-gold/30 text-xs font-serif">❖</div>
      <div className="absolute bottom-2 left-2 text-brass-gold/30 text-xs font-serif">❖</div>
      <div className="absolute bottom-2 right-2 text-brass-gold/30 text-xs font-serif">❖</div>

      {/* Header with Live Syncing Indicator & Bell Audio Toggle */}
      <div className="flex items-center justify-between w-full mb-3 border-b border-brass-gold/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brass-gold">
            Daily Mandir Sadhana
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium bg-black/30 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Live Sync</span>
          </div>
        </div>
        <button
          onClick={() => setSoundEnabled((prev) => !prev)}
          className="text-xs text-brass-gold/80 hover:text-marigold transition-colors flex items-center gap-1 cursor-pointer"
          title={soundEnabled ? "Mute Bell Sound" : "Enable Bell Sound"}
        >
          {soundEnabled ? "🔔 Chime On" : "🔕 Muted"}
        </button>
      </div>

      {/* Remote Live Chanting Notification Toast */}
      {remoteActivityToast && (
        <div className="mb-2 text-center text-[11px] text-yellow-200 font-semibold bg-marigold/20 border border-marigold/40 py-1 px-3 rounded-full shadow animate-pulse">
          {remoteActivityToast}
        </div>
      )}

      {/* Floating Particles Stage */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center h-20 w-28">
          {/* Diya SVG Brass Vessel */}
          <svg
            viewBox="0 0 100 60"
            className="w-24 h-14 fill-brass-gold filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-transform duration-200"
          >
            <path d="M 10,40 Q 50,60 90,40 Q 100,20 50,20 Q 0,20 10,40 Z" />
            <path d="M 45,20 L 55,20 L 50,10 Z" fill="#2B1B12" />
          </svg>

          {/* Diya Flame with flare effect */}
          <div
            className={`absolute top-0 left-[46%] w-5 h-9 bg-gradient-to-t from-vermilion via-marigold to-yellow-100 rounded-b-full rounded-t-full transition-all duration-200 ${
              isFlaring
                ? "scale-135 brightness-150 drop-shadow-[0_0_20px_#FFB300]"
                : "scale-100 drop-shadow-[0_0_10px_#FFB300]/80"
            }`}
          />

          {/* Render Floating Blessing Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{ transform: `translateX(${p.x}px)` }}
              className="absolute -top-4 pointer-events-none text-xs font-bold text-marigold bg-maroon-deep/90 border border-marigold/50 px-2 py-0.5 rounded-full shadow-lg animate-float-fade whitespace-nowrap z-20"
            >
              {p.text}
            </div>
          ))}
        </div>

        {/* Global Recitation Counter Display */}
        <div className="text-center mt-2">
          <p className="font-serif-display text-xs tracking-widest text-brass-gold uppercase">
            Global Devotee Counter Today
          </p>
          <div className="text-3xl font-extrabold font-sans text-marigold tracking-tight mt-0.5">
            {globalCount.toLocaleString("en-IN")}{" "}
            <span className="text-sm font-normal text-stone-ivory/80">Recitations</span>
          </div>
          <p className="text-[11px] text-stone-ivory/70 mt-0.5">
            offered globally by devotees today
          </p>
        </div>

        {/* Personal Sadhana / Mala Progress Section */}
        <div className="w-full bg-black/25 border border-brass-gold/30 rounded-xl p-3 mt-4 text-center">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-stone-ivory/80 font-medium">Your Chants Today:</span>
            <span className="font-bold text-marigold text-sm">
              {personalCount}{" "}
              <span className="text-[11px] text-stone-ivory/60 font-normal">
                / {nextMilestone.target} 📿
              </span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-stone-ivory/10 rounded-full overflow-hidden border border-brass-gold/20">
            <div
              className="h-full bg-gradient-to-r from-vermilion via-marigold to-yellow-300 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-stone-ivory/60 mt-1">
            <span>Goal: {nextMilestone.label}</span>
            <span>{progressPercent}% completed</span>
          </div>

          {/* Milestone Badge when achieved */}
          {lastMilestone && (
            <div className="mt-2 text-[11px] text-yellow-300 font-bold bg-maroon-deep/90 border border-marigold/40 py-1 px-2 rounded-lg animate-pulse">
              {lastMilestone}
            </div>
          )}
        </div>

        {/* Main Sacred Click Button (Instant, Click Infinitely) */}
        <button
          onClick={handleRecite}
          className="mt-4 w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm border-2 border-marigold shadow-lg transition-all duration-150 cursor-pointer bg-gradient-to-r from-vermilion via-marigold to-vermilion text-stone-ivory hover:brightness-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,179,0,0.5)]"
        >
          <span className={`text-lg ${isFlaring ? "scale-125 transition-transform" : ""}`}>
            🔔
          </span>
          <span>Offer Recitation (+1)</span>
          <span className="text-xs bg-black/25 px-2 py-0.5 rounded text-yellow-100 font-mono">
            {personalCount}
          </span>
        </button>

        <p className="text-[11px] text-stone-ivory/70 mt-2.5 text-center leading-snug">
          Click with devotion after each Chaupai or full Chalisa recitation. Your progress is saved automatically.
        </p>
      </div>

      <style>{`
        @keyframes floatFade {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(1);
          }
        }
        .animate-float-fade {
          animation: floatFade 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}

