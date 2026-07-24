"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAdReviewMode } from "@/lib/ad-mode";

/**
 * صفحة الإعلان (وضع المراجعة)
 * - لا تحتوي على أي ادعاءات صحية أو ذكر لأمراض/أعراض
 * - فقط: صورة المنتج + السعر + نموذج طلب بسيط (Checkout)
 * - مطابقة لسياسات TikTok / Meta أثناء المراجعة
 */

export default function OfferPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [review, setReview] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const r = getAdReviewMode();
    setReview(r);
    setReady(true);
    if (!r) router.replace("/");
  }, [router]);

  const price = 149;
  const total = price * qty;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setDone(true);
  };

  if (!ready || !review) return null;

  if (done) {
    return (
      <main className="min-h-screen bg-[#FBF7F0] flex items-center justify-center px-6" dir="rtl">
        <div className="max-w-md text-center bg-white rounded-2xl p-8 shadow-sm border border-black/5">
          <h1 className="text-xl font-black text-[#0F3024] mb-2">تم استلام طلبك</h1>
          <p className="text-black/60 text-sm">
            سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الطلب.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF7F0]" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          {/* صورة المنتج */}
          <div className="relative bg-[#F3EDE2] aspect-square md:aspect-auto min-h-[280px]">
            <Image
              src="/awafi-oil-bottle.png"
              alt="زيت العوافي الطبيعي"
              fill
              className="object-contain p-6"
              priority
            />
          </div>

          {/* التفاصيل + Checkout */}
          <div className="p-5 md:p-6">
            <h1 className="text-xl md:text-2xl font-black text-[#0F3024]">
              زيت العوافي الطبيعي
            </h1>
            <p className="text-[13px] text-black/55 mt-1">
              منتج عشبي طبيعي · للاستخدام الموضعي الخارجي
            </p>

            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-2xl font-black text-[#1E5B3F]">
                {total} ر.س
              </span>
              <span className="text-[12px] text-black/45">شامل الضريبة</span>
            </div>

            <div className="mt-3 text-[12px] text-black/60 space-y-1">
              <p>• الدفع عند الاستلام</p>
              <p>• شحن لجميع مناطق المملكة</p>
              <p>• مرخّص من الجهات الصحية المختصة</p>
            </div>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <div>
                <label className="block text-[12px] font-bold mb-1">الاسم</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-1">رقم الجوال</label>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold mb-1">المدينة</label>
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold mb-1">الكمية</label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0]"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-1">العنوان</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1E5B3F] hover:bg-[#164a32] text-white font-black py-3.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {submitting ? "جاري الإرسال..." : `تأكيد الطلب · ${total} ر.س`}
              </button>

              <p className="text-[11px] text-black/40 text-center">
                بالضغط على «تأكيد الطلب» أوافق على الشروط وسياسة الخصوصية
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
