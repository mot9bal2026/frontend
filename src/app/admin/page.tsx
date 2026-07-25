"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Radio,
  ShieldAlert,
  Megaphone,
  EyeOff,
  LogOut,
  Loader2,
} from "lucide-react";
import { AuthError, clearToken, getMe, getToken } from "@/lib/admin";
import { presetRange, type DateRange } from "@/lib/admin-format";
import { DateRangeBar } from "@/components/admin/DateRangeBar";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { OrdersTab } from "@/components/admin/OrdersTab";
import { SourcesTab } from "@/components/admin/SourcesTab";
import { BlockedTab } from "@/components/admin/BlockedTab";
import { AdModeTab } from "@/components/admin/AdModeTab";
import { StealthModeTab } from "@/components/admin/StealthModeTab";

type TabKey = "overview" | "orders" | "sources" | "blocked" | "ad-mode" | "stealth-mode";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "نظرة عامة", icon: <LayoutDashboard size={16} /> },
  { key: "orders", label: "الطلبات", icon: <ShoppingBag size={16} /> },
  { key: "sources", label: "المصادر", icon: <Radio size={16} /> },
  { key: "blocked", label: "محاولات محظورة", icon: <ShieldAlert size={16} /> },
  { key: "ad-mode", label: "وضع الإعلان", icon: <Megaphone size={16} /> },
  { key: "stealth-mode", label: "وضع التخفي", icon: <EyeOff size={16} /> },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authState, setAuthState] = useState<"checking" | "ok">("checking");
  const [username, setUsername] = useState("");
  const [statuses, setStatuses] = useState<string[]>([]);
  const [tab, setTab] = useState<TabKey>("overview");
  const [range, setRange] = useState<DateRange>(() => presetRange("30d"));
  const [reloadKey, setReloadKey] = useState(0);

  const goLogin = useCallback(() => {
    clearToken();
    router.replace("/admin/login");
  }, [router]);

  useEffect(() => {
    if (!getToken()) {
      goLogin();
      return;
    }
    getMe()
      .then((me) => {
        setUsername(me.username);
        setStatuses(me.statuses);
        setAuthState("ok");
      })
      .catch((e) => {
        if (e instanceof AuthError) return goLogin();
        // network or server error — still let them in; tabs surface errors
        setAuthState("ok");
      });
  }, [goLogin]);

  if (authState === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0]" dir="rtl">
        <Loader2 size={30} className="animate-spin text-[#0F3024]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0]" dir="rtl">
      {/* top bar */}
      <header className="sticky top-0 z-30 bg-[#0F1A14] text-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1E5B3F] flex items-center justify-center">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <h1 className="font-black text-sm md:text-base leading-none">لوحة تحكم العوافي</h1>
              <p className="text-[11px] text-white/50 mt-0.5">{username ? `أهلاً ${username}` : "Admin"}</p>
            </div>
          </div>
          <button
            onClick={goLogin}
            className="flex items-center gap-1.5 text-[12px] font-bold bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-colors"
          >
            <LogOut size={14} /> خروج
          </button>
        </div>

        {/* tabs */}
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-2 md:px-6 flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 text-[13px] font-bold px-3.5 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  tab === t.key
                    ? "border-[#C8A876] text-white"
                    : "border-transparent text-white/55 hover:text-white"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* body */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-5 md:py-6">
        {/* Demo-data banner — only when not pointed at a real backend */}
        {!process.env.NEXT_PUBLIC_API_URL && (
          <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-300 text-amber-800 rounded-xl px-4 py-2.5 text-[12px]">
            <span className="font-black">⚠ بيانات تجريبية · Demo data</span>
            <span className="text-amber-700">
              هذه أرقام عيّنة لعرض الواجهة فقط، وليست طلباتك الحقيقية. لعرض البيانات الفعلية، وصّل اللوحة بالـ backend الحقيقي.
            </span>
          </div>
        )}

        {/* date range */}
        <div className="mb-5">
          <DateRangeBar
            range={range}
            onChange={setRange}
            onRefresh={() => setReloadKey((k) => k + 1)}
          />
        </div>

        {tab === "overview" && (
          <OverviewTab range={range} reloadKey={reloadKey} onAuthError={goLogin} />
        )}
        {tab === "orders" && (
          <OrdersTab range={range} statuses={statuses} reloadKey={reloadKey} onAuthError={goLogin} />
        )}
        {tab === "sources" && (
          <SourcesTab range={range} reloadKey={reloadKey} onAuthError={goLogin} />
        )}
        {tab === "blocked" && (
          <BlockedTab range={range} reloadKey={reloadKey} onAuthError={goLogin} />
        )}
        {tab === "ad-mode" && <AdModeTab onAuthError={goLogin} />}
        {tab === "stealth-mode" && <StealthModeTab onAuthError={goLogin} />}
      </main>
    </div>
  );
}
