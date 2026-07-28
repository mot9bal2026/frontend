"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductPhoto } from "./ProductPhoto";

type Props = {
  product: Product;
};

const productMeta: Record<string, { reviewCount: string; tagline: string; urgency: string; badge: string }> = {
  "wrinkles-dark-circles": {
    reviewCount: "6,359+",
    tagline: "لآلام الركبة والظهر والمفاصل · 30 عشبة طبيعية",
    urgency: "آخر 48 ساعة على عرض الشحن المجاني",
    badge: "الأكثر مبيعاً",
  },
  "anti-aging": {
    reviewCount: "6,359+",
    tagline: "لآلام المفاصل والديسك · زنجبيل وكركم ومنثول",
    urgency: "العرض محدود لهذا الأسبوع",
    badge: "الأعلى تقييماً",
  },
};

export function ProductCard({ product }: Props) {
  const meta = productMeta[product.slug] ?? {
    reviewCount: "6,359+",
    tagline: product.subAr,
    urgency: "عرض محدود",
    badge: "مميز",
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-xl transition-all group flex flex-col">
      {/* Badge */}
      <div className="relative">
        <div
          className="h-56 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #FAF6F0, #EDE0CE)" }}
        >
          <div className="group-hover:scale-105 transition-transform duration-300 w-full h-full">
            <ProductPhoto
              src="/awafi-oil-bottle.webp"
              alt={product.nameAr}
              className="h-full w-full object-cover"
              fallbackWrapperClassName="h-full flex items-center justify-center"
              iconSize={70}
              sizes="(min-width: 640px) 280px, 90vw"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: product.colorAccent }} />
        </div>
        {/* Badge overlay */}
        <div className="absolute top-3 right-3 bg-brand-brown text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {meta.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={12} className="text-brand-gold fill-brand-gold" />
          ))}
          <span className="text-xs text-brand-muted mr-1 font-inter">4.9 · {meta.reviewCount} شراء مؤكد</span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-brand-brown text-base mb-1 leading-snug">{product.nameAr}</h3>

        {/* Tagline */}
        <p className="text-xs text-brand-muted mb-3 leading-relaxed">{meta.tagline}</p>

        {/* Offers mini */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { qty: `${product.bottles.one} عبوة`, price: String(product.price.one) },
            { qty: `${product.bottles.two} عبوات`, price: String(product.price.two) },
            { qty: `${product.bottles.three} عبوات`, price: String(product.price.three) },
          ].map((o) => (
            <div key={o.qty} className="bg-brand-cream rounded-lg px-1 py-1.5 text-center border border-brand-border min-w-0">
              <p className="text-[10px] text-brand-muted leading-tight truncate">{o.qty}</p>
              <p className="text-[11px] font-bold text-brand-brown font-inter whitespace-nowrap">
                {o.price}<span className="text-[9px] text-brand-muted font-normal mr-0.5">ريال</span>
              </p>
            </div>
          ))}
        </div>

        {/* Urgency */}
        <p className="text-xs text-amber-600 font-medium mb-4 flex items-center gap-1">
          <span>⏰</span> {meta.urgency}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="block w-full bg-brand-apothecary text-white text-center font-bold py-3 rounded-xl hover:bg-brand-apothecaryDark transition-colors active:scale-95 text-sm"
          >
            تصفّح العروض
          </Link>
          <p className="text-center text-xs text-brand-muted mt-2">الدفع عند الاستلام · شحن مجاني</p>
        </div>
      </div>
    </div>
  );
}

