"use client";

import { Trash2 } from "lucide-react";
import { useCartStore, type CartItem } from "@/store/cart";

type Props = {
  item: CartItem;
};

const offerLabel: Record<number, string> = {
  1: "1 قطعة",
  2: "2 قطعة",
  3: "3 قطع",
};

export function CartLineItem({ item }: Props) {
  const { removeItem } = useCartStore();

  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b border-brand-border last:border-0">
      <div className="flex-1">
        <p className="font-medium text-brand-brown text-sm leading-snug">
          {item.productNameAr}
        </p>
        <p className="text-xs text-brand-muted mt-0.5">
          {item.isBridgeUpsell ? "عرض ترقية" : offerLabel[item.offerQty]}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-brand-brown font-inter">
          {item.unitBundlePrice} ريال
        </span>
        <button
          onClick={() => removeItem(item.productSlug, item.isBridgeUpsell)}
          className="text-brand-muted hover:text-brand-coral transition-colors"
          aria-label="إزالة"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
