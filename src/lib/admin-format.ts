// Shared formatting + date helpers for the admin dashboard.
// All "calendar days" are interpreted in Asia/Riyadh to match the backend.

const RIYADH_TZ = "Asia/Riyadh";

/** YYYY-MM-DD for a Date as seen in Riyadh local time. */
export function toRiyadhDateStr(d: Date): string {
  // en-CA gives ISO-style YYYY-MM-DD; force Latin digits + Riyadh tz.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: RIYADH_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** Today as YYYY-MM-DD in Riyadh. */
export function riyadhToday(): string {
  return toRiyadhDateStr(new Date());
}

/** Shift a YYYY-MM-DD string by N days (calendar math, tz-safe). */
export function shiftDate(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

export type DateRange = { from: string; to: string };

export type PresetKey = "today" | "yesterday" | "7d" | "30d" | "90d" | "month";

export const PRESETS: { key: PresetKey; label: string }[] = [
  { key: "today", label: "اليوم" },
  { key: "yesterday", label: "أمس" },
  { key: "7d", label: "آخر 7 أيام" },
  { key: "30d", label: "آخر 30 يوم" },
  { key: "90d", label: "آخر 90 يوم" },
  { key: "month", label: "هذا الشهر" },
];

export function presetRange(key: PresetKey): DateRange {
  const today = riyadhToday();
  switch (key) {
    case "today":
      return { from: today, to: today };
    case "yesterday": {
      const y = shiftDate(today, -1);
      return { from: y, to: y };
    }
    case "7d":
      return { from: shiftDate(today, -6), to: today };
    case "30d":
      return { from: shiftDate(today, -29), to: today };
    case "90d":
      return { from: shiftDate(today, -89), to: today };
    case "month":
      return { from: today.slice(0, 8) + "01", to: today };
    default:
      return { from: shiftDate(today, -29), to: today };
  }
}

// ── Number / currency formatting (Latin digits, Arabic-friendly) ──
const numberFmt = new Intl.NumberFormat("en-US");

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  return numberFmt.format(n);
}

export function fmtSar(n: number | null | undefined): string {
  return `${fmtNumber(Math.round((n ?? 0) as number))} ر.س`;
}

export function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "0%";
  return `${n}%`;
}

/** "12 مايو 2026 · 3:45 م" rendered in Riyadh time. */
export function fmtDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const date = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    timeZone: RIYADH_TZ,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    timeZone: RIYADH_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
  return `${date} · ${time}`;
}

export function fmtDateShort(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    timeZone: RIYADH_TZ,
    day: "2-digit",
    month: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

/** Saudi local phone (05XXXXXXXX) → wa.me link using +966 form. */
export function whatsappLink(phoneLocal: string): string {
  const digits = phoneLocal.replace(/\D/g, "");
  const intl = digits.startsWith("0") ? "966" + digits.slice(1) : digits;
  return `https://wa.me/${intl}`;
}
