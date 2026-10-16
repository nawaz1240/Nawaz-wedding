import React from "react";

interface OrnamentalDividerProps {
  className?: string;
  variant?: "gold" | "sage" | "forest";
  symbol?: "crescent" | "floral" | "star" | "diamond";
}

export function OrnamentalDivider({
  className = "",
  variant = "gold",
  symbol = "floral",
}: OrnamentalDividerProps) {
  const colorMap = {
    gold: "text-[#B58B35]",
    sage: "text-[#9DA78B]",
    forest: "text-[#243A2D]",
  };

  const strokeMap = {
    gold: "#B58B35",
    sage: "#9DA78B",
    forest: "#243A2D",
  };

  const strokeColor = strokeMap[variant];

  return (
    <div
      className={`flex items-center justify-center gap-3 my-4 ${className}`}
      aria-hidden="true"
    >
      {/* Left ornamental flourish line */}
      <div className="flex items-center flex-1 max-w-[120px] sm:max-w-[160px]">
        <div
          className="h-[1px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${strokeColor} 100%)`,
          }}
        />
        <div
          className="w-1.5 h-1.5 rotate-45 shrink-0"
          style={{ backgroundColor: strokeColor }}
        />
      </div>

      {/* Center symbol */}
      <div className={`shrink-0 ${colorMap[variant]}`}>
        {symbol === "floral" && (
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C12 2 13.5 6 16 7C18.5 8 22 8 22 8C22 8 19 10.5 18 13C17 15.5 18 19 18 19C18 19 14.5 17.5 12 18C9.5 17.5 6 19 6 19C6 19 7 15.5 6 13C5 10.5 2 8 2 8C2 8 5.5 8 8 7C10.5 6 12 2 12 2Z" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        )}
        {symbol === "crescent" && (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8A9.006 9.006 0 0 0 12 3z" />
          </svg>
        )}
        {symbol === "diamond" && (
          <div className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rotate-45 inline-block opacity-60"
              style={{ backgroundColor: strokeColor }}
            />
            <span
              className="w-2.5 h-2.5 rotate-45 inline-block"
              style={{ backgroundColor: strokeColor }}
            />
            <span
              className="w-1.5 h-1.5 rotate-45 inline-block opacity-60"
              style={{ backgroundColor: strokeColor }}
            />
          </div>
        )}
        {symbol === "star" && (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </div>

      {/* Right ornamental flourish line */}
      <div className="flex items-center flex-1 max-w-[120px] sm:max-w-[160px]">
        <div
          className="w-1.5 h-1.5 rotate-45 shrink-0"
          style={{ backgroundColor: strokeColor }}
        />
        <div
          className="h-[1px] w-full"
          style={{
            background: `linear-gradient(90deg, ${strokeColor} 0%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}
