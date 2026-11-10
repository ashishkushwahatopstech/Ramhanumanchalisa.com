"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { DevotionalStory } from "../data/stories";

interface StoryViewerProps {
  stories: DevotionalStory[];
  initialStorySlug?: string;
  isOpen?: boolean;
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export default function StoryViewer({
  stories,
  initialStorySlug,
  isOpen = true,
  onClose,
  isStandalonePage = false,
}: StoryViewerProps) {
  const publishedStories = stories.filter((s) => s.published);
  const initialIndex = Math.max(
    0,
    publishedStories.findIndex((s) => s.slug === initialStorySlug)
  );

  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [copied, setCopied] = useState(false);

  const currentStory = publishedStories[currentStoryIndex] || publishedStories[0];
  const slides = currentStory?.slides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const SLIDE_DURATION = 6500; // 6.5s per slide

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else if (currentStoryIndex < publishedStories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setCurrentSlideIndex(0);
      setProgress(0);
    } else {
      // Reached end of all stories
      if (onClose) onClose();
      else {
        setCurrentStoryIndex(0);
        setCurrentSlideIndex(0);
        setProgress(0);
      }
    }
  }, [currentSlideIndex, slides.length, currentStoryIndex, publishedStories.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    } else if (currentStoryIndex > 0) {
      const prevStory = publishedStories[currentStoryIndex - 1];
      setCurrentStoryIndex((prev) => prev - 1);
      setCurrentSlideIndex(prevStory.slides.length - 1);
      setProgress(0);
    }
  }, [currentSlideIndex, currentStoryIndex, publishedStories]);

  // Timer loop for auto-advancing slides
  useEffect(() => {
    if (isPaused || !isOpen || !currentSlide) return;

    const intervalTime = 50;
    const increment = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, isOpen, currentSlideIndex, currentStoryIndex, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape" && onClose) {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // WhatsApp Share
  const handleWhatsAppShare = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/stories/${currentStory.slug}` : `https://ramhanumanchalisa.com/stories/${currentStory.slug}`;
    const text = `🚩 Devotional Story: "${currentStory.title}" (${currentStory.hindiTitle})\n\n"${currentSlide.text}"\n\nRead on RamHanumanChalisa.com:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Copy Link / Native Share
  const handleShareStory = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/stories/${currentStory.slug}` : `https://ramhanumanchalisa.com/stories/${currentStory.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentStory.title,
          text: currentSlide.text,
          url: url,
        });
        return;
      } catch (err) {
        // Fallback to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  if (!isOpen || !currentStory || !currentSlide) return null;

  return (
    <div
      className={
        isStandalonePage
          ? "w-full max-w-md mx-auto my-6"
          : "fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4"
      }
      role="dialog"
      aria-modal={!isStandalonePage}
      aria-label="Devotional Stories Viewer"
    >
      {/* 9:16 Aspect Ratio Card Container */}
      <div
        className="relative w-full max-w-[420px] h-[90vh] max-h-[820px] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between select-none border-2 border-[#C9A45C]"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Dynamic Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            currentSlide.bgGradient || "from-[#4A1216] via-[#6B1E23] to-[#2B1B12]"
          } opacity-95 transition-all duration-700`}
        />

        {/* Ambient Overlay Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,117,36,0.15),_transparent_70%)] pointer-events-none" />

        {/* TOP SECTION: Progress bars & Header info */}
        <div className="relative z-20 p-4 pt-3 space-y-3 bg-gradient-to-b from-black/60 to-transparent">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 w-full">
            {slides.map((_, idx) => {
              let fillPercent = 0;
              if (idx < currentSlideIndex) fillPercent = 100;
              else if (idx === currentSlideIndex) fillPercent = progress;

              return (
                <div
                  key={idx}
                  className="h-1 flex-1 bg-white/25 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlideIndex(idx);
                    setProgress(0);
                  }}
                >
                  <div
                    className="h-full bg-[#E8A33D] rounded-full transition-all ease-linear"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Story Meta Header */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#C95716] border border-[#C9A45C] flex items-center justify-center text-sm shadow-xs">
                {currentStory.coverIcon || "🕉️"}
              </span>
              <div>
                <h3 className="font-serif-display text-sm font-bold tracking-wide text-white drop-shadow leading-tight">
                  {currentStory.title}
                </h3>
                <span className="font-hindi-display text-xs text-[#E8A33D] block leading-tight">
                  {currentStory.hindiTitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused((prev) => !prev);
                }}
                className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/90 transition-colors"
                title={isPaused ? "Play story" : "Pause story"}
                aria-label={isPaused ? "Play story" : "Pause story"}
              >
                {isPaused ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>

              {/* Close Button (if inside modal) */}
              {onClose && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                  aria-label="Close story viewer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Tap zones & Divine Verse Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-4 text-white">
          {/* Transparent Tap Zones (Left 35% for Prev, Right 65% for Next) */}
          <div
            className="absolute inset-y-0 left-0 w-[35%] z-20 cursor-pointer"
            onClick={handlePrev}
            title="Previous slide"
          />
          <div
            className="absolute inset-y-0 right-0 w-[65%] z-20 cursor-pointer"
            onClick={handleNext}
            title="Next slide"
          />

          {/* Slide Content */}
          <div className="relative z-10 space-y-4 pointer-events-none">
            {currentSlide.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E87524]/20 border border-[#C9A45C] text-[#E8A33D]">
                {currentSlide.badge}
              </span>
            )}

            <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-white drop-shadow-md leading-tight">
              {currentSlide.title}
            </h4>

            {/* Sacred Verse Highlight Box */}
            {currentSlide.verse && (
              <div className="p-4 rounded-xl bg-black/35 border border-[#C9A45C]/60 text-center space-y-2 backdrop-blur-xs">
                <p className="font-hindi-display text-lg sm:text-xl text-[#E8A33D] font-bold leading-relaxed">
                  {currentSlide.verse}
                </p>
                {currentSlide.verseMeaning && (
                  <p className="font-sans text-xs sm:text-sm text-stone-200/90 leading-relaxed italic">
                    "{currentSlide.verseMeaning}"
                  </p>
                )}
              </div>
            )}

            {/* Narrative Explanation Text */}
            <p className="font-sans text-sm sm:text-base text-stone-100/95 leading-relaxed drop-shadow">
              {currentSlide.text}
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: Share, Actions & Related Article CTA */}
        <div className="relative z-20 p-4 pb-5 space-y-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {/* Related Full Article CTA */}
          {currentStory.relatedUrl && (
            <a
              href={currentStory.relatedUrl}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C95716] hover:bg-[#E87524] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase border border-[#C9A45C] shadow-lg transition-all"
            >
              <span>{currentStory.relatedLabel || "Read Full Scripture"}</span>
              <span>→</span>
            </a>
          )}

          {/* Social Share Bar */}
          <div className="flex items-center justify-between text-xs text-white/90 pt-1">
            <span className="text-[11px] text-[#C9A45C]">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>

            <div className="flex items-center gap-2">
              {/* WhatsApp Share Button */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-transform hover:scale-105 shadow-sm"
                title="Share to WhatsApp"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </button>

              {/* Copy Link / Share Button */}
              <button
                type="button"
                onClick={handleShareStory}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors"
                title="Share or copy story link"
              >
                <span>🔗</span>
                <span>{copied ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
