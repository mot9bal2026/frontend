import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getProduct } from "@/lib/products";
import { LazyBundlePicker } from "@/components/product/LazyBundlePicker";
import { ViewContentFire } from "@/components/tracking/ViewContentFire";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";

/* Client-only sticky bar — keeps its JS out of the initial awafi RSC payload. */
const AwafiStickyCta = dynamic(
  () =>
    import("@/components/marketing/AwafiStickyCta").then((m) => m.AwafiStickyCta),
  { ssr: false },
);

/* Regenerate at least once a minute so the daily-offer banner at the top
   flips to the new weekday within a minute of midnight in Riyadh, even when
   the page is served from Next's cache. */
export const revalidate = 60;

/* MSRP shown crossed-out in the daily-offer banner. Kept as a plain number
   here (not in products.ts) because it's a landing-page-only anchor price. */
const ORIGINAL_PRICE_SAR = 189;

/* Weekday in Riyadh (UTC+3), independent of the visitor's local timezone.
   Runs on the server at render time — the page revalidates every minute so
   the value can never lag behind the actual day. */
function getRiyadhWeekday(): string {
  const en = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Riyadh",
    weekday: "long",
  }).format(new Date());
  const map: Record<string, string> = {
    Sunday: "الأحد",
    Monday: "الإثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
  };
  return map[en] ?? "اليوم";
}

/* ─────────────────────────────────────────────────────────────
   /pages/awafi — Landing Page

   Every headline here used to be burnt into the ad creatives. The source
   files only existed at ~1024px and were already JPEG-compressed, so the
   Arabic lettering went soft the moment it was scaled to fit a phone.

   The type is now live HTML and only the photography is raster. Text stays
   sharp at any zoom, prices read from products.ts instead of being frozen in
   a bitmap, and the page ships far fewer bytes.
───────────────────────────────────────────────────────────── */

/* Palette sampled from the physical bottle label (brand.rust family).
   Scoped to this page so the shared BundlePicker adopts the red theme here
   without disturbing the green theme used across the rest of the store. */
const RED = "#A6432E";
const RED_DARK = "#8A3624";
const RED_TINT = "#FDF4F2";
const RED_BORDER = "#EBCFC9";

/* Matches the punchy red used inside the remaining photography. */
const AD_RED = "#E8112D";
const INK = "#141414";

const formTheme = `
.lp-red .text-brand-brown,.lp-red .text-\\[\\#0F3024\\]{color:${RED_DARK}!important}
.lp-red .bg-brand-brown,.lp-red .bg-\\[\\#0F3024\\],.lp-red .bg-brand-apothecary{background-color:${RED}!important}
.lp-red .border-brand-brown{border-color:${RED}!important}
.lp-red .text-brand-apothecary,.lp-red .text-\\[\\#1E7A47\\]{color:${RED}!important}
.lp-red .hover\\:bg-brand-apothecaryDark:hover{background-color:${RED_DARK}!important}
.lp-red .bg-brand-cream,.lp-red .bg-brand-sage,.lp-red .bg-\\[\\#FAF6F0\\]{background-color:${RED_TINT}!important}
.lp-red .border-brand-gold,.lp-red .border-brand-border,.lp-red .border-brand-deepSage,.lp-red .border-\\[\\#E6D8C8\\]{border-color:${RED_BORDER}!important}
.lp-red .focus\\:border-brand-apothecary:focus{border-color:${RED}!important}
.lp-red .text-\\[\\#C8A876\\]{color:#FFE2DB!important}
.lp-red .bg-\\[\\#E6D8C8\\]{background-color:${RED_TINT}!important}
.lp-red details[open] > summary .lp-plus{transform:rotate(45deg)}
@keyframes lpPulse{0%,100%{box-shadow:0 8px 24px -6px rgba(232,17,45,.45)}50%{box-shadow:0 8px 28px 0 rgba(232,17,45,.7)}}
.lp-cta-pulse{animation:lpPulse 2.8s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.lp-cta-pulse{animation:none}}
.lp-cv{content-visibility:auto;contain-intrinsic-size:auto 640px}
`;

/* ── Copy carried over from the full product page ── */

const numbers = [
  { n: "1500+", l: "حالة عولجت في شهر" },
  { n: "800+", l: "عميل سعودي راضٍ" },
  { n: "4.9★", l: "تقييم العملاء" },
  { n: "14 يوم", l: "ضمان استرجاع" },
];

/* Sits between the hero headline and the hero photo. On a phone the photo is
   tall enough to push the offer terms off the first screen, so the three
   objections that decide a cold-traffic order — do I pay now, am I stuck with
   it, when does it arrive — are answered before the fold ends. */
const heroTrust = [
  { t: "الدفع عند الاستلام", s: "ما تدفع شي مقدماً" },
  { t: "ضمان 14 يوم", s: "أو فلوسك ترجع" },
  { t: "توصيل 1–3 أيام", s: "شحن داخل السعودية" },
];

/* Cash-on-delivery buyers hesitate because the process is opaque: they do not
   know who calls, when, or what they owe. Spelling it out removes the last
   reason to close the tab. */
const orderSteps = [
  {
    t: "تعبّي الطلب",
    s: "اسمك ورقم جوالك وعنوانك — أقل من دقيقة، بدون بطاقة بنكية.",
  },
  {
    t: "نتصل نأكّد",
    s: "يتصل بك فريقنا خلال ساعات لتأكيد الطلب والعنوان.",
  },
  {
    t: "تستلم وتدفع",
    s: "المندوب يوصّلك لباب البيت — تعاين الطلب وتدفع كاش أو شبكة.",
  },
];

const kneeCaptions = ["ألم عند الصلاة", "ألم عند المشي", "ألم عند الجماع"];

const painPoints = [
  {
    q: "أتألم عند الصلاة، وما أقدر أنزل للسجود ولا أقوم إلا بصعوبة.",
    a: "ألم الركبة عند الحركة سببه غالباً التهاب في المفصل وضعف في الأربطة. زيت العوافي يتغلغل بعمق ويهدّئ الالتهاب فتعود حركتك أسهل تدريجياً.",
  },
  {
    q: "المشي صار عذاب — كل خطوة توجعني في الركبة أو أسفل الظهر.",
    a: "الألم عند المشي مؤشر على إجهاد المفصل والأعصاب. الأعشاب الدافئة في الزيت تنشّط الدورة الدموية وترخي العضلة المشدودة حول المفصل.",
  },
  {
    q: "جربت حبوب المسكنات، بس مفعولها يروح وترجع الوجعة أقوى.",
    a: "المسكنات تخفي الألم مؤقتاً وتُتعب المعدة. زيت العوافي يشتغل موضعياً على مكان الألم مباشرة بدون أضرار الحبوب على الجسم.",
  },
  {
    q: "الديسك وألم أسفل الظهر يمنعني حتى من النوم المريح.",
    a: "خليط الأعشاب يعالج تشنّج العضلات المحيطة بالفقرات ويقلّل الضغط على العصب، فينتظم نومك وترتاح ظهرك أكثر.",
  },
];

const freeOf = [
  "كورتيزون",
  "مواد كيميائية ضارة",
  "روائح صناعية قوية",
  "كحول مجفّف",
  "مسكنات دوائية",
  "آثار جانبية",
];

const usageSteps = [
  "رجّ العبوة جيداً قبل الاستخدام",
  "بخّ كمية مناسبة على مكان الألم (ركبة · ظهر · مفصل)",
  "دلّك بحركات دائرية 2–3 دقائق حتى يمتصّه الجلد",
  "كرّر مرتين يومياً صباحاً ومساءً للنتيجة الأفضل",
];

const usageStats = [
  { n: "30", l: "عشبة طبيعية" },
  { n: "2×", l: "مرتين يومياً" },
  { n: "30", l: "يوم لكل عبوة" },
  { n: "3 دق", l: "لكل استخدام" },
];

const timeline = [
  {
    label: "أول 7 أيام",
    desc: "أول ما تلاحظه غالباً هو راحة أسرع بعد التدليك، وتقلّ حدّة الألم عند الحركة والوقوف. النوم يصير أهدأ.",
  },
  {
    label: "الأسبوع الثاني",
    desc: "يبدأ التورّم والالتهاب حول المفصل يقل، والحركة تصير أسهل — تقدر تصلي وتمشي مسافات أطول بألم أخف بكثير.",
  },
  {
    label: "نهاية العبوة الأولى",
    desc: "الفرق يصير واضح: مرونة أكبر في الركبة والظهر، ألم أقل بكثير، ورجوع تدريجي لحياتك الطبيعية. العبوة الثانية تثبّت النتيجة.",
  },
];

const comparisons = [
  {
    alt: "العملية الجراحية للركبة",
    price: "من 1600 ريال وأكثر",
    cons: ["تخدير ومخاطر", "فترة نقاهة طويلة", "تكلفة عالية جداً", "نتيجة غير مضمونة"],
  },
  {
    alt: "جلسات العلاج الطبيعي",
    price: "300–600 ريال / جلسة",
    cons: ["تحتاج مواعيد وتنقّل", "تكلفة متراكمة", "نتيجة بطيئة", "تلتزم فترة طويلة"],
  },
  {
    alt: "حبوب المسكنات",
    price: "تكلفة شهرية دائمة",
    cons: ["تخفي الألم مؤقتاً", "أضرار على المعدة", "مفعول يزول بسرعة", "لا تعالج السبب"],
  },
];

const testimonials = [
  {
    text: "أشتغل سواق وظهري ما يهدأ من ألم الديسك. المسكنات ما عادت تنفع. مع زيت العوافي مرتين باليوم صار الألم يخف وأقدر أشتغل وأنام مرتاح.",
    name: "خالد المطيري",
    age: "44 سنة",
    city: "جدة",
    initials: "خ",
  },
  {
    text: "والدتي كبيرة بالسن وتعاني من خشونة الركبة. صار السجود صعب عليها. بعد ما استخدمت الزيت صارت تنزل للصلاة أسهل والحمدلله ارتاحت كثير.",
    name: "منال العتيبي",
    age: "37 سنة",
    city: "الدمام",
    initials: "م",
  },
  {
    text: "لاعب كرة قديم وركبي تعبانة من الإصابات. جربت أشياء كثيرة، وهذا الزيت أحسن شي جربته لعلاج الألم والالتهاب بعد المجهود. مفعوله سريع.",
    name: "سعود الشهري",
    age: "33 سنة",
    city: "الرياض",
    initials: "س",
  },
  {
    text: "أبوي كان مقرر له عملية غضروف بالركبة. أخّرناها وجربنا الزيت أول. صار يتحرك ويمشي بالسوق بدون العكاز الحمدلله. أنصح فيه كل من يعاني.",
    name: "عبدالعزيز الدوسري",
    age: "40 سنة",
    city: "الطائف",
    initials: "ع",
  },
];

const faq = [
  {
    q: "متى ألاحظ الفرق؟",
    a: "كثير من العملاء يحسّون براحة سريعة بعد أول استخدام بسبب المنثول والأعشاب الدافئة. لكن النتيجة الحقيقية لعلاج الالتهاب تحتاج استخداماً يومياً مرتين لمدة تصل إلى 30 يوم.",
  },
  {
    q: "كيف أستخدم الزيت؟",
    a: "رجّ العبوة، بخّ كمية مناسبة على مكان الألم (ركبة، ظهر، مفصل)، ثم دلّك بحركات دائرية 2–3 دقائق حتى يمتصّه الجلد. كرّر مرتين يومياً صباحاً ومساءً.",
  },
  {
    q: "هل الزيت آمن؟ وهل له آثار جانبية؟",
    a: "الزيت طبيعي 100٪ من أعشاب طبية للاستخدام الموضعي فقط، بدون كورتيزون ولا مواد ضارة. لكن تجنّب الجروح المفتوحة والعينين، ولو كانت بشرتك حساسة جرّب كمية بسيطة أولاً.",
  },
  {
    q: "هل يغني عن العملية الجراحية؟",
    a: "كثير من الحالات التي كان مقرراً عليها عملية تحسّنت مع الاستخدام المنتظم. لكن نلتزم بالصدق: النتائج تتفاوت، ولا يُستخدم كبديل عن استشارة طبيبك في الحالات الشديدة.",
  },
  {
    q: "هل ينفع لآلام الظهر والديسك؟",
    a: "نعم — الزيت مصمّم لآلام الركبة، الظهر، الرقبة، الكتف، والمفاصل عموماً، ويساعد على علاج تشنّج العضلات المصاحب للديسك.",
  },
  {
    q: "هل يناسب الحامل والمرضع؟",
    a: "لأنه موضعي وطبيعي فهو خفيف، لكن أثناء الحمل أو الرضاعة ننصح دائماً باستشارة الطبيب قبل استخدام أي مستحضر. سلامتك أهم.",
  },
  {
    q: "هل المنتج حلال؟",
    a: "نعم، جميع المكونات طبيعية وحلال 100٪ ومتوافقة مع المعايير الخليجية. مصادق عليه من الجهات الصحية.",
  },
  {
    q: "كيف أدفع؟",
    a: "الدفع عند الاستلام فقط. ما تحتاج بطاقة بنكية أو دفع أونلاين. تدفع كاش أو شبكة لما يوصلك الطلب لباب بيتك.",
  },
  {
    q: "هل أقدر أرجعه؟",
    a: "نعم — ضمان 14 يوم. إذا وصل المنتج وفيه أي مشكلة أو لم يعجبك لأي سبب، تواصل معنا ونرجّع لك المال بدون أي أسئلة.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "1–3 أيام للمدن الرئيسية (الرياض، جدة، الدمام، مكة، المدينة). 3–5 أيام لباقي المناطق. نوصّل لكل مدن المملكة عبر أرامكس وسمسا وريدبكس.",
  },
];

/* ── Building blocks ── */

/* Reproduces the look of the ad creatives: heavy black Arabic where only the
   keywords (body parts, pain, decision verbs) turn ad-red. Sizes are pushed
   noticeably larger than a normal landing page — the audience for this campaign
   is 40-70y old, mostly reading on a phone. Line-height stays open (1.55) so
   descenders and hamzas do not collide, and the tracking is native (no
   tracking-tight, which mangles Arabic ligatures). */
function AdHeadline({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const cls =
    size === "lg"
      ? "text-[2rem] md:text-[2.35rem] leading-[1.4]"
      : size === "sm"
        ? "text-[1.4rem] md:text-[1.55rem] leading-[1.55]"
        : "text-[1.65rem] md:text-[1.9rem] leading-[1.5]";
  return (
    <h2
      className={`${cls} font-black text-center px-3`}
      style={{ color: INK }}
    >
      {children}
    </h2>
  );
}

/* Highlight = the keyword the eye should catch. Use sparingly: one or two
   phrases per headline max, only for concepts (الركبة، الظهر، ألم، النهائي…),
   never for connective words. */
function Hi({ children }: { children: React.ReactNode }) {
  return <span style={{ color: AD_RED }}>{children}</span>;
}

/* Photography is pre-resized to ≤820px WebP (~220KB total for the page).
   unoptimized avoids a second encode on the server; sizes keep the attribute
   honest for the layout. decoding=async keeps decode off the critical path
   for everything except the LCP hero. */
function Photo({
  src,
  alt,
  w,
  h,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={`/images/awafi/${src}.webp`}
      alt={alt}
      width={w}
      height={h}
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? undefined : "lazy"}
      decoding={priority ? "sync" : "async"}
      sizes="(max-width: 512px) 100vw, 512px"
      unoptimized
      className={`w-full h-auto block ${className}`}
    />
  );
}

function Section({
  children,
  title,
  kicker,
}: {
  children: React.ReactNode;
  title?: string;
  kicker?: string;
}) {
  return (
    <section className="lp-cv px-3 py-6">
      {(kicker || title) && (
        <div className="text-center mb-4">
          {kicker && (
            <span
              className="inline-block text-[12.5px] font-black px-3 py-1 rounded-full text-white mb-2.5"
              style={{ backgroundColor: RED }}
            >
              {kicker}
            </span>
          )}
          {title && (
            <h2
              className="text-[1.35rem] md:text-[1.55rem] font-black leading-[1.5]"
              style={{ color: INK }}
            >
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

/* The action colour is deliberately the punchy AD_RED rather than the muted
   brand rust used for kickers and borders — on a page where rust appears in
   every card border, the button has to be the single most saturated element
   or it stops reading as "the thing to press". The reassurance line under it
   answers the two objections that stall a cash-on-delivery order (paying
   upfront, being stuck with it) at the exact moment of decision. */
function CtaButton({ label }: { label: string }) {
  return (
    <div className="mt-5">
      <a
        href="#order"
        className="flex items-center justify-center w-full text-white font-black text-[19px] md:text-[20px] py-5 rounded-2xl active:scale-[0.98] transition-transform shadow-[0_8px_24px_-6px_rgba(232,17,45,.45)]"
        style={{ backgroundColor: AD_RED }}
      >
        {label}
      </a>
      <p className="text-center text-[13px] md:text-[13.5px] text-[#5A4A3E] mt-2.5 font-bold">
        ✓ الدفع عند الاستلام · ✓ ضمان 14 يوم · ✓ التوصيل 1–3 أيام
      </p>
    </div>
  );
}

/* The guarantee art was pure vector-style iconography, so it is drawn inline
   now — no raster, no compression, scales perfectly. */
const guaranteeIcons = [
  {
    label: "جودة ممتازة",
    path: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12",
  },
  {
    label: "توصيل سريع",
    path: "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M18.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  },
  {
    label: "خدمة عملاء سعودية",
    path: "M3 18v-6a9 9 0 0 1 18 0v6 M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
  },
];

export default function AwafiLandingPage() {
  const product = getProduct("wrinkles-dark-circles");
  const surgeryPrice = 1600;
  const surgerySaving = surgeryPrice - product.price.three;
  const todayName = getRiyadhWeekday();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: formTheme }} />

      <main className="lp-red min-h-screen bg-white" dir="rtl">
        {/* ── Daily-offer banner ── */}
        {/* Sits above everything else — the weekday updates automatically each
            day at midnight Riyadh time (see revalidate above). Font is one
            step below the headline scale so it reads clearly without shouting
            over the hero. */}
        <div
          className="text-white text-center px-3 py-3"
          style={{ backgroundColor: RED_DARK }}
        >
          <p className="text-[14px] md:text-[15.5px] font-bold leading-[1.7]">
            🔥 عرض <span className="font-black">اليوم ({todayName})</span> فقط
            — سعر العبوة{" "}
            <span
              className="font-black text-[16px] md:text-[17.5px]"
              style={{ color: "#FFD84A" }}
            >
              {product.price.one} ريال
            </span>{" "}
            <span className="line-through opacity-70 text-[13px] md:text-[14px]">
              {ORIGINAL_PRICE_SAR} ريال
            </span>
          </p>
          <p className="text-[12px] md:text-[13px] mt-1.5 text-white/85 font-semibold">
            العرض صالح <span className="text-white font-black">لهذا اليوم فقط</span>{" "}
            · العدد محدود
          </p>
        </div>

        {/* Capped at 512px so the ~1000px photography still renders at roughly
            1:1 on 2x screens instead of being stretched past its pixels. */}
        <div className="mx-auto max-w-lg bg-white pb-[86px]">
          {/* ── HERO ── */}
          <section className="pt-5">
            <AdHeadline size="lg">
              تخلّص من <Hi>ألم الركبة</Hi> نهائياً
              <br />
              في هذا الشهر المبارك
            </AdHeadline>
            <p className="text-center mt-3 mb-2">
              <span
                className="inline-block text-white font-black text-[1.5rem] md:text-[1.7rem] px-4 py-1.5 rounded-md"
                style={{ backgroundColor: AD_RED }}
              >
                مع زيت العوافي
              </span>
            </p>

            {/* Rating first — a cold visitor scores credibility before they
                read a single benefit. */}
            <p className="text-center text-[14px] md:text-[15px] font-bold text-[#3E3128] mt-3">
              <span className="text-[#E5B547] text-[17px] align-middle">★★★★★</span>{" "}
              <span className="font-black" style={{ color: INK }}>
                4.9
              </span>{" "}
              من أكثر من <span className="font-black">800 عميل سعودي</span>
            </p>

            <div className="grid grid-cols-3 gap-2 px-3 mt-3.5">
              {heroTrust.map((x) => (
                <div
                  key={x.t}
                  className="rounded-xl border-2 py-2.5 px-1.5 text-center"
                  style={{ backgroundColor: RED_TINT, borderColor: RED_BORDER }}
                >
                  <p
                    className="text-[13px] md:text-[14px] font-black leading-tight"
                    style={{ color: INK }}
                  >
                    {x.t}
                  </p>
                  <p className="text-[11px] md:text-[11.5px] text-[#5A4A3E] mt-1 leading-tight font-semibold">
                    {x.s}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Photo
                src="hero-man"
                alt="رجل سعودي يعاني من ألم الركبة مع عبوة زيت العوافي"
                w={820}
                h={994}
                priority
              />
            </div>
          </section>

          {/* ── ORDER FORM — directly under the hero ── */}
          <section id="order" className="scroll-mt-4 px-3 pt-1 pb-5">
            <div
              className="rounded-2xl border-2 p-4 md:p-5"
              style={{ backgroundColor: RED_TINT, borderColor: RED }}
            >
              <div className="text-center mb-4">
                <h2
                  className="text-[1.5rem] md:text-[1.7rem] font-black"
                  style={{ color: INK }}
                >
                  اطلب <span style={{ color: AD_RED }}>عبوتك</span> الآن
                </h2>
                <p className="text-[13.5px] md:text-[14.5px] text-[#5A4A3E] mt-1.5 font-semibold">
                  اختر العرض · املأ البيانات · تدفع عند الاستلام
                </p>
              </div>

              {/* The urgency in the top banner is long gone from the viewport
                  by the time the visitor reaches the picker — restate it here,
                  where it actually affects the choice. */}
              <div
                className="rounded-xl px-3 py-2.5 mb-4 text-center text-white"
                style={{ backgroundColor: RED_DARK }}
              >
                <p className="text-[13.5px] md:text-[14.5px] font-black leading-relaxed">
                  ⏳ سعر {todayName} ينتهي الليلة · الكمية محدودة
                </p>
              </div>

              <LazyBundlePicker product={product} isPrimary />
            </div>
          </section>

          {/* ── NUMBERS — instant credibility right after the form ── */}
          <section className="px-3 pb-5">
            <div
              className="grid grid-cols-4 gap-2 rounded-2xl border p-3"
              style={{ backgroundColor: RED_TINT, borderColor: RED_BORDER }}
            >
              {numbers.map((x) => (
                <div key={x.l} className="text-center">
                  <p
                    className="text-[19px] md:text-[22px] font-black leading-none"
                    style={{ color: AD_RED }}
                  >
                    {x.n}
                  </p>
                  <p className="text-[11.5px] md:text-[12.5px] text-[#3E3128] mt-1.5 leading-tight font-bold">
                    {x.l}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── الاعتمادات ──
              Regulatory proof used to sit near the bottom of the page. For a
              health product sold to Saudi buyers it is the single fastest
              trust win available, so it now backs the form directly instead of
              arriving after the visitor has already decided. */}
          <section className="lp-cv pt-2">
            <AdHeadline>
              <Hi>مصادق عليه</Hi> من وزارة الصحة
            </AdHeadline>
            <div className="mx-auto mt-5 w-[48%] max-w-[200px]">
              <Photo
                src="moh-logo"
                alt="شعار وزارة الصحة السعودية"
                w={311}
                h={280}
              />
            </div>
            <div className="mt-6">
              <AdHeadline>
                <Hi>معتمد وحاصل</Hi> على العديد من
                <br />
                شهادات الصحة المعترف بها
              </AdHeadline>
            </div>
            <div className="mt-4">
              <Photo
                src="certificates"
                alt="شهادات الجودة والاعتماد الصحي لزيت العوافي"
                w={753}
                h={260}
              />
            </div>
          </section>

          {/* ── 1. المشكلة ── */}
          <section className="lp-cv pt-2">
            <AdHeadline>
              يعالج جميع مشاكل <Hi>الركبة</Hi>
              <br />
              التي تعاني منها
            </AdHeadline>
            <div className="mt-4">
              <Photo
                src="knee-trio"
                alt="ألم الركبة عند الصلاة والمشي والجماع"
                w={704}
                h={237}
              />
            </div>
            <div className="grid grid-cols-3 gap-1 px-2 mt-3">
              {kneeCaptions.map((c) => {
                /* Only the pain-body-part word turns red — the rest reads black,
                   which mirrors the ad and stops the row from feeling shouty. */
                const [head, ...rest] = c.split(" ");
                return (
                  <p
                    key={c}
                    className="text-center text-[15px] md:text-[17px] font-black leading-tight"
                    style={{ color: INK }}
                  >
                    <Hi>{head}</Hi> {rest.join(" ")}
                  </p>
                );
              })}
            </div>
            <div className="mt-3">
              <Photo
                src="knee-closeup"
                alt="تدليك الركبة بزيت العوافي لتخفيف الألم"
                w={718}
                h={419}
              />
            </div>
          </section>

          {/* Pain points — names the objection, then answers it */}
          <Section kicker="هل تعاني من هذا؟" title="الألم ليس قدراً تعيش معه">
            <div className="space-y-3">
              {painPoints.map((p) => (
                <div
                  key={p.q}
                  className="rounded-2xl border-2 p-4 bg-white"
                  style={{ borderColor: RED_BORDER }}
                >
                  <p
                    className="text-[15.5px] md:text-[16.5px] font-black leading-[1.7]"
                    style={{ color: INK }}
                  >
                    « {p.q} »
                  </p>
                  <p className="text-[14px] md:text-[15px] text-[#3E3128] leading-[1.85] mt-2.5 font-medium">
                    {p.a}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── تجارب العملاء ──
              Moved up from near the footer. Right after the visitor has seen
              their own complaint written down, the most persuasive next thing
              is someone exactly like them saying it worked — not another
              product claim. */}
          <section className="lp-cv pt-4">
            <AdHeadline>
              اسمعوا تجارب الناس وكيف
              <br />
              <Hi>تخلصوا من معاناتهم مع الركبة</Hi>
            </AdHeadline>
            <div className="mt-4">
              <Photo
                src="whatsapp-chat"
                alt="محادثات واتساب حقيقية لعملاء استخدموا زيت العوافي"
                w={820}
                h={709}
              />
            </div>
            <div className="px-3">
              <CtaButton label={`جرّبه أنت أيضاً · من ${product.price.one} ريال ←`} />
            </div>
          </section>

          {/* ── 2. رأي الطبيبة ── */}
          <section className="lp-cv pt-2">
            <AdHeadline>
              ماذا قالت <Hi>دكتورة هدى</Hi>
              <br />
              على هذا الزيت ؟
            </AdHeadline>
            <div className="mx-auto mt-5 w-[52%] max-w-[230px]">
              <Photo
                src="doctor-huda"
                alt="دكتورة هدى توصي بزيت العوافي"
                w={362}
                h={368}
              />
            </div>
            <p
              className="text-center text-[16px] md:text-[17.5px] font-black leading-[1.95] px-4 mt-5"
              style={{ color: INK }}
            >
              زيت معجزة بعد الضجة التي عملها في أمريكا — الحمد لله الآن في
              السعودية، وإن شاء الله راح يكون <Hi>شفاء</Hi> لكل السعوديين بهذا
              الزيت
            </p>
          </section>

          {/* Second authority — orthopedic consultant + the 1500 cases stat */}
          <Section kicker="رأي طبيب · استشاري عظام" title="لماذا يوصي به استشاري العظام؟">
            <div
              className="rounded-2xl p-5 text-white"
              style={{ backgroundColor: INK }}
            >
              <p className="text-[15px] md:text-[16px] leading-[1.95] font-medium">
                «أغلب حالات آلام الركبة والظهر التي تصلني{" "}
                <span className="font-black text-white">لا تحتاج فعلاً لعملية جراحية</span>
                ، بل لعلاج موضعي يصل لمكان الألم ويعالج الالتهاب من جذوره. زيت
                العوافي بخلطة أعشابه الطبيعية أعطى نتائج ممتازة مع أكثر من{" "}
                <span
                  className="font-black"
                  style={{ color: "#FF6B57" }}
                >
                  1500 حالة
                </span>{" "}
                خلال شهر — كثير منهم استغنوا عن العملية.»
              </p>
              <p className="text-[13px] mt-3.5 font-bold text-white/75 leading-relaxed">
                — د. عبدالله الحربي
                <br />
                استشاري جراحة العظام والمفاصل · الرياض
              </p>
            </div>

            <div
              className="rounded-2xl border-2 p-5 mt-3 text-center bg-white"
              style={{ borderColor: RED_BORDER }}
            >
              <p
                className="text-[38px] md:text-[44px] font-black leading-none"
                style={{ color: AD_RED }}
              >
                1500+
              </p>
              <p className="text-[14.5px] md:text-[15.5px] text-[#211915] leading-[1.85] mt-3 font-semibold">
                حالة عالجها د. عبدالله الحربي بزيت العوافي في شهر واحد — أشخاص
                كان مقرراً عليهم <Hi>عمليات جراحية</Hi> استغنوا عنها تماماً
              </p>
              <p className="text-[12px] text-[#7A6A5E] mt-2.5">
                من عيادة استشاري العظام والمفاصل · الرياض
              </p>
            </div>
          </Section>

          {/* ── 3. المكوّنات ── */}
          <section className="lp-cv pt-2">
            <AdHeadline>
              مكون من <Hi>30 عشبة طبية</Hi>
              <br />
              من قلب الغابات الآسيوية
            </AdHeadline>
            <div className="mt-3">
              <Photo
                src="herbs-product"
                alt="زيت العوافي مصنوع من 30 عشبة طبية من الغابات الآسيوية"
                w={755}
                h={801}
              />
            </div>
          </section>

          {/* What is NOT in the bottle — kills the "chemicals" objection */}
          <Section kicker="التركيبة الطبيعية" title="ما لن تجده في عبوتك">
            <div className="grid grid-cols-2 gap-2.5">
              {freeOf.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2.5 rounded-xl border-2 bg-white px-3 py-3"
                  style={{ borderColor: RED_BORDER }}
                >
                  <span
                    className="text-[16px] font-black leading-none"
                    style={{ color: AD_RED }}
                  >
                    ✗
                  </span>
                  <span className="text-[14px] md:text-[15px] font-bold text-[#211915] leading-tight">
                    {f}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-[13.5px] md:text-[14.5px] text-[#3E3128] mt-4 leading-[1.9] font-medium">
              خلطة من <Hi>30 عشبة طبية</Hi>: زنجبيل وكركم للالتهاب، منثول وكافور
              للراحة الفورية، وأعشاب الغابات الآسيوية لدعم المفاصل والأربطة.
            </p>
            <CtaButton label="اطلب زيت العوافي الآن ←" />
          </Section>

          {/* ── 4. طريقة الاستعمال ── */}
          <section className="lp-cv pt-4 px-3">
            <AdHeadline>
              <Hi>طريقة الإستعمال</Hi> سهلة جداً
            </AdHeadline>
            <ol className="space-y-2.5 mt-5">
              {usageSteps.map((s, i) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-xl border-2 bg-white p-3.5"
                  style={{ borderColor: RED_BORDER }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-[14px] flex-shrink-0"
                    style={{ backgroundColor: AD_RED }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[14.5px] md:text-[15.5px] font-bold text-[#211915] leading-[1.75]">
                    {s}
                  </span>
                </li>
              ))}
            </ol>
            <div
              className="grid grid-cols-4 gap-2 rounded-2xl border-2 p-3.5 mt-4 bg-white"
              style={{ borderColor: RED_BORDER }}
            >
              {usageStats.map((x) => (
                <div key={x.l} className="text-center">
                  <p
                    className="text-[20px] md:text-[24px] font-black leading-none"
                    style={{ color: AD_RED }}
                  >
                    {x.n}
                  </p>
                  <p className="text-[11.5px] md:text-[12.5px] text-[#3E3128] mt-1.5 leading-tight font-bold">
                    {x.l}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. النتائج ── */}
          <section className="lp-cv pt-6">
            <AdHeadline>
              نتائجه <Hi>سريعة</Hi> تبدأ بالظهور
              <br />
              من <Hi>الأسبوع الأول</Hi>
            </AdHeadline>
            <div className="mt-3">
              <Photo
                src="couple-jumping"
                alt="زوجان يستعيدان حركتهما بعد استخدام زيت العوافي"
                w={820}
                h={565}
              />
            </div>
          </section>

          {/* Timeline — sets realistic expectations, lowers refunds */}
          <Section kicker="النتائج أسبوعاً بأسبوع" title="كيف يبدأ الفرق خلال 30 يوم؟">
            <div className="space-y-3">
              {timeline.map((t, i) => (
                <div
                  key={t.label}
                  className="flex gap-3 rounded-2xl border-2 bg-white p-4"
                  style={{ borderColor: RED_BORDER }}
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-[15px] flex-shrink-0"
                    style={{ backgroundColor: AD_RED }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-[15.5px] md:text-[16.5px] font-black leading-tight"
                      style={{ color: INK }}
                    >
                      {t.label}
                    </p>
                    <p className="text-[14px] md:text-[15px] text-[#3E3128] leading-[1.85] mt-1.5 font-medium">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[12px] text-[#7A6A5E] mt-4 leading-[1.7]">
              * النتائج تتفاوت من شخص لآخر. المنتج لدعم وعلاج الألم موضعياً وليس
              بديلاً عن استشارة الطبيب في الحالات الشديدة.
            </p>
          </Section>

          {/* ── 6. المقارنة بالعملية ── */}
          <section className="lp-cv pt-2">
            <AdHeadline>
              البديل <Hi>النهائي</Hi> للعمليات الطبية
            </AdHeadline>
            <div className="mt-4">
              <Photo
                src="surgery-vs-oil"
                alt="مقارنة بين سعر العملية الجراحية وسعر زيت العوافي"
                w={820}
                h={402}
              />
            </div>
            {/* Price row mirrors the photo left→right (surgery | oil). dir=ltr
                keeps that alignment even though the page itself is RTL. The oil
                figure is the MSRP (189) — the daily discount lives in the
                banner and sticky bar, not here, so the comparison reads as
                "surgery vs original bottle price" and the cut feels earned. */}
            <div className="grid grid-cols-2 gap-3 px-3 mt-4" dir="ltr">
              <div className="text-center rounded-xl border-2 border-black/10 bg-white py-3">
                <p
                  className="text-[14.5px] md:text-[15.5px] font-black"
                  style={{ color: INK }}
                >
                  سعر العملية
                </p>
                <p
                  className="text-[1.75rem] md:text-[2rem] font-black leading-tight mt-1"
                  style={{ color: AD_RED }}
                >
                  1600 ريال
                </p>
              </div>
              <div className="text-center rounded-xl border-2 border-[#12912F]/25 bg-[#EEF9F0] py-3">
                <p
                  className="text-[14.5px] md:text-[15.5px] font-black"
                  style={{ color: INK }}
                >
                  سعر الزيت
                </p>
                <p className="text-[1.75rem] md:text-[2rem] font-black leading-tight mt-1 text-[#0E7A28]">
                  {ORIGINAL_PRICE_SAR} ريال
                </p>
              </div>
            </div>
          </section>

          {/* Full alternatives comparison — the photo only covers surgery */}
          <Section kicker="المقارنة" title="قارن — وقرّر بنفسك">
            <div className="space-y-3">
              {comparisons.map((c) => (
                <div
                  key={c.alt}
                  className="rounded-2xl border-2 border-black/10 bg-white p-4"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-2.5">
                    <p className="text-[15px] md:text-[16px] font-black text-[#211915]">
                      {c.alt}
                    </p>
                    <p
                      className="text-[13.5px] md:text-[14.5px] font-black"
                      style={{ color: AD_RED }}
                    >
                      {c.price}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {c.cons.map((x) => (
                      <p
                        key={x}
                        className="text-[13px] md:text-[13.5px] text-[#3E3128] flex items-center gap-1.5 font-medium"
                      >
                        <span
                          className="font-black text-[15px] leading-none flex-shrink-0"
                          style={{ color: AD_RED }}
                        >
                          ✗
                        </span>
                        {x}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* The product row — the winning option, ad-red so it wins the eye */}
              <div
                className="rounded-2xl p-4 text-white shadow-lg"
                style={{ backgroundColor: AD_RED }}
              >
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <p className="text-[16px] md:text-[17px] font-black">
                    زيت العوافي
                  </p>
                  <p className="text-[16px] md:text-[17px] font-black">
                    من {product.price.one} ريال
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "يصل مباشرة لمكان الألم",
                    "بدون عمليات أو مخاطر",
                    "دفع عند الاستلام",
                    "حلال 100٪ · SFDA",
                    "30 عشبة طبيعية",
                    "ضمان 14 يوم",
                  ].map((x) => (
                    <p
                      key={x}
                      className="text-[13px] md:text-[13.5px] flex items-center gap-1.5 font-medium"
                    >
                      <span className="font-black text-[15px] leading-none flex-shrink-0">
                        ✓
                      </span>
                      {x}
                    </p>
                  ))}
                </div>
                <p className="text-[13.5px] md:text-[14px] font-bold text-white mt-3.5 pt-3 border-t border-white/30 text-center leading-relaxed">
                  عرض {product.bottles.three} عبوات بـ {product.price.three} ريال —
                  توفّر أكثر من <span className="font-black">{surgerySaving}</span> ريال
                </p>
              </div>
            </div>
            <CtaButton label={`ابدأ العلاج من ${product.price.one} ريال ←`} />
          </Section>

          {/* Written testimonials from different cities/ages */}
          <Section kicker="تجارب حقيقية" title="800+ عميل سعودي راضٍ">
            <div className="space-y-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border-2 bg-white p-4"
                  style={{ borderColor: RED_BORDER }}
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-[#E5B547] text-[16px]">
                        ★
                      </span>
                    ))}
                    <span
                      className="text-[11.5px] font-bold mr-1.5"
                      style={{ color: "#0E7A28" }}
                    >
                      ✓ شراء مؤكد
                    </span>
                  </div>
                  <p className="text-[14.5px] md:text-[15.5px] text-[#211915] leading-[1.9] font-medium">
                    «{t.text}»
                  </p>
                  <div className="flex items-center gap-2.5 mt-3 text-[12.5px] md:text-[13px] text-[#3E3128]">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-[14px]"
                      style={{ backgroundColor: AD_RED }}
                    >
                      {t.initials}
                    </span>
                    <span>
                      <span className="font-black" style={{ color: INK }}>
                        {t.name}
                      </span>{" "}
                      · {t.age} · {t.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 9. ضمان الرضا — drawn inline, no raster ── */}
          <section className="lp-cv pt-4 px-3 text-center">
            {/* Big cog-outlined checkmark badge, echoing the guarantee art */}
            <svg
              viewBox="0 0 100 100"
              className="w-28 h-28 md:w-32 md:h-32 mx-auto"
              aria-hidden="true"
            >
              {/* 16-tooth cog silhouette drawn as a star polygon so it scales
                  crisply at any zoom, unlike the raster the ad shipped. */}
              <g fill={AD_RED}>
                {Array.from({ length: 16 }).map((_, i) => {
                  const a = (i * Math.PI * 2) / 16;
                  const cx = 50 + Math.cos(a) * 46;
                  const cy = 50 + Math.sin(a) * 46;
                  return <circle key={i} cx={cx} cy={cy} r={7} />;
                })}
                <circle cx={50} cy={50} r={42} />
              </g>
              <circle cx={50} cy={50} r={32} fill="#fff" />
              <path
                d="M35 52 l10 10 l22 -22"
                fill="none"
                stroke={AD_RED}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-4">
              <span
                className="inline-block text-white font-black text-[1.55rem] md:text-[1.75rem] px-6 py-2 rounded-lg tracking-[0.15em]"
                style={{ backgroundColor: AD_RED }}
              >
                ضمان الرضا
              </span>
            </p>
            <p
              className="text-[15.5px] md:text-[16.5px] font-bold leading-[2] mt-5"
              style={{ color: INK }}
            >
              بعد التوصيل بالمنتج بباب البيت وتجربته، إن لم يعجبك لأي سبب من
              الأسباب فقط <span className="font-black">تواصل معنا</span> وسوف
              نرجّع لك المال الذي أنفقته و<Hi>بدون أي أسئلة</Hi>
            </p>
            <div className="grid grid-cols-3 gap-3 mt-7">
              {guaranteeIcons.map((g) => (
                <div key={g.label}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={AD_RED}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-14 h-14 md:w-16 md:h-16 mx-auto"
                    aria-hidden="true"
                  >
                    <path d={g.path} />
                  </svg>
                  <p
                    className="text-[13.5px] md:text-[14.5px] font-black mt-2 leading-tight"
                    style={{ color: AD_RED }}
                  >
                    {g.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Demystifies the cash-on-delivery flow. Visitors who have never
              bought from the store do not know who calls them or what they owe
              at the door, and that uncertainty is enough to lose the order. */}
          <Section kicker="بكل بساطة" title="كيف تطلب؟ ٣ خطوات فقط">
            <div className="space-y-3">
              {orderSteps.map((s, i) => (
                <div
                  key={s.t}
                  className="flex gap-3 rounded-2xl border-2 bg-white p-4"
                  style={{ borderColor: RED_BORDER }}
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-[15px] flex-shrink-0"
                    style={{ backgroundColor: AD_RED }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-[15.5px] md:text-[16.5px] font-black leading-tight"
                      style={{ color: INK }}
                    >
                      {s.t}
                    </p>
                    <p className="text-[14px] md:text-[15px] text-[#3E3128] leading-[1.85] mt-1.5 font-medium">
                      {s.s}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[13.5px] md:text-[14.5px] text-[#3E3128] mt-4 font-semibold leading-relaxed">
              ما تحتاج بطاقة بنكية ولا دفع أونلاين —{" "}
              <span className="font-black" style={{ color: "#0E7A28" }}>
                تدفع فقط لما يوصلك الطلب
              </span>
            </p>
          </Section>

          {/* FAQ — native details/summary, zero JS cost */}
          <Section kicker="الأسئلة الشائعة" title="قبل ما تطلب — كل اللي تحتاج معرفته">
            <div className="space-y-2.5">
              {faq.map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl border-2 bg-white overflow-hidden"
                  style={{ borderColor: RED_BORDER }}
                >
                  <summary className="flex items-center justify-between gap-2.5 cursor-pointer list-none px-4 py-3.5">
                    <span
                      className="text-[15px] md:text-[16px] font-black leading-[1.55]"
                      style={{ color: INK }}
                    >
                      {f.q}
                    </span>
                    <span
                      className="lp-plus text-[22px] font-black flex-shrink-0 transition-transform leading-none"
                      style={{ color: AD_RED }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-[14px] md:text-[15px] text-[#3E3128] leading-[1.9] px-4 pb-4 font-medium">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Section>

          {/* ── 10. القرار النهائي ── */}
          <section className="lp-cv pt-2">
            <AdHeadline>
              الآن الخيار بين يديك
              <br />
              <Hi>هل تريد أن تتخلص من ألم الركبة</Hi>
              <br />
              أم تعاني مدى حياتك
            </AdHeadline>
            <div className="mt-4">
              <Photo
                src="knee-outdoors"
                alt="التخلص من ألم الركبة مع زيت العوافي"
                w={820}
                h={590}
              />
            </div>
          </section>

          {/* Closing block — guarantee recap + last CTA */}
          <section className="lp-cv px-3 py-6">
            <div
              className="text-white rounded-2xl p-5 text-center shadow-lg"
              style={{ backgroundColor: INK }}
            >
              <p className="text-[17px] md:text-[19px] font-black">
                🛡️ 14 يوم — أو تُرجَع لك فلوسك
              </p>
              <p className="text-[13.5px] md:text-[14.5px] mt-2.5 leading-[1.85] text-white/90 font-medium">
                نوصّل المنتج لباب بيتك، تجرّبه، وإن لم يعجبك لأي سبب تواصل معنا
                ونرجّع لك المال كاملاً. <span className="font-black text-white">ما تدفع إلا عند الاستلام.</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-3">
              {[
                { t: "تواصل معنا", s: "في أي يوم خلال 14 يوم" },
                { t: "أرجِع العبوة", s: "حتى لو مفتوحة" },
                { t: "فلوسك ترجع", s: "خلال 3–5 أيام" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-xl border-2 bg-white p-3 text-center"
                  style={{ borderColor: RED_BORDER }}
                >
                  <p
                    className="text-[13px] md:text-[14px] font-black leading-tight"
                    style={{ color: INK }}
                  >
                    {x.t}
                  </p>
                  <p className="text-[11px] md:text-[11.5px] text-[#5A4A3E] mt-1.5 leading-tight font-medium">
                    {x.s}
                  </p>
                </div>
              ))}
            </div>

            <CtaButton label="اطلب الآن · الدفع عند الاستلام ←" />

            <p
              className="text-center text-[14px] md:text-[15px] mt-4 font-black"
              style={{ color: INK }}
            >
              «العافية تبدأ <Hi>ببخّة واحدة</Hi>»
            </p>
          </section>

          {/* Fine print */}
          <p className="text-center text-[12px] text-[#7A6A5E] px-4 pb-6 leading-[1.8]">
            * النتائج تتفاوت من شخص لآخر. المنتج لدعم وعلاج الألم موضعياً وليس
            بديلاً عن استشارة الطبيب في الحالات الشديدة.
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

        <AwafiStickyCta
          price={product.price.one}
          originalPrice={ORIGINAL_PRICE_SAR}
        />
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
