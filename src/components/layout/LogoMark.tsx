import Link from "next/link";

export function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="إشراقة للجمال">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
        style={{ backgroundColor: "#3D2817" }}
      >
        <span className="text-white font-bold text-lg font-inter leading-none">N</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-brand-brown font-bold text-lg leading-tight" style={{ fontFamily: "Tajawal, sans-serif" }}>
          إشراقة للجمال
        </span>
        <span className="text-brand-muted text-xs font-inter leading-tight tracking-wide">
          ISHRAQA Beauty
        </span>
      </div>
    </Link>
  );
}
