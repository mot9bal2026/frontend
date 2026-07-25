import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "زيت العوافي | اطلب الآن — الدفع عند الاستلام",
  description:
    "زيت العوافي الطبيعي — منتج عشبي للاستخدام الموضعي. الدفع عند الاستلام · شحن لجميع مناطق المملكة.",
  robots: { index: false, follow: false },
};

export default function AwafiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hoisted into <head> by Next.js App Router */}
      <link
        rel="preload"
        as="image"
        href="/results-carousel/slide-1-m.webp"
        type="image/webp"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
