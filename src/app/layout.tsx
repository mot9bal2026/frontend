import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";
import { LivePurchaseToast } from "@/components/marketing/LivePurchaseToast";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { ENABLE_PIXELS, TIKTOK_PIXEL_ID, tiktokPixelBootstrap } from "@/lib/pixels";

export const metadata: Metadata = {
  title: "إشراقة | قهوة الجمال — للهالات والتجاعيد · SFDA · حلال",
  description:
    "قهوة الجمال من إشراقة. كولاجين بحري 5000 ملجم + فيتامين C + هيالورونيك — جرعات معلنة تستهدف الهالات والتجاعيد مباشرة. مرخّصة SFDA · حلال 100٪ · الدفع عند الاستلام · توصيل 1–3 أيام.",
  openGraph: {
    locale: "ar_SA",
    type: "website",
    url: "https://ishraqa.shop",
    title: "إشراقة — قهوة الجمال",
    description:
      "صيغة موزونة بمعايير صيدلانية. تشتغل من الداخل على التجاعيد والهالات السوداء. الدفع عند الاستلام.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://analytics.tiktok.com" />
        {ENABLE_PIXELS && TIKTOK_PIXEL_ID ? (
          <script
            dangerouslySetInnerHTML={{ __html: tiktokPixelBootstrap(TIKTOK_PIXEL_ID) }}
          />
        ) : null}
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
              <CartDrawer />
              <LivePurchaseToast />
              <DeferredPixelLoader />
            </>
          }
        >
          {children}
        </ChromeGate>
      </body>
    </html>
  );
}

