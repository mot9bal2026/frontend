import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FlaskConical,
  Microscope,
  Sun,
  Sparkles,
  Droplets,
  Award,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "قصة العوافي | زيت الأعشاب لآلام الركبة والظهر",
  description:
    "زيت العوافي — خلطة أعشاب طبيعية من المملكة. 30 عشبة طبية مصممة لتخفيف آلام الركبة والظهر والمفاصل موضعياً. SFDA · حلال · الدفع عند الاستلام.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ────────────────────────────── */}
      <section className="bg-gradient-to-b from-brand-cream via-white to-brand-cream/30 py-16 md:py-20 px-4">
        <div className="max-w-content mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-brand-apothecary text-white text-[11px] font-bold px-3 py-1.5 rounded-full mb-5 shadow-sm">
            <FlaskConical size={12} />
            قصة العلامة
          </div>
          <h1 className="text-[2.2rem] md:text-[2.8rem] font-black text-[#1A0F0A] mb-4 leading-[1.15]">
            <span className="text-brand-brown">زيت العوافي</span> — للعافية.
          </h1>
          <p className="text-[#0F3024]/85 text-[15.5px] md:text-base leading-relaxed max-w-2xl mx-auto">
            بُني زيت العوافي على فكرة بسيطة: من يعاني من ألم الركبة والظهر يستحق حلاً
            طبيعياً يصل لمكان الألم — لا مسكّناً مؤقتاً. <span className="font-bold">أعشاب
            طبيعية، مكونات شفافة، استخدام بسيط</span>، وضمان حقيقي.
          </p>
        </div>
      </section>

      {/* ── STORY ───────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-3xl space-y-5">
          <StorySection
            label="البداية"
            title="من معاناة الناس مع الألم وُلد زيت العوافي"
            body="بعد سنوات من رؤية الناس يعانون من آلام الركبة والظهر والمفاصل — بين مسكّنات مؤقتة تضر المعدة وعمليات مكلفة ومخيفة — بحثنا عن حل طبيعي وسطي: خلطة أعشاب طبية تصل لمكان الألم مباشرة. مكونات معروفة الفائدة، لا تُخفى في وصفات غامضة."
          />
          <StorySection
            label="الفلسفة"
            title="العافية تبدأ ببخّة واحدة"
            body="نؤمن أن الفرق بين منتج يريحك ومنتج يستهلك مالك هو شيء واحد: التركيبة الصحيحة + الاستخدام المنتظم. لهذا كل عبوة من زيت العوافي تحمل خلطة من 30 عشبة طبية مختارة بعناية — بدون كورتيزون، بدون مواد ضارة، بدون حشو."
          />
          <StorySection
            label="الالتزام"
            title="سعودي أولاً. عربي أولاً. الدفع عند الاستلام أولاً."
            body="منتجاتنا مصادق عليها من هيئة الغذاء والدواء السعودية، حلال 100٪ من أعشاب طبيعية، ومتاحة بنظام الدفع عند الاستلام في كل مناطق المملكة — لأن الثقة تُكسب، لا تُطلب مقدّماً."
          />
        </div>
      </section>

      {/* ── BRAND PILLARS ──────────────────── */}
      <section className="py-16 px-4 bg-brand-sage/40">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-[11px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ركائزنا الستّ
            </p>
            <h2 className="text-[1.6rem] md:text-3xl font-black text-brand-brown mb-3">
              التزامات العوافي معك
            </h2>
            <p className="text-[#5A4A3E] text-[14.5px] max-w-xl mx-auto">
              ستة وعود نلتزم بها مع كل عبوة تخرج من مستودعنا.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <PillarCard
              num="01"
              icon={<Microscope size={20} />}
              title="30 عشبة طبيعية"
              desc="خلطة من 30 عشبة طبية من قلب الغابات الآسيوية: زنجبيل، كركم، منثول، كافور. بلا كورتيزون ولا مواد ضارة."
            />
            <PillarCard
              num="02"
              icon={<ShieldCheck size={20} />}
              title="سعودي أولاً"
              desc="SFDA · حلال 100٪ · دعم عربي · الدفع عند الاستلام. مصنوع لك، لا مستورد من سوق آخر."
            />
            <PillarCard
              num="03"
              icon={<FlaskConical size={20} />}
              title="علاج موضعي مركّز"
              desc="كل مكوّن له هدف. لا مواد حشو، لا روائح صناعية، لا وعود وهمية. يصل لمكان الألم مباشرة."
            />
            <PillarCard
              num="04"
              icon={<Sun size={20} />}
              title="استخدام سهل جداً"
              desc="بدل حبوب ومواعيد علاج طبيعي — بخّة وتدليك دقائق. أسهل استخدام، راحة أسرع."
            />
            <PillarCard
              num="05"
              icon={<Sparkles size={20} />}
              title="ضمان نتيجة"
              desc="14 يوم استرجاع كامل. ما حسّيت بفرق؟ ترجع لك فلوسك. بدون أسئلة."
              highlight
            />
            <PillarCard
              num="06"
              icon={<Droplets size={20} />}
              title="مفعول سريع"
              desc="المنثول والأعشاب الدافئة تعطي راحة محسوسة من أول بخّة وتنشّط الدورة الدموية في مكان الألم."
            />
          </div>
        </div>
      </section>

      {/* ── BADGES STRIP ───────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <BadgeCard
              icon={<ShieldCheck size={22} />}
              top="هيئة الغذاء والدواء"
              bottom="SFDA Registered"
            />
            <BadgeCard
              icon={<Award size={22} />}
              top="حلال 100٪"
              bottom="أعشاب طبيعية بالكامل"
            />
            <BadgeCard
              icon={<Wallet size={22} />}
              top="الدفع عند الاستلام"
              bottom="بدون دفع أونلاين"
            />
            <BadgeCard
              icon={<Sparkles size={22} />}
              top="ضمان 14 يوم"
              bottom="استرجاع كامل"
            />
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-br from-brand-brown via-brand-coffee to-brand-brown text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-apothecary/15 rounded-full blur-3xl" />

        <div className="relative max-w-content mx-auto max-w-2xl text-center">
          <p
            className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            انضم للعائلة
          </p>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-black mb-4 leading-tight">
            ابدأ رحلة عافيتك.
            <br />
            <span className="text-brand-gold">
              «العافية تبدأ ببخّة واحدة.»
            </span>
          </h2>
          <p className="text-brand-cream/80 mb-7 text-[14.5px]">
            1,500+ حالة عولجت في شهر — والنتائج تتكلم.
          </p>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-black px-10 py-4 rounded-2xl text-[1rem] hover:bg-amber-300 transition-colors shadow-xl active:scale-[0.98]"
          >
            اطّلع على المنتج
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

function StorySection({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-brand-cream/60 border border-brand-border rounded-3xl p-6 md:p-8">
      <p
        className="text-[10.5px] text-brand-apothecary font-bold uppercase tracking-[0.25em] mb-2"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </p>
      <h2 className="text-[1.2rem] md:text-[1.4rem] font-black text-brand-brown mb-3 leading-tight">
        {title}
      </h2>
      <p className="text-[#0F3024]/85 text-[14px] leading-relaxed">{body}</p>
    </div>
  );
}

function PillarCard({
  num,
  icon,
  title,
  desc,
  highlight,
}: {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl p-6 border transition-all ${
        highlight
          ? "bg-brand-apothecary text-white border-brand-apothecary shadow-lg"
          : "bg-white border-brand-border hover:border-brand-apothecary hover:shadow-md"
      }`}
    >
      <p
        className={`absolute top-5 left-5 text-[11px] font-black tracking-widest font-inter ${
          highlight ? "text-brand-gold/80" : "text-brand-gold"
        }`}
      >
        {num}
      </p>
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${
          highlight
            ? "bg-white/10 text-brand-gold"
            : "bg-brand-sage text-brand-apothecary border border-brand-deepSage"
        }`}
      >
        {icon}
      </div>
      <h3
        className={`font-black text-[15px] mb-2 leading-tight ${
          highlight ? "text-white" : "text-brand-brown"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-[12.5px] leading-relaxed ${
          highlight ? "text-white/90" : "text-[#5A4A3E]"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}

function BadgeCard({
  icon,
  top,
  bottom,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <div className="bg-brand-cream/50 border border-brand-border rounded-2xl p-5 text-center hover:border-brand-apothecary transition-colors">
      <div className="w-12 h-12 rounded-2xl bg-white border border-brand-deepSage text-brand-apothecary flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <p className="font-black text-brand-brown text-[13.5px] leading-tight">{top}</p>
      <p className="text-[11px] text-[#7A6A5E] mt-1">{bottom}</p>
    </div>
  );
}

