"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { weddingData } from "@/data/wedding";
import { Sparkles, RotateCcw, Hand } from "lucide-react";

export function ScratchToReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Exact heart canvas dimensions matching reference image proportions
  const CANVAS_WIDTH = 360;
  const CANVAS_HEIGHT = 320;

  // Initialize canvas with sage green glitter heart matching the user's artwork
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Sage Green Radial Gradient
    const grad = ctx.createRadialGradient(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT * 0.4,
      18,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT * 0.48,
      CANVAS_WIDTH * 0.58
    );
    grad.addColorStop(0, "#C7D6C9"); // soft highlight glow in upper-center
    grad.addColorStop(0.28, "#A3B6A5");
    grad.addColorStop(0.65, "#6F8674");
    grad.addColorStop(1, "#445949"); // deep rich sage-forest green rim
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. High-density multi-tone glitter powder texture
    const particleCount = 750;
    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * CANVAS_WIDTH;
      const py = Math.random() * CANVAS_HEIGHT;
      const radius = Math.random() * 1.6 + 0.3;
      const opacity = Math.random() * 0.85 + 0.15;

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);

      if (i % 6 === 0) {
        // Gold flecks
        ctx.fillStyle = `rgba(235, 215, 140, ${opacity})`;
      } else if (i % 7 === 0) {
        // Deep emerald fleck for depth
        ctx.fillStyle = `rgba(35, 52, 40, ${opacity * 0.6})`;
      } else if (i % 3 === 0) {
        // Shimmering silver flecks
        ctx.fillStyle = `rgba(225, 240, 230, ${opacity})`;
      } else {
        // Pure sparkling white
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      }
      ctx.fill();
    }

    // 3. Elegant cursive hint on top of glitter
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "italic 600 13px serif";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 4;
    ctx.fillText("✨ Scratch with Love ✨", CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.48);

    setIsRevealed(false);
    setHasScratched(false);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Check how much percentage of the heart has been scratched
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Sample pixels in heart central area
    const sampleX = Math.floor(CANVAS_WIDTH * 0.22);
    const sampleY = Math.floor(CANVAS_HEIGHT * 0.25);
    const sampleW = Math.floor(CANVAS_WIDTH * 0.56);
    const sampleH = Math.floor(CANVAS_HEIGHT * 0.55);

    try {
      const imgData = ctx.getImageData(sampleX, sampleY, sampleW, sampleH);
      let transparentPixels = 0;
      const totalPixels = imgData.data.length / 4;

      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] < 30) {
          transparentPixels++;
        }
      }

      const percent = (transparentPixels / totalPixels) * 100;

      // When 35%+ scratched, trigger celebration and full reveal
      if (percent > 35) {
        setIsRevealed(true);
        try {
          confetti({
            particleCount: 95,
            spread: 90,
            origin: { y: 0.62 },
            colors: ["#B58B35", "#E5C365", "#6F8674", "#F8F3E8", "#D98CA2"],
            disableForReducedMotion: true,
          });
        } catch {
          // safe fallback
        }
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    } catch {
      // fallback
    }
  }, [isRevealed]);

  // Scratch action helper
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * CANVAS_HEIGHT;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    if (lastPosRef.current) {
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.lineWidth = 42; // generous scratch brush for smooth mobile touch
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    } else {
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPosRef.current = { x, y };
    setHasScratched(true);
    checkScratchPercentage();
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    lastPosRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  // Touch handlers for mobile (no preventDefault to avoid passive event listener warnings; touch-action: none handles gesture lock)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDrawingRef.current = true;
      lastPosRef.current = null;
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || e.touches.length !== 1) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <section
      id="scratch-reveal"
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden text-center selection:bg-transparent"
      style={{
        // Woven natural linen fabric texture background matching user's photo
        backgroundColor: "#DED3C1",
        backgroundImage: `
          linear-gradient(90deg, rgba(160, 142, 118, 0.22) 1px, transparent 1px),
          linear-gradient(0deg, rgba(160, 142, 118, 0.22) 1px, transparent 1px),
          linear-gradient(45deg, rgba(255, 255, 255, 0.12) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.12) 75%),
          linear-gradient(-45deg, rgba(90, 75, 55, 0.05) 25%, transparent 25%, transparent 75%, rgba(90, 75, 55, 0.05) 75%)
        `,
        backgroundSize: "6px 6px, 6px 6px, 18px 18px, 18px 18px",
      }}
    >
      {/* SVG Definitions for 100% Exact Heart ClipPath across all browsers */}
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="scratch-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.24 C 0.42 0.08, 0.08 0.08, 0.08 0.36 C 0.08 0.58, 0.30 0.76, 0.5 0.94 C 0.70 0.76, 0.92 0.58, 0.92 0.36 C 0.92 0.08, 0.58 0.08, 0.5 0.24 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Soft atmospheric center highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
        {/* Title: 'Scratch to Reveal' in flowing calligraphy script matching user reference */}
        <h2 className="font-script text-5xl sm:text-7xl text-[#445848] tracking-wide mb-1 select-none drop-shadow-xs">
          Scratch to Reveal
        </h2>

        {/* Delicate Heart Divider line matching reference */}
        <div className="flex items-center justify-center gap-3 w-48 sm:w-56 mx-auto my-3 text-[#586F5C]">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#586F5C]/70" />
          {/* Small heart glyph */}
          <svg
            className="w-2.5 h-2.5 fill-[#586F5C] text-[#586F5C]"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#586F5C]/70" />
        </div>

        <p className="font-serif italic text-xs sm:text-sm text-[#4E4437] mb-7 max-w-xs sm:max-w-md">
          Gently scratch or swipe the sparkling sage heart to uncover the bride &amp; groom
        </p>

        {/* Scratch Card Heart Wrapper with SVG outline and drop shadow */}
        <div className="relative w-[340px] sm:w-[360px] h-[300px] sm:h-[320px] mx-auto select-none">
          {/* SVG Heart Border & Shadow Frame */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 drop-shadow-lg"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
          >
            <path
              d="M 0.5 0.24 C 0.42 0.08, 0.08 0.08, 0.08 0.36 C 0.08 0.58, 0.30 0.76, 0.5 0.94 C 0.70 0.76, 0.92 0.58, 0.92 0.36 C 0.92 0.08, 0.58 0.08, 0.5 0.24 Z"
              fill="none"
              stroke="#445848"
              strokeWidth="0.012"
            />
          </svg>

          {/* Unified Heart Container: Clips both secret text and scratch canvas with 100% exact boundary */}
          <div
            className="relative w-full h-full touch-none overflow-hidden"
            style={{
              clipPath: "url(#scratch-heart-clip)",
              WebkitClipPath: "url(#scratch-heart-clip)",
            }}
          >
            {/* UNDERNEATH LAYER: The Revealed Couple's Names */}
            <div className="absolute inset-0 bg-[#FDFBF7] flex flex-col items-center justify-center px-4 pt-8 pb-6 text-center">
              <div className="flex flex-col items-center justify-center max-w-[260px]">
                {/* Decorative crown / sparkle */}
                <div className="inline-flex items-center justify-center text-[#B58B35] mb-1">
                  <Sparkles className="w-4 h-4 text-[#B58B35] animate-pulse" />
                </div>

                <span className="font-serif text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8C7031] uppercase font-bold mb-1">
                  The Blessed Couple
                </span>

                {/* Bride's Name */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E3025] tracking-tight leading-none">
                  Asma
                </h3>

                {/* Elegant Ampersand Divider */}
                <div className="flex items-center justify-center gap-2 my-1 text-[#B58B35]">
                  <span className="h-[1px] w-8 bg-[#B58B35]/50" />
                  <span className="font-script text-3xl text-[#8C7031] leading-none">&amp;</span>
                  <span className="h-[1px] w-8 bg-[#B58B35]/50" />
                </div>

                {/* Groom's Name */}
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#1E3025] tracking-tight leading-none">
                  Noushad
                </h4>

                {/* Dates & City */}
                <p className="font-serif text-[11px] sm:text-xs text-[#554C3E] mt-3 font-medium tracking-wide">
                  25 November 2026 · Mangalore
                </p>
              </div>
            </div>

            {/* TOP LAYER: Interactive Scratch Canvas with Sage Glitter Heart */}
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-700 ${
                isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
          </div>
        </div>

        {/* Scratch Prompt / Action Buttons */}
        <div className="mt-6 flex flex-col items-center gap-2.5">
          {!isRevealed ? (
            <div className="inline-flex items-center gap-2 text-xs font-serif text-[#445848] bg-white/85 backdrop-blur-xs px-4 py-1.5 rounded-full border border-[#586F5C]/30 shadow-xs">
              <Hand className="w-3.5 h-3.5 text-[#586F5C] animate-bounce" />
              <span>
                {hasScratched
                  ? "Keep scratching to uncover the bride & groom!"
                  : "Swipe or drag across the glitter heart"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 animate-fade-in">
              <div className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#1E3025] bg-[#E8DEC8] px-4 py-1.5 rounded-full border border-[#B58B35]/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B58B35]" />
                <span>Noushad &amp; Asma</span>
              </div>
              <button
                type="button"
                onClick={initCanvas}
                className="mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-[#FBF7EE] text-[#1E3025] border border-[#B58B35] font-serif text-xs uppercase tracking-wider font-semibold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B58B35]" />
                <span>Scratch Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
