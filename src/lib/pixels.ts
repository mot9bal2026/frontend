/**
 * Pixel IDs are public (visible in network tab). NEXT_PUBLIC_* is baked at
 * `next build` time. EasyPanel often passes empty strings — use `||` not `??`.
 */
const DEFAULT_TIKTOK_PIXEL_ID = "D9HVUCRC77UD7F80B5S0";

function envOrEmpty(value: string | undefined): string {
  return (value ?? "").trim();
}

export const META_PIXEL_ID = envOrEmpty(process.env.NEXT_PUBLIC_META_PIXEL_ID);
export const TIKTOK_PIXEL_ID =
  envOrEmpty(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) || DEFAULT_TIKTOK_PIXEL_ID;
export const SNAP_PIXEL_ID = envOrEmpty(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID);
export const ENABLE_PIXELS = process.env.NEXT_PUBLIC_ENABLE_PIXELS !== "false";

/** Official TikTok base code — must be in initial HTML for Events Manager detection. */
export function tiktokPixelBootstrap(pixelId: string): string {
  /* The vendor snippet has no re-entry guard of its own, unlike the Meta and
     Snap ones. If it runs twice — Fast Refresh in dev, a re-mounted <Script>,
     or a second copy of the tag — setAndDefer overwrites the already-loaded
     SDK's page/track/identify with queue-pushers that call ttq.push(), which
     the loaded instance does not have. Every later track() then throws and
     conversions stop reporting with no visible symptom. */
  return `!function (w, d, t) {
  if(w.__ttqBootstrapped)return;w.__ttqBootstrapped=1;
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('${pixelId}');
  ttq.page();
}(window, document, 'ttq');`;
}
