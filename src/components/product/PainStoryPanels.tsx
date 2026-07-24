"use client";

import { ShieldCheck, Sparkles } from "lucide-react";
import { ResultsCarousel } from "./ResultsCarousel";

/**
 * Honest hero visual — single auto-playing carousel frame.
 * Illustration only, not a clinical before/after claim.
 */
export function PainStoryPanels({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <ResultsCarousel />

      <p className="mt-2 text-center text-[10px] text-[#9A8A7E] font-medium">
        صورة توضيحية — النتائج تختلف من شخص لآخر
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-apothecary px-2.5 py-1 text-[10px] font-bold text-white">
          <ShieldCheck size={11} /> SFDA · حلال
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white border border-brand-border px-2.5 py-1 text-[10px] font-bold text-[#0F3024]">
          <Sparkles size={11} className="text-brand-rust" /> ضمان 14 يوم
        </span>
      </div>
    </div>
  );
}
