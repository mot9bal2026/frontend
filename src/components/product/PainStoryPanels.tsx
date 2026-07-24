"use client";

import { ShieldCheck, Sparkles } from "lucide-react";

/**
 * Honest hero visual — two separate panels (not an overlaid slider).
 * Same actor/room but clearly different poses: pain vs mobility.
 * Labelled as illustration, not a clinical before/after claim.
 */
export function PainStoryPanels({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <div className="relative overflow-hidden rounded-2xl border border-brand-border shadow-md aspect-[3/4]">
          <video
            src="/hero-frames/frame-before.mp4"
            poster="/hero-frames/frame-before.png"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <span className="absolute top-2 right-2 rounded-full bg-[#1A0F0A]/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            مع الألم
          </span>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-brand-border shadow-md aspect-[3/4]">
          <video
            src="/hero-frames/frame-after.mp4"
            poster="/hero-frames/frame-after.png"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <span className="absolute top-2 right-2 rounded-full bg-brand-apothecary/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            حركة أسهل
          </span>
        </div>
      </div>

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
