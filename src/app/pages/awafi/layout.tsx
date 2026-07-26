import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "زيت العوافي | العرض الحصري — الدفع عند الاستلام",
  description:
    "زيت العوافي — خلطة أعشاب طبيعية لآلام الركبة والظهر والمفاصل. عرض حصري · الدفع عند الاستلام · شحن لجميع مناطق المملكة.",
  robots: { index: false, follow: false },
};

export default function AwafiLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/product-1.webp"
        type="image/webp"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
