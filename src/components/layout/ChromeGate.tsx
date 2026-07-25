"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the storefront chrome (header, footer, cart, pixels) around page
 * content — except on /admin routes, which get a bare shell so the dashboard
 * is fully isolated from the shop UI and from visit/pixel tracking.
 */
export function ChromeGate({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Bare shell: admin + ad lander (/awafi) — no header/footer/toast drag on first paint
  const isBare =
    pathname?.startsWith("/admin") || pathname?.startsWith("/awafi");

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
