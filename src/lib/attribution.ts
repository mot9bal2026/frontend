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

const VISITOR_KEY = "ishraqa_visitor_id";
const SESSION_KEY = "ishraqa_session_id";

function uuid(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = uuid();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = uuid();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";

/** Fire-and-forget visit/click ping to the backend. The backend resolves the IP
 *  (KSA / VPN / bot) and only counts valid Saudi human traffic as clicks. */
export function trackVisit(): void {
  if (typeof window === "undefined") return;
  try {
    const attr = getAttribution();
    const referrer = document.referrer || "";
    const internal = referrer.startsWith(window.location.origin);
    const payload = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      path: window.location.pathname + window.location.search,
      referrer: referrer || undefined,
      is_landing: !internal,
      utm_source: attr.utm_source,
      utm_campaign: attr.utm_campaign,
      utm_content: attr.utm_content,
      fbclid: attr.fbclid,
      ttclid: attr.ttclid,
      sc_click_id: attr.sc_click_id,
      user_agent: navigator.userAgent,
    };
    fetch(`${API_URL}/api/track/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
