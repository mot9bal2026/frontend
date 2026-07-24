import { cn } from "@/lib/utils";

type IshraqaLogoProps = {
  className?: string;
  iconClassName?: string;
  title?: string;
};

/** AWAFI Pain Relief mark — a drop of oil containing a spine/joint, with a natural leaf. */
export function IshraqaLogo({
  className,
  iconClassName,
  title = "شعار عوافي",
}: IshraqaLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label={title}
        className={cn("h-10 w-10 flex-shrink-0", iconClassName)}
      >
        <title>{title}</title>
        <rect x="6" y="6" width="52" height="52" rx="16" fill="#A6432E" />

        {/* Sparkle / Relief Glow */}
        <path d="M 46 22 Q 46 16 52 16 Q 46 16 46 10 Q 46 16 40 16 Q 46 16 46 22" fill="#C8A876" />
        <path d="M 16 18 Q 16 14 20 14 Q 16 14 16 10 Q 16 14 12 14 Q 16 14 16 18" fill="#C8A876" opacity="0.6" />

        {/* Herb Leaf sprouting from behind the drop */}
        <path d="M 24 34 Q 12 32 12 20 Q 22 20 25 28 Z" fill="#C8A876" />

        {/* Oil Drop */}
        <path
          d="M32 14 C32 14 20 28 20 38 C20 44.6 25.4 50 32 50 C38.6 50 44 44.6 44 38 C44 28 32 14 32 14 Z"
          fill="#FAF6F0"
        />

        {/* Spine / Joints (Cutout effect inside the drop) */}
        <g fill="#A6432E">
          {/* Connecting line */}
          <rect x="31" y="28" width="2" height="18" rx="1" fill="#A6432E" opacity="0.3" />
          {/* Vertebrae blocks */}
          <rect x="29.5" y="27" width="5" height="3.5" rx="1.5" />
          <rect x="28" y="32.5" width="8" height="4" rx="1.5" />
          <rect x="28" y="38.5" width="8" height="4" rx="1.5" />
          <rect x="29.5" y="44.5" width="5" height="3.5" rx="1.5" />
        </g>
      </svg>
    </div>
  );
}
