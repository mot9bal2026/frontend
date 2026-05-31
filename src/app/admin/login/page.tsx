"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2 } from "lucide-react";
import { login } from "@/lib/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username.trim(), password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذّر تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1A14] px-4" dir="rtl">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-[#E6D8C8]">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#0F3024] text-white flex items-center justify-center mx-auto mb-3">
            <Lock size={24} />
          </div>
          <h1 className="text-xl font-black text-[#1A0F0A]">لوحة تحكم إشراقة</h1>
          <p className="text-sm text-[#7A6A5E] mt-1">Admin Dashboard · دخول الإدارة</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#5A4A3E] mb-1 block">اسم المستخدم · Username</label>
            <div className="relative">
              <User size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#A89A8C]" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full rounded-xl border border-[#E6D8C8] bg-[#FBF7F0] pr-9 pl-3 py-2.5 text-sm focus:outline-none focus:border-[#0F3024]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#5A4A3E] mb-1 block">كلمة المرور · Password</label>
            <div className="relative">
              <Lock size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#A89A8C]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#E6D8C8] bg-[#FBF7F0] pr-9 pl-3 py-2.5 text-sm focus:outline-none focus:border-[#0F3024]"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F3024] text-white font-bold py-3 rounded-xl hover:bg-[#163f30] transition-colors active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
