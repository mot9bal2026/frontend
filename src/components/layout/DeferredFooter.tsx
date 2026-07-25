"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Footer = dynamic(
  () => import("@/components/layout/Footer").then((m) => m.Footer),
  { ssr: false }
);

/** Footer is below the fold — load after idle so it never blocks LCP/TBT. */
export function DeferredFooter() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(enable, { timeout: 4000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const t = globalThis.setTimeout(enable, 2500);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  if (!ready) return <div className="min-h-[120px] bg-[#0F3024]" aria-hidden />;
  return <Footer />;
}
