import { cn } from "@/lib/utils";

type IshraqaLogoProps = {
  className?: string;
  iconClassName?: string;
  title?: string;
};

/** ISHRAQA Beauty mark — a coffee cup catching a rising glow (radiance). */
export function IshraqaLogo({
  className,
  iconClassName,
  title = "شعار إشراقة للجمال",
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
        <rect x="6" y="6" width="52" height="52" rx="16" fill="#164A32" />

        {/* Rising glow rays behind the cup */}
        <g stroke="#C8A876" strokeWidth="2" strokeLinecap="round">
          <path d="M32 14v5" />
          <path d="M22.5 17.5l3 4" />
          <path d="M41.5 17.5l-3 4" />
        </g>

        {/* Coffee cup */}
        <path
          d="M20 27h20l-1.6 15.2A5 5 0 0 1 33.4 47H26.6a5 5 0 0 1-5-4.8L20 27Z"
          fill="#FAF6F0"
        />
        {/* Steam / radiance above the coffee */}
        <path
          d="M25.5 24c-1.2-1.6-1.2-3 0-4.6M32 23.5c-1.2-1.8-1.2-3.4 0-5.2M38.5 24c-1.2-1.6-1.2-3 0-4.6"
          fill="none"
          stroke="#C8A876"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Cup handle */}
        <path
          d="M40 30.5c3 .3 4.8 2.2 4.4 5-.4 2.7-2.8 4.2-5.6 3.9"
          fill="none"
          stroke="#C8A876"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Coffee surface glint (the "إشراقة" glow) */}
        <ellipse cx="30" cy="28.6" rx="6.4" ry="1.6" fill="#C8A876" />
      </svg>
    </div>
  );
}
