import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";
import { DeferredLiveToast } from "@/components/marketing/DeferredLiveToast";
import { ChromeGate } from "@/components/layout/ChromeGate";
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
        {/* Critical paint — avoid white flash before CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html,body{background:#FAF6F0;margin:0}body{font-family:var(--font-tajawal),Tahoma,sans-serif;color:#211915}",
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/results-carousel/slide-1-m.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="bg-brand-white text-brand-ink font-arabic antialiased">
        <ChromeGate
          header={
            <>
              <TopAnnouncementBar />
              <Header />
            </>
          }
          footer={
            <>
              <Footer />
              <DeferredLiveToast />
              <DeferredPixelLoader />
            </>
          }
        >
          {children}
        </ChromeGate>

        {/* TikTok after paint — do not block first frame */}
        {ENABLE_PIXELS && TIKTOK_PIXEL_ID ? (
          <Script id="ttq" strategy="lazyOnload">
            {tiktokPixelBootstrap(TIKTOK_PIXEL_ID)}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
