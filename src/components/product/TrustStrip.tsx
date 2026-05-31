import { Shield, Truck, Star, Lock } from "lucide-react";

export function TrustStrip() {
  const items = [
    { icon: <Lock size={16} />, text: "الدفع عند الاستلام فقط" },
    { icon: <Truck size={16} />, text: "توصيل 1-3 أيام" },
    { icon: <Shield size={16} />, text: "مكونات واضحة" },
    { icon: <Star size={16} />, text: "4.9 ★ تقييم عملاء" },
  ];

  return (
    <div className="bg-brand-cream border-y border-brand-border py-4">
      <div className="max-w-content mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-brand-muted">
              <span className="text-brand-gold">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

