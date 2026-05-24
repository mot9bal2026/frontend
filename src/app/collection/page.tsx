import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مجموعة إشراقة للجمال | قهوة الكولاجين",
  description: "منتجان من قهوة الكولاجين مصممان للمرأة السعودية. اختاري ما يناسب مشكلتك.",
};

const faqs = [
  {
    q: "هل الدفع عند الاستلام؟",
    a: "نعم، لراحتك وثقتك بنا، الدفع عند الاستلام متاح لجميع مناطق السعودية. لا حاجة لبطاقة بنكية أو حساب إلكتروني.",
  },
  {
    q: "هل المنتجات مرخّصة من الجهات السعودية؟",
    a: "جميع منتجات إشراقة مصممة لتتوافق مع المعايير السعودية ومتطلبات SFDA. المكونات حلال 100٪ بدون جيلاتين حيواني.",
  },
  {
    q: "كيف أختار المنتج الأنسب لي؟",
    a: "إذا كانت مشكلتك الهالات والتجاعيد اخترت المنتج الأول. إذا كانت مشكلتك الشيخوخة المبكرة والترهل اخترت الثاني. يمكنك أيضاً البدء بعلبة واحدة وإضافة الثاني لاحقاً بسعر خاص بعد النموذج.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "1–3 أيام عمل لمدن الرياض وجدة والدمام ومكة والمدينة المنورة والخبر. 3–5 أيام لبقية المناطق في المملكة.",
  },
  {
    q: "ما هي سياسة الإرجاع؟",
    a: "ضمان رضاكِ 14 يوماً من الاستلام. إذا لم تكوني راضية، تواصلي معنا وسنجد حلاً يرضيكِ بدون تعقيد.",
  },
];

export default function CollectionPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-cream py-12 px-4 border-b border-brand-border">
        <div className="max-w-content mx-auto text-center">
          <div className="inline-block bg-brand-brown text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            مرخّصة من هيئة الغذاء والدواء
          </div>
          <h1 className="text-4xl font-bold text-brand-brown mb-3">مجموعة إشراقة للجمال</h1>
          <p className="text-brand-muted max-w-lg mx-auto leading-relaxed">
            قهوة كولاجين سعودية فاخرة مصممة خصيصاً للمرأة السعودية.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-md mx-auto">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="py-12 px-4 bg-brand-cream">
        <div className="max-w-content mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-brown mb-8 text-center">لماذا قهوة الكولاجين؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "☕", title: "روتين بسيط تلتزمين فيه", desc: "بدلاً من كبسولات وعلكات ومكملات — قهوتك الصباحية تصير روتين جمالك." },
              { icon: "🔬", title: "يشتغل من الداخل", desc: "الكولاجين يُمتص عبر الدم ويصل لكل طبقات البشرة — مو مجرد ترطيب سطحي." },
              { icon: "✓", title: "مكونات واضحة بجرعات", desc: "تعرفين وش تشربين. جرعات سريرية واضحة — مو خلطة عطّار مجهولة." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-brand-border p-5 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-brand-brown mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COD Process */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-content mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-brand-brown mb-8">بدون دفع أونلاين — بكل بساطة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "1", icon: "🛍️", label: "اختاري عرضك" },
              { step: "2", icon: "📞", label: "نتصل للتأكيد" },
              { step: "3", icon: "🚚", label: "يوصل 1–3 أيام" },
              { step: "4", icon: "💰", label: "ادفعي عند الاستلام" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="w-7 h-7 rounded-full bg-brand-brown text-white text-sm font-bold flex items-center justify-center mb-2 font-arabic">
                  {s.step}
                </div>
                <p className="text-brand-muted text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-brand-cream">
        <div className="max-w-content mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-brand-brown mb-8 text-center">أسئلة شائعة</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl border border-brand-border group">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-brand-brown select-none">
                  {faq.q}
                  <span className="text-brand-gold text-xl group-open:rotate-45 transition-transform flex-shrink-0 mr-2">+</span>
                </summary>
                <div className="px-4 pb-4 text-brand-muted text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
