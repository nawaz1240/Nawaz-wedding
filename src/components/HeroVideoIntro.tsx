"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { weddingData } from "@/data/wedding";
import {
  Play,
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface HeroVideoIntroProps {
  isActive: boolean;
  onComplete: () => void;
  onStartMusic?: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

export function HeroVideoIntro({
  isActive,
  onComplete,
  onStartMusic,
  isMusicPlaying = false,
  onToggleMusic,
}: HeroVideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger celebration confetti
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#B58B35", "#D8B25E", "#D98CA2", "#F8F3E8", "#243A2D"],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
  }, []);

  // Complete and transition to page content
  const handleFinish = useCallback(() => {
    triggerConfetti();
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
      setIsFadingOut(false);
      setHasStartedPlaying(false);
    }, 800);
  }, [triggerConfetti, onComplete]);

  // Handle video end
  const handleEnded = useCallback(() => {
    handleFinish();
  }, [handleFinish]);

  // Reset when activated
  useEffect(() => {
    if (!isActive) return;

    setIsFadingOut(false);
    setHasStartedPlaying(false);
    setIsPlaying(false);
    setCurrentTime(0);

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  // Start playing on user tap/click anywhere
  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasStartedPlaying(true);
    video.currentTime = 0;
    video.muted = true; // Video's own entrance audio is removed/muted

    video
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    // Start full landing page wedding song from first tap
    onStartMusic?.();
  };

  // Screen tap handler
  const handleScreenClick = () => {
    // If not started yet, any click/tap starts the video & wedding song
    if (!hasStartedPlaying) {
      startPlayback();
    }
    // Once started, no pause allowed — plays continuously
  };

  // Auto-hide controls after inactivity
  const handleMouseMove = () => {
    if (!hasStartedPlaying) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMusic?.();
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
      setIsFadingOut(false);
      setHasStartedPlaying(false);
    }, 500);
  };

  if (!isActive) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full Screen Wedding Video Presentation"
      onClick={handleScreenClick}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-50 w-full h-[100dvh] bg-black overflow-hidden select-none cursor-pointer transition-opacity duration-1000 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 100% Full-Screen Edge-to-Edge Video — Video muted, entrance song replaced by full wedding song */}
      <video
        ref={videoRef}
        src="/images/gemini_generated_video_03cf4159.mp4"
        playsInline
        preload="auto"
        muted
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration || 10);
          }
        }}
        onEnded={handleEnded}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* BEFORE PLAYING: Royal 'Tap Anywhere to Play' Experience */}
      {!hasStartedPlaying && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-between p-6 sm:p-8 bg-black/50 backdrop-blur-xs transition-opacity duration-500">
          {/* Top skip option */}
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-[#E5C365] border border-[#B58B35]/50 text-[11px] sm:text-xs font-serif uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              <span>Skip to Suite</span>
              <ArrowRight className="w-3 h-3 text-[#E5C365]" />
            </button>
          </div>

          {/* Central Royal Medallion & Call to Action */}
          <div className="flex flex-col items-center text-center max-w-sm sm:max-w-md mx-auto my-auto animate-fade-in">
            {/* Bismillah in Arabic Calligraphy */}
            <p className="font-arabic text-[#E5C365] text-lg sm:text-2xl leading-relaxed mb-1" dir="rtl">
              {weddingData.bismillahArabic}
            </p>

            {/* Couple's Names */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md">
              {weddingData.bride.shortName} &amp; {weddingData.groom.shortName}
            </h1>
            <p className="font-serif text-xs uppercase tracking-widest text-[#E5C365] mt-1 mb-6">
              Wedding Invitation
            </p>

            {/* Pulsing Gold Play Button */}
            <div className="relative group my-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[#B58B35] via-[#E5C365] to-[#B58B35] text-[#18281F] flex items-center justify-center shadow-2xl glow-gold animate-bounce transition-transform group-hover:scale-110 active:scale-95">
                <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-[#18281F] text-[#18281F] ml-1.5" />
              </div>
            </div>

            {/* Tap Prompt with Sparkles */}
            <div className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#18281F]/80 border border-[#B58B35]/60 text-[#E5C365] text-xs sm:text-sm font-serif uppercase tracking-wider shadow-lg animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C365]" />
              <span className="font-semibold">Tap anywhere to play</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E5C365]" />
            </div>
          </div>

          {/* Bottom hint */}
          <div className="w-full text-center">
            <p className="text-[10px] sm:text-xs font-serif text-white/70 tracking-widest uppercase">
              Music will play · Touch anywhere on screen
            </p>
          </div>
        </div>
      )}

      {/* DURING PLAYBACK: Floating minimal overlays */}
      {hasStartedPlaying && (
        <>
          {/* Top-Right Enter Suite Button */}
          <div
            className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-30 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-[#E5C365] border border-[#B58B35]/60 shadow-xl text-xs sm:text-sm font-serif font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              <span>Enter Suite</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5C365]" />
            </button>
          </div>

          {/* Bottom Floating Minimal Sound Control (controls wedding background music) */}
          <div
            className={`absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-30 flex items-center justify-between text-white transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xl">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMusicPlaying ? "Mute music" : "Play music"}
                className="p-1 rounded-full hover:bg-white/10 text-[#E5C365] transition-colors cursor-pointer"
              >
                {!isMusicPlaying ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Slim Progress Line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
            <div
              className="h-full bg-gradient-to-r from-[#B58B35] to-[#E5C365] transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
