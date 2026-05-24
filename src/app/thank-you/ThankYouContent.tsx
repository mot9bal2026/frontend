"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, Phone, Truck, Clock, Instagram } from "lucide-react";
import Link from "next/link";

export function ThankYouContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") ?? "ISH-2026-000001";
  const total = params.get("total") ?? "0";

  return (
    <div className="min-h-screen bg-brand-cream px-4 py-16">
      <div className="max-w-md mx-auto">
        {/* Success */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-brand-brown mb-2">تم استلام طلبك! 🎉</h1>
          <p className="text-brand-muted">شكراً لكِ. طلبك قيد المعالجة.</p>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-brand-muted text-sm">رقم الطلب</span>
            <span className="font-bold text-brand-brown font-inter text-lg">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-brand-muted text-sm">المبلغ الكلي</span>
            <span className="font-bold text-brand-brown font-inter text-xl">{total} ريال</span>
          </div>
          <div className="border-t border-brand-border pt-4">
            <p className="text-center text-sm font-bold text-green-700 bg-green-50 p-3 rounded-xl">
              💳 ادفعي {total} ريال عند الاستلام فقط
            </p>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 mb-6">
          <h2 className="font-bold text-brand-brown mb-4">ماذا سيحدث بعد الآن؟</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-brand-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-brand-brown text-sm">سنتصل بكِ لتأكيد الطلب</p>
                <p className="text-brand-muted text-xs">يرجى الرد على الرقم السعودي</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck size={20} className="text-brand-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-brand-brown text-sm">التوصيل 1-3 أيام</p>
                <p className="text-brand-muted text-xs">للمدن الرئيسية · 3-5 أيام للمناطق الأخرى</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-brand-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-brand-brown text-sm">ادفعي {total} ريال عند الاستلام</p>
                <p className="text-brand-muted text-xs">لا دفع مسبق · بدون مفاجآت</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social CTA */}
        <div className="bg-brand-brown text-brand-cream rounded-2xl p-6 text-center mb-6">
          <p className="font-bold mb-2">تابعينا على السوشيال</p>
          <p className="text-brand-gold text-sm mb-4">لآخر العروض والنصائح من إشراقة للجمال</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://instagram.com/ishraqa.beauty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-gold text-brand-brown font-bold px-4 py-2 rounded-lg text-sm hover:bg-brand-cream transition-colors"
            >
              <Instagram size={16} />
              إنستغرام
            </a>
            <a
              href="https://snapchat.com/add/ishraqa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-yellow-400 text-brand-brown font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 transition-colors"
            >
              سناب شات
            </a>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-brand-muted text-sm hover:text-brand-brown transition-colors"
          >
            ← الرجوع للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
