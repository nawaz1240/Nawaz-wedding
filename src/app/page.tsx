"use client";

import React, { useState, useRef } from "react";
import { HeroVideoIntro } from "@/components/HeroVideoIntro";
import { SiteNavigation } from "@/components/SiteNavigation";
import { WeddingHero } from "@/components/WeddingHero";
import { WelcomeSection } from "@/components/WelcomeSection";
import { WeddingEvents } from "@/components/WeddingEvents";
import { WeddingCountdown } from "@/components/WeddingCountdown";
import { ScratchToReveal } from "@/components/ScratchToReveal";
import { FamilySection } from "@/components/FamilySection";
import { VenueSection } from "@/components/VenueSection";
import { ShareInvitation } from "@/components/ShareInvitation";
import { ClosingSection } from "@/components/ClosingSection";
import { BackgroundMusicPlayer } from "@/components/BackgroundMusicPlayer";
import { FallingRainParticles } from "@/components/FallingRainParticles";

export default function WeddingPage() {
  // Full-screen video shows first when the user lands on the site
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Start the full wedding song from the very first tap/interaction
  const handleStartMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch(() => {
        setIsMusicPlaying(false);
      });
  };

  // Toggle music playback
  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(() => {
          setIsMusicPlaying(false);
        });
    }
  };

  const handleVideoComplete = () => {
    setIsVideoActive(false);
    // Song continues seamlessly into the page!
  };

  const handleReplayVideo = () => {
    setIsVideoActive(true);
  };

  return (
    <main className="min-h-screen bg-[#F8F3E8] relative selection:bg-[#B58B35]/20 selection:text-[#243A2D]">
      {/* Background Wedding Music Audio Element — Plays seamlessly throughout */}
      <audio
        ref={audioRef}
        src="/audio/wedding-bg-music.mp3"
        loop
        preload="auto"
      />

      {/* Full-Screen Video Presentation — Video muted, entrance song replaced by full wedding song */}
      <HeroVideoIntro
        isActive={isVideoActive}
        onComplete={handleVideoComplete}
        onStartMusic={handleStartMusic}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Dreamy Falling Snow & Gold Petal Rain Effect */}
      <FallingRainParticles />

      {/* Main Site Header Navigation */}
      <SiteNavigation
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Hero Presentation with Couple Artwork */}
      <WeddingHero />

      {/* Welcome Card & Grandmother's Invitation */}
      <WelcomeSection />

      {/* Wedding Events: Nikah & Valima */}
      <WeddingEvents />

      {/* Live Countdown to Nikah */}
      <WeddingCountdown />

      {/* Interactive Scratch to Reveal Couple Card */}
      <ScratchToReveal />

      {/* Respected Lineage & Family Details */}
      <FamilySection />

      {/* Venues & Google Maps Directions */}
      <VenueSection />

      {/* WhatsApp Sharing & QR Code Section */}
      <ShareInvitation
        isModalOpen={isShareModalOpen}
        onCloseModal={() => setIsShareModalOpen(false)}
      />

      {/* Closing Sunnah Dua & Family Gratitude */}
      <ClosingSection
        onReplayIntro={handleReplayVideo}
      />

      {/* Floating Background Music Player Pill — Shows after entering suite, controls the ongoing song */}
      <BackgroundMusicPlayer
        isPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        showFloatingButton={!isVideoActive}
      />
    </main>
  );
}
