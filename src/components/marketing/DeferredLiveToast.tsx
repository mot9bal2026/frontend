"use client";

import dynamic from "next/dynamic";

const LivePurchaseToast = dynamic(
  () =>
    import("@/components/marketing/LivePurchaseToast").then((m) => m.LivePurchaseToast),
  { ssr: false }
);

export function DeferredLiveToast() {
  return <LivePurchaseToast />;
}
