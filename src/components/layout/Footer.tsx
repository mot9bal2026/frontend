import Link from "next/link";
import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream">
      <div className="max-w-content mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
                  <span className="text-brand-brown font-bold text-base font-inter">N</span>
                </div>
                <div>
                  <p className="font-bold text-brand-cream">إشراقة للجمال</p>
                  <p className="text-xs text-brand-gold font-inter">ISHRAQA Beauty</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-brand-gold leading-relaxed">
              قهوة كولاجين سعودية فاخرة للمرأة التي تريد مظهراً أكثر شباباً وإشراقاً، بطقس يومي بسيط.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["الدفع عند الاستلام", "توصيل السعودية", "حلال"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs border border-brand-gold text-brand-gold px-2 py-0.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4 text-sm uppercase tracking-wide font-inter">
              روابط
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/collection", label: "المنتجات" },
                { href: "/about", label: "من نحن" },
                { href: "/contact", label: "تواصلي معنا" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4 text-sm uppercase tracking-wide font-inter">
              سياسات
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/policies/privacy", label: "الخصوصية" },
                { href: "/policies/terms", label: "الشروط والأحكام" },
                { href: "/policies/refund", label: "سياسة الإرجاع" },
                { href: "/policies/shipping", label: "سياسة الشحن" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-sm text-brand-gold">
              <p>تواصلي معنا:</p>
              <Link
                href="/contact"
                className="hover:text-brand-cream transition-colors"
              >
                info@ishraqa.shop
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-coffee mt-8 pt-6 text-center text-xs text-brand-gold">
          <p>© 2026 إشراقة للجمال · ISHRAQA Beauty · جميع الحقوق محفوظة</p>
          <p className="mt-1">المملكة العربية السعودية · الدفع عند الاستلام فقط</p>
        </div>
      </div>
    </footer>
  );
}
