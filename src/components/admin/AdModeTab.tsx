"use client";

import { useEffect, useState } from "react";
import { Megaphone, CheckCircle2, AlertTriangle } from "lucide-react";
import { getAdReviewMode, setAdReviewMode } from "@/lib/ad-mode";

export function AdModeTab() {
  const [on, setOn] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOn(getAdReviewMode());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    setAdReviewMode(next);
  };

  if (!mounted) return null;

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-5 md:p-6 shadow-sm max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#1E5B3F]/10 flex items-center justify-center text-[#1E5B3F]">
          <Megaphone size={18} />
        </div>
        <div>
          <h2 className="font-black text-[15px]">وضع مراجعة الإعلان</h2>
          <p className="text-[12px] text-black/55">
            التحكم في محتوى صفحة <code>/offer</code> التي تضعها في رابط الإعلان.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#FBF7F0] rounded-xl px-4 py-3 border border-black/5">
        <div>
          <p className="text-[13px] font-bold">
            {on ? "وضع المراجعة مفعّل" : "وضع البيع مفعّل"}
          </p>
          <p className="text-[11px] text-black/55 mt-0.5">
            {on
              ? "الزوار يشاهدون صفحة هبوط آمنة للمراجعين."
              : "الزوار يذهبون مباشرة لصفحة البيع."}
          </p>
        </div>
        <button
          onClick={toggle}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
            on ? "bg-[#1E5B3F]" : "bg-black/20"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              on ? "translate-x-1" : "translate-x-8"
            }`}
          />
        </button>
      </div>

      <div className={`mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-[12px] ${
        on
          ? "bg-amber-50 border border-amber-300 text-amber-800"
          : "bg-emerald-50 border border-emerald-300 text-emerald-800"
      }`}>
        {on ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
        <span>
          {on
            ? "الحالة الآن: أي زائر يفتح /offer يرى صفحة المراجعة. بعد قبول الإعلان أطفئ المفتاح."
            : "الحالة الآن: /offer يعيد التوجيه لصفحة البيع الفعلية."}
        </span>
      </div>

      <div className="mt-5 text-[12px] text-black/60 space-y-1.5">
        <p className="font-bold text-black/75">خطوات الاستخدام:</p>
        <ol className="list-decimal pr-5 space-y-1">
          <li>فعّل «وضع المراجعة» قبل رفع الإعلان.</li>
          <li>ضع رابط الإعلان: <code>/offer?utm_source=meta</code></li>
          <li>بعد قبول الإعلان، أطفئ المفتاح من هنا.</li>
        </ol>
        <p className="mt-2 text-[11px] text-black/45">
          ملاحظة: هذا المفتاح يُحفظ في متصفح الأدمن الحالي فقط. للتطبيق العالمي على كل الزوار، انقله لاحقاً إلى إعداد على السيرفر.
        </p>
      </div>
    </div>
  );
}
