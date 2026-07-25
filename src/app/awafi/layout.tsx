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
      <link
        rel="preload"
        as="image"
        href="/pain-relief-oil-product.webp"
        type="image/webp"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
