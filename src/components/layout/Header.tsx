import Link from "next/link";
import { LogoMark } from "./LogoMark";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

/** Server Header — no client JS. Mobile menu via native <details>. */
export function Header() {
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

          <details className="md:hidden relative group">
            <summary
              className="list-none p-2 text-[#0F3024] rounded-xl active:bg-[#FBF7F0] transition-colors cursor-pointer select-none [&::-webkit-details-marker]:hidden"
              aria-label="القائمة"
            >
              <span className="block w-5 space-y-1" aria-hidden>
                <span className="block h-0.5 bg-current rounded" />
                <span className="block h-0.5 bg-current rounded" />
                <span className="block h-0.5 bg-current rounded" />
              </span>
            </summary>
            <nav className="absolute left-0 top-full mt-1 w-56 bg-[#FBF7F0] border border-[#E6D8C8] rounded-2xl shadow-lg px-2 py-2 z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#0F3024] font-bold py-2.5 px-3 rounded-xl hover:bg-white active:bg-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
