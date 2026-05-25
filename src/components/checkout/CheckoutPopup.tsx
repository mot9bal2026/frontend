"use client";

import { X, Shield, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cart";
import { getAttribution } from "@/lib/attribution";
import { useRouter } from "next/navigation";
import { firePixelEvent } from "@/components/tracking/PixelProvider";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "اكتبي الاسم الكامل"),
  phone: z
    .string()
    .trim()
    .regex(/^05\d{8}$/, "اكتبي رقم جوال سعودي صحيح يبدأ بـ 05"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";

/**
 * Generates a customer-facing order number starting at 4500+
 * Format: ISH-2026-004500, ISH-2026-004501, ...
 * Persists a small counter in localStorage for monotonic growth in the same browser.
 */
function generateDisplayOrderNumber(): string {
  const year = new Date().getFullYear();
  const BASE = 4500;

  let nextSeq: number;
  try {
    const stored = Number(localStorage.getItem("__ish_order_seq") ?? "0");
    nextSeq = Number.isFinite(stored) && stored > 0 ? stored + 1 : 0;
    if (!nextSeq) {
      const minutesSinceEpoch = Math.floor(Date.now() / 60000);
      nextSeq = (minutesSinceEpoch % 600) + Math.floor(Math.random() * 12);
    }
    localStorage.setItem("__ish_order_seq", String(nextSeq));
  } catch {
    nextSeq = Math.floor(Math.random() * 600);
  }

  const num = BASE + nextSeq;
  return `ISH-${year}-${String(num).padStart(6, "0")}`;
}

export function CheckoutPopup() {
  const { isCheckoutOpen, closeCheckout, items, getTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) });

  const total = getTotal();

  const onSubmit = (data: CheckoutForm): void => {
    setIsSubmitting(true);

    const orderNumber = generateDisplayOrderNumber();
    const leadEventId = crypto.randomUUID();
    const purchaseEventId = crypto.randomUUID();
    const attribution = getAttribution();

    firePixelEvent("Lead", { event_id: leadEventId, value: total, currency: "SAR" });

    const finalItems = items.map((i) => ({
      product_slug: i.productSlug as string,
      product_name_ar: i.productNameAr,
      qty: i.offerQty as number,
      price_sar: i.unitBundlePrice as number,
      is_bridge_upsell: i.isBridgeUpsell ?? false,
    }));

    const subtotal = finalItems.reduce((s, i) => s + i.price_sar, 0);
    const totalFinal = subtotal;

    firePixelEvent("Purchase", {
      event_id: purchaseEventId,
      value: totalFinal,
      currency: "SAR",
      contents: finalItems.map((i) => ({
        id: i.product_slug,
        quantity: i.qty,
        item_price: i.price_sar,
      })),
    });

    // Fire-and-forget: save the order in the background so the UX is instant.
    // Any backend block (e.g. MaxMind) is silently ignored on the customer side;
    // the order still goes to Google Sheets if the backend accepts it.
    const payload = {
      event_id: purchaseEventId,
      customer: { name: data.name, phone: data.phone },
      items: finalItems,
      totals: { subtotal_sar: subtotal, shipping_sar: 0, total_sar: totalFinal },
      attribution: {
        utm_source: attribution.utm_source,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        fbclid: attribution.fbclid,
        fbp: attribution.fbp,
        fbc: attribution.fbc,
        ttclid: attribution.ttclid,
        sc_click_id: attribution.sc_click_id,
      },
      page: {
        url: typeof window !== "undefined" ? window.location.href : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      },
      display_order_number: orderNumber,
    };

    try {
      fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore — UX must not block on network */
    }

    clearCart();
    closeCheckout();
    router.push(`/thank-you?order=${orderNumber}&total=${totalFinal}`);
  };

  if (!isCheckoutOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={() => {
          if (!isSubmitting) closeCheckout();
        }}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-screen overflow-y-auto">
          {/* Checkout form */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <h2 className="font-bold text-brand-brown text-lg">تأكيد طلبك</h2>
                <button
                  onClick={closeCheckout}
                  className="p-1.5 text-brand-muted hover:text-brand-brown transition-colors"
                  aria-label="إغلاق"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Trust banner above form */}
              <div className="px-5 pt-1 pb-3">
                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-[11px] text-green-800 text-center font-medium flex items-center justify-center gap-1.5">
                  <Shield size={12} />
                  معلوماتك محمية · ما راح ندفعك تدفعين أونلاين
                </div>
              </div>

              {/* Order summary */}
              <div className="px-5 pb-3 bg-[#FAF6F0] border-y border-[#E6D8C8]">
                <p className="text-xs text-[#7A6A5E] mb-2 font-bold">ملخص طلبك:</p>
                {items.map((item) => (
                  <div key={`${item.productSlug}-${item.isBridgeUpsell}`} className="flex justify-between text-sm py-1">
                    <span className="text-[#3D2817]">{item.productNameAr}</span>
                    <span className="font-bold font-inter text-[#3D2817]">{item.unitBundlePrice} ريال</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs py-1 text-green-700 font-bold">
                  <span>الشحن</span>
                  <span>مجاني ✓</span>
                </div>
                <div className="border-t border-[#E6D8C8] mt-1.5 pt-2 flex justify-between font-black text-base">
                  <span className="text-[#3D2817]">الإجمالي</span>
                  <span className="text-[#3D2817] font-inter">{total} ريال</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4 space-y-3">
                <div>
                  <label className="block text-sm font-bold text-[#3D2817] mb-1">
                    الاسم الكامل
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="مثال: نورة محمد العتيبي"
                    autoComplete="name"
                    className="w-full border border-[#E6D8C8] rounded-xl px-4 py-3 text-[#211915] placeholder:text-[#7A6A5E] focus:outline-none focus:border-[#3D2817] focus:ring-2 focus:ring-[#3D2817]/10 text-right bg-white transition-all"
                    dir="rtl"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#3D2817] mb-1">
                    رقم الجوال
                    <span className="text-[10px] text-[#7A6A5E] font-normal mr-2">(نتصلك للتأكيد)</span>
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="05XXXXXXXX"
                    autoComplete="tel"
                    className="w-full border border-[#E6D8C8] rounded-xl px-4 py-3 text-[#211915] placeholder:text-[#7A6A5E] focus:outline-none focus:border-[#3D2817] focus:ring-2 focus:ring-[#3D2817]/10 font-inter text-right bg-white transition-all"
                    dir="ltr"
                    inputMode="tel"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3D2817] text-white font-black py-4 rounded-xl text-base hover:bg-[#5A3825] transition-colors disabled:opacity-60 active:scale-95 shadow-lg"
                >
                  {isSubmitting ? "جاري التأكيد..." : `أكّدي طلبك — ${total} ريال`}
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] text-[#7A6A5E]">
                  <Lock size={11} />
                  <span>بياناتك محمية · بدون مشاركة مع أي طرف</span>
                </div>
              </form>
        </div>
      </div>
    </>
  );
}
