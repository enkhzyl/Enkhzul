"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function HeroButtons() {
  const { user, isLoading } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
      <Link
        href="/menu"
        className="btn-lime inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-black rounded-2xl shadow-md shadow-orange-200"
      >
        Захиалга хийх →
      </Link>
      {!isLoading && !user && (
        <Link
          href="/register"
          className="btn-outline inline-flex items-center justify-center gap-2 px-7 py-4 text-base rounded-2xl"
        >
          Бүртгүүлэх
        </Link>
      )}
      {!isLoading && user && (
        <Link
          href="/orders"
          className="btn-outline inline-flex items-center justify-center gap-2 px-7 py-4 text-base rounded-2xl"
        >
          Захиалгын түүх
        </Link>
      )}
    </div>
  );
}

export function CtaButtons() {
  const { user, isLoading } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link
        href="/menu"
        className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white font-black px-8 py-4 rounded-2xl text-base hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/30"
      >
        Меню үзэх →
      </Link>
      {!isLoading && !user && (
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/20 transition-all"
        >
          Бүртгүүлэх
        </Link>
      )}
      {!isLoading && user && (
        <Link
          href="/cart"
          className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/20 transition-all"
        >
          Сагс харах
        </Link>
      )}
    </div>
  );
}
