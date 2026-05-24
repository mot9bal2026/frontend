"use client";

const STORAGE_KEY = "ishraqa_attribution";

export type Attribution = {
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  ttclid?: string;
  sc_click_id?: string;
};

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  const saved: Attribution = getAttribution();

  const updated: Attribution = {
    ...saved,
  };

  const utmSource = params.get("utm_source");
  const utmCampaign = params.get("utm_campaign");
  const utmContent = params.get("utm_content");
  const fbclid = params.get("fbclid");
  const ttclid = params.get("ttclid");
  const scClickId = params.get("ScCid") ?? params.get("sc_click_id");

  if (utmSource) updated.utm_source = utmSource;
  if (utmCampaign) updated.utm_campaign = utmCampaign;
  if (utmContent) updated.utm_content = utmContent;
  if (fbclid) updated.fbclid = fbclid;
  if (ttclid) updated.ttclid = ttclid;
  if (scClickId) updated.sc_click_id = scClickId;

  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc") ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);
  if (fbp) updated.fbp = fbp;
  if (fbc) updated.fbc = fbc;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Attribution;
  } catch {}
  return {};
}
