"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data?: Record<string, unknown>) => void;
      load: (id: string) => void;
      page: () => void;
    };
    snaptr?: (action: string, event?: string, data?: Record<string, unknown>) => void;
    _ishraqa_pixels_loaded?: boolean;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? "";

export type PixelEventData = {
  event_id: string;
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  /** 9665XXXXXXXX — sent unhashed; SDKs hash server-side. */
  phone_country_digits?: string;
  /** +9665XXXXXXXX — sent unhashed on TikTok pixel. */
  phone_e164?: string;
  /** Snap PURCHASE: maps to CAPI custom_data.order_id. */
  transaction_id?: string;
  item_category?: string;
};

function setMetaUserPhone(phoneCountryDigits?: string): void {
  if (!phoneCountryDigits || !META_PIXEL_ID || !window.fbq) return;
  try {
    window.fbq("init", META_PIXEL_ID, { ph: phoneCountryDigits });
  } catch {}
}

function setSnapUserPhone(phoneCountryDigits?: string): void {
  if (!phoneCountryDigits || !SNAP_PIXEL_ID || !window.snaptr) return;
  try {
    window.snaptr("init", SNAP_PIXEL_ID, { user_phone_number: phoneCountryDigits });
  } catch {}
}

function setTikTokUserPhone(phoneE164?: string): void {
  if (!phoneE164 || !window.ttq) return;
  try {
    window.ttq.identify({ phone_number: phoneE164 });
  } catch {}
}

export function firePixelEvent(eventName: string, data: PixelEventData): void {
  if (typeof window === "undefined") return;

  const eventId = data.event_id;
  const currency = data.currency ?? "SAR";

  if (data.phone_country_digits) {
    setMetaUserPhone(data.phone_country_digits);
    setSnapUserPhone(data.phone_country_digits);
  }
  if (data.phone_e164) {
    setTikTokUserPhone(data.phone_e164);
  }

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

  const contentIds =
    data.content_ids ?? data.contents?.map((c) => c.id);
  const numberItems = data.contents?.reduce((sum, c) => sum + c.quantity, 0);

  try {
    if (window.fbq) {
      const metaPayload: Record<string, unknown> = {
        currency,
        content_type: "product",
      };
      if (data.value != null) metaPayload.value = data.value;
      if (contentIds?.length) metaPayload.content_ids = contentIds;
      if (data.contents?.length) metaPayload.contents = data.contents;
      if (data.content_name) metaPayload.content_name = data.content_name;

      window.fbq("track", metaEvent, metaPayload, { eventID: eventId });
    }
  } catch {}

  try {
    if (window.ttq) {
      const ttqPayload: Record<string, unknown> = {
        event_id: eventId,
        currency,
        content_type: "product",
      };
      if (data.value != null) ttqPayload.value = data.value;
      if (data.phone_e164) ttqPayload.phone_number = data.phone_e164;
      if (data.contents?.length) {
        ttqPayload.contents = data.contents.map((c) => ({
          content_id: c.id,
          quantity: c.quantity,
          price: c.item_price,
        }));
      } else if (contentIds?.length) {
        ttqPayload.content_id = contentIds[0];
      }
      if (data.content_name) ttqPayload.content_name = data.content_name;

      window.ttq.track(tiktokEvent, ttqPayload);
    }
  } catch {}

  try {
    if (window.snaptr) {
      const snapPayload: Record<string, unknown> = {
        client_dedup_id: eventId,
        currency,
        item_category: data.item_category ?? "beauty",
      };
      if (data.value != null) snapPayload.price = data.value;
      if (contentIds?.length) snapPayload.item_ids = contentIds;
      if (numberItems != null) snapPayload.number_items = numberItems;
      if (snapEvent === "PURCHASE") {
        snapPayload.transaction_id = data.transaction_id ?? eventId;
      }

      window.snaptr("track", snapEvent, snapPayload);
    }
  } catch {}
}
