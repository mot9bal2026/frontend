"use client";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Loader2, Gift } from "lucide-react";
import {
  AuthError,
  getOrders,
  STATUS_LABELS,
  type OrdersResponse,
} from "@/lib/admin";
import type { DateRange } from "@/lib/admin-format";
import { fmtDateShort, fmtNumber, fmtSar } from "@/lib/admin-format";
import { StatusBadge } from "./StatusBadge";
import { OrderDetailDrawer } from "./OrderDetailDrawer";

type Props = { range: DateRange; statuses: string[]; reloadKey: number; onAuthError: () => void };

const FILTERABLE_STATUSES = [
  "all",
  "new",
  "contacted",
  "confirmed",
  "shipped",
  "delivered",
  "refused",
  "returned",
  "cancelled",
];

export function OrdersTab({ range, statuses, reloadKey, onAuthError }: Props) {
  const [status, setStatus] = useState("all");
  const [includeTest, setIncludeTest] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [localReload, setLocalReload] = useState(0);

  // reset to page 1 when filters/range change
  useEffect(() => {
    setPage(1);
  }, [status, search, includeTest, range.from, range.to]);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getOrders(range, { status, search, page, page_size: 20, include_test: includeTest })
      .then((d) => !cancelled && setData(d))
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof AuthError) return onAuthError();
        setError(e instanceof Error ? e.message : "تعذّر تحميل الطلبات");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range, status, search, includeTest, page, reloadKey, localReload, onAuthError]);

  return (
    <div className="space-y-4">
      {/* filters */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERABLE_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`text-[12px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                status === s
                  ? "bg-[#0F3024] text-white border-[#0F3024]"
                  : "bg-white text-[#5A4A3E] border-[#E6D8C8] hover:border-[#0F3024]"
              }`}
            >
              {s === "all" ? "الكل" : STATUS_LABELS[s] ?? s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-[12px] text-[#5A4A3E] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeTest}
              onChange={(e) => setIncludeTest(e.target.checked)}
              className="rounded border-[#E6D8C8] text-[#0F3024] focus:ring-[#0F3024]"
            />
            إظهار الطلبات التجريبية
          </label>
          <div className="relative">
            <Search size={15} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#A89A8C]" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="بحث بالاسم، الجوال، رقم الطلب…"
              className="w-64 max-w-full rounded-xl border border-[#E6D8C8] bg-white pr-9 pl-3 py-2 text-sm focus:outline-none focus:border-[#0F3024]"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      {/* table */}
      <div className="bg-white rounded-2xl border border-[#E6D8C8] overflow-hidden shadow-sm">
        {/* desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F2EA] text-[#7A6A5E] text-[12px]">
                <Th>رقم الطلب</Th>
                <Th>العميلة</Th>
                <Th>المدينة</Th>
                <Th>القطع</Th>
                <Th>الإجمالي</Th>
                <Th>المصدر</Th>
                <Th>الحالة</Th>
                <Th>التاريخ</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows cols={8} />
              ) : data && data.orders.length > 0 ? (
                data.orders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedId(o.id)}
                    className="border-t border-[#F0EAE0] hover:bg-[#FBF7F0] cursor-pointer transition-colors"
                  >
                    <td className="px-3 py-3 font-black text-[#1A0F0A] font-inter whitespace-nowrap">
                      {o.order_number}
                      {o.is_test && <span className="mr-1 text-[10px] text-gray-400">(تجريبي)</span>}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-bold text-[#0F3024]">{o.customer_name}</p>
                      <p className="text-[11px] text-[#A89A8C] font-inter" dir="ltr">{o.phone_local}</p>
                    </td>
                    <td className="px-3 py-3 text-[#5A4A3E]">{o.city || "—"}</td>
                    <td className="px-3 py-3 text-[#5A4A3E] font-inter">
                      {fmtNumber(o.items_qty)}
                      {o.upsell_accepted && <Gift size={12} className="inline mr-1 text-[#A0640A]" />}
                    </td>
                    <td className="px-3 py-3 font-bold text-[#1E5B3F] font-inter whitespace-nowrap">{fmtSar(o.total_sar)}</td>
                    <td className="px-3 py-3 text-[12px] text-[#7A6A5E]">{o.utm_source}</td>
                    <td className="px-3 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-3 py-3 text-[11px] text-[#A89A8C] whitespace-nowrap">{fmtDateShort(o.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-sm text-[#7A6A5E] py-12">
                    <p>لا توجد طلبات مطابقة</p>
                    <p className="text-[11px] text-[#A89A8C] mt-2 max-w-md mx-auto">
                      جرّبي «اليوم» أو «آخر 30 يوم»، وتأكدي من تفعيل الطلبات التجريبية. الطلبات المحظورة تظهر في تبويب «محاولات محظورة».
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* mobile cards */}
        <div className="md:hidden divide-y divide-[#F0EAE0]">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 size={24} className="animate-spin text-[#0F3024]" />
            </div>
          ) : data && data.orders.length > 0 ? (
            data.orders.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className="w-full text-right px-4 py-3 hover:bg-[#FBF7F0] flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#1A0F0A] font-inter">{o.order_number}</span>
                  <StatusBadge status={o.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0F3024]">{o.customer_name}</span>
                  <span className="font-bold text-[#1E5B3F] font-inter">{fmtSar(o.total_sar)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#A89A8C]">
                  <span dir="ltr">{o.phone_local}</span>
                  <span>{fmtDateShort(o.created_at)}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center text-sm text-[#7A6A5E] py-12 px-4">
              <p>لا توجد طلبات مطابقة</p>
              <p className="text-[11px] text-[#A89A8C] mt-2">
                جرّبي «اليوم» أو «آخر 30 يوم»، وتأكدي من تفعيل الطلبات التجريبية.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* pagination */}
      {data && data.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-[#7A6A5E]">
            {fmtNumber(data.total)} طلب · صفحة {data.page} من {data.pages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="w-9 h-9 rounded-lg border border-[#E6D8C8] bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#0F3024]"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
              disabled={page >= data.pages}
              className="w-9 h-9 rounded-lg border border-[#E6D8C8] bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#0F3024]"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      )}

      {selectedId && (
        <OrderDetailDrawer
          orderId={selectedId}
          statuses={statuses}
          onClose={() => setSelectedId(null)}
          onSaved={() => setLocalReload((k) => k + 1)}
          onAuthError={onAuthError}
        />
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2.5 text-right font-bold">{children}</th>;
}

function SkeletonRows({ cols }: { cols: number }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((r) => (
        <tr key={r} className="border-t border-[#F0EAE0]">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-3 py-3.5">
              <div className="h-4 rounded bg-[#F0EAE0] animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
