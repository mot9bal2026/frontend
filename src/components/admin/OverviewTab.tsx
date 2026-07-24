"use client";

import { useEffect, useState } from "react";
import {
  MousePointerClick,
  Users,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Receipt,
  PackageCheck,
  PhoneCall,
  Truck,
  Gift,
  ShieldAlert,
  Ban,
} from "lucide-react";
import {
  AuthError,
  getMetrics,
  getSources,
  getTimeseries,
  STATUS_COLORS,
  STATUS_LABELS,
  type Metrics,
  type SeriesPoint,
  type SourceRow,
} from "@/lib/admin";
import type { DateRange } from "@/lib/admin-format";
import { fmtNumber, fmtPct, fmtSar } from "@/lib/admin-format";
import { StatCard } from "./StatCard";
import { TrendChart } from "./TrendChart";

type Props = { range: DateRange; reloadKey: number; onAuthError: () => void };

export function OverviewTab({ range, reloadKey, onAuthError }: Props) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [series, setSeries] = useState<SeriesPoint[]>([]);
  const [sources, setSources] = useState<SourceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    Promise.all([getMetrics(range), getTimeseries(range), getSources(range)])
      .then(([m, t, s]) => {
        if (cancelled) return;
        setMetrics(m);
        setSeries(t.series);
        setSources(s.sources);
      })
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof AuthError) return onAuthError();
        setError(e instanceof Error ? e.message : "تعذّر تحميل البيانات");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range, reloadKey, onAuthError]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm">{error}</div>
    );
  }

  const v = metrics?.visits;
  const o = metrics?.orders;
  const r = metrics?.rates;
  const rev = metrics?.revenue;

  return (
    <div className="space-y-6">
      {/* Primary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          label="نقرات صالحة (KSA)"
          value={fmtNumber(v?.valid)}
          hint={`زيارات حقيقية من السعودية · بدون VPN`}
          icon={<MousePointerClick size={16} />}
          accent="green"
          loading={loading}
        />
        <StatCard
          label="زوار فريدون"
          value={fmtNumber(v?.unique_visitors)}
          hint="عملاء محتملون مختلفون"
          icon={<Users size={16} />}
          accent="blue"
          loading={loading}
        />
        <StatCard
          label="الطلبات"
          value={fmtNumber(o?.total)}
          hint="بدون الطلبات التجريبية"
          icon={<ShoppingBag size={16} />}
          accent="brown"
          loading={loading}
        />
        <StatCard
          label="معدل التحويل"
          value={fmtPct(r?.conversion_rate)}
          hint="طلبات ÷ نقرات صالحة"
          icon={<TrendingUp size={16} />}
          accent="gold"
          loading={loading}
        />
      </div>

      {/* Revenue + funnel KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          label="إجمالي الإيرادات"
          value={fmtSar(rev?.total_sar)}
          hint="قيمة كل الطلبات (COD)"
          icon={<Wallet size={16} />}
          accent="green"
          loading={loading}
        />
        <StatCard
          label="متوسط قيمة الطلب"
          value={fmtSar(rev?.aov_sar)}
          hint="AOV"
          icon={<Receipt size={16} />}
          accent="gold"
          loading={loading}
        />
        <StatCard
          label="إيراد مُسلَّم"
          value={fmtSar(rev?.delivered_sar)}
          hint="من الطلبات المسلّمة فقط"
          icon={<PackageCheck size={16} />}
          accent="brown"
          loading={loading}
        />
        <StatCard
          label="إيراد الترقية"
          value={fmtSar(rev?.upsell_sar)}
          hint={`نسبة القبول ${fmtPct(r?.upsell_take_rate)}`}
          icon={<Gift size={16} />}
          accent="neutral"
          loading={loading}
        />
      </div>

      {/* Operational KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          label="معدل التأكيد"
          value={fmtPct(r?.confirmation_rate)}
          hint="مؤكد / مشحون / مسلّم"
          icon={<PhoneCall size={16} />}
          accent="blue"
          loading={loading}
        />
        <StatCard
          label="معدل التسليم"
          value={fmtPct(r?.delivery_rate)}
          hint="طلبات تم تسليمها"
          icon={<Truck size={16} />}
          accent="green"
          loading={loading}
        />
        <StatCard
          label="VPN / بوت مفلتر"
          value={fmtNumber((v?.vpn ?? 0) + (v?.bot ?? 0))}
          hint={`VPN ${fmtNumber(v?.vpn)} · بوت ${fmtNumber(v?.bot)}`}
          icon={<ShieldAlert size={16} />}
          accent="neutral"
          loading={loading}
        />
        <StatCard
          label="طلبات محظورة"
          value={fmtNumber(o?.blocked_attempts)}
          hint="محاولات احتيال / خارج KSA"
          icon={<Ban size={16} />}
          accent="red"
          loading={loading}
        />
      </div>

      {/* Trend chart */}
      <div className="bg-white rounded-2xl border border-[#E6D8C8] p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-[#1A0F0A] text-sm md:text-base">الاتجاه اليومي · نقرات مقابل طلبات</h3>
        </div>
        {loading ? (
          <div className="h-[240px] rounded-xl bg-[#F7F2EA] animate-pulse" />
        ) : (
          <TrendChart series={series} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Status breakdown */}
        <div className="bg-white rounded-2xl border border-[#E6D8C8] p-4 md:p-6 shadow-sm">
          <h3 className="font-black text-[#1A0F0A] text-sm md:text-base mb-4">توزيع حالات الطلبات</h3>
          {loading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-8 rounded-lg bg-[#F7F2EA] animate-pulse" />
              ))}
            </div>
          ) : (
            <StatusBreakdown breakdown={o?.status_breakdown ?? {}} total={o?.total ?? 0} />
          )}
        </div>

        {/* Top sources */}
        <div className="bg-white rounded-2xl border border-[#E6D8C8] p-4 md:p-6 shadow-sm">
          <h3 className="font-black text-[#1A0F0A] text-sm md:text-base mb-4">أفضل مصادر الزيارات</h3>
          {loading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-8 rounded-lg bg-[#F7F2EA] animate-pulse" />
              ))}
            </div>
          ) : sources.length === 0 ? (
            <p className="text-sm text-[#7A6A5E] py-6 text-center">لا توجد بيانات في هذه الفترة</p>
          ) : (
            <div className="space-y-2">
              {sources.slice(0, 6).map((s) => (
                <div key={s.source} className="flex items-center justify-between gap-3 text-sm border-b border-[#F0EAE0] pb-2 last:border-0">
                  <span className="font-bold text-[#0F3024] truncate">{s.source}</span>
                  <div className="flex items-center gap-3 text-[12px] text-[#7A6A5E] flex-shrink-0 font-inter">
                    <span>{fmtNumber(s.valid_visits)} نقرة</span>
                    <span className="text-[#0F3024] font-bold">{fmtNumber(s.orders)} طلب</span>
                    <span className="text-[#1E5B3F] font-bold">{fmtPct(s.conversion_rate)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBreakdown({ breakdown, total }: { breakdown: Record<string, number>; total: number }) {
  const order = ["new", "contacted", "confirmed", "shipped", "delivered", "refused", "returned", "cancelled"];
  const entries = order.filter((k) => breakdown[k]).map((k) => [k, breakdown[k]] as const);
  if (entries.length === 0) {
    return <p className="text-sm text-[#7A6A5E] py-6 text-center">لا توجد طلبات في هذه الفترة</p>;
  }
  return (
    <div className="space-y-3">
      {entries.map(([status, count]) => {
        const pct = total ? Math.round((count / total) * 100) : 0;
        const color = STATUS_COLORS[status] ?? "bg-gray-100 text-gray-600";
        return (
          <div key={status}>
            <div className="flex items-center justify-between text-[12px] mb-1">
              <span className={`font-bold px-2 py-0.5 rounded-full ${color}`}>{STATUS_LABELS[status] ?? status}</span>
              <span className="text-[#7A6A5E] font-inter">{fmtNumber(count)} · {pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#F0EAE0] overflow-hidden">
              <div className="h-full bg-[#0F3024] rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
