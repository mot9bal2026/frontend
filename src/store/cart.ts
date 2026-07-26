import { create } from "zustand";
import type { BundlePrice } from "@/lib/products";

/**
 * There is no shopping cart anymore — checkout happens inline on the product
 * page via the always-visible order form. This store only exists to sync the
 * selected offer (qty/price) between `BundlePicker` and `MobileStickyCTA`.
 */
type OfferState = {
  selectedOfferQty: 1 | 2 | 3;
  selectedOfferPrice: BundlePrice;
  selectedOfferOriginal: number;
  setSelectedOffer: (qty: 1 | 2 | 3, price: BundlePrice, original: number) => void;
};

export const useCartStore = create<OfferState>((set) => ({
  selectedOfferQty: 2,
  selectedOfferPrice: 149,
  selectedOfferOriginal: 516,
  setSelectedOffer: (qty, price, original) =>
    set({ selectedOfferQty: qty, selectedOfferPrice: price, selectedOfferOriginal: original }),
}));
