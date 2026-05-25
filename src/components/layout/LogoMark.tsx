import Link from "next/link";

export function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="إشراقة للجمال">
      {/* Circular logo mark */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-sm"
        style={{ backgroundColor: "#3D2817" }}
      >
        <span className="text-white font-black text-base font-inter leading-none">إ</span>
      </div>

      {/* Brand name — Arabic large, English small — exact namabeauty style */}
      <div className="flex flex-col leading-none gap-0.5">
        <span
          className="text-[#3D2817] font-black leading-none"
          style={{ fontFamily: "Tajawal, sans-serif", fontSize: "17px" }}
        >
          إشراقة للجمال
        </span>
        <span
          className="text-[#9A8070] font-medium leading-none tracking-widest uppercase"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.12em" }}
        >
          ISHRAQA Beauty
        </span>
      </div>
    </Link>
  );
}
