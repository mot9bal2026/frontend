"use client";

import { useState } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";
import { PRESETS, presetRange, type DateRange, type PresetKey } from "@/lib/admin-format";

type Props = {
  range: DateRange;
  onChange: (r: DateRange) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
};

export function DateRangeBar({ range, onChange, onRefresh, refreshing }: Props) {
  const [custom, setCustom] = useState(false);

  function applyPreset(key: PresetKey) {
    setCustom(false);
    onChange(presetRange(key));
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {PRESETS.map((p) => {
          const r = presetRange(p.key);
          const active = !custom && r.from === range.from && r.to === range.to;
          return (
            <button
              key={p.key}
              onClick={() => applyPreset(p.key)}
              className={`text-[12px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                active
                  ? "bg-[#0F3024] text-white border-[#0F3024]"
                  : "bg-white text-[#5A4A3E] border-[#E6D8C8] hover:border-[#0F3024]"
              }`}
            >
              {p.label}
            </button>
          );
        })}
        <button
          onClick={() => setCustom((v) => !v)}
          className={`text-[12px] font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
            custom
              ? "bg-[#0F3024] text-white border-[#0F3024]"
              : "bg-white text-[#5A4A3E] border-[#E6D8C8] hover:border-[#0F3024]"
          }`}
        >
          <CalendarDays size={13} /> مخصص
        </button>
      </div>

      {custom && (
        <div className="flex items-center gap-2 bg-white border border-[#E6D8C8] rounded-lg px-2.5 py-1.5">
          <input
            type="date"
            value={range.from}
            max={range.to}
            onChange={(e) => onChange({ ...range, from: e.target.value })}
            className="text-[12px] text-[#0F3024] bg-transparent focus:outline-none font-inter"
          />
          <span className="text-[#A89A8C] text-xs">←</span>
          <input
            type="date"
            value={range.to}
            min={range.from}
            onChange={(e) => onChange({ ...range, to: e.target.value })}
            className="text-[12px] text-[#0F3024] bg-transparent focus:outline-none font-inter"
          />
        </div>
      )}

      {onRefresh && (
        <button
          onClick={onRefresh}
          className="text-[12px] font-bold px-2.5 py-1.5 rounded-lg border border-[#E6D8C8] bg-white text-[#5A4A3E] hover:border-[#0F3024] flex items-center gap-1.5"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} /> تحديث
        </button>
      )}
    </div>
  );
}
