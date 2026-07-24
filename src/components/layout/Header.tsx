"use client";

import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "./LogoMark";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

/* Single live product — the header CTA takes the customer straight to it. */
const PRODUCT_HREF = "/products/wrinkles-dark-circles";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#E6D8C8] sticky top-0 z-40 shadow-sm">
      <div className="max-w-content mx-auto px-3 md:px-4">
        {/*
          RTL flex: first child → RIGHT, last child → LEFT
          namabeauty layout: [brand RIGHT] ... spacer ... [cart + hamburger LEFT]
        */}
        <div className="flex items-center h-14 md:h-16">

          {/* ── 1st child = RIGHT in RTL: brand name ── */}
          <LogoMark />

          {/* ── Desktop nav — after brand, flows left ── */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#7A6A5E] mr-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#0F3024] transition-colors font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Spacer ── */}
          <div className="flex-1" />

          {/* ── Last child = LEFT in RTL: order CTA + hamburger ── */}
          <div className="flex items-center gap-1.5">
            {/* Order now — no cart; goes straight to the product order form */}
            <Link
              href={PRODUCT_HREF}
              className="flex items-center gap-1.5 bg-brand-apothecary text-white font-black text-[12.5px] md:text-sm px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl hover:bg-brand-apothecaryDark transition-colors active:scale-95 shadow-sm"
            >
              <ShoppingBag size={16} />
              اطلب الآن
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 text-[#0F3024] rounded-xl active:bg-[#FBF7F0] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="القائمة"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
                className="text-[#0F3024] font-bold py-2.5 px-2 rounded-xl hover:bg-white active:bg-white transition-colors text-sm"
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

