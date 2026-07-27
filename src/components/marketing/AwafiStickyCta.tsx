"use client";

import { useEffect, useState } from "react";

const AD_RED = "#E8112D";
const RED_BORDER = "#EBCFC9";

type Props = {
  price: number;
  originalPrice: number;
};

/**
 * Floating order bar for the Awafi landing page.
 *
 * Two behaviours matter here:
 *
 * 1. It stays out of the way for the first few seconds. Appearing instantly
 *    on load reads as an ad overlay and gets dismissed before the visitor has
 *    any reason to want it.
 * 2. It retires permanently the moment the visitor starts typing in the order
 *    form. At that point the bar is no longer a shortcut — it is a second
 *    competing button next to the real submit, and it covers the bottom of the
 *    form on short screens.
 */
export function AwafiStickyCta({ price, originalPrice }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [retired, setRetired] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    /* Delegated on the document because BundlePicker is code-split and the
       form does not exist yet when this component mounts. Capture phase so it
       still fires if a field stops propagation. */
    const onInput = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest?.("#order-form")) setRetired(true);
    };
    document.addEventListener("input", onInput, true);
    return () => document.removeEventListener("input", onInput, true);
  }, []);

  const visible = revealed && !retired;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed bottom-0 inset-x-0 z-50 border-t-2 shadow-[0_-4px_20px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "#fff", borderColor: RED_BORDER }}
    >
      <div className="mx-auto max-w-lg flex items-center gap-3 px-3 py-2.5">
        <div className="flex-shrink-0 text-center leading-none">
          <p
            className="text-[19px] md:text-[21px] font-black"
            style={{ color: AD_RED }}
          >
            {price} ريال
          </p>
          <p className="text-[11.5px] text-[#7A6A5E] line-through mt-1 font-semibold">
            {originalPrice} ريال
          </p>
        </div>
        <a
          href="#order"
          className={`lp-cta-pulse flex-1 flex flex-col items-center justify-center text-white font-black py-2.5 rounded-xl active:scale-[0.98] transition-transform`}
          style={{ backgroundColor: AD_RED }}
        >
          <span className="text-[17px] md:text-[18px]">اطلب الآن ←</span>
          <span className="text-[11px] font-bold text-white/90 mt-0.5">
            الدفع عند الاستلام
          </span>
        </a>
      </div>
    </div>
  );
}
