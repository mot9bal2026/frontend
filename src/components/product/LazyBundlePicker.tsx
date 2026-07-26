"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  isPrimary?: boolean;
};

/**
 * Shows a lightweight SSR-friendly shell first, then hydrates the full
 * BundlePicker (zod/rhf) after idle — cuts Total Blocking Time on mobile.
 */
export function LazyBundlePicker({ product, isPrimary }: Props) {
  const [Picker, setPicker] = useState<React.ComponentType<Props> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      import("@/components/product/BundlePicker").then((m) => {
        if (!cancelled) setPicker(() => m.BundlePicker);
      });
    };

    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(load, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const t = globalThis.setTimeout(load, 150);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  if (!Picker) {
    return <BundlePickerShell product={product} />;
  }

  return <Picker product={product} isPrimary={isPrimary} />;
}

function BundlePickerShell({ product }: { product: Product }) {
  return (
    <div className="space-y-3" aria-busy="true">
      <div className="rounded-2xl border-2 border-[#C8A876] bg-[#FBF7F0] p-4">
        <p className="font-black text-[#0F3024] text-sm">4 عبوات · الأكثر طلباً</p>
        <p className="text-[13px] text-[#5A4A3E] mt-1">
          {product.price.two} ريال{" "}
          <span className="line-through text-[#9A8A7E] text-[11px]">
            {product.price.one * product.bottles.two}
          </span>
        </p>
      </div>
      <div className="h-12 rounded-xl bg-[#0F3024]/90 text-white font-black flex items-center justify-center text-sm">
        جاري تحميل نموذج الطلب…
      </div>
    </div>
  );
}
