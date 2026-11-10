"use client";

import React, { useState } from "react";
import { DEVOTIONAL_STORIES, type DevotionalStory } from "../data/stories";
import StoryViewer from "./StoryViewer";

export default function StoryHighlights() {
  const [selectedStorySlug, setSelectedStorySlug] = useState<string | null>(null);

  const openStory = (slug: string) => {
    setSelectedStorySlug(slug);
  };

  const closeStory = () => {
    setSelectedStorySlug(null);
  };

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6" aria-label="Devotional Story Highlights">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <h2 className="font-serif-display text-base sm:text-lg font-bold text-[#4A1216] tracking-wide leading-none">
                Devotional Stories & Highlights
              </h2>
              <span className="font-hindi-display text-xs text-[#C95716] font-semibold">
                दैनिक प्रेरक कथाएं एवं रहस्य
              </span>
            </div>
          </div>

          <a
            href="/stories"
            className="text-xs font-bold text-[#C95716] hover:text-[#E87524] transition-colors flex items-center gap-1"
          >
            <span>View All Stories</span>
            <span>→</span>
          </a>
        </div>

        {/* Horizontal Scrolling Circular Highlights Track */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 scrollbar-none scroll-smooth">
          {DEVOTIONAL_STORIES.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => openStory(story.slug)}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87524] rounded-xl p-1"
              aria-label={`Open devotional story: ${story.title}`}
            >
              {/* Instagram-style Gradient Ring Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#C95716] via-[#E87524] to-[#C9A45C] group-hover:scale-108 transition-transform duration-300 shadow-md">
                <div className="w-full h-full rounded-full bg-[#FFF9F0] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4A1216] to-[#6B1E23] flex items-center justify-center text-2xl sm:text-3xl text-white shadow-inner">
                    {story.coverIcon || "🕉️"}
                  </div>
                </div>
              </div>

              {/* Story Title & Hindi Subtitle */}
              <div className="text-center w-20 sm:w-24">
                <span className="font-serif-display text-xs font-bold text-[#34251D] group-hover:text-[#E87524] transition-colors line-clamp-1 block leading-tight">
                  {story.title}
                </span>
                <span className="font-hindi-display text-[10px] text-[#C95716] font-semibold line-clamp-1 block mt-0.5">
                  {story.hindiTitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Modal Story Viewer */}
      {selectedStorySlug && (
        <StoryViewer
          stories={DEVOTIONAL_STORIES}
          initialStorySlug={selectedStorySlug}
          isOpen={true}
          onClose={closeStory}
        />
      )}
    </>
  );
}
