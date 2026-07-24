"use client";

import { useState } from "react";
import type { SeriesPoint } from "@/lib/admin";

type Props = { series: SeriesPoint[] };

/** Combo chart: bars = valid visits (clicks), line = orders. Pure SVG, no deps. */
export function TrendChart({ series }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  if (!series.length) {
    return <div className="text-center text-sm text-[#7A6A5E] py-10">لا توجد بيانات في هذه الفترة</div>;
  }

  const W = 720;
  const H = 240;
  const padX = 36;
  const padY = 24;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  const maxVisits = Math.max(1, ...series.map((s) => s.valid_visits));
  const maxOrders = Math.max(1, ...series.map((s) => s.orders));

  const n = series.length;
  const slot = innerW / n;
  const barW = Math.max(2, Math.min(28, slot * 0.6));

  const x = (i: number) => padX + slot * i + slot / 2;
  const yVisit = (v: number) => padY + innerH - (v / maxVisits) * innerH;
  const yOrder = (v: number) => padY + innerH - (v / maxOrders) * innerH;

  const linePath = series
    .map((s, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${yOrder(s.orders).toFixed(1)}`)
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img">
        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={W - padX}
            y1={padY + innerH * t}
            y2={padY + innerH * t}
            stroke="#ECE5DA"
            strokeWidth={1}
          />
        ))}

        {/* bars: valid visits */}
        {series.map((s, i) => (
          <rect
            key={`b-${i}`}
            x={x(i) - barW / 2}
            y={yVisit(s.valid_visits)}
            width={barW}
            height={padY + innerH - yVisit(s.valid_visits)}
            rx={3}
            fill={hover === i ? "#0F3024" : "#9FC0AE"}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}

        {/* orders line */}
        <path d={linePath} fill="none" stroke="#C8A876" strokeWidth={2.5} />
        {series.map((s, i) => (
          <circle key={`o-${i}`} cx={x(i)} cy={yOrder(s.orders)} r={hover === i ? 4 : 2.5} fill="#A0640A" />
        ))}

        {/* hover tooltip */}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={padY} y2={padY + innerH} stroke="#C8A876" strokeDasharray="3 3" />
          </g>
        )}
      </svg>

      <div className="flex items-center justify-between mt-1 px-1">
        <div className="flex items-center gap-4 text-[11px] text-[#7A6A5E]">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#9FC0AE] inline-block" /> نقرات صالحة</span>
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-sm bg-[#C8A876] inline-block" /> طلبات</span>
        </div>
        {hover !== null && (
          <div className="text-[11px] text-[#0F3024] font-semibold">
            {series[hover].date} · {series[hover].valid_visits} نقرة · {series[hover].orders} طلب · {series[hover].revenue_sar} ر.س
          </div>
        )}
      </div>
    </div>
  );
}
