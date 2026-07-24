import Image from "next/image";
import Link from "next/link";

export function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="زيت العوافي">
      <div className="transition-transform group-hover:scale-105">
        <Image
          src="/awafi-logo-icon.png"
          alt="زيت العوافي"
          width={40}
          height={40}
          className="h-10 w-10 object-contain drop-shadow-sm"
          priority
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-black text-lg text-[#0F3024] leading-none">
          زيت العوافي
        </span>
        <span className="text-[10px] font-semibold tracking-wide text-[#7A6A5E] leading-none mt-1">
          Awafi Joint Pain Oil
        </span>
      </div>
    </Link>
  );
}
