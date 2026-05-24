"use client";

import { useEffect } from "react";
import { firePixelEvent } from "./PixelProvider";

type Props = {
  productSlug: string;
  productNameAr: string;
  price: number;
};

export function ViewContentFire({ productSlug, productNameAr, price }: Props) {
  useEffect(() => {
    firePixelEvent("ViewContent", {
      event_id: crypto.randomUUID(),
      value: price,
      currency: "SAR",
      content_ids: [productSlug],
      content_name: productNameAr,
    });
  }, [productSlug, productNameAr, price]);

  return null;
}
