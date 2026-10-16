"use client";

import React, { useState } from "react";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import { MapPin, Navigation, Copy, Check, ExternalLink, Info } from "lucide-react";

export function VenueSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="venue" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#F8F3E8] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif uppercase tracking-[0.2em] text-[#B58B35] text-xs sm:text-sm font-semibold">
            Location &amp; Travel
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#243A2D] font-bold tracking-tight mt-2 mb-3">
            Venues &amp; Directions
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#5E5A4F]">
            Easily locate the ceremony venue in Mangalore, Karnataka. Click below to open directions in Google Maps.
          </p>
          <OrnamentalDivider variant="gold" symbol="floral" className="mt-4" />
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 gap-8 lg:gap-10 max-w-2xl mx-auto">
          {weddingData.events.map((event) => {
            const fullAddress = `${event.venue}, ${event.address}, ${event.city}, ${event.state}, India`;
            const isNikah = event.id === "nikah";

            return (
              <div
                key={event.id}
                className="rounded-3xl bg-white border-2 border-[#B58B35]/30 shadow-xl overflow-hidden flex flex-col justify-between hover:border-[#B58B35] transition-all duration-300"
              >
                {/* Header Banner */}
                <div className="bg-[#243A2D] text-white p-6 sm:p-7 relative">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#B58B35]/25 border border-[#E5C365]/30 text-[#E5C365] text-xs font-serif uppercase tracking-widest font-semibold mb-2">
                    {isNikah ? "Nikah Venue" : "Valima Venue"}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F8F3E8]">
                    {event.venue}
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-[#9DA78B] mt-1">
                    {event.name} · {event.date}
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#B58B35]/15 border border-[#B58B35]/40 flex items-center justify-center shrink-0 text-[#B58B35]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#9DA78B] font-serif font-semibold block">
                          Full Postal Address
                        </span>
                        <p className="font-display text-base sm:text-lg font-bold text-[#243A2D] mt-0.5">
                          {event.venue}
                        </p>
                        <p className="font-serif text-sm text-[#5E5A4F] mt-1 leading-relaxed">
                          {event.address}
                          <br />
                          {event.city}, {event.state}, {event.country}
                        </p>
                      </div>
                    </div>

                    {/* Accurate notice regarding Google Maps link */}
                    <div className="p-3.5 rounded-xl bg-[#F8F3E8] border border-[#B58B35]/20 flex items-start gap-2.5 text-xs text-[#5E5A4F] font-serif">
                      <Info className="w-4 h-4 text-[#B58B35] shrink-0 mt-0.5" />
                      <p>
                        The direction button below initiates a Google Maps location search using this verified venue name and address.
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 border-t border-[#B58B35]/20 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={event.mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#243A2D] hover:bg-[#18281F] text-[#F8F3E8] font-serif text-xs uppercase tracking-wider font-semibold shadow-sm transition-all duration-200"
                    >
                      <Navigation className="w-4 h-4 text-[#E5C365]" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#9DA78B]" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(event.id, fullAddress)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#B58B35]/40 hover:bg-[#B58B35]/10 text-[#243A2D] font-serif text-xs uppercase tracking-wider font-medium transition-colors"
                      title="Copy Address"
                    >
                      {copiedId === event.id ? (
                        <>
                          <Check className="w-4 h-4 text-green-700" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#B58B35]" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
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
