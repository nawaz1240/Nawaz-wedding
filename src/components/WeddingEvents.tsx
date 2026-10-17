"use client";

import React, { useState } from "react";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Utensils,
  Copy,
  Check,
  CalendarPlus,
} from "lucide-react";

export function WeddingEvents() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const createGoogleCalendarLink = (event: (typeof weddingData.events)[0]) => {
    // Nikah: 2026-11-25T11:00:00+05:30 -> UTC: 20261125T053000Z
    const dates = "20261125T053000Z/20261125T093000Z";

    const title = encodeURIComponent(
      `${event.name} — Noushad Mohammed & Asma Thashreefa`
    );
    const details = encodeURIComponent(
      `${event.name}\nDate: ${event.date}\nTime: ${event.time}\n${
        event.lunchDetail ? event.lunchDetail + "\n" : ""
      }Venue: ${event.venue}, ${event.address}, ${event.city}, ${event.state}`
    );
    const location = encodeURIComponent(
      `${event.venue}, ${event.address}, ${event.city}, ${event.state}, India`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section id="celebrations" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#F8F3E8] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif uppercase tracking-[0.2em] text-[#B58B35] text-xs sm:text-sm font-semibold">
            Wedding Programme
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#243A2D] font-bold tracking-tight mt-2 mb-3">
            Auspicious Celebrations
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#5E5A4F]">
            We cordially invite you and your family to grace this auspicious occasion with your esteemed presence and heartfelt prayers.
          </p>
          <OrnamentalDivider variant="gold" symbol="floral" className="mt-4" />
        </div>

        {/* Two Event Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:gap-10 max-w-2xl mx-auto">
          {weddingData.events.map((event, index) => {
            const isNikah = event.id === "nikah";
            const fullAddress = `${event.venue}, ${event.address}, ${event.city}, ${event.state}, India`;

            return (
              <div
                key={event.id}
                className="relative rounded-3xl bg-white border-2 border-[#B58B35]/40 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Top Islamic Arch Header Banner */}
                <div
                  className={`p-6 sm:p-8 text-center text-white relative ${
                    isNikah
                      ? "bg-gradient-to-br from-[#18281F] via-[#243A2D] to-[#16241B]"
                      : "bg-gradient-to-br from-[#2E4B3A] via-[#243A2D] to-[#18281F]"
                  }`}
                >
                  {/* Subtle corner flourish */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#E5C365]/50 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#E5C365]/50 pointer-events-none" />

                  {/* Badge */}
                  <div className="inline-block px-4 py-1 rounded-full bg-[#B58B35]/30 border border-[#E5C365]/40 text-[#E5C365] text-xs font-serif uppercase tracking-widest font-semibold mb-3">
                    Event · {event.badge}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-[#F8F3E8] font-bold tracking-tight">
                    {event.name}
                  </h3>

                  <p className="font-serif italic text-xs sm:text-sm text-[#9DA78B] mt-1">
                    {event.subTitle}
                  </p>
                </div>

                {/* Event Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 bg-radial-gradient">
                  {/* Date & Islamic Date */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#B58B35]/15 border border-[#B58B35]/40 flex items-center justify-center shrink-0 text-[#B58B35]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-serif uppercase tracking-wider text-[#9DA78B] font-semibold block">
                        Date &amp; Day
                      </span>
                      <p className="font-display text-lg sm:text-xl font-bold text-[#243A2D]">
                        {event.date}
                      </p>
                      {event.islamicDate && (
                        <p className="font-serif text-xs sm:text-sm text-[#B58B35] font-medium mt-0.5">
                          {event.islamicDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Timing & Lunch */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#B58B35]/15 border border-[#B58B35]/40 flex items-center justify-center shrink-0 text-[#B58B35]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-serif uppercase tracking-wider text-[#9DA78B] font-semibold block">
                        Ceremony Time
                      </span>
                      <p className="font-display text-lg sm:text-xl font-bold text-[#243A2D]">
                        {event.time}
                      </p>
                      {event.lunchDetail && (
                        <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-md bg-[#9DA78B]/20 text-[#243A2D] text-xs font-serif font-medium">
                          <Utensils className="w-3 h-3 text-[#B58B35]" />
                          <span>{event.lunchDetail}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Venue & Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#B58B35]/15 border border-[#B58B35]/40 flex items-center justify-center shrink-0 text-[#B58B35]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-serif uppercase tracking-wider text-[#9DA78B] font-semibold block">
                        Venue &amp; Location
                      </span>
                      <p className="font-display text-lg sm:text-xl font-bold text-[#243A2D]">
                        {event.venue}
                      </p>
                      <p className="font-serif text-sm text-[#5E5A4F] mt-1 leading-snug">
                        {event.address}, {event.city}, {event.state}, {event.country}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-[#B58B35]/20 flex flex-col sm:flex-row items-center gap-3">
                    {/* Google Maps Search Button */}
                    <a
                      href={event.mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#243A2D] hover:bg-[#18281F] text-[#F8F3E8] font-serif text-xs uppercase tracking-wider font-semibold shadow-sm transition-all duration-200"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#E5C365]" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3 text-[#9DA78B]" />
                    </a>

                    {/* Copy Address Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(event.id, fullAddress)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#B58B35]/40 hover:bg-[#B58B35]/10 text-[#243A2D] font-serif text-xs uppercase tracking-wider font-medium transition-colors"
                      title="Copy Address"
                    >
                      {copiedId === event.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-700" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#B58B35]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* Add to Calendar Button */}
                    <a
                      href={createGoogleCalendarLink(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#B58B35]/40 hover:bg-[#B58B35]/10 text-[#243A2D] font-serif text-xs uppercase tracking-wider font-medium transition-colors"
                      title="Add to Google Calendar"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-[#B58B35]" />
                      <span>Calendar</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
