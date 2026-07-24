"use client";

import { useEffect, useState } from "react";
import { AuthError, getSources, type SourceRow } from "@/lib/admin";
import type { DateRange } from "@/lib/admin-format";
import { fmtNumber, fmtPct, fmtSar } from "@/lib/admin-format";

type Props = { range: DateRange; reloadKey: number; onAuthError: () => void };

export function SourcesTab({ range, reloadKey, onAuthError }: Props) {
  const [rows, setRows] = useState<SourceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getSources(range)
      .then((d) => !cancelled && setRows(d.sources))
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof AuthError) return onAuthError();
        setError(e instanceof Error ? e.message : "تعذّر تحميل المصادر");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range, reloadKey, onAuthError]);

  const maxVisits = Math.max(1, ...rows.map((r) => r.valid_visits));

  return (
    <div className="space-y-4">
      <p className="text-[13px] text-[#7A6A5E]">
        أداء كل مصدر زيارات (UTM) — النقرات الصالحة من السعودية فقط، الطلبات، الإيراد، ومعدل التحويل.
      </p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-[#E6D8C8] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F2EA] text-[#7A6A5E] text-[12px]">
                <th className="px-4 py-2.5 text-right font-bold">المصدر</th>
                <th className="px-4 py-2.5 text-right font-bold">نقرات صالحة</th>
                <th className="px-4 py-2.5 text-right font-bold">طلبات</th>
                <th className="px-4 py-2.5 text-right font-bold">الإيراد</th>
                <th className="px-4 py-2.5 text-right font-bold">التحويل</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [0, 1, 2, 3].map((r) => (
                  <tr key={r} className="border-t border-[#F0EAE0]">
                    {[0, 1, 2, 3, 4].map((c) => (
                      <td key={c} className="px-4 py-3.5"><div className="h-4 rounded bg-[#F0EAE0] animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : rows.length > 0 ? (
                rows.map((s) => (
                  <tr key={s.source} className="border-t border-[#F0EAE0] hover:bg-[#FBF7F0]">
                    <td className="px-4 py-3 font-bold text-[#0F3024]">{s.source}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-inter text-[#5A4A3E] w-12">{fmtNumber(s.valid_visits)}</span>
                        <div className="flex-1 h-2 rounded-full bg-[#F0EAE0] overflow-hidden min-w-[60px] max-w-[160px]">
                          <div className="h-full bg-[#9FC0AE] rounded-full" style={{ width: `${(s.valid_visits / maxVisits) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-black text-[#1A0F0A] font-inter">{fmtNumber(s.orders)}</td>
                    <td className="px-4 py-3 font-bold text-[#1E5B3F] font-inter whitespace-nowrap">{fmtSar(s.revenue_sar)}</td>
                    <td className="px-4 py-3">
                      <span className="text-[12px] font-bold bg-[#F6EEDD] text-[#A0640A] px-2.5 py-1 rounded-full font-inter">
                        {fmtPct(s.conversion_rate)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-sm text-[#7A6A5E] py-12">لا توجد بيانات في هذه الفترة</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
