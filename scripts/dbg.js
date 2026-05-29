const sharp = require("sharp");
const path = require("path");
const backup = path.join(__dirname, "..", "public", "product-box-lux-original.png");
(async () => {
  const { data, info } = await sharp(backup).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, ch = info.channels;
  const get = (x, y) => [data[(y*W+x)*ch], data[(y*W+x)*ch+1], data[(y*W+x)*ch+2]];
  const lum = (r,g,b)=>0.299*r+0.587*g+0.114*b;
  const isGold=(x,y)=>{const[r,g,b]=get(x,y);return (r-b)>40&&r>160&&lum(r,g,b)>150;};
  for (const [x,y] of [[470,225],[500,225],[520,275],[560,320],[600,320]]) {
    const [r,g,b]=get(x,y);
    const goldNear=(dx,dy)=>{for(let d=1;d<=24;d++){const X=x+dx*d,Y=y+dy*d;if(isGold(X,Y))return d;}return -1;};
    console.log(x,y,"rgb",r,g,b,"lum",Math.round(lum(r,g,b)),"L",goldNear(-1,0),"R",goldNear(1,0),"U",goldNear(0,-1),"D",goldNear(0,1));
  }
})();
