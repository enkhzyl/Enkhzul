"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalPrice, totalCalories, totalItems } = useCart();
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col slide-in border-l border-zinc-100">

        {/* Header */}
        <div className="px-5 py-5 border-b border-zinc-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="font-black text-zinc-900 text-lg">Миний Сагс</h2>
            <p className="text-zinc-400 text-sm">{totalItems} бараа</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 bg-zinc-100 hover:bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors text-sm">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-zinc-50">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-white border border-zinc-100 rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-sm">🛒</div>
              <p className="font-black text-zinc-800 text-lg mb-1">Сагс хоосон байна</p>
              <p className="text-zinc-400 text-sm mb-6">Менүнээс хоол сонгоорой</p>
              <button onClick={() => { onClose(); router.push("/menu"); }}
                className="btn-lime px-6 py-2.5 text-sm font-black rounded-xl">
                Меню үзэх →
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-zinc-900 text-sm truncate">{item.menuItem.name}</p>
                      {item.selectedIngredients.length > 0 && (
                        <div className="mt-1.5 space-y-0.5">
                          {item.selectedIngredients.map((g) => (
                            <p key={g.groupId} className="text-xs text-zinc-400 truncate">
                              <span className="text-zinc-500">{g.groupName}:</span> {g.options.map((o) => o.name).join(", ")}
                            </p>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="text-[#F97316] font-black text-sm">{(item.totalPrice * item.quantity).toLocaleString()}₮</span>
                        <span className="text-zinc-200">·</span>
                        <span className="text-zinc-400 text-xs">{item.totalCalories * item.quantity} ккал</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)}
                      className="text-zinc-300 hover:text-red-400 transition-colors text-xs mt-0.5 flex-shrink-0 w-6 h-6 flex items-center justify-center bg-zinc-50 rounded-lg hover:bg-red-50">✕</button>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-50">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-bold text-zinc-600 transition-colors text-sm">−</button>
                    <span className="font-black text-zinc-900 w-5 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 btn-lime rounded-lg flex items-center justify-center font-black text-sm">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-4 py-4 bg-white">
            <div className="bg-[#F97316] rounded-2xl px-4 py-3.5 mb-3 shadow-md shadow-orange-200">
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-bold text-sm">Нийт дүн</span>
                <span className="text-white font-black text-xl">{totalPrice.toLocaleString()}₮</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-white/60 text-xs font-medium">Нийт калори</span>
                <span className="text-white/70 text-xs font-bold">{totalCalories} ккал</span>
              </div>
            </div>
            <button onClick={() => { onClose(); router.push("/cart"); }}
              className="w-full btn-dark py-3.5 rounded-2xl font-black text-base active:scale-95">
              Захиалга хийх →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
