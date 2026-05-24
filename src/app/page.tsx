import Link from "next/link";
import { Star, Shield, CheckCircle } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

const testimonials = [
  {
    text: "كنت مترددة لأن السعر مو رخيص، بس قلت أجرب عشان الدفع عند الاستلام. بعد أسبوعين حسيت وجهي أهدأ والهالات أخف. أكثر شيء عجبني إن الطعم قهوة فعلاً مو مكمل.",
    name: "نورة",
    age: "32 سنة",
    city: "الرياض",
    badge: "شراء مؤكد",
    stars: 5,
  },
  {
    text: "كنت أدور على شيء يساعد على التجاعيد اللي صارت تظهر حول عيني. استخدمته شهر كامل والفرق واضح في الصور. البشرة أنضر وزوجي هو اللي لاحظ قبلي.",
    name: "سارة",
    age: "38 سنة",
    city: "جدة",
    badge: "شراء مؤكد",
    stars: 5,
  },
  {
    text: "أنا في الـ 41 وكنت محتارة بين البوتوكس والكريمات الغالية. جربت العلبة الأولى وبعد ثلاثة أسابيع أمي قالت «وجهك صار ولد!». المكياج صار يثبت أحسن والبشرة أكثر مرونة.",
    name: "فاطمة",
    age: "41 سنة",
    city: "الدمام",
    badge: "شراء مؤكد",
    stars: 5,
  },
];

const faqs = [
  {
    q: "متى تظهر النتائج؟",
    a: "معظم العميلات تلاحظن نعومة وإشراقة بعد أسبوع. الهالات والتجاعيد تتحسن بشكل ملحوظ بنهاية العلبة الأولى (30 يوم).",
  },
  {
    q: "كيف أدفع؟",
    a: "الدفع عند الاستلام فقط. ما في حاجة لبطاقة بنكية أو دفع إلكتروني. ستصلك المبلغ المطلوب مع المندوب.",
  },
  {
    q: "ما هي مكونات القهوة؟",
    a: "كولاجين بحري متحلّل، فيتامين C، حمض الهيالورونيك، وقهوة عالية الجودة. مكونات واضحة بجرعات مدروسة بدون خلطات مخفية.",
  },
  {
    q: "هل هي حلال؟",
    a: "نعم، جميع المكونات حلال 100٪ ومتوافقة مع المعايير الخليجية. لا يحتوي على جيلاتين حيواني.",
  },
  {
    q: "ما هو وقت التوصيل؟",
    a: "1–3 أيام للمدن الرئيسية (الرياض، جدة، الدمام). 3–5 أيام للمناطق الأخرى.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-cream via-white to-amber-50 py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-brand-brown text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <span>✓</span> مرخّصة من هيئة الغذاء والدواء · SFDA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-brown mb-4 leading-tight">
                نمتِ كويس، بس وجهك للحين يقول إنك تعبانة؟
              </h1>
              <p className="text-brand-muted text-lg mb-6 leading-relaxed">
                قهوتك الصباحية… بس هذه المرة لجمالك. كولاجين بحري + فيتامين C في كيس قهوة لذيذ — يشتغل من الداخل بدون إبر ولا بوتوكس.
              </p>

              {/* Social proof mini */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <span className="text-sm text-brand-muted font-inter">4.9 · 1400+ شراء مؤكد</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {["الدفع عند الاستلام", "توصيل السعودية", "حلال 100٪", "ضمان 14 يوم"].map((b) => (
                  <span key={b} className="text-sm border border-brand-gold text-brand-brown px-3 py-1 rounded-full bg-amber-50 font-medium">
                    ✓ {b}
                  </span>
                ))}
              </div>

              <Link
                href="/collection"
                className="inline-block bg-brand-brown text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-brand-coffee transition-colors shadow-lg active:scale-95"
              >
                ابدئي طقس إشراقتك
              </Link>
              <p className="text-xs text-brand-muted mt-3">بدون دفع أونلاين · ادفعي عند الاستلام فقط</p>
            </div>

            {/* Hero visual */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-brand-cream to-amber-100 flex items-center justify-center shadow-2xl border border-brand-border">
                  <div className="text-center">
                    <div className="text-9xl mb-2">☕</div>
                    <p className="text-brand-muted text-sm font-medium">إشراقة للجمال</p>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 bg-white border border-brand-border rounded-xl shadow-md px-3 py-2 text-xs font-bold text-brand-brown">
                  4.9 ★ تقييم
                </div>
                <div className="absolute -bottom-3 -left-3 bg-brand-brown text-white rounded-xl shadow-md px-3 py-2 text-xs font-bold">
                  الدفع عند الاستلام ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────────── */}
      <section className="bg-brand-brown text-brand-cream py-3 px-4">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap text-xs font-medium">
            {[
              "✓ الدفع عند الاستلام",
              "✓ شحن مجاني",
              "✓ توصيل 1–3 أيام",
              "✓ حلال 100٪",
              "✓ ضمان 14 يوم",
              "✓ SFDA",
            ].map((t) => (
              <span key={t} className="text-brand-gold">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ──────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-brown mb-3">مجموعة إشراقة للجمال</h2>
            <p className="text-brand-muted max-w-md mx-auto">
              منتجان مختلفان، هدف واحد: جمالك من الداخل. اختاري ما يحل مشكلتك.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY COFFEE ────────────────────────────── */}
      <section className="py-16 px-4 bg-brand-cream">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-brown mb-3">لماذا القهوة؟</h2>
            <p className="text-brand-muted max-w-lg mx-auto">
              أسهل من الكبسولات، أذكى من الكريمات، وأبسط من أي روتين معقد.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: "☕",
                title: "بدون تغيير روتينك",
                desc: "قهوتك الصباحية موجودة. بس الآن فيها الكولاجين اللي بشرتك تحتاجه.",
              },
              {
                icon: "🔬",
                title: "يشتغل من الداخل",
                desc: "الكولاجين يُمتص عبر الدم ويصل لكل طبقات البشرة — مو ترطيب سطحي.",
              },
              {
                icon: "✅",
                title: "أسهل من الكبسولات",
                desc: "طقس يومي لذيذ تلتزمين فيه. أحسن من الكبسولات والعلكات والحبوب.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-brand-border p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-brand-brown mb-2">{item.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ───────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-brown mb-3">تعرفينها؟</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { emoji: "🪞", text: "وجهي يقول إني تعبانة حتى وأنا مرتاحة." },
              { emoji: "📸", text: "الهالات صارت تفضحني في الصور." },
              { emoji: "💄", text: "المكياج يغطّي بس ما يحلّ المشكلة." },
              { emoji: "🎉", text: "أبغى أدخل المناسبات بوجه مرتاح وواثق." },
            ].map((pain) => (
              <div
                key={pain.text}
                className="bg-brand-cream rounded-2xl p-5 border border-brand-border text-center hover:border-brand-gold transition-colors"
              >
                <div className="text-3xl mb-3">{pain.emoji}</div>
                <p className="text-brand-muted text-sm leading-relaxed">{pain.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/collection"
              className="inline-block bg-brand-brown text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-coffee transition-colors shadow-md active:scale-95"
            >
              اكتشفي الحل
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────── */}
      <section className="py-16 px-4 bg-brand-cream">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-brown mb-3">ما تقوله 1400+ سعودية</h2>
            <p className="text-brand-muted">تقييمات حقيقية من مشتريات مؤكدة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-brand-border flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-brand-muted text-sm leading-relaxed mb-4 flex-1">"{t.text}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                  <div>
                    <p className="font-bold text-brand-brown text-sm">{t.name}</p>
                    <p className="text-xs text-brand-muted">{t.age} · {t.city}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    {t.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERT QUOTE ──────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-2xl text-center">
          <div className="text-5xl mb-4">👩‍⚕️</div>
          <blockquote className="text-brand-brown text-lg font-medium italic leading-relaxed mb-4">
            "الكولاجين البحري المتحلّل مع فيتامين C هو نهج مدعوم علمياً لدعم مظهر البشرة. الجرعات الصحيحة مع الاستمرارية اليومية تعطي نتائج ملموسة — خصوصاً في المناخ الخليجي الجاف."
          </blockquote>
          <p className="text-brand-muted text-sm">
            د. سارة العتيبي · أخصائية تغذية سريرية · الرياض
          </p>
        </div>
      </section>

      {/* ── INGREDIENTS ───────────────────────────── */}
      <section className="py-16 px-4 bg-brand-cream">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-brown mb-3">المكونات الرئيسية</h2>
            <p className="text-brand-muted">مكونات مختارة بجرعات مدروسة، بدون خلطات مخفية</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: "كولاجين بحري", dose: "5000 ملجم", desc: "لمرونة البشرة ومظهر التجاعيد" },
              { name: "فيتامين C", dose: "200 ملجم", desc: "لإشراقة البشرة وتقليل الهالات" },
              { name: "هيالورونيك أسيد", dose: "100 ملجم", desc: "لترطيب عميق ومظهر ممتلئ" },
              { name: "قهوة عربية", dose: "طبيعي", desc: "طقس يومي بسيط تلتزمين فيه" },
            ].map((ing) => (
              <div
                key={ing.name}
                className="bg-white rounded-2xl p-5 text-center border border-brand-border hover:border-brand-gold transition-colors"
              >
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-bold text-brand-brown mb-0.5 text-sm">{ing.name}</h3>
                <p className="text-xs font-bold text-brand-gold font-inter mb-1">{ing.dose}</p>
                <p className="text-xs text-brand-muted">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COD PROCESS ───────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-brown mb-3">كيف يوصل طلبك؟</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-3xl mx-auto">
            {[
              { step: "1", label: "اختاري عرضك", icon: "🛍️" },
              { step: "2", label: "نتصل للتأكيد", icon: "📞" },
              { step: "3", label: "يوصل 1–3 أيام", icon: "🚚" },
              { step: "4", label: "ادفعي عند الاستلام", icon: "💰" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="w-8 h-8 rounded-full bg-brand-brown text-white text-sm font-bold flex items-center justify-center mb-2 font-arabic">
                  {s.step}
                </div>
                <p className="text-brand-muted text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE STRIP ───────────────────────── */}
      <section className="py-10 px-4 bg-brand-cream border-y border-brand-border">
        <div className="max-w-content mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <Shield size={48} className="text-brand-gold flex-shrink-0" />
            <div>
              <h3 className="font-bold text-brand-brown text-xl mb-1">ضمان رضاكِ 14 يوماً</h3>
              <p className="text-brand-muted leading-relaxed">
                جربي العلبة الأولى. إذا ما حسّيتي بفرق، اتصلي علينا وفلوسك ترجع — بدون نماذج، بدون أسئلة. ما في مخاطرة لأن الدفع عند الاستلام أصلاً.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/collection"
                className="inline-block bg-brand-brown text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-coffee transition-colors text-sm whitespace-nowrap"
              >
                جربي الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-brand-brown mb-8 text-center">الأسئلة الشائعة</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-brand-cream rounded-xl border border-brand-border group"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-brand-brown select-none">
                  {faq.q}
                  <span className="text-brand-gold text-xl group-open:rotate-45 transition-transform flex-shrink-0 mr-2">+</span>
                </summary>
                <div className="px-4 pb-4 text-brand-muted text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────── */}
      <section className="py-16 px-4 bg-brand-brown text-brand-cream">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">ابدئي طقس إشراقتك اليوم</h2>
          <p className="text-brand-gold mb-4 max-w-md mx-auto">
            الدفع عند الاستلام · توصيل السعودية · ضمان 14 يوم · بدون مخاطرة
          </p>
          <div className="flex items-center justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="text-brand-gold fill-brand-gold" />
            ))}
            <span className="text-brand-gold text-sm mr-2 font-inter">1400+ شراء مؤكد</span>
          </div>
          <Link
            href="/collection"
            className="inline-block bg-brand-gold text-brand-brown font-bold px-10 py-4 rounded-xl text-lg hover:bg-amber-300 transition-colors shadow-lg active:scale-95"
          >
            اختاري عرضك الآن
          </Link>
        </div>
      </section>
    </div>
  );
}
