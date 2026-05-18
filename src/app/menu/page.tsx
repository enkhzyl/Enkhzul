"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MenuCard from "@/components/MenuCard";
import { getDiscountedPrice } from "@/lib/price";
import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const CAT_EMOJI: Record<string, string> = {
  addon: "🍟", drink: "🥤", dessert: "🍰",
  burger: "🍔", pizza: "🍕", wrap: "🌯", burrito: "🌮", combo: "🎁",
};

function SimpleCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded]     = useState(false);
  const [imgError, setImgError] = useState(false);
  const discountedPrice = getDiscountedPrice(item.basePrice, item.discount);
  const hasImage = !!item.imageUrl && !imgError;

  const handleAdd = () => {
    addItem({ id: `${item.id}-${Date.now()}`, menuItem: item, selectedIngredients: [], quantity: 1, totalPrice: discountedPrice, totalCalories: item.baseCalories });
    setAdded(true); setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="menu-card overflow-hidden group bg-white">
      <div className="relative h-36 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
        {hasImage ? (
          <>
            <Image src={item.imageUrl} alt={item.name} fill
              className="object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
              sizes="220px" onError={() => setImgError(true)} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-200 select-none">
              {CAT_EMOJI[item.category] || "🍽️"}
            </span>
          </div>
        )}
        {item.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
            −{item.discount}%
          </div>
        )}
        {item.isToday && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />Өнөөдөр
          </div>
        )}
        {item.isNew && !item.isToday && (
          <div className="absolute top-2 left-2 bg-zinc-900 text-white text-[10px] font-black px-2 py-0.5 rounded-full">✦ Шинэ</div>
        )}
        {item.baseCalories > 0 && (
          <div className="absolute bottom-2 right-2 glass text-zinc-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {item.baseCalories} ккал
          </div>
        )}
      </div>
      <div className="p-3.5">
        <p className="font-black text-zinc-900 text-sm leading-tight group-hover:text-[#F97316] transition-colors">{item.name}</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-[#F97316] font-black text-sm">{discountedPrice.toLocaleString()}₮</p>
            {item.discount && (
              <p className="text-zinc-400 text-[10px] line-through">{item.basePrice.toLocaleString()}₮</p>
            )}
          </div>
          <button onClick={handleAdd}
            className={`w-9 h-9 rounded-xl font-black text-sm transition-all active:scale-90 flex items-center justify-center shadow-sm ${
              added ? "bg-emerald-500 text-white" : "btn-lime"
            }`}>
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}

const CATS = [
  { id: "all",     label: "Бүгд",     emoji: "🍽️" },
  { id: "burger",  label: "Бургер",   emoji: "🍔" },
  { id: "pizza",   label: "Пицца",    emoji: "🍕" },
  { id: "wrap",    label: "Рап",      emoji: "🌯" },
  { id: "burrito", label: "Бурритто", emoji: "🌮" },
  { id: "combo",   label: "Сэт",      emoji: "🎁" },
];

type MenuData = {
  main: MenuItem[];
  combos: MenuItem[];
  addons: MenuItem[];
  drinks: MenuItem[];
  desserts: MenuItem[];
  popular: MenuItem[];
};

function MenuContent() {
  const searchParams = useSearchParams();
  const [active, setActive]       = useState(searchParams.get("cat") || "all");
  const [menuData, setMenuData]   = useState<MenuData | null>(null);
  const [menuLoading, setMenuLoading] = useState(true);
  const [search, setSearch]       = useState("");

  useEffect(() => {
    fetch("/api/menu")
      .then(r => r.json())
      .then(data => { setMenuData(data); setMenuLoading(false); })
      .catch(() => setMenuLoading(false));
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  useEffect(() => {
    const c = searchParams.get("cat"); if (c) setActive(c);
  }, [searchParams]);

  const mainItems    = menuData ? menuData.main    : [];
  const comboItems   = menuData ? menuData.combos  : [];
  const addonItems   = menuData ? menuData.addons  : [];
  const drinkItems   = menuData ? menuData.drinks  : [];
  const dessertItems = menuData ? menuData.desserts : [];

  const allMainItems = [...mainItems, ...comboItems];
  const todayDeals   = allMainItems.filter(i => i.isToday && i.discount);

  const SECTIONS = [
    { id: "addons",   label: "Нэмэлт",   sub: "Хоолдоо нэмэлт авна уу", emoji: "🍟", items: addonItems,   cols: "grid-cols-2 sm:grid-cols-4" },
    { id: "drinks",   label: "Уух зүйл", sub: "Ундаа, жүүс, ус",        emoji: "🥤", items: drinkItems,   cols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" },
    { id: "desserts", label: "Амттан",   sub: "Хоолны дараа таатай",     emoji: "🍰", items: dessertItems, cols: "grid-cols-2 sm:grid-cols-4" },
  ];

  let filtered = active === "all"
    ? allMainItems
    : allMainItems.filter(i => i.category === active);

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
    );
  }

  if (menuLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-100 border-t-[#F97316] rounded-full animate-spin mx-auto mb-5" />
          <p className="text-zinc-400 text-sm font-semibold">Цэс ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  const activeLabel = CATS.find(c => c.id === active);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Page Header ── */}
      <div className="relative overflow-hidden" style={{
        background: "radial-gradient(ellipse 80% 70% at 70% -10%, #FFE4C4 0%, transparent 65%), linear-gradient(160deg, #FFF8F0 0%, #FFFCF8 55%, #FFF4E6 100%)"
      }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-200/25 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-24 bg-amber-200/20 rounded-full blur-[40px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">

            {/* Title */}
            <div>
              <div className="badge-pill inline-flex mb-5">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0" />
                Манай бүрэн цэс
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight mb-2">
                Юу идэх вэ?
              </h1>
              <p className="text-zinc-400 text-sm font-medium">
                Дуртай хоолоо сонгоод орцоо хүссэнээрээ бүрдүүл
              </p>
            </div>

            {/* Search bar */}
            <div className="relative w-full lg:w-80">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-base">🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Хоол хайх... (жишээ: Бургер)"
                className="w-full pl-11 pr-10 py-3.5 bg-white border-2 border-orange-200 hover:border-orange-300 focus:border-[#F97316] focus:ring-4 focus:ring-orange-100 rounded-2xl text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 outline-none transition-all shadow-sm"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 font-black text-sm transition-colors">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-orange-100">
            {[
              { n: `${allMainItems.length}+`, label: "Бэлэн хоол" },
              { n: `${mainItems.length}`,      label: "Орцоо сонгох боломжтой" },
              { n: `${todayDeals.length}`,     label: "Өнөөдрийн хямдрал" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-zinc-900 font-black text-lg">{s.n}</span>
                <span className="text-zinc-400 text-xs font-medium hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[66px] z-30 bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 py-3">
            {/* Search */}
            <div className="relative flex-shrink-0 w-52 sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Хайх..."
                className="w-full pl-8 pr-7 py-2 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 rounded-xl text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 outline-none transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 font-black text-xs">
                  ✕
                </button>
              )}
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-zinc-200 flex-shrink-0" />
            {/* Category chips */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              {CATS.map((cat) => (
                <button key={cat.id} onClick={() => { setActive(cat.id); setSearch(""); }}
                  className={`chip flex-shrink-0 py-1.5 px-3.5 text-xs ${active === cat.id ? "chip-active" : "chip-inactive"}`}>
                  <span>{cat.emoji}</span>
                  {cat.label}
                  {active === cat.id && cat.id !== "all" && (
                    <span className="bg-white/20 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ml-0.5">
                      {filtered.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Today's deals */}
        {todayDeals.length > 0 && !search && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-3xl p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-xl text-white shadow-md shadow-orange-200">🔥</div>
              <div>
                <h2 className="text-zinc-900 font-black text-base flex items-center gap-2.5">
                  Өнөөдрийн хямдрал
                  <span className="flex items-center gap-1 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-black uppercase">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />Live
                  </span>
                </h2>
                <p className="text-zinc-400 text-xs font-medium">Зөвхөн өнөөдөр л хүчинтэй үнэ</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {todayDeals.map(item => {
                const discounted = getDiscountedPrice(item.basePrice, item.discount);
                return (
                  <div key={item.id} className="bg-white border border-orange-100 hover:border-orange-300 rounded-2xl overflow-hidden group cursor-pointer transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                    <div className="relative h-24">
                      <Image src={item.imageUrl} alt={item.name} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="160px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow">
                        −{item.discount}%
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-zinc-900 font-black text-xs leading-tight truncate">{item.name}</p>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <p className="text-[#F97316] font-black text-sm">{discounted.toLocaleString()}₮</p>
                        <p className="text-zinc-400 text-[10px] line-through">{item.basePrice.toLocaleString()}₮</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active category header */}
        {!search && active !== "all" && activeLabel && (
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">{activeLabel.emoji}</div>
            <div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">{activeLabel.label}</h2>
              <p className="text-zinc-400 text-sm">{filtered.length} нэр төрөл</p>
            </div>
          </div>
        )}

        {/* Search results label */}
        {search && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-500">
              &quot;<span className="text-zinc-900 font-black">{search}</span>&quot; — {filtered.length} үр дүн
            </p>
            <button onClick={() => setSearch("")}
              className="text-xs text-zinc-400 hover:text-zinc-700 font-bold transition-colors flex items-center gap-1">
              ✕ Цэвэрлэх
            </button>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {filtered.map((item) => <MenuCard key={item.id} item={item} />)}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && !menuLoading && (
          <div className="text-center py-24">
            <div className="text-7xl mb-5 opacity-80">{search ? "🔍" : "🍽️"}</div>
            <p className="text-zinc-900 font-black text-xl mb-2">
              {search ? "Хоол олдсонгүй" : "Энэ ангилалд хоол байхгүй"}
            </p>
            <p className="text-zinc-400 text-sm mb-6">
              {search ? `"${search}" нэртэй хоол байхгүй байна` : "Өөр ангилал сонгоно уу"}
            </p>
            {search && (
              <button onClick={() => setSearch("")}
                className="btn-lime px-6 py-2.5 text-sm font-black rounded-xl">
                Хайлт арилгах
              </button>
            )}
          </div>
        )}

        {/* Extras divider */}
        {!search && (
          <>
            <div className="flex items-center gap-4 my-14">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full">
                <span className="text-base">🍟</span>
                <span className="text-zinc-500 text-xs font-black uppercase tracking-widest">Нэмэлт захиалга</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
            </div>

            {SECTIONS.map((sec) => (
              <div key={sec.id} id={sec.id} className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-13 h-13 w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-50 border border-orange-200 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    {sec.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900 tracking-tight">{sec.label}</h2>
                    <p className="text-zinc-400 text-sm font-medium">{sec.sub}</p>
                  </div>
                  <div className="ml-auto hidden sm:flex">
                    <span className="bg-zinc-100 text-zinc-500 text-xs font-black px-3 py-1.5 rounded-full">
                      {sec.items.length} нэр
                    </span>
                  </div>
                </div>
                <div className={`grid ${sec.cols} gap-4`}>
                  {sec.items.map((item) => <SimpleCard key={item.id} item={item} />)}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-100 border-t-[#F97316] rounded-full animate-spin mx-auto mb-5" />
          <p className="text-zinc-400 text-sm font-semibold">Ачааллаж байна...</p>
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
