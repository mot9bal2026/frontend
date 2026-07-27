import { Header } from "@/components/layout/Header";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { DeferredFooter } from "@/components/layout/DeferredFooter";
import { DeferredLiveToast } from "@/components/marketing/DeferredLiveToast";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";

/** Store chrome — server layout (no client ChromeGate wrapper). */
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Scoped to the store so ad landings (e.g. /pages/awafi) do not compete
          with their own LCP hero for the first network slot. */}
      <link
        rel="preload"
        as="image"
        href="/results-carousel/slide-1-m.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <TopAnnouncementBar />
      <Header />
      <main>{children}</main>
      <DeferredFooter />
      <DeferredLiveToast />
      <DeferredPixelLoader />
    </>
  );
}
