import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ENABLE_PIXELS, TIKTOK_PIXEL_ID, tiktokPixelBootstrap } from "@/lib/pixels";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-tajawal",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "زيت العوافي | لآلام الركبة والظهر والمفاصل · SFDA · حلال",
  description:
    "زيت العوافي — خلطة أعشاب طبيعية من 30 عشبة طبية لعلاج آلام الركبة، الظهر، المفاصل، والديسك. زيت موضعي يصل مباشرة لمكان الألم. مصادق عليه SFDA · حلال 100٪ · الدفع عند الاستلام · توصيل 1–3 أيام.",
  openGraph: {
    locale: "ar_SA",
    type: "website",
    url: "https://ishraqa.shop",
    title: "زيت العوافي — لآلام الركبة والظهر والمفاصل",
    description:
      "خلطة أعشاب طبيعية تصل مباشرة لمكان الألم في الركبة والظهر والمفاصل. بدون حبوب، بدون عمليات. الدفع عند الاستلام.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html,body{background:#FAF6F0;margin:0}body{font-family:var(--font-tajawal),Tahoma,sans-serif;color:#211915}",
          }}
        />
      </head>
      <body className="bg-brand-white text-brand-ink font-arabic antialiased">
        {children}
        {/* The id must not be "ttq": a DOM id becomes a property of window, so
            <script id="ttq"> makes window.ttq resolve to the element itself.
            The vendor snippet's `w[t] = w[t] || []` then adopts that element as
            the event queue and every ttq.page()/track() throws "push is not a
            function". */}
        {ENABLE_PIXELS && TIKTOK_PIXEL_ID ? (
          <Script id="tiktok-pixel" strategy="lazyOnload">
            {tiktokPixelBootstrap(TIKTOK_PIXEL_ID)}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
