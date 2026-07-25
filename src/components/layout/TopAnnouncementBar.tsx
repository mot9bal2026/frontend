const items = [
  { icon: "🚚", text: "شحن سريع لجميع مناطق المملكة" },
  { icon: "💳", text: "الدفع عند الاستلام — بدون دفع أونلاين" },
  { icon: "✅", text: "مرخّصة من هيئة الغذاء والدواء SFDA" },
  { icon: "🌿", text: "حلال 100٪ · 30 عشبة طبيعية · بدون كورتيزون" },
  { icon: "🛡️", text: "ضمان 14 يوم — استرجاع كامل بدون أسئلة" },
  { icon: "⭐", text: "4.9 من 5 — تقييمات عملاء سعوديين حقيقيين" },
];

/** Static SSR bar — no client JS on first paint (mobile speed). */
export function TopAnnouncementBar() {
  return (
    <div
      className="bg-[#0F3024] text-white text-[12px] md:text-[13px] font-medium overflow-hidden"
      style={{ height: "36px" }}
    >
      <div className="flex h-full items-center animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 shrink-0">
            <span aria-hidden>{item.icon}</span>
            <span className="text-[#FAF6F0]">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
