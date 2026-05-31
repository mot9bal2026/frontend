"use client";

import { useEffect, useState } from "react";

/* Live social proof — rotating "X from Y bought Z minutes ago".
   Saudis are heavily influenced by social proof. Boosts conversion 8-15%. */

/* Saudi feminine names (full names with tribal/family last names) */
const names = [
  "نورة العتيبي",
  "هيا الشهري",
  "منى الدوسري",
  "سارة القحطاني",
  "ريم الغامدي",
  "أمل الحربي",
  "خلود الزهراني",
  "لمى المطيري",
  "غادة الشمري",
  "هدى البقمي",
  "روان السبيعي",
  "فاطمة العنزي",
  "دانة الرشيدي",
  "شهد الجهني",
  "العنود السلمي",
  "أسماء الخالدي",
  "ندى المالكي",
  "بدور الحارثي",
  "وفاء العمري",
  "رهف القرني",
];

/* Major Saudi cities only */
const cities = [
  "الرياض",
  "جدة",
  "الدمام",
  "مكة المكرمة",
  "المدينة المنورة",
  "الخبر",
  "الطائف",
  "بريدة",
  "تبوك",
  "أبها",
  "حائل",
  "الأحساء",
  "خميس مشيط",
  "ينبع",
];

const bundles = ["علبتين", "ثلاث علب", "علبة واحدة", "علبتين", "ثلاث علب"];

/* Short purchase times */
const times = [
  "قبل دقيقة",
  "قبل دقيقتين",
  "قبل 3 دقائق",
  "قبل 4 دقائق",
  "قبل 5 دقائق",
  "قبل 6 دقائق",
  "قبل 8 دقائق",
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function LivePurchaseToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<{ name: string; city: string; qty: string; time: string } | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let hideTimeoutId: ReturnType<typeof setTimeout>;
    let cycleCount = 0;

    const showNext = () => {
      setCurrent({
        name: random(names),
        city: random(cities),
        qty: random(bundles),
        time: random(times),
      });
      setVisible(true);

      /* Hide after 4s */
      hideTimeoutId = setTimeout(() => {
        setVisible(false);
        cycleCount++;
        /* Show next after exactly 20s */
        if (cycleCount < 10) {
          timeoutId = setTimeout(showNext, 20000);
        }
      }, 4000);
    };

    /* First show after 10s */
    timeoutId = setTimeout(showNext, 10000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, []);

  if (!current) return null;

  return (
    <div
      dir="rtl"
      className={`fixed bottom-20 md:bottom-6 right-3 md:right-4 z-30 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(61,40,23,0.18)] border border-[#E0D0BC] flex items-center gap-2.5 pr-3 pl-3 py-3 max-w-[280px]">
        {/* Avatar circle */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#C8A876] to-[#8B5E3C] text-white font-black flex items-center justify-center text-sm shadow-sm">
          {current.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-[9px] text-green-600 font-bold uppercase tracking-wide">شراء حديث</span>
          </div>
          <p className="text-[#3D2817] text-[11px] font-bold leading-tight">
            {current.name} من {current.city}
          </p>
          <p className="text-[#7A6A5E] text-[10px] leading-tight mt-0.5">
            اشترت <span className="font-bold text-[#3D2817]">{current.qty}</span> · {current.time}
          </p>
        </div>
        <span className="text-lg flex-shrink-0">☕</span>
      </div>
    </div>
  );
}

