import React from "react";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";

export function WelcomeSection() {
  return (
    <section
      id="invitation"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-[#F8F3E8] relative overflow-hidden"
    >
      {/* Delicate background ornament */}
      <div className="max-w-4xl mx-auto">
        {/* Main Printed Invitation Card Representation */}
        <div className="relative rounded-3xl bg-[#FCF9F2] border-2 border-[#B58B35]/30 p-8 sm:p-14 md:p-16 shadow-xl text-center">
          {/* Ornate Corner Accents */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#B58B35] rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#B58B35] rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#B58B35] rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#B58B35] rounded-br-lg pointer-events-none" />

          {/* Bismillah Calligraphy */}
          <div className="mb-6">
            <p
              className="font-arabic text-[#243A2D] text-3xl sm:text-4xl md:text-5xl leading-relaxed tracking-wider"
              dir="rtl"
            >
              {weddingData.bismillahArabic}
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-[#9DA78B] mt-2">
              {weddingData.bismillahEnglish}
            </p>
          </div>

          <OrnamentalDivider variant="gold" symbol="diamond" className="my-6" />

          {/* Royal Heading */}
          <div className="inline-block px-6 py-1.5 rounded-full bg-[#B58B35]/10 border border-[#B58B35]/30 mb-8">
            <span className="font-serif uppercase tracking-[0.25em] text-[#B58B35] text-xs sm:text-sm font-semibold">
              {weddingData.mainInvitationMessage.heading}
            </span>
          </div>

          {/* Couple Spotlight Presentation */}
          <div className="my-10 py-6 px-4 sm:px-8 rounded-2xl bg-white/70 border border-[#B58B35]/20 max-w-xl mx-auto shadow-xs">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#9DA78B] font-serif">
                The Groom
              </span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#243A2D]">
                {weddingData.groom.fullName}
              </p>
            </div>

            <div className="my-3 flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-[#B58B35]/40" />
              <span className="font-script text-2xl sm:text-3xl text-[#B58B35]">
                with
              </span>
              <div className="h-[1px] w-12 bg-[#B58B35]/40" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#9DA78B] font-serif">
                The Bride
              </span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#243A2D]">
                {weddingData.bride.fullName}
              </p>
            </div>
          </div>

          {/* Invitation Call to Events */}
          <p className="font-serif text-base sm:text-lg text-[#243A2D] font-medium max-w-2xl mx-auto leading-relaxed">
            {weddingData.mainInvitationMessage.eventInvite}
          </p>

          <OrnamentalDivider variant="gold" symbol="floral" className="my-8" />

          {/* Compliments badge */}
          <p className="font-serif italic text-xs sm:text-sm text-[#9DA78B] uppercase tracking-wider">
            Insha Allah
          </p>
        </div>
      </div>
    </section>
  );
}
