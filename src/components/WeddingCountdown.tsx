"use client";

import React, { useState, useEffect } from "react";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import { Clock, Heart } from "lucide-react";

export function WeddingCountdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(weddingData.targetDateTimeISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: mounted && timeLeft ? timeLeft.days : 0 },
    { label: "Hours", value: mounted && timeLeft ? timeLeft.hours : 0 },
    { label: "Minutes", value: mounted && timeLeft ? timeLeft.minutes : 0 },
    { label: "Seconds", value: mounted && timeLeft ? timeLeft.seconds : 0 },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#18281F] text-[#F8F3E8] relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute inset-0 bg-dark-ornate opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B58B35]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B35]/20 border border-[#B58B35]/40 text-[#E5C365] text-xs font-serif uppercase tracking-widest mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Countdown to the Nikah</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl text-[#F8F3E8] font-bold tracking-tight mb-2">
          Waiting for the Blessed Moment
        </h2>

        <p className="font-serif italic text-sm sm:text-base text-[#9DA78B] max-w-lg mx-auto mb-6">
          Mehfil-e-Nikah commences on Wednesday, 25 November 2026 at 11:00 AM IST
        </p>

        <OrnamentalDivider variant="gold" symbol="star" className="my-4" />

        {timeLeft?.isExpired ? (
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-[#243A2D] border border-[#B58B35] max-w-lg mx-auto shadow-xl">
            <Heart className="w-8 h-8 text-[#E5C365] mx-auto mb-3 animate-pulse" />
            <h3 className="font-display text-xl sm:text-2xl text-[#E5C365] font-semibold mb-2">
              The Celebrations Have Commenced!
            </h3>
            <p className="font-serif text-sm sm:text-base text-[#F8F3E8]/90">
              Alhamdulillah, the auspicious union is underway. May Allah shower
              His eternal blessings, love, and barakah upon the couple.
            </p>
          </div>
        ) : (
          <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="relative rounded-2xl bg-[#243A2D]/80 border border-[#B58B35]/40 p-4 sm:p-6 shadow-xl backdrop-blur-sm group hover:border-[#E5C365] transition-colors"
              >
                {/* Gold corner ornaments */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#B58B35]/60" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#B58B35]/60" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#B58B35]/60" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#B58B35]/60" />

                <div className="font-display text-3xl sm:text-5xl font-bold text-[#E5C365] tracking-tight min-h-[44px] flex items-center justify-center">
                  {timeLeft === null ? (
                    <span className="opacity-40">--</span>
                  ) : (
                    String(unit.value).padStart(2, "0")
                  )}
                </div>

                <div className="font-serif text-[11px] sm:text-xs uppercase tracking-widest text-[#9DA78B] mt-2 font-semibold">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="font-serif text-xs text-[#9DA78B] tracking-wider uppercase mt-4">
          Timezone: Indian Standard Time (IST) · Mangalore, Karnataka
        </p>
      </div>
    </section>
  );
}
