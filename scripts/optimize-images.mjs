import sharp from "sharp";
import fs from "fs";
import path from "path";

const jobs = [
  { in: "public/results-carousel/slide-1.png", out: "public/results-carousel/slide-1.webp", w: 900 },
  { in: "public/results-carousel/slide-2.png", out: "public/results-carousel/slide-2.webp", w: 900 },
  { in: "public/results-carousel/slide-3.png", out: "public/results-carousel/slide-3.webp", w: 900 },
  { in: "public/awafi-oil-bottle.png", out: "public/awafi-oil-bottle.webp", w: 800 },
  { in: "public/images/praying-man-pain-relief.png", out: "public/images/praying-man-pain-relief.webp", w: 1000 },
  { in: "public/images/product-1.png", out: "public/images/product-1.webp", w: 900 },
  { in: "public/images/lifestyle-couple.png", out: "public/images/lifestyle-couple.webp", w: 1000 },
  { in: "public/pain-relief-oil-product.png", out: "public/pain-relief-oil-product.webp", w: 900 },
];

for (const j of jobs) {
  const before = fs.statSync(j.in).size;
  await sharp(j.in)
    .rotate()
    .resize({ width: j.w, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(j.out);
  const after = fs.statSync(j.out).size;
  console.log(
    `${path.basename(j.in)} ${(before / 1024).toFixed(0)}KB -> ${path.basename(j.out)} ${(after / 1024).toFixed(0)}KB`
  );
}
