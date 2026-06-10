/**
 * LOCAL DEMO admin backend (Node / Next.js route handler).
 *
 * This exists ONLY so the admin dashboard can be explored locally without
 * running the real Python/FastAPI backend + Postgres. It serves deterministic
 * sample data and is gated behind ADMIN_DEMO_MODE.
 *
 * In production the dashboard talks to the real backend via NEXT_PUBLIC_API_URL;
 * these routes are inert there (they 404 unless ADMIN_DEMO_MODE === "true").
 */
import { NextResponse } from "next/server";

const DEMO_ENABLED = process.env.ADMIN_DEMO_MODE === "true";
const DEMO_USER = process.env.ADMIN_USERNAME || "admin";
const DEMO_PASS = process.env.ADMIN_PASSWORD || "Ishraqa@2026";

const ORDER_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "shipped",
  "delivered",
  "refused",
  "returned",
  "cancelled",
];

// ── Deterministic sample data ───────────────────────────────────────────────
type DemoItem = { product_slug: string; product_name_ar: string; qty: number; price_sar: number; is_bridge_upsell: boolean };
type DemoOrder = {
  id: string;
  order_number: string;
  status: string;
  is_test: boolean;
  created_at: string;
  updated_at: string | null;
  customer_name: string;
  phone_local: string;
  city: string | null;
  address: string | null;
  subtotal_sar: number;
  shipping_sar: number;
  total_sar: number;
  upsell_offered: string | null;
  upsell_accepted: boolean;
  upsell_value_sar: number;
  utm_source: string;
  utm_campaign: string | null;
  utm_content: string | null;
  country_iso: string;
  risk_score: number;
  is_vpn: boolean;
  ip_address: string;
  admin_notes: string | null;
};

const NAMES = [
  "نورة الشمري", "ريم القرشي", "هيا الشهري", "لينا العنزي", "منى العتيبي",
  "حصة الدوسري", "سارة المالكي", "العنود الحربي", "جواهر السبيعي", "أمل الغامدي",
  "دانة الرشيد", "وفاء القحطاني", "شهد المطيري", "نوف الدوسري", "مها العمري",
];
const CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الطائف"];
const SOURCES = ["snapchat", "tiktok", "instagram", "direct", "google"];
const PRODUCTS = [
  { slug: "wrinkles-dark-circles", name: "قهوة الكولاجين للتجاعيد والهالات السوداء" },
  { slug: "anti-aging", name: "قهوة الكولاجين ضد الشيخوخة" },
];
const STATUS_POOL = [
  "new", "new", "contacted", "confirmed", "confirmed", "shipped",
  "delivered", "delivered", "delivered", "refused", "returned", "cancelled",
];

// simple seeded PRNG so data is stable across requests
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildOrders(): DemoOrder[] {
  const rnd = mulberry32(20260601);
  const orders: DemoOrder[] = [];
  const now = Date.now();
  const count = 64;
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(rnd() * 45);
    const created = new Date(now - daysAgo * 86400000 - Math.floor(rnd() * 86400000));
    const product = PRODUCTS[Math.floor(rnd() * PRODUCTS.length)];
    const qty = 1 + Math.floor(rnd() * 3);
    const unit = qty === 1 ? 169 : qty === 2 ? 199 : 249;
    const upsell = rnd() < 0.3;
    const subtotal = unit;
    const total = subtotal + (upsell ? 99 : 0);
    const status = STATUS_POOL[Math.floor(rnd() * STATUS_POOL.length)];
    const hasAddress = ["confirmed", "shipped", "delivered", "returned"].includes(status);
    const city = CITIES[Math.floor(rnd() * CITIES.length)];
    const items: DemoItem[] = [
      { product_slug: product.slug, product_name_ar: product.name, qty, price_sar: unit, is_bridge_upsell: false },
    ];
    if (upsell) {
      items.push({ product_slug: product.slug, product_name_ar: product.name + " (علبة إضافية)", qty: 1, price_sar: 99, is_bridge_upsell: true });
    }
    orders.push({
      id: `demo-${1000 + i}`,
      order_number: `ISH-2026-${String(5000 + i).padStart(6, "0")}`,
      status,
      is_test: false,
      created_at: created.toISOString(),
      updated_at: created.toISOString(),
      customer_name: NAMES[Math.floor(rnd() * NAMES.length)],
      phone_local: "05" + String(Math.floor(10000000 + rnd() * 89999999)),
      city: hasAddress ? city : null,
      address: hasAddress ? `حي ${["النرجس", "الياسمين", "الملقا", "العليا", "الربيع"][Math.floor(rnd() * 5)]}، شارع ${1 + Math.floor(rnd() * 40)}` : null,
      subtotal_sar: subtotal,
      shipping_sar: 0,
      total_sar: total,
      upsell_offered: upsell ? product.slug : null,
      upsell_accepted: upsell,
      upsell_value_sar: upsell ? 99 : 0,
      utm_source: SOURCES[Math.floor(rnd() * SOURCES.length)],
      utm_campaign: ["mirror-moment", "motherhood", "before-after", null][Math.floor(rnd() * 4)],
      utm_content: ["ad-a", "ad-b", "ad-c", null][Math.floor(rnd() * 4)],
      country_iso: "SA",
      risk_score: Math.round(rnd() * 12 * 10) / 10,
      is_vpn: false,
      ip_address: `188.${Math.floor(rnd() * 255)}.${Math.floor(rnd() * 255)}.${Math.floor(rnd() * 255)}`,
      admin_notes: null,
    });
  }
  // store-wide mutable list (persists while dev server runs)
  return orders;
}

// keep a single instance across requests in dev
const g = globalThis as unknown as { __demoOrders?: DemoOrder[] };
if (!g.__demoOrders) g.__demoOrders = buildOrders();
const ORDERS = g.__demoOrders;

// ── helpers ──────────────────────────────────────────────────────────────────
function parseRange(url: URL): { start: number; end: number; days: string[] } {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const fromStr = url.searchParams.get("from") || fmt(new Date(today.getTime() - 29 * 86400000));
  const toStr = url.searchParams.get("to") || fmt(today);
  const start = new Date(fromStr + "T00:00:00Z").getTime();
  const end = new Date(toStr + "T00:00:00Z").getTime() + 86400000;
  const days: string[] = [];
  for (let t = start; t < end; t += 86400000) days.push(new Date(t).toISOString().slice(0, 10));
  return { start, end, days };
}

function inRange(o: DemoOrder, start: number, end: number) {
  const t = new Date(o.created_at).getTime();
  return t >= start && t < end;
}

function unauthorized() {
  return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: Request): boolean {
  const auth = req.headers.get("authorization") || "";
  return auth.startsWith("Bearer ") && auth.length > 12;
}

function serializeDetail(o: DemoOrder) {
  return {
    id: o.id,
    order_number: o.order_number,
    status: o.status,
    is_test: o.is_test,
    created_at: o.created_at,
    updated_at: o.updated_at,
    customer: { name: o.customer_name, phone_local: o.phone_local, phone_e164: "+966" + o.phone_local.slice(1), city: o.city, address: o.address },
    totals: { subtotal_sar: o.subtotal_sar, shipping_sar: o.shipping_sar, total_sar: o.total_sar, currency: "SAR" },
    upsell: { offered: o.upsell_offered, accepted: o.upsell_accepted, value_sar: o.upsell_value_sar },
    items: o.upsell_accepted
      ? [
          { product_slug: o.upsell_offered!, product_name_ar: PRODUCTS.find((p) => p.slug === o.upsell_offered)?.name ?? o.upsell_offered!, qty: 1, price_sar: o.subtotal_sar, is_bridge_upsell: false },
          { product_slug: o.upsell_offered!, product_name_ar: "علبة إضافية (ترقية)", qty: 1, price_sar: 99, is_bridge_upsell: true },
        ]
      : [{ product_slug: PRODUCTS[0].slug, product_name_ar: PRODUCTS[0].name, qty: 1, price_sar: o.subtotal_sar, is_bridge_upsell: false }],
    attribution: {
      utm_source: o.utm_source,
      utm_campaign: o.utm_campaign,
      utm_content: o.utm_content,
      fbclid: null,
      ttclid: null,
      sc_click_id: null,
      page_url: "https://ishraqa.shop/products/wrinkles-dark-circles",
    },
    fraud: {
      decision: "allow",
      reasons: [],
      maxmind_status: "ok",
      country_iso: o.country_iso,
      risk_score: o.risk_score,
      is_anonymous: false,
      is_anonymous_vpn: o.is_vpn,
      is_public_proxy: false,
      is_tor_exit_node: false,
      is_hosting_provider: false,
      is_residential_proxy: false,
    },
    technical: { ip_address: o.ip_address, user_agent: "Mozilla/5.0 (iPhone)", sheet_status: "ok", sheet_error: null },
    admin_notes: o.admin_notes,
  };
}

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  if (!DEMO_ENABLED) return NextResponse.json({ detail: "Not found" }, { status: 404 });
  const { slug } = await ctx.params;
  const path = slug.join("/");
  const url = new URL(req.url);

  if (!checkAuth(req)) return unauthorized();

  if (path === "me") {
    return NextResponse.json({ ok: true, username: DEMO_USER, statuses: ORDER_STATUSES });
  }

  if (path === "metrics") {
    const { start, end } = parseRange(url);
    const inr = ORDERS.filter((o) => inRange(o, start, end));
    const total = inr.length;
    const revenue = inr.reduce((s, o) => s + o.total_sar, 0);
    const delivered = inr.filter((o) => o.status === "delivered");
    const confirmed = inr.filter((o) => ["confirmed", "shipped", "delivered"].includes(o.status)).length;
    const upsell = inr.filter((o) => o.upsell_accepted);
    const validVisits = Math.round(total * 21 + 140);
    const breakdown: Record<string, number> = {};
    for (const o of inr) breakdown[o.status] = (breakdown[o.status] || 0) + 1;
    return NextResponse.json({
      range: { from: new Date(start).toISOString(), to: new Date(end).toISOString() },
      visits: {
        total: validVisits + 90,
        valid: validVisits,
        vpn: 38,
        bot: 24,
        invalid: 90,
        unique_visitors: Math.round(validVisits * 0.78),
      },
      orders: {
        total,
        confirmed,
        delivered: delivered.length,
        blocked_attempts: 11,
        status_breakdown: breakdown,
      },
      revenue: {
        total_sar: revenue,
        delivered_sar: delivered.reduce((s, o) => s + o.total_sar, 0),
        upsell_sar: upsell.reduce((s, o) => s + o.upsell_value_sar, 0),
        aov_sar: total ? Math.round((revenue / total) * 10) / 10 : 0,
      },
      rates: {
        conversion_rate: validVisits ? Math.round((total / validVisits) * 10000) / 100 : 0,
        confirmation_rate: total ? Math.round((confirmed / total) * 1000) / 10 : 0,
        delivery_rate: total ? Math.round((delivered.length / total) * 1000) / 10 : 0,
        upsell_take_rate: total ? Math.round((upsell.length / total) * 1000) / 10 : 0,
      },
    });
  }

  if (path === "timeseries") {
    const { start, end, days } = parseRange(url);
    const inr = ORDERS.filter((o) => inRange(o, start, end));
    const rnd = mulberry32(days.length + 7);
    const series = days.map((d) => {
      const dayOrders = inr.filter((o) => o.created_at.slice(0, 10) === d);
      const oc = dayOrders.length;
      const rev = dayOrders.reduce((s, o) => s + o.total_sar, 0);
      const vc = Math.max(oc * 18, Math.round(8 + rnd() * 45));
      return { date: d, valid_visits: vc, orders: oc, revenue_sar: rev, conversion_rate: vc ? Math.round((oc / vc) * 10000) / 100 : 0 };
    });
    return NextResponse.json({ series });
  }

  if (path === "sources") {
    const { start, end } = parseRange(url);
    const inr = ORDERS.filter((o) => inRange(o, start, end));
    const map: Record<string, { v: number; o: number; r: number }> = {};
    for (const s of SOURCES) map[s] = { v: 0, o: 0, r: 0 };
    const rnd = mulberry32(99);
    for (const o of inr) {
      map[o.utm_source] = map[o.utm_source] || { v: 0, o: 0, r: 0 };
      map[o.utm_source].o += 1;
      map[o.utm_source].r += o.total_sar;
    }
    for (const s of Object.keys(map)) map[s].v = map[s].o * 19 + Math.round(20 + rnd() * 120);
    const sources = Object.entries(map)
      .map(([source, m]) => ({ source, valid_visits: m.v, orders: m.o, revenue_sar: m.r, conversion_rate: m.v ? Math.round((m.o / m.v) * 10000) / 100 : 0 }))
      .sort((a, b) => b.orders - a.orders || b.valid_visits - a.valid_visits);
    return NextResponse.json({ sources });
  }

  if (path === "orders") {
    const { start, end } = parseRange(url);
    const status = url.searchParams.get("status");
    const search = (url.searchParams.get("search") || "").trim();
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(url.searchParams.get("page_size") || "20", 10)));
    let list = ORDERS.filter((o) => inRange(o, start, end));
    if (status && status !== "all") list = list.filter((o) => o.status === status);
    if (search) list = list.filter((o) => o.customer_name.includes(search) || o.phone_local.includes(search) || o.order_number.includes(search) || (o.city || "").includes(search));
    list = list.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    const total = list.length;
    const slice = list.slice((page - 1) * pageSize, page * pageSize);
    return NextResponse.json({
      total,
      page,
      page_size: pageSize,
      pages: Math.max(1, Math.ceil(total / pageSize)),
      orders: slice.map((o) => ({
        id: o.id,
        order_number: o.order_number,
        status: o.status,
        created_at: o.created_at,
        customer_name: o.customer_name,
        phone_local: o.phone_local,
        city: o.city,
        total_sar: o.total_sar,
        items_qty: o.upsell_accepted ? 2 : 1,
        upsell_accepted: o.upsell_accepted,
        utm_source: o.utm_source || "direct",
        country_iso: o.country_iso,
        is_test: o.is_test,
      })),
    });
  }

  if (path.startsWith("orders/")) {
    const id = path.split("/")[1];
    const o = ORDERS.find((x) => x.id === id);
    if (!o) return NextResponse.json({ detail: "الطلب غير موجود" }, { status: 404 });
    return NextResponse.json(serializeDetail(o));
  }

  if (path === "blocked") {
    const { start, end } = parseRange(url);
    const rnd = mulberry32(555);
    const reasonsPool = [["not_sa_ip"], ["vpn"], ["public_proxy"], ["high_ip_risk"], ["tor"], ["hosting_provider"]];
    const attempts = Array.from({ length: 11 }).map((_, i) => {
      const created = new Date(start + Math.floor(rnd() * (end - start)));
      return {
        id: `blk-${i}`,
        created_at: created.toISOString(),
        phone_local: "05" + String(Math.floor(10000000 + rnd() * 89999999)),
        ip_address: `45.${Math.floor(rnd() * 255)}.${Math.floor(rnd() * 255)}.${Math.floor(rnd() * 255)}`,
        reasons: reasonsPool[Math.floor(rnd() * reasonsPool.length)],
      };
    });
    return NextResponse.json({ total: attempts.length, page: 1, page_size: 20, pages: 1, attempts });
  }

  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}

// ── POST (login) ────────────────────────────────────────────────────────────
export async function POST(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  if (!DEMO_ENABLED) return NextResponse.json({ detail: "Not found" }, { status: 404 });
  const { slug } = await ctx.params;
  const path = slug.join("/");

  if (path === "login") {
    const body = await req.json().catch(() => ({}));
    if (body?.username === DEMO_USER && body?.password === DEMO_PASS) {
      return NextResponse.json({ ok: true, token: "demo-token-" + Date.now(), expires_at: Date.now() / 1000 + 43200 });
    }
    return NextResponse.json({ detail: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }
  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}

// ── PATCH (update order) ──────────────────────────────────────────────────────
export async function PATCH(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  if (!DEMO_ENABLED) return NextResponse.json({ detail: "Not found" }, { status: 404 });
  if (!checkAuth(req)) return unauthorized();
  const { slug } = await ctx.params;
  const path = slug.join("/");

  if (path.startsWith("orders/")) {
    const id = path.split("/")[1];
    const o = ORDERS.find((x) => x.id === id);
    if (!o) return NextResponse.json({ detail: "الطلب غير موجود" }, { status: 404 });
    const body = await req.json().catch(() => ({}));
    if (typeof body.status === "string") o.status = body.status;
    if (typeof body.city === "string") o.city = body.city || null;
    if (typeof body.address === "string") o.address = body.address || null;
    if (typeof body.admin_notes === "string") o.admin_notes = body.admin_notes || null;
    o.updated_at = new Date().toISOString();
    return NextResponse.json(serializeDetail(o));
  }
  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}
