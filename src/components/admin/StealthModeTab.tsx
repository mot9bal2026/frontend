"use client";

import { useEffect, useState } from "react";
import { EyeOff, CheckCircle2, AlertTriangle, Loader2, Save } from "lucide-react";
import { AuthError, getStealthMode, updateStealthMode } from "@/lib/admin";

type Props = {
  onAuthError: () => void;
};

export function StealthModeTab({ onAuthError }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [enabled, setEnabled] = useState(false);
  const [ksaUrl, setKsaUrl] = useState("");
  const [otherUrl, setOtherUrl] = useState("");

  useEffect(() => {
    getStealthMode()
      .then((s) => {
        setEnabled(s.enabled);
        setKsaUrl(s.ksa_url ?? "");
        setOtherUrl(s.other_url ?? "");
      })
      .catch((e) => {
        if (e instanceof AuthError) return onAuthError();
        setError(e?.message || "تعذّر تحميل الإعدادات");
      })
      .finally(() => setLoading(false));
  }, [onAuthError]);

  const toggle = async () => {
    const next = !enabled;
    setEnabled(next);
    setSaving(true);
    setError(null);
    try {
      await updateStealthMode({ enabled: next });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setEnabled(!next);
      if (e instanceof AuthError) return onAuthError();
      setError(e instanceof Error ? e.message : "تعذّر حفظ الإعدادات");
    } finally {
      setSaving(false);
    }
  };

  const saveUrls = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateStealthMode({ ksa_url: ksaUrl, other_url: otherUrl });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
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
          <EyeOff size={18} />
        </div>
        <div>
          <h2 className="font-black text-[15px]">وضع التخفي</h2>
          <p className="text-[12px] text-black/55">
            توجيه الزوار تلقائياً حسب دولتهم — يعمل من جهة السيرفر ومستقل تماماً عن وضع الإعلان.
          </p>
        </div>
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
            {enabled ? "وضع التخفي مفعّل" : "وضع التخفي متوقف"}
          </p>
          <p className="text-[11px] text-black/55 mt-0.5">
            {enabled
              ? "زوار السعودية يشاهدون الصفحة، وباقي الدول تُحوَّل تلقائياً."
              : "جميع الزوار يشاهدون الصفحة الأصلية بشكل طبيعي."}
          </p>
        </div>
        <button
          onClick={toggle}
          disabled={saving}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors disabled:opacity-60 ${
            enabled ? "bg-[#1E5B3F]" : "bg-black/20"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-1" : "translate-x-8"
            }`}
          />
        </button>
      </div>

      <div className={`mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-[12px] ${
        enabled
          ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
          : "bg-amber-50 border border-amber-300 text-amber-800"
      }`}>
        {enabled ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
        <span>
          {enabled
            ? "الحالة الآن: التحويل يتم مباشرة من السيرفر حسب دولة IP الزائر."
            : "الحالة الآن: التخفي متوقف، لن يتم تحويل أي زائر."}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <label className="block text-[12px] font-bold mb-1">رابط السعودية</label>
          <input
            dir="ltr"
            value={ksaUrl}
            onChange={(e) => setKsaUrl(e.target.value)}
            placeholder="اتركه فارغاً لعرض الصفحة الحالية بشكل طبيعي"
            className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0] text-left"
          />
          <p className="mt-1 text-[11px] text-black/45">
            إن تُرك فارغاً، يشاهد زوار السعودية الصفحة كما هي دون أي تحويل.
          </p>
        </div>
        <div>
          <label className="block text-[12px] font-bold mb-1">رابط جميع الدول الأخرى</label>
          <input
            dir="ltr"
            value={otherUrl}
            onChange={(e) => setOtherUrl(e.target.value)}
            placeholder="https://example.com/contact"
            className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0] text-left"
          />
          <p className="mt-1 text-[11px] text-black/45">
            أي زائر من خارج السعودية (المغرب، الجزائر، مصر، الإمارات، العراق، ...) يُحوَّل لهذا الرابط تلقائياً.
          </p>
        </div>

        <button
          onClick={saveUrls}
          disabled={saving}
          className="flex items-center gap-1.5 bg-[#1E5B3F] hover:bg-[#164a32] text-white font-black text-[13px] px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          حفظ الروابط
        </button>
        {saved && <span className="ml-2 text-[12px] text-emerald-700 font-bold">تم الحفظ ✓</span>}
      </div>

      <div className="mt-5 text-[12px] text-black/60 space-y-1.5">
        <p className="font-bold text-black/75">كيف تعمل الميزة:</p>
        <ol className="list-decimal pr-5 space-y-1">
          <li>عند التفعيل، يتحقق السيرفر من دولة كل زائر عبر IP قبل عرض الصفحة.</li>
          <li>زائر من السعودية → يرى صفحة المنتج (أو رابط السعودية إن تم تحديده).</li>
          <li>زائر من أي دولة أخرى → يُحوَّل تلقائياً لرابط الدول الأخرى.</li>
          <li>هذه الميزة مستقلة تماماً عن «وضع الإعلان» ولا تؤثر عليه.</li>
        </ol>
      </div>
    </div>
  );
}
