"use client";

import { X, ShoppingBag, Shield, Truck, Plus } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { products } from "@/lib/products";
import type { ProductSlug } from "@/lib/products";
import { CartLineItem } from "./CartLineItem";
import { firePixelEvent } from "@/components/tracking/PixelProvider";

export function CartDrawer() {
  const { isOpen, closeCart, items, openCheckout, addItem, getTotal } = useCartStore();

  const total = getTotal();
  const slugsInCart = new Set(items.map((i) => i.productSlug));

  const crossSellProduct = products.find((p) => !slugsInCart.has(p.slug));

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-brand-border">
          <h2 className="font-bold text-brand-brown text-lg flex items-center gap-2">
            <ShoppingBag size={20} />
            سلتك
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-brand-muted hover:text-brand-brown transition-colors"
            aria-label="إغلاق السلة"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-brand-muted">
              <ShoppingBag size={40} className="mx-auto mb-3 opacity-30" />
              <p>سلتك فارغة</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <CartLineItem key={`${item.productSlug}-${item.isBridgeUpsell}`} item={item} />
              ))}

              {/* Cross-sell */}
              {crossSellProduct && (
                <div className="border border-brand-border rounded-xl p-4 bg-brand-cream mt-4">
                  <p className="text-xs text-brand-muted mb-2 font-medium">أضيفي أيضاً 🌟</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-brand-brown text-sm leading-snug">
                        {crossSellProduct.nameAr}
                      </p>
                      <p className="text-brand-gold font-bold font-inter mt-1">199 ريال</p>
                    </div>
                    <button
                      onClick={() => {
                        addItem({
                          productSlug: crossSellProduct.slug,
                          productNameAr: crossSellProduct.nameAr,
                          offerQty: 1,
                          unitBundlePrice: 199,
                        });
                      }}
                      className="flex items-center gap-1 bg-brand-brown text-white px-3 py-2 rounded-lg text-sm hover:bg-brand-coffee transition-colors"
                    >
                      <Plus size={14} />
                      أضيفي
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Footer — always visible */}
        <div className="border-t-2 border-[#C8A876]/30 bg-[#FBF7F0]">
          {items.length > 0 ? (
            <div className="px-4 pt-3.5 pb-5">
              {/* Total row */}
              <div className="flex justify-between items-center mb-1.5 bg-white rounded-xl px-3 py-2.5 border border-[#E6D8C8]">
                <span className="text-[#7A6A5E] text-sm font-medium">المجموع الكلي</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-[#3D2817] text-xl font-inter">{total}</span>
                  <span className="text-sm text-[#7A6A5E] font-medium">ريال</span>
                </div>
              </div>
              <p className="text-[10px] text-[#7A6A5E] mb-3 text-center font-medium">
                🚚 شحن مجاني · الدفع كاش أو شبكة عند الاستلام
              </p>

              {/* Checkout button */}
              <button
                onClick={() => {
                  firePixelEvent("InitiateCheckout", {
                    event_id: crypto.randomUUID(),
                    value: total,
                    currency: "SAR",
                    content_ids: items.map((i) => i.productSlug),
                  });
                  openCheckout();
                }}
                className="w-full bg-[#3D2817] text-white font-black py-4 rounded-2xl text-base hover:bg-[#5A3825] transition-colors active:scale-[0.98] shadow-xl shimmer relative overflow-hidden"
              >
                إتمام الطلب — {total} ريال ←
              </button>

              {/* Trust strip */}
              <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-[#7A6A5E] font-medium">
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-[#C8A876]" />
                  بدون دفع أونلاين
                </span>
                <span className="text-[#C8A876]">·</span>
                <span className="flex items-center gap-1">
                  <Truck size={11} className="text-[#C8A876]" />
                  1–3 أيام
                </span>
                <span className="text-[#C8A876]">·</span>
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-[#C8A876]" />
                  ضمان 14 يوم
                </span>
              </div>
            </div>
          ) : (
            <div className="px-4 py-5 text-center text-[#7A6A5E] text-sm">
              <ShoppingBag size={32} className="mx-auto mb-2 opacity-20" />
              <p className="font-medium">سلتك فارغة</p>
              <p className="text-xs mt-1 text-[#9A8A7E]">أضيفي منتجاً للبدء</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
