"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Order {
  id: number | string;
  total_price: number;
  total_calories: number;
  address: string;
  phone: string;
  note?: string;
  status: string;
  created_at: string;
}

const STATUS_STEPS = [
  { key: "pending",    emoji: "🕐", label: "Хүлээн авлаа" },
  { key: "preparing", emoji: "👨‍🍳", label: "Бэлтгэж байна" },
  { key: "delivering",emoji: "🛵",  label: "Хүргэлтэнд гарсан" },
  { key: "delivered", emoji: "✅",  label: "Хүргэгдсэн" },
];

const STATUS_STYLE: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  pending:    { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  badge: "bg-amber-100 text-amber-700" },
  preparing:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   badge: "bg-blue-100 text-blue-700" },
  delivering: { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
  delivered:  { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",badge: "bg-emerald-100 text-emerald-700" },
  cancelled:  { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",    badge: "bg-red-100 text-red-600" },
};

function getStepIndex(status: string) {
  return STATUS_STEPS.findIndex(s => s.key === status);
}

function getStyle(status: string) {
  return STATUS_STYLE[status] || STATUS_STYLE.pending;
}

function getStatusLabel(status: string) {
  return STATUS_STEPS.find(s => s.key === status)?.label || (status === "cancelled" ? "Цуцлагдсан" : "Хүлээн авлаа");
}

function getStatusEmoji(status: string) {
  return STATUS_STEPS.find(s => s.key === status)?.emoji || (status === "cancelled" ? "❌" : "🕐");
}

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    const token = localStorage.getItem("token");
    fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        const apiOrders: Order[] = d.orders || [];
        try {
          const userKey = `local_orders_${user?.id || "guest"}`;
          const local: Order[] = JSON.parse(localStorage.getItem(userKey) || "[]");
          const merged = [...apiOrders];
          for (const lo of local) {
            if (!merged.find((o) => String(o.id) === String(lo.id))) merged.push(lo);
          }
          merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setOrders(merged);
        } catch { setOrders(apiOrders); }
      })
      .catch(() => {
        try {
          const userKey = `local_orders_${user?.id || "guest"}`;
          const local: Order[] = JSON.parse(localStorage.getItem(userKey) || "[]");
          setOrders(local);
        } catch { setOrders([]); }
      })
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  const totalSpent = orders.reduce((s, o) => s + Number(o.total_price), 0);
  const delivered  = orders.filter(o => o.status === "delivered").length;
  const active     = orders.filter(o => ["pending","preparing","delivering"].includes(o.status)).length;

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-black text-[#F97316] uppercase tracking-widest mb-1">Захиалга</p>
            <h1 className="text-4xl font-black text-zinc-900">Миний захиалгууд</h1>
            <p className="text-zinc-400 text-sm mt-1">Захиалгын түүх болон явцыг харна уу</p>
          </div>
          <Link href="/menu" className="btn-lime px-4 py-2.5 rounded-xl font-black text-sm flex items-center gap-1.5 shadow-md shadow-orange-200">
            + Шинэ захиалга
          </Link>
        </div>

        {/* Stats row */}
        {!loading && orders.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Нийт захиалга", value: orders.length, icon: "📋", color: "text-zinc-800" },
              { label: "Хүргэгдсэн",    value: delivered,     icon: "✅", color: "text-emerald-600" },
              { label: "Нийт зарцуулсан", value: `${totalSpent.toLocaleString()}₮`, icon: "💳", color: "text-[#F97316]" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                <p className="text-zinc-400 text-[11px] font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Active badge */}
        {active > 0 && (
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 mb-4">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            <p className="text-sm font-black text-[#F97316]">{active} захиалга явагдаж байна</p>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center py-24 gap-3">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-[#F97316] rounded-full animate-spin" />
            <p className="text-zinc-400 text-sm font-semibold">Ачааллаж байна...</p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-3xl p-14 text-center shadow-sm border border-zinc-100">
            <div className="w-20 h-20 bg-orange-50 border-2 border-orange-100 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5">📋</div>
            <p className="text-xl font-black text-zinc-900 mb-2">Захиалга байхгүй байна</p>
            <p className="text-zinc-400 text-sm mb-7">Анхны захиалгаа хийж үзээрэй</p>
            <Link href="/menu" className="btn-lime inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm shadow-md shadow-orange-200">
              🍔 Меню үзэх →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const style     = getStyle(order.status);
              const stepIndex = getStepIndex(order.status);
              const isExpanded = expandedId === order.id;
              const isActive   = ["pending","preparing","delivering"].includes(order.status);

              return (
                <div key={order.id} className={`rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 ${style.border} bg-white`}>

                  {/* Colored top strip */}
                  <div className={`h-1.5 w-full ${
                    order.status === "delivered"  ? "bg-emerald-400" :
                    order.status === "preparing"  ? "bg-blue-400" :
                    order.status === "delivering" ? "bg-violet-400" :
                    order.status === "cancelled"  ? "bg-red-400" :
                    "bg-amber-400"
                  }`} />

                  <div className="p-5">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${style.bg} border ${style.border}`}>
                          {getStatusEmoji(order.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-zinc-900">Захиалга #{order.id}</span>
                            <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${style.badge}`}>
                              {getStatusLabel(order.status)}
                            </span>
                            {isActive && <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full animate-pulse" />}
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5 font-medium">
                            {new Date(order.created_at).toLocaleString("mn-MN")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-black text-[#F97316] text-xl">{Number(order.total_price).toLocaleString()}₮</p>
                        {order.total_calories > 0 && (
                          <p className="text-[11px] text-zinc-400 font-medium">🔥 {order.total_calories} ккал</p>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    {order.status !== "cancelled" && (
                      <div className="mb-4">
                        <div className="flex gap-1 mb-2">
                          {STATUS_STEPS.map((s, i) => (
                            <div key={s.key} className={`flex-1 h-2 rounded-full transition-all duration-700 ${
                              i < stepIndex  ? "bg-[#F97316]" :
                              i === stepIndex ? "bg-[#F97316] opacity-50 animate-pulse" :
                              "bg-zinc-100"
                            }`} />
                          ))}
                        </div>
                        <div className="flex justify-between">
                          {STATUS_STEPS.map((s, i) => (
                            <div key={s.key} className="flex flex-col items-center gap-0.5">
                              <span className={`text-base ${i <= stepIndex ? "opacity-100" : "opacity-20"}`}>{s.emoji}</span>
                              <span className={`text-[9px] font-black hidden sm:block ${i <= stepIndex ? "text-zinc-600" : "text-zinc-300"}`}>
                                {s.label.split(" ")[0]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Info row + expand */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      className="w-full flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-600 transition-colors pt-3 border-t border-zinc-50"
                    >
                      <span className="flex items-center gap-3 flex-wrap text-left">
                        <span className="flex items-center gap-1">📍 <span className="truncate max-w-[140px]">{order.address}</span></span>
                        <span className="text-zinc-200">·</span>
                        <span>📞 {order.phone}</span>
                      </span>
                      <span className={`ml-2 text-xs font-black transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} text-zinc-300`}>▼</span>
                    </button>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-zinc-50 space-y-4">
                        {/* Step detail */}
                        <div>
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Захиалгын явц</p>
                          <div className="flex flex-col gap-2">
                            {STATUS_STEPS.map((step, i) => {
                              const done   = i < stepIndex;
                              const active = i === stepIndex;
                              return (
                                <div key={step.key} className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 border-2 transition-all ${
                                    done   ? "bg-emerald-50 border-emerald-200" :
                                    active ? "bg-[#F97316] border-[#F97316] shadow-md shadow-orange-200 scale-110" :
                                    "bg-zinc-50 border-zinc-100"
                                  }`}>
                                    {done ? "✓" : step.emoji}
                                  </div>
                                  <span className={`text-xs font-bold ${done || active ? "text-zinc-800" : "text-zinc-300"}`}>
                                    {step.label}
                                    {active && <span className="ml-2 text-[#F97316] text-[10px] animate-pulse">● Одоо</span>}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Note */}
                        {order.note && (
                          <div className="bg-zinc-50 rounded-xl px-4 py-3">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Тэмдэглэл</p>
                            <p className="text-xs text-zinc-600">{order.note}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
