import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { LazyBundlePicker } from "@/components/product/LazyBundlePicker";
import { ViewContentFire } from "@/components/tracking/ViewContentFire";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";

/* ─────────────────────────────────────────────────────────────
   /pages/awafi — Landing Page (basm-style)
   Full-bleed images edge-to-edge · order form under first image.
───────────────────────────────────────────────────────────── */

const promoImages: { src: string; alt: string; w: number; h: number }[] = [
  {
    src: "/images/cards/08_knee_problems.png",
    alt: "يعالج جميع مشاكل الركبة — ألم الصلاة والمشي والجماع",
    w: 1000,
    h: 1400,
  },
  {
    src: "/images/cards/11_herbs_30.png",
    alt: "مكون من 30 عشبة طبية من قلب الغابات الآسيوية",
    w: 1000,
    h: 1200,
  },
  {
    src: "/images/cards/05_results_week1.png",
    alt: "نتائجه سريعة تبدأ بظهور من الأسبوع الأول",
    w: 1000,
    h: 1200,
  },
  {
    src: "/images/cards/01_usage.png",
    alt: "طريقة الاستعمال سهلة جداً",
    w: 1000,
    h: 1358,
  },
  {
    src: "/images/cards/03_surgery_vs_oil.png",
    alt: "البديل النهائي للعمليات الطبية — مقارنة السعر",
    w: 1000,
    h: 1000,
  },
  {
    src: "/images/cards/06_doctor_quote.png",
    alt: "ماذا قالت دكتورة هدى على هذا الزيت",
    w: 1000,
    h: 1200,
  },
  {
    src: "/images/cards/09_sfda_cert.png",
    alt: "مصادق عليه من وزارة الصحة ومعتمد بشهادات معترف بها",
    w: 1000,
    h: 1250,
  },
  {
    src: "/images/cards/07_whatsapp_reviews.png",
    alt: "إسمعو تجارب الناس وكيف تخلصو من معانتهم مع ركبة",
    w: 1000,
    h: 1426,
  },
  {
    src: "/images/cards/02_guarantee.png",
    alt: "ضمان الرضا — فلوسك ترجع بدون أي أسئلة",
    w: 1000,
    h: 1077,
  },
  {
    src: "/images/cards/10_final_decision.png",
    alt: "الآن الخيار بين يديك — تخلص من ألم الركبة أم تعاني مدى حياتك",
    w: 1000,
    h: 1200,
  },
];

export default function AwafiLandingPage() {
  const product = getProduct("wrinkles-dark-circles");

  return (
    <>
      <main className="min-h-screen bg-[#FBF7F0]" dir="rtl">
        {/* Top strip — full width */}
        <div className="bg-[#0F3024] text-white text-center text-[12px] font-bold py-2 px-3">
          🚚 الدفع عند الاستلام · شحن سريع لجميع مناطق المملكة
        </div>

        <div className="mx-auto max-w-2xl">
          {/* ── HERO — full-bleed creative (image 1) ── */}
          <section>
            <div className="relative w-full bg-white">
              <Image
                src="/images/awafi-ramadan-ad.png"
                alt="تخلص من ألم الركبة نهائياً في هذا الشهر المبارك مع زيت العوافي"
                width={700}
                height={1000}
                priority
                sizes="100vw"
                className="w-full h-auto block"
              />
            </div>
          </section>

          {/* ── ORDER FORM — padded content under first image ── */}
          <section id="order" className="scroll-mt-4 px-3 py-4">
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

          {/* ── TRUST BADGES ── */}
          <section className="grid grid-cols-3 gap-2 px-3 pb-4">
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

          {/* ── IMAGE STACK — full-bleed promo cards ── */}
          <section className="space-y-1">
            {promoImages.map((img, i) => (
              <a
                key={img.src}
                href="#order"
                className="relative block w-full bg-white active:opacity-95 transition-opacity"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  sizes="100vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  className="w-full h-auto block"
                />
              </a>
            ))}
          </section>

          {/* ── TESTIMONIAL ── */}
          <section className="px-3 py-4">
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-4 md:p-5">
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
            </div>
          </section>

          {/* ── GUARANTEE ── */}
          <section className="px-3 pb-4">
            <div className="bg-[#0F3024] text-white rounded-2xl p-4 md:p-5 text-center">
              <p className="text-[13px] md:text-sm font-black">
                🛡️ ضمان استرجاع 14 يوم
              </p>
              <p className="text-[11.5px] md:text-[12.5px] text-[#C8A876] mt-1 leading-relaxed">
                جرّب العبوة الأولى · ما عجبتك؟ فلوسك ترجع كاملة بدون أي أسئلة.
              </p>
            </div>
          </section>

          {/* Fine print */}
          <p className="text-center text-[10.5px] text-[#7A6A5E] opacity-70 px-4 pb-6 leading-relaxed">
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
