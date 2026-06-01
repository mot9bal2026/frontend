"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import type { Product, BundlePrice } from "@/lib/products";
import { firePixelEvent } from "@/components/tracking/PixelProvider";
import { ShieldCheck, Eye, Flame } from "lucide-react";

type Props = {
  product: Product;
};

type OfferQty = 1 | 2 | 3;

const offers: {
  qty: OfferQty;
  price: number;
  originalPrice: number;
  savings: number;
  label: string;
  sublabel: string;
  badge?: string;
  highlight?: boolean;
}[] = [
  {
    qty: 1,
    price: 129,
    originalPrice: 129,
    savings: 0,
    label: "علبة واحدة",
    sublabel: "30 كيساً · شهر كامل",
    badge: "نتيجة من العلبة الأولى",
  },
  {
    qty: 2,
    price: 199,
    originalPrice: 258,
    savings: 59,
    label: "علبتان · ثبّتي النتيجة",
    sublabel: "60 كيساً · شهران",
    badge: "الأكثر اختياراً",
    highlight: true,
  },
  {
    qty: 3,
    price: 239,
    originalPrice: 387,
    savings: 148,
    label: "ثلاث علب · النتيجة الكاملة",
    sublabel: "90 كيساً · ثلاثة أشهر",
    badge: "الأوفر — وفّري 148 ريال",
  },
];

export function BundlePicker({ product }: Props) {
  const [selected, setSelected] = useState<OfferQty>(2);
  const [viewers, setViewers] = useState(0);
  const [stock, setStock] = useState(0);
  const { addItem, goToCheckout, setSelectedOffer } = useCartStore();

  /* Live viewers + stock scarcity — boosts urgency 20-30% */
  useEffect(() => {
    /* Viewers: 45-90 (fluctuates) */
    setViewers(45 + Math.floor(Math.random() * 46));
    const viewersTimer = setInterval(() => {
      setViewers((v) => Math.max(40, Math.min(90, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 4500);

    /* Stock: starts at 50, decreases by 1 every ~5-8s, floor at 7 */
    setStock(48 + Math.floor(Math.random() * 3));
    const stockTimer = setInterval(() => {
      setStock((s) => (s > 7 ? s - 1 : s));
    }, 5000 + Math.floor(Math.random() * 3000));

    return () => {
      clearInterval(viewersTimer);
      clearInterval(stockTimer);
    };
  }, []);

  const selectedOffer = offers.find((o) => o.qty === selected)!;

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      productNameAr: product.nameAr,
      offerQty: selected,
      unitBundlePrice: selectedOffer.price as BundlePrice,
    });

    firePixelEvent("AddToCart", {
      event_id: crypto.randomUUID(),
      value: selectedOffer.price,
      currency: "SAR",
      content_ids: [product.slug],
      content_name: product.nameAr,
    });

    firePixelEvent("InitiateCheckout", {
      event_id: crypto.randomUUID(),
      value: selectedOffer.price,
      currency: "SAR",
      content_ids: [product.slug],
    });

    goToCheckout();
  };

  return (
    <div className="space-y-3">
      {/* Live signals row — viewers + stock */}
      {viewers > 0 && (
        <div className="flex items-center gap-2 text-[11px] font-bold flex-wrap">
          <span className="flex items-center gap-1 bg-red-600 text-white px-2.5 py-1.5 rounded-full pulse-soft">
            <Eye size={11} />
            <span>{viewers} يشاهدن الآن</span>
          </span>
          <span className="flex items-center gap-1 bg-[#3D2817] text-[#C8A876] px-2.5 py-1.5 rounded-full">
            <Flame size={11} />
            <span>آخر {stock} علب بهذا السعر</span>
          </span>
        </div>
      )}

      {/* Urgency */}
      <div className="bg-[#FFF8E7] border-2 border-[#F5C542] rounded-xl px-4 py-3 text-sm text-[#7A4F00] font-bold flex items-center gap-2">
        <span>⏰</span>
        <span>آخر 48 ساعة على عرض الشحن المجاني هذا الأسبوع</span>
      </div>

      {/* Offer cards */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-muted">اختاري العرض:</p>
        {offers.map((offer) => (
          <label
            key={offer.qty}
            className={`relative flex items-center justify-between gap-2 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selected === offer.qty
                ? offer.highlight
                  ? "border-brand-brown bg-amber-50"
                  : "border-brand-brown bg-brand-cream"
                : "border-brand-border bg-white hover:border-brand-gold"
            }`}
          >
            <input
              type="radio"
              name="offer"
              value={offer.qty}
              checked={selected === offer.qty}
              onChange={() => {
                setSelected(offer.qty);
                setSelectedOffer(
                  offer.qty,
                  offer.price as BundlePrice,
                  offer.originalPrice as 129 | 258 | 387
                );
              }}
              className="sr-only"
            />
            <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  selected === offer.qty ? "border-brand-brown" : "border-brand-border"
                }`}
              >
                {selected === offer.qty && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-brown" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-brand-brown text-[13px] md:text-sm leading-snug">{offer.label}</span>
                  {offer.badge && (
                    <span
                      className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                        offer.highlight
                          ? "bg-brand-brown text-white"
                          : offer.savings > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-brand-cream text-brand-muted"
                      }`}
                    >
                      {offer.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] md:text-xs text-brand-muted mt-0.5">{offer.sublabel}</p>
              </div>
            </div>
            <div className="text-left flex-shrink-0">
              <p className="font-black text-brand-brown font-inter text-[15px] md:text-base whitespace-nowrap">{offer.price} ريال</p>
              {offer.savings > 0 && (
                <p className="text-[10px] md:text-xs text-brand-muted line-through font-inter whitespace-nowrap">{offer.originalPrice} ريال</p>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Savings callout */}
      {selectedOffer.savings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-sm text-green-800 text-center font-medium">
          🎉 وفّري <span className="font-bold font-inter">{selectedOffer.savings} ريال</span> مع هذا العرض
        </div>
      )}

      {/* CTA — dynamic high-conversion copy per offer */}
      <button
        onClick={handleAddToCart}
        id="product-hero-cta"
        className="w-full bg-[#3D2817] text-white font-black py-4 rounded-xl text-[1rem] hover:bg-[#5A3825] transition-all active:scale-[0.98] shadow-lg relative overflow-hidden shimmer"
        style={{ letterSpacing: "0.01em" }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 flex-wrap">
          <span>
            {selected === 1 && "ابدئي روتينك الآن"}
            {selected === 2 && "ثبّتي نتيجتك الآن"}
            {selected === 3 && "احصلي على النتيجة الكاملة"}
          </span>
          <span className="font-inter bg-[#C8A876] text-[#3D2817] rounded-lg px-2.5 py-0.5 text-sm font-black">
            {selectedOffer.price} ريال
          </span>
        </span>
      </button>

      {/* Soft reassurance line — direct under CTA */}
      <p className="text-center text-[11.5px] text-[#5A4A3E] font-semibold flex items-center justify-center gap-1.5">
        <ShieldCheck size={13} className="text-[#1E7A47]" />
        <span>تستلمي ثم تدفعين · ما تدفعين ريال واحد مقدّماً</span>
      </p>
    </div>
  );
}

