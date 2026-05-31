"use client";

import { useEffect, useState } from "react";
import {
  X,
  Phone,
  MessageCircle,
  MapPin,
  User,
  Package,
  Gift,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Loader2,
  Save,
  Copy,
  Check,
} from "lucide-react";
import {
  AuthError,
  getOrder,
  updateOrder,
  STATUS_LABELS,
  type OrderDetail,
} from "@/lib/admin";
import { fmtDateTime, fmtSar, whatsappLink } from "@/lib/admin-format";
import { StatusBadge } from "./StatusBadge";

type Props = {
  orderId: string;
  statuses: string[];
  onClose: () => void;
  onSaved: () => void;
  onAuthError: () => void;
};

export function OrderDetailDrawer({ orderId, statuses, onClose, onSaved, onAuthError }: Props) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // editable fields
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getOrder(orderId)
      .then((o) => {
        if (cancelled) return;
        setOrder(o);
        setStatus(o.status);
        setCity(o.customer.city ?? "");
        setAddress(o.customer.address ?? "");
        setNotes(o.admin_notes ?? "");
      })
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof AuthError) return onAuthError();
        setError(e instanceof Error ? e.message : "تعذّر تحميل الطلب");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [orderId, onAuthError]);

  const dirty =
    order !== null &&
    (status !== order.status ||
      city !== (order.customer.city ?? "") ||
      address !== (order.customer.address ?? "") ||
      notes !== (order.admin_notes ?? ""));

  async function save() {
    if (!order) return;
    setSaving(true);
    setError("");
    try {
      const updated = await updateOrder(order.id, { status, city, address, admin_notes: notes });
      setOrder(updated);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
      onSaved();
    } catch (e) {
      if (e instanceof AuthError) return onAuthError();
      setError(e instanceof Error ? e.message : "تعذّر الحفظ");
    } finally {
      setSaving(false);
    }
  }

  function copyPhone() {
    if (!order) return;
    navigator.clipboard?.writeText(order.customer.phone_local).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const fraudFlags = order
    ? [
        ["VPN مجهول", order.fraud.is_anonymous_vpn],
        ["بروكسي عام", order.fraud.is_public_proxy],
        ["Tor", order.fraud.is_tor_exit_node],
        ["استضافة", order.fraud.is_hosting_provider],
        ["بروكسي سكني", order.fraud.is_residential_proxy],
        ["IP مجهول", order.fraud.is_anonymous],
      ].filter(([, v]) => v)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex" dir="rtl">
      {/* overlay */}
      <div className="absolute inset-0 bg-[#1A0F0A]/50 backdrop-blur-sm" onClick={onClose} />

      {/* panel */}
      <div className="relative mr-auto h-full w-full max-w-xl bg-[#FBF7F0] shadow-2xl overflow-y-auto flex flex-col animate-[slideIn_.2s_ease]">
        {/* header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E6D8C8] px-5 py-4 flex items-center justify-between">
          <div>
            {loading ? (
              <div className="h-5 w-32 bg-[#F0EAE0] rounded animate-pulse" />
            ) : order ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-[#1A0F0A] text-lg font-inter">{order.order_number}</span>
                <StatusBadge status={order.status} />
                {order.is_test && (
                  <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-bold">تجريبي</span>
                )}
              </div>
            ) : null}
            {order && <p className="text-[11px] text-[#7A6A5E] mt-1">{fmtDateTime(order.created_at)}</p>}
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl hover:bg-[#F0EAE0] flex items-center justify-center text-[#5A4A3E]">
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 size={28} className="animate-spin text-[#0F3024]" />
          </div>
        ) : error && !order ? (
          <div className="p-5">
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
          </div>
        ) : order ? (
          <div className="flex-1 px-5 py-5 space-y-5">
            {/* Customer */}
            <Section icon={<User size={15} />} title="بيانات العميلة">
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="font-black text-[#1A0F0A] text-base">{order.customer.name}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${order.customer.phone_e164 || order.customer.phone_local}`}
                  className="flex items-center gap-1.5 text-[13px] font-bold bg-[#0F3024] text-white px-3 py-2 rounded-xl hover:bg-[#163f30] font-inter"
                  dir="ltr"
                >
                  <Phone size={14} /> {order.customer.phone_local}
                </a>
                <a
                  href={whatsappLink(order.customer.phone_local)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[13px] font-bold bg-[#1E5B3F] text-white px-3 py-2 rounded-xl hover:opacity-90"
                >
                  <MessageCircle size={14} /> واتساب
                </a>
                <button
                  onClick={copyPhone}
                  className="flex items-center gap-1.5 text-[13px] font-bold bg-white border border-[#E6D8C8] text-[#5A4A3E] px-3 py-2 rounded-xl hover:border-[#0F3024]"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  {copied ? "تم النسخ" : "نسخ"}
                </button>
              </div>
            </Section>

            {/* Items */}
            <Section icon={<Package size={15} />} title="المنتجات">
              <div className="space-y-2">
                {order.items.map((it, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 bg-white rounded-xl border border-[#E6D8C8] px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-[#3D2817] truncate">{it.product_name_ar}</p>
                      <p className="text-[11px] text-[#A89A8C]">
                        {it.product_slug}
                        {it.is_bridge_upsell && (
                          <span className="mr-1 text-[#A0640A] font-bold"> · ترقية 99 ر.س</span>
                        )}
                      </p>
                    </div>
                    <div className="text-left flex-shrink-0 font-inter">
                      <p className="text-[13px] font-black text-[#1A0F0A]">{fmtSar(it.price_sar)}</p>
                      <p className="text-[11px] text-[#7A6A5E]">× {it.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-3 bg-white rounded-xl border border-[#E6D8C8] px-4 py-3 space-y-1.5 text-[13px]">
                <Row label="المجموع الفرعي" value={fmtSar(order.totals.subtotal_sar)} />
                <Row
                  label="الشحن"
                  value={order.totals.shipping_sar > 0 ? fmtSar(order.totals.shipping_sar) : "مجاني"}
                />
                {order.upsell.accepted && (
                  <Row
                    label={
                      <span className="flex items-center gap-1 text-[#A0640A]">
                        <Gift size={12} /> ترقية مقبولة
                      </span>
                    }
                    value={fmtSar(order.upsell.value_sar)}
                  />
                )}
                <div className="border-t border-[#E6D8C8] pt-2 flex items-center justify-between">
                  <span className="font-black text-[#1A0F0A]">الإجمالي عند الاستلام</span>
                  <span className="font-black text-[#1E5B3F] text-base font-inter">{fmtSar(order.totals.total_sar)}</span>
                </div>
              </div>
            </Section>

            {/* Fulfillment editable */}
            <Section icon={<MapPin size={15} />} title="الشحن والتنفيذ (COD)">
              <label className="block text-[11px] font-bold text-[#5A4A3E] mb-1">الحالة</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-[#E6D8C8] bg-white px-3 py-2.5 text-sm font-bold text-[#3D2817] focus:outline-none focus:border-[#0F3024] mb-3"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s] ?? s}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#5A4A3E] mb-1">المدينة</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="تُملأ بعد مكالمة التأكيد"
                    className="w-full rounded-xl border border-[#E6D8C8] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#0F3024]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#5A4A3E] mb-1">العنوان التفصيلي</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    placeholder="الحي، الشارع، أقرب معلم…"
                    className="w-full rounded-xl border border-[#E6D8C8] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#0F3024] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#5A4A3E] mb-1">ملاحظات الإدارة</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="ملاحظات داخلية حول الطلب أو المكالمة…"
                    className="w-full rounded-xl border border-[#E6D8C8] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#0F3024] resize-none"
                  />
                </div>
              </div>
            </Section>

            {/* Attribution */}
            <Section icon={<Globe size={15} />} title="مصدر الزيارة">
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <Kv k="المصدر" v={order.attribution.utm_source || "direct"} />
                <Kv k="الحملة" v={order.attribution.utm_campaign || "—"} />
                <Kv k="الإعلان" v={order.attribution.utm_content || "—"} />
                <Kv k="الدولة" v={order.fraud.country_iso || "—"} />
              </div>
            </Section>

            {/* Fraud / trust */}
            <Section
              icon={fraudFlags.length ? <ShieldAlert size={15} /> : <ShieldCheck size={15} />}
              title="فحص الأمان (MaxMind)"
            >
              <div className="flex items-center gap-2 flex-wrap text-[12px]">
                <span
                  className={`px-2.5 py-1 rounded-full font-bold ${
                    order.fraud.decision === "allow" || order.fraud.decision === "allow_test"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.fraud.decision === "allow_test" ? "تجريبي" : order.fraud.decision === "allow" ? "مقبول" : order.fraud.decision || "—"}
                </span>
                {order.fraud.risk_score !== null && (
                  <span className="text-[#7A6A5E] font-inter">درجة الخطورة: {order.fraud.risk_score}</span>
                )}
                {fraudFlags.length === 0 ? (
                  <span className="text-[#1E5B3F]">لا توجد إشارات VPN/بروكسي</span>
                ) : (
                  fraudFlags.map(([label]) => (
                    <span key={label as string} className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                      {label}
                    </span>
                  ))
                )}
              </div>
              {order.technical.ip_address && (
                <p className="text-[11px] text-[#A89A8C] mt-2 font-inter" dir="ltr">
                  IP: {order.technical.ip_address}
                </p>
              )}
            </Section>

            {/* Sheet status */}
            {(order.technical.sheet_status || order.technical.sheet_error) && (
              <p className="text-[11px] text-[#A89A8C]">
                Google Sheets: {order.technical.sheet_status || "—"}
                {order.technical.sheet_error ? ` · ${order.technical.sheet_error}` : ""}
              </p>
            )}
          </div>
        ) : null}

        {/* sticky save bar */}
        {order && (
          <div className="sticky bottom-0 bg-white border-t border-[#E6D8C8] px-5 py-3 flex items-center justify-between gap-3">
            {error ? (
              <p className="text-[12px] text-red-600 truncate">{error}</p>
            ) : savedFlash ? (
              <p className="text-[12px] text-green-700 font-bold flex items-center gap-1">
                <Check size={14} /> تم الحفظ
              </p>
            ) : (
              <p className="text-[12px] text-[#A89A8C]">{dirty ? "لديك تغييرات غير محفوظة" : "لا تغييرات"}</p>
            )}
            <button
              onClick={save}
              disabled={!dirty || saving}
              className="flex items-center gap-2 bg-[#0F3024] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#163f30] disabled:opacity-50 active:scale-95"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              حفظ التغييرات
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-24px);
            opacity: 0.4;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-7 h-7 rounded-lg bg-[#E8F2EC] text-[#1E5B3F] flex items-center justify-center">{icon}</span>
        <h4 className="font-black text-[#3D2817] text-[13px]">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center justify-between text-[#5A4A3E]">
      <span>{label}</span>
      <span className="font-bold font-inter">{value}</span>
    </div>
  );
}

function Kv({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white rounded-lg border border-[#E6D8C8] px-2.5 py-1.5">
      <p className="text-[10px] text-[#A89A8C]">{k}</p>
      <p className="text-[12px] font-bold text-[#3D2817] truncate">{v}</p>
    </div>
  );
}
