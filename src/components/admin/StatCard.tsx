"use client";

import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  accent?: "green" | "gold" | "brown" | "blue" | "red" | "neutral";
  loading?: boolean;
};

const ACCENTS: Record<NonNullable<Props["accent"]>, string> = {
  green: "bg-[#E8F2EC] text-[#1E5B3F]",
  gold: "bg-[#F6EEDD] text-[#A0640A]",
  brown: "bg-[#F0E7DC] text-[#3D2817]",
  blue: "bg-blue-50 text-blue-700",
  red: "bg-red-50 text-red-600",
  neutral: "bg-[#F4F0EA] text-[#7A6A5E]",
};

export function StatCard({ label, value, hint, icon, accent = "neutral", loading }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-[#E6D8C8] p-4 md:p-5 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[12px] font-bold text-[#7A6A5E]">{label}</p>
        {icon && (
          <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${ACCENTS[accent]}`}>
            {icon}
          </span>
        )}
      </div>
      {loading ? (
        <div className="h-7 w-20 rounded-md bg-[#F0EAE0] animate-pulse" />
      ) : (
        <p className="text-2xl md:text-[1.7rem] font-black text-[#1A0F0A] leading-none font-inter">{value}</p>
      )}
      {hint && <p className="text-[11px] text-[#A89A8C] leading-tight">{hint}</p>}
    </div>
  );
}
