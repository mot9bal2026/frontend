"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/lib/products";

const BundlePicker = dynamic(
  () => import("@/components/product/BundlePicker").then((m) => m.BundlePicker),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 rounded-2xl bg-[#FBF7F0] border border-[#E6D8C8] animate-pulse" />
    ),
  }
);

/** Below-fold order form — keep out of initial JS parse on mobile. */
export function DeferredBundlePicker({ product }: { product: Product }) {
  return <BundlePicker product={product} />;
}
