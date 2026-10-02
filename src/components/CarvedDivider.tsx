import React from "react";

interface CarvedDividerProps {
  className?: string;
  showIcon?: boolean;
  icon?: string;
}

export default function CarvedDivider({
  className = "",
  showIcon = true,
  icon = "🕉️",
}: CarvedDividerProps) {
  return (
    <div className={`relative flex items-center justify-center my-10 select-none ${className}`}>
      {/* Decorative double carved lines */}
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-brass-gold/30" />
      </div>
      
      {/* Center Decorative Symbol flanked by manuscript markers */}
      {showIcon && (
        <span className="relative px-4 bg-stone-ivory text-brass-gold font-serif-display font-semibold text-sm tracking-widest flex items-center gap-2">
          <span className="text-vermilion/70 text-xs">॥</span>
          <span className="filter drop-shadow-xs">{icon}</span>
          <span className="text-vermilion/70 text-xs">॥</span>
        </span>
      )}
    </div>
  );
}
