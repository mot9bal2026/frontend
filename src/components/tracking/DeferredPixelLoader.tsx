"use client";

import { useEffect } from "react";
import { captureAttribution, trackVisit } from "@/lib/attribution";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? "";
const ENABLE_PIXELS = process.env.NEXT_PUBLIC_ENABLE_PIXELS !== "false";

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

function loadTikTokPixel(pixelId: string): void {
  injectInlineScript(`
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load('${pixelId}');
      ttq.page();
    }(window, document, 'ttq');
  `);
}

function loadSnapPixel(pixelId: string): void {
  injectInlineScript(`
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
    snaptr('init','${pixelId}');
    snaptr('track','PAGE_VIEW');
  `);
}

function initPixels(): void {
  if (typeof window === "undefined" || window._ishraqa_pixels_loaded) return;
  window._ishraqa_pixels_loaded = true;

  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
  if (TIKTOK_PIXEL_ID) loadTikTokPixel(TIKTOK_PIXEL_ID);
  if (SNAP_PIXEL_ID) loadSnapPixel(SNAP_PIXEL_ID);
}

export function DeferredPixelLoader() {
  useEffect(() => {
    captureAttribution();
    trackVisit();

    if (!ENABLE_PIXELS) return;

    if ("requestIdleCallback" in window) {
      requestIdleCallback(initPixels, { timeout: 3000 });
    } else {
      const t = setTimeout(initPixels, 2500);
      const events = ["mousedown", "touchstart", "keydown", "scroll"];
      const handler = () => {
        initPixels();
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

