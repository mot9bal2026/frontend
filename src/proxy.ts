import { NextResponse, type NextRequest } from "next/server";
import geoip from "geoip-lite";

/**
 * "وضع التخفي" (Stealth Mode) — geo-based cloaking of the landing page.
 *
 * Fully independent from the ad-review-mode feature (`/offer`, client-only
 * localStorage toggle in `src/lib/ad-mode.ts`) — this one is enforced
 * server-side on every request to the homepage, before any HTML is sent, so
 * it cannot be bypassed by editing client-side storage or scripts.
 *
 * When enabled (configured from the admin dashboard, persisted in Postgres):
 *  - Visitors whose IP resolves to Saudi Arabia see the page normally
 *    (or get redirected to a configured "KSA url" if one was set).
 *  - Visitors from any other country are redirected to the configured
 *    "other countries url".
 * Unknown/private IPs (e.g. local dev) fail open as if they were KSA, so we
 * never accidentally cloak the site if geo lookup fails.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";
const SETTINGS_CACHE_TTL_MS = 15_000;
const FETCH_TIMEOUT_MS = 2_500;

type StealthConfig = {
  enabled: boolean;
  ksa_url: string | null;
  other_url: string | null;
};

let settingsCache: { data: StealthConfig; at: number } | null = null;

async function fetchStealthConfig(): Promise<StealthConfig | null> {
  if (settingsCache && Date.now() - settingsCache.at < SETTINGS_CACHE_TTL_MS) {
    return settingsCache.data;
  }
  try {
    const res = await fetch(`${API_URL}/api/stealth-mode/public`, {
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return settingsCache?.data ?? null;
    const data = (await res.json()) as StealthConfig;
    settingsCache = { data, at: Date.now() };
    return data;
  } catch {
    // Backend unreachable/slow — fail open using last known value (or none).
    return settingsCache?.data ?? null;
  }
}

function getClientIp(request: NextRequest): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

function resolveDestination(target: string | null, request: NextRequest): URL | null {
  if (!target || !target.trim()) return null;
  try {
    const url = new URL(target.trim(), request.url);
    return url.toString() === request.url ? null : url;
  } catch {
    return null;
  }
}

export const runtime = "nodejs";

export async function proxy(request: NextRequest) {
  const stealth = await fetchStealthConfig();
  if (!stealth || !stealth.enabled) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  const country = ip ? geoip.lookup(ip)?.country ?? null : null;

  if (country && country !== "SA") {
    const dest = resolveDestination(stealth.other_url, request);
    if (dest) return NextResponse.redirect(dest, 307);
    return NextResponse.next();
  }

  // Saudi visitor (or unknown/private IP — fail open) — normal landing page,
  // unless the admin explicitly configured a specific KSA destination.
  const ksaDest = resolveDestination(stealth.ksa_url, request);
  if (ksaDest) return NextResponse.redirect(ksaDest, 307);
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
