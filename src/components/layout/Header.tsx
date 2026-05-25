"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "./LogoMark";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصلي معنا" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const itemCount = items.length;

  return (
    <header className="bg-white border-b border-[#E6D8C8] sticky top-0 z-40 shadow-sm">
      <div className="max-w-content mx-auto px-3 md:px-4">
        <div className="flex items-center h-14 md:h-16 gap-2">

          {/* ── LEFT side: hamburger + cart (matches namabeauty mobile layout) ── */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 text-[#3D2817] rounded-xl active:bg-[#FBF7F0] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="القائمة"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Cart — visible on all sizes, left side on mobile */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#3D2817] hover:text-[#5A3825] transition-colors rounded-xl active:bg-[#FBF7F0]"
              aria-label="السلة"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-[#3D2817] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black font-inter shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* ── Desktop nav — middle ── */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#7A6A5E] mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#3D2817] transition-colors font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Spacer — pushes brand to the RIGHT (like namabeauty) ── */}
          <div className="flex-1" />

          {/* ── RIGHT side: brand name + logo ── */}
          <div className="flex items-center gap-2">
            <LogoMark />
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FBF7F0] border-t border-[#E6D8C8] px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#3D2817] font-bold py-2.5 px-2 rounded-xl hover:bg-white active:bg-white transition-colors text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
