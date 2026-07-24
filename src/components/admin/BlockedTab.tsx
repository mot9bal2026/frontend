"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import { AuthError, getBlocked } from "@/lib/admin";
import type { DateRange } from "@/lib/admin-format";
import { fmtDateShort, fmtNumber } from "@/lib/admin-format";

type Props = { range: DateRange; reloadKey: number; onAuthError: () => void };

type BlockedRow = {
  id: string;
  created_at: string;
  phone_local: string | null;
  ip_address: string | null;
  reasons: string[] | null;
};

const REASON_LABELS: Record<string, string> = {
  not_sa_ip: "خارج السعودية",
  anonymous_ip: "IP مجهول",
  vpn: "VPN",
  public_proxy: "بروكسي عام",
  tor: "Tor",
  hosting_provider: "مزود استضافة",
  residential_proxy: "بروكسي سكني",
  high_ip_risk: "خطورة عالية",
  maxmind_unavailable: "تعذّر التحقق",
  invalid_phone: "جوال غير صحيح",
};

export function BlockedTab({ range, reloadKey, onAuthError }: Props) {
  const [rows, setRows] = useState<BlockedRow[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setPage(1);
  }, [range.from, range.to]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getBlocked(range, page)
      .then((d) => {
        if (cancelled) return;
        setRows(d.attempts);
        setPages(d.pages);
        setTotal(d.total);
      })
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof AuthError) return onAuthError();
        setError(e instanceof Error ? e.message : "تعذّر تحميل المحاولات");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range, page, reloadKey, onAuthError]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[13px] text-[#7A6A5E]">
        <ShieldAlert size={16} className="text-red-500" />
        محاولات الطلب المحظورة (احتيال، VPN، أو خارج السعودية) — هذه لا تُحتسب ضمن الطلبات أو معدل التحويل.
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-[#E6D8C8] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F2EA] text-[#7A6A5E] text-[12px]">
                <th className="px-4 py-2.5 text-right font-bold">التاريخ</th>
                <th className="px-4 py-2.5 text-right font-bold">الجوال</th>
                <th className="px-4 py-2.5 text-right font-bold">عنوان IP</th>
                <th className="px-4 py-2.5 text-right font-bold">الأسباب</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [0, 1, 2, 3].map((r) => (
                  <tr key={r} className="border-t border-[#F0EAE0]">
                    {[0, 1, 2, 3].map((c) => (
                      <td key={c} className="px-4 py-3.5"><div className="h-4 rounded bg-[#F0EAE0] animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : rows.length > 0 ? (
                rows.map((b) => (
                  <tr key={b.id} className="border-t border-[#F0EAE0] hover:bg-[#FBF7F0]">
                    <td className="px-4 py-3 text-[11px] text-[#A89A8C] whitespace-nowrap">{fmtDateShort(b.created_at)}</td>
                    <td className="px-4 py-3 font-bold text-[#0F3024] font-inter" dir="ltr">{b.phone_local || "—"}</td>
                    <td className="px-4 py-3 text-[12px] text-[#7A6A5E] font-inter" dir="ltr">{b.ip_address || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(b.reasons ?? []).map((r) => (
                          <span key={r} className="text-[11px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
                            {REASON_LABELS[r] ?? r}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-sm text-[#7A6A5E] py-12">لا توجد محاولات محظورة في هذه الفترة</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-[#7A6A5E]">{fmtNumber(total)} محاولة · صفحة {page} من {pages}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="w-9 h-9 rounded-lg border border-[#E6D8C8] bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#0F3024]"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              className="w-9 h-9 rounded-lg border border-[#E6D8C8] bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#0F3024]"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
