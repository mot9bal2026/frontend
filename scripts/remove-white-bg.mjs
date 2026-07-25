import sharp from "sharp";
import path from "path";

const input = process.argv[2];
const output = process.argv[3];
const threshold = Number(process.argv[4] ?? 245);

if (!input || !output) {
  console.error("Usage: node remove-white-bg.mjs <input> <output> [threshold]");
  process.exit(1);
}

const img = sharp(input).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= threshold && g >= threshold && b >= threshold) {
    data[i + 3] = 0;
  } else if (r >= threshold - 25 && g >= threshold - 25 && b >= threshold - 25) {
    // Soft edge feather for anti-aliased white halos
    const avg = (r + g + b) / 3;
    const alpha = Math.max(0, Math.min(255, ((threshold - avg) / 25) * 255));
    data[i + 3] = alpha;
  }
}

await sharp(data, { raw: info })
  .png()
  .toFile(output);

console.log("Wrote", path.resolve(output));
