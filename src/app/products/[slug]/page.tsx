import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
import { BundlePicker } from "@/components/product/BundlePicker";
import { ViewContentFire } from "@/components/tracking/ViewContentFire";
import { MobileStickyCTA } from "@/components/marketing/MobileStickyCTA";
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
    return { title: `${product.nameAr} | إشراقة للجمال`, description: product.subAr };
  } catch {
    return { title: "المنتج | إشراقة للجمال" };
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
    heroH1: ["تبدين متعبة وأكبر في الصور؟", "ابدئي روتين الهالات والتجاعيد"],
    heroSub: "قهوة كولاجين يومية للمرأة التي ترى الهالات والخطوط كل صباح في المرآة. كيس واحد يدعم الكولاجين، النضارة، وامتلاء البشرة من الداخل — بدون إبر، بدون بوتوكس، وبدون دفع أونلاين.",
    statsRow: [
      { value: "30", label: "كيساً في العلبة" },
      { value: "30", label: "يوم لكل علبة" },
      { value: "حلال", label: "100٪ طبيعي" },
      { value: "SFDA", label: "مرخّصة" },
    ],
    stat: {
      num: "73٪",
      text: "من النساء في الخليج يلاحظن هالات وخطوطاً مبكرة حول العين قبل سن الـ40 — لأن الشمس، السهر، والتكييف يستنزفون الكولاجين والترطيب يومياً",
      source: "تحليل احتياجات العناية بالبشرة في الخليج",
    },
    painPoints: [
      { q: "أنام كويس، لكن الهالات تخليني أبان متعبة كأني ما نمت.", a: "المشكلة غالباً ليست النوم فقط. منطقة تحت العين رقيقة وتفقد الكولاجين والترطيب بسرعة — لذلك ندعمها من الداخل بروتين يومي ثابت." },
      { q: "أخفيها بالكونسيلر، وبعد ساعتين ترجع تبان في الصور.", a: "الكونسيلر يخفي المشكلة مؤقتاً ولا يبني البشرة. قهوة إشراقة تجعل العناية تبدأ من كوبك الصباحي قبل المكياج." },
      { q: "دفعت على كريمات عين غالية، والنتيجة ترطيب يومين فقط.", a: "الكريم يلامس السطح. الكولاجين البحري + فيتامين C + الهيالورونيك يدعمون مرونة وامتلاء البشرة من الداخل." },
      { q: "كل ما أفتح الكاميرا أحس وجهي أكبر من عمري.", a: "الخطوط حول العين والهالات هي أول ما يكبّر الملامح. الروتين اليومي يساعد البشرة تظهر أهدأ، أصفى، وأكثر راحة تدريجياً." },
    ],
    womanStat: "73٪",
    ingredients: [
      {
        name: "كولاجين بحري متحلّل",
        sci: "Marine Hydrolyzed Collagen",
        dose: "5000 ملجم",
        icon: "🐟",
        desc: "الجرعة التي تجعل المنتج يبدو Premium فعلاً. جزيئات صغيرة سهلة الامتصاص تدعم بنية البشرة حول العين، الخدود، وخطوط الابتسامة.",
        benefit: "يدعم المرونة ومظهر الخطوط الدقيقة مع الاستمرار",
      },
      {
        name: "فيتامين C النشط",
        sci: "Sodium Ascorbate",
        dose: "200 ملجم",
        icon: "🍊",
        desc: "الكولاجين وحده لا يكفي. فيتامين C هو العامل الذي يحتاجه الجسم لدعم بناء الكولاجين وحماية البشرة من إجهاد الشمس اليومي.",
        benefit: "نضارة أوضح ومظهر لون أكثر توازناً",
      },
      {
        name: "حمض الهيالورونيك",
        sci: "Hyaluronic Acid",
        dose: "100 ملجم",
        icon: "💧",
        desc: "مكوّن الترطيب العميق. يساعد البشرة تبدو ممتلئة وأكثر نعومة، خصوصاً تحت العين حيث يظهر الجفاف والخطوط بسرعة.",
        benefit: "مظهر ممتلئ وناعم بدون روتين معقّد",
      },
    ],
    freeOf: ["سكر مضاف", "جيلاتين حيواني", "مواد حافظة", "ألوان صناعية", "GMO", "جلوتين"],
    expertQuote: "الخلط بين كولاجين بحري متحلّل بجرعة عالية، فيتامين C، وهيالورونيك أسيد يعطي روتيناً منطقياً للنساء اللواتي يلاحظن هالات وخطوطاً مبكرة. الأهم هو الالتزام اليومي، لأن البشرة لا تتغيّر من استخدام متقطع.",
    expertName: "د. خلود منصور أحمد · اختصاصية أمراض الجلد والتجميل",
    numbers: [
      { n: "60+", l: "دراسة علمية" },
      { n: "800+", l: "عميلة سعودية راضية" },
      { n: "4.9★", l: "متوسط التقييم" },
      { n: "14 يوم", l: "ضمان استرجاع" },
    ],
    timeline: [
      { label: "أول 7 أيام", desc: "أول شيء تلاحظينه غالباً هو نعومة وترطيب أفضل. المكياج يجلس بهدوء أكثر، وملامحك تبدو أقل إرهاقاً في الصباح." },
      { label: "الأسبوع الثاني", desc: "تبدأ منطقة تحت العين تبدو أهدأ، ومظهر الجفاف حول الخطوط الدقيقة يقل. هنا تبدأين تحسينين أن الروتين يستحق الاستمرار." },
      { label: "نهاية العلبة الأولى", desc: "تقدرين تقارنين صورتك قبل وبعد. الهدف: بشرة أكثر امتلاءً، هالات أقل وضوحاً، وخطوط تبدو أنعم. العلبة الثانية تساعد على تثبيت الروتين." },
    ],
    testimonials: [
      { text: "كنت مترددة لأن السعر مو رخيص، بس الدفع عند الاستلام خلاني أطلب بدون خوف. بعد أسبوعين حسيت وجهي أهدأ والهالات أقل وضوحاً. أكثر شيء عجبني أني ما أحتاج أغيّر روتيني — فقط قهوتي الصباحية.", name: "نورة الشمري", age: "32 سنة", city: "الرياض", initials: "ن", color: "bg-rose-100 text-rose-700" },
      { text: "عمري 26 لكن الهالات كانت تخليني أبان أكبر في الصور. بعد شهر صرت أطلع بكاميرا الجوال بدون ما أرفع الإضاءة كل مرة. صاحباتي يسألن: وش غيرتي؟", name: "ريم القرشي", age: "26 سنة", city: "جدة", initials: "ر", color: "bg-pink-100 text-pink-700" },
      { text: "أنا في الـ 41 وكنت محتارة بين البوتوكس والكريمات الغالية. جربت علبة، وبعد ثلاثة أسابيع أمي قالت وجهي صار مرتاح. الخطوط حول عيني صارت أنعم، والثانية ثبّتت الروتين.", name: "هيا الشهري", age: "41 سنة", city: "الرياض", initials: "ه", color: "bg-amber-100 text-amber-700" },
      { text: "طلبته قبل زواجي بشهرين لأنني ما أبي بوتوكس قبل التصوير. طلعت بإشراقة طبيعية، وكنت مرتاحة لأن النتيجة تدريجية وما تغيّر ملامحي فجأة.", name: "لينا العنزي", age: "28 سنة", city: "الرياض", initials: "ل", color: "bg-purple-100 text-purple-700" },
      { text: "بعد الولادة صار وجهي شاحب والهالات أوضح. بعد استشارة طبيبتي بدأت الروتين. خلال أسابيع حسيت أن ملامحي أهدأ، وزوجي لاحظ الفرق قبل ما أتكلم.", name: "منى العتيبي", age: "35 سنة", city: "جدة", initials: "م", color: "bg-emerald-100 text-emerald-700" },
      { text: "أم لـ 3 أطفال، وشغلي كله شاشة. كنت أشوف صوري وأحس أن وجهي متعب. بعد العلبة الثانية صار تحت العين أهدأ والخطوط أقل بروزاً. القهوة صارت أسهل عادة عندي.", name: "حصة الدوسري", age: "33 سنة", city: "الدمام", initials: "ح", color: "bg-blue-100 text-blue-700" },
    ],
    comparisons: [
      { alt: "البوتوكس والفيلر", price: "3000–5000 ريال/جلسة", cons: ["إبر ومخاطر تكتلات", "تكرار كل 4–6 أشهر", "وجه مجمّد التعابير", "مكلف جداً"] },
      { alt: "كريمات أنتي إيج الفاخرة", price: "800–1500 ريال/علبة", cons: ["تلمس 0.001 ملم فقط", "ترطيب سطحي مؤقت", "ما توصل للكولاجين", "تكلفة مدى الحياة"] },
      { alt: "الكونسيلر اليومي", price: "300–600 ريال / ليوم", cons: ["يخفي بدون يحل", "تكلفة لا تنتهي", "يتلطّخ مع التعرّق", "يجهد البشرة"] },
    ],
    faq: [
      { q: "متى ألاحظ الفرق؟", a: "غالباً تبدئين بنعومة وترطيب أفضل خلال أول أسبوع. مظهر الهالات والخطوط يحتاج التزاماً يومياً من 30 يوم، لأننا نبني روتيناً للبشرة وليس تغطية مؤقتة." },
      { q: "هل يناسب الحامل والمرضع؟", a: "المكونات غذائية ومعروفة، لكن أثناء الحمل أو الرضاعة ننصح دائماً بسؤال طبيبتك قبل أي مكمل أو مشروب وظيفي. سلامتك أهم من أي طلب." },
      { q: "هل يسبب أرق؟ لأنه قهوة", a: "مصمم ليكون روتيناً صباحياً خفيفاً. الأفضل شربه صباحاً أو قبل العصر، خصوصاً إذا كنتِ حساسة للكافيين." },
      { q: "هل أكمل قهوتي المعتادة؟", a: "نعم تماماً — قهوة إشراقة تكمّل روتينك، ما تستبدله. كثير من عميلاتنا يشربنها صباحاً ثم قهوتهن المفضلة بعد الظهر بدون مشاكل." },
      { q: "هل تناسب البشرة الحساسة؟", a: "نعم 100٪ — لأنها تشتغل من الداخل عبر الجهاز الهضمي، ما تلامس بشرتك أبداً. مثالية للبشرات الحساسة اللي تتحسس من الكريمات والمستحضرات الموضعية." },
      { q: "كم سعرة حرارية؟ هل يزيد الوزن؟", a: "كيس واحد = 12 سعرة حرارية فقط (أقل من نصف ملعقة سكر). ما يزيد الوزن إطلاقاً — بل العكس، شد البشرة يعطيكِ مظهراً أنحف وأكثر شباباً." },
      { q: "هل المنتج حلال؟", a: "نعم، جميع المكونات حلال 100٪ ومتوافقة مع المعايير الخليجية. لا يحتوي على جيلاتين حيواني أو أي مواد محظورة." },
      { q: "كيف أدفع؟", a: "الدفع عند الاستلام فقط. ما تحتاجين بطاقة بنكية أو دفع أونلاين. تدفعين كاش أو شبكة لما يوصلك الطلب لباب بيتك." },
      { q: "هل أقدر أرجعه؟", a: "نعم — ضمان 14 يوم. إذا وصل المنتج وفيه أي مشكلة أو لم يكن مناسباً لك، تواصلي معنا ونساعدك مباشرة. نريدك تطلبين وأنتِ مطمئنة." },
      { q: "كم يستغرق التوصيل؟", a: "1–3 أيام للمدن الرئيسية (الرياض، جدة، الدمام، مكة، المدينة). 3–5 أيام لباقي المناطق. نوصّل لكل مدن المملكة عبر أرامكس وسمسا وريدبكس." },
    ],
    usageSteps: [
      "ضعي كيساً واحداً في كوبك كل صباح",
      "أضيفي ماء ساخن (180–200 مل) واخلطي جيداً",
      "اشربيها مع الأكل أو بعده للامتصاص الأفضل",
      "التزمي يومياً — الاستمرار هو سرّ النتيجة الحقيقية",
    ],
    usageStats: [
      { n: "30", l: "كيساً في العلبة" },
      { n: "1", l: "كيس يومياً" },
      { n: "30", l: "يوم لكل علبة" },
      { n: "2 دق", l: "باليوم" },
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
      <ViewContentFire productSlug={product.slug} productNameAr={product.nameAr} price={199} />
      <MobileStickyCTA product={product} />

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

            {/* Before/After image — full-width on mobile, rounded on desktop */}
            <div className="relative overflow-hidden md:rounded-2xl md:shadow-xl w-full">
              <img 
                src="/before-after-results.png?v=2" 
                alt="نتيجة قبل وبعد استخدام قهوة إشراقة" 
                className="w-full h-auto block"
              />
              {/* BEFORE / AFTER labels */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="bg-white/90 text-[#5A4A3E] text-sm font-black px-4 py-1 rounded-full shadow border border-white/50">قبل</span>
              </div>
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="bg-brand-apothecary text-white text-sm font-black px-4 py-1 rounded-full shadow border border-brand-apothecary">بعد</span>
              </div>
              {/* Bottom ribbon */}
              <div className="absolute bottom-0 inset-x-0 bg-[#1A0F0A]/85 px-4 py-2.5 z-10">
                <p className="text-white text-xs font-bold text-center">✨ فرق واضح بعد 30 يوم — مضمون أو فلوسك ترجع</p>
              </div>
            </div>

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
              قهوة الجمال · ضد الهالات والتجاعيد
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-[#E5B547] fill-[#E5B547]" />)}
              </div>
              <span className="text-sm text-[#5A4A3E] font-semibold">4.9 ({c.numbers[1].n} · مؤكدة)</span>
              <span className="text-brand-apothecary">·</span>
              <span className="text-sm font-black text-[#3D2817]">من 199 ريال / علبة</span>
            </div>

            {/* H1 */}
            <h1 className="text-[1.75rem] md:text-[2.5rem] font-black text-[#1A0F0A] mb-3 leading-[1.18]">
              {c.heroH1.map((line, i) => <span key={i} className="block">{line}</span>)}
            </h1>

            {/* Subtitle */}
            <p className="text-[#5A4A3E] leading-relaxed mb-5 text-[0.92rem] md:text-[0.95rem]">{c.heroSub}</p>

            {/* Bundle Picker */}
            <div id="bundle">
              <BundlePicker product={product} />
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
      <div className="bg-[#FDF3E7] border-y border-[#E8C08A] py-5 px-4 text-center">
        <p className="text-[#3D2817] text-sm max-w-2xl mx-auto leading-relaxed">
          <span className="font-black text-[2rem] text-[#A0640A] ml-2 leading-none">{c.stat.num}</span>
          <span className="font-semibold">{c.stat.text}</span>
        </p>
        <p className="text-[#8B6A3A] text-xs mt-1 font-medium">{c.stat.source}</p>
      </div>

      {/* ══════════════════════════════════════════
          PAIN POINTS — 2-col with portrait image
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <div className="mb-6 md:mb-8 text-right">
            <p className="text-[11px] font-bold text-[#315B43] mb-2">هل تعانين من هذا؟</p>
            <h2 className="text-[1.65rem] md:text-[2.15rem] font-black text-[#0F3024] leading-tight">
              المشكلة ليست في النوم فقط — وجهك يقول إنك متعبة
            </h2>
            <p className="text-[#5A4A3E] text-sm md:text-[15px] mt-2">
              الهالات والخطوط لا تظهر في المرآة فقط، تظهر في الصور، المكالمات، والمناسبات.
            </p>
          </div>

          {/* 2-col: image + cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

            {/* ── IMAGE SLOT 1 ── صورة بورتريه (ضعي صورتك هنا) */}
            <div className="relative rounded-2xl overflow-hidden bg-[#F0E8DC] order-last md:order-first" style={{ minHeight: 520 }}>
              {/* Replace this img src with your real product/model photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80"
                alt="سيدة سعودية تعاني من الهالات السوداء"
                className="w-full h-full object-cover absolute inset-0"
                style={{ minHeight: 520 }}
              />
              {/* Overlay badge */}
              <div className="absolute bottom-0 inset-x-0 bg-[#0F3024]/85 px-5 py-4 z-10">
                <p className="text-white text-sm font-bold text-center">
                  عندما تبدين متعبة حتى وأنتِ بخير
                </p>
                <p className="text-[#C8A876] text-xs text-center mt-1">
                  هنا يبدأ سبب الشراء الحقيقي: الثقة أمام المرآة والكاميرا
                </p>
              </div>
              {/* Photo replace hint (hidden on production — remove if unwanted) */}
              <div className="absolute top-3 right-3 bg-black/50 text-white text-[9px] px-2 py-1 rounded-full z-20 pointer-events-none">
                📸 قابل للاستبدال
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
          INGREDIENTS — with product image
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>التركيبة الموزونة</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">مكونات قليلة، لكن كل واحد له وظيفة واضحة</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">لسنا نبيع قائمة طويلة. نبيع روتيناً يومياً مفهوماً: كولاجين للبنية، فيتامين C للدعم، وهيالورونيك للامتلاء.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* ── IMAGE SLOT 2 ── صورة المكوّنات/المنتج (ضعي صورتك هنا) */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E6D8C8] shadow-lg" style={{ minHeight: 480 }}>
              {/* Replace this img src with your real product flat-lay or ingredient photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1610415040795-f32cde0765b0?w=600&q=80"
                alt="مكوّنات قهوة كولاجين إشراقة"
                className="w-full h-full object-cover absolute inset-0"
                style={{ minHeight: 480 }}
              />
              {/* Ingredient badges overlaid */}
              <div className="absolute inset-0 bg-[#0F1A14]/30" />
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <span className="bg-[#3D2817]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  كولاجين بحري 5000 ملجم
                </span>
                <span className="bg-[#3D2817]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  فيتامين C نشط
                </span>
                <span className="bg-[#3D2817]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  هيالورونيك اسيد
                </span>
              </div>
              {/* Free-of section at bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E6D8C8] px-4 py-3 z-10">
                <p className="text-xs font-bold text-[#3D2817] mb-2">ما لن تجديه في علبتك:</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.freeOf.map(f => (
                    <span key={f} className="text-[10px] bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span>✓</span> بدون {f}
                    </span>
                  ))}
                </div>
              </div>
              {/* Photo replace hint */}
              <div className="absolute top-3 left-3 bg-black/50 text-white text-[9px] px-2 py-1 rounded-full z-20 pointer-events-none">
                📸 قابل للاستبدال
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
                          <h3 className="font-black text-[#3D2817] text-sm">{ing.name}</h3>
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
      <section className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>الثقة العلمية</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">لماذا تستحق أكثر من قهوة عادية؟</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">لأنها ليست نكهة فقط. هي روتين جمال يومي بجرعات واضحة، ثقة غذائية، وطريقة استخدام سهلة.</p>
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
                <p className="font-black text-[#3D2817] text-sm">{cert.l}</p>
                <p className="text-[10px] text-[#7A6A5E] mt-0.5">{cert.s}</p>
              </div>
            ))}
          </div>

          {/* Expert card — clinical brown gradient (matches homepage) */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-brand-brown to-brand-coffee text-white rounded-3xl p-7 md:p-9 text-center shadow-xl relative overflow-hidden mb-8">
            <Quote size={56} className="absolute top-4 right-4 text-brand-gold/20" strokeWidth={1.5} />
            <div className="relative">
              <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                نهج علمي · رأي خبير
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
                <p className="font-black text-[#3D2817] text-xl">{s.n}</p>
                <p className="text-[11px] text-[#7A6A5E] mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TIMELINE — with lifestyle image
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>النتائج أسبوعاً بأسبوع</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">كيف يبدأ الفرق خلال أول 30 يوم؟</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">ليس تغييراً مفاجئاً يخوّفك. هو تحسّن تدريجي تلاحظينه في المرآة والصور.</p>
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
                      <div className="w-10 h-10 rounded-full bg-[#3D2817] text-white font-black flex items-center justify-center flex-shrink-0 text-sm z-10">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-black text-[#3D2817] mb-1">{t.label}</p>
                        <p className="text-sm text-[#7A6A5E] leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#3D2817] text-white rounded-2xl p-4 mt-5 text-center">
                <p className="text-sm">
                  العلبة الأولى تعطيكِ النتيجة.{" "}
                  <span className="font-black text-[#C8A876]">العلبتان والثلاث يثبّتانها</span> — ووفّري حتى 248 ريال.
                </p>
              </div>
              <p className="text-center text-xs text-[#7A6A5E] mt-3 opacity-70">* النتائج تتفاوت من شخص لآخر. المنتج لدعم مظهر البشرة وليس علاجاً طبياً.</p>
            </div>

            {/* ── IMAGE SLOT 3 ── صورة نتيجة/قبل وبعد (ضعي صورتك هنا) */}
            <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 420 }}>
              {/* Replace this img src with a real before/after or glowing skin photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/before-after-results.png?v=2"
                alt="نتيجة قهوة كولاجين إشراقة بعد 30 يوم"
                className="w-full h-full object-cover absolute inset-0"
                style={{ minHeight: 420 }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#3D2817]/20" />
              {/* Result badges */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-[#3D2817] font-black text-sm mb-2">✨ بعد 30 يوم من روتين إشراقة</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="font-black text-[#A0640A] text-base">↓ 70%</p>
                      <p className="text-[9px] text-[#7A6A5E]">هالات أخف</p>
                    </div>
                    <div>
                      <p className="font-black text-[#A0640A] text-base">↑ 85%</p>
                      <p className="text-[9px] text-[#7A6A5E]">مرونة البشرة</p>
                    </div>
                    <div>
                      <p className="font-black text-[#A0640A] text-base">↓ 60%</p>
                      <p className="text-[9px] text-[#7A6A5E]">خطوط دقيقة</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Photo replace hint */}
              <div className="absolute top-3 right-3 bg-black/50 text-white text-[9px] px-2 py-1 rounded-full z-20 pointer-events-none">
                📸 قابل للاستبدال
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHEN TO START — Cultural use cases
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>للسعوديات تحديداً</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">متى تبدئين قهوة إشراقة؟</h2>
            <p className="text-[#5A4A3E] text-sm mt-1.5">المواقف اللي تستاهلين فيها تبدئين روتينك من اليوم</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { emoji: "👰‍♀️", title: "قبل الأعراس", text: "ابدئي قبل المناسبة بـ 60 يوم حتى تكون الإشراقة تدريجية وطبيعية في الصور" },
              { emoji: "👶", title: "بعد الولادة", text: "عندما يسمح لك طبيبك، ابدئي روتيناً بسيطاً يساعد ملامحك تبدو أهدأ" },
              { emoji: "🌙", title: "استعداداً للعيد", text: "30 يوم تكفي لتبدئي تلاحظين فرقاً في النعومة، الترطيب، ومظهر تحت العين" },
              { emoji: "💼", title: "للموظفات وأمهات الدوام", text: "للوجه المتعب من الشاشات والتكييف والسهر — كوب صباحي أسهل من 5 منتجات" },
            ].map((item) => (
              <div key={item.title} className="bg-[#FBF7F0] border border-[#E6D8C8] rounded-2xl p-4 md:p-5 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">{item.emoji}</div>
                <p className="font-black text-[#3D2817] text-sm md:text-base mb-1.5">{item.title}</p>
                <p className="text-[#7A6A5E] text-[12px] md:text-[13px] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>تجارب حقيقية</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">ما تقوله {c.numbers[1].n} سعودية</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">مشتريات مؤكدة من مدن مختلفة — من الشابات للأمهات، من العرائس لأمهات الأطفال.</p>
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
                    <p className="font-black text-[#3D2817] text-sm">{t.name}</p>
                    <p className="text-[11px] text-[#7A6A5E]">{t.age} · {t.city}</p>
                  </div>
                  <span className="mr-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ مؤكدة</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPARISON
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>المقارنة</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">قارني — وقرّري بنفسك</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">كل بديل جربتيه من قبل، وليه فشل. وكيف إشراقة تحلّه بشكل مختلف.</p>
          </div>

          <div className="space-y-3">
            {c.comparisons.map(comp => (
              <div key={comp.alt} className="bg-white rounded-2xl border border-[#E6D8C8] p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-black text-[#3D2817]">{comp.alt}</p>
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
            <div className="bg-[#3D2817] rounded-2xl p-5 border-2 border-[#C8A876]">
              <div className="flex items-center justify-between mb-4">
                <p className="font-black text-white text-base">قهوة كولاجين إشراقة للجمال ☕</p>
                <span className="text-xs font-black bg-[#C8A876] text-[#3D2817] px-3 py-1 rounded-full">من 199 ريال</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["تشتغل عبر الدم على كل الطبقات","بدون إبر أو مخاطر","دفع عند الاستلام","حلال 100٪ · SFDA","مكونات بجرعات موزونة","ضمان 14 يوم"].map(pro => (
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
        <div className="max-w-[700px] mx-auto text-center">
          {/* Apothecary shield */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full bg-white border-4 border-brand-apothecary shadow-md" />
            <ShieldCheck size={36} className="text-brand-apothecary relative z-10" />
          </div>

          <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>الضمان الكامل</p>
          <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817] mb-3">14 يوم — أو فلوسكِ ترجع. بدون أسئلة.</h2>
          <p className="text-[#5A4A3E] mb-6 md:mb-8 leading-relaxed text-sm max-w-lg mx-auto">
            جرّبي العلبة الأولى كاملة. إذا ما حسّيتي بفرق يستاهل، تواصلي معنا وفلوسكِ ترجع — بدون نماذج، بدون أسئلة، بدون مكسلات. وأصلاً ما تدفعين إلا عند الاستلام.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: <Phone size={20} />, t: "تواصلي معنا", s: "في أي يوم خلال الـ 14 يوم" },
              { icon: <Package size={20} />, t: "رجّعي العلبة", s: "حتى لو فاضية — ما يهمّنا" },
              { icon: <Wallet size={20} />, t: "فلوسكِ ترجع كاملة", s: "خلال 3–5 أيام عمل" },
            ].map(s => (
              <div key={s.t} className="bg-white rounded-2xl border border-brand-deepSage p-4 text-center shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-brand-sage border border-brand-deepSage text-brand-apothecary flex items-center justify-center mx-auto mb-2">
                  {s.icon}
                </div>
                <p className="font-black text-[#3D2817] text-sm">{s.t}</p>
                <p className="text-[11px] text-[#5A4A3E] mt-1">{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW TO USE
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 bg-[#FBF7F0]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>طريقة الاستخدام</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">أبسط روتين عمرك جربتيه</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">دقيقتان باليوم · قهوة حقيقية اللذة · بدون التزام معقّد.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 text-center">
            {c.usageStats.map(s => (
              <div key={s.l} className="bg-white rounded-2xl border border-[#E6D8C8] p-3">
                <p className="font-black text-[#3D2817] text-lg">{s.n}</p>
                <p className="text-[10px] text-[#7A6A5E] mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Steps with visual */}
          <div className="space-y-3">
            {c.usageSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-xl border border-[#E6D8C8] p-4">
                <div className="w-10 h-10 rounded-full bg-[#3D2817] text-white font-black flex items-center justify-center flex-shrink-0 text-sm">
                  {i + 1}
                </div>
                <p className="text-[#3D2817] text-sm font-medium">{step}</p>
                {i === 0 && <span className="mr-auto text-2xl">☕</span>}
                {i === 1 && <span className="mr-auto text-2xl">💧</span>}
                {i === 2 && <span className="mr-auto text-2xl">🌅</span>}
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
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>التوصيل</p>
            <h2 className="text-[1.5rem] md:text-3xl font-black text-[#3D2817]">كيف يوصلك طلبك — بكل بساطة</h2>
            <p className="text-[#5A4A3E] text-sm mt-1">بدون دفع أونلاين، بدون التزام، بدون مفاجآت.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { n: "1", icon: <PackageCheck size={22} />, t: "اطلبي الآن", d: "اختاري العرض، اكتبي اسمكِ ورقم جوالكِ. بدون دفع أونلاين أو بطاقة بنكية." },
              { n: "2", icon: <Phone size={22} />, t: "نتصل للتأكيد", d: "فريقنا السعودي يتواصل معكِ خلال ساعات لتأكيد الطلب. عربي 100٪." },
              { n: "3", icon: <Wallet size={22} />, t: "استلمي وادفعي", d: "1–3 أيام للمدن الرئيسية. تدفعين كاش أو شبكة وقت وصول الطلب." },
            ].map(s => (
              <div key={s.n} className="bg-brand-sage/40 rounded-2xl border border-brand-deepSage/40 p-4 sm:p-5 flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                <div className="w-11 h-11 rounded-2xl bg-white border border-brand-deepSage text-brand-apothecary flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-2">
                  {s.icon}
                </div>
                <div>
                  <div className="w-7 h-7 rounded-full bg-brand-brown text-brand-gold font-black flex items-center justify-center mx-auto mb-2 text-[12px] font-inter">{s.n}</div>
                  <p className="font-black text-[#3D2817] text-sm mb-0.5 sm:mb-1">{s.t}</p>
                  <p className="text-[11px] text-[#5A4A3E] leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cities */}
          <div className="bg-[#FAFAF7] rounded-2xl border border-[#E6D8C8] p-5">
            <p className="font-black text-[#3D2817] text-sm mb-3 text-center">نوصّل لكل مدن المملكة</p>
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
            <p className="text-[11px] font-bold text-brand-apothecary uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>الأسئلة الشائعة</p>
            <h2 className="text-[1.5rem] md:text-2xl font-black text-[#3D2817]">قبل ما تطلبين — كل اللي تحتاجين</h2>
          </div>
          <div className="space-y-2">
            {c.faq.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[#E0D0BC] group shadow-sm">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-[#3D2817] text-sm select-none list-none active:bg-[#FBF7F0] rounded-xl">
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
          <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            قراركِ اليوم
          </p>
          <h2 className="text-[1.6rem] md:text-3xl font-black text-white mb-3 leading-tight">
            كل يوم تأجّلين فيه — تجاعيدكِ تكبر معكِ
          </h2>
          <p className="text-brand-gold text-[14.5px] italic mb-2">«الجمال يبدأ بجرعة دقيقة.»</p>
          <p className="text-brand-cream/80 mb-7 text-[13.5px] leading-relaxed">
            ابدئي اليوم — وبعد 30 يوم رح تشكرين نفسكِ
          </p>
          <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl border border-brand-gold/30">
            <BundlePicker product={product} />
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
