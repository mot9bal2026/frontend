import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PolicySlug = "privacy" | "terms" | "refund" | "shipping";

const policies: Record<PolicySlug, { title: string; content: string }> = {
  privacy: {
    title: "سياسة الخصوصية",
    content: `
نحن في زيت العوافي نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.

**البيانات التي نجمعها:**
- الاسم ورقم الجوال عند الطلب
- عنوان التوصيل (يُجمع خلال اتصال التأكيد)
- بيانات التصفح (مجهولة الهوية، للتحسين فقط)

**كيف نستخدم البيانات:**
- تأكيد الطلب والتوصيل
- التواصل بخصوص طلبك فقط
- لا نشارك بياناتك مع أطراف ثالثة لأغراض تجارية

**حقوقكِ:**
يحق لكِ في أي وقت طلب حذف بياناتكِ من أنظمتنا.

للتواصل: info@ishraqa.shop
    `,
  },
  terms: {
    title: "الشروط والأحكام",
    content: `
**الاستخدام:**
- الموقع مخصص للطلب من المملكة العربية السعودية فقط
- الدفع عند الاستلام حصراً
- الأسعار بالريال السعودي وتشمل الضريبة

**الطلبات:**
- تُعالج الطلبات بعد تأكيدها هاتفياً
- نحتفظ بحق رفض أي طلب يبدو مشبوهاً
- في حال عدم الرد لتأكيد الطلب قد يُلغى

**التعديلات:**
نحتفظ بحق تعديل هذه الشروط في أي وقت مع إشعار مسبق.
    `,
  },
  refund: {
    title: "سياسة الإرجاع",
    content: `
**حقكِ في الإرجاع:**
نضمن رضاكِ التام. يمكنكِ إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام.

**شروط الإرجاع:**
- المنتج غير مستخدم وفي حالته الأصلية
- التواصل معنا أولاً على info@ishraqa.shop

**في حال وجود مشكلة:**
إذا وصل المنتج تالفاً أو مختلفاً عن الوصف، سنستبدله فوراً أو نرد المبلغ كاملاً.

**ملاحظة:**
المنتجات المستخدمة لا يمكن إرجاعها لاعتبارات صحية.
    `,
  },
  shipping: {
    title: "سياسة الشحن",
    content: `
**مناطق التوصيل:**
نوصّل لجميع مناطق المملكة العربية السعودية.

**أوقات التوصيل:**
- الرياض، جدة، الدمام: 1-3 أيام عمل
- المدن الأخرى: 3-5 أيام عمل
- المناطق النائية: 5-7 أيام عمل

**رسوم الشحن:**
الشحن مجاني على جميع الطلبات.

**التتبع:**
ستتلقين رقم تتبع الشحنة عبر رسالة نصية بعد الشحن.

**الدفع:**
الدفع عند الاستلام فقط. تأكدي من توفر المبلغ المحدد في طلبك.
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug as PolicySlug];
  return {
    title: policy ? `${policy.title} | زيت العوافي` : "السياسات | زيت العوافي",
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = policies[slug as PolicySlug];

  if (!policy) notFound();

  return (
    <div className="min-h-screen bg-brand-cream py-16 px-4">
      <div className="max-w-content mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-brand-brown mb-8">{policy.title}</h1>
        <div className="bg-white rounded-2xl border border-brand-border p-8 prose prose-sm max-w-none text-brand-muted leading-relaxed">
          {policy.content.split("\n\n").map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <h3 key={i} className="font-bold text-brand-brown text-base mt-4 mb-2">
                  {para.replace(/\*\*/g, "")}
                </h3>
              );
            }
            if (para.includes("**")) {
              return (
                <p key={i} className="mb-3">
                  {para.split("**").map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-brand-brown">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            }
            if (para.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc list-inside mb-3">
                  {para.split("\n").map((line, j) => (
                    <li key={j} className="mb-1">
                      {line.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mb-3">
                {para.trim()}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
