import { ShieldCheck, Sparkles } from "lucide-react";
import { ResultsCarouselRotator } from "./ResultsCarousel";

/**
 * Server-rendered hero visual: LCP image is a plain static WebP in the
 * initial HTML (no client JS, no /_next/image). The client rotator only
 * swaps later slides after hydration.
 */
export function HeroMedia({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-brand-border shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/results-carousel/slide-1.webp"
          alt=""
          width={900}
          height={900}
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
