import Link from "next/link";
import Image from "next/image";
import MenuCard from "@/components/MenuCard";
import { HeroButtons, CtaButtons } from "@/components/HomeAuthButtons";
import { getAllMenuItemsSafe } from "@/lib/menuDb";

export default async function HomePage() {
  const { popularItems, mainItems, comboItems } = await getAllMenuItemsSafe();
  const totalItems = popularItems.length + mainItems.length + comboItems.length;

  const categories = [
    { emoji: "🍔", label: "Бургер",   sub: "18 нэр төрөл", from: "from-orange-500", to: "to-orange-700", href: "/menu?cat=burger"  },
    { emoji: "🍕", label: "Пицца",    sub: "8 нэр төрөл",  from: "from-red-500",    to: "to-rose-700",   href: "/menu?cat=pizza"   },
    { emoji: "🌯", label: "Рап",      sub: "7 нэр төрөл",  from: "from-emerald-500", to: "to-green-700", href: "/menu?cat=wrap"    },
    { emoji: "🌮", label: "Бурритто", sub: "8 нэр төрөл",  from: "from-amber-500",  to: "to-yellow-700", href: "/menu?cat=burrito" },
    { emoji: "🎁", label: "Сэт",      sub: "8 нэр төрөл",  from: "from-purple-500", to: "to-violet-700", href: "/menu?cat=combo"   },
  ];

  const features = [
    {
      icon: "🎯",
      color: "bg-orange-100",
      title: "Орцоо өөрөө бүрдүүл",
      desc: "Талх, мах, соус, бяслаг — дуртайгаа сонгоод хүссэн хоолоо тогтоо. Үнэ болон калори шууд тооцоологдоно.",
    },
    {
      icon: "⚡",
      color: "bg-sky-100",
      title: "30 минутын хүргэлт",
      desc: "Захиалга хийснээс хойш 30 минутын дотор таны хаалган дээр хүргэнэ. Хурдан, найдвартай, аюулгүй.",
    },
    {
      icon: "🔒",
      color: "bg-emerald-100",
      title: "Найдвартай систем",
      desc: "JWT authentication, шифрлэгдсэн данс, бүрэн захиалгын түүхтэй. Next.js 14 + PostgreSQL технологи.",
    },
  ];

  const darkStats = [
    { num: "500+",           label: "Өдөрт захиалга" },
    { num: "30 мин",         label: "Дундаж хүргэлт" },
    { num: "4.8 ⭐",          label: "Хэрэглэгчийн үнэлгээ" },
    { num: `${totalItems}+`, label: "Хоолны нэр төрөл" },
  ];

  return (
    <div className="bg-white">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden hero-bg">

        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-amber-200/15 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* ── Left text ── */}
            <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">

              {/* Badge */}
              <div className="badge-pill inline-flex mb-8 shadow-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0" />
                Монголын #1 онлайн хүргэлт
              </div>

              {/* Headline */}
              <h1 className="hero-title mb-6">
                Хамгийн<br />
                <span className="gradient-text">амттай</span><br />
                хоол
              </h1>

              <p className="text-zinc-500 text-lg leading-relaxed mb-10 max-w-[420px] mx-auto lg:mx-0">
                Бургер, Пицца, Рап, Бурритто — орцоо алхам алхмаар сонгоод хаалган дээрх хүргэлттэй захиалаарай.
              </p>

              <HeroButtons />

              {/* Social proof */}
              <div className="flex items-center gap-5 mt-10 justify-center lg:justify-start flex-wrap">
                <div className="flex -space-x-2.5">
                  {["🧑", "👩", "👨", "👩", "👦"].map((e, i) => (
                    <div key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-white flex items-center justify-center text-sm shadow-sm">
                      {e}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm leading-none mb-0.5">
                    {"★★★★★"}
                  </div>
                  <p className="text-zinc-500 text-xs font-semibold">4.8 · 500+ хэрэглэгч</p>
                </div>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Одоо нээлттэй
                </div>
              </div>
            </div>

            {/* ── Right: food image grid ── */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  {popularItems.slice(0, 4).map((item, i) => (
                    <div key={item.id}
                      className={`rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 ${i === 0 ? "col-span-2" : ""}`}>
                      <div className={`relative bg-zinc-200 ${i === 0 ? "h-56" : "h-44"}`}>
                        <Image
                          src={item.imageUrl} alt={item.name} fill
                          className="object-cover" sizes="460px"
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        {item.isPopular && (
                          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                            ⭐ Хит
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="font-black text-white text-sm drop-shadow-sm">{item.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-orange-300 font-black text-sm">{item.basePrice.toLocaleString()}₮</p>
                            <div className="glass text-white/90 text-xs px-2 py-0.5 rounded-full font-bold">
                              {item.baseCalories} ккал
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating delivery badge */}
                <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-2xl p-3.5 flex items-center gap-3 z-10 border border-zinc-100">
                  <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🚀</div>
                  <div>
                    <p className="font-black text-zinc-900 text-sm leading-tight">Хурдан хүргэлт</p>
                    <p className="text-zinc-400 text-xs mt-0.5 font-medium">30 минут хүртэл</p>
                  </div>
                </div>

                {/* Floating rating badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-2.5 z-10 border border-zinc-100">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <p className="font-black text-zinc-900 text-sm leading-tight">4.8 / 5</p>
                    <p className="text-zinc-400 text-[10px] font-medium">500+ үнэлгээ</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DARK STATS BAR
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-white/5">
            {darkStats.map((s) => (
              <div key={s.label} className="dark-stat px-6 py-2">
                <p className="text-3xl sm:text-4xl font-black text-white mb-1.5 tracking-tight">{s.num}</p>
                <p className="text-zinc-600 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Ангилал</p>
            <h2 className="section-title">Юу захиалах вэ?</h2>
            <p className="text-zinc-400 text-sm mt-3 max-w-sm mx-auto">
              Хүссэн ангилалаа сонгоод хоолоо захиалаарай
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className={`cat-card group relative overflow-hidden bg-gradient-to-br ${cat.from} ${cat.to} p-6 sm:p-7 flex flex-col items-center text-center cursor-pointer`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[28px]" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/5 rounded-full" />
                <div className="relative text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                  {cat.emoji}
                </div>
                <p className="relative font-black text-white text-base leading-tight">{cat.label}</p>
                <p className="relative text-white/70 text-xs mt-1 font-semibold">{cat.sub}</p>
                <div className="relative mt-3 text-white/0 group-hover:text-white/90 text-xs font-black transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  Харах →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MOST POPULAR
      ══════════════════════════════════════════════════════ */}
      <section className="section-cream py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">⭐ Хамгийн их захиалагддаг</p>
              <h2 className="section-title">Хит хоолнууд</h2>
              <p className="text-zinc-400 text-sm mt-2">Хэрэглэгчдийн хамгийн их сонгодог амттай хоолнууд</p>
            </div>
            <Link href="/menu"
              className="hidden sm:flex items-center gap-1.5 text-sm font-black text-[#F97316] hover:text-orange-700 transition-colors bg-white border border-orange-200 hover:border-orange-400 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md">
              Бүгд харах →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularItems.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Яагаад бид?</p>
            <h2 className="section-title">Онцлог давуу талууд</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="feat-card group">
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-black text-zinc-900 text-xl mb-3 leading-tight">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMBOS
      ══════════════════════════════════════════════════════ */}
      <section className="section-cream py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">🎁 Сэт</p>
              <h2 className="section-title">Бэлэн сэтүүд</h2>
              <p className="text-zinc-400 text-sm mt-2">Хэд хэдэн хоолыг хамт захиалж илүү хэмнэлттэй</p>
            </div>
            <Link href="/menu?cat=combo"
              className="hidden sm:flex items-center gap-1.5 text-sm font-black text-[#F97316] hover:text-orange-700 transition-colors bg-orange-50 hover:bg-orange-100 border border-orange-200 px-5 py-2.5 rounded-xl">
              Бүгд харах →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {comboItems.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-zinc-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Процесс</p>
            <h2 className="section-title">3 алхамд захиалга хий</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
            {/* Connector lines */}
            <div className="hidden sm:block absolute top-7 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] border-t-2 border-dashed border-zinc-200" />
            {[
              { n: "01", icon: "🍔", title: "Хоол сонго",    desc: "Бэлэн цэсээс сонгох эсвэл орцоо өөрөө бүрдүүлэх хоолоо авна" },
              { n: "02", icon: "🔧", title: "Орцоо бүрдүүл", desc: "Алхам алхмаар орцоо нэм — үнэ болон калори шууд тооцоологдоно" },
              { n: "03", icon: "🚀", title: "Захиалга хий",  desc: "Сагсандаа нэмж хаягаа оруулаад захиалга өгнө" },
            ].map((s, i) => (
              <div key={s.n} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 border border-orange-200 flex items-center justify-center text-2xl shadow-sm mb-6 z-10">
                  {s.icon}
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-[#F97316] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-black text-zinc-900 text-xl mb-2">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BUILD YOUR OWN
      ══════════════════════════════════════════════════════ */}
      <section className="section-cream py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">🔧 Өөрийн гэсэн</p>
              <h2 className="section-title">Орцоо өөрөө бүрдүүл</h2>
              <p className="text-zinc-400 text-sm mt-2">Талх, мах, соус, бяслаг — дуртайгаа сонгоод захиалаарай</p>
            </div>
            <Link href="/menu"
              className="hidden sm:flex items-center gap-1.5 text-sm font-black text-[#F97316] hover:text-orange-700 transition-colors bg-white border border-orange-200 hover:border-orange-400 px-5 py-2.5 rounded-xl shadow-sm">
              Бүгд харах →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mainItems.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-16 pb-24">
        <div className="relative bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/12 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-400/08 rounded-full blur-[60px] -translate-x-1/4 translate-y-1/3 pointer-events-none" />
          <div className="relative px-8 py-16 sm:px-20 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-7">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Хязгааргүй захиалга
            </div>
            <div className="text-6xl mb-6 float-anim inline-block">🍔</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Өнөөдөр захиалаарай!
            </h2>
            <p className="text-zinc-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Шинэ данс үүсгэж хамгийн дуртай хоолоо хаалган дээрх хүргэлттэй захиалаарай
            </p>
            <CtaButtons />
          </div>
        </div>
      </section>

    </div>
  );
}
