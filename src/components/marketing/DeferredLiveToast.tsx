"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LivePurchaseToast = dynamic(
  () =>
    import("@/components/marketing/LivePurchaseToast").then((m) => m.LivePurchaseToast),
  { ssr: false }
);

/** Load toast only after idle — never compete with LCP on mobile. */
export function DeferredLiveToast() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(enable, { timeout: 10000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const t = globalThis.setTimeout(enable, 8000);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  if (!ready) return null;
  return <LivePurchaseToast />;
}
