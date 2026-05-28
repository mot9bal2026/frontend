import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصلي معنا | إشراقة — قهوة الجمال السريرية",
  description:
    "فريق إشراقة جاهز لمساعدتكِ. تواصلي معنا عبر البريد الإلكتروني أو واتساب. خدمة عملاء سعودية من الأحد إلى الخميس.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-cream via-white to-brand-cream/30 py-16 px-4">
      <div className="max-w-content mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center gap-2 bg-brand-apothecary text-white text-[11px] font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
            <MessageCircle size={12} />
            خدمة عملاء سعودية
          </div>
          <h1 className="text-[2rem] md:text-[2.4rem] font-black text-[#1A0F0A] mb-3 leading-[1.2]">
            خبرتنا في خدمتكِ
          </h1>
          <p className="text-[#5A4A3E] text-[14.5px] leading-relaxed max-w-md mx-auto">
            عندكِ سؤال؟ راسلينا، ونرد عليكِ خلال دقائق. فريقنا سعودي ومتاح طوال
            أيام العمل.
          </p>
        </div>

        {/* Contact cards */}
        <div className="space-y-3.5">
          <a
            href="https://wa.me/966550000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-2xl border border-brand-border p-5 hover:border-brand-apothecary transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <MessageCircle size={22} />
            </div>
            <div className="flex-1">
              <p className="font-black text-brand-brown text-[14.5px]">واتساب</p>
              <p className="text-[#5A4A3E] text-[12.5px] mt-0.5">
                الأسرع — رد خلال دقائق
              </p>
            </div>
            <span className="text-brand-apothecary text-xl">←</span>
          </a>

          <a
            href="mailto:info@ishraqa.shop"
            className="flex items-center gap-4 bg-white rounded-2xl border border-brand-border p-5 hover:border-brand-apothecary transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-sage text-brand-apothecary border border-brand-deepSage flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail size={20} />
            </div>
            <div className="flex-1">
              <p className="font-black text-brand-brown text-[14.5px]">
                البريد الإلكتروني
              </p>
              <p className="text-[#5A4A3E] text-[12.5px] mt-0.5 font-inter">
                info@ishraqa.shop
              </p>
            </div>
            <span className="text-brand-apothecary text-xl">←</span>
          </a>

          <div className="flex items-center gap-4 bg-white rounded-2xl border border-brand-border p-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-brown border border-brand-border flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div className="flex-1">
              <p className="font-black text-brand-brown text-[14.5px]">
                ساعات العمل
              </p>
              <p className="text-[#5A4A3E] text-[12.5px] mt-0.5">
                الأحد – الخميس · 9 صباحاً – 6 مساءً
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-2xl border border-brand-border p-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-brown border border-brand-border flex items-center justify-center">
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <p className="font-black text-brand-brown text-[14.5px]">
                خدمة الطلبات
              </p>
              <p className="text-[#5A4A3E] text-[12.5px] mt-0.5">
                مكالمة التأكيد خلال 24 ساعة من رقم سعودي محلي
              </p>
            </div>
          </div>
        </div>

        {/* Trust card */}
        <div className="mt-8 bg-gradient-to-br from-brand-brown to-brand-coffee text-white rounded-3xl p-6 md:p-7 text-center shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-brand-gold flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={26} />
          </div>
          <p className="font-black text-[1.05rem] mb-1">
            سؤال عن طلبكِ الحالي؟
          </p>
          <p className="text-brand-cream/85 text-[13.5px] leading-relaxed">
            راسلينا برقم الطلب على واتساب وسنساعدكِ فوراً — بدون انتظار.
          </p>
        </div>
      </div>
    </div>
  );
}
