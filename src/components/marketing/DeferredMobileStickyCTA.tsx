"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/lib/products";

const MobileStickyCTA = dynamic(
  () =>
    import("@/components/marketing/MobileStickyCTA").then((m) => m.MobileStickyCTA),
  { ssr: false }
);

export function DeferredMobileStickyCTA({ product }: { product: Product }) {
  return <MobileStickyCTA product={product} />;
}
