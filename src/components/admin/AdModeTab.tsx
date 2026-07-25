"use client";

import { useEffect, useState } from "react";
import { Megaphone, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { AuthError, getStealthMode, updateStealthMode } from "@/lib/admin";

type Props = {
  onAuthError: () => void;
};

export function AdModeTab({ onAuthError }: Props) {
  const [on, setOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStealthMode()
      .then((s) => {
        setOn(s.ad_review_mode);
      })
      .catch((e) => {
        if (e instanceof AuthError) return onAuthError();
        setError(e?.message || "تعذّر تحميل الإعدادات");
      })
      .finally(() => setLoading(false));
  }, [onAuthError]);

  const toggle = async () => {
    const next = !on;
    setOn(next);
    setSaving(true);
    setError(null);
    try {
      await updateStealthMode({ ad_review_mode: next });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setOn(!next);
      if (e instanceof AuthError) return onAuthError();
      setError(e instanceof Error ? e.message : "تعذّر حفظ الإعدادات");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={26} className="animate-spin text-[#0F3024]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-5 md:p-6 shadow-sm max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#1E5B3F]/10 flex items-center justify-center text-[#1E5B3F]">
          <Megaphone size={18} />
        </div>
        <div>
          <h2 className="font-black text-[15px]">وضع مراجعة الإعلان</h2>
          <p className="text-[12px] text-black/55">
            التحكم في محتوى صفحة <code>/awafi</code> التي تضعها في رابط الإعلان.
          </p>
        </div>
        {saved && <span className="mr-auto text-[12px] text-emerald-700 font-bold">تم الحفظ ✓</span>}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl px-4 py-3 text-[12px] bg-red-50 border border-red-300 text-red-700">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between bg-[#FBF7F0] rounded-xl px-4 py-3 border border-black/5">
        <div>
          <p className="text-[13px] font-bold">
            {on ? "وضع المراجعة مفعّل" : "وضع البيع مفعّل"}
          </p>
          <p className="text-[11px] text-black/55 mt-0.5">
            {on
              ? "الزوار يشاهدون صفحة هبوط آمنة للمراجعين."
              : "الزوار يشاهدون صفحة البيع السريعة على /awafi."}
          </p>
        </div>
        <button
          onClick={toggle}
          disabled={saving}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors disabled:opacity-60 ${
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
            ? "الحالة الآن: أي زائر يفتح /awafi يرى صفحة المراجعة. بعد قبول الإعلان أطفئ المفتاح."
            : "الحالة الآن: /awafi تعرض صفحة البيع السريعة (بدون تحويل بطيء)."}
        </span>
      </div>

      <div className="mt-5 text-[12px] text-black/60 space-y-1.5">
        <p className="font-bold text-black/75">خطوات الاستخدام:</p>
        <ol className="list-decimal pr-5 space-y-1">
          <li>فعّل «وضع المراجعة» قبل رفع الإعلان.</li>
          <li>ضع رابط الإعلان: <code>/awafi?utm_source=meta</code></li>
          <li>بعد قبول الإعلان، أطفئ المفتاح من هنا.</li>
        </ol>
        <p className="mt-2 text-[11px] text-emerald-700 font-medium">
          ✓ هذا الإعداد يعمل على مستوى السيرفر ويؤثر على جميع الزوار.
        </p>
      </div>
    </div>
  );
}
