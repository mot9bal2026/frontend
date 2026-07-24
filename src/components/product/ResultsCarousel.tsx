"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  "/results-carousel/slide-1.webp",
  "/results-carousel/slide-2.webp",
  "/results-carousel/slide-3.webp",
] as const;

/**
 * Client rotator only — the LCP frame is server-rendered in HeroMedia
 * so first paint never waits on this island.
 */
export function ResultsCarouselRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  // Keep slide 0 as the SSR LCP img; only overlay later slides.
  if (index === 0) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SLIDES[index]}
      alt=""
      width={900}
      height={900}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

/** @deprecated use HeroMedia — kept for import compatibility */
export function ResultsCarousel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full aspect-square overflow-hidden rounded-2xl border border-brand-border shadow-md ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SLIDES[0]}
        alt=""
        width={900}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <ResultsCarouselRotator />
      <span className="absolute top-2 left-2 rounded-full bg-[#1A0F0A]/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
        مع الألم
      </span>
      <span className="absolute top-2 right-2 rounded-full bg-brand-apothecary/90 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
        بعد الشفاء
      </span>
    </div>
  );
}
