"use client";

import { useEffect, useState } from "react";

/** Mobile-first slides (~27–40KB). Desktop can still use full later if needed. */
const SLIDES = [
  "/results-carousel/slide-1-m.webp",
  "/results-carousel/slide-2-m.webp",
  "/results-carousel/slide-3-m.webp",
] as const;

/**
 * Client rotator only — the LCP frame is server-rendered in HeroMedia
 * so first paint never waits on this island.
 * Starts late so it never steals bandwidth from LCP on 3G/4G.
 */
export function ResultsCarouselRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((i) => (i + 1) % SLIDES.length);
      }, 4500);
    }, 6000);
    return () => {
      window.clearTimeout(startId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  // Keep slide 0 as the SSR LCP img; only overlay later slides.
  if (index === 0) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SLIDES[index]}
      alt=""
      width={750}
      height={750}
      loading="lazy"
      decoding="async"
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
        width={750}
        height={750}
        fetchPriority="high"
        decoding="async"
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
