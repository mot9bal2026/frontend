import { create } from "zustand";
import type { ProductSlug } from "@/lib/products";

export type CartItem = {
  productSlug: ProductSlug;
  productNameAr: string;
  offerQty: 1 | 2 | 3;
  unitBundlePrice: 199 | 279 | 349;
  isBridgeUpsell?: boolean;
};

/**
 * The drawer has two internal views: the cart summary (`cart`)
 * and the checkout form (`checkout`). This replaces the old separate
 * `CheckoutPopup` so we never stack two overlays on top of each other.
 */
export type DrawerView = "cart" | "checkout";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  view: DrawerView;

  /* Tracks which offer the user has selected on the product page
     so the mobile sticky CTA can reflect the right price */
  selectedOfferQty: 1 | 2 | 3;
  selectedOfferPrice: 199 | 279 | 349;
  selectedOfferOriginal: 199 | 398 | 597;
  setSelectedOffer: (qty: 1 | 2 | 3, price: 199 | 279 | 349, original: 199 | 398 | 597) => void;

  addItem: (item: CartItem) => void;
  removeItem: (slug: ProductSlug, isBridgeUpsell?: boolean) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  goToCheckout: () => void;
  backToCart: () => void;
  closeAll: () => void;

  getTotal: () => number;
  getSubtotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  view: "cart",

  selectedOfferQty: 2,
  selectedOfferPrice: 279,
  selectedOfferOriginal: 398,
  setSelectedOffer: (qty, price, original) =>
    set({ selectedOfferQty: qty, selectedOfferPrice: price, selectedOfferOriginal: original }),

  addItem: (item) => {
    set((state) => {
      const existing = state.items.findIndex(
        (i) => i.productSlug === item.productSlug && !i.isBridgeUpsell && !item.isBridgeUpsell
      );
      if (existing >= 0 && !item.isBridgeUpsell) {
        const updated = [...state.items];
        updated[existing] = item;
        return { items: updated };
      }
      return { items: [...state.items, item] };
    });
  },

  removeItem: (slug, isBridgeUpsell) => {
    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(
            i.productSlug === slug &&
            (isBridgeUpsell === undefined || i.isBridgeUpsell === isBridgeUpsell)
          )
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  /* Open the drawer to the cart view (default entry point) */
  openCart: () => set({ isOpen: true, view: "cart" }),
  closeCart: () => set({ isOpen: false }),

  /* Switch the drawer to the checkout form view — same panel, no stacking */
  goToCheckout: () => set({ view: "checkout", isOpen: true }),
  backToCart: () => set({ view: "cart" }),

  /* Reset everything — called after successful order + on thank-you mount */
  closeAll: () => set({ isOpen: false, view: "cart", items: [] }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.unitBundlePrice, 0);
  },

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.unitBundlePrice, 0);
  },
}));
