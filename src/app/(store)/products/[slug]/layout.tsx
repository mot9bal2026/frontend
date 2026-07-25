export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/results-carousel/slide-1-m.webp"
        type="image/webp"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
