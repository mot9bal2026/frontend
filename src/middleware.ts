import { NextResponse, type NextRequest } from "next/server";

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
    return settingsCache?.data ?? null;
  }
}

function getClientCountry(request: NextRequest): string | null {
  return request.headers.get("cf-ipcountry") ?? 
         request.headers.get("x-vercel-ip-country") ?? 
         null;
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

export async function middleware(request: NextRequest) {
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

export const config = {
  matcher: ["/"],
};
