"use client";

import React from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface BackgroundMusicPlayerProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  showFloatingButton: boolean;
}

export function BackgroundMusicPlayer({
  isPlaying,
  onToggleMusic,
  showFloatingButton,
}: BackgroundMusicPlayerProps) {
  // Only show floating button once the video has completed / page is active
  if (!showFloatingButton) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 animate-fade-in">
      <button
        type="button"
        onClick={onToggleMusic}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#18281F]/90 hover:bg-[#243A2D] text-[#E5C365] border border-[#B58B35]/60 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer glow-gold"
        title={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Wave Bars */}
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 bg-[#E5C365] rounded-full animate-music-bar-1 h-2" />
              <span className="w-0.5 bg-[#E5C365] rounded-full animate-music-bar-2 h-3.5" />
              <span className="w-0.5 bg-[#E5C365] rounded-full animate-music-bar-3 h-1.5" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-[#E5C365]" />
            <span className="font-serif text-[11px] sm:text-xs uppercase tracking-wider font-semibold">
              Music Playing
            </span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-[#9DA78B]" />
            <VolumeX className="w-3.5 h-3.5 text-[#9DA78B]" />
            <span className="font-serif text-[11px] sm:text-xs uppercase tracking-wider text-[#9DA78B] font-medium">
              Music Paused
            </span>
          </>
        )}
      </button>
    </div>
  );
}
