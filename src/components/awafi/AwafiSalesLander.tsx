import { BundlePicker } from "@/components/product/BundlePicker";
import { getProduct } from "@/lib/products";
import { Star, ShieldCheck, Truck, Wallet } from "lucide-react";

/**
 * Ultra-light TikTok/Meta sales lander for /awafi.
 * SSR HTML + LCP image in first byte — no blank wait, no client redirect.
 */
export function AwafiSalesLander() {
  const product = getProduct("wrinkles-dark-circles");

  return (
    <div className="min-h-screen bg-[#FBF7F0]" dir="rtl">
      {/* Instant trust strip — pure HTML */}
      <div className="bg-[#0F3024] text-white text-center text-[12px] font-semibold py-2 px-3">
        الدفع عند الاستلام · شحن سريع لكل المملكة
      </div>

      <div className="max-w-[520px] mx-auto px-3 pt-3 pb-10">
        {/* LCP hero — plain img, mobile-optimized WebP */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#EDE4D6] border border-[#E6D8C8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/results-carousel/slide-1-m.webp"
            alt="زيت العوافي قبل وبعد"
            width={750}
            height={750}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute top-2 left-2 rounded-full bg-[#1A0F0A]/80 px-2.5 py-1 text-[11px] font-bold text-white">
            مع الألم
          </span>
          <span className="absolute top-2 right-2 rounded-full bg-[#1E5B3F]/95 px-2.5 py-1 text-[11px] font-bold text-white">
            بعد الشفاء
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0F3024] px-2.5 py-1 text-[10px] font-bold text-white">
            <ShieldCheck size={11} /> SFDA · حلال
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E6D8C8] px-2.5 py-1 text-[10px] font-bold text-[#0F3024]">
            ضمان 14 يوم
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E6D8C8] px-2.5 py-1 text-[10px] font-bold text-[#0F3024]">
            <Truck size={11} /> 1–3 أيام
          </span>
        </div>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} className="text-[#E5B547] fill-[#E5B547]" />
            ))}
            <span className="text-[12px] text-[#5A4A3E] font-semibold mr-1">
              4.9 · +800 تقييم
            </span>
          </div>
          <h1 className="text-[1.45rem] font-black text-[#0F3024] leading-tight">
            ألم الركبة والظهر يمنعك من عيش حياتك؟
          </h1>
          <p className="text-[13px] text-[#5A4A3E] mt-2 leading-relaxed">
            زيت أعشاب طبيعي يصل مباشرة لمكان الألم — بدون حبوب وبدون دفع أونلاين.
          </p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: <Wallet size={14} />, t: "دفع عند الاستلام" },
            { icon: <ShieldCheck size={14} />, t: "ضمان 14 يوم" },
            { icon: <Truck size={14} />, t: "توصيل سريع" },
          ].map((x) => (
            <div
              key={x.t}
              className="bg-white border border-[#E6D8C8] rounded-xl py-2 px-1 flex flex-col items-center gap-1"
            >
              <span className="text-[#1E5B3F]">{x.icon}</span>
              <span className="text-[10px] font-bold text-[#0F3024] leading-tight">
                {x.t}
              </span>
            </div>
          ))}
        </div>

        <div id="bundle" className="mt-5 bg-white rounded-2xl border border-[#E6D8C8] p-3.5 shadow-sm">
          <BundlePicker product={product} isPrimary />
        </div>

        <p className="text-center text-[11px] text-[#7A6A5E] mt-4">
          النتائج تختلف من شخص لآخر · للاستخدام الموضعي الخارجي
        </p>
      </div>
    </div>
  );
}
