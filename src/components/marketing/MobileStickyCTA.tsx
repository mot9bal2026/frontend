"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/products";
import { ProductPhoto } from "@/components/product/ProductPhoto";

type Props = {
  product: Product;
};

const offerLabels: Record<1 | 2 | 3, string> = {
  1: "عبوة واحدة",
  2: "3 عبوات · فرق تلمسه",
  3: "6 عبوات · العلاج النهائي",
};

/* Mobile-only sticky CTA bar that appears after user scrolls past hero.
   Hides when the order form is on screen so it never covers name/phone fields. */
export function MobileStickyCTA({ product }: Props) {
  const [visible, setVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const {
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
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  /* Hide sticky bar while the customer is filling the order form */
  useEffect(() => {
    const form = document.getElementById("order-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { root: null, threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const savingsPct =
    selectedOfferOriginal > 0
      ? Math.round(((selectedOfferOriginal - selectedOfferPrice) / selectedOfferOriginal) * 100)
      : 0;

  const showBar = visible && unlocked && !formInView;

  /* Scroll to the always-visible order form and focus the name field */
  const handleQuickBuy = () => {
    const form = document.getElementById("order-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      const nameInput =
        document.getElementById("order-name") as HTMLInputElement | null ??
        form.querySelector<HTMLInputElement>('input[name="name"]');
      window.setTimeout(() => nameInput?.focus({ preventScroll: true }), 500);
    }
  };

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        showBar ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
      aria-hidden={!showBar}
    >
      <div className="bg-white border-t-2 border-[#C8A876] shadow-[0_-8px_32px_rgba(61,40,23,0.15)]">
        <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#FBF7F0] to-[#E6D8C8] flex items-center justify-center overflow-hidden shadow border-2 border-[#C8A876]/40">
            <ProductPhoto
              src="/awafi-oil-bottle.webp"
              alt={product.nameAr}
              className="w-full h-full object-contain p-0.5"
              fallbackWrapperClassName="w-full h-full"
              iconSize={22}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#C8A876] font-bold truncate">
              {offerLabels[selectedOfferQty]}
            </p>
            <p className="flex items-baseline gap-1.5 mt-0.5 flex-wrap">
              <span className="font-black text-[#0F3024] text-[1.1rem] font-inter leading-none">
                {selectedOfferPrice}
              </span>
              <span className="text-[11px] text-[#7A6A5E] font-medium">ريال</span>
              {selectedOfferOriginal > selectedOfferPrice && (
                <>
                  <span className="text-[10px] text-[#9A8A7E] line-through font-inter">
                    {selectedOfferOriginal}
                  </span>
                  <span className="text-[9px] bg-green-600 text-white font-black px-1.5 py-0.5 rounded-full">
                    وفّر {savingsPct}%
                  </span>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickBuy}
            className="bg-brand-apothecary text-white font-black px-4 sm:px-5 min-h-[48px] py-3 rounded-2xl text-[0.88rem] shadow-lg active:scale-95 transition-all whitespace-nowrap touch-manipulation"
          >
            اطلب الآن ←
          </button>
        </div>
      </div>
    </div>
  );
}
