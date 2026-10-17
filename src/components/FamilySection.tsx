import React from "react";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import { Users } from "lucide-react";

export function FamilySection() {
  const { bride, groom } = weddingData.families;

  return (
    <section id="families" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FCF9F2] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif uppercase tracking-[0.2em] text-[#B58B35] text-xs sm:text-sm font-semibold">
            Honoured Lineage
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#243A2D] font-bold tracking-tight mt-2 mb-3">
            Our Respected Families
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#5E5A4F]">
            With deep reverence to our elders and profound gratitude to the Almighty, our families join in celebrating this sacred union.
          </p>
          <OrnamentalDivider variant="gold" symbol="diamond" className="mt-4" />
        </div>

        {/* Two Columns Grid: Bride & Groom Families */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Bride's Family Card */}
          <div className="relative rounded-3xl bg-white border-2 border-[#B58B35]/30 p-8 sm:p-10 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            {/* Top Ornamental Badge */}
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#B58B35]/20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9DA78B]/20 text-[#243A2D] font-serif text-xs font-semibold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-[#B58B35]" />
                  <span>{bride.title}</span>
                </div>
                <span className="text-xs font-serif text-[#B58B35] tracking-widest uppercase font-semibold">
                  Mangalore
                </span>
              </div>

              {/* Candidate Info */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#9DA78B] font-serif block">
                  The Bride
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#243A2D] mt-1">
                  {bride.candidateName}
                </h3>
              </div>

              {/* Family Lineage Details */}
              <div className="space-y-4 font-serif text-sm sm:text-base text-[#302E27]">
                <div className="p-3.5 rounded-xl bg-[#F8F3E8] border border-[#B58B35]/20">
                  <span className="text-xs uppercase tracking-wider text-[#9DA78B] block font-semibold">
                    Daughter of
                  </span>
                  <p className="font-display text-base font-semibold text-[#243A2D] mt-0.5">
                    {bride.fatherInfo.replace("Daughter of ", "")}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Groom's Family Card */}
          <div className="relative rounded-3xl bg-white border-2 border-[#B58B35]/30 p-8 sm:p-10 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            {/* Top Ornamental Badge */}
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#B58B35]/20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9DA78B]/20 text-[#243A2D] font-serif text-xs font-semibold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-[#B58B35]" />
                  <span>{groom.title}</span>
                </div>
                <span className="text-xs font-serif text-[#B58B35] tracking-widest uppercase font-semibold">
                  Mangalore
                </span>
              </div>

              {/* Candidate Info */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#9DA78B] font-serif block">
                  The Groom
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#243A2D] mt-1">
                  {groom.candidateName}
                </h3>
              </div>

              {/* Family Lineage Details */}
              <div className="space-y-4 font-serif text-sm sm:text-base text-[#302E27]">
                <div className="p-3.5 rounded-xl bg-[#F8F3E8] border border-[#B58B35]/20">
                  <span className="text-xs uppercase tracking-wider text-[#9DA78B] block font-semibold">
                    Son of
                  </span>
                  <p className="font-display text-base font-semibold text-[#243A2D] mt-0.5">
                    {groom.relationshipTitle.replace("Son of ", "")}
                  </p>
                </div>
              </div>
            </div>

            {/* Insha Allah footer note */}
            <div className="mt-8 pt-4 border-t border-[#B58B35]/20 text-center">
              <p className="font-serif italic text-xs sm:text-sm text-[#82611E] font-medium">
                Solaced by the grace and blessings of Almighty Allah
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
