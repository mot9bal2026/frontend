"use client";

import { useEffect, useState } from "react";
import type { Product, BundlePrice } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { firePixelEvent } from "@/components/tracking/PixelProvider";

type Props = {
  product: Product;
  selectedQty: 1 | 2 | 3;
  selectedPrice: BundlePrice;
};

export function StickyMobileCTA({ product, selectedQty, selectedPrice }: Props) {
  const [visible, setVisible] = useState(false);
  const { addItem, goToCheckout } = useCartStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    const hero = document.getElementById("product-hero-cta");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    addItem({
      productSlug: product.slug,
      productNameAr: product.nameAr,
      offerQty: selectedQty,
      unitBundlePrice: selectedPrice,
    });
    firePixelEvent("AddToCart", {
      event_id: crypto.randomUUID(),
      value: selectedPrice,
      currency: "SAR",
      content_ids: [product.slug],
    });
    firePixelEvent("InitiateCheckout", {
      event_id: crypto.randomUUID(),
      value: selectedPrice,
      currency: "SAR",
      content_ids: [product.slug],
    });
    goToCheckout();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-brand-border px-4 py-3 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-brand-muted">{selectedQty === 1 ? "1 قطعة" : selectedQty === 2 ? "2 قطعة" : "3 قطع"}</p>
          <p className="font-bold text-brand-brown font-inter">{selectedPrice} ريال</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex-1 bg-brand-brown text-white font-bold py-3 rounded-xl text-sm hover:bg-brand-coffee transition-colors active:scale-95"
        >
          اختاري العرض
        </button>
      </div>
    </div>
  );
}

