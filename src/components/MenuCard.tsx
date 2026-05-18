"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MenuItem, CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import IngredientBuilder from "./IngredientBuilder";
import { getDiscountedPrice } from "@/lib/price";

const CAT_TAG: Record<string, { label: string; cls: string }> = {
  burger:  { label: "Бургер",   cls: "bg-orange-500/90 text-white" },
  pizza:   { label: "Пицца",    cls: "bg-red-500/90 text-white" },
  wrap:    { label: "Рап",      cls: "bg-emerald-500/90 text-white" },
  burrito: { label: "Бурритто", cls: "bg-amber-500/90 text-white" },
  combo:   { label: "Сэт",      cls: "bg-purple-500/90 text-white" },
  addon:   { label: "Нэмэлт",   cls: "bg-blue-500/90 text-white" },
  drink:   { label: "Ундаа",    cls: "bg-sky-500/90 text-white" },
  dessert: { label: "Амттан",   cls: "bg-pink-500/90 text-white" },
};

const ITEM_META: Record<string, { likes: number; rating: string }> = {
  "ready-burger-classic":   { likes: 284, rating: "4.9" },
  "ready-pizza-pepperoni":  { likes: 231, rating: "4.8" },
  "ready-wrap-chicken":     { likes: 178, rating: "4.7" },
  "ready-burger-bbq":       { likes: 156, rating: "4.6" },
  "ready-pizza-margherita": { likes: 203, rating: "4.8" },
  "ready-burrito-classic":  { likes: 142, rating: "4.6" },
  "burger-classic":         { likes: 198, rating: "4.8" },
  "burger-bbq":             { likes: 147, rating: "4.7" },
  "pizza-classic":          { likes: 172, rating: "4.7" },
  "pizza-pepperoni":        { likes: 189, rating: "4.8" },
  "wrap-classic":           { likes: 134, rating: "4.6" },
  "burrito-classic":        { likes: 121, rating: "4.5" },
  "combo-classic":          { likes: 312, rating: "4.9" },
  "combo-chicken":          { likes: 198, rating: "4.7" },
  "combo-pizza":            { likes: 167, rating: "4.6" },
  "combo-family":           { likes: 256, rating: "4.8" },
  "addon-fries":            { likes: 445, rating: "4.9" },
  "addon-nuggets":          { likes: 203, rating: "4.7" },
  "dessert-brownie":        { likes: 267, rating: "4.9" },
  "dessert-cheesecake":     { likes: 134, rating: "4.7" },
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [justAdded, setJustAdded]     = useState(false);
  const [liked, setLiked]             = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [userRating, setUserRating]   = useState(0);
  const [hoverStar, setHoverStar]     = useState(0);
  const { addItem } = useCart();
  const { user }    = useAuth();

  const hasIngredients = !!item.ingredientGroups?.length;
  const tag            = CAT_TAG[item.category];
  const price          = getDiscountedPrice(item.basePrice, item.discount);
  const meta           = ITEM_META[item.id];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !user) return;
    try {
      const stored = JSON.parse(localStorage.getItem("fastfood_likes") || "{}");
      setLiked(!!stored[item.id]);
      const ratings = JSON.parse(localStorage.getItem(`fastfood_ratings_${user.id}`) || "{}");
      if (ratings[item.id]) setUserRating(ratings[item.id]);
    } catch {}
  }, [mounted, user, item.id]);

  const handleRate = (e: React.MouseEvent, star: number) => {
    e.stopPropagation();
    if (!user) return;
    try {
      const ratings = JSON.parse(localStorage.getItem(`fastfood_ratings_${user.id}`) || "{}");
      ratings[item.id] = star;
      localStorage.setItem(`fastfood_ratings_${user.id}`, JSON.stringify(ratings));
      setUserRating(star);
    } catch {}
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    try {
      const stored = JSON.parse(localStorage.getItem("fastfood_likes") || "{}");
      if (liked) { delete stored[item.id]; } else { stored[item.id] = true; }
      localStorage.setItem("fastfood_likes", JSON.stringify(stored));
      setLiked(!liked);
    } catch {}
  };

  const handleAdd = () => {
    if (hasIngredients) { setBuilderOpen(true); return; }
    addItem({
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      selectedIngredients: [],
      quantity: 1,
      totalPrice: price,
      totalCalories: item.baseCalories,
    } as CartItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const likeCount = meta ? meta.likes + (mounted && liked ? 1 : 0) : 0;

  return (
    <>
      <div className="menu-card group flex flex-col bg-white">

        {/* ── Image area ── */}
        <div className="relative h-48 bg-zinc-100 overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="320px"
          />
          {/* Gradient overlay — stronger at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {tag && (
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm ${tag.cls}`}>
                {tag.label}
              </span>
            )}
            {item.isNew && (
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-zinc-900/90 text-white backdrop-blur-sm shadow-sm">
                ✦ Шинэ
              </span>
            )}
            {item.isToday && (
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-red-500/90 text-white backdrop-blur-sm shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Өнөөдөр
              </span>
            )}
          </div>

          {/* Top-right: popular + discount */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
            {item.isPopular && (
              <div className="bg-yellow-400/95 text-yellow-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                ⭐ Хит
              </div>
            )}
            {item.discount && (
              <div className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                −{item.discount}%
              </div>
            )}
          </div>

          {/* Bottom: like + calories */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            {meta && mounted ? (
              <button
                onClick={toggleLike}
                title={!user ? "Нэвтэрч үнэлгээ өгнө үү" : liked ? "Дуртай болгосон" : "Дуртай болгох"}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-black transition-all active:scale-90 backdrop-blur-sm ${
                  liked
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : user
                      ? "bg-white/80 text-zinc-600 hover:bg-white hover:text-red-500"
                      : "bg-white/50 text-zinc-400 cursor-default"
                }`}
              >
                <span className="text-sm">{liked ? "❤️" : "🤍"}</span>
                <span>{likeCount}</span>
              </button>
            ) : <div />}

            <div className="glass text-zinc-800 text-[11px] px-2.5 py-1 rounded-full font-bold shadow-sm">
              🔥 {item.baseCalories} ккал
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-black text-zinc-900 text-base leading-tight mb-1 group-hover:text-[#F97316] transition-colors duration-200">
            {item.name}
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 flex-1">{item.description}</p>

          {/* Star rating */}
          {meta && (
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(star => {
                  const active = hoverStar ? star <= hoverStar : star <= (userRating || 5);
                  return (
                    <button
                      key={star}
                      onClick={(e) => handleRate(e, star)}
                      onMouseEnter={() => user && setHoverStar(star)}
                      onMouseLeave={() => setHoverStar(0)}
                      className={`text-sm transition-all leading-none ${
                        active ? "text-yellow-400 scale-110" : "text-zinc-200"
                      } ${user ? "cursor-pointer hover:scale-125" : "cursor-default"}`}
                    >★</button>
                  );
                })}
              </div>
              <span className="text-zinc-400 text-[10px] font-semibold">
                {userRating ? `${userRating}.0` : meta.rating}
              </span>
            </div>
          )}

          {/* Price + button */}
          <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-zinc-100">
            <div>
              <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide mb-0.5">
                {hasIngredients ? "Эхлэх үнэ" : "Үнэ"}
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl font-black text-[#F97316]">{price.toLocaleString()}</p>
                <span className="text-sm text-zinc-400 font-bold">₮</span>
              </div>
              {item.discount && (
                <p className="text-[10px] text-zinc-400 line-through">{item.basePrice.toLocaleString()}₮</p>
              )}
            </div>
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-sm transition-all active:scale-95 ${
                justAdded
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "btn-lime"
              }`}
            >
              {justAdded ? "✓ Нэмэгдлээ" : hasIngredients ? "Захиалах →" : "+ Нэмэх"}
            </button>
          </div>
        </div>
      </div>

      {builderOpen && <IngredientBuilder item={item} onClose={() => setBuilderOpen(false)} />}
    </>
  );
}
