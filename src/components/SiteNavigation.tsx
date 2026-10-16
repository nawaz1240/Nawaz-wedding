"use client";

import React, { useState, useEffect } from "react";
import { weddingData } from "@/data/wedding";
import { Menu, X, Share2 } from "lucide-react";

interface SiteNavigationProps {
  onOpenShareModal?: () => void;
}

export function SiteNavigation({ onOpenShareModal }: SiteNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Invitation", href: "#invitation" },
    { name: "Celebrations", href: "#celebrations" },
    { name: "Our Families", href: "#families" },
    { name: "Venue", href: "#venue" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F8F3E8]/95 backdrop-blur-md shadow-md border-b border-[#B58B35]/20 py-2.5"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Couple Text Brand in Header (No logo) */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex flex-col group cursor-pointer"
          >
            <span className="font-display text-sm sm:text-base font-bold text-[#243A2D] tracking-wide group-hover:text-[#B58B35] transition-colors leading-tight">
              {weddingData.bride.shortName} &amp; {weddingData.groom.shortName}
            </span>
            <span className="font-serif text-[10px] tracking-widest text-[#B58B35] uppercase mt-0.5">
              {weddingData.dateSummary}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 font-serif text-sm tracking-wider uppercase"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[#302E27] hover:text-[#B58B35] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#B58B35] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Share Invitation Trigger */}
            <button
              type="button"
              id="nav-share-btn"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[#B58B35]/60 bg-[#F8F3E8] hover:bg-[#B58B35] text-[#243A2D] hover:text-[#F8F3E8] text-xs font-serif font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm"
              title="Share Invitation"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#243A2D] hover:bg-[#B58B35]/15 focus:outline-none focus:ring-2 focus:ring-[#B58B35]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#243A2D]" />
              ) : (
                <Menu className="w-6 h-6 text-[#243A2D]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed top-16 right-4 left-4 rounded-2xl bg-[#F8F3E8] border border-[#B58B35]/30 shadow-2xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display font-bold text-base text-[#243A2D] mb-1">
              {weddingData.bride.fullName}
            </p>
            <p className="font-script text-lg text-[#B58B35] -mt-1 mb-1">&amp;</p>
            <p className="font-display font-bold text-base text-[#243A2D] mb-4">
              {weddingData.groom.fullName}
            </p>

            <div className="h-[1px] w-24 bg-[#B58B35]/30 mx-auto mb-4" />

            <nav className="flex flex-col gap-3 font-serif text-sm uppercase tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-2.5 px-4 rounded-lg text-[#302E27] hover:bg-[#B58B35]/15 hover:text-[#243A2D] font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-5 pt-4 border-t border-[#B58B35]/20 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenShareModal?.();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#243A2D] text-[#F8F3E8] font-serif text-xs uppercase tracking-wider font-semibold shadow hover:bg-[#18281F]"
              >
                <Share2 className="w-4 h-4 text-[#E5C365]" />
                <span>Share Invitation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
