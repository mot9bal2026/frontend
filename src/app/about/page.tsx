import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | إشراقة للجمال",
  description: "إشراقة للجمال — قهوة كولاجين سعودية فاخرة صُممت للمرأة السعودية",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-16 px-4">
      <div className="max-w-content mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-brand-brown mb-6">من نحن</h1>

        <div className="bg-white rounded-2xl border border-brand-border p-8 mb-6">
          <h2 className="text-xl font-bold text-brand-brown mb-4">قصة إشراقة</h2>
          <p className="text-brand-muted leading-relaxed mb-4">
            إشراقة للجمال هي علامة سعودية لقهوة الكولاجين، صُنعت للنساء اللواتي يرغبن في دعم مظهر وجه أكثر شباباً وإشراقاً من خلال طقس يومي بسيط، ومكونات واضحة، وثقة تناسب سوق السعودية.
          </p>
          <p className="text-brand-muted leading-relaxed">
            نؤمن بأن الجمال يبدأ من الداخل، وأن كل امرأة تستحق روتيناً بسيطاً يمنحها الثقة بنفسها يومياً. لذلك صممنا منتجاتنا بمكونات واضحة، بدون خلطات مخفية، وبسعر عادل مع الدفع عند الاستلام.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-border p-8 mb-6">
          <h2 className="text-xl font-bold text-brand-brown mb-4">قيمنا</h2>
          <div className="space-y-3">
            {[
              { title: "الشفافية", desc: "مكونات واضحة، بدون خلطات مخفية" },
              { title: "الثقة", desc: "الدفع عند الاستلام فقط، بدون مخاطرة" },
              { title: "السعودية أولاً", desc: "صُممت خصيصاً للمرأة السعودية" },
              { title: "البساطة", desc: "روتين يومي بسيط تلتزمين فيه" },
            ].map((v) => (
              <div key={v.title} className="flex items-start gap-3">
                <span className="text-brand-gold font-bold">✦</span>
                <div>
                  <p className="font-medium text-brand-brown">{v.title}</p>
                  <p className="text-brand-muted text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-brown text-brand-cream rounded-2xl p-8 text-center">
          <p className="font-bold text-xl mb-2">إشراقة للجمال</p>
          <p className="text-brand-gold">ISHRAQA Beauty · المملكة العربية السعودية</p>
        </div>
      </div>
    </div>
  );
}
