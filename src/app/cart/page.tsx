"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ORDER_STEPS = [
  { key: "pending",    icon: "✓",  label: "Захиалга хүлээн авлаа",  sub: "Таны захиалгыг баталгаажууллаа",          delay: 0     },
  { key: "preparing", icon: "👨‍🍳", label: "Бэлтгэж байна",          sub: "Тогооч таны хоолыг хийж эхэллээ",        delay: 4000  },
  { key: "delivering",icon: "🛵",  label: "Хүргэлтэнд гарсан",      sub: "Жолооч таны захиалга авч яваа",           delay: 9000  },
  { key: "delivered", icon: "🏠",  label: "Хүргэгдлээ!",            sub: "Таны захиалга хүрлээ. Сайхан хооллоорой!", delay: 16000 },
];

function OrderSuccessTracker({ orderId }: { orderId: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = ORDER_STEPS.slice(1).map((step, i) =>
      setTimeout(() => setCurrentStep(i + 1), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const isDone = currentStep === ORDER_STEPS.length - 1;

  return (
    <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md fade-in">

        {/* Success icon */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg transition-all duration-500 ${
            isDone ? "bg-emerald-500 shadow-emerald-200" : "bg-[#F97316] shadow-orange-200"
          }`}>
            {isDone ? "🎉" : "🍔"}
          </div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">
            {isDone ? "Амттай хооллоорой!" : "Захиалга хийгдлээ!"}
          </h1>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold">
            <span className="text-zinc-500">Дугаар:</span>
            <span className="text-[#F97316]">#{orderId}</span>
          </div>
        </div>

        {/* Tracker card */}
        <div className="bg-white rounded-3xl shadow-lg shadow-zinc-100 p-6 mb-4 border border-zinc-100">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-5">Захиалгын явц</p>
          {ORDER_STEPS.map((step, i) => {
            const done   = i < currentStep;
            const active = i === currentStep;
            const ahead  = i > currentStep;
            return (
              <div key={step.key} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-500 flex-shrink-0 border-2 ${
                    done   ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                    active ? "bg-[#F97316] text-white border-[#F97316] shadow-md shadow-orange-200 scale-110" :
                             "bg-zinc-50 text-zinc-300 border-zinc-100"
                  }`}>
                    {done ? "✓" : <span className={active ? "animate-pulse" : ""}>{step.icon}</span>}
                  </div>
                  {i < ORDER_STEPS.length - 1 && (
                    <div className={`w-0.5 h-7 my-1 rounded-full transition-all duration-700 ${done ? "bg-emerald-200" : "bg-zinc-100"}`} />
                  )}
                </div>
                <div className={`pb-5 pt-1 transition-all duration-300 ${ahead ? "opacity-30" : ""}`}>
                  <p className={`font-black text-sm leading-tight ${active ? "text-[#F97316]" : done ? "text-zinc-900" : "text-zinc-400"}`}>
                    {step.label}
                    {active && <span className="ml-2 text-[10px] text-zinc-400 font-normal animate-pulse">● явагдаж байна</span>}
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">{step.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ETA */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-4 flex items-center gap-4">
          <div className="w-11 h-11 bg-white border border-orange-100 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm">🕐</div>
          <div>
            <p className="text-zinc-500 text-xs font-semibold">Хүргэлтийн хугацаа</p>
            <p className="text-[#F97316] font-black text-xl leading-tight">~25–35 минут</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/orders"
            className="flex-1 btn-outline py-3 rounded-2xl font-black text-sm text-center flex items-center justify-center gap-2">
            📋 Захиалга харах
          </Link>
          <Link href="/menu"
            className="flex-1 btn-lime py-3 rounded-2xl font-black text-sm text-center flex items-center justify-center gap-2">
            🍔 Дахин захиалах
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalCalories } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [address, setAddress]  = useState("");
  const [phone, setPhone]      = useState("");
  const [note, setNote]        = useState("");
  const [loading, setLoading]  = useState(false);
  const [orderId, setOrderId]  = useState<string | null>(null);
  const [error, setError]      = useState("");

  const deliveryFee = items.length > 0 ? 2000 : 0;
  const finalTotal  = totalPrice + deliveryFee;

  const handleOrder = async () => {
    if (!user)            { router.push("/login"); return; }
    if (!address.trim())  { setError("Хүргэлтийн хаягаа оруулна уу"); return; }
    if (!phone.trim())    { setError("Утасны дугаараа оруулна уу"); return; }
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items, address, phone, note, totalPrice: finalTotal, totalCalories }),
      });
      if (res.ok) {
        const data = await res.json();
        // LocalStorage-д хадгална (DB demo горим болон түүх харуулахад)
        try {
          const userKey = `local_orders_${user?.id || "guest"}`;
          const saved = JSON.parse(localStorage.getItem(userKey) || "[]");
          saved.unshift({
            id: data.orderId || `demo-${Date.now()}`,
            total_price: finalTotal,
            total_calories: totalCalories,
            address,
            phone,
            note: note || "",
            status: "pending",
            created_at: new Date().toISOString(),
          });
          localStorage.setItem(userKey, JSON.stringify(saved.slice(0, 50)));
        } catch {}
        clearCart();
        setOrderId(String(data.orderId || "demo"));
      } else {
        const data = await res.json();
        setError(data.error || "Захиалга хийхэд алдаа гарлаа");
      }
    } catch {
      setError("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) return <OrderSuccessTracker orderId={orderId} />;

  // ── Empty state ──────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center px-4">
        <div className="text-center max-w-sm fade-in">
          <div className="w-28 h-28 bg-white border border-orange-100 rounded-3xl flex items-center justify-center text-6xl mx-auto mb-7 shadow-md">
            🛒
          </div>
          <h1 className="text-3xl font-black text-zinc-900 mb-3 tracking-tight">Сагс хоосон байна</h1>
          <p className="text-zinc-400 text-base mb-8 leading-relaxed">
            Менюнээс дуртай хоолоо сонгоод энд нэмэерэй
          </p>
          <Link href="/menu" className="btn-lime inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-base shadow-md shadow-orange-200">
            🍔 Меню үзэх →
          </Link>
        </div>
      </div>
    );
  }

  // ── Cart ─────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#FFF7ED] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Page header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-1">Захиалга</p>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Миний Сагс</h1>
          </div>
          <span className="bg-[#F97316] text-white text-sm font-black px-3.5 py-1.5 rounded-full">
            {items.reduce((s, i) => s + i.quantity, 0)} зүйл
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Item list ─────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow p-4 fade-in">
                <div className="flex gap-4">

                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                    <Image
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      fill className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black text-zinc-900 text-sm leading-tight">{item.menuItem.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg bg-zinc-50 hover:bg-red-50 text-zinc-300 hover:text-red-400 transition-colors text-xs"
                        aria-label="Устгах"
                      >✕</button>
                    </div>

                    {/* Selected ingredients */}
                    {item.selectedIngredients.length > 0 && (
                      <div className="mt-1.5 space-y-0.5">
                        {item.selectedIngredients.map((g) => (
                          <p key={g.groupId} className="text-[11px] text-zinc-400 leading-tight">
                            <span className="text-zinc-500 font-medium">{g.groupName}:</span>{" "}
                            {g.options.map((o) => o.name).join(", ")}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Qty + price row */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-zinc-50">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 bg-zinc-50 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-white border border-zinc-200 hover:bg-zinc-100 rounded-lg font-bold text-zinc-600 transition-colors text-sm"
                        >−</button>
                        <span className="font-black text-zinc-900 w-5 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 btn-lime rounded-lg flex items-center justify-center font-black text-sm"
                        >+</button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-black text-[#F97316] text-base">
                          {(item.totalPrice * item.quantity).toLocaleString()}<span className="text-xs text-zinc-400 ml-0.5">₮</span>
                        </p>
                        <p className="text-[10px] text-zinc-400">{item.totalCalories * item.quantity} ккал</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="text-zinc-400 hover:text-red-400 text-xs font-semibold transition-colors self-start flex items-center gap-1.5 mt-1 px-2 py-1 rounded-lg hover:bg-red-50"
            >
              🗑 Сагс цэвэрлэх
            </button>
          </div>

          {/* ── Right: Checkout panel ────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 sticky top-24">

              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-5">Захиалгын мэдээлэл</p>

              {/* Form */}
              <div className="flex flex-col gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1.5 flex items-center gap-1">
                    📍 Хүргэлтийн хаяг
                    <span className="text-red-400 text-xs">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field text-sm"
                    placeholder="Дүүрэг, хороо, байр, тоот..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1.5 flex items-center gap-1">
                    📞 Утасны дугаар
                    <span className="text-red-400 text-xs">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field text-sm"
                    placeholder="9999-8888"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1.5">
                    💬 Нэмэлт хүсэлт
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="input-field text-sm resize-none"
                    rows={2}
                    placeholder="Тогооч болон жолоочид мессеж..."
                  />
                </div>
              </div>

              {/* Price breakdown */}
              <div className="bg-zinc-50 rounded-2xl p-4 mb-4">
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-sm">Хоолны үнэ</span>
                    <span className="text-zinc-800 font-bold text-sm">{totalPrice.toLocaleString()}₮</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-sm flex items-center gap-1.5">
                      <span>🛵</span> Хүргэлт
                    </span>
                    <span className="text-zinc-800 font-bold text-sm">{deliveryFee.toLocaleString()}₮</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-2 border-t border-zinc-100">
                    <span>🔥 Нийт калори</span>
                    <span>{totalCalories} ккал</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="bg-zinc-900 rounded-2xl px-4 py-3.5 mb-4 flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-xs font-semibold">Нийт дүн</p>
                  <p className="text-white font-black text-2xl leading-tight">
                    {finalTotal.toLocaleString()}
                    <span className="text-sm text-zinc-400 font-semibold ml-0.5">₮</span>
                  </p>
                </div>
                <div className="text-3xl">🧾</div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-500 text-xs px-3.5 py-2.5 rounded-xl mb-4 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* CTA */}
              {!user ? (
                <div className="text-center">
                  <p className="text-zinc-400 text-xs mb-3">Захиалга хийхийн тулд нэвтэрнэ үү</p>
                  <Link href="/login" className="block w-full btn-lime py-3.5 rounded-2xl font-black text-center text-sm">
                    Нэвтрэх →
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full btn-lime py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 disabled:opacity-60 shadow-md shadow-orange-200 active:scale-[0.98] transition-transform"
                >
                  {loading
                    ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Боловсруулж байна...</>)
                    : "Захиалга хийх 🚀"}
                </button>
              )}

              {/* Security note */}
              <p className="text-center text-zinc-400 text-[10px] mt-3 flex items-center justify-center gap-1">
                🔒 Таны мэдээлэл аюулгүй хамгаалагдана
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
