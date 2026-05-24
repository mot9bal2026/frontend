"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      load: (id: string) => void;
      page: () => void;
    };
    snaptr?: (action: string, event?: string, data?: Record<string, unknown>) => void;
    _ishraqa_pixels_loaded?: boolean;
  }
}

export function firePixelEvent(
  eventName: string,
  data?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  const metaEvent = {
    ViewContent: "ViewContent",
    AddToCart: "AddToCart",
    InitiateCheckout: "InitiateCheckout",
    Lead: "Lead",
    Purchase: "Purchase",
  }[eventName] ?? eventName;

  const tiktokEvent = {
    ViewContent: "ViewContent",
    AddToCart: "AddToCart",
    InitiateCheckout: "InitiateCheckout",
    Lead: "Contact",
    Purchase: "CompletePayment",
  }[eventName] ?? eventName;

  const snapEvent = {
    ViewContent: "VIEW_CONTENT",
    AddToCart: "ADD_CART",
    InitiateCheckout: "START_CHECKOUT",
    Lead: "SIGN_UP",
    Purchase: "PURCHASE",
  }[eventName] ?? eventName.toUpperCase();

  try {
    if (window.fbq) {
      window.fbq("track", metaEvent, data ?? {}, {
        eventID: (data?.event_id as string) ?? crypto.randomUUID(),
      });
    }
  } catch {}

  try {
    if (window.ttq) {
      window.ttq.track(tiktokEvent, {
        event_id: data?.event_id,
        value: data?.value,
        currency: data?.currency ?? "SAR",
        ...data,
      });
    }
  } catch {}

  try {
    if (window.snaptr) {
      window.snaptr("track", snapEvent, {
        event_id: data?.event_id,
        price: data?.value,
        currency: data?.currency ?? "SAR",
        ...data,
      });
    }
  } catch {}
}
