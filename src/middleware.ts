import { NextResponse, type NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";
const SETTINGS_CACHE_TTL_MS = 15_000;
const FETCH_TIMEOUT_MS = 2_000;

type StealthConfig = {
  enabled: boolean;
  ksa_url: string | null;
  other_url: string | null;
};

let stealthCache: { data: StealthConfig; at: number } | null = null;
let adReviewCache: { enabled: boolean; at: number } | null = null;

async function fetchStealthConfig(): Promise<StealthConfig | null> {
  if (stealthCache && Date.now() - stealthCache.at < SETTINGS_CACHE_TTL_MS) {
    return stealthCache.data;
  }
  try {
    const res = await fetch(`${API_URL}/api/stealth-mode/public`, {
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return stealthCache?.data ?? null;
    const data = (await res.json()) as StealthConfig;
    stealthCache = { data, at: Date.now() };
    return data;
  } catch {
    return stealthCache?.data ?? null;
  }
}

async function fetchAdReviewEnabled(): Promise<boolean | null> {
  if (adReviewCache && Date.now() - adReviewCache.at < SETTINGS_CACHE_TTL_MS) {
    return adReviewCache.enabled;
  }
  try {
    const res = await fetch(`${API_URL}/api/ad-review-mode/public`, {
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return adReviewCache?.enabled ?? null;
    const data = (await res.json()) as { enabled?: boolean };
    const enabled = Boolean(data.enabled);
    adReviewCache = { enabled, at: Date.now() };
    return enabled;
  } catch {
    return adReviewCache?.enabled ?? null;
  }
}

function getClientCountry(request: NextRequest): string | null {
  return (
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country") ??
    null
  );
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

/** Fast edge redirect for /awafi when ad-review is OFF (same behavior, less wait). */
async function handleAwafi(request: NextRequest): Promise<NextResponse | null> {
  if (request.nextUrl.searchParams.get("geo") === "1") return null;

  const enabled = await fetchAdReviewEnabled();
  // null = unknown → let the page decide; false = redirect to product
  if (enabled !== false) return null;

  const dest = new URL("/products/wrinkles-dark-circles", request.url);
  request.nextUrl.searchParams.forEach((value, key) => {
    dest.searchParams.set(key, value);
  });
  return NextResponse.redirect(dest, 307);
}

async function handleHome(request: NextRequest): Promise<NextResponse> {
  try {
    const stealth = await fetchStealthConfig();
    if (!stealth || !stealth.enabled) {
      return NextResponse.next();
    }

    const country = getClientCountry(request);

    if (country && country !== "SA") {
      const dest = resolveDestination(stealth.other_url, request);
      if (dest) return NextResponse.redirect(dest, 307);
      return NextResponse.next();
    }

    const ksaDest = resolveDestination(stealth.ksa_url, request);
    if (ksaDest) return NextResponse.redirect(ksaDest, 307);
    return NextResponse.next();
  } catch (error) {
    console.error("[middleware] error:", error);
    return NextResponse.next();
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/awafi" || pathname === "/awafi/") {
    const early = await handleAwafi(request);
    if (early) return early;
    return NextResponse.next();
  }

  return handleHome(request);
}

export const config = {
  matcher: ["/", "/awafi"],
};
