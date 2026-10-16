"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { galleryItems, GalleryItem } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import { ZoomIn, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export function WeddingGallery() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const handleOpenLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedItemIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex(
      (selectedItemIndex - 1 + galleryItems.length) % galleryItems.length
    );
  }, [selectedItemIndex]);

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex + 1) % galleryItems.length);
  }, [selectedItemIndex]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, handlePrev, handleNext]);

  const activeItem: GalleryItem | null =
    selectedItemIndex !== null ? galleryItems[selectedItemIndex] : null;

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FCF9F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif uppercase tracking-[0.2em] text-[#B58B35] text-xs sm:text-sm font-semibold">
            Visual Keepsakes
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#243A2D] font-bold tracking-tight mt-2 mb-3">
            Invitation Gallery
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#5E5A4F]">
            Explore the authentic wedding artwork and physical printed card with laser-cut filigree. Click any image to view in high resolution.
          </p>
          <OrnamentalDivider variant="gold" symbol="diamond" className="mt-4" />
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
          {galleryItems.map((item, index) => {
            const isPrinted = item.id === "printed-invitation";

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="group relative rounded-3xl bg-white border-2 border-[#B58B35]/30 shadow-lg overflow-hidden cursor-pointer flex flex-col justify-between hover:border-[#B58B35] hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Container */}
                <div
                  className={`relative w-full overflow-hidden bg-[#F8F3E8] flex items-center justify-center ${
                    isPrinted ? "aspect-[3/4]" : "aspect-[4/3] sm:aspect-[3/2]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                    className="transition-transform duration-500 group-hover:scale-105 object-cover object-center"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#243A2D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                    <div className="w-10 h-10 rounded-full bg-[#B58B35] flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-serif text-xs uppercase tracking-wider font-semibold">
                      View Full Size
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#243A2D]/85 backdrop-blur-sm text-[#E5C365] border border-[#B58B35]/50 text-[11px] font-serif uppercase tracking-wider font-semibold">
                    {item.tag}
                  </div>
                </div>

                {/* Caption & Title */}
                <div className="p-5 sm:p-6 bg-white border-t border-[#B58B35]/20 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#243A2D] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-serif text-xs sm:text-sm text-[#5E5A4F] leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-[#B58B35]/20 flex items-center justify-between text-xs text-[#B58B35] font-serif">
                    <span className="font-semibold uppercase tracking-wider">
                      Tap to enlarge
                    </span>
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Interactive Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleCloseLightbox}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#B58B35]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#B58B35]"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#B58B35]"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh] h-[600px] flex items-center justify-center">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Info bar */}
            <div className="mt-4 text-center max-w-xl text-white px-4">
              <h4 className="font-display text-lg sm:text-xl font-bold text-[#E5C365]">
                {activeItem.title}
              </h4>
              <p className="font-serif text-xs sm:text-sm text-gray-300 mt-1">
                {activeItem.caption}
              </p>
              <p className="text-[11px] font-serif text-[#9DA78B] mt-2 uppercase tracking-widest">
                Image {selectedItemIndex! + 1} of {galleryItems.length} · Press Esc to close
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
