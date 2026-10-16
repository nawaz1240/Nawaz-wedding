"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";
import { OrnamentalDivider } from "./OrnamentalDivider";
import {
  Share2,
  Copy,
  Check,
  QrCode,
  MessageCircle,
  ExternalLink,
  X,
} from "lucide-react";

interface ShareInvitationProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export function ShareInvitation({
  isModalOpen = false,
  onCloseModal,
}: ShareInvitationProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      if (typeof navigator !== "undefined" && !!navigator.share) {
        setCanShare(true);
      }
    }
  }, []);

  const shareText = weddingData.shareDetails.messageText;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: weddingData.shareDetails.title,
          text: shareText,
          url: currentUrl || undefined,
        });
      } catch (err) {
        // User cancelled or share failed silently
      }
    }
  };

  const handleCopyLink = () => {
    const textToCopy = currentUrl ? `${shareText}\n\n${currentUrl}` : shareText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getWhatsAppShareUrl = () => {
    const message = currentUrl ? `${shareText}\n\n${currentUrl}` : shareText;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  const shareCardContent = (
    <div className="relative rounded-3xl bg-white border-2 border-[#B58B35]/40 p-6 sm:p-10 shadow-xl max-w-3xl mx-auto text-center">
      {/* Ornate Corner Accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#B58B35] pointer-events-none" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#B58B35] pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#B58B35] pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#B58B35] pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B58B35]/15 border border-[#B58B35]/30 text-[#82611E] text-xs font-serif uppercase tracking-widest font-semibold mb-4">
        <Share2 className="w-3.5 h-3.5 text-[#B58B35]" />
        <span>Share the Joy</span>
      </div>

      <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#243A2D] mb-2">
        Share Wedding Invitation
      </h2>

      <p className="font-serif italic text-sm sm:text-base text-[#5E5A4F] max-w-lg mx-auto mb-6">
        Share this auspicious wedding invitation with beloved family, relatives, and friends via WhatsApp or messaging.
      </p>

      <OrnamentalDivider variant="gold" symbol="diamond" className="my-4" />

      {/* Sharing Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-8">
        {/* WhatsApp Direct Share */}
        <a
          href={getWhatsAppShareUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-serif text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Share via WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>

        {/* Web Share API (if supported) */}
        {canShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#243A2D] hover:bg-[#18281F] text-[#F8F3E8] font-serif text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102"
          >
            <Share2 className="w-4 h-4 text-[#E5C365]" />
            <span>Share Invitation</span>
          </button>
        )}

        {/* Copy Text & Link Fallback */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#B58B35] hover:bg-[#B58B35]/10 text-[#243A2D] font-serif text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-300"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-700" />
              <span>Invitation Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#B58B35]" />
              <span>Copy Invitation Link</span>
            </>
          )}
        </button>
      </div>

      {/* QR Code Card Display */}
      <div className="mt-8 pt-8 border-t border-[#B58B35]/20 max-w-sm mx-auto">
        <div className="p-4 rounded-2xl bg-white border border-[#B58B35]/30 shadow-md inline-block">
          <div className="relative w-48 h-48 mx-auto bg-white p-2">
            <Image
              src={weddingData.qrCode.imageSrc}
              alt="Supplied Invitation QR Code"
              fill
              sizes="200px"
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-[#243A2D]">
              <QrCode className="w-3.5 h-3.5 text-[#B58B35]" />
              <span>{weddingData.qrCode.title}</span>
            </div>
            <p className="font-serif text-[11px] text-[#5E5A4F] mt-1 max-w-[240px] mx-auto leading-tight">
              {weddingData.qrCode.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* On-Page Section */}
      <section id="share" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#F8F3E8] relative">
        <div className="max-w-5xl mx-auto">{shareCardContent}</div>
      </section>

      {/* Pop-up Share Modal (triggered from navigation or quick actions) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Share Wedding Invitation"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={onCloseModal}
        >
          <div
            className="relative w-full max-w-lg my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#302E27] transition-colors"
              aria-label="Close Share Modal"
            >
              <X className="w-5 h-5" />
            </button>
            {shareCardContent}
          </div>
        </div>
      )}
    </>
  );
}
