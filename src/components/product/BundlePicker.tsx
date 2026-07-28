"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cart";
import type { Product, BundlePrice } from "@/lib/products";
import { firePixelEvent } from "@/components/tracking/PixelProvider";
import { getAttribution } from "@/lib/attribution";
import {
  saudiNationalDigits,
  toCountryDigits,
  toE164SaudiPhone,
  toLocalSaudiPhone,
} from "@/lib/phone";
import { ShieldCheck, Eye, Flame, Phone, XCircle, ChevronLeft } from "@/components/icons/Icons";

type Props = {
  product: Product;
  /** When true, this instance carries the scroll-target id used by the mobile sticky CTA. */
  isPrimary?: boolean;
};

type OfferQty = 1 | 2 | 3;

type OfferCard = {
  qty: OfferQty;
  bottles: number;
  price: number;
  originalPrice: number;
  savings: number;
  label: string;
  sublabel: string;
  badge?: string;
  highlight?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";

const orderSchema = z.object({
  name: z.string().trim().min(2, "اكتب الاسم الكامل"),
  phone: z
    .string()
    .trim()
    .refine((v) => saudiNationalDigits(v) !== null, "اكتب رقم جوال سعودي صحيح"),
});

type OrderForm = z.infer<typeof orderSchema>;

function buildOffers(product: Product): OfferCard[] {
  const unit = product.price.one; // price of a single bottle
  const b = product.bottles;

  const twoOriginal = unit * b.two;
  const threeOriginal = unit * b.three;
  const twoSavings = twoOriginal - product.price.two;
  const threeSavings = threeOriginal - product.price.three;

  return [
    {
      qty: 1,
      bottles: b.one,
      price: product.price.one,
      originalPrice: unit * b.one,
      savings: 0,
      label: `${b.one} عبوة`,
      sublabel: "تكفي أسبوعاً · تجربة البداية",
      badge: "للتجربة",
    },
    {
      qty: 2,
      bottles: b.two,
      price: product.price.two,
      originalPrice: twoOriginal,
      savings: twoSavings,
      label: `${b.two} عبوات · فرق تلمسه بنفسك`,
      sublabel: "بعد استعمالها كاملة — النتيجة تصير واضحة",
      badge: "الأكثر طلباً",
      highlight: true,
    },
    {
      qty: 3,
      bottles: b.three,
      price: product.price.three,
      originalPrice: threeOriginal,
      savings: threeSavings,
      label: `${b.three} عبوات · العلاج النهائي`,
      sublabel: "العلاج النهائي الكامل من الألم",
      badge: threeSavings > 0 ? `الأوفر — وفّر ${threeSavings} ريال` : undefined,
    },
  ];
}

export function BundlePicker({ product, isPrimary = false }: Props) {
  const offers = buildOffers(product);
  const selected = useCartStore((s) => s.selectedOfferQty) as OfferQty;
  const setSelectedOffer = useCartStore((s) => s.setSelectedOffer);
  const [viewers, setViewers] = useState(0);
  const [stock, setStock] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    mode: "onTouched",
  });

  /* Live viewers + stock scarcity */
  useEffect(() => {
    setViewers(45 + Math.floor(Math.random() * 46));
    const viewersTimer = setInterval(() => {
      setViewers((v) => Math.max(40, Math.min(90, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 4500);

    setStock(48 + Math.floor(Math.random() * 3));
    const stockTimer = setInterval(() => {
      setStock((s) => (s > 7 ? s - 1 : s));
    }, 5000 + Math.floor(Math.random() * 3000));

    return () => {
      clearInterval(viewersTimer);
      clearInterval(stockTimer);
    };
  }, []);

  const selectedOffer = offers.find((o) => o.qty === selected) ?? offers.find((o) => o.qty === 2)!;

  const selectOffer = (qty: OfferQty) => {
    const offer = offers.find((o) => o.qty === qty);
    if (!offer) return;
    setSelectedOffer(qty, offer.price as BundlePrice, offer.originalPrice);
  };

  const onSubmit = async (data: OrderForm): Promise<void> => {
    setIsSubmitting(true);
    setSubmitError("");

    const leadEventId = crypto.randomUUID();
    const purchaseEventId = crypto.randomUUID();
    const attribution = getAttribution();

    const phoneCountryDigits = toCountryDigits(data.phone);
    const phoneE164 = toE164SaudiPhone(data.phone);

    firePixelEvent("Lead", {
      event_id: leadEventId,
      value: selectedOffer.price,
      currency: "SAR",
      phone_country_digits: phoneCountryDigits,
      phone_e164: phoneE164,
    });

    const finalItems = [
      {
        product_slug: product.slug as string,
        product_name_ar: product.nameAr,
        qty: selectedOffer.bottles,
        price_sar: selectedOffer.price,
        is_bridge_upsell: false,
      },
    ];

    const totalFinal = selectedOffer.price;

    const payload = {
      event_id: purchaseEventId,
      customer: { name: data.name, phone: toLocalSaudiPhone(data.phone) },
      items: finalItems,
      totals: { subtotal_sar: totalFinal, shipping_sar: 0, total_sar: totalFinal },
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
    };

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let body: { ok?: boolean; order_number?: string; message?: string } = {};
      try {
        body = await res.json();
      } catch {
        /* ignore parse errors */
      }

      if (!res.ok || !body.ok || !body.order_number) {
        setSubmitError(body.message || "تعذّر إتمام الطلب. حاول مرة أخرى أو تواصل معنا.");
        setIsSubmitting(false);
        return;
      }

      firePixelEvent("Purchase", {
        event_id: purchaseEventId,
        transaction_id: purchaseEventId,
        value: totalFinal,
        currency: "SAR",
        phone_country_digits: phoneCountryDigits,
        phone_e164: phoneE164,
        content_ids: finalItems.map((i) => i.product_slug),
        contents: finalItems.map((i) => ({
          id: i.product_slug,
          quantity: i.qty,
          item_price: i.price_sar,
        })),
      });

      router.push(`/thank-you?order=${body.order_number}&total=${totalFinal}`);
    } catch {
      setSubmitError("تعذّر الاتصال بالخادم. تحقّق من الإنترنت وحاول مرة أخرى.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Live signals row — viewers + stock */}
      {viewers > 0 && (
        <div className="flex items-center gap-2 text-[11px] font-bold flex-wrap">
          <span className="flex items-center gap-1 bg-red-600 text-white px-2.5 py-1.5 rounded-full pulse-soft">
            <Eye size={11} />
            <span>{viewers} يشاهدون الآن</span>
          </span>
          <span className="flex items-center gap-1 bg-[#0F3024] text-[#C8A876] px-2.5 py-1.5 rounded-full">
            <Flame size={11} />
            <span>آخر {stock} عبوات بهذا السعر</span>
          </span>
        </div>
      )}

      {/* Urgency */}
      <div className="bg-[#FFF8E7] border-2 border-[#F5C542] rounded-xl px-4 py-3 text-sm text-[#7A4F00] font-bold flex items-center gap-2">
        <span>⏰</span>
        <span>آخر 48 ساعة على عرض الشحن المجاني هذا الأسبوع</span>
      </div>

      {/* Offer cards */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-muted">اختر العرض:</p>
        {offers.map((offer) => (
          <label
            key={offer.qty}
            className={`relative flex items-center justify-between gap-2 p-3.5 md:p-4 min-h-[64px] rounded-xl border-2 cursor-pointer transition-all touch-manipulation active:scale-[0.99] ${
              selected === offer.qty
                ? offer.highlight
                  ? "border-brand-brown bg-amber-50"
                  : "border-brand-brown bg-brand-cream"
                : "border-brand-border bg-white hover:border-brand-gold"
            }`}
          >
            <input
              type="radio"
              name="offer"
              value={offer.qty}
              checked={selected === offer.qty}
              onChange={() => selectOffer(offer.qty)}
              className="sr-only"
            />
            <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  selected === offer.qty ? "border-brand-brown" : "border-brand-border"
                }`}
              >
                {selected === offer.qty && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-brown" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-brand-brown text-[13px] md:text-sm leading-snug">{offer.label}</span>
                  {offer.badge && (
                    <span
                      className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                        offer.highlight
                          ? "bg-brand-brown text-white"
                          : offer.savings > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-brand-cream text-brand-muted"
                      }`}
                    >
                      {offer.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] md:text-xs text-brand-muted mt-0.5">{offer.sublabel}</p>
              </div>
            </div>
            <div className="text-left flex-shrink-0">
              <p className="font-black text-brand-brown font-inter text-[15px] md:text-base whitespace-nowrap">{offer.price} ريال</p>
              {offer.savings > 0 && (
                <p className="text-[10px] md:text-xs text-brand-muted line-through font-inter whitespace-nowrap">{offer.originalPrice} ريال</p>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Savings callout */}
      {selectedOffer.savings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-sm text-green-800 text-center font-medium">
          🎉 وفّر <span className="font-bold font-inter">{selectedOffer.savings} ريال</span> مع هذا العرض
        </div>
      )}

      {/* ─── Always-visible inline order form — mobile-first for ads traffic ─── */}
      <form
        id={isPrimary ? "order-form" : undefined}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-2 border-[#E6D8C8] rounded-2xl p-3.5 sm:p-4 space-y-3.5 shadow-[0_10px_28px_rgba(61,40,23,0.06)] scroll-mt-4 pb-5"
      >
        {/* Selected-offer summary — updates live with the chosen offer */}
        <div className="flex items-center justify-between gap-2 bg-[#FAF6F0] border border-[#E6D8C8] rounded-xl px-3 py-3 sm:px-3.5">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-[#7A6A5E] font-medium leading-tight">عرضك المختار</p>
            <p className="font-black text-[#0F3024] text-[13px] sm:text-[13.5px] leading-snug">{selectedOffer.label}</p>
          </div>
          <div className="text-left flex-shrink-0 pl-1">
            <p className="font-black text-brand-apothecary font-inter text-[20px] sm:text-[19px] leading-none">
              {selectedOffer.price}{" "}
              <span className="text-[12px] text-[#7A6A5E] font-medium">ريال</span>
            </p>
            {selectedOffer.savings > 0 && (
              <p className="text-[10px] text-[#9A8A7E] line-through font-inter mt-0.5">
                {selectedOffer.originalPrice} ريال
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor={isPrimary ? "order-name" : undefined} className="block text-[13px] font-black text-[#0F3024] mb-1.5">
            الاسم الكامل
          </label>
          <input
            {...register("name")}
            id={isPrimary ? "order-name" : undefined}
            type="text"
            placeholder="مثال: عبدالله محمد"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            disabled={isSubmitting}
            className={`w-full border rounded-2xl px-4 min-h-[52px] py-3.5 text-[#211915] placeholder:text-[#9A8A7E] text-[16px] focus:outline-none focus:ring-2 focus:ring-brand-apothecary/15 text-right bg-white transition-all touch-manipulation ${
              errors.name ? "border-red-400 focus:border-red-500" : "border-[#E6D8C8] focus:border-brand-apothecary"
            }`}
            dir="rtl"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor={isPrimary ? "order-phone" : undefined} className="block text-[13px] font-black text-[#0F3024] mb-1.5">
            رقم الجوال السعودي
          </label>
          <input
            {...register("phone")}
            id={isPrimary ? "order-phone" : undefined}
            type="tel"
            placeholder="05XXXXXXXX"
            autoComplete="tel"
            enterKeyHint="done"
            disabled={isSubmitting}
            className={`w-full border rounded-2xl px-4 min-h-[52px] py-3.5 text-[#211915] placeholder:text-[#9A8A7E] text-[16px] focus:outline-none focus:ring-2 focus:ring-brand-apothecary/15 font-inter text-left bg-white transition-all touch-manipulation tracking-wide ${
              errors.phone ? "border-red-400 focus:border-red-500" : "border-[#E6D8C8] focus:border-brand-apothecary"
            }`}
            dir="ltr"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {errors.phone ? (
            <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.phone.message}</p>
          ) : (
            <p className="text-center text-[11px] text-[#7A6A5E] mt-2 font-medium leading-relaxed">
              يرجى إدخال رقم جوال سعودي صحيح لتأكيد التوصيل
            </p>
          )}
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{submitError}</div>
        )}

        {/* Submit — large touch target for thumbs */}
        <button
          type="submit"
          id={isPrimary ? "product-hero-cta" : undefined}
          disabled={isSubmitting}
          className="w-full bg-brand-apothecary text-white font-black min-h-[56px] py-4 rounded-xl text-[15px] sm:text-[1rem] hover:bg-brand-apothecaryDark transition-all active:scale-[0.98] shadow-lg relative overflow-hidden shimmer disabled:opacity-80 disabled:cursor-wait flex items-center justify-center gap-2 touch-manipulation"
          style={{ letterSpacing: "0.01em" }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 px-1">
            <span>{isSubmitting ? "جاري التأكيد..." : "تأكيد الطلب — ادفع عند الاستلام"}</span>
            {!isSubmitting && <ChevronLeft size={18} className="flex-shrink-0" />}
          </span>
        </button>

        {/* Soft reassurance line */}
        <p className="text-center text-[12px] text-[#5A4A3E] font-semibold flex items-center justify-center gap-1.5 leading-snug">
          <ShieldCheck size={14} className="text-[#1E7A47] flex-shrink-0" />
          <span>تستلم ثم تدفع · ما تدفع ريال واحد مقدّماً</span>
        </p>

        {/* 3 Trust badges row */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-3 border-t border-[#E6D8C8]">
          <TrustBadge icon={<ShieldCheck size={16} />} label="بدون دفع الآن" />
          <TrustBadge icon={<Phone size={16} />} label="نتصل للتأكيد" />
          <TrustBadge icon={<XCircle size={16} />} label="ترفض بدون تكلفة" />
        </div>
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
      <span className="text-[10.5px] text-[#0F3024] font-bold leading-tight">{label}</span>
    </div>
  );
}
