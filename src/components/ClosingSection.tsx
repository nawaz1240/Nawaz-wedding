"use client";

import React from "react";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import { ArrowUp, RotateCcw, Heart, Sparkles, MessageCircle } from "lucide-react";

interface ClosingSectionProps {
  onReplayIntro?: () => void;
}

export function ClosingSection({ onReplayIntro }: ClosingSectionProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { closing } = weddingData;

  return (
    <footer className="py-24 sm:py-32 px-4 sm:px-6 bg-[#18281F] text-[#F8F3E8] relative overflow-hidden text-center">
      {/* Background ambient lighting and ornate pattern */}
      <div className="absolute inset-0 bg-dark-ornate opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-80 bg-gradient-to-t from-[#B58B35]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram Medallion */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#B58B35] bg-[#243A2D] flex items-center justify-center p-1 mb-6 glow-gold">
          <span className="font-display text-[#E5C365] text-base sm:text-lg font-bold tracking-wider whitespace-nowrap">
            {weddingData.monogram}
          </span>
        </div>

        {/* Closing Title */}
        <span className="font-serif uppercase tracking-[0.25em] text-[#E5C365] text-xs sm:text-sm font-semibold mb-3">
          {closing.title}
        </span>

        {/* Sacred Sunnah Dua */}
        <div className="my-4 px-4 py-3 rounded-2xl bg-[#243A2D]/80 border border-[#B58B35]/40 max-w-xl mx-auto">
          <p
            className="font-arabic text-[#E5C365] text-2xl sm:text-3xl leading-relaxed tracking-wide"
            dir="rtl"
          >
            {closing.duaArabic}
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-[#9DA78B] mt-2">
            {closing.duaTranslation}
          </p>
        </div>

        <OrnamentalDivider variant="gold" symbol="floral" className="my-6" />

        {/* Personal Appreciation Note */}
        <p className="font-serif text-base sm:text-lg text-[#F8F3E8]/90 max-w-xl mx-auto leading-relaxed mb-6">
          {closing.message}
        </p>

        {/* Couple's Signature */}
        <div className="my-4">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#E5C365]">
            {weddingData.groom.fullName} &amp; {weddingData.bride.fullName}
          </h3>
          <p className="font-serif text-xs uppercase tracking-widest text-[#9DA78B] mt-1">
            {weddingData.dateSummary} · Mangalore, Karnataka
          </p>
        </div>

        {/* Compliments Section */}
        <div className="my-6 space-y-1">
          <p className="font-serif text-sm sm:text-base text-[#F8F3E8]/90 font-medium">
            {closing.compliments}
          </p>
          {closing.sbtFamilyCompliments && (
            <p className="font-serif text-xs sm:text-sm text-[#E5C365] tracking-wider uppercase font-semibold">
              {closing.sbtFamilyCompliments}
            </p>
          )}
        </div>

        <OrnamentalDivider variant="gold" symbol="diamond" className="my-6" />

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          {/* Scroll to Top Button */}
          <button
            type="button"
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#243A2D] hover:bg-[#2e4a38] text-[#F8F3E8] border border-[#B58B35]/40 font-serif text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:scale-103"
          >
            <ArrowUp className="w-4 h-4 text-[#E5C365]" />
            <span>Back to Top</span>
          </button>

          {/* Replay Cinematic Opening */}
          {onReplayIntro && (
            <button
              type="button"
              id="replay-intro-btn"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-[#B58B35]/15 text-[#E5C365] border border-[#B58B35] font-serif text-xs uppercase tracking-wider font-semibold transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 text-[#E5C365]" />
              <span>Watch Video Invitation</span>
            </button>
          )}
        </div>

        <div className="mt-14 pt-8 border-t border-[#B58B35]/20 text-center text-xs font-serif text-[#9DA78B] space-y-3.5">
          <p className="flex items-center justify-center gap-1.5">
            <span>Crafted with reverence &amp; barakah</span>
            <Heart className="w-3.5 h-3.5 text-[#D98CA2] fill-[#D98CA2]" />
            <span>for Noushad &amp; Asma</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
