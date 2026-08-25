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
    <div className={`relative flex items-center justify-center my-8 ${className}`}>
      {/* Decorative double carved lines */}
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-double border-brass-gold/50" />
      </div>
      
      {/* Center Decorative Symbol */}
      {showIcon && (
        <span className="relative px-4 bg-stone-ivory text-brass-gold font-bold text-lg select-none filter drop-shadow">
          {icon}
        </span>
      )}
    </div>
  );
}
