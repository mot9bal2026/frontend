const sharp = require("sharp");
const path = require("path");

const dir = __dirname;
const cleared = path.join(dir, "cleared.png");
const outFile = path.join(dir, "..", "public", "product-box-lux.png");

const cx = 528; // center of gold area
const svg = `
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <g fill="#2a1709" font-family="'Times New Roman', Georgia, serif" text-anchor="middle">
    <text x="${cx}" y="252" font-size="50" font-weight="700" letter-spacing="1">ISHRAQA</text>
    <text x="${cx}" y="305" font-size="33" font-weight="600">Collagen Coffee</text>
  </g>
</svg>`;

(async () => {
  await sharp(cleared)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toFile(outFile);
  await sharp(outFile).extract({ left: 360, top: 150, width: 340, height: 260 }).toFile(path.join(dir, "final-crop.png"));
  console.log("done");
})();
