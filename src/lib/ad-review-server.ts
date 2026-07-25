const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";

/**
 * Server-side ad-review-mode check with short cache.
 * Fails open to "sales" (false) so TikTok visitors never see a blank page.
 */
export async function getAdReviewModeServer(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/ad-review-mode/public`, {
      next: { revalidate: 15 },
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { enabled?: boolean };
    return Boolean(data.enabled);
  } catch {
    return false;
  }
}
