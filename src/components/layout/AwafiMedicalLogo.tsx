import { cn } from "@/lib/utils";

type AwafiMedicalLogoProps = {
  className?: string;
  iconClassName?: string;
  title?: string;
};

export function AwafiMedicalLogo({
  className,
  iconClassName,
  title = "شعار زيت العوافي",
}: AwafiMedicalLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label={title}
        className={cn("h-10 w-10 flex-shrink-0", iconClassName)}
      >
        <title>{title}</title>
        <rect x="10" y="10" width="44" height="44" rx="14" fill="#9B4C3D" />
        <path
          d="M31.2 18.5c-2.7 3.2-3.5 6.4-2.4 9.4 1 2.6 0 5-2.3 7.2-2.3 2.2-3.2 4.5-2.6 7.1"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="31.5" cy="19.5" r="1.7" fill="#FFFFFF" />
        <circle cx="32.4" cy="24.6" r="1.5" fill="#FFFFFF" />
        <circle cx="31.8" cy="29.5" r="1.8" fill="#FFFFFF" />
        <circle cx="29.8" cy="34.3" r="2.1" fill="#FFFFFF" />
        <circle cx="28.4" cy="39.4" r="2.4" fill="#FFFFFF" />
        <path
          d="M23.5 40.2c3.3-2.1 6.6-1.8 9.4 0.6 2.8 2.5 5.3 2.9 7.7 1.2"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M38.5 26c4.9 0.5 8.3 3.5 9.7 8.1-4.4 0.6-8.1-1.7-9.8-5.9"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
