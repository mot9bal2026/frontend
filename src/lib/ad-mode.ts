"use client";

const KEY = "ad_review_mode";

export function getAdReviewMode(): boolean {
  if (typeof window === "undefined") return false;
  const v = window.localStorage.getItem(KEY);
  // Default OFF (sales) so ad visitors never get stuck on a blank/review gate
  return v === "1";
}

export function setAdReviewMode(on: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, on ? "1" : "0");
  window.dispatchEvent(new Event("ad-mode-change"));
}
