import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutPopup } from "@/components/checkout/CheckoutPopup";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";
import { LivePurchaseToast } from "@/components/marketing/LivePurchaseToast";

export const metadata: Metadata = {
  title: "إشراقة للجمال | ISHRAQA Beauty — قهوة الكولاجين",
  description:
    "قهوة كولاجين سعودية فاخرة لمظهر أكثر شباباً وإشراقاً. الدفع عند الاستلام. توصيل 1-3 أيام في المدن الرئيسية.",
  openGraph: {
    locale: "ar_SA",
    type: "website",
    url: "https://ishraqa.shop",
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
      </head>
      <body className="bg-brand-white text-brand-ink font-arabic antialiased">
        <TopAnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutPopup />
        <LivePurchaseToast />
        <DeferredPixelLoader />
      </body>
    </html>
  );
}
