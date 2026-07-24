export type ProductSlug = "wrinkles-dark-circles";

/** Bundle prices are plain numbers now (99 / 129 / 179). */
export type BundlePrice = number;

export type Product = {
  slug: ProductSlug;
  nameAr: string;
  nameEn: string;
  shortAr: string;
  heroAr: string;
  subAr: string;
  price: {
    one: BundlePrice;
    two: BundlePrice;
    three: BundlePrice;
    bridgeUpsell: number;
  };
  /** Number of bottles per offer tier (1 / 3 / 6). */
  bottles: {
    one: number;
    two: number;
    three: number;
  };
  image: string;
  colorAccent: string;
  sku: string;
};

export const products: Product[] = [
  {
    slug: "wrinkles-dark-circles",
    nameAr: "زيت العوافي لآلام الركبة والظهر والمفاصل",
    nameEn: "Al-Awafi Instant Pain Relief Herb Oil",
    shortAr: "آلام الركبة والظهر والمفاصل",
    heroAr: "ألم الركبة والظهر يمنعك من عيش حياتك؟",
    subAr:
      "زيت أعشاب طبيعي للاستخدام الموضعي يعالج آلام الركبة، الظهر، المفاصل، والديسك — بخّة واحدة وتدليك بسيط، بدون حبوب وبدون دفع أونلاين.",
    price: { one: 99, two: 129, three: 179, bridgeUpsell: 99 },
    bottles: { one: 1, two: 3, three: 6 },
    image: "/images/product-1.png",
    colorAccent: "#B23A2E",
    sku: "AWAFI-OIL-8842",
  },
];

export function getProduct(slug: ProductSlug): Product {
  const p = products.find((p) => p.slug === slug);
  if (!p) throw new Error(`Product not found: ${slug}`);
  return p;
}

export function getOtherProduct(slug: ProductSlug): Product {
  const other = products.find((p) => p.slug !== slug);
  if (!other) throw new Error("No other product found");
  return other;
}
