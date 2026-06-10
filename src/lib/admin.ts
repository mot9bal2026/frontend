"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ishraqa.shop";
const TOKEN_KEY = "ishraqa_admin_token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

export class AuthError extends Error {}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });
  if (res.status === 401) {
    clearToken();
    throw new AuthError("Unauthorized");
  }
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      detail = body?.detail || detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json() as Promise<T>;
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    let detail = "بيانات الدخول غير صحيحة";
    try {
      const b = await res.json();
      detail = b?.detail || detail;
    } catch {}
    throw new Error(detail);
  }
  const data = (await res.json()) as { token: string };
  setToken(data.token);
  return data.token;
}

// ── Types ──
export type Metrics = {
  range: { from: string; to: string };
  visits: {
    total: number;
    valid: number;
    vpn: number;
    bot: number;
    invalid: number;
    unique_visitors: number;
  };
  orders: {
    total: number;
    confirmed: number;
    delivered: number;
    blocked_attempts: number;
    status_breakdown: Record<string, number>;
  };
  revenue: { total_sar: number; delivered_sar: number; upsell_sar: number; aov_sar: number };
  rates: {
    conversion_rate: number;
    confirmation_rate: number;
    delivery_rate: number;
    upsell_take_rate: number;
  };
};

export type SeriesPoint = {
  date: string;
  valid_visits: number;
  orders: number;
  revenue_sar: number;
  conversion_rate: number;
};

export type SourceRow = {
  source: string;
  valid_visits: number;
  orders: number;
  revenue_sar: number;
  conversion_rate: number;
};

export type OrderRow = {
  id: string;
  order_number: string;
  status: string;
  created_at: string;
  customer_name: string;
  phone_local: string;
  city: string | null;
  total_sar: number;
  items_qty: number;
  upsell_accepted: boolean;
  utm_source: string;
  country_iso: string | null;
  is_test: boolean;
};

export type OrdersResponse = {
  total: number;
  page: number;
  page_size: number;
  pages: number;
  orders: OrderRow[];
};

export type OrderDetail = {
  id: string;
  order_number: string;
  status: string;
  is_test: boolean;
  created_at: string;
  updated_at: string | null;
  customer: {
    name: string;
    phone_local: string;
    phone_e164: string;
    city: string | null;
    address: string | null;
  };
  totals: { subtotal_sar: number; shipping_sar: number; total_sar: number; currency: string };
  upsell: { offered: string | null; accepted: boolean; value_sar: number };
  items: {
    product_slug: string;
    product_name_ar: string;
    qty: number;
    price_sar: number;
    is_bridge_upsell: boolean;
  }[];
  attribution: {
    utm_source: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    fbclid: string | null;
    ttclid: string | null;
    sc_click_id: string | null;
    page_url: string | null;
  };
  fraud: {
    decision: string | null;
    reasons: string[] | null;
    maxmind_status: string | null;
    country_iso: string | null;
    risk_score: number | null;
    is_anonymous: boolean | null;
    is_anonymous_vpn: boolean | null;
    is_public_proxy: boolean | null;
    is_tor_exit_node: boolean | null;
    is_hosting_provider: boolean | null;
    is_residential_proxy: boolean | null;
  };
  technical: {
    ip_address: string | null;
    user_agent: string | null;
    sheet_status: string | null;
    sheet_error: string | null;
  };
  admin_notes: string | null;
};

type Range = { from: string; to: string };

export const getMe = () => request<{ username: string; statuses: string[] }>(`/api/admin/me`);

export const getMetrics = (r: Range) =>
  request<Metrics>(`/api/admin/metrics?from=${r.from}&to=${r.to}`);

export const getTimeseries = (r: Range) =>
  request<{ series: SeriesPoint[] }>(`/api/admin/timeseries?from=${r.from}&to=${r.to}`);

export const getSources = (r: Range) =>
  request<{ sources: SourceRow[] }>(`/api/admin/sources?from=${r.from}&to=${r.to}`);

export const getOrders = (
  r: Range,
  opts: {
    status?: string;
    search?: string;
    page?: number;
    page_size?: number;
    include_test?: boolean;
  } = {}
) => {
  const p = new URLSearchParams({ from: r.from, to: r.to });
  if (opts.status && opts.status !== "all") p.set("status", opts.status);
  if (opts.search) p.set("search", opts.search);
  if (opts.page) p.set("page", String(opts.page));
  if (opts.page_size) p.set("page_size", String(opts.page_size));
  if (opts.include_test) p.set("include_test", "true");
  return request<OrdersResponse>(`/api/admin/orders?${p.toString()}`);
};

export const getOrder = (id: string) => request<OrderDetail>(`/api/admin/orders/${id}`);

export const updateOrder = (
  id: string,
  body: { status?: string; city?: string; address?: string; admin_notes?: string }
) =>
  request<OrderDetail>(`/api/admin/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export const getBlocked = (r: Range, page = 1) =>
  request<{
    total: number;
    pages: number;
    page: number;
    attempts: { id: string; created_at: string; phone_local: string | null; ip_address: string | null; reasons: string[] | null }[];
  }>(`/api/admin/blocked?from=${r.from}&to=${r.to}&page=${page}`);

// ── Shared label maps (Arabic) ──
export const STATUS_LABELS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  confirmed: "مؤكد",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  refused: "مرفوض",
  returned: "مرتجع",
  cancelled: "ملغي",
};

export const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-indigo-100 text-indigo-700",
  confirmed: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  refused: "bg-red-100 text-red-700",
  returned: "bg-orange-100 text-orange-700",
  cancelled: "bg-gray-200 text-gray-600",
};
