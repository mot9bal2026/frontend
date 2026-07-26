import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { LazyBundlePicker } from "@/components/product/LazyBundlePicker";
import { ViewContentFire } from "@/components/tracking/ViewContentFire";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";

/* ─────────────────────────────────────────────────────────────
   /pages/awafi — Landing Page (basm-style)
   Minimalist ad-traffic lander: hero → trust → image stack →
   testimonial → bundle picker + order form.
   Deliberately stripped of site header/footer/nav.
───────────────────────────────────────────────────────────── */

const promoImages: { src: string; alt: string }[] = [
  { src: "/images/slide-1.webp", alt: "زيت العوافي — نتائج ملموسة" },
  { src: "/images/lifestyle-couple.webp", alt: "زوجان يستمتعان بالحياة بلا ألم" },
  { src: "/images/praying-man-pain-relief.webp", alt: "الصلاة براحة بلا ألم في الركبة" },
  { src: "/images/slide-2.webp", alt: "تركيبة 30 عشبة طبيعية" },
  { src: "/images/before-after-results.png", alt: "قبل وبعد استخدام زيت العوافي" },
  { src: "/images/slide-3.webp", alt: "مصادق عليه SFDA · حلال 100٪" },
];

export default function AwafiLandingPage() {
  const product = getProduct("wrinkles-dark-circles");

  return (
    <>
      <main className="min-h-screen bg-[#FBF7F0]" dir="rtl">
        {/* Top strip */}
        <div className="bg-[#0F3024] text-white text-center text-[12px] font-bold py-2 px-3">
          🚚 الدفع عند الاستلام · شحن سريع لجميع مناطق المملكة
        </div>

        <div className="max-w-2xl mx-auto px-3 py-5 md:py-8 space-y-5">
          {/* ── HERO ── */}
          <section className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="relative bg-[#F3EDE2] aspect-[4/3] md:aspect-[16/10]">
              <Image
                src="/images/product-1.webp"
                alt="زيت العوافي — لآلام الركبة والظهر والمفاصل"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain p-4 md:p-6"
              />
            </div>

            <div className="p-4 md:p-6 text-center">
              <div className="inline-flex items-center gap-1.5 bg-[#0F3024] text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3">
                <span>🌿</span>
                <span>خلطة 30 عشبة طبية · طبيعي 100٪</span>
              </div>

              <h1 className="text-[1.5rem] md:text-[2rem] font-black text-[#1A0F0A] leading-tight mb-2">
                زيت العوافي لآلام الركبة والظهر والمفاصل
              </h1>
              <p className="text-[13px] md:text-sm text-[#5A4A3E] leading-relaxed">
                زيت أعشاب طبيعي للاستخدام الموضعي — بخّة واحدة وتدليك بسيط
                يوصل مفعوله مباشرة لمكان الألم. بدون حبوب، بدون عمليات.
              </p>

              {/* Urgency banner — basm style */}
              <div className="mt-4 bg-gradient-to-l from-[#FFF3B0] to-[#FFE07A] border-2 border-[#F5C542] rounded-xl px-4 py-3">
                <p className="text-[13px] md:text-sm font-black text-[#7A4F00] leading-snug">
                  🔥 عرض حصري لهذا الأسبوع فقط
                </p>
                <p className="text-[12px] md:text-[13px] font-bold text-[#7A4F00] mt-1">
                  عبوة واحدة بـ <span className="font-black">{product.price.one}</span> ر.س ·
                  {" "}{product.bottles.two} عبوات بـ{" "}
                  <span className="font-black">{product.price.two}</span> ر.س ·
                  {" "}{product.bottles.three} عبوات بـ{" "}
                  <span className="font-black">{product.price.three}</span> ر.س
                </p>
              </div>

              <a
                href="#order"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-[#0F3024] text-white font-black text-[15px] md:text-base py-4 rounded-2xl shadow-lg shadow-[#0F3024]/20 active:scale-[0.98] transition-transform"
              >
                اطلب الآن للاستفادة من العرض ←
              </a>
            </div>
          </section>

          {/* ── TRUST BADGES ── */}
          <section className="grid grid-cols-3 gap-2">
            {[
              { icon: "✅", t: "SFDA", s: "مرخّص رسمياً" },
              { icon: "🌿", t: "حلال 100٪", s: "طبيعي بلا مواد ضارة" },
              { icon: "💵", t: "دفع عند الاستلام", s: "بدون أي دفع مقدّم" },
            ].map((b) => (
              <div
                key={b.t}
                className="bg-white border border-black/5 rounded-xl p-3 text-center shadow-sm"
              >
                <div className="text-lg mb-0.5">{b.icon}</div>
                <p className="text-[11px] md:text-xs font-black text-[#0F3024] leading-tight">
                  {b.t}
                </p>
                <p className="text-[9.5px] md:text-[10.5px] text-[#7A6A5E] mt-0.5 leading-tight">
                  {b.s}
                </p>
              </div>
            ))}
          </section>

          {/* ── IMAGE STACK — basm-style scroll of visuals ── */}
          <section className="space-y-3">
            {promoImages.map((img, i) => (
              <a
                key={img.src}
                href="#order"
                className="relative block bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm active:scale-[0.995] transition-transform"
              >
                <div className="relative aspect-[4/3] bg-[#F3EDE2]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    loading={i < 2 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </div>
              </a>
            ))}
          </section>

          {/* ── TESTIMONIAL ── */}
          <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-4 md:p-5">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-[#E5B547] text-base">
                  ★
                </span>
              ))}
              <span className="text-[11px] font-bold text-[#0F3024] mr-1">
                (شراء مؤكد)
              </span>
            </div>
            <p className="text-[13.5px] md:text-sm text-[#211915] leading-relaxed">
              «ركبتي تعبتني من زمان، والدكتور كان مقرر عليها عملية. جربت زيت
              العوافي وما شاء الله بعد أسابيع صرت أصلي وأمشي بشكل أفضل بكثير.
              الحمدلله أجّلت العملية.»
            </p>
            <div className="flex items-center gap-2 mt-3 text-[11.5px] text-[#5A4A3E] font-medium">
              <span className="w-8 h-8 rounded-full bg-[#E6D8C8] flex items-center justify-center text-[#7A4F00] font-black">
                أ
              </span>
              <span>
                <span className="font-black text-[#0F3024]">أم فهد</span> · 58 سنة · الرياض
              </span>
            </div>
          </section>

          {/* ── ORDER FORM (bundle picker + inline form) ── */}
          <section id="order" className="scroll-mt-4">
            <div className="bg-white rounded-2xl border-2 border-[#C8A876] shadow-sm p-4 md:p-5">
              <div className="text-center mb-4">
                <h2 className="text-lg md:text-xl font-black text-[#0F3024]">
                  اطلب عبوتك الآن
                </h2>
                <p className="text-[12px] text-[#7A6A5E] mt-1">
                  اختر العرض المناسب · املأ البيانات · تدفع عند الاستلام
                </p>
              </div>
              <LazyBundlePicker product={product} isPrimary />
            </div>
          </section>

          {/* ── GUARANTEE ── */}
          <section className="bg-[#0F3024] text-white rounded-2xl p-4 md:p-5 text-center">
            <p className="text-[13px] md:text-sm font-black">
              🛡️ ضمان استرجاع 14 يوم
            </p>
            <p className="text-[11.5px] md:text-[12.5px] text-[#C8A876] mt-1 leading-relaxed">
              جرّب العبوة الأولى · ما عجبتك؟ فلوسك ترجع كاملة بدون أي أسئلة.
            </p>
          </section>

          {/* Fine print */}
          <p className="text-center text-[10.5px] text-[#7A6A5E] opacity-70 px-2 leading-relaxed">
            * النتائج تتفاوت من شخص لآخر. المنتج لدعم وعلاج الألم موضعياً
            وليس بديلاً عن استشارة الطبيب في الحالات الشديدة.
            <br />
            <Link href="/policies/privacy" className="underline">
              الخصوصية
            </Link>{" "}
            ·{" "}
            <Link href="/policies/terms" className="underline">
              الشروط
            </Link>{" "}
            ·{" "}
            <Link href="/contact" className="underline">
              تواصل معنا
            </Link>
          </p>
        </div>
      </main>

      <ViewContentFire
        productSlug={product.slug}
        productNameAr={product.nameAr}
        price={product.price.one}
      />
      <DeferredPixelLoader />
    </>
  );
}
