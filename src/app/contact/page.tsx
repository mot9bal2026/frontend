import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصلي معنا | إشراقة للجمال",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-16 px-4">
      <div className="max-w-content mx-auto max-w-xl">
        <h1 className="text-4xl font-bold text-brand-brown mb-4">تواصلي معنا</h1>
        <p className="text-brand-muted mb-8">فريقنا متاح للمساعدة من الأحد إلى الخميس، 9 صباحاً - 6 مساءً.</p>

        <div className="space-y-4">
          <a
            href="mailto:info@ishraqa.shop"
            className="flex items-center gap-4 bg-white rounded-xl border border-brand-border p-5 hover:border-brand-gold transition-colors group"
          >
            <Mail size={22} className="text-brand-gold" />
            <div>
              <p className="font-medium text-brand-brown">البريد الإلكتروني</p>
              <p className="text-brand-muted text-sm">info@ishraqa.shop</p>
            </div>
          </a>

          <a
            href="https://wa.me/966XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-xl border border-brand-border p-5 hover:border-brand-gold transition-colors"
          >
            <MessageCircle size={22} className="text-brand-gold" />
            <div>
              <p className="font-medium text-brand-brown">واتساب</p>
              <p className="text-brand-muted text-sm">تواصلي معنا مباشرة</p>
            </div>
          </a>

          <div className="flex items-center gap-4 bg-white rounded-xl border border-brand-border p-5">
            <Phone size={22} className="text-brand-gold" />
            <div>
              <p className="font-medium text-brand-brown">خدمة العملاء</p>
              <p className="text-brand-muted text-sm">الأحد - الخميس · 9ص - 6م</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-brown text-brand-cream rounded-2xl p-6 text-center mt-8">
          <p className="font-bold mb-1">هل لديكِ سؤال عن طلبك؟</p>
          <p className="text-brand-gold text-sm">أرسلي رقم طلبك وسنساعدكِ فوراً</p>
        </div>
      </div>
    </div>
  );
}
