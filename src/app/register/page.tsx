"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.replace("/");
  }, [user, isLoading, router]);

  if (isLoading || user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirm) { setError("Нууц үг таарахгүй байна"); return; }
    if (form.password.length < 6) { setError("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Бүртгүүлэхэд алдаа гарлаа");
      else { login(data.user, data.token); router.push("/"); }
    } catch { setError("Сервертэй холбогдоход алдаа гарлаа"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left dark panel ── */}
      <div className="hidden lg:flex flex-1 bg-[#0A0A0A] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-orange-500/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-amber-400/10 rounded-full blur-[60px]" />
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
            Нэгдэж<br />
            <span className="gradient-text">амтыг</span><br />
            мэдрэ
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed mb-12 max-w-xs mx-auto">
            Бүртгэл үүсгэж захиалгын бүрэн боломжийг ашиглаарай. Хурдан, хялбар, үнэгүй.
          </p>
          <div className="flex flex-col gap-3 text-left max-w-xs mx-auto">
            {[
              { icon: "🎁", text: "Эхний захиалга дээр хэмнэлт" },
              { icon: "📋", text: "Захиалгын бүрэн түүх, дахин захиалах" },
              { icon: "⚡", text: "Нэг дарахад хурдан захиалга" },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-500/15 flex items-center justify-center text-base flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-zinc-400 text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
          {/* Step indicators */}
          <div className="mt-14 flex items-center justify-center gap-2">
            {[1, 2, 3].map(n => (
              <div key={n} className={`rounded-full transition-all ${n === 1 ? "w-8 h-2 bg-[#F97316]" : "w-2 h-2 bg-zinc-700"}`} />
            ))}
          </div>
          <p className="text-zinc-600 text-xs mt-3">Бүртгэл үүсгэх — 1 минут</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 lg:max-w-[520px] flex items-center justify-center px-6 py-12 bg-[#FAFAFA]">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-[#F97316] flex items-center justify-center text-xl shadow-lg shadow-orange-200">🍔</div>
              <span className="text-xl font-black text-zinc-900">FAST<span className="text-[#F97316]">FOOD</span></span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Бүртгүүлэх</h1>
            <p className="text-zinc-500 mt-2 text-sm">Шинэ данс үүсгэж захиалга хийнэ үү</p>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8">
            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm mb-6 font-medium">
                <span className="flex-shrink-0">⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Нэр</label>
                <input type="text" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field" placeholder="Таны нэр" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Имэйл хаяг</label>
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field" placeholder="example@email.com" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Нууц үг</label>
                  <input type="password" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-field" placeholder="6+ тэмдэгт" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Давтах</label>
                  <input type="password" value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    className="input-field" placeholder="••••••" required />
                </div>
              </div>

              {/* Password match indicator */}
              {form.confirm && (
                <div className={`flex items-center gap-2 text-xs font-semibold -mt-1 ${
                  form.password === form.confirm ? "text-emerald-600" : "text-red-500"
                }`}>
                  <span>{form.password === form.confirm ? "✓" : "✗"}</span>
                  {form.password === form.confirm ? "Нууц үг таарч байна" : "Нууц үг таарахгүй байна"}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full btn-lime py-3.5 font-black text-base rounded-2xl flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
                {loading
                  ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Бүртгэж байна...</>)
                  : "Бүртгүүлэх →"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-zinc-100" />
              <span className="text-zinc-400 text-xs font-semibold">эсвэл</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>

            <p className="text-center text-zinc-500 text-sm">
              Бүртгэлтэй юу?{" "}
              <Link href="/login" className="text-[#F97316] hover:text-orange-700 font-black transition-colors">
                Нэвтрэх
              </Link>
            </p>
          </div>

          <p className="text-center text-zinc-400 text-xs mt-6">
            <Link href="/" className="hover:text-zinc-600 transition-colors">← Нүүр хуудас руу буцах</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
