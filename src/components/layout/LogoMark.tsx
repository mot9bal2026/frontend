import Link from "next/link";

export function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="إشراقة للجمال">
      {/* Circular logo mark */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-sm overflow-hidden border border-[#E6D8C8] bg-[#FAF6F0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-icon.png" alt="إشراقة للجمال" className="w-full h-full object-cover" />
      </div>

      {/* Brand name — Arabic large, English small (Apothecary-style lockup) */}
      <div className="flex flex-col leading-none gap-0.5">
        <span
          className="text-[#3D2817] font-black leading-none"
          style={{ fontFamily: "Tajawal, sans-serif", fontSize: "18px", letterSpacing: "-0.01em" }}
        >
          إشراقة
        </span>
        <span
          className="text-[#1E5B3F] font-semibold leading-none tracking-widest uppercase"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "8.5px", letterSpacing: "0.18em" }}
        >
          ISHRAQA · BEAUTY COFFEE
        </span>
      </div>
    </Link>
  );
}
