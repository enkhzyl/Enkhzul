"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import MenuTab from "./MenuTab";

type Stat = {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  recentOrders: { id: number; status: string; total_price: number; created_at: string; user_name: string }[];
};

type AdminOrder = {
  id: number;
  status: string;
  total_price: number;
  total_calories: number;
  address: string;
  phone: string;
  note: string;
  created_at: string;
  user_name: string;
  user_email: string;
  items: { menu_item_name: string; quantity: number; item_price: number }[];
};

type AdminUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  order_count: number;
  total_spent: number;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: "Хүлээгдэж байна", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  confirmed:  { label: "Баталгааждсан",   color: "bg-blue-100 text-blue-700 border-blue-200" },
  preparing:  { label: "Бэлдэж байна",    color: "bg-orange-100 text-orange-700 border-orange-200" },
  ready:      { label: "Бэлэн болсон",    color: "bg-teal-100 text-teal-700 border-teal-200" },
  delivering: { label: "Хүргэж байна",    color: "bg-purple-100 text-purple-700 border-purple-200" },
  delivered:  { label: "Хүргэгдсэн",      color: "bg-green-100 text-green-700 border-green-200" },
  cancelled:  { label: "Цуцалсан",        color: "bg-red-100 text-red-700 border-red-200" },
};

const STATUS_FLOW = ["pending", "confirmed", "preparing", "ready", "delivering", "delivered"];

function formatPrice(p: number) {
  return p.toLocaleString("mn-MN") + "₮";
}
function formatDate(d: string) {
  return new Date(d).toLocaleString("mn-MN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"dashboard" | "orders" | "users" | "menu">("dashboard");
  const [stats, setStats] = useState<Stat | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/admin/stats", { headers: authHeader });
    if (res.ok) setStats(await res.json());
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoadingData(true);
    const res = await fetch("/api/admin/orders", { headers: authHeader });
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
    }
    setLoadingData(false);
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoadingData(true);
    const res = await fetch("/api/admin/users", { headers: authHeader });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    if (tab === "dashboard") fetchStats();
    else if (tab === "orders") fetchOrders();
    else if (tab === "users") fetchUsers();
  }, [tab, user]);

  const updateStatus = async (orderId: number, status: string) => {
    setUpdating(orderId);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    }
    setUpdating(null);
  };

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredOrders = statusFilter === "all" ? orders : orders.filter(o => o.status === statusFilter);

  const TABS = [
    { id: "dashboard", label: "📊 Хяналт" },
    { id: "orders",    label: "📋 Захиалга" },
    { id: "menu",      label: "🍔 Цэс" },
    { id: "users",     label: "👥 Хэрэглэгч" },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-[62px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h1 className="font-black text-zinc-900 text-lg leading-none">Admin панель</h1>
                <p className="text-xs text-zinc-400 font-medium">FastFood удирдлагын хэсэг</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    tab === t.id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── DASHBOARD ─────────────────────────────────── */}
        {tab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Нийт захиалга",  value: stats?.totalOrders  ?? "—", icon: "📋", color: "from-blue-50 to-blue-100",    text: "text-blue-700" },
                { label: "Хэрэглэгч",      value: stats?.totalUsers   ?? "—", icon: "👥", color: "from-purple-50 to-purple-100", text: "text-purple-700" },
                { label: "Нийт орлого",    value: stats ? formatPrice(stats.totalRevenue) : "—", icon: "💰", color: "from-green-50 to-green-100",  text: "text-green-700" },
                { label: "Хүлээгдэж байна",value: stats?.pendingOrders ?? "—", icon: "⏳", color: "from-orange-50 to-orange-100", text: "text-orange-700" },
              ].map(s => (
                <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 border border-white`}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className={`text-2xl font-black ${s.text}`}>{s.value}</p>
                  <p className="text-xs text-zinc-500 font-semibold mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="font-black text-zinc-900">Сүүлийн захиалгууд</h2>
                <button onClick={() => setTab("orders")}
                  className="text-xs text-[#F97316] font-bold hover:underline">Бүгдийг харах →</button>
              </div>
              <div className="divide-y divide-zinc-50">
                {stats?.recentOrders.map(o => (
                  <div key={o.id} className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-sm font-black text-orange-600">
                        #{o.id}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-zinc-900">{o.user_name}</p>
                        <p className="text-xs text-zinc-400">{formatDate(o.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${STATUS_LABELS[o.status]?.color}`}>
                        {STATUS_LABELS[o.status]?.label}
                      </span>
                      <span className="font-black text-sm text-zinc-900">{formatPrice(o.total_price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ─────────────────────────────────────── */}
        {tab === "orders" && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {["all", ...Object.keys(STATUS_LABELS)].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                    statusFilter === s
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  }`}>
                  {s === "all" ? "📋 Бүгд" : STATUS_LABELS[s]?.label}
                  {s !== "all" && (
                    <span className="ml-1 opacity-60">
                      ({orders.filter(o => o.status === s).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {loadingData ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                    <div
                      className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-zinc-50 transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center font-black text-orange-600">
                          #{order.id}
                        </div>
                        <div>
                          <p className="font-black text-zinc-900 text-sm">{order.user_name}</p>
                          <p className="text-xs text-zinc-400">{order.user_email} · {formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${STATUS_LABELS[order.status]?.color}`}>
                          {STATUS_LABELS[order.status]?.label}
                        </span>
                        <span className="font-black text-zinc-900">{formatPrice(order.total_price)}</span>
                        <span className="text-zinc-400 text-sm">{expandedOrder === order.id ? "▲" : "▾"}</span>
                      </div>
                    </div>

                    {expandedOrder === order.id && (
                      <div className="border-t border-zinc-100 px-5 py-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="bg-zinc-50 rounded-xl p-3">
                            <p className="text-xs text-zinc-400 font-semibold mb-1">📍 Хаяг</p>
                            <p className="font-semibold text-zinc-800">{order.address || "—"}</p>
                          </div>
                          <div className="bg-zinc-50 rounded-xl p-3">
                            <p className="text-xs text-zinc-400 font-semibold mb-1">📞 Утас</p>
                            <p className="font-semibold text-zinc-800">{order.phone || "—"}</p>
                          </div>
                          <div className="bg-zinc-50 rounded-xl p-3">
                            <p className="text-xs text-zinc-400 font-semibold mb-1">📝 Тэмдэглэл</p>
                            <p className="font-semibold text-zinc-800">{order.note || "—"}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">Захиалсан хоол</p>
                          <div className="space-y-1.5">
                            {order.items?.filter(Boolean).map((item, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-zinc-700 font-semibold">
                                  {item.quantity}× {item.menu_item_name}
                                </span>
                                <span className="text-zinc-900 font-black">{formatPrice(item.item_price)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-zinc-100 flex justify-between">
                            <span className="text-sm font-bold text-zinc-600">Нийт дүн</span>
                            <span className="font-black text-[#F97316]">{formatPrice(order.total_price)}</span>
                          </div>
                        </div>

                        {order.status !== "delivered" && order.status !== "cancelled" && (
                          <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2">Статус шинэчлэх</p>
                            <div className="flex gap-2 flex-wrap">
                              {STATUS_FLOW.filter(s => s !== order.status).map(s => (
                                <button key={s}
                                  onClick={() => updateStatus(order.id, s)}
                                  disabled={updating === order.id}
                                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all disabled:opacity-50 ${STATUS_LABELS[s]?.color} hover:opacity-80`}>
                                  {updating === order.id ? "..." : STATUS_LABELS[s]?.label}
                                </button>
                              ))}
                              <button
                                onClick={() => updateStatus(order.id, "cancelled")}
                                disabled={updating === order.id}
                                className="px-3 py-1.5 text-xs font-bold rounded-xl border bg-red-50 text-red-600 border-red-200 hover:opacity-80 disabled:opacity-50">
                                Цуцлах
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {filteredOrders.length === 0 && (
                  <div className="text-center py-20 text-zinc-400">
                    <p className="text-4xl mb-3">📭</p>
                    <p className="font-bold">Захиалга олдсонгүй</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── MENU ───────────────────────────────────────── */}
        {tab === "menu" && <MenuTab token={token} />}

        {/* ── USERS ──────────────────────────────────────── */}
        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100">
              <h2 className="font-black text-zinc-900">Бүртгэлтэй хэрэглэгчид</h2>
              <p className="text-xs text-zinc-400 mt-0.5">{users.length} хэрэглэгч</p>
            </div>
            {loadingData ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="divide-y divide-zinc-50">
                {users.map(u => (
                  <div key={u.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-sm ${
                        u.role === "admin" ? "bg-gradient-to-br from-red-400 to-red-600" : "bg-gradient-to-br from-orange-400 to-[#F97316]"
                      }`}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-zinc-900 text-sm">{u.name}</p>
                          {u.role === "admin" && (
                            <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">ADMIN</span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400">{u.email} · {u.phone || "—"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm text-zinc-900">{formatPrice(Number(u.total_spent))}</p>
                      <p className="text-xs text-zinc-400">{u.order_count} захиалга · {formatDate(u.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
