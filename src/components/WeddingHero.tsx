import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import { Calendar, MapPin, Sparkles, ChevronDown, Play } from "lucide-react";

interface WeddingHeroProps {
  onOpenVideo?: () => void;
}

export function WeddingHero({ onOpenVideo }: WeddingHeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 bg-arabesque-pattern overflow-hidden text-center"
    >
      {/* Soft warm light bloom and decorative background aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-full rounded-full bg-gradient-to-b from-[#B58B35]/10 via-[#9DA78B]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Decorative Ornate Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#B58B35]/40 rounded-tl-xl pointer-events-none hidden sm:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#B58B35]/40 rounded-tr-xl pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram Crest */}
        <div className="mb-4 inline-flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#B58B35] bg-[#F8F3E8] shadow-md flex items-center justify-center p-1.5 glow-gold">
            <div className="w-full h-full rounded-full border border-[#B58B35]/40 flex flex-col items-center justify-center">
              <span className="font-display text-[#B58B35] text-base sm:text-lg font-bold tracking-widest">
                {weddingData.monogram}
              </span>
            </div>
          </div>
        </div>

        {/* Traditional Bismillah in Arabic Calligraphy */}
        <p
          className="font-arabic text-[#243A2D] text-2xl sm:text-3xl leading-relaxed tracking-wider mb-2"
          dir="rtl"
        >
          {weddingData.bismillahArabic}
        </p>

        {/* Welcome Blessing Intro */}
        <p className="font-serif italic text-sm sm:text-base text-[#5E5A4F] max-w-md mx-auto mb-3">
          By the blessings of Allah, we invite you to celebrate with us
        </p>

        <OrnamentalDivider variant="gold" symbol="floral" className="my-1" />

        {/* Couple Names — Editorial Luxury Presentation */}
        <div className="my-4 space-y-1 sm:space-y-2">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#243A2D] font-bold tracking-tight">
            {weddingData.groom.fullName}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 sm:w-16 bg-[#B58B35]/50" />
            <span className="font-script text-3xl sm:text-4xl text-[#B58B35] px-2">
              weds
            </span>
            <div className="h-[1px] w-12 sm:w-16 bg-[#B58B35]/50" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#243A2D] font-bold tracking-tight">
            {weddingData.bride.fullName}
          </h2>
        </div>

        {/* Wedding Artwork Presentation Card */}
        <div className="my-8 relative group max-w-md sm:max-w-lg w-full">
          {/* Ornate Gold Outer Arch Frame */}
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#E5C365]/30 via-[#B58B35]/20 to-[#243A2D]/10 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden border border-[#B58B35]/50 bg-white aspect-[3/2] shadow-inner">
              <Image
                src="/images/wedding-artwork.png"
                alt="Noushad Mohammed & Asma Thashreefa Illustrated Wedding Artwork"
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 500px, 600px"
                className="object-contain object-center transform group-hover:scale-102 transition-transform duration-700"
              />
            </div>
            {/* Fine Caption Tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#243A2D] text-[#E5C365] border border-[#B58B35] shadow-md text-[11px] font-serif uppercase tracking-widest whitespace-nowrap">
              Celebration of Love
            </div>
          </div>
        </div>

        {/* Date, Islamic Date & Location Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#B58B35]/30 shadow-xs text-xs sm:text-sm font-serif text-[#243A2D]">
            <Calendar className="w-4 h-4 text-[#B58B35]" />
            <span className="font-semibold">{weddingData.dateSummary}</span>
            {weddingData.islamicDateSummary && (
              <>
                <span className="text-[#9DA78B]">|</span>
                <span className="text-[#5E5A4F]">{weddingData.islamicDateSummary}</span>
              </>
            )}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#B58B35]/30 shadow-xs text-xs sm:text-sm font-serif text-[#243A2D]">
            <MapPin className="w-4 h-4 text-[#B58B35]" />
            <span className="font-semibold">{weddingData.locationSummary}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#celebrations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#243A2D] hover:bg-[#18281F] text-[#F8F3E8] font-serif font-medium text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 hover:scale-103"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5C365]" />
            <span>Event Celebrations</span>
          </a>

          <a
            href="#venue"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-[#B58B35]/10 text-[#243A2D] border border-[#B58B35] font-serif font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
          >
            <MapPin className="w-3.5 h-3.5 text-[#B58B35]" />
            <span>Venue &amp; Directions</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-[10px] font-serif uppercase tracking-widest text-[#B58B35]">
            Scroll to Invitation
          </span>
          <ChevronDown className="w-4 h-4 text-[#B58B35] mt-1" />
        </div>
      </div>
    </section>
  );
}
