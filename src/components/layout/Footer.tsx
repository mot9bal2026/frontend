import Link from "next/link";
import { ShieldCheck, Award, Truck, Sparkles } from "lucide-react";
import { IshraqaLogo } from "./IshraqaLogo";

export function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream">
      <div className="max-w-content mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ── Brand block ── */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center">
                <IshraqaLogo iconClassName="h-11 w-11" />
              </div>
              <div>
                <p className="font-black text-brand-cream text-base leading-tight">
                  إشراقة للجمال
                </p>
                <p
                  className="text-[10px] text-brand-gold font-semibold tracking-[0.18em] uppercase leading-tight mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  ISHRAQA · COLLAGEN COFFEE
                </p>
              </div>
            </div>

            <p className="text-[13px] text-brand-cream/80 leading-relaxed mb-4">
              <span className="font-bold text-brand-gold">إشراقة للجمال</span> —
              قهوة كولاجين سعودية فاخرة للجمال من الداخل، بمكونات واضحة وطقس يومي
              بسيط، مصمّمة لدعم <span className="font-semibold text-brand-cream">مظهر
              أكثر شباباً وإشراقاً</span> بدون إبر أو مكياج ثقيل.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-1.5">
              <TrustChip icon={<ShieldCheck size={11} />} label="SFDA" />
              <TrustChip icon={<Award size={11} />} label="حلال 100٪" />
              <TrustChip icon={<Truck size={11} />} label="الدفع عند الاستلام" />
              <TrustChip icon={<Sparkles size={11} />} label="ضمان 14 يوم" />
            </div>
          </div>

          {/* ── Links ── */}
          <div>
            <h4
              className="font-bold text-brand-gold mb-4 text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              المتجر
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/collection", label: "المنتجات" },
                { href: "/about", label: "قصة إشراقة" },
                { href: "/contact", label: "تواصل معنا" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/85 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Policies ── */}
          <div>
            <h4
              className="font-bold text-brand-gold mb-4 text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              المعلومات
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/policies/privacy", label: "الخصوصية" },
                { href: "/policies/terms", label: "الشروط والأحكام" },
                { href: "/policies/refund", label: "ضمان 14 يوم — الإرجاع" },
                { href: "/policies/shipping", label: "سياسة الشحن" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/85 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-sm">
              <p className="text-brand-gold text-[11px] uppercase tracking-[0.15em] font-semibold mb-1">
                خدمة العملاء
              </p>
              <Link
                href="/contact"
                className="text-brand-cream hover:text-brand-gold transition-colors"
              >
                info@ishraqa.shop
              </Link>
            </div>
          </div>
        </div>

        {/* Tagline strip */}
        <div className="mt-10 pt-6 border-t border-brand-coffee/60">
          <p
            className="text-center text-brand-gold text-[12.5px] tracking-[0.05em] italic mb-2"
            style={{ fontFamily: "Tajawal, sans-serif" }}
          >
            «الإشراقة تبدأ بفنجان واحد.»
          </p>
          <p className="text-center text-[10.5px] text-brand-cream/55">
            © 2026 إشراقة للجمال · ISHRAQA Collagen Coffee · المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  );
}

function TrustChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10.5px] bg-[#FBF7F0]/10 border border-brand-gold/50 text-brand-cream px-2 py-1 rounded-full font-medium">
      <span className="text-brand-gold">{icon}</span>
      {label}
    </span>
  );
}

