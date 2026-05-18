import Link from "next/link";

export default function Footer() {
  const menuLinks = [
    { href: "/menu?cat=burger",  label: "🍔  Бургер" },
    { href: "/menu?cat=pizza",   label: "🍕  Пицца" },
    { href: "/menu?cat=wrap",    label: "🌯  Рап" },
    { href: "/menu?cat=burrito", label: "🌮  Бурритто" },
    { href: "/menu?cat=combo",   label: "🎁  Сэт" },
    { href: "/menu#addons",      label: "🍟  Нэмэлт" },
  ];
  const accountLinks = [
    { href: "/login",    label: "Нэвтрэх" },
    { href: "/register", label: "Бүртгүүлэх" },
    { href: "/orders",   label: "Захиалгын түүх" },
    { href: "/cart",     label: "Миний сагс" },
  ];
  const contacts = [
    { icon: "📞", text: "7711-2233" },
    { icon: "📧", text: "info@fastfood.mn" },
    { icon: "📍", text: "Улаанбаатар, Монгол" },
    { icon: "🕐", text: "10:00 – 22:00 цаг" },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white">

      {/* Top wave divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-30" />

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 group mb-5 w-fit">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-[#F97316] flex items-center justify-center text-xl shadow-lg shadow-orange-900/30 group-hover:scale-105 transition-transform">
                🍔
              </div>
              <span className="text-xl font-black text-white">
                FAST<span className="text-[#F97316]">FOOD</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-[220px]">
              Монголын хамгийн хурдан, амттай онлайн захиалгын систем. Хаалган дээрх хүргэлт.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {["F", "IG", "X"].map((s) => (
                <div key={s}
                  className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-[#F97316] flex items-center justify-center text-zinc-400 hover:text-white text-xs font-black cursor-pointer transition-all duration-200 hover:scale-105">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-white font-black text-[10px] uppercase tracking-[0.18em] mb-5">Цэс</h3>
            <div className="flex flex-col gap-2.5">
              {menuLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-zinc-500 hover:text-[#F97316] transition-colors text-sm font-medium w-fit">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-black text-[10px] uppercase tracking-[0.18em] mb-5">Данс</h3>
            <div className="flex flex-col gap-2.5">
              {accountLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-zinc-500 hover:text-[#F97316] transition-colors text-sm font-medium w-fit">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-[10px] uppercase tracking-[0.18em] mb-5">Холбоо барих</h3>
            <div className="flex flex-col gap-3">
              {contacts.map(c => (
                <span key={c.text} className="flex items-center gap-3 text-zinc-500 text-sm">
                  <span className="text-base w-5 flex-shrink-0">{c.icon}</span>
                  <span className="font-medium">{c.text}</span>
                </span>
              ))}
            </div>
            {/* App badges placeholder */}
            <div className="mt-6 flex gap-2">
              <div className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl px-3 py-2 cursor-pointer">
                <span className="text-base">🍎</span>
                <div>
                  <p className="text-[9px] text-zinc-500 leading-none">Download on</p>
                  <p className="text-xs font-black text-white leading-tight">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl px-3 py-2 cursor-pointer">
                <span className="text-base">🤖</span>
                <div>
                  <p className="text-[9px] text-zinc-500 leading-none">Get it on</p>
                  <p className="text-xs font-black text-white leading-tight">Google Play</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            © 2024–2026 FastFood. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-zinc-600 text-xs">Дипломын ажил — Онлайн Захиалгын Систем</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-zinc-600 text-xs font-medium">Хэвийн ажиллаж байна</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
