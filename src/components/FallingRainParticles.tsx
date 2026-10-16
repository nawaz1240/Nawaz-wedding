"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: "snow" | "petal" | "sparkle";
  isReverse: boolean;
}

export function FallingRainParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 32 unique falling particles once mounted on client
    const items: Particle[] = Array.from({ length: 32 }, (_, i) => {
      const typeChoice = i % 3 === 0 ? "snow" : i % 3 === 1 ? "petal" : "sparkle";
      return {
        id: i,
        left: (i * 3.1 + (i % 7) * 4) % 98,
        size: typeChoice === "snow" ? 4 + (i % 5) : typeChoice === "petal" ? 8 + (i % 6) : 5 + (i % 4),
        duration: 7 + (i % 8) * 1.2,
        delay: (i * 0.45) % 9,
        opacity: 0.4 + ((i % 5) * 0.1),
        type: typeChoice,
        isReverse: i % 2 === 0,
      };
    });

    setParticles(items);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-25 select-none"
    >
      {particles.map((p) => {
        const animationName = p.isReverse ? "fallDownSwayReverse" : "fallDownSway";

        if (p.type === "snow") {
          return (
            <span
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.left}%`,
                top: "-20px",
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 14px rgba(229, 195, 101, 0.4)",
                opacity: p.opacity,
                animation: `${animationName} ${p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
                willChange: "transform",
              }}
            />
          );
        }

        if (p.type === "petal") {
          return (
            <span
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: `${p.left}%`,
                top: "-20px",
                width: `${p.size}px`,
                height: `${p.size * 1.4}px`,
                backgroundColor: (p.id % 2 === 0 ? "#E5C365" : "#D98CA2"),
                borderRadius: "50% 10% 50% 10%",
                opacity: p.opacity * 0.75,
                boxShadow: "0 0 6px rgba(181, 139, 53, 0.3)",
                animation: `${animationName} ${p.duration + 2}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                willChange: "transform",
              }}
            />
          );
        }

        // Golden Stardust Sparkle
        return (
          <span
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.left}%`,
              top: "-20px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "#E5C365",
              boxShadow: "0 0 10px #E5C365, 0 0 4px #FFFFFF",
              opacity: p.opacity,
              animation: `${animationName} ${p.duration - 1}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
