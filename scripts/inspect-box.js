const sharp = require("sharp");
const path = require("path");
const file = path.join(__dirname, "..", "public", "product-box-lux.png");
(async () => {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, ch = info.channels;
  const px = (x, y) => { const i = (y * W + x) * ch; return [data[i], data[i+1], data[i+2]]; };
  const isGold = (x,y) => { const [r,g,b]=px(x,y); return (r-b) > 45 && r > 150; };
  // For each column, scan downward from y=250 to find first non-gold (cup/text top)
  for (let x=420; x<=640; x+=20){
    let firstDark=-1;
    for(let y=300;y<420;y++){ if(!isGold(x,y)){ firstDark=y; break; } }
    process.stdout.write(`x${x}:${firstDark} `);
  }
  console.log();
})();
