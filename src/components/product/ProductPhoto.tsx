"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** Real product photo path in /public, e.g. "/awafi-oil-bottle.png" */
  src: string;
  alt: string;
  className?: string;
  /** Extra classes applied only to the icon fallback wrapper */
  fallbackWrapperClassName?: string;
  iconSize?: number;
  /** Mark as the largest-contentful-paint candidate to skip lazy-loading */
  priority?: boolean;
  sizes?: string;
};

/**
 * Renders the real product photo. If the file hasn't been added to /public yet
 * (or fails to load for any reason), falls back to a clean brand-colored bottle
 * icon instead of a broken image — so we never show a wrong/mismatched photo.
 */
export function ProductPhoto({
  src,
  alt,
  className,
  fallbackWrapperClassName,
  iconSize = 40,
  priority = false,
  sizes = "(min-width: 768px) 400px, 90vw",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center ${fallbackWrapperClassName ?? className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        <BottleIcon size={iconSize} />
      </div>
    );
  }

  // `className` historically carried both sizing (w-8 h-8, h-full w-full…)
  // and object-fit for a plain <img>. With next/image's `fill` mode, the
  // Image element itself must stay position:absolute/inset-0, so sizing
  // classes move to a relatively-positioned wrapper while only the
  // object-fit class stays on the <Image>.
  const objectFitMatch = className?.match(/object-(cover|contain|fill|none|scale-down)/);
  const objectFitClass = objectFitMatch?.[0] ?? "object-cover";

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={85}
        // Already-optimized WebP masters skip the image optimizer hop.
        unoptimized={src.endsWith(".webp") || src.endsWith(".avif")}
        className={objectFitClass}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function BottleIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.7}
      viewBox="0 0 48 82"
      className={className}
      aria-hidden="true"
    >
      <rect x="17" y="2" width="14" height="8" rx="2" fill="#C9CBCA" />
      <rect x="15" y="9" width="18" height="6" rx="1.5" fill="#E9EAE8" />
      <path
        d="M12 20 C12 16 15 15 15 15 H33 C33 15 36 16 36 20 V72 C36 77 32 80 24 80 C16 80 12 77 12 72 Z"
        fill="#FFFFFF"
        stroke="#E6D8C8"
        strokeWidth="1.5"
      />
      <rect x="12.5" y="42" width="23" height="16" rx="1.5" fill="#A6432E" />
      <circle cx="24" cy="6" r="1.4" fill="#8B8D8B" />
    </svg>
  );
}
