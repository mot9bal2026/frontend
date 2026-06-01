export type ProductSlug = "wrinkles-dark-circles";

export type BundlePrice = 129 | 199 | 239;

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
  image: string;
  colorAccent: string;
  sku: string;
};

export const products: Product[] = [
  {
    slug: "wrinkles-dark-circles",
    nameAr: "قهوة الكولاجين للتجاعيد والهالات السوداء",
    nameEn: "Collagen Coffee for Wrinkles and Dark Circles",
    shortAr: "التجاعيد والهالات السوداء",
    heroAr: "التجاعيد والهالات صارت تظهر قبل وقتها؟",
    subAr:
      "قهوة كولاجين يومية لدعم مظهر البشرة وتقليل مظهر التعب حول العين.",
    price: { one: 129, two: 199, three: 239, bridgeUpsell: 99 },
    image: "/images/product-1.webp",
    colorAccent: "#E3998B",
    sku: "ISHR-CLG-8842",
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
