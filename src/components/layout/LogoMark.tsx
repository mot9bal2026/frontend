import Link from "next/link";

export function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="زيت العوافي">
      <div className="transition-transform group-hover:scale-105">
        {/* Tiny WebP (~2KB) — never compete with LCP hero */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/awafi-logo-icon.webp"
          alt=""
          width={40}
          height={40}
          decoding="async"
          className="h-10 w-10 object-contain drop-shadow-sm"
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
