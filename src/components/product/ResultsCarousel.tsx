"use client";

import { useEffect, useState } from "react";

/**
 * Auto-playing image carousel — one frame, one image at a time.
 * No buttons, no dots. Fixed size/position (square-ish, mobile-friendly);
 * only the image inside swaps every 3s, looping forever.
 */
const SLIDES = [
  "/results-carousel/slide-1.png",
  "/results-carousel/slide-2.png",
  "/results-carousel/slide-3.png",
];

const INTERVAL_MS = 3000;

export function ResultsCarousel({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`relative w-full aspect-square overflow-hidden rounded-2xl border border-brand-border shadow-md ${className}`}
    >
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <span className="absolute top-2 left-2 rounded-full bg-[#1A0F0A]/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
        مع الألم
      </span>
      <span className="absolute top-2 right-2 rounded-full bg-brand-apothecary/90 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
        بعد الشفاء
      </span>
    </div>
  );
}
