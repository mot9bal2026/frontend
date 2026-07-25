"use client";

import { useEffect } from "react";
import { firePixelEvent } from "./PixelProvider";

type Props = {
  productSlug: string;
  productNameAr: string;
  price: number;
};

/** Deferred ViewContent — fires after idle so it never blocks LCP/TBT. */
export function ViewContentFire({ productSlug, productNameAr, price }: Props) {
  useEffect(() => {
    const fire = () => {
      firePixelEvent("ViewContent", {
        event_id: crypto.randomUUID(),
        value: price,
        currency: "SAR",
        content_ids: [productSlug],
        content_name: productNameAr,
      });
    };

    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(fire, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }

    const t = globalThis.setTimeout(fire, 1500);
    return () => globalThis.clearTimeout(t);
  }, [productSlug, productNameAr, price]);

  return null;
}

