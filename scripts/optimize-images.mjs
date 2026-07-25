import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * Balance: sharp enough for retina, small enough for mobile 3G.
 * Hero / lifestyle: quality 82, ~900–1200px
 * Product shots: quality 85, up to 1200px
 */
const jobs = [
  { in: "public/results-carousel/slide-1.png", out: "public/results-carousel/slide-1.webp", w: 1080, q: 82 },
  { in: "public/results-carousel/slide-2.png", out: "public/results-carousel/slide-2.webp", w: 1080, q: 82 },
  { in: "public/results-carousel/slide-3.png", out: "public/results-carousel/slide-3.webp", w: 1080, q: 82 },
  { in: "public/awafi-oil-bottle.png", out: "public/awafi-oil-bottle.webp", w: 1200, q: 85 },
  { in: "public/images/praying-man-pain-relief.png", out: "public/images/praying-man-pain-relief.webp", w: 1200, q: 82 },
  { in: "public/images/product-1.png", out: "public/images/product-1.webp", w: 1080, q: 82 },
  { in: "public/images/lifestyle-couple.png", out: "public/images/lifestyle-couple.webp", w: 1200, q: 82 },
  { in: "public/pain-relief-oil-product.png", out: "public/pain-relief-oil-product.webp", w: 1000, q: 85 },
  { in: "public/product-pattern-bg.png", out: "public/product-pattern-bg.webp", w: 1400, q: 75 },
  { in: "public/awafi-oil-bottle-cutout.png", out: "public/awafi-oil-bottle-cutout.webp", w: 1000, q: 85 },
];

for (const j of jobs) {
  if (!fs.existsSync(j.in)) {
    console.warn(`skip missing: ${j.in}`);
    continue;
  }
  const before = fs.statSync(j.in).size;
  await sharp(j.in)
    .rotate()
    .resize({ width: j.w, withoutEnlargement: true })
    .webp({ quality: j.q, effort: 6 })
    .toFile(j.out);
  const after = fs.statSync(j.out).size;
  console.log(
    `${path.basename(j.in)} ${(before / 1024).toFixed(0)}KB -> ${path.basename(j.out)} ${(after / 1024).toFixed(0)}KB (q=${j.q}, w=${j.w})`
  );
}
