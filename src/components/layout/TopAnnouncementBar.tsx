"use client";

import { useState, useEffect } from "react";

const items = [
  { icon: "🚚", text: "شحن سريع لجميع مناطق المملكة" },
  { icon: "💳", text: "الدفع عند الاستلام — بدون دفع أونلاين" },
  { icon: "✅", text: "مرخّصة من هيئة الغذاء والدواء SFDA" },
  { icon: "🌿", text: "حلال 100٪ · بكتين نباتي · بدون جيلاتين" },
  { icon: "🛡️", text: "ضمان 14 يوم — استرجاع كامل بدون أسئلة" },
  { icon: "⭐", text: "4.9 من 5 — تقييمات عميلات سعوديات حقيقيات" },
];

export function TopAnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      /* fade out */
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % items.length);
        /* fade in */
        setVisible(true);
      }, 400);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const item = items[current];

  return (
    <div
      className="bg-[#3D2817] text-white flex items-center justify-center gap-2 text-[13px] font-medium"
      style={{ height: "36px" }}
    >
      <span
        style={{
          transition: "opacity 0.4s ease",
          opacity: visible ? 1 : 0,
        }}
        className="flex items-center gap-2"
      >
        <span>{item.icon}</span>
        <span className="text-[#FAF6F0]">{item.text}</span>
      </span>
    </div>
  );
}

