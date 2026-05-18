"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [form, setForm]   = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.replace("/");
  }, [user, isLoading, router]);

  if (isLoading || user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Нэвтрэхэд алдаа гарлаа");
      else { login(data.user, data.token); router.push("/"); }
    } catch { setError("Сервертэй холбогдоход алдаа гарлаа"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel (decorative) ── */}
      <div className="hidden lg:flex flex-1 bg-[#0A0A0A] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-orange-500/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-orange-400/10 rounded-full blur-[60px]" />
        <div className="relative z-10 px-16 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-14 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-[#F97316] flex items-center justify-center text-2xl shadow-xl shadow-orange-900/40 group-hover:scale-105 transition-transform">
              🍔
            </div>
            <span className="text-2xl font-black text-white">
              FAST<span className="text-[#F97316]">FOOD</span>
            </span>
          </Link>
          <h2 className="text-4xl font-black text-white leading-tight mb-5 tracking-tight">
            Хамгийн<br />
            <span className="gradient-text">амттай</span><br />
            хоол
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed mb-12 max-w-xs mx-auto">
            Бургер, Пицца, Рап, Бурритто — орцоо сонгоод хаалган дээр хүргүүлэх онлайн систем.
          </p>
          {/* Feature list */}
          <div className="flex flex-col gap-3 text-left max-w-xs mx-auto">
            {[
              { icon: "⚡", text: "30 минутын хурдан хүргэлт" },
              { icon: "🎯", text: "Орцоо өөрөө бүрдүүлэх боломж" },
              { icon: "📋", text: "Захиалгын бүрэн түүх" },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-500/15 flex items-center justify-center text-base flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-zinc-400 text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 lg:max-w-[480px] flex items-center justify-center px-6 py-16 bg-[#FAFAFA]">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-[#F97316] flex items-center justify-center text-xl shadow-lg shadow-orange-200">
                🍔
              </div>
              <span className="text-xl font-black text-zinc-900">FAST<span className="text-[#F97316]">FOOD</span></span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Нэвтрэх</h1>
            <p className="text-zinc-500 mt-2 text-sm">Захиалга хийхийн тулд нэвтэрнэ үү</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8">

            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm mb-6 font-medium">
                <span className="flex-shrink-0">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Имэйл хаяг</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Нууц үг</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-lime py-3.5 font-black text-base rounded-2xl flex items-center justify-center gap-2 mt-1 disabled:opacity-50">
                {loading
                  ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Нэвтэрч байна...</>)
                  : "Нэвтрэх →"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-zinc-100" />
              <span className="text-zinc-400 text-xs font-semibold">эсвэл</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>

            <p className="text-center text-zinc-500 text-sm">
              Бүртгэл байхгүй юу?{" "}
              <Link href="/register" className="text-[#F97316] hover:text-orange-700 font-black transition-colors">
                Бүртгүүлэх
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-5 p-4 bg-zinc-100 rounded-2xl">
            <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-2.5">Туршилтын данс</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setForm({ email: "bold@gmail.com", password: "test123" })}
                className="text-xs bg-white border border-zinc-200 hover:border-orange-300 hover:text-[#F97316] text-zinc-600 font-bold px-3 py-2 rounded-xl transition-all text-left">
                <span className="block text-[10px] text-zinc-400 mb-0.5">Хэрэглэгч</span>
                bold@gmail.com
              </button>
              <button
                onClick={() => setForm({ email: "admin@fastfood.mn", password: "admin123" })}
                className="text-xs bg-white border border-zinc-200 hover:border-purple-300 hover:text-purple-600 text-zinc-600 font-bold px-3 py-2 rounded-xl transition-all text-left">
                <span className="block text-[10px] text-zinc-400 mb-0.5">Админ</span>
                admin@fastfood.mn
              </button>
            </div>
          </div>

          <p className="text-center text-zinc-400 text-xs mt-6">
            <Link href="/" className="hover:text-zinc-600 transition-colors">← Нүүр хуудас руу буцах</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
