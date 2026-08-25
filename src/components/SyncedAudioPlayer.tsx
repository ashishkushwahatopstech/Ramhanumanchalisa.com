"use client";

import React, { useRef, useState, useEffect } from "react";
import hanumanChalisaData from "@/data/scriptures/hanuman-chalisa.json";
import hanumanashtakData from "@/data/scriptures/sankat-mochan-hanumanashtak.json";
import { ScriptureVerse } from "@/types/scripture";

const verses: ScriptureVerse[] = hanumanChalisaData as ScriptureVerse[];

interface AudioTrack {
  id: string;
  name: string;
  reciter: string;
  url: string;
  duration: number; // in seconds
  description: string;
}

// Static default tracks
const DEFAULT_TRACKS: AudioTrack[] = [
  {
    id: "track-1",
    name: "Shri Hanuman Chalisa",
    reciter: "Hari Om Sharan",
    url: "https://archive.org/download/a_20220426_202204/Hari%20Om%20Sharan%20%E2%80%8E%E2%80%93%20Shri%20Hanuman%20Chalisa.mp3",
    duration: 524, // 8m 44s
    description: "The classic, legendary 1975 recitation of the Hanuman Chalisa. Peaceful, traditional, and highly meditative.",
  },
  {
    id: "track-2",
    name: "Sankat Mochan Hanumanashtak",
    reciter: "Hari Om Sharan",
    url: "https://archive.org/download/a_20220426_202204/Hari%20Om%20Sharan%20%E2%80%8E%E2%80%93%20Sankat%20Mochan%20Hanumanashtak.mp3",
    duration: 313, // 5m 13s
    description: "The 8-verse Ashtak reciting the heroic deeds of Lord Hanuman, sung by Hari Om Sharan. Deep and protective.",
  },
  {
    id: "track-3",
    name: "Hanumanji Ki Aarti",
    reciter: "Hari Om Sharan",
    url: "https://archive.org/download/a_20220426_202204/Hari%20Om%20Sharan%20%E2%80%8E%E2%80%93%20Hanumanji%20Ki%20Aarti.mp3",
    duration: 263, // 4m 23s
    description: "Traditional Aarti Kije Hanuman Lala Ki, sung at the end of prayers with camphor and temple bells.",
  }
];

// Static Aarti Lyrics array to complete the 3 options
const AARTI_LYRICS = [
  {
    id: "aarti-intro",
    verse_number: 0,
    devanagari: "लाल देह लाली लसे, अरु धरि लाल लंगूर।\nबज्र देह दानव दलन, जय जय जय कपिसूर।।",
    transliteration: "Lal deh lalee lase, aru dhari lal langoor |\nBajra deh danav dalan, jai jai jai kapeesoor ||"
  },
  {
    id: "aarti-01",
    verse_number: 1,
    devanagari: "आरती कीजै हनुमान लला की। दुष्ट दलन रघुनाथ कला की।।\nजाके बल से गिरिवर कांपै। रोग दोष जाके निकट न झांपै।।",
    transliteration: "Aarti kije Hanuman lala ki | Dusht dalan Raghunath kala ki ||\nJake bal se girivar kampe | Rog dosh jake nikat na jhampe ||"
  },
  {
    id: "aarti-02",
    verse_number: 2,
    devanagari: "अंजनि पुत्र महा बलदाई। संतन के प्रभु सदा सहाई।।\nदे बीरा रघुनाथ पठाये। लंका जारि सिया सुधि लाये।।",
    transliteration: "Anjani putra maha baladai | Santan ke prabhu sada sahai ||\nDe beera Raghunath pathaye | Lanka jari siya sudhi laye ||"
  },
  {
    id: "aarti-03",
    verse_number: 3,
    devanagari: "लंका सो कोट समुद्र सी खाई। जात पवनसुत बार न लाई।।\nलंक जारि असुर संहारे। सियारामजी के काज संवारे।।",
    transliteration: "Lanka so kot samudra si khai | Jat pavansut bar na lai ||\nLank jari asur sanhare | Siyarambhaji ke kaj sanvare ||"
  },
  {
    id: "aarti-04",
    verse_number: 4,
    devanagari: "लक्ष्मण मूर्छित पड़े सकारे, आनि संजीवन प्राण उबारे\nपैठि पाताल तोरि जम-कारे, अहिरावण की भुजा उखारे",
    transliteration: "Lakshman murchhit pade sakare, aani sanjeevan pran ubare |\nPaithi patal tori jam-kare, Ahiravan ki bhuja ukhare ||"
  },
  {
    id: "aarti-05",
    verse_number: 5,
    devanagari: "बाएं भुजा असुर दल मारे। दाहिने भुजा संतजन तारे।।\nसुर नर मुनि जन आरती उतारें। जय जय जय हनुमान उचारें।।",
    transliteration: "Baen bhuja asur dal mare | Dahine bhuja santajan tare ||\nSur nar muni jan aarti utaren | Jai jai jai Hanuman ucharen ||"
  },
  {
    id: "aarti-06",
    verse_number: 6,
    devanagari: "कंचन थार कपूर सुहाई। आरती करत अंजना माई।।\nजो हनुमानजी की आरती गावै। बसि बैकुंठ परम पद पावै।।",
    transliteration: "Kanchan thar kapoor suhai | Aarti karat Anjana mai ||\nJo Hanumanji ki aarti gavai | Basi baikunth param pad pavai ||"
  }
];

interface VerseTimestamp {
  verseId: string;
  start: number;
  end: number;
}

interface SyncedAudioPlayerProps {
  defaultTrackId?: string;
}

export default function SyncedAudioPlayer({ defaultTrackId = "track-1" }: SyncedAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  
  const [tracks, setTracks] = useState<AudioTrack[]>(DEFAULT_TRACKS);
  const [activeTrackId, setActiveTrackId] = useState<string>(defaultTrackId);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeVerseId, setActiveVerseId] = useState<string>("");
  const [volume, setVolume] = useState<number>(0.8);
  const [speed, setSpeed] = useState<number>(1);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const activeTrack = tracks.find((t) => t.id === activeTrackId) || tracks[0];

  // 1. Determine active lyrics based on track selection
  let activeLyrics: any[] = [];
  if (activeTrackId === "track-2") {
    // Sankat Mochan Hanumanashtak
    activeLyrics = hanumanashtakData;
  } else if (activeTrackId === "track-3") {
    // Hanumanji Ki Aarti
    activeLyrics = AARTI_LYRICS;
  } else {
    // Hanuman Chalisa
    activeLyrics = verses;
  }

  // 2. State to hold compiled timestamps ranges
  const [timestamps, setTimestamps] = useState<VerseTimestamp[]>([]);

  useEffect(() => {
    // Generate timestamps whenever active track duration or lyrics change
    const generated = generateDefaultTimestamps(activeTrack.duration, activeLyrics);
    setTimestamps(generated);
    setCurrentTime(0);
    setActiveVerseId("");
    setIsDismissed(false); // Reset dismissal on track switch
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrackId]);

  useEffect(() => {
    // Fetch db tracks if API exists
    fetch("/api/tracks")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && data.length > 0) {
          setTracks(data);
        }
      })
      .catch((err) => console.log("Using static tracks fallback", err));
  }, []);

  // 3. Spreads track duration evenly or applies custom track-1 calibration
  const generateDefaultTimestamps = (duration: number, lyrics: any[]): VerseTimestamp[] => {
    const list: VerseTimestamp[] = [];

    if (activeTrackId === "track-1" && lyrics.length === 43) {
      // Precise custom calibration for Hari Om Sharan's Shree Hanuman Chalisa recording
      const doha1End = 26.0;
      const doha2End = 54.0;
      const closingStart = 477.0;

      list.push({ verseId: "doha-01", start: 0, end: doha1End });
      list.push({ verseId: "doha-02", start: doha1End, end: doha2End });

      const chaupaiCount = 40;
      const availableTime = closingStart - doha2End; // 418 seconds
      const timePerChaupai = availableTime / chaupaiCount; // 10.45s per verse

      for (let i = 1; i <= 40; i++) {
        const numStr = String(i).padStart(2, "0");
        let start = doha2End + (i - 1) * timePerChaupai;
        let end = start + timePerChaupai;

        // Custom user overrides for musical phrasing
        if (i === 28) {
          // Chaupai 28: 5:36 to 5:45 (336.0s to 345.0s)
          start = 336.0;
          end = 345.0;
        } else if (i === 29) {
          // Chaupai 29: 5:45 to 5:54 (345.0s to 354.0s)
          start = 345.0;
          end = 354.0;
        } else if (i >= 30 && i <= 34) {
          // Spacing for Chaupais 30-34 (starts at 354s, ends at 409s)
          const rangeStart = 354.0;
          const rangeEnd = 409.0;
          const countInRange = 5; // 30, 31, 32, 33, 34
          const space = (rangeEnd - rangeStart) / countInRange; // 11.0s

          start = rangeStart + (i - 30) * space;
          end = start + space;
        } else if (i === 35) {
          // Chaupai 35: 6:49 to 6:59 (409.0s to 419.0s)
          start = 409.0;
          end = 419.0;
        } else if (i === 36) {
          // Chaupai 36: 6:59 to 7:07 (419.0s to 427.0s)
          start = 419.0;
          end = 427.0;
        } else if (i === 37) {
          // Chaupai 37: 7:07 to 7:17 (427.0s to 437.0s)
          start = 427.0;
          end = 437.0;
        } else if (i === 38) {
          // Chaupai 38: 7:17 to 7:32 (437.0s to 452.0s)
          start = 437.0;
          end = 452.0;
        } else if (i === 39) {
          // Chaupai 39: 7:32 to 7:40 (452.0s to 460.0s)
          start = 452.0;
          end = 460.0;
        } else if (i === 40) {
          // Chaupai 40: 7:40 to 7:57 (460.0s to 477.0s)
          start = 460.0;
          end = closingStart; // 477.0
        } else if (i === 27) {
          // Force Chaupai 27 to end exactly at 336.0s (5:36)
          end = 336.0;
        }

        list.push({
          verseId: `chaupai-${numStr}`,
          start: parseFloat(start.toFixed(1)),
          end: parseFloat(end.toFixed(1)),
        });
      }

      list.push({ verseId: "doha-closing", start: closingStart, end: duration });
    } else if (activeTrackId === "track-3" && lyrics.length === 7) {
      // Custom calibration for Aarti: intro is 33s, Verse 1 ends at 86s (1:26), Verse 4 ends at 178s (2:58)
      const introEnd = 33.0;
      const verse1End = 86.0;
      const verse4End = 178.0;

      list.push({ verseId: "aarti-intro", start: 0, end: introEnd });
      list.push({ verseId: "aarti-01", start: introEnd, end: verse1End });

      // Verses 2 and 3 spaced at 35.4s per verse (86.0s to 156.8s)
      const space2to3 = 35.4;
      list.push({ verseId: "aarti-02", start: verse1End, end: verse1End + space2to3 });
      list.push({ verseId: "aarti-03", start: verse1End + space2to3, end: verse1End + space2to3 * 2 });

      // Verse 4 starts at 156.8s and ends at exactly 178s (2:58)
      list.push({ verseId: "aarti-04", start: verse1End + space2to3 * 2, end: verse4End });

      // Verse 5 starts at 178s and ends at exactly 218s (3:38)
      const verse5End = 218.0;
      list.push({ verseId: "aarti-05", start: verse4End, end: verse5End });

      // Verse 6 starts at 218s and ends at the end of the track (263s)
      list.push({ verseId: "aarti-06", start: verse5End, end: duration });
    } else {
      // Standard linear division for other tracks
      const count = lyrics.length;
      const timePerVerse = duration / count;

      lyrics.forEach((verse, index) => {
        const start = index * timePerVerse;
        const end = start + timePerVerse;
        list.push({
          verseId: verse.id,
          start: parseFloat(start.toFixed(1)),
          end: parseFloat(end.toFixed(1)),
        });
      });
    }

    return list;
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = audio.currentTime;
    setCurrentTime(time);

    // Find active verse matching this timeframe
    const match = timestamps.find((ts) => time >= ts.start && time < ts.end);
    if (match && match.verseId !== activeVerseId) {
      setActiveVerseId(match.verseId);
      
      // Auto Scroll active verse card into view inside container
      if (autoScroll) {
        const element = document.getElementById(`audio-verse-${match.verseId}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isDismissed) {
      setShowMiniPlayer(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show mini-player if main player is out of view AND audio is playing/started
        setShowMiniPlayer(!entry.isIntersecting && (isPlaying || currentTime > 0));
      },
      { threshold: 0.05 }
    );

    const currentRef = playerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isPlaying, currentTime, isDismissed]);

  const handleCloseMiniPlayer = () => {
    setIsDismissed(true);
    setShowMiniPlayer(false);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isDismissed) {
      setIsDismissed(false); // Reset dismissal on manual play toggle
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleVerseClick = (start: number, verseId: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = start;
    setCurrentTime(start);
    setActiveVerseId(verseId);
    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const spd = parseFloat(e.target.value);
    setSpeed(spd);
    if (audioRef.current) {
      audioRef.current.playbackRate = spd;
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // Helper to format verse labels in the sidebar dynamically
  const getVerseLabel = (verse: any) => {
    if (activeTrackId === "track-1") {
      const isDoha = verse.id.startsWith("doha-");
      return isDoha
        ? verse.id === "doha-01"
          ? "Doha 1"
          : verse.id === "doha-02"
          ? "Doha 2"
          : "Concluding Doha"
        : `Chaupai ${verse.verse_number}`;
    } else if (activeTrackId === "track-2") {
      return `Pada ${verse.verse_number}`;
    } else {
      if (verse.id === "aarti-intro") {
        return "Mangalacharan (मंगलाचरण)";
      }
      return `Verse ${verse.verse_number}`;
    }
  };

  return (
    <>
      <div ref={playerRef} className="flex flex-col md:flex-row gap-6 border-2 border-brass-gold/30 bg-stone-ivory p-4 sm:p-6 rounded-lg shadow-sm">
      
      {/* 1. Synced Lyrics Sidebar / Display */}
      <div className="flex-1 flex flex-col h-[550px] border border-brass-gold/20 rounded bg-stone-ivory/50">
        
        {/* Sidebar Header */}
        <div className="p-3 bg-maroon-deep text-stone-ivory border-b border-brass-gold/30 flex justify-between items-center text-xs">
          <span className="font-serif-display font-bold uppercase tracking-wider">
            {activeTrackId === "track-1"
              ? "Shri Hanuman Chalisa (चालीसा पाठ)"
              : activeTrackId === "track-2"
              ? "Hanumanashtak (संकटमोचन पाठ)"
              : "Hanuman Aarti (आरती पाठ)"}
          </span>
          <label className="flex items-center gap-1.5 cursor-pointer text-[10px]">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="accent-marigold h-3 w-3"
            />
            Auto-Scroll
          </label>
        </div>

        {/* Scrollable Dynamic Verses */}
        <div
          ref={scrollContainerRef}
          className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {activeLyrics.map((verse) => {
            const ts = timestamps.find((t) => t.verseId === verse.id);
            const isHighlighted = activeVerseId === verse.id;

            return (
              <div
                key={verse.id}
                id={`audio-verse-${verse.id}`}
                onClick={() => ts && handleVerseClick(ts.start, verse.id)}
                className={`p-4 rounded border cursor-pointer transition-all duration-300 ${
                  isHighlighted
                    ? "bg-marigold/20 border-marigold shadow-sm ring-1 ring-marigold scale-[1.01]"
                    : "bg-stone-ivory border-brass-gold/10 hover:border-marigold/40"
                }`}
              >
                {/* Verse Header Info */}
                <div className="flex justify-between items-center text-[9px] uppercase font-bold text-brass-gold/80 mb-2">
                  <span>{getVerseLabel(verse)}</span>
                  {ts && (
                    <span>
                      {formatTime(ts.start)} - {formatTime(ts.end)}
                    </span>
                  )}
                </div>

                {/* Devanagari */}
                <p className={`font-hindi-display text-base sm:text-lg text-center leading-loose font-bold whitespace-pre-line ${
                  isHighlighted ? "text-maroon-deep" : "text-charcoal-brown"
                }`}>
                  {verse.devanagari}
                </p>

                {/* English Transliteration */}
                <p className="text-[10px] text-center text-charcoal-brown/50 italic mt-1 whitespace-pre-line">
                  {verse.transliteration}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Controls Panel */}
      <div className="w-full md:w-80 flex flex-col gap-6 justify-between">
        
        {/* Track Selector & Metadata */}
        <div className="space-y-4 bg-stone-ivory border border-brass-gold/20 p-4 rounded">
          <div className="space-y-1">
            <label className="block text-xs uppercase font-bold text-brass-gold">
              Recitation Voice
            </label>
            <select
              value={activeTrackId}
              onChange={(e) => setActiveTrackId(e.target.value)}
              className="w-full text-sm bg-stone-ivory border border-brass-gold/40 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
            >
              {tracks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif-display text-sm font-bold text-maroon-deep">
              {activeTrack.name}
            </h4>
            <p className="text-xs text-brass-gold font-semibold">
              Voice: {activeTrack.reciter}
            </p>
            <p className="text-xs text-charcoal-brown/70 leading-relaxed pt-1">
              {activeTrack.description}
            </p>
          </div>
        </div>

        {/* Audio Element & Controls Chrome */}
        <div className="bg-maroon-deep text-stone-ivory border-2 border-brass-gold p-4 rounded-lg shadow-md space-y-4">
          <audio
            ref={audioRef}
            src={activeTrack.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Timings Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-stone-ivory/60 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(activeTrack.duration)}</span>
            </div>
            
            {/* Progress bar */}
            <input
              type="range"
              min="0"
              max={activeTrack.duration}
              value={currentTime}
              onChange={(e) => {
                const time = parseFloat(e.target.value);
                setCurrentTime(time);
                if (audioRef.current) audioRef.current.currentTime = time;
              }}
              className="w-full h-1 bg-stone-ivory/20 rounded-lg appearance-none cursor-pointer accent-marigold"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep p-3 rounded-full border border-brass-gold shadow transition-colors flex items-center justify-center w-12 h-12"
            >
              <span className="text-lg font-bold">{isPlaying ? "⏸️" : "▶️"}</span>
            </button>

            {/* Volume */}
            <div className="flex-grow flex items-center gap-2">
              <span className="text-xs select-none">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-stone-ivory/20 rounded-lg appearance-none cursor-pointer accent-marigold"
              />
            </div>

            {/* Playback speed */}
            <div>
              <select
                value={speed}
                onChange={handleSpeedChange}
                className="bg-maroon-deep text-stone-ivory text-[10px] border border-brass-gold/40 rounded p-1 font-semibold focus:outline-none"
              >
                <option value="0.75">0.75x</option>
                <option value="1">1.0x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
              </select>
            </div>

          </div>

          <p className="text-[9px] text-stone-ivory/40 text-center uppercase tracking-widest italic pt-2 border-t border-stone-ivory/10">
            Click on any verse to jump audio directly
          </p>
        </div>

      </div>

    </div>

    {/* Floating Hover Mini-Player */}
    {showMiniPlayer && (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-maroon-deep text-stone-ivory border-t-2 border-brass-gold px-4 py-3 shadow-lg no-print flex items-center justify-between gap-4 max-w-lg mx-auto sm:bottom-4 sm:right-6 sm:left-auto sm:max-w-sm sm:rounded-lg sm:border-2">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep p-2 rounded-full border border-brass-gold shadow-sm transition-colors duration-200 flex items-center justify-center w-10 h-10 shrink-0 select-none cursor-pointer"
        >
          <span className="text-sm font-bold">{isPlaying ? "⏸️" : "▶️"}</span>
        </button>

        {/* Track info / Seek Slider */}
        <div className="flex-grow min-w-0 flex flex-col gap-1">
          <div className="flex justify-between items-center text-[10px] tracking-wider text-marigold font-bold truncate">
            <span className="truncate uppercase font-serif-display">{activeTrack.name}</span>
            <span className="font-mono text-stone-ivory/60 shrink-0 ml-2">
              {formatTime(currentTime)} / {formatTime(activeTrack.duration)}
            </span>
          </div>
          
          {/* Mini progress slider */}
          <input
            type="range"
            min="0"
            max={activeTrack.duration}
            value={currentTime}
            onChange={(e) => {
              const time = parseFloat(e.target.value);
              setCurrentTime(time);
              if (audioRef.current) audioRef.current.currentTime = time;
            }}
            className="w-full h-1 bg-stone-ivory/20 rounded-lg appearance-none cursor-pointer accent-marigold"
          />
        </div>

        {/* Close Button */}
        <button
          onClick={handleCloseMiniPlayer}
          className="text-stone-ivory/60 hover:text-stone-ivory font-bold text-lg px-2 py-1 shrink-0 transition-all duration-200 hover:scale-110 cursor-pointer"
          title="Stop and Close Player"
          aria-label="Close player"
        >
          &times;
        </button>
      </div>
    )}
  </>
  );
}
