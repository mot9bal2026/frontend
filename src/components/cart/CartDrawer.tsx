"use client";

import { useEffect, useState } from "react";
import {
  X,
  ShoppingBag,
  Shield,
  Truck,
  Plus,
  ChevronRight,
  ArrowRight,
  Star,
  Flame,
  Phone,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { useForm, type UseFormRegister, type UseFormHandleSubmit, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCartStore, type CartItem } from "@/store/cart";
import { products } from "@/lib/products";
import { CartLineItem } from "./CartLineItem";
import { firePixelEvent } from "@/components/tracking/PixelProvider";
import { getAttribution } from "@/lib/attribution";

/* ════════════════════════════════════════════════════════════════
   Single-panel cart + checkout drawer.
   Two internal views: "cart" → "checkout" → navigate to /thank-you.
   No popup stacking, no orphan overlays.
════════════════════════════════════════════════════════════════ */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";

/**
 * Reduce any pasted Saudi mobile format (+966 / 00966 / 966 / 05 / 5,
 * with spaces or dashes) down to the national "5XXXXXXXX" digits.
 * Returns null when it is not a valid Saudi mobile number.
 */
function saudiNationalDigits(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00966")) digits = digits.slice(5);
  else if (digits.startsWith("966")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return /^5\d{8}$/.test(digits) ? digits : null;
}

/** Canonical local format sent to the backend: 05XXXXXXXX. */
function toLocalSaudiPhone(value: string): string {
  const national = saudiNationalDigits(value);
  return national ? `0${national}` : value.trim();
}

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "اكتبي الاسم الكامل"),
  phone: z
    .string()
    .trim()
    .refine((v) => saudiNationalDigits(v) !== null, "اكتبي رقم جوال سعودي صحيح"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

/** Customer-facing order number starting at 4500+ for social proof. */
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

export function CartDrawer() {
  const {
    isOpen,
    view,
    items,
    closeCart,
    addItem,
    getTotal,
    goToCheckout,
    backToCart,
    closeAll,
  } = useCartStore();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getTotal();
  const slugsInCart = new Set(items.map((i) => i.productSlug));
  const crossSellProduct = products.find((p) => !slugsInCart.has(p.slug));

  /* ──────────────────────────────────────────────
     Form (only active in checkout view)
  ────────────────────────────────────────────── */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched", // errors clear as user fixes them; button stays clickable
  });

  /* If cart becomes empty mid-checkout, bounce back to cart view */
  useEffect(() => {
    if (items.length === 0 && view === "checkout") {
      backToCart();
    }
  }, [items.length, view, backToCart]);

  /* Reset the form when drawer closes (after animation) */
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => reset(), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen, reset]);

  const handleProceedToCheckout = () => {
    firePixelEvent("InitiateCheckout", {
      event_id: crypto.randomUUID(),
      value: total,
      currency: "SAR",
      content_ids: items.map((i) => i.productSlug),
    });
    goToCheckout();
  };

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

    const payload = {
      event_id: purchaseEventId,
      customer: { name: data.name, phone: toLocalSaudiPhone(data.phone) },
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
      /* network must never block the UX */
    }

    /* Single atomic reset: closes drawer, clears cart, resets view */
    closeAll();
    router.push(`/thank-you?order=${orderNumber}&total=${totalFinal}`);
  };

  if (!isOpen) return null;

  const isCheckoutView = view === "checkout";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 z-50 backdrop-blur-[2px]"
        onClick={() => {
          if (!isSubmitting) closeCart();
        }}
        aria-hidden="true"
      />

      {/* Drawer — right-side panel on desktop, full sheet on mobile */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">
        {/* ─── HEADER (shared) ─── */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#E6D8C8]">
          {isCheckoutView ? (
            <button
              onClick={backToCart}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 text-[#7A6A5E] hover:text-[#3D2817] transition-colors disabled:opacity-50 -mr-1"
              aria-label="رجوع للسلة"
            >
              <ArrowRight size={18} />
              <span className="text-sm font-semibold">رجوع للسلة</span>
            </button>
          ) : (
            <h2 className="font-bold text-[#3D2817] text-lg flex items-center gap-2">
              <ShoppingBag size={20} />
              سلتك
              {items.length > 0 && (
                <span className="text-xs font-inter bg-[#3D2817] text-white rounded-full w-5 h-5 flex items-center justify-center font-black">
                  {items.length}
                </span>
              )}
            </h2>
          )}

          <button
            onClick={closeCart}
            disabled={isSubmitting}
            className="p-2 text-[#7A6A5E] hover:text-[#3D2817] transition-colors disabled:opacity-50"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* ─── BODY ─── */}
        {isCheckoutView ? (
          <CheckoutView
            items={items}
            total={total}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        ) : (
          <CartView
            items={items}
            crossSellProduct={crossSellProduct}
            addItem={addItem}
            total={total}
            onProceed={handleProceedToCheckout}
          />
        )}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   CART VIEW
════════════════════════════════════════════════════════════════ */
function CartView({
  items,
  crossSellProduct,
  addItem,
  total,
  onProceed,
}: {
  items: CartItem[];
  crossSellProduct: (typeof products)[number] | undefined;
  addItem: (item: CartItem) => void;
  total: number;
  onProceed: () => void;
}) {
  return (
    <>
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-12 text-[#7A6A5E]">
            <ShoppingBag size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">سلتك فارغة</p>
            <p className="text-xs mt-1 text-[#9A8A7E]">أضيفي منتجاً للبدء</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <CartLineItem
                key={`${item.productSlug}-${item.isBridgeUpsell}`}
                item={item}
              />
            ))}

            {/* Cross-sell — only when there are items */}
            {crossSellProduct && (
              <div className="border border-[#E6D8C8] rounded-xl p-4 bg-[#FAF6F0] mt-4">
                <p className="text-xs text-[#7A6A5E] mb-2 font-bold uppercase tracking-wider">
                  أضيفي أيضاً
                </p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-bold text-[#3D2817] text-sm leading-snug">
                      {crossSellProduct.nameAr}
                    </p>
                    <p className="text-[#C8A876] font-black font-inter mt-1">199 ريال</p>
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
                    className="flex items-center gap-1 bg-[#3D2817] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#5A3825] transition-colors active:scale-95"
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

      {/* Sticky footer */}
      {items.length > 0 && (
        <div className="border-t-2 border-[#C8A876]/30 bg-[#FBF7F0]">
          <div className="px-4 pt-3.5 pb-5">
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

            <button
              onClick={onProceed}
              className="w-full bg-brand-apothecary text-white font-black py-4 rounded-2xl text-base hover:bg-[#174A33] transition-colors active:scale-[0.98] shadow-[0_10px_30px_rgba(30,91,63,0.35)] flex items-center justify-center gap-2"
            >
              <span>تابعي لتأكيد الطلب — {total} ريال</span>
              <ChevronRight size={18} />
            </button>

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
        </div>
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   CHECKOUT VIEW — form lives in the same drawer
════════════════════════════════════════════════════════════════ */
type CheckoutViewProps = {
  items: CartItem[];
  total: number;
  register: UseFormRegister<CheckoutForm>;
  handleSubmit: UseFormHandleSubmit<CheckoutForm>;
  onSubmit: (data: CheckoutForm) => void;
  errors: FieldErrors<CheckoutForm>;
  isSubmitting: boolean;
};

/** Translates offer qty into "boxes · duration" e.g. "2 علب · شهرين" */
function offerLabel(qty: number): string {
  if (qty === 1) return "1 علبة · شهر";
  if (qty === 2) return "2 علب · شهرين";
  if (qty === 3) return "3 علب · 3 شهور";
  return `${qty} علب`;
}

function CheckoutView({
  items,
  total,
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
}: CheckoutViewProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* ─── Urgency banner (matches reference) ─── */}
      <div className="px-5 pt-4">
        <div className="bg-[#FFF1EE] border border-[#F5B5A8] rounded-full px-4 py-2 text-[12px] text-[#B83C26] text-center font-bold flex items-center justify-center gap-1.5">
          <Flame size={13} className="text-[#B83C26]" />
          <span>آخر 48 ساعة على عرض الشحن المجاني</span>
        </div>
      </div>

      {/* ─── Rating + social proof ─── */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-center gap-2 text-[12px] font-semibold text-[#3D2817]">
        <span className="font-inter font-black">4.9</span>
        <span className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={12} className="text-[#E5B547] fill-[#E5B547]" />
          ))}
        </span>
        <span className="text-[#7A6A5E] text-[11.5px] font-medium">
          · <span className="font-inter font-bold">1,200+</span> سعودية طلبت هذا الأسبوع
        </span>
      </div>

      {/* ─── Order summary card ─── */}
      <div className="mx-5 mt-3 mb-4 bg-[#FAF6F0] border border-[#E6D8C8] rounded-2xl p-4">
        <p className="text-[12px] text-[#3D2817] mb-3 font-black">طلبكِ</p>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${item.productSlug}-${item.isBridgeUpsell}`}
              className="flex items-center gap-3"
            >
              {/* Product thumb */}
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-white to-[#F0E6D5] border border-[#E6D8C8] flex items-center justify-center overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/product-box-lux.png?v=3" alt={item.productNameAr} className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#3D2817] text-[13px] leading-snug truncate">
                  {item.productNameAr}
                </p>
                <p className="text-[11px] text-[#7A6A5E] mt-0.5">
                  {offerLabel(item.offerQty)}
                </p>
              </div>
              <div className="text-left flex-shrink-0">
                <p className="font-black font-inter text-[#3D2817] text-[14px] whitespace-nowrap">
                  {item.unitBundlePrice} ريال
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total row */}
        <div className="border-t border-[#E6D8C8] mt-3 pt-3 flex justify-between items-center">
          <span className="text-[#3D2817] font-black text-[14px]">الإجمالي</span>
          <span className="text-brand-apothecary font-black font-inter text-[20px]">
            {total} ريال
          </span>
        </div>

        {/* Free shipping line */}
        <p className="flex items-center justify-center gap-1.5 text-[11.5px] text-brand-apothecary font-bold mt-2.5">
          <ShieldCheck size={13} />
          شحن مجاني · الدفع عند الاستلام فقط
        </p>
      </div>

      {/* ─── Form ─── */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 pb-5 space-y-3">
        <div>
          <label className="block text-[13px] font-black text-[#3D2817] mb-1.5">
            الاسم الكامل
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="مثال: سارة محمد"
            autoComplete="name"
            disabled={isSubmitting}
            className={`w-full border rounded-2xl px-4 py-3.5 text-[#211915] placeholder:text-[#9A8A7E] text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-apothecary/15 text-right bg-white transition-all ${
              errors.name
                ? "border-red-400 focus:border-red-500"
                : "border-[#E6D8C8] focus:border-brand-apothecary"
            }`}
            dir="rtl"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[13px] font-black text-[#3D2817] mb-1.5">
            رقم الجوال السعودي
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="05XXXXXXXX"
            autoComplete="tel"
            disabled={isSubmitting}
            className={`w-full border rounded-2xl px-4 py-3.5 text-[#211915] placeholder:text-[#9A8A7E] text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-apothecary/15 font-inter text-right bg-white transition-all ${
              errors.phone
                ? "border-red-400 focus:border-red-500"
                : "border-[#E6D8C8] focus:border-brand-apothecary"
            }`}
            dir="ltr"
            inputMode="tel"
          />
          {errors.phone ? (
            <p className="text-red-600 text-xs mt-1 font-medium">
              {errors.phone.message}
            </p>
          ) : (
            <p className="text-center text-[11px] text-[#7A6A5E] mt-2 font-medium">
              يرجى إدخال رقم جوال سعودي صحيح لتأكيد التوصيل
            </p>
          )}
        </div>

        {/* Submit — Apothecary Green, always clickable */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-apothecary text-white font-black py-4 rounded-2xl text-[15px] hover:bg-[#174A33] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(30,91,63,0.35)] disabled:opacity-80 disabled:cursor-wait flex items-center justify-center gap-2 mt-4"
        >
          <span>
            {isSubmitting ? "جاري التأكيد..." : "تأكيد الطلب بالدفع عند الاستلام"}
          </span>
          {!isSubmitting && <ChevronRight size={18} />}
        </button>

        {/* ─── 3 Trust badges row (matches reference) ─── */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E6D8C8] mt-4">
          <TrustBadge icon={<Shield size={16} />} label="بدون دفع الآن" />
          <TrustBadge icon={<Phone size={16} />} label="نتصل للتأكيد" />
          <TrustBadge icon={<XCircle size={16} />} label="ترفضين بدون تكلفة" />
        </div>

        {/* Privacy line */}
        <p className="text-center text-[10.5px] text-[#7A6A5E] font-medium pt-1">
          بياناتكِ آمنة · غير مشتركة مع أي طرف
        </p>
      </form>
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="w-9 h-9 rounded-full bg-brand-sage border border-brand-deepSage text-brand-apothecary flex items-center justify-center">
        {icon}
      </span>
      <span className="text-[10.5px] text-[#3D2817] font-bold leading-tight">
        {label}
      </span>
    </div>
  );
}
