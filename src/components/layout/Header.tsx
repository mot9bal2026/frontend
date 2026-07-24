"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "./LogoMark";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#E6D8C8] sticky top-0 z-40 shadow-sm">
      <div className="max-w-content mx-auto px-3 md:px-4">
        <div className="flex items-center h-14 md:h-16">
          <LogoMark />

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

          <div className="flex-1" />

          <button
            className="md:hidden p-2 text-[#0F3024] rounded-xl active:bg-[#FBF7F0] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

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
