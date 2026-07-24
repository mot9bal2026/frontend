import Link from "next/link";
import { AwafiMedicalLogo } from "./AwafiMedicalLogo";

export function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="زيت العوافي">
      <div className="transition-transform group-hover:scale-105">
        <AwafiMedicalLogo iconClassName="h-10 w-10 drop-shadow-sm" />
      </div>

      {/* Brand name — Arabic large, English small (Apothecary-style lockup) */}
      <div className="flex flex-col leading-none gap-0.5">
        <span
          className="text-[#0F3024] font-black leading-none"
          style={{ fontFamily: "Tajawal, sans-serif", fontSize: "18px", letterSpacing: "-0.01em" }}
        >
          زيت العوافي
        </span>
        <span
          className="text-[#1E5B3F] font-semibold leading-none tracking-widest uppercase"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "8.5px", letterSpacing: "0.18em" }}
        >
          AL-AWAFI · PAIN RELIEF OIL
        </span>
      </div>
    </Link>
  );
}

