"use client";

import { useState, useEffect } from "react";
import { MenuItem, IngredientGroup, IngredientOption, CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { getDiscountedPrice } from "@/lib/price";

export default function IngredientBuilder({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addItem } = useCart();
  const groups = item.ingredientGroups || [];
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const def: Record<string, string[]> = {};
    groups.forEach((g) => { def[g.id] = g.options.filter((o) => o.isDefault).map((o) => o.id); });
    setSelections(def);
  }, [item]);

  const toggle = (g: IngredientGroup, id: string) =>
    setSelections((p) => ({
      ...p,
      [g.id]: g.type === "single"
        ? [id]
        : (p[g.id] || []).includes(id)
          ? (p[g.id] || []).filter((x) => x !== id)
          : [...(p[g.id] || []), id],
    }));

  const selectedOpts = (gid: string): IngredientOption[] => {
    const g = groups.find((x) => x.id === gid);
    return !g ? [] : (selections[gid] || []).map((id) => g.options.find((o) => o.id === id)).filter(Boolean) as IngredientOption[];
  };

  const extraPrice = groups.reduce((t, g) => t + selectedOpts(g.id).reduce((s, o) => s + o.price, 0), 0);
  const extraCal   = groups.reduce((t, g) => t + selectedOpts(g.id).reduce((s, o) => s + o.calories, 0), 0);
  const basePrice  = getDiscountedPrice(item.basePrice, item.discount);
  const totalPrice = basePrice + extraPrice;
  const totalCal   = item.baseCalories + extraCal;

  const handleAdd = () => {
    const sel = groups.map((g) => ({ groupId: g.id, groupName: g.name, options: selectedOpts(g.id) })).filter((g) => g.options.length > 0);
    addItem({ id: `${item.id}-${Date.now()}`, menuItem: item, selectedIngredients: sel, quantity: qty, totalPrice, totalCalories: totalCal } as CartItem);
    setAdded(true);
    setTimeout(onClose, 900);
  };

  const cur    = groups[step];
  const isLast = step === groups.length - 1;
  const pct    = groups.length > 0 ? ((step + 1) / groups.length) * 100 : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[88vh] fade-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 border-b border-zinc-100 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0 pr-4">
              <p className="section-label text-[11px] mb-1">Орц сонгох</p>
              <h2 className="text-xl font-black text-zinc-900 leading-tight truncate">{item.name}</h2>
              <p className="text-zinc-400 text-xs mt-0.5">
                {basePrice.toLocaleString()}₮ + {extraPrice > 0 ? `${extraPrice.toLocaleString()}₮ нэмэлт` : "нэмэлт үгүй"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-zinc-100 hover:bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors text-sm flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-[#F97316] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Step pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {groups.map((g, i) => (
              <button key={g.id} onClick={() => setStep(i)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  i === step
                    ? "bg-[#F97316] text-white shadow-md shadow-orange-200"
                    : i < step
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-zinc-100 text-zinc-400"
                }`}>
                {i < step
                  ? <span className="w-3.5 h-3.5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px] font-black">✓</span>
                  : <span className="w-3.5 h-3.5 bg-current/20 rounded-full flex items-center justify-center text-[9px] font-black opacity-60">{i + 1}</span>
                }
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Options ── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 bg-zinc-50">
          {groups.length === 0 ? (
            <p className="text-zinc-400 text-center py-10 text-sm">Нэмэлт орц байхгүй</p>
          ) : (
            <>
              {/* Step header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black text-zinc-900 text-base">{cur.name}</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    {cur.type === "single" ? "Нэгийг сонго" : "Хэд ч сонгоход болно"}
                    {cur.required
                      ? <span className="text-red-500 ml-1.5 font-bold">● Заавал</span>
                      : <span className="text-zinc-400 ml-1.5">● Сонголтой</span>}
                  </p>
                </div>
                <span className="text-xs bg-white border border-zinc-200 text-zinc-500 font-bold px-2.5 py-1 rounded-full">
                  {step + 1}/{groups.length}
                </span>
              </div>

              {/* Option cards */}
              <div className="grid grid-cols-1 gap-2">
                {cur.options.map((opt) => {
                  const sel = (selections[cur.id] || []).includes(opt.id);
                  return (
                    <button key={opt.id} onClick={() => toggle(cur, opt.id)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 transition-all text-left group ${
                        sel
                          ? "border-[#F97316] bg-orange-50 shadow-sm"
                          : "border-zinc-100 bg-white hover:border-orange-200 hover:bg-orange-50/30"
                      }`}>

                      {/* Check indicator */}
                      <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center transition-all border-2 ${
                        cur.type === "single" ? "rounded-full" : "rounded-md"
                      } ${sel ? "border-[#F97316] bg-[#F97316]" : "border-zinc-200 bg-white"}`}>
                        {sel && <span className="text-white text-[10px] font-black">✓</span>}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <span className={`font-bold text-sm ${sel ? "text-zinc-900" : "text-zinc-700"}`}>
                          {opt.name}
                        </span>
                        {opt.calories > 0 && (
                          <span className="text-zinc-400 text-xs ml-2">· {opt.calories} ккал</span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        {opt.price > 0 ? (
                          <span className={`text-sm font-black ${sel ? "text-[#F97316]" : "text-zinc-500"}`}>
                            +{opt.price.toLocaleString()}₮
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-zinc-300">Үнэгүй</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-zinc-100 px-5 py-4 bg-white">
          {/* Live price */}
          <div className="flex items-stretch gap-3 mb-3">
            <div className="flex-1 bg-[#F97316] rounded-2xl px-4 py-3 shadow-md shadow-orange-200">
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-wide">Нийт үнэ</p>
              <p className="text-white font-black text-2xl leading-none mt-0.5">
                {(totalPrice * qty).toLocaleString()}
                <span className="text-sm font-semibold ml-0.5">₮</span>
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3 text-right">
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wide">Калори</p>
              <p className="text-zinc-900 font-black text-xl leading-none mt-0.5">
                {totalCal * qty}
                <span className="text-xs text-zinc-400 ml-0.5">ккал</span>
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Qty */}
            <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-xl px-2.5 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-7 h-7 bg-white border border-zinc-200 hover:bg-zinc-100 rounded-lg font-black text-zinc-600 transition-colors text-sm"
              >−</button>
              <span className="font-black text-zinc-900 w-5 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-7 h-7 btn-lime rounded-lg font-black text-sm flex items-center justify-center"
              >+</button>
            </div>

            {/* Back */}
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="h-11 px-4 btn-outline rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 border-zinc-200"
              >← Буцах</button>
            )}

            {/* Next / Add */}
            {!isLast && groups.length > 0 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex-1 btn-dark h-11 rounded-2xl font-black text-sm transition-all"
              >
                Дараагийнх →
              </button>
            ) : (
              <button
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 h-11 font-black rounded-2xl transition-all active:scale-95 text-sm ${
                  added ? "bg-emerald-500 text-white" : "btn-lime"
                }`}
              >
                {added ? "✓ Сагсанд нэмэгдлээ!" : "🛒 Сагсанд нэмэх"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
