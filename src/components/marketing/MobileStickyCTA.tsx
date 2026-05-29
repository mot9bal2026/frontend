"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/products";
import { firePixelEvent } from "@/components/tracking/PixelProvider";

type Props = {
  product: Product;
};

const offerLabels: Record<1 | 2 | 3, string> = {
  1: "علبة واحدة",
  2: "علبتان",
  3: "ثلاث علب",
};

/* Mobile-only sticky CTA bar that appears after user scrolls past hero.
   Reflects the exact offer the user has selected in BundlePicker. */
export function MobileStickyCTA({ product }: Props) {
  const [visible, setVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const {
    addItem,
    openCart,
    selectedOfferQty,
    selectedOfferPrice,
    selectedOfferOriginal,
  } = useCartStore();

  /* Unlock after 25 seconds — let the user read first */
  useEffect(() => {
    const timer = setTimeout(() => setUnlocked(true), 25000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (unlocked) setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  const savingsPct = Math.round(
    ((selectedOfferOriginal - selectedOfferPrice) / selectedOfferOriginal) * 100
  );

  const handleQuickBuy = () => {
    addItem({
      productSlug: product.slug,
      productNameAr: product.nameAr,
      offerQty: selectedOfferQty,
      unitBundlePrice: selectedOfferPrice,
    });
    firePixelEvent("AddToCart", {
      event_id: crypto.randomUUID(),
      value: selectedOfferPrice,
      currency: "SAR",
      content_ids: [product.slug],
      content_name: product.nameAr,
    });
    openCart();
  };

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
    >
      <div className="bg-white border-t-2 border-[#C8A876] shadow-[0_-8px_32px_rgba(61,40,23,0.15)]">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Product mini info */}
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FBF7F0] to-[#E6D8C8] flex items-center justify-center overflow-hidden shadow border-2 border-[#C8A876]/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/product-box-lux.png?v=3" alt="قهوة إشراقة" className="w-full h-full object-contain p-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#C8A876] font-bold">{offerLabels[selectedOfferQty]}</p>
            <p className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-black text-[#3D2817] text-[1.1rem] font-inter leading-none">
                {selectedOfferPrice}
              </span>
              <span className="text-[11px] text-[#7A6A5E] font-medium">ريال</span>
              {selectedOfferOriginal > selectedOfferPrice && (
                <>
                  <span className="text-[10px] text-[#9A8A7E] line-through font-inter">
                    {selectedOfferOriginal}
                  </span>
                  <span className="text-[9px] bg-green-600 text-white font-black px-1.5 py-0.5 rounded-full">
                    وفّري {savingsPct}%
                  </span>
                </>
              )}
            </p>
          </div>
          {/* CTA */}
          <button
            onClick={handleQuickBuy}
            className="bg-[#3D2817] text-white font-black px-5 py-3.5 rounded-2xl text-[0.88rem] shadow-lg active:scale-95 transition-all whitespace-nowrap shimmer relative overflow-hidden"
          >
            اطلبي الآن ←
          </button>
        </div>
      </div>
    </div>
  );
}
