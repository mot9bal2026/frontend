import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Star,
  Shield,
  Truck,
  CheckCircle,
  ShieldCheck,
  Package,
  FlaskConical,
  Microscope,
  Droplets,
  Sparkles,
  Wallet,
  Phone,
  PackageCheck,
  Quote,
} from "lucide-react";
import { products, getProduct } from "@/lib/products";
import { LazyBundlePicker } from "@/components/product/LazyBundlePicker";
import { DeferredBundlePicker } from "@/components/product/DeferredBundlePicker";
import { ViewContentFire } from "@/components/tracking/ViewContentFire";
import { DeferredMobileStickyCTA } from "@/components/marketing/DeferredMobileStickyCTA";
import { HeroImageSlider } from "@/components/product/HeroImageSlider";
import { ProductPhoto } from "@/components/product/ProductPhoto";
import Link from "next/link";
import type { ProductSlug } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = getProduct(slug as ProductSlug);
    return { title: `${product.nameAr} | زيت العوافي`, description: product.subAr };
  } catch {
    return { title: "المنتج | زيت العوافي" };
  }
}

/* ─────────────────────────────────────────────── */

const content: Record<string, {
  heroH1: string[];
  heroSub: string;
  statsRow: { value: string; label: string }[];
  stat: { num: string; text: string; source: string };
  painPoints: { q: string; a: string }[];
  womanStat: string;
  ingredients: { name: string; sci: string; dose: string; icon: string; desc: string; benefit: string }[];
  freeOf: string[];
  expertQuote: string;
  expertName: string;
  numbers: { n: string; l: string }[];
  timeline: { label: string; desc: string }[];
  testimonials: { text: string; name: string; age: string; city: string; initials: string; color: string }[];
  comparisons: { alt: string; price: string; cons: string[] }[];
  faq: { q: string; a: string }[];
  usageSteps: string[];
  usageStats: { n: string; l: string }[];
}> = {
  "wrinkles-dark-circles": {
    heroH1: ["ألم الركبة والظهر يمنعك من عيش حياتك؟", "زيت العوافي يعالج المشكلة من جذورها"],
    heroSub: "زيت أعشاب طبيعي للاستخدام الموضعي يعالج آلام الركبة، الظهر، المفاصل، والديسك. بخّة واحدة وتدليك بسيط يوصل مفعوله مباشرة لمكان الألم — بدون حبوب، بدون عمليات، وبدون دفع أونلاين.",
    statsRow: [
      { value: "30", label: "عشبة طبيعية" },
      { value: "30", label: "يوم لكل عبوة" },
      { value: "حلال", label: "100٪ طبيعي" },
      { value: "SFDA", label: "مرخّص" },
    ],
    stat: {
      num: "1500+",
      text: "حالة عالجها د. عبدالله الحربي بزيت العوافي في شهر واحد — من آلام الركبة والظهر والمفاصل، أشخاص كان مقرراً عليهم عمليات جراحية استغنوا عنها تماماً",
      source: "من عيادة استشاري العظام والمفاصل · الرياض",
    },
    painPoints: [
      { q: "أتألم عند الصلاة، وما أقدر أنزل للسجود ولا أقوم إلا بصعوبة.", a: "ألم الركبة عند الحركة سببه غالباً التهاب في المفصل وضعف في الأربطة. زيت العوافي يتغلغل بعمق ويهدّئ الالتهاب فتعود حركتك أسهل تدريجياً." },
      { q: "المشي صار عذاب — كل خطوة توجعني في الركبة أو أسفل الظهر.", a: "الألم عند المشي مؤشر على إجهاد المفصل والأعصاب. الأعشاب الدافئة في الزيت تنشّط الدورة الدموية وترخي العضلة المشدودة حول المفصل." },
      { q: "جربت حبوب المسكنات، بس مفعولها يروح وترجع الوجعة أقوى.", a: "المسكنات تخفي الألم مؤقتاً وتُتعب المعدة. زيت العوافي يشتغل موضعياً على مكان الألم مباشرة بدون أضرار الحبوب على الجسم." },
      { q: "الديسك وألم أسفل الظهر يمنعني حتى من النوم المريح.", a: "خليط الأعشاب يعالج تشنّج العضلات المحيطة بالفقرات ويقلّل الضغط على العصب، فينتظم نومك وترتاح ظهرك أكثر." },
    ],
    womanStat: "1500+",
    ingredients: [
      {
        name: "زيت الزنجبيل والكركم",
        sci: "Ginger & Curcumin Oil",
        dose: "تركيز عالٍ",
        icon: "🫚",
        desc: "مضاد التهاب طبيعي قوي. يتغلغل في المفصل ويهدّئ الالتهاب والتورّم المسبّب للألم عند الحركة والصلاة والمشي.",
        benefit: "تقليل الالتهاب والتورّم حول المفصل",
      },
      {
        name: "زيت المنثول والكافور",
        sci: "Menthol & Camphor",
        dose: "تأثير سريع",
        icon: "🌿",
        desc: "يعطي إحساساً منعشاً ودافئاً يعالج الألم خلال دقائق من التدليك، وينشّط الدورة الدموية في مكان الوجع.",
        benefit: "راحة فورية محسوسة من أول بخّة",
      },
      {
        name: "خلاصة أعشاب الغابات الآسيوية",
        sci: "Asian Herbal Blend · 30 herbs",
        dose: "30 عشبة",
        icon: "🍃",
        desc: "مزيج من 30 عشبة طبية من قلب الغابات الآسيوية، مختارة لدعم المفاصل والأربطة وعلاج آلام الظهر والديسك من العمق.",
        benefit: "دعم المفاصل والأربطة والأعصاب معاً",
      },
    ],
    freeOf: ["كورتيزون", "مواد كيميائية ضارة", "روائح صناعية قوية", "كحول مجفّف", "مسكنات دوائية", "آثار جانبية"],
    expertQuote: "أغلب حالات آلام الركبة والظهر التي تصلني لا تحتاج فعلاً لعملية جراحية، بل لعلاج موضعي يصل لمكان الألم ويعالج الالتهاب من جذوره. زيت العوافي بخلطة أعشابه الطبيعية أعطى نتائج ممتازة مع أكثر من 1500 حالة خلال شهر — كثير منهم استغنوا عن العملية. الأهم هو الاستمرار على الاستخدام اليومي مرتين.",
    expertName: "د. عبدالله الحربي · استشاري جراحة العظام والمفاصل · الرياض",
    numbers: [
      { n: "1500+", l: "حالة عولجت في شهر" },
      { n: "800+", l: "عميل سعودي راضٍ" },
      { n: "4.9★", l: "متوسط التقييم" },
      { n: "14 يوم", l: "ضمان استرجاع" },
    ],
    timeline: [
      { label: "أول 7 أيام", desc: "أول ما تلاحظه غالباً هو راحة أسرع بعد التدليك، وتقلّ حدّة الألم عند الحركة والوقوف. النوم يصير أهدأ." },
      { label: "الأسبوع الثاني", desc: "يبدأ التورّم والالتهاب حول المفصل يقل، والحركة تصير أسهل — تقدر تصلي وتمشي مسافات أطول بألم أخف بكثير." },
      { label: "نهاية العبوة الأولى", desc: "الفرق يصير واضح: مرونة أكبر في الركبة والظهر، ألم أقل بكثير، ورجوع تدريجي لحياتك الطبيعية. العبوة الثانية تثبّت النتيجة." },
    ],
    testimonials: [
      { text: "ركبتي تعبتني من زمان، والدكتور كان مقرر عليها عملية. جربت زيت العوافي وما شاء الله بعد أسابيع صرت أصلي وأمشي بشكل أفضل بكثير. الحمدلله أجّلت العملية.", name: "أم فهد", age: "58 سنة", city: "الرياض", initials: "أ", color: "bg-rose-100 text-rose-700" },
      { text: "أشتغل سواق وظهري ما يهدأ من ألم الديسك. المسكنات ما عادت تنفع. مع زيت العوافي مرتين باليوم صار الألم يخف وأقدر أشتغل وأنام مرتاح.", name: "خالد المطيري", age: "44 سنة", city: "جدة", initials: "خ", color: "bg-amber-100 text-amber-700" },
      { text: "والدتي كبيرة بالسن وتعاني من خشونة الركبة. صار السجود صعب عليها. بعد ما استخدمت الزيت صارت تنزل للصلاة أسهل والحمدلله ارتاحت كثير.", name: "منال العتيبي", age: "37 سنة", city: "الدمام", initials: "م", color: "bg-emerald-100 text-emerald-700" },
      { text: "لاعب كرة قديم وركبي تعبانة من الإصابات. جربت أشياء كثيرة، وهذا الزيت أحسن شي جربته لعلاج الألم والالتهاب بعد المجهود. مفعوله سريع.", name: "سعود الشهري", age: "33 سنة", city: "الرياض", initials: "س", color: "bg-blue-100 text-blue-700" },
      { text: "ألم المفاصل في يدي وركبتي كان يمنعني حتى من أعمال البيت. الزيت عالج الوجع بشكل ما توقعته، وريحته حلوة ودافئة عند التدليك.", name: "نوف القحطاني", age: "49 سنة", city: "مكة", initials: "ن", color: "bg-pink-100 text-pink-700" },
      { text: "أبوي كان مقرر له عملية غضروف بالركبة. أخّرناها وجربنا الزيت أول. صار يتحرك ويمشي بالسوق بدون العكاز الحمدلله. أنصح فيه كل من يعاني.", name: "عبدالعزيز الدوسري", age: "40 سنة", city: "الطائف", initials: "ع", color: "bg-purple-100 text-purple-700" },
    ],
    comparisons: [
      { alt: "العملية الجراحية للركبة", price: "من 1600 ريال وأكثر", cons: ["تخدير ومخاطر", "فترة نقاهة طويلة", "تكلفة عالية جداً", "نتيجة غير مضمونة"] },
      { alt: "جلسات العلاج الطبيعي", price: "300–600 ريال / جلسة", cons: ["تحتاج مواعيد وتنقّل", "تكلفة متراكمة", "نتيجة بطيئة", "تلتزم فترة طويلة"] },
      { alt: "حبوب المسكنات", price: "تكلفة شهرية دائمة", cons: ["تخفي الألم مؤقتاً", "أضرار على المعدة", "مفعول يزول بسرعة", "لا تعالج السبب"] },
    ],
    faq: [
      { q: "متى ألاحظ الفرق؟", a: "كثير من العملاء يحسّون براحة سريعة بعد أول استخدام بسبب المنثول والأعشاب الدافئة. لكن النتيجة الحقيقية لعلاج الالتهاب تحتاج استخداماً يومياً مرتين لمدة تصل إلى 30 يوم." },
      { q: "كيف أستخدم الزيت؟", a: "رجّ العبوة، بخّ كمية مناسبة على مكان الألم (ركبة، ظهر، مفصل)، ثم دلّك بحركات دائرية 2–3 دقائق حتى يمتصّه الجلد. كرّر مرتين يومياً صباحاً ومساءً." },
      { q: "هل الزيت آمن؟ وهل له آثار جانبية؟", a: "الزيت طبيعي 100٪ من أعشاب طبية للاستخدام الموضعي فقط، بدون كورتيزون ولا مواد ضارة. لكن تجنّب الجروح المفتوحة والعينين، ولو كانت بشرتك حساسة جرّب كمية بسيطة أولاً." },
      { q: "هل يغني عن العملية الجراحية؟", a: "كثير من الحالات التي كان مقرراً عليها عملية تحسّنت مع الاستخدام المنتظم. لكن نلتزم بالصدق: النتائج تتفاوت، ولا يُستخدم كبديل عن استشارة طبيبك في الحالات الشديدة." },
      { q: "هل يناسب الحامل والمرضع؟", a: "لأنه موضعي وطبيعي فهو خفيف، لكن أثناء الحمل أو الرضاعة ننصح دائماً باستشارة الطبيب قبل استخدام أي مستحضر. سلامتك أهم." },
      { q: "هل ينفع لآلام الظهر والديسك؟", a: "نعم — الزيت مصمّم لآلام الركبة، الظهر، الرقبة، الكتف، والمفاصل عموماً، ويساعد على علاج تشنّج العضلات المصاحب للديسك." },
      { q: "هل المنتج حلال؟", a: "نعم، جميع المكونات طبيعية وحلال 100٪ ومتوافقة مع المعايير الخليجية. مصادق عليه من الجهات الصحية." },
      { q: "كيف أدفع؟", a: "الدفع عند الاستلام فقط. ما تحتاج بطاقة بنكية أو دفع أونلاين. تدفع كاش أو شبكة لما يوصلك الطلب لباب بيتك." },
      { q: "هل أقدر أرجعه؟", a: "نعم — ضمان 14 يوم. إذا وصل المنتج وفيه أي مشكلة أو لم يعجبك لأي سبب، تواصل معنا ونرجّع لك المال بدون أي أسئلة." },
      { q: "كم يستغرق التوصيل؟", a: "1–3 أيام للمدن الرئيسية (الرياض، جدة، الدمام، مكة، المدينة). 3–5 أيام لباقي المناطق. نوصّل لكل مدن المملكة عبر أرامكس وسمسا وريدبكس." },
    ],
    usageSteps: [
      "رجّ العبوة جيداً قبل الاستخدام",
      "بخّ كمية مناسبة على مكان الألم (ركبة · ظهر · مفصل)",
      "دلّك بحركات دائرية 2–3 دقائق حتى يمتصّه الجلد",
      "كرّر مرتين يومياً صباحاً ومساءً للنتيجة الأفضل",
    ],
    usageStats: [
      { n: "30", l: "عشبة طبيعية" },
      { n: "2×", l: "مرتين يومياً" },
      { n: "30", l: "يوم لكل عبوة" },
      { n: "3 دق", l: "لكل استخدام" },
    ],
  },
  "anti-aging": {
    heroH1: ["مظهرك يكبر أسرع من إحساسك", "— السبب مو الوراثة"],
    heroSub: "هو نقص الكولاجين وتراكم الأكسدة بسبب شمس الخليج. قهوة كولاجين يومية بالمكونات الصحيحة تعكس التدهور وتدعم مظهر أصغر — من الداخل.",
    statsRow: [
      { value: "30", label: "كيساً في العلبة" },
      { value: "30", label: "يوم لكل علبة" },
      { value: "حلال", label: "100٪ طبيعي" },
      { value: "SFDA", label: "مرخّصة" },
    ],
    stat: {
      num: "68٪",
      text: "من النساء السعوديات يعانين من ترهّل مبكّر وتجاعيد قبل الـ 40 — أكبر سبب: نقص الكولاجين والأكسدة اليومية",
      source: "المصدر: أبحاث جلدية خليجية، 2024",
    },
    painPoints: [
      { q: "«وجهي بدأ يرتخي في الخدود والرقبة وأنا في الـ 38.»", a: "كولاجين بحري 5000ملجم يحفّز إنتاج الكولاجين الطبيعي ويشدّ البشرة من الداخل — مو رقعة سطحية." },
      { q: "«ملّيت من الكريمات الغالية. آخر شي ترطيب يومين.»", a: "الكريم يصل لـ 0.001 ملم فقط. قهوتنا تعبر عبر الدم لكل طبقات البشرة — هذا الفرق الحقيقي." },
      { q: "«ما تحبين تعترفين بكم سنتك؟»", a: "فيتامين C يعكس علامات الشيخوخة المبكرة وحمض الهيالورونيك يملأ الخطوط. تجمعان تعطيانك مظهراً أصغر بسنوات." },
      { q: "«أخاف من البوتوكس بس ما لقيت بديل يشتغل.»", a: "نتيجة الإبر — بدون الإبر. تركيبتنا تشدّ البشرة من الداخل طبيعياً ومن دون مخاطر." },
    ],
    womanStat: "68٪",
    ingredients: [
      {
        name: "كولاجين بحري متحلّل",
        sci: "Marine Hydrolyzed Collagen",
        dose: "5000 ملجم",
        icon: "🐟",
        desc: "جزيئات صغيرة جداً تُمتص مباشرةً في الدم وتصل لكل طبقات البشرة. تحفّز إنتاج الكولاجين الطبيعي وتشدّ البشرة المترهّلة.",
        benefit: "بشرة مشدودة وترهّل أقل من أول أسبوعين",
      },
      {
        name: "فيتامين C النشط",
        sci: "Sodium Ascorbate",
        dose: "200 ملجم",
        icon: "🍊",
        desc: "يحفّز الجسم على إنتاج كولاجين جديد ويعكس علامات الشيخوخة المبكّرة. بدونه الكولاجين لا يتجدّد.",
        benefit: "إشراقة ومظهر أصغر سناً",
      },
      {
        name: "حمض الهيالورونيك",
        sci: "Hyaluronic Acid",
        dose: "100 ملجم",
        icon: "💧",
        desc: "يحتجز 1000 ضعفه ماء — يملأ الخطوط والتجاعيد الدقيقة من الداخل ويمنح البشرة امتلاءً وشباباً.",
        benefit: "تجاعيد أقل وامتلاء طبيعي",
      },
    ],
    freeOf: ["سكر مضاف", "جيلاتين حيواني", "مواد حافظة", "ألوان صناعية", "GMO", "جلوتين"],
    expertQuote: "الكولاجين البحري بجرعة 5000ملجم مع فيتامين C النشط هي بالضبط النسب المثبتة علمياً لدعم مرونة البشرة وتقليل علامات الشيخوخة. التركيبة تعبر عبر الدم لجميع طبقات الجلد — لهذا فعاليتها أعمق من أي كريم.",
    expertName: "د. سارة العتيبي · أخصائية تغذية · الرياض",
    numbers: [
      { n: "60+", l: "دراسة علمية" },
      { n: "600+", l: "عميلة سعودية راضية" },
      { n: "4.9★", l: "متوسط التقييم" },
      { n: "14 يوم", l: "ضمان استرجاع" },
    ],
    timeline: [
      { label: "أول 7 أيام", desc: "البشرة أكثر نضارةً وترطيباً. المكياج يثبت أحسن ووجهك يبدو أكثر راحةً وإشراقاً من اليوم الأول." },
      { label: "الأسبوع الثاني", desc: "الخطوط الدقيقة تبدأ تخف. البشرة أكثر مرونة وإشراقة. المقرّبون يلاحظون: «وجهك تغيّر لأحسن.»" },
      { label: "نهاية العلبة الأولى", desc: "فرق واضح في الصور. بشرة مشدودة ومظهر أصغر سناً. العلبة الثانية والثالثة تثبّت هذه النتيجة وتمنع رجوعها." },
    ],
    testimonials: [
      { text: "أنا في الـ 41 وكنت محتارة بين البوتوكس والكريمات الغالية. جربت العلبة الأولى. بعد ثلاثة أسابيع أمي قبل زوجي قالت «وجهك صار ولد!». الخطوط حول عيني خفّت بشكل لم أتوقّعه. أصبحت روتيني الصباحي.", name: "هيا الشهري", age: "41 سنة", city: "الرياض", initials: "ه", color: "bg-rose-100 text-rose-700" },
      { text: "أنا في الـ 38 وعندي 4 أطفال. كنت أشوف وجهي في صور بنتي وأحزن من الفرق. بعد العلبة الثانية صورتي قبل وبعد كأني صغّرت 8 سنين.", name: "سلمى الحربي", age: "38 سنة", city: "الدمام", initials: "س", color: "bg-amber-100 text-amber-700" },
      { text: "ملّيت من الكريمات اللي ما تشتغل. جربت هذا وحسيت بفرق حقيقي. البشرة أكثر نضارة والمكياج يثبت أحسن. زوجي هو اللي قال «وش سويتي بوجهك؟».", name: "خلود المطيري", age: "44 سنة", city: "المدينة", initials: "خ", color: "bg-emerald-100 text-emerald-700" },
    ],
    comparisons: [
      { alt: "البوتوكس والفيلر", price: "3000–5000 ريال/جلسة", cons: ["إبر ومخاطر تكتلات", "تكرار كل 4–6 أشهر", "وجه مجمّد التعابير", "مكلف جداً"] },
      { alt: "كريمات أنتي إيج الفاخرة", price: "800–1500 ريال/علبة", cons: ["تلمس 0.001 ملم فقط", "ترطيب سطحي مؤقت", "ما توصل للكولاجين", "تكلفة مدى الحياة"] },
      { alt: "جلسات الليزر والبلازما", price: "1000–3000 ريال/جلسة", cons: ["تورم وتعافي طويل", "تحتاج تكرار دوري", "نتيجة غير مضمونة", "مكلفة جداً"] },
    ],
    faq: [
      { q: "متى تظهر النتائج؟", a: "أسبوع للإشراقة والنعومة. نهاية الشهر لتقليل التجاعيد والترهّل بشكل ملحوظ. العلبتان والثلاث تثبّت النتيجة." },
      { q: "كيف أدفع؟", a: "الدفع عند الاستلام فقط. تدفعين كاش أو شبكة لما يوصلك الطلب — بدون دفع أونلاين." },
      { q: "هل المنتج حلال؟", a: "نعم، جميع المكونات حلال 100٪. لا يحتوي على جيلاتين حيواني أو أي مواد محظورة." },
      { q: "هل يمكنني إرجاعه؟", a: "نعم، ضمان 14 يوم كامل. إذا ما حسّيتي بفرق تواصلي معنا وفلوسك ترجع بدون أسئلة." },
      { q: "كم يستغرق التوصيل؟", a: "1–3 أيام للمدن الرئيسية. 3–5 أيام لباقي المناطق. نوصّل لجميع مناطق المملكة." },
    ],
    usageSteps: [
      "ضعي كيساً واحداً في كوبك كل صباح",
      "أضيفي ماء ساخن واخلطي جيداً",
      "اشربيها مع الأكل أو بعده للامتصاص الأفضل",
      "استمري يومياً — الالتزام هو سرّ النتيجة",
    ],
    usageStats: [
      { n: "30", l: "كيساً في العلبة" },
      { n: "1", l: "كيس يومياً" },
      { n: "30", l: "يوم لكل علبة" },
      { n: "2 دق", l: "باليوم" },
    ],
  },
};

const saudiCities = ["الرياض","جدة","مكة المكرمة","المدينة المنورة","الدمام","الخبر","الطائف","بريدة","تبوك","أبها","حائل","نجران","ينبع","القصيم","الجوف","الباحة","+ جميع المناطق"];

/* ─────────────────────────────────────────────── */

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  if (slug !== "wrinkles-dark-circles") notFound();

  const product = getProduct(slug as ProductSlug);
  const c = content[slug];

  return (
    <div className="bg-white" dir="rtl">
      <ViewContentFire productSlug={product.slug} productNameAr={product.nameAr} price={product.price.one} />
      <DeferredMobileStickyCTA product={product} />

      {/* ══════════════════════════════════════════
          HERO
          Mobile stack order:
            1. Before/After image (full-width, no padding)
            2. 4 stats pills (flush below image)
            3. Rating
            4. H1
            5. Subtitle
            6. BundlePicker
          Desktop: 2-col (image+stats left, text right)
      ══════════════════════════════════════════ */}
      <section className="bg-[#FBF7F0]">

        {/* ─── Desktop 2-col grid wrapper ─── */}
        <div className="md:max-w-[1200px] md:mx-auto md:grid md:grid-cols-2 md:gap-10 md:items-start md:px-8 md:py-12">

          {/* ══ IMAGE COLUMN — top on mobile, right on desktop ══ */}
          <div className="md:order-last">

            {/* Before/After image Slider */}
            <HeroImageSlider />

            {/* 4 stats pills — flush below image, zero gap */}
            <div className="grid grid-cols-4 bg-white border-t border-[#E6D8C8] md:border-x md:border-b md:rounded-b-2xl">
              {c.statsRow.map((s, idx) => (
                <div key={s.label} className={`py-3 px-1 text-center ${idx < 3 ? "border-l border-[#E6D8C8]" : ""}`}>
                  <p className="font-black text-[#1A0F0A] text-sm">{s.value}</p>
                  <p className="text-[9px] text-[#7A6A5E] leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ══ TEXT COLUMN — below image on mobile, left on desktop ══ */}
          <div className="px-4 pt-5 pb-8 md:px-0 md:pt-0 md:pb-0 md:order-first md:flex md:flex-col md:justify-center">

            {/* Category badge */}
            <div className="inline-flex items-center gap-2 bg-brand-apothecary text-white text-[11px] font-bold px-3 py-1.5 rounded-full mb-3 shadow-sm self-start">
              <FlaskConical size={12} />
              زيت العوافي · لآلام الركبة والظهر والمفاصل
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-[#E5B547] fill-[#E5B547]" />)}
              </div>
              <span className="text-sm text-[#5A4A3E] font-semibold">4.9 ({c.numbers[1].n} · مؤكدة)</span>
              <span className="text-brand-apothecary">·</span>
              <span className="text-sm font-black text-[#0F3024]">من {product.price.three} ريال / ست عبوات</span>
            </div>

            {/* H1 */}
            <h1 className="text-[1.75rem] md:text-[2.5rem] font-black text-[#1A0F0A] mb-3 leading-[1.18]">
              {c.heroH1.map((line, i) => <span key={i} className="block">{line}</span>)}
            </h1>

            {/* Subtitle */}
            <p className="text-[#5A4A3E] leading-relaxed mb-5 text-[0.92rem] md:text-[0.95rem]">{c.heroSub}</p>

            {/* Bundle Picker */}
            <div id="bundle">
              <LazyBundlePicker product={product} isPrimary />
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR — Apothecary Green (matches homepage)
      ══════════════════════════════════════════ */}
      <div className="bg-brand-apothecary text-white py-4 md:py-5 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
          {[
            { icon: <Wallet size={18} />, t: "بدون دفع أونلاين", s: "الدفع عند الاستلام فقط" },
            { icon: <Truck size={18} />, t: "توصيل سريع", s: "1–3 أيام للمدن الرئيسية" },
            { icon: <Phone size={18} />, t: "دعم سعودي", s: "مكالمة تأكيد عربية" },
            { icon: <ShieldCheck size={18} />, t: "موثوقة وآمنة", s: "SFDA · حلال · GMP" },
          ].map(item => (
            <div key={item.t} className="flex flex-col items-center gap-1 bg-white/10 rounded-xl py-2.5 px-2 border border-white/10">
              <span className="text-brand-gold">{item.icon}</span>
              <p className="font-black text-[12px] md:text-sm leading-tight">{item.t}</p>
              <p className="text-[10px] md:text-[11px] text-brand-gold/90 leading-tight">{item.s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STAT CALLOUT
      ══════════════════════════════════════════ */}
      <div className="cv-auto bg-[#FDF3E7] border-y border-[#E8C08A] py-5 px-4 text-center">
        <p className="text-[#0F3024] text-sm max-w-2xl mx-auto leading-relaxed">
          <span className="font-black text-[2rem] text-[#A0640A] ml-2 leading-none">{c.stat.num}</span>
          <span className="font-semibold">{c.stat.text}</span>
        </p>
        <p className="text-[#8B6A3A] text-xs mt-1 font-medium">{c.stat.source}</p>
      </div>

      {/* ══════════════════════════════════════════
          PAIN POINTS — 2-col with portrait image
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-12 md:py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <div className="mb-6 md:mb-8 text-right">
            <p className="text-[11px] font-bold text-[#315B43] mb-2">هل تعاني من هذا؟</p>
            <h2 className="text-[1.65rem] md:text-[2.15rem] font-black text-[#0F3024] leading-tight">
              الألم ليس قدراً تعيش معه — مشكلتك لها حل
            </h2>
            <p className="text-[#5A4A3E] text-sm md:text-[15px] mt-2">
              ألم الركبة والظهر والمفاصل لا يظهر عند المشي فقط، بل عند الصلاة، النوم، وأبسط حركات يومك.
            </p>
          </div>

          {/* 2-col: image + cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

            {/* ── IMAGE SLOT 1 — real product photo ── */}
            <div className="relative rounded-2xl overflow-hidden bg-[#F5EDE3] order-last md:order-first" style={{ minHeight: 520 }}>
              <Image
                src="/images/praying-man-pain-relief.webp"
                alt="زيت العوافي لآلام الركبة والظهر والمفاصل"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={65}
                loading="lazy"
                unoptimized
                className="object-cover object-center"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-0 inset-x-0 bg-[#0F3024]/85 px-5 py-4 z-10">
                <p className="text-white text-sm font-bold text-center">
                  عندما يمنعك الألم من أبسط حركات يومك
                </p>
                <p className="text-[#C8A876] text-xs text-center mt-1">
                  هنا يبدأ الحل الحقيقي: راحة تعود لركبتك وظهرك ومفاصلك
                </p>
              </div>
            </div>

            {/* Pain-solution cards */}
            <div className="space-y-4 md:space-y-5">
              {c.painPoints.map((p, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[18px] border border-[#E8DDCC] bg-white shadow-[0_10px_28px_rgba(61,40,23,0.05)]"
                >
                  <div className="flex items-start gap-3 px-4 py-4 md:px-5 md:py-4.5">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FFE8E8] text-red-500 ring-1 ring-red-200">
                      <span className="text-sm font-black leading-none">×</span>
                    </span>
                    <p className="text-[14px] md:text-[15px] font-black italic leading-relaxed text-[#17382A]">
                      «{p.q.replace(/[«»"]/g, "")}»
                    </p>
                  </div>
                  <div className="flex items-start gap-3 border-t border-[#E5D9C8] bg-[#ECE9DD] px-4 py-4 md:px-5 md:py-4.5">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#CFE1D1] text-[#2E6B4B] ring-1 ring-[#B7CFBA]">
                      <span className="text-sm font-black leading-none">✓</span>
                    </span>
                    <p className="text-[13px] md:text-[14px] font-semibold leading-relaxed text-[#123024]">
                      {p.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCT SPOTLIGHT — High-end presentation
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-12 md:py-20 px-4 bg-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#F5EDE3]/50 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* Premium Image Card */}
            <div className="relative rounded-[2rem] border border-[#E6D8C8] shadow-2xl overflow-hidden mx-auto w-full max-w-[340px] md:max-w-none group bg-[#FAF6F0]">
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-15 mix-blend-multiply transition-transform duration-700 group-hover:scale-110">
                <Image src="/product-pattern-bg.webp" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#E6D8C8]/90 via-[#FBF7F0]/40 to-transparent" />

              {/* Inner Content */}
              <div className="relative p-8 pt-12 flex flex-col items-center">
                {/* Glow effect behind bottle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/80 blur-3xl rounded-full" />
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pain-relief-oil-product.webp"
                  alt="زيت العوافي — العلبة والزجاجة الأصلية"
                  width={498}
                  height={501}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                />
                
                <div className="mt-8 relative z-10 bg-white/90 backdrop-blur-md border border-white shadow-sm rounded-2xl px-5 py-3 w-full text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <ShieldCheck size={16} className="text-brand-apothecary" />
                    <span className="text-[11px] font-black text-brand-brown uppercase tracking-wider">المنتج الأصلي</span>
                  </div>
                  <p className="text-[13px] font-bold text-[#0F3024]">
                    عبوة أصلية مختومة — 100٪ طبيعي
                  </p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-right">
              <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                العلاج بين يديك
              </p>
              <h2 className="text-[1.8rem] md:text-[2.5rem] font-black text-[#0F3024] leading-tight mb-4">
                زيت العوافي — الحل الطبيعي لآلام المفاصل
              </h2>
              <p className="text-[#5A4A3E] text-[15px] leading-relaxed mb-6">
                زجاجة بخّاخة مصممة لسهولة الاستخدام والوصول المباشر لمكان الألم. بفضل تركيبته الغنية بـ 30 عشبة طبية، يمنحك زيت العوافي راحة سريعة وعلاجاً فعّالاً من جذور المشكلة.
              </p>
              
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "بخّاخ عملي يسهّل الوصول لمكان الألم",
                  "حجم مثالي يكفي لاستخدام شهر كامل",
                  "تركيبة مركّزة سريعة الامتصاص",
                  "لا يترك أثراً دهنياً مزعجاً على الملابس"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-sage flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} className="text-brand-apothecary" />
                    </div>
                    <p className="text-[#0F3024] font-semibold text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              <Link
                href="#bundle"
                className="inline-flex items-center justify-center gap-2 bg-brand-brown text-white font-black px-8 py-4 rounded-2xl text-[1rem] hover:bg-brand-coffee transition-all shadow-lg hover:shadow-xl active:scale-[0.98] w-full md:w-auto"
              >
                اطلب عبوتك الآن
                <span className="text-brand-gold">←</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INGREDIENTS — with product image
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>التركيبة الطبيعية</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">مكوّن من 30 عشبة طبية من قلب الغابات الآسيوية</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">لسنا نبيع تركيبة كيميائية. نبيع خلطة أعشاب طبيعية تصل لمكان الألم: الزنجبيل والكركم للالتهاب، المنثول للراحة الفورية، وأعشاب الغابات لدعم المفاصل.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* ── IMAGE SLOT 2 — premium product photo ── */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E6D8C8] shadow-lg bg-[#F5EDE3]" style={{ minHeight: 520 }}>
              <Image
                src="/images/product-1.webp"
                alt="زيت العوافي من الأعشاب الطبيعية"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={65}
                loading="lazy"
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <span className="bg-[#0F3024]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  30 عشبة طبيعية
                </span>
                <span className="bg-[#0F3024]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  زنجبيل وكركم
                </span>
                <span className="bg-[#0F3024]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  منثول وكافور
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-[#E6D8C8] px-4 py-3 z-10">
                <p className="text-xs font-bold text-[#0F3024] mb-2">ما لن تجده في عبوتك:</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.freeOf.map(f => (
                    <span key={f} className="text-[10px] bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span>✓</span> بدون {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ingredient cards — clinical apothecary style (matches homepage) */}
            <div className="space-y-4">
              {c.ingredients.map((ing, idx) => {
                /* Map each ingredient to a clinical lucide icon */
                const Icon = idx === 0 ? Microscope : idx === 1 ? FlaskConical : Droplets;
                return (
                  <div key={ing.name} className="bg-white rounded-2xl border border-[#E6D8C8] p-5 hover:border-brand-apothecary hover:shadow-md transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-sage border border-brand-deepSage flex items-center justify-center flex-shrink-0 text-brand-apothecary">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-[#0F3024] text-sm">{ing.name}</h3>
                          <span className="text-[10px] bg-brand-apothecary text-white px-2 py-0.5 rounded-full font-bold font-inter">{ing.dose}</span>
                        </div>
                        <p className="text-[10px] text-brand-apothecary font-semibold mt-0.5">{ing.sci}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#5A4A3E] leading-relaxed mb-3">{ing.desc}</p>
                    <div className="flex items-center gap-1.5 text-[12px] text-brand-apothecary font-bold bg-brand-sage rounded-lg px-3 py-2 border border-brand-deepSage/50">
                      <CheckCircle size={13} className="text-brand-apothecary flex-shrink-0" />
                      {ing.benefit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AUTHORITY
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-10 md:py-14 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>ماذا قال الدكتور؟</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">لماذا يوصي به استشاري العظام والمفاصل؟</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">لأنه ليس مجرد زيت. هو خلطة أعشاب طبيعية بتركيز واضح، مصادق عليها، وأثبتت نتائج مع أكثر من 1500 حالة في شهر واحد.</p>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              {l:"SFDA",s:"هيئة الغذاء والدواء"},
              {l:"GMP",s:"تصنيع طبي معتمد"},
              {l:"حلال",s:"هيئة الحلال السعودية"},
              {l:"ISO 22000",s:"سلامة غذائية دولية"}
            ].map(cert => (
              <div key={cert.l} className="bg-[#FAFAF7] border-2 border-[#C8A876] rounded-2xl px-5 py-3 text-center min-w-[100px]">
                <p className="font-black text-[#0F3024] text-sm">{cert.l}</p>
                <p className="text-[10px] text-[#7A6A5E] mt-0.5">{cert.s}</p>
              </div>
            ))}
          </div>

          {/* Expert card — clinical brown gradient (matches homepage) */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-brand-brown to-brand-coffee text-white rounded-3xl p-7 md:p-9 text-center shadow-xl relative overflow-hidden mb-8">
            <Quote size={56} className="absolute top-4 right-4 text-brand-gold/20" strokeWidth={1.5} />
            <div className="relative">
              <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                رأي طبيب · استشاري عظام
              </p>
              <blockquote className="text-brand-cream text-[14.5px] md:text-[16px] font-medium italic leading-relaxed mb-4">
                «{c.expertQuote}»
              </blockquote>
              <p className="text-brand-gold text-[12.5px] font-semibold">— {c.expertName}</p>
            </div>
          </div>

          {/* Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
            {c.numbers.map(s => (
              <div key={s.l} className="bg-[#FAFAF7] rounded-2xl border border-[#E6D8C8] p-4">
                <p className="font-black text-[#0F3024] text-xl">{s.n}</p>
                <p className="text-[11px] text-[#7A6A5E] mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TIMELINE — with lifestyle image
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>النتائج أسبوعاً بأسبوع</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">كيف يبدأ الفرق خلال أول 30 يوم؟</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">ليس مسكّناً مؤقتاً. هو تحسّن تدريجي تلاحظه في حركتك، صلاتك، ونومك.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

            {/* Timeline steps */}
            <div>
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute right-5 top-10 bottom-10 w-0.5 bg-[#E6D8C8] hidden md:block" />
                <div className="space-y-4">
                  {c.timeline.map((t, i) => (
                    <div key={t.label} className="flex items-start gap-4 bg-white rounded-2xl border border-[#E6D8C8] p-5 relative">
                      <div className="w-10 h-10 rounded-full bg-[#0F3024] text-white font-black flex items-center justify-center flex-shrink-0 text-sm z-10">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-black text-[#0F3024] mb-1">{t.label}</p>
                        <p className="text-sm text-[#7A6A5E] leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-apothecary text-white rounded-2xl p-4 mt-5 text-center">
                <p className="text-sm">
                  العبوة الأولى تعطيك الراحة الأولى.{" "}
                  <span className="font-black text-[#C8A876]">عرض 6 عبوات يعطيك العلاج النهائي الكامل</span> — ووفّر حتى {product.price.one * product.bottles.three - product.price.three} ريال.
                </p>
              </div>
              <p className="text-center text-xs text-[#7A6A5E] mt-3 opacity-70">* النتائج تتفاوت من شخص لآخر. المنتج لدعم وعلاج الألم موضعياً وليس بديلاً عن استشارة الطبيب في الحالات الشديدة.</p>
            </div>

            {/* ── IMAGE SLOT 3 — lifestyle photo ── */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#FBF7F0] to-[#E6D8C8] flex items-center justify-center" style={{ minHeight: 420 }}>
              <Image
                src="/images/lifestyle-couple.webp"
                alt="زيت العوافي بعد 30 يوم من الاستخدام"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={65}
                loading="lazy"
                unoptimized
                className="object-cover object-center"
              />
              {/* Result badges */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-[#0F3024] font-black text-sm mb-2">✨ بعد 30 يوم من زيت العوافي</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="font-black text-[#A0640A] text-base">↓ 80%</p>
                      <p className="text-[9px] text-[#7A6A5E]">ألم أقل</p>
                    </div>
                    <div>
                      <p className="font-black text-[#A0640A] text-base">↑ 85%</p>
                      <p className="text-[9px] text-[#7A6A5E]">حركة أسهل</p>
                    </div>
                    <div>
                      <p className="font-black text-[#A0640A] text-base">↓ 70%</p>
                      <p className="text-[9px] text-[#7A6A5E]">التهاب أخف</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Result Guarantee badge */}
              <div className="absolute top-3 right-3 bg-brand-apothecary/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-20 pointer-events-none">
                ✨ النتائج مضمونة
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHEN TO START — Cultural use cases
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-10 md:py-14 px-4 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>لمن هذا الزيت؟</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">متى تبدأ زيت العوافي؟</h2>
            <p className="text-[#5A4A3E] text-sm mt-1.5">الحالات التي تستحق أن تبدأ استخدامك من اليوم</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { emoji: "🧎", title: "ألم عند الصلاة", text: "إذا كان النزول للسجود أو القيام يؤلم ركبتك — ابدأ اليوم لتعود لصلاتك مرتاحاً" },
              { emoji: "🚶", title: "ألم عند المشي", text: "لمن يتألم مع كل خطوة في الركبة أو أسفل الظهر ويتجنّب الخروج والحركة" },
              { emoji: "🛏️", title: "ألم الظهر والديسك", text: "لمن يمنعه ألم أسفل الظهر من النوم المريح أو الجلوس والعمل لفترات طويلة" },
              { emoji: "🦵", title: "خشونة وآلام المفاصل", text: "لكبار السن وأصحاب خشونة الركبة الذين يبحثون عن راحة بدون حبوب أو عمليات" },
            ].map((item) => (
              <div key={item.title} className="bg-[#FBF7F0] border border-[#E6D8C8] rounded-2xl p-4 md:p-5 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">{item.emoji}</div>
                <p className="font-black text-[#0F3024] text-sm md:text-base mb-1.5">{item.title}</p>
                <p className="text-[#7A6A5E] text-[12px] md:text-[13px] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>تجارب حقيقية</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">اسمعوا تجارب الناس مع {c.numbers[1].n} حالة</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">مشتريات مؤكدة من مدن مختلفة — كيف تخلّصوا من معاناتهم مع ألم الركبة والظهر والمفاصل.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {c.testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-[#E0D0BC] p-4 md:p-5 flex flex-col hover:shadow-md transition-shadow">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                {/* Text */}
                <p className="text-[#7A6A5E] text-sm leading-relaxed mb-4 flex-1 line-clamp-5">"{t.text}"</p>
                {/* Person */}
                <div className="flex items-center gap-3 pt-3 border-t border-[#E6D8C8]">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-[#0F3024] text-sm">{t.name}</p>
                    <p className="text-[11px] text-[#7A6A5E]">{t.age} · {t.city}</p>
                  </div>
                  <span className="mr-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ مؤكد</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPARISON
      ══════════════════════════════════════════ */}
      <section className="cv-auto py-10 md:py-14 px-4 bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>المقارنة</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">قارن — وقرّر بنفسك</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">كل بديل جرّبته من قبل، ولماذا خذلك. وكيف يحلّه زيت العوافي بشكل مختلف.</p>
          </div>

          <div className="space-y-3">
            {c.comparisons.map(comp => (
              <div key={comp.alt} className="bg-white rounded-2xl border border-[#E6D8C8] p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-black text-[#0F3024]">{comp.alt}</p>
                  <span className="text-xs text-red-600 font-bold bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">{comp.price}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {comp.cons.map(con => (
                    <p key={con} className="text-xs text-[#5A4A3E] flex items-center gap-1.5">
                      <span className="text-red-500 font-bold flex-shrink-0">✗</span>{con}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Our product */}
            <div className="bg-[#0F3024] rounded-2xl p-5 border-2 border-[#C8A876]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-black text-white text-base flex items-center gap-2">
                  <ProductPhoto
                    src="/awafi-oil-bottle.webp"
                    alt="زيت العوافي"
                    className="w-8 h-8 object-contain rounded"
                    fallbackWrapperClassName="w-8 h-8"
                    iconSize={16}
                  />
                  زيت العوافي لآلام الركبة والمفاصل
                </span>
                <span className="text-xs font-black bg-brand-rust text-white px-3 py-1 rounded-full">من {product.price.one} ريال</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["يصل مباشرة لمكان الألم","بدون عمليات أو مخاطر","دفع عند الاستلام","حلال 100٪ · SFDA","30 عشبة طبيعية","ضمان 14 يوم"].map(pro => (
                  <p key={pro} className="text-xs text-[#C8A876] flex items-center gap-1.5">
                    <span className="font-bold">✓</span>{pro}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GUARANTEE — Apothecary Green
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-brand-sage/40 border-y border-brand-deepSage/40">
        <div className="max-w-[800px] mx-auto">
          {/* Text + guarantee steps */}
          <div className="text-center">
            {/* Apothecary shield */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
              <div className="absolute inset-0 rounded-full bg-white border-4 border-brand-apothecary shadow-md" />
              <ShieldCheck size={36} className="text-brand-apothecary relative z-10" />
            </div>

            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>الضمان الكامل</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024] mb-3">14 يوم — أو تُرجَع لك فلوسك. بدون أسئلة.</h2>
            <p className="text-[#5A4A3E] mb-6 md:mb-8 leading-relaxed text-sm max-w-lg mx-auto">
              بعد التوصيل بالمنتج لباب البيت وتجربته، إن لم يعجبك لأي سبب من الأسباب فقط تواصل معنا وسوف نرجّع لك المال الذي أنفقته — وبدون أي أسئلة. وأصلاً ما تدفع إلا عند الاستلام.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {[
                { icon: <Phone size={20} />, t: "تواصل معنا", s: "في أي يوم خلال الـ 14 يوم" },
                { icon: <Package size={20} />, t: "أرجِع العبوة", s: "حتى لو مفتوحة — ما يهمّنا" },
                { icon: <Wallet size={20} />, t: "فلوسك ترجع كاملة", s: "خلال 3–5 أيام عمل" },
              ].map(s => (
                <div key={s.t} className="bg-white rounded-2xl border border-brand-deepSage p-4 text-center shadow-sm">
                  <div className="w-11 h-11 rounded-2xl bg-brand-sage border border-brand-deepSage text-brand-apothecary flex items-center justify-center mx-auto mb-2">
                    {s.icon}
                  </div>
                  <p className="font-black text-[#0F3024] text-sm">{s.t}</p>
                  <p className="text-[11px] text-[#5A4A3E] mt-1">{s.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW TO USE
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>طريقة الاستخدام</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">طريقة الاستعمال سهلة جداً</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">بخّ · دلّك · ارتاح · بدون حبوب ولا التزام معقّد.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 text-center">
            {c.usageStats.map(s => (
              <div key={s.l} className="bg-white rounded-2xl border border-[#E6D8C8] p-3">
                <p className="font-black text-[#0F3024] text-lg">{s.n}</p>
                <p className="text-[10px] text-[#7A6A5E] mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Steps with visual */}
          <div className="space-y-3">
            {c.usageSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-xl border border-[#E6D8C8] p-4">
                <div className="w-10 h-10 rounded-full bg-[#0F3024] text-white font-black flex items-center justify-center flex-shrink-0 text-sm">
                  {i + 1}
                </div>
                <p className="text-[#0F3024] text-sm font-medium">{step}</p>
                {i === 0 && (
                  <ProductPhoto
                    src="/awafi-oil-bottle.webp"
                    alt="زيت العوافي"
                    className="mr-auto w-8 h-8 object-contain flex-shrink-0"
                    fallbackWrapperClassName="mr-auto w-8 h-8 flex-shrink-0"
                    iconSize={16}
                  />
                )}
                {i === 1 && <span className="mr-auto text-2xl">💦</span>}
                {i === 2 && <span className="mr-auto text-2xl">🤲</span>}
                {i === 3 && <span className="mr-auto text-2xl">✨</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DELIVERY
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>التوصيل</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#0F3024]">كيف يوصلك طلبك — بكل بساطة</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">بدون دفع أونلاين، بدون التزام، بدون مفاجآت.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { n: "1", icon: <PackageCheck size={22} />, t: "اطلب الآن", d: "اختر العرض، اكتب اسمك ورقم جوالك. بدون دفع أونلاين أو بطاقة بنكية." },
              { n: "2", icon: <Phone size={22} />, t: "نتصل للتأكيد", d: "فريقنا السعودي يتواصل معك خلال ساعات لتأكيد الطلب. عربي 100٪." },
              { n: "3", icon: <Wallet size={22} />, t: "استلم وادفع", d: "1–3 أيام للمدن الرئيسية. تدفع كاش أو شبكة وقت وصول الطلب." },
            ].map(s => (
              <div key={s.n} className="bg-brand-sage/40 rounded-2xl border border-brand-deepSage/40 p-4 sm:p-5 flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                <div className="w-11 h-11 rounded-2xl bg-white border border-brand-deepSage text-brand-apothecary flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                  {s.icon}
                </div>
                <div>
                  <div className="w-7 h-7 rounded-full bg-brand-brown text-brand-gold font-black flex items-center justify-center mx-auto mb-2 text-[12px] font-inter">{s.n}</div>
                  <p className="font-black text-[#0F3024] text-sm mb-0.5 sm:mb-1">{s.t}</p>
                  <p className="text-[11px] text-[#5A4A3E] leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cities */}
          <div className="bg-[#FAFAF7] rounded-2xl border border-[#E6D8C8] p-5">
            <p className="font-black text-[#0F3024] text-sm mb-3 text-center">نوصّل لكل مدن المملكة</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {saudiCities.map(city => (
                <span key={city} className="text-[11px] bg-white text-[#7A6A5E] px-2.5 py-1 rounded-full border border-[#E6D8C8]">{city}</span>
              ))}
            </div>
            <p className="text-center text-[11px] text-[#7A6A5E] mt-3">شركاء التوصيل: أرامكس · سمسا · ريدبكس · النقل الوطني</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>الأسئلة الشائعة</p>
            <h2 className="text-[1.5rem] md:text-2xl font-black text-[#0F3024]">قبل ما تطلب — كل اللي تحتاج معرفته</h2>
          </div>
          <div className="space-y-2">
            {c.faq.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[#E0D0BC] group shadow-sm">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-[#0F3024] text-sm select-none list-none active:bg-[#FBF7F0] rounded-xl">
                  {faq.q}
                  <span className="text-[#C8A876] text-xl font-bold flex-shrink-0 mr-2 transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="px-4 pb-4 text-[#5A4A3E] text-sm leading-relaxed border-t border-[#E6D8C8] pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA — Brand gradient + tagline
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-brand-brown via-brand-coffee to-brand-brown relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-apothecary/15 rounded-full blur-3xl" />

        <div className="relative max-w-[600px] mx-auto text-center">
          <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            قرارك اليوم
          </p>
          <h2 className="text-[1.6rem] md:text-3xl font-black text-white mb-3 leading-tight">
            الخيار بين يديك — هل تتخلّص من ألم الركبة أم تعاني مدى حياتك؟
          </h2>
          <p className="text-brand-gold text-[14.5px] italic mb-2">«العافية تبدأ ببخّة واحدة.»</p>
          <p className="text-brand-cream/80 mb-7 text-[13.5px] leading-relaxed">
            ابدأ اليوم — وبعد 30 يوم رح تشكر نفسك
          </p>
          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl border border-brand-gold/30">
            <DeferredBundlePicker product={product} />
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-[11.5px] text-brand-gold font-semibold flex-wrap">
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> SFDA</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Sparkles size={13} /> ضمان 14 يوم</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Wallet size={13} /> الدفع عند الاستلام</span>
          </div>
        </div>
      </section>
    </div>
  );
}
