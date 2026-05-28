import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Award,
  FlaskConical,
  Microscope,
  Sun,
  Truck,
  Phone,
  PackageCheck,
  Wallet,
  Droplets,
  Sparkles,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

/* ─────────────────────────────────────────────────────────────
   ISHRAQA — Clinical Beauty Coffee
   Pharmacy-grade positioning · trust-first · Saudi COD
───────────────────────────────────────────────────────────── */

const testimonials = [
  {
    text: "كنت مترددة لأن السعر مو رخيص، بس قلت أجرب عشان الدفع عند الاستلام. بعد أسبوعين حسيت وجهي أهدأ والهالات أخف. أكثر شي عجبني إن المكونات مكتوبة بجرعاتها مو خلطة عطّار.",
    name: "نورة",
    age: "32 سنة",
    city: "الرياض",
    badge: "شراء مؤكد",
    stars: 5,
  },
  {
    text: "كنت أدور على شي علمي مو موضة. لما شفت إن فيه 5000 ملجم كولاجين وفيتامين C بجرعة صيدلانية، حسّيت إن هذا شي مدروس. شهر واحد والفرق واضح في الصور.",
    name: "سارة",
    age: "38 سنة",
    city: "جدة",
    badge: "شراء مؤكد",
    stars: 5,
  },
  {
    text: "أنا 41، وبدل ما أدفع للبوتوكس كل ٤ شهور، جربت إشراقة. بعد ٣ أسابيع أمي قالت «وجهك صار ولد!». المكياج صار يثبت أحسن والبشرة أكثر مرونة.",
    name: "فاطمة",
    age: "41 سنة",
    city: "الدمام",
    badge: "شراء مؤكد",
    stars: 5,
  },
];

const faqs = [
  {
    q: "متى أبدأ ألاحظ النتائج؟",
    a: "نعومة وإشراقة خلال 7–10 أيام. تحسّن واضح في الهالات والتجاعيد بنهاية العلبة الأولى (30 يوم). الأفضل هو الالتزام لمدة 60–90 يوم لنتيجة ثابتة.",
  },
  {
    q: "كيف أدفع؟ هل لازم بطاقة بنكية؟",
    a: "لا. الدفع عند الاستلام فقط — كاش أو شبكة مع المندوب. ما تدفعين ريال واحد قبل ما تستلمي الطلب وتفحصيه.",
  },
  {
    q: "وش الفرق بينها وبين أي مكمل ثاني في الصيدلية؟",
    a: "إشراقة هي قهوة جمال سريرية: جرعات معلنة (5000 ملجم كولاجين بحري، 200 ملجم فيتامين C، 100 ملجم هيالورونيك)، طقس يومي بسيط بدل كبسولات تنسينها، ومخصصة للتجاعيد والهالات. لا خلطات سرية.",
  },
  {
    q: "هل هي حلال ومرخّصة؟",
    a: "نعم. حلال 100٪ (كولاجين بحري — لا جيلاتين حيواني) ومسجّلة لدى هيئة الغذاء والدواء السعودية (SFDA).",
  },
  {
    q: "كم وقت التوصيل؟",
    a: "1–3 أيام عمل للمدن الرئيسية (الرياض، جدة، الدمام، مكة، المدينة، الخبر). 3–5 أيام لبقية المناطق.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─────────────────────────────────────────────
          HERO — Clinical category claim
      ───────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-brand-cream via-white to-brand-cream/40 pt-12 pb-14 md:pt-16 md:pb-20 px-4 overflow-hidden">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Copy */}
            <div className="order-2 md:order-1">
              {/* Category claim badge */}
              <div className="inline-flex items-center gap-2 bg-brand-apothecary text-white text-[11px] font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                <FlaskConical size={12} />
                أوّل قهوة جمال سريرية في المملكة
              </div>

              <h1 className="text-[2rem] md:text-[2.6rem] font-black text-[#1A0F0A] mb-4 leading-[1.2]">
                ⁠صيغة صيدلانية موزونة —
                <br />
                <span className="text-brand-brown">
                  للهالات والتجاعيد.
                </span>
              </h1>

              <p className="text-[#3D2817]/85 text-[15.5px] md:text-base mb-6 leading-relaxed max-w-lg">
                كولاجين بحري <span className="font-bold font-inter text-brand-brown">5000 ملجم</span> +
                فيتامين C <span className="font-bold font-inter text-brand-brown">200 ملجم</span> +
                هيالورونيك <span className="font-bold font-inter text-brand-brown">100 ملجم</span> —
                جرعات معلنة، تشتغل من الداخل، بطقس قهوة يومي.
              </p>

              {/* Rating row */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <span className="text-[13px] text-[#5A4A3E] font-inter font-semibold">
                  4.9 · 1,400+ مراجعة سعودية مؤكدة
                </span>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-7">
                <HeroChip icon={<ShieldCheck size={12} />} label="SFDA" />
                <HeroChip icon={<Award size={12} />} label="حلال 100٪" />
                <HeroChip icon={<Wallet size={12} />} label="الدفع عند الاستلام" />
                <HeroChip icon={<Sparkles size={12} />} label="ضمان 14 يوم" />
              </div>

              <Link
                href="/collection"
                className="inline-flex items-center gap-2 bg-brand-brown text-white font-black px-8 py-4 rounded-2xl text-[1rem] hover:bg-brand-coffee transition-colors shadow-xl active:scale-[0.98]"
              >
                ابدئي طقس إشراقتك
                <span className="text-brand-gold">←</span>
              </Link>
              <p className="text-[11.5px] text-[#7A6A5E] mt-3 font-medium">
                بدون دفع أونلاين · 1–3 أيام للمدن الرئيسية
              </p>
            </div>

            {/* Hero visual */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-[2rem] bg-gradient-to-br from-brand-cream via-white to-brand-sage flex items-center justify-center shadow-[0_24px_48px_rgba(61,40,23,0.12)] border border-brand-border">
                  <div className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo-icon.png"
                      alt="إشراقة"
                      className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-3 rounded-full border border-brand-gold/40 shadow-md object-cover"
                    />
                    <p className="text-brand-brown text-[15px] font-black tracking-tight">
                      إشراقة
                    </p>
                    <p
                      className="text-[9px] text-brand-apothecary font-bold uppercase tracking-[0.18em] mt-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      CLINICAL BEAUTY COFFEE
                    </p>
                  </div>
                </div>
                {/* Floating proof badges */}
                <div className="absolute -top-3 -right-3 bg-white border border-brand-border rounded-2xl shadow-lg px-3 py-2 text-[11px] font-black text-brand-brown flex items-center gap-1.5">
                  <Star size={12} className="text-brand-gold fill-brand-gold" />
                  4.9 / 5
                </div>
                <div className="absolute -bottom-3 -left-3 bg-brand-apothecary text-white rounded-2xl shadow-lg px-3 py-2 text-[11px] font-black flex items-center gap-1.5">
                  <ShieldCheck size={12} />
                  SFDA · حلال
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          TRUST STRIP — Apothecary green
      ───────────────────────────────────────────── */}
      <section className="bg-brand-apothecary text-white py-3 px-4">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-center gap-5 md:gap-8 flex-wrap text-[11.5px] font-semibold">
            {[
              { icon: <Wallet size={12} />, t: "الدفع عند الاستلام" },
              { icon: <Truck size={12} />, t: "شحن مجاني" },
              { icon: <ShieldCheck size={12} />, t: "SFDA" },
              { icon: <Award size={12} />, t: "حلال 100٪" },
              { icon: <Sparkles size={12} />, t: "ضمان 14 يوم" },
              { icon: <Phone size={12} />, t: "دعم سعودي" },
            ].map((b) => (
              <span key={b.t} className="flex items-center gap-1.5">
                <span className="text-brand-gold">{b.icon}</span>
                {b.t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          BRAND PILLARS — The 5 commitments
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
               style={{ fontFamily: "Inter, sans-serif" }}>
              التزام إشراقة
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown mb-3">
              لماذا إشراقة ليست مجرد قهوة أخرى؟
            </h2>
            <p className="text-[#5A4A3E] text-[14.5px] max-w-xl mx-auto">
              نتعامل مع جمالك بمنطق الصيدلية — لا بمنطق الموضة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <PillarCard
              icon={<Microscope size={22} />}
              title="مصداقية سريرية"
              desc="جرعات معلنة على كل كيس: 5000 ملجم كولاجين بحري، 200 ملجم فيتامين C، 100 ملجم هيالورونيك. لا خلطات سرية."
            />
            <PillarCard
              icon={<ShieldCheck size={22} />}
              title="سعودية أولاً"
              desc="مسجّلة SFDA، حلال 100٪، صياغة عربية، الدفع عند الاستلام في كل المملكة. مصنوعة لكِ، لا لسوق أجنبي."
            />
            <PillarCard
              icon={<FlaskConical size={22} />}
              title="جمال وظيفي"
              desc="كل غرام له هدف محدد. لا فيتامينات حشو، لا نكهات صناعية. صيغة موزونة لاستهداف الهالات والتجاعيد فقط."
            />
            <PillarCard
              icon={<Sun size={22} />}
              title="طقس يومي بسيط"
              desc="بدلاً من ٧ كبسولات صعبة الالتزام — قهوتك الصباحية تصير علاجك. كيس واحد. كوب واحد. كل يوم."
            />
            <PillarCard
              icon={<Sparkles size={22} />}
              title="ضمان نتيجة"
              desc="14 يوم استرجاع كامل. ما حسّيتي بفرق؟ ترجع لكِ فلوسكِ — بدون نماذج وبدون أسئلة. الدفع COD أصلاً."
              highlight
            />
            <PillarCard
              icon={<Droplets size={22} />}
              title="من الداخل"
              desc="الكولاجين البحري يُمتص عبر الدم ويصل لكل طبقات البشرة. ليس ترطيب سطحي يزول مع غسيل الوجه."
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          PRODUCTS
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-brand-sage/40">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
               style={{ fontFamily: "Inter, sans-serif" }}>
              المنتج
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown mb-3">
              قهوة الجمال السريرية
            </h2>
            <p className="text-[#5A4A3E] max-w-md mx-auto text-[14.5px]">
              صيغة واحدة — مدروسة، موزونة، ومركّزة على هدفين: التجاعيد، والهالات السوداء.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          PAIN POINTS
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
               style={{ fontFamily: "Inter, sans-serif" }}>
              مشاكل تعرفينها
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown">
              هل واجهتِ واحدة من هذي؟
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "وجهي يقول إني تعبانة حتى وأنا مرتاحة.",
              "الهالات صارت تفضحني في كل صورة.",
              "المكياج يغطّي بس ما يحلّ السبب.",
              "أبغى أدخل المناسبات بوجه مرتاح وواثق.",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-brand-cream rounded-2xl p-5 border border-brand-border text-center hover:border-brand-gold transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-brand-deepSage flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={18} className="text-brand-apothecary" />
                </div>
                <p className="text-[#3D2817] text-[13.5px] leading-relaxed font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-9">
            <Link
              href="/collection"
              className="inline-block bg-brand-brown text-white font-black px-8 py-4 rounded-2xl hover:bg-brand-coffee transition-colors shadow-md active:scale-[0.98]"
            >
              اكتشفي الحل من الداخل ←
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          INGREDIENTS — Pharmacy label style
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-brand-cream">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
               style={{ fontFamily: "Inter, sans-serif" }}>
              التركيبة السريرية
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown mb-3">
              مكونات معلنة · جرعات موزونة
            </h2>
            <p className="text-[#5A4A3E] text-[14.5px] max-w-lg mx-auto">
              نعرض كل غرام نضعه — لأن الشفافية هي الفرق بين العلامة الجدية والترويج.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
            {[
              {
                name: "كولاجين بحري متحلّل",
                dose: "5000 ملجم",
                desc: "لمرونة البشرة وملء التجاعيد من الداخل",
              },
              {
                name: "فيتامين C",
                dose: "200 ملجم",
                desc: "لتفتيح الهالات وتحفيز الكولاجين الذاتي",
              },
              {
                name: "حمض الهيالورونيك",
                dose: "100 ملجم",
                desc: "لترطيب عميق ومظهر بشرة ممتلئ ومشدود",
              },
              {
                name: "قهوة عربية فاخرة",
                dose: "نكهة طبيعية",
                desc: "نظام التوصيل الأمتع — تشربينها وتنتهي",
              },
            ].map((ing) => (
              <div
                key={ing.name}
                className="bg-white rounded-2xl p-5 text-center border border-brand-border hover:border-brand-apothecary transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-sage flex items-center justify-center mx-auto mb-3 border border-brand-deepSage">
                  <FlaskConical size={18} className="text-brand-apothecary" />
                </div>
                <h3 className="font-black text-brand-brown mb-1 text-[13.5px] leading-tight">
                  {ing.name}
                </h3>
                <p className="text-[12px] font-black text-brand-apothecary font-inter mb-2">
                  {ing.dose}
                </p>
                <p className="text-[11.5px] text-[#5A4A3E] leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          EXPERT QUOTE — Authority
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-brand-brown to-brand-coffee text-white rounded-3xl p-8 md:p-10 text-center shadow-xl relative overflow-hidden">
            <Quote
              size={56}
              className="absolute top-4 right-4 text-brand-gold/20"
              strokeWidth={1.5}
            />
            <div className="relative">
              <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
                 style={{ fontFamily: "Inter, sans-serif" }}>
                نهج علمي · رأي مستشار سريري
              </p>
              <blockquote className="text-brand-cream text-[15.5px] md:text-[17px] font-medium italic leading-relaxed mb-5">
                «الكولاجين البحري المتحلّل مع فيتامين C وحمض الهيالورونيك هو نهج
                مدروس لدعم مظهر البشرة من الداخل. النتائج الملموسة تأتي من
                <span className="text-brand-gold font-bold">
                  {" "}الجرعة الصحيحة والالتزام اليومي
                </span>
                ، خصوصاً في المناخ الخليجي الجاف.»
              </blockquote>
              <p className="text-brand-gold text-[13px] font-semibold">
                — مستشار التغذية السريرية، فريق إشراقة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-brand-cream">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
               style={{ fontFamily: "Inter, sans-serif" }}>
              تجارب حقيقية
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown mb-3">
              ما تقوله 1,400+ سعودية
            </h2>
            <p className="text-[#5A4A3E] text-[14.5px]">مراجعات من مشتريات مؤكدة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-brand-border flex flex-col shadow-sm"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={13} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-[#3D2817] text-[13.5px] leading-relaxed mb-4 flex-1">
                  «{t.text}»
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                  <div>
                    <p className="font-black text-brand-brown text-[13px]">{t.name}</p>
                    <p className="text-[11px] text-[#7A6A5E]">
                      {t.age} · {t.city}
                    </p>
                  </div>
                  <span className="text-[10px] bg-brand-sage text-brand-apothecary px-2 py-0.5 rounded-full font-bold border border-brand-deepSage">
                    {t.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          COD PROCESS
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
               style={{ fontFamily: "Inter, sans-serif" }}>
              خطوة بخطوة
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown">
              كيف يصلكِ طلبكِ؟
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              { icon: <PackageCheck size={22} />, label: "اختاري عرضكِ" },
              { icon: <Phone size={22} />, label: "نتصل للتأكيد" },
              { icon: <Truck size={22} />, label: "يصل خلال 1–3 أيام" },
              { icon: <Wallet size={22} />, label: "ادفعي عند الاستلام" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-brand-sage/30 rounded-2xl p-5 border border-brand-deepSage/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-deepSage flex items-center justify-center mb-3 text-brand-apothecary">
                  {s.icon}
                </div>
                <div className="w-7 h-7 rounded-full bg-brand-brown text-brand-gold text-[12px] font-black flex items-center justify-center mb-2 font-inter">
                  {i + 1}
                </div>
                <p className="text-[#3D2817] text-[13px] font-semibold leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          GUARANTEE
      ───────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-brand-sage/40 border-y border-brand-deepSage/40">
        <div className="max-w-content mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-3xl p-6 md:p-7 border border-brand-deepSage shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-brand-apothecary text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck size={28} />
            </div>
            <div className="text-center md:text-right flex-1">
              <h3 className="font-black text-brand-brown text-[1.15rem] md:text-xl mb-1">
                ضمان رضاكِ 14 يوماً — صفر مخاطرة
              </h3>
              <p className="text-[#5A4A3E] text-[13.5px] leading-relaxed">
                جرّبي العلبة الأولى. ما حسّيتي بفرق؟ تواصلي معنا وفلوسكِ ترجع — بدون
                نماذج، بدون أسئلة. وأصلاً ما تدفعين إلا عند الاستلام.
              </p>
            </div>
            <Link
              href="/collection"
              className="inline-block bg-brand-brown text-white font-black px-6 py-3 rounded-xl hover:bg-brand-coffee transition-colors text-[14px] whitespace-nowrap shadow-md"
            >
              جرّبي الآن
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FAQ
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <p className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
               style={{ fontFamily: "Inter, sans-serif" }}>
              أسئلة شائعة
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown">
              قبل ما تطلبين
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-brand-cream rounded-2xl border border-brand-border group transition-all hover:border-brand-apothecary"
              >
                <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-bold text-brand-brown select-none text-[14.5px]">
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

      {/* ─────────────────────────────────────────────
          FINAL CTA
      ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-br from-brand-brown via-brand-coffee to-brand-brown text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-apothecary/15 rounded-full blur-3xl" />

        <div className="relative max-w-content mx-auto text-center">
          <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-3"
             style={{ fontFamily: "Inter, sans-serif" }}>
            ابدئي اليوم
          </p>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-black mb-3 leading-tight">
            «الجمال يبدأ بجرعة دقيقة.»
          </h2>
          <p className="text-brand-cream/80 mb-6 max-w-md mx-auto text-[14.5px]">
            الدفع عند الاستلام · توصيل السعودية · ضمان 14 يوم · بدون مخاطرة
          </p>
          <div className="flex items-center justify-center gap-1 mb-7">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={15} className="text-brand-gold fill-brand-gold" />
            ))}
            <span className="text-brand-gold/90 text-[13px] mr-2 font-inter font-semibold">
              1,400+ مشتركة سعودية
            </span>
          </div>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-black px-10 py-4 rounded-2xl text-[1rem] hover:bg-amber-300 transition-colors shadow-xl active:scale-[0.98]"
          >
            اختاري عرضكِ الآن
            <span>←</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Sub-components
════════════════════════════════════════════════════ */

function HeroChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] border border-brand-deepSage bg-brand-sage text-brand-apothecary px-2.5 py-1 rounded-full font-bold">
      {icon}
      {label}
    </span>
  );
}

function PillarCard({
  icon,
  title,
  desc,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-6 border transition-all ${
        highlight
          ? "bg-brand-apothecary text-white border-brand-apothecary shadow-lg"
          : "bg-white border-brand-border hover:border-brand-apothecary hover:shadow-md"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
          highlight ? "bg-white/10 text-brand-gold" : "bg-brand-sage text-brand-apothecary border border-brand-deepSage"
        }`}
      >
        {icon}
      </div>
      <h3
        className={`font-black text-[15.5px] mb-2 leading-tight ${
          highlight ? "text-white" : "text-brand-brown"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-[13px] leading-relaxed ${
          highlight ? "text-white/90" : "text-[#5A4A3E]"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}
