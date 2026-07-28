"use client";

import { useState } from "react";

/**
 * Safe ad-review checkout — no health claims.
 * Lightweight client island; HTML shell is SSR'd around it.
 */
export function AwafiReviewForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const price = 99;
  const total = price * qty;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="text-center py-6">
        <h2 className="text-xl font-black text-[#0F3024] mb-2">تم استلام طلبك</h2>
        <p className="text-black/60 text-sm">
          سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الطلب.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-[12px] font-bold mb-1">الاسم</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm bg-[#FBF7F0]"
          autoComplete="name"
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
          autoComplete="tel"
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
            autoComplete="address-level2"
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
              <option key={n} value={n}>
                {n}
              </option>
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
          autoComplete="street-address"
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
  );
}
