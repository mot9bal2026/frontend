"use client";

import { useEffect, useState } from "react";
import { products, getOtherProduct } from "@/lib/products";
import type { CartItem } from "@/store/cart";
import type { ProductSlug } from "@/lib/products";

type Props = {
  cartItems: CartItem[];
  onAccept: (upsellSlug: ProductSlug, upsellNameAr: string) => void;
  onReject: () => void;
  isSubmitting: boolean;
};

const TIMER_SECONDS = 12;

export function BridgeUpsell({ cartItems, onAccept, onReject, isSubmitting }: Props) {
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const [declined, setDeclined] = useState(false);

  const slugsInCart = new Set(cartItems.map((i) => i.productSlug));
  const mainProductSlug = cartItems.find((i) => !i.isBridgeUpsell)?.productSlug;

  let upsellProduct = null;
  if (mainProductSlug) {
    try {
      upsellProduct = getOtherProduct(mainProductSlug);
    } catch {}
  }

  if (!upsellProduct && slugsInCart.size === 1) {
    const mainSlug = [...slugsInCart][0];
    upsellProduct = products.find((p) => p.slug !== mainSlug) ?? null;
  }

  useEffect(() => {
    if (seconds <= 0) {
      onReject();
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onReject]);

  if (!upsellProduct) {
    return (
      <div className="px-5 py-8 text-center">
        <p className="text-brand-muted">جاري تأكيد طلبك...</p>
      </div>
    );
  }

  const handleAccept = () => {
    if (!upsellProduct || declined || isSubmitting) return;
    onAccept(upsellProduct.slug, upsellProduct.nameAr);
  };

  const handleReject = () => {
    setDeclined(true);
    onReject();
  };

  const progressPct = (seconds / TIMER_SECONDS) * 100;

  return (
    <div className="px-5 py-5">
      {/* Timer */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-brand-muted mb-1">
          <span>عرض خاص لمرة واحدة</span>
          <span className="font-inter font-bold text-brand-coral">{seconds}s</span>
        </div>
        <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-coral rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Offer */}
      <div className="text-center mb-5">
        <div className="inline-block bg-brand-coral text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
          عرض إضافي حصري
        </div>
        <h3 className="font-bold text-brand-brown text-lg mb-1">
          أضيفي {upsellProduct.nameAr}
        </h3>
        <p className="text-sm text-brand-muted mb-3">
          {upsellProduct.subAr}
        </p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="font-bold text-brand-brown text-2xl font-inter">99 ريال</span>
          <span className="text-brand-muted line-through text-sm font-inter">199 ريال</span>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
            وفري 100 ريال
          </span>
        </div>
        <p className="text-xs text-brand-muted">
          هذا العرض متاح فقط الآن ولن يظهر مجدداً
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-brand-cream rounded-xl p-3 mb-4 text-sm">
        <p className="text-brand-brown font-medium mb-1">لماذا تضيفيه الآن؟</p>
        <ul className="text-brand-muted space-y-1">
          <li>✓ توصيل مجاني للطلبين معاً</li>
          <li>✓ روتين متكامل للجمال من الداخل</li>
          <li>✓ وفري 100 ريال بدلاً من الشراء منفصلاً</li>
        </ul>
      </div>

      {/* CTA */}
      <button
        onClick={handleAccept}
        disabled={isSubmitting}
        className="w-full bg-brand-brown text-white font-bold py-4 rounded-xl text-base mb-3 hover:bg-brand-coffee transition-colors disabled:opacity-60 active:scale-95"
      >
        {isSubmitting ? "جاري الإرسال..." : `نعم، أضيفيه بـ 99 ريال`}
      </button>

      <button
        onClick={handleReject}
        disabled={isSubmitting}
        className="w-full text-brand-muted text-sm py-2 hover:text-brand-brown transition-colors disabled:opacity-50"
      >
        لا شكراً، تابعي بدون إضافة
      </button>
    </div>
  );
}
