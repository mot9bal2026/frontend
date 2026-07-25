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
      <TopAnnouncementBar />
      <Header />
      <main>{children}</main>
      <DeferredFooter />
      <DeferredLiveToast />
      <DeferredPixelLoader />
    </>
  );
}
