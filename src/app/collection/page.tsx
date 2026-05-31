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
  title: "قهوة الجمال | إشراقة — للهالات والتجاعيد",
  description:
    "صيغة موزونة بدقة: كولاجين بحري 5000 ملجم + فيتامين C + هيالورونيك. لاستهداف الهالات والتجاعيد مباشرة. SFDA · حلال · الدفع عند الاستلام.",
};

const faqs = [
  {
    q: "هل الدفع عند الاستلام متاح؟",
    a: "نعم — الدفع عند الاستلام فقط، كاش أو شبكة، في كل مناطق المملكة. ما تدفعين ريال واحد قبل ما تستلمي الطلب وتفحصيه.",
  },
  {
    q: "هل المنتج مرخّص من الجهات السعودية؟",
    a: "نعم. مسجّل لدى هيئة الغذاء والدواء السعودية (SFDA) ومتوافق مع معايير الخليج. المكونات حلال 100٪ — كولاجين بحري بدلاً من الجيلاتين الحيواني.",
  },
  {
    q: "كيف أعرف الجرعة المناسبة لي؟",
    a: "كل كيس يحوي الجرعة الموزونة كاملة: 5000 ملجم كولاجين، 200 ملجم فيتامين C، 100 ملجم هيالورونيك. كيس واحد يومياً مع قهوتكِ الصباحية — هذا كل ما تحتاجين.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "1–3 أيام عمل للمدن الرئيسية (الرياض · جدة · الدمام · مكة · المدينة · الخبر). 3–5 أيام لبقية مناطق المملكة.",
  },
  {
    q: "وش يحصل لو ما حسّيت بفرق؟",
    a: "ضمان رضاكِ 14 يوماً. اتصلي علينا أو راسلينا على واتساب، وفلوسكِ ترجع — بدون نماذج، بدون أسئلة. ما في مخاطرة لأنكِ ما دفعتي إلا عند الاستلام أصلاً.",
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
            صيغة موزونة · SFDA · حلال
          </div>
          <h1 className="text-[2rem] md:text-[2.4rem] font-black text-[#1A0F0A] mb-3 leading-[1.2]">
            قهوة الجمال
          </h1>
          <p className="text-[#5A4A3E] text-[14.5px] md:text-[15.5px] leading-relaxed">
            صيغة موزونة من <span className="font-bold font-inter text-brand-brown">5000 ملجم</span>{" "}
            كولاجين بحري + <span className="font-bold font-inter text-brand-brown">200 ملجم</span>{" "}
            فيتامين C + <span className="font-bold font-inter text-brand-brown">100 ملجم</span>{" "}
            هيالورونيك — لاستهداف الهالات والتجاعيد من الداخل.
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

      {/* ── WHY BEAUTY COFFEE ────────────── */}
      <section className="py-14 px-4 bg-brand-sage/40">
        <div className="max-w-content mx-auto max-w-4xl">
          <div className="text-center mb-9">
            <p
              className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              لماذا قهوة الجمال؟
            </p>
            <h2 className="text-[1.6rem] md:text-2xl font-black text-brand-brown">
              ثلاث ميزات لا توفّرها لكِ كبسولة عادية
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Microscope size={20} />,
                title: "مكونات معلنة بجرعاتها",
                desc: "كل كيس يعرض الكمية الدقيقة لكل مكوّن. لا «خلطات سرية» ولا «مزيج خاص».",
              },
              {
                icon: <Droplets size={20} />,
                title: "تشتغل من الداخل",
                desc: "الكولاجين البحري يُمتص عبر الدم ويصل لكل طبقات البشرة — ليس ترطيب سطحي.",
              },
              {
                icon: <FlaskConical size={20} />,
                title: "أبسط طقس التزام",
                desc: "كيس واحد مع قهوتكِ الصباحية. أعلى نسبة التزام، أعلى نتيجة.",
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
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              بدون دفع أونلاين
            </p>
            <h2 className="text-[1.6rem] md:text-2xl font-black text-brand-brown">
              كيف يصلكِ طلبكِ في 4 خطوات
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <PackageCheck size={20} />, label: "اختاري عرضكِ" },
              { icon: <Phone size={20} />, label: "نتصل للتأكيد" },
              { icon: <Truck size={20} />, label: "يصل 1–3 أيام" },
              { icon: <Wallet size={20} />, label: "ادفعي عند الاستلام" },
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
                <p className="text-[#3D2817] text-[12.5px] font-semibold leading-tight">
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
                ضمان رضاكِ 14 يوماً — صفر مخاطرة
              </h3>
              <p className="text-[#5A4A3E] text-[13px] leading-relaxed">
                ما حسّيتي بفرق؟ تواصلي معنا وفلوسكِ ترجع — بدون نماذج، بدون أسئلة. وأصلاً
                ما تدفعين إلا عند الاستلام.
              </p>
            </div>
            <Link
              href="#top"
              className="inline-block bg-brand-brown text-white font-black px-5 py-3 rounded-xl hover:bg-brand-coffee transition-colors text-[13px] whitespace-nowrap shadow-md"
            >
              جرّبي الآن
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
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              قبل ما تطلبين
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

