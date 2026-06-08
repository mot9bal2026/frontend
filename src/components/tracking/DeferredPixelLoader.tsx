"use client";

import { useEffect } from "react";
import { captureAttribution, trackVisit } from "@/lib/attribution";
import { ENABLE_PIXELS, META_PIXEL_ID, SNAP_PIXEL_ID } from "@/lib/pixels";

function injectInlineScript(code: string): void {
  const script = document.createElement("script");
  script.text = code;
  document.head.appendChild(script);
}

function loadMetaPixel(pixelId: string): void {
  injectInlineScript(`
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','${pixelId}');
    fbq('track','PageView');
  `);
}

function loadSnapPixel(pixelId: string): void {
  injectInlineScript(`
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
    snaptr('init','${pixelId}');
    snaptr('track','PAGE_VIEW');
  `);
}

function initDeferredPixels(): void {
  if (typeof window === "undefined" || window._ishraqa_pixels_loaded) return;
  window._ishraqa_pixels_loaded = true;

  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
  if (SNAP_PIXEL_ID) loadSnapPixel(SNAP_PIXEL_ID);
}

export function DeferredPixelLoader() {
  useEffect(() => {
    captureAttribution();
    trackVisit();

    if (!ENABLE_PIXELS) return;

    if ("requestIdleCallback" in window) {
      requestIdleCallback(initDeferredPixels, { timeout: 3000 });
    } else {
      const t = setTimeout(initDeferredPixels, 2500);
      const events = ["mousedown", "touchstart", "keydown", "scroll"];
      const handler = () => {
        initDeferredPixels();
        events.forEach((e) => window.removeEventListener(e, handler));
      };
      events.forEach((e) => window.addEventListener(e, handler, { passive: true, once: true }));
      return () => {
        clearTimeout(t);
        events.forEach((e) => window.removeEventListener(e, handler));
      };
    }
  }, []);

  return null;
}
