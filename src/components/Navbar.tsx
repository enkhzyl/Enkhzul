"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartSidebar from "./CartSidebar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [cartOpen, setCartOpen]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { href: "/",           label: "Нүүр" },
    { href: "/menu",       label: "Меню" },
    { href: "/menu#addons", label: "Нэмэлт" },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.09)] border-b border-zinc-100"
          : "bg-white/95 backdrop-blur-md border-b border-zinc-100/70"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[66px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-[#F97316] to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-orange-200 group-hover:scale-105 group-hover:shadow-orange-300 transition-all duration-200">
                🍔
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-black tracking-tight text-zinc-900">
                  FAST<span className="text-[#F97316]">FOOD</span>
                </span>
                <span className="text-[9px] text-zinc-400 font-bold tracking-[0.15em] uppercase hidden sm:block mt-0.5">
                  Онлайн захиалга
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center bg-zinc-50 border border-zinc-100 rounded-2xl p-1.5 gap-0.5">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link key={l.href} href={l.href}
                    className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-white text-zinc-900 shadow-sm border border-zinc-100/80"
                        : "text-zinc-500 hover:text-zinc-800 hover:bg-white/70"
                    }`}>
                    {l.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-2">

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-black transition-all duration-200 shadow-md shadow-orange-200/70 hover:shadow-orange-300/70 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
              >
                <span className="text-base leading-none">🛒</span>
                <span className="hidden sm:inline">Сагс</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 px-3 py-2 rounded-xl text-sm transition-all duration-200 active:scale-95"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-[#F97316] flex items-center justify-center text-xs font-black text-white shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline font-bold text-sm text-zinc-800 max-w-[80px] truncate">
                      {user.name.split(" ")[0]}
                    </span>
                    <span className={`text-zinc-400 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-zinc-100 rounded-2xl shadow-2xl shadow-zinc-200/60 overflow-hidden z-50 slide-down">
                        <div className="px-4 py-3.5 bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-[#F97316] flex items-center justify-center text-sm font-black text-white shadow-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-black text-zinc-900 text-sm leading-tight truncate max-w-[140px]">{user.name}</p>
                              <p className="text-[10px] text-zinc-400 font-medium truncate max-w-[140px]">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-1.5">
                          <Link href="/orders"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 hover:bg-orange-50 hover:text-[#F97316] rounded-xl transition-colors font-semibold"
                            onClick={() => setDropdownOpen(false)}>
                            <span className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center text-sm">📋</span>
                            Миний захиалга
                          </Link>
                          {user.role === "admin" && (
                            <Link href="/admin"
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-purple-600 hover:bg-purple-50 rounded-xl transition-colors font-semibold"
                              onClick={() => setDropdownOpen(false)}>
                              <span className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center text-sm">🛡️</span>
                              Admin панель
                            </Link>
                          )}
                          <div className="my-1 border-t border-zinc-100" />
                          <button onClick={() => { logout(); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold">
                            <span className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center text-sm">🚪</span>
                            Системээс гарах
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <Link href="/login"
                    className="px-4 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 font-bold transition-colors rounded-xl hover:bg-zinc-50">
                    Нэвтрэх
                  </Link>
                  <Link href="/register"
                    className="px-4 py-2.5 text-sm font-black text-white bg-zinc-900 hover:bg-zinc-700 rounded-xl transition-all active:scale-95 shadow-sm hover:shadow-md">
                    Бүртгүүлэх
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-50 transition-all text-lg font-black"
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-zinc-100 slide-down">
              <div className="flex flex-col gap-1 pt-3">
                {navLinks.map(l => (
                  <Link key={l.href} href={l.href}
                    className="py-2.5 px-3 text-zinc-700 hover:text-[#F97316] hover:bg-orange-50 rounded-xl text-sm font-bold transition-colors"
                    onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                ))}
                {!user && (
                  <>
                    <div className="border-t border-zinc-100 my-1.5" />
                    <Link href="/login"
                      className="py-2.5 px-3 text-zinc-700 hover:bg-zinc-50 rounded-xl text-sm font-bold"
                      onClick={() => setMenuOpen(false)}>
                      Нэвтрэх
                    </Link>
                    <Link href="/register"
                      className="py-2.5 px-3 text-white bg-zinc-900 rounded-xl text-sm font-black text-center"
                      onClick={() => setMenuOpen(false)}>
                      Бүртгүүлэх
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
