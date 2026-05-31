"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  Truck,
  PackageCheck,
  ShieldCheck,
  Clock,
  CheckCheck,
  MessageCircle,
  Star,
  Sparkles,
  AlertCircle,
  Heart,
  Camera,
} from "lucide-react";
import { useCartStore } from "@/store/cart";

const WHATSAPP_NUMBER = "966550000000";

export function ThankYouContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") ?? "ISH-2026-004500";
  const total = params.get("total") ?? "0";

  /* Defensive reset — guarantees the drawer can never leak onto thank-you,
     even if the user lands here via back/forward or a deep link. */
  const closeAll = useCartStore((s) => s.closeAll);
  useEffect(() => {
    closeAll();
  }, [closeAll]);

  // Extract numeric customer rank for social proof (e.g. "004523" → 4523)
  const customerRank = (() => {
    const match = orderNumber.match(/(\d+)\s*$/);
    return match ? parseInt(match[1], 10) : 4500;
  })();

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const callDeadline =
    now != null ? new Date(now.getTime() + 24 * 60 * 60 * 1000) : null;
  const hoursLeft = callDeadline ? 23 : 24;
  const minutesLeft = callDeadline
    ? 59 - (now?.getMinutes() ?? 0)
    : 0;

  const estDeliveryFrom = now ? addBusinessDays(now, 1) : null;
  const estDeliveryTo = now ? addBusinessDays(now, 3) : null;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#FBF7F0] via-white to-[#FBF7F0]"
    >
      {/* Top success ribbon */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white text-center text-xs md:text-sm py-2.5 font-semibold tracking-wide px-3">
        <span className="inline-flex items-center gap-1.5">
          <CheckCheck size={14} />
          تم استلام طلبكِ — فريقنا سيتواصل معكِ
        </span>
      </div>

      <div className="max-w-[680px] mx-auto px-4 pt-6 pb-20">
        {/* ────────────────────────────────────────────
            HERO — Success
        ──────────────────────────────────────────── */}
        <section className="text-center pt-4 pb-2">
          <div className="relative inline-flex items-center justify-center mb-4">
            <span className="absolute inline-flex w-28 h-28 rounded-full bg-emerald-200/60 animate-ping" />
            <span className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-[0_12px_32px_rgba(16,185,129,0.35)]">
              <CheckCircle2 size={56} className="text-white" strokeWidth={2.5} />
            </span>
          </div>

          <h1 className="text-[1.85rem] md:text-[2.4rem] font-black text-[#0F2A1F] leading-tight">
            تم استلام طلبكِ بنجاح
          </h1>
          <p className="text-[#3D2817]/80 text-[15px] md:text-base mt-2 max-w-md mx-auto leading-relaxed">
            شكراً لثقتكِ بـ <span className="font-black text-[#3D2817]">إشراقة</span> —
            فريقنا سيتواصل معكِ لتأكيد الطلب.
          </p>

          {/* Social proof — customer rank */}
          <div className="mt-5 inline-flex items-center gap-2.5 bg-white border border-[#E8DDCC] rounded-full pl-5 pr-3 py-2 shadow-sm">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A876] to-[#A0764B] text-white text-sm font-black flex-shrink-0">
              <Sparkles size={14} />
            </span>
            <span className="text-[13px] md:text-[14px] text-[#3D2817] font-bold leading-tight">
              أنتِ العميلة رقم
              <span className="mx-1.5 font-black font-inter text-[#A0640A] text-[15px] md:text-base">
                #{customerRank.toLocaleString("en-US")}
              </span>
              من بدأن روتين إشراقة
            </span>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            ORDER CARD — Number + Total + COD
        ──────────────────────────────────────────── */}
        <section className="mt-7 bg-white border border-[#E8DDCC] rounded-3xl shadow-[0_12px_36px_rgba(61,40,23,0.06)] overflow-hidden">
          <div className="bg-[#3D2817] text-white px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C8A876]" />
              <span className="text-[13px] font-bold tracking-wide">
                تفاصيل الطلب
              </span>
            </div>
            <span className="text-[11px] text-white/70 font-medium">
              {now ? formatDateAr(now) : "—"}
            </span>
          </div>

          <div className="p-5">
            {/* Order number */}
            <div className="bg-[#FBF7F0] border border-[#E8DDCC] rounded-2xl p-4 mb-4">
              <p className="text-[11px] text-[#7A6A5E] font-bold mb-1.5 uppercase tracking-wider">
                رقم الطلب
              </p>
              <span className="font-black text-[#3D2817] text-xl md:text-2xl font-inter tracking-wide">
                {orderNumber}
              </span>
            </div>

            {/* Total + Payment method */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E8DDCC] rounded-2xl p-3.5">
                <p className="text-[11px] text-[#7A6A5E] font-bold mb-1 uppercase tracking-wide">
                  الإجمالي
                </p>
                <p className="font-black text-[#3D2817] text-2xl font-inter leading-none">
                  {total}
                </p>
                <p className="text-[11px] text-[#7A6A5E] mt-1 font-medium">ريال سعودي</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5">
                <p className="text-[11px] text-emerald-700 font-bold mb-1 uppercase tracking-wide">
                  طريقة الدفع
                </p>
                <p className="font-black text-emerald-800 text-[15px] leading-snug">
                  الدفع عند الاستلام
                </p>
                <p className="text-[11px] text-emerald-700/90 mt-1 font-medium">
                  كاش أو شبكة
                </p>
              </div>
            </div>

            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl px-3.5 py-2.5 text-amber-900 text-[12.5px] font-semibold flex items-start gap-2">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              <span>
                لا تدفعي أي مبلغ مقدّماً. الدفع <span className="font-black">فقط</span>{" "}
                عند استلام الطلب لباب بيتكِ.
              </span>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            CALL COUNTDOWN — Trust booster
        ──────────────────────────────────────────── */}
        <section className="mt-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3D2817] via-[#4A2F1C] to-[#5A3825] text-white shadow-xl">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C8A876]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-[#C8A876] uppercase tracking-widest">
                مكالمة التأكيد
              </span>
            </div>

            <p className="font-black text-base md:text-lg leading-snug mb-3">
              فريقنا سيتصل بكِ خلال{" "}
              <span className="text-[#C8A876] font-inter">
                {hoursLeft}س {String(minutesLeft).padStart(2, "0")}د
              </span>
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 flex items-start gap-3 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#C8A876] flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-[#3D2817]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold leading-relaxed">
                  ⚡ احرصي على الرد — مكالمة سعودية من رقم محلي.
                </p>
                <p className="text-[11.5px] text-white/70 mt-1 leading-relaxed">
                  إذا لم نتمكن من الوصول إليكِ خلال 24 ساعة، الطلب يُلغى تلقائياً
                  للحفاظ على دورة الشحن.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            ORDER JOURNEY — Timeline
        ──────────────────────────────────────────── */}
        <section className="mt-5 bg-white border border-[#E8DDCC] rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-[#3D2817] text-base md:text-lg">
              رحلة طلبكِ
            </h2>
            <span className="text-[11px] text-[#7A6A5E] font-semibold bg-[#FBF7F0] px-2 py-1 rounded-full">
              4 خطوات
            </span>
          </div>

          <ol className="relative space-y-4">
            {/* Vertical line */}
            <span className="absolute right-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-300 via-[#E8DDCC] to-[#E8DDCC]" />

            <TimelineStep
              icon={<CheckCircle2 size={18} />}
              status="done"
              title="تم استلام الطلب"
              desc="طلبكِ سُجِّل بنجاح في نظامنا"
              time={now ? formatTimeAr(now) : ""}
            />
            <TimelineStep
              icon={<Phone size={18} />}
              status="active"
              title="مكالمة تأكيد"
              desc="نتأكد من العنوان والكمية معكِ"
              time="خلال 24 ساعة"
            />
            <TimelineStep
              icon={<Truck size={18} />}
              status="pending"
              title="شحن سريع"
              desc="نسلّم الطرد لشركة التوصيل خلال يوم عمل"
              time="بعد التأكيد مباشرة"
            />
            <TimelineStep
              icon={<PackageCheck size={18} />}
              status="pending"
              title="استلام ودفع"
              desc="استلمي طلبكِ ثم ادفعي للموزّع"
              time={
                estDeliveryFrom && estDeliveryTo
                  ? `${formatShortDate(estDeliveryFrom)} – ${formatShortDate(
                      estDeliveryTo
                    )}`
                  : "1–3 أيام عمل"
              }
              last
            />
          </ol>
        </section>

        {/* ────────────────────────────────────────────
            WHATSAPP — Direct support
        ──────────────────────────────────────────── */}
        <section className="mt-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `مرحباً، عندي استفسار عن طلبي رقم ${orderNumber}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#1EBE57] text-white rounded-3xl p-4 md:p-5 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all"
          >
            <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-[15px] md:text-base leading-tight">
                استفسار سريع؟ راسلينا على واتساب
              </p>
              <p className="text-[11.5px] md:text-xs text-white/85 mt-0.5">
                ردّ خلال دقائق · 7 أيام في الأسبوع
              </p>
            </div>
            <span className="text-2xl flex-shrink-0">←</span>
          </a>
        </section>

        {/* ────────────────────────────────────────────
            TIPS — Receive smoothly
        ──────────────────────────────────────────── */}
        <section className="mt-5 bg-white border border-[#E8DDCC] rounded-3xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#C8A876]" />
            <h2 className="font-black text-[#3D2817] text-base md:text-lg">
              نصائح لاستلام سلس
            </h2>
          </div>
          <ul className="space-y-2.5">
            {[
              {
                icon: <Phone size={14} className="text-emerald-600" />,
                text: "احتفظي بجوّالكِ قريباً — قد نتصل من رقم محلي للتأكيد.",
              },
              {
                icon: <Camera size={14} className="text-emerald-600" />,
                text: "خذي screenshot لرقم الطلب — يسهّل التواصل لاحقاً.",
              },
              {
                icon: <Clock size={14} className="text-emerald-600" />,
                text: "تتبّعي حالة الطلب بـ SMS من شركة التوصيل بعد الشحن.",
              },
              {
                icon: <PackageCheck size={14} className="text-emerald-600" />,
                text: "افتحي الطرد أمام المندوب وتأكدي من المحتوى قبل الدفع.",
              },
            ].map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-[#FBF7F0] rounded-2xl px-3.5 py-3 border border-[#EFE6D5]"
              >
                <span className="w-7 h-7 rounded-full bg-white border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {tip.icon}
                </span>
                <p className="text-[13px] text-[#3D2817] leading-relaxed font-medium">
                  {tip.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ────────────────────────────────────────────
            TRUST + GUARANTEE
        ──────────────────────────────────────────── */}
        <section className="mt-5 bg-gradient-to-br from-[#FBF7F0] to-white border border-[#E8DDCC] rounded-3xl p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <TrustBadge
              icon={<ShieldCheck size={18} />}
              label="ضمان 14 يوم"
              sub="استرجاع كامل"
            />
            <TrustBadge
              icon={<Heart size={18} />}
              label="حلال 100٪"
              sub="مرخّصة SFDA"
            />
            <TrustBadge
              icon={<Star size={18} />}
              label="800+ سعودية"
              sub="مرضيات بالنتيجة"
            />
          </div>
          <p className="text-center text-[12px] text-[#5A4A3E] mt-4 leading-relaxed">
            <span className="font-bold text-[#3D2817]">طلبكِ مضمون.</span> إذا لم تكوني
            راضية لأي سبب خلال 14 يوماً — راسلينا وفلوسكِ تُرجَع لكِ. بدون نماذج،
            بدون أسئلة.
          </p>
        </section>

        {/* ────────────────────────────────────────────
            FOOTER LINKS
        ──────────────────────────────────────────── */}
        <div className="mt-7 flex flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className="text-[#7A6A5E] text-sm hover:text-[#3D2817] transition-colors underline-offset-4 hover:underline"
          >
            الرجوع للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Sub-components
════════════════════════════════════════════════════ */

function TimelineStep({
  icon,
  status,
  title,
  desc,
  time,
  last,
}: {
  icon: React.ReactNode;
  status: "done" | "active" | "pending";
  title: string;
  desc: string;
  time: string;
  last?: boolean;
}) {
  const bubble =
    status === "done"
      ? "bg-emerald-500 text-white border-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
      : status === "active"
      ? "bg-white text-[#C8A876] border-[#C8A876] ring-4 ring-[#C8A876]/15"
      : "bg-white text-[#A89B89] border-[#E8DDCC]";

  return (
    <li className="flex items-start gap-3 relative">
      <div
        className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${bubble}`}
      >
        {icon}
        {status === "active" && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#C8A876]/30" />
        )}
      </div>
      <div className={`flex-1 min-w-0 ${last ? "" : "pb-1"}`}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p
            className={`font-black text-[14px] md:text-[15px] ${
              status === "pending" ? "text-[#7A6A5E]" : "text-[#3D2817]"
            }`}
          >
            {title}
          </p>
          <span className="text-[11px] text-[#7A6A5E] font-semibold bg-[#FBF7F0] px-2 py-0.5 rounded-full whitespace-nowrap">
            {time}
          </span>
        </div>
        <p className="text-[12.5px] text-[#5A4A3E] mt-0.5 leading-relaxed">
          {desc}
        </p>
      </div>
    </li>
  );
}

function TrustBadge({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="w-11 h-11 rounded-2xl bg-[#3D2817] text-[#C8A876] flex items-center justify-center shadow-sm">
        {icon}
      </span>
      <p className="font-black text-[#3D2817] text-[12.5px] leading-tight">
        {label}
      </p>
      <p className="text-[10.5px] text-[#7A6A5E] leading-tight">{sub}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Helpers
════════════════════════════════════════════════════ */

function addBusinessDays(date: Date, days: number) {
  const d = new Date(date);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 5) added++;
  }
  return d;
}

function formatDateAr(date: Date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function formatTimeAr(date: Date) {
  const h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "م" : "ص";
  const h12 = h % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function formatShortDate(date: Date) {
  const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
}

