import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import type { Metadata } from "next";
import {
  FlaskConical,
  Microscope,
  Droplets,
  PackageCheck,
  Phone,
  Truck,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "زيت العوافي | لآلام الركبة والظهر والمفاصل",
  description:
    "خلطة أعشاب طبيعية من 30 عشبة طبية: زنجبيل وكركم ومنثول وكافور. لتخفيف آلام الركبة والظهر والمفاصل والديسك موضعياً. SFDA · حلال · الدفع عند الاستلام.",
};

const faqs = [
  {
    q: "هل الدفع عند الاستلام متاح؟",
    a: "نعم — الدفع عند الاستلام فقط، كاش أو شبكة، في كل مناطق المملكة. ما تدفع ريال واحد قبل ما تستلم الطلب وتفحصه.",
  },
  {
    q: "هل المنتج مرخّص من الجهات السعودية؟",
    a: "نعم. مصادق عليه من هيئة الغذاء والدواء السعودية (SFDA) ومتوافق مع معايير الخليج. المكونات طبيعية وحلال 100٪ — أعشاب طبية بدون كورتيزون أو مواد ضارة.",
  },
  {
    q: "كيف أستخدم الزيت بشكل صحيح؟",
    a: "رجّ العبوة، بخّ كمية مناسبة على مكان الألم (ركبة، ظهر، مفصل)، ثم دلّك بحركات دائرية 2–3 دقائق حتى يمتصّه الجلد. كرّر مرتين يومياً صباحاً ومساءً.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "1–3 أيام عمل للمدن الرئيسية (الرياض · جدة · الدمام · مكة · المدينة · الخبر). 3–5 أيام لبقية مناطق المملكة.",
  },
  {
    q: "وش يحصل لو ما حسّيت بفرق؟",
    a: "ضمان رضاك 14 يوماً. اتصل علينا أو راسلنا على واتساب، وفلوسك ترجع — بدون أسئلة. ما في مخاطرة لأنك ما دفعت إلا عند الاستلام أصلاً.",
  },
];

export default function CollectionPage() {
  return (
    <div className="bg-white">
      {/* ── HERO HEADER ──────────────────── */}
      <section className="bg-gradient-to-b from-brand-cream via-white to-brand-cream/30 py-14 md:py-16 px-4 border-b border-brand-border">
        <div className="max-w-content mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-brand-apothecary text-white text-[11px] font-bold px-3 py-1.5 rounded-full mb-5 shadow-sm">
            <FlaskConical size={12} />
            30 عشبة طبيعية · SFDA · حلال
          </div>
          <h1 className="text-[2rem] md:text-[2.4rem] font-black text-[#1A0F0A] mb-3 leading-[1.2]">
            زيت العوافي
          </h1>
          <p className="text-[#5A4A3E] text-[14.5px] md:text-[15.5px] leading-relaxed">
            خلطة أعشاب من <span className="font-bold font-inter text-brand-brown">30 عشبة</span>{" "}
            طبية + <span className="font-bold font-inter text-brand-brown">زنجبيل وكركم</span>{" "}
            + <span className="font-bold font-inter text-brand-brown">منثول وكافور</span>{" "}
            — لتخفيف آلام الركبة والظهر والمفاصل موضعياً.
          </p>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-md mx-auto">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AL-AWAFI OIL ────────────── */}
      <section className="py-14 px-4 bg-brand-sage/40">
        <div className="max-w-content mx-auto max-w-4xl">
          <div className="text-center mb-9">
            <p
              className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              لماذا زيت العوافي؟
            </p>
            <h2 className="text-[1.6rem] md:text-2xl font-black text-brand-brown">
              ثلاث ميزات لا توفّرها لك حبة مسكّن عادية
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Microscope size={20} />,
                title: "أعشاب طبيعية معروفة",
                desc: "30 عشبة طبية معروفة الفائدة: زنجبيل، كركم، منثول، كافور. بدون كورتيزون ولا مواد كيميائية ضارة.",
              },
              {
                icon: <Droplets size={20} />,
                title: "يصل لمكان الألم",
                desc: "زيت موضعي يتغلغل مباشرة في المفصل والعضلة — ليس مسكّناً يمرّ على المعدة.",
              },
              {
                icon: <FlaskConical size={20} />,
                title: "أسهل استخدام",
                desc: "بخّة وتدليك دقائق، مرتين باليوم. بدون مواعيد علاج طبيعي ولا حبوب.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl border border-brand-deepSage/60 p-5 text-center hover:border-brand-apothecary transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-sage text-brand-apothecary border border-brand-deepSage flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <h3 className="font-black text-brand-brown mb-2 text-[14px] leading-tight">
                  {item.title}
                </h3>
                <p className="text-[12.5px] text-[#5A4A3E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COD PROCESS ──────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-3xl">
          <div className="text-center mb-9">
            <p
              className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              بدون دفع أونلاين
            </p>
            <h2 className="text-[1.6rem] md:text-2xl font-black text-brand-brown">
              كيف يصلك طلبك في 4 خطوات
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <PackageCheck size={20} />, label: "اختر عرضك" },
              { icon: <Phone size={20} />, label: "نتصل للتأكيد" },
              { icon: <Truck size={20} />, label: "يصل 1–3 أيام" },
              { icon: <Wallet size={20} />, label: "ادفع عند الاستلام" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-brand-sage/40 rounded-2xl p-5 border border-brand-deepSage/40"
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-brand-deepSage flex items-center justify-center mb-3 text-brand-apothecary">
                  {s.icon}
                </div>
                <div className="w-6 h-6 rounded-full bg-brand-brown text-brand-gold text-[11px] font-black flex items-center justify-center mb-2 font-inter">
                  {i + 1}
                </div>
                <p className="text-[#0F3024] text-[12.5px] font-semibold leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────── */}
      <section className="py-12 px-4 bg-brand-sage/30 border-y border-brand-deepSage/40">
        <div className="max-w-content mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 bg-white rounded-3xl p-6 md:p-7 border border-brand-deepSage shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-brand-apothecary text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck size={24} />
            </div>
            <div className="text-center md:text-right flex-1">
              <h3 className="font-black text-brand-brown text-[1.05rem] md:text-[1.15rem] mb-1">
                ضمان رضاك 14 يوماً — صفر مخاطرة
              </h3>
              <p className="text-[#5A4A3E] text-[13px] leading-relaxed">
                ما حسّيت بفرق؟ تواصل معنا وفلوسك ترجع — بدون أسئلة. وأصلاً
                ما تدفع إلا عند الاستلام.
              </p>
            </div>
            <Link
              href="#top"
              className="inline-block bg-brand-brown text-white font-black px-5 py-3 rounded-xl hover:bg-brand-coffee transition-colors text-[13px] whitespace-nowrap shadow-md"
            >
              جرّب الآن
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <p
              className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              قبل ما تطلب
            </p>
            <h2 className="text-[1.6rem] md:text-2xl font-black text-brand-brown">
              أسئلة شائعة
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-brand-cream rounded-2xl border border-brand-border group transition-all hover:border-brand-apothecary"
              >
                <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-bold text-brand-brown select-none text-[14px]">
                  {faq.q}
                  <span className="text-brand-apothecary text-2xl group-open:rotate-45 transition-transform flex-shrink-0 mr-2 font-light">
                    +
                  </span>
                </summary>
                <div className="px-4 md:px-5 pb-4 md:pb-5 text-[#5A4A3E] text-[13.5px] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

