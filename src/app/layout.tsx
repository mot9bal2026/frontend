import type { Metadata } from "next";
import { Tajawal, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";
import { DeferredLiveToast } from "@/components/marketing/DeferredLiveToast";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { ENABLE_PIXELS, TIKTOK_PIXEL_ID, tiktokPixelBootstrap } from "@/lib/pixels";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
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
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://analytics.tiktok.com" />
        {ENABLE_PIXELS && TIKTOK_PIXEL_ID ? (
          <script
            dangerouslySetInnerHTML={{ __html: tiktokPixelBootstrap(TIKTOK_PIXEL_ID) }}
          />
        ) : null}
      </head>
      <body
        className={`${tajawal.variable} ${inter.variable} bg-brand-white text-brand-ink font-arabic antialiased`}
      >
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
      </body>
    </html>
  );
}

