const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const pub = path.join(__dirname, "..", "public");
const src = path.join(pub, "product-box-lux.png");
const backup = path.join(pub, "product-box-lux-original.png");

function solve(A, b) {
  const n = b.length;
  for (let i = 0; i < n; i++) {
    let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
    [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
    for (let r = i + 1; r < n; r++) { const f = A[r][i] / A[i][i]; for (let c = i; c < n; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let c = i + 1; c < n; c++) s -= A[i][c] * x[c]; x[i] = s / A[i][i]; }
  return x;
}

(async () => {
  if (!fs.existsSync(backup)) fs.copyFileSync(src, backup);
  const { data, info } = await sharp(backup).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;
  const out = Buffer.from(data);
  const idx = (x, y) => (y * W + x) * ch;
  const get = (x, y) => [data[idx(x, y)], data[idx(x, y) + 1], data[idx(x, y) + 2]];
  const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
  const isGold = (x, y) => { const [r, g, b] = get(x, y); return (r - b) > 40 && r > 160 && lum(r, g, b) > 150; };

  const x0 = 406, x1 = 656, y0 = 182, y1 = 356;

  // --- flood fill the coffee cup (large dark region at the bottom) ---
  const cup = new Uint8Array(W * H);
  const stack = [];
  for (const [sx, sy] of [[520, 430], [560, 450], [600, 440], [640, 440], [500, 470], [560, 500]]) {
    if (lum(...get(sx, sy)) < 130) { stack.push(sx, sy); cup[sy * W + sx] = 1; }
  }
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    const nb = [[1,0],[-1,0],[0,1],[0,-1]];
    for (const [dx, dy] of nb) {
      const X = x + dx, Y = y + dy;
      if (X < 0 || Y < 0 || X >= W || Y >= H) continue;
      if (cup[Y * W + X]) continue;
      if (lum(...get(X, Y)) < 135) { cup[Y * W + X] = 1; stack.push(X, Y); }
    }
  }
  // dilate cup by 2 to keep its anti-aliased rim
  const cupD = new Uint8Array(W * H);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    if (!cup[y * W + x]) continue;
    for (let yy = -2; yy <= 2; yy++) for (let xx = -2; xx <= 2; xx++) cupD[(y + yy) * W + (x + xx)] = 1;
  }

  // --- fit degree-2 gold model ---
  const nx = (x) => (x - x0) / (x1 - x0), ny = (y) => (y - y0) / (y1 - y0);
  const basis = (x, y) => { const u = nx(x), v = ny(y); return [1, u, v, u*u, u*v, v*v]; };
  const m = 6;
  const ATA = Array.from({length:m},()=>new Array(m).fill(0));
  const ATb = [new Array(m).fill(0), new Array(m).fill(0), new Array(m).fill(0)];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (!isGold(x, y)) continue;
    const ph = basis(x, y), c = get(x, y);
    for (let i = 0; i < m; i++) { for (let j = 0; j < m; j++) ATA[i][j] += ph[i]*ph[j]; for (let k=0;k<3;k++) ATb[k][i] += ph[i]*c[k]; }
  }
  const coef = [0,1,2].map(k => solve(ATA.map(r=>r.slice()), ATb[k].slice()));
  const model = (x, y) => { const ph = basis(x,y); return [0,1,2].map(k => { let s=0; for (let i=0;i<m;i++) s+=coef[k][i]*ph[i]; return Math.max(0,Math.min(255,s)); }); };

  // --- replace gold-face pixels (everything except cup, right side) with feathered blend ---
  const smooth = (t) => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  let painted = 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (x >= 642) continue;            // box right side face
    if (cupD[y * W + x]) continue;     // coffee cup
    // feather: small on left (to fully erase leftover text), larger elsewhere
    const dLeft = (x - x0) / 6;
    const dRight = (x1 - x) / 14;
    const dTop = (y - y0) / 14;
    const dBot = (y1 - y) / 14;
    const a = smooth(Math.min(dLeft, dRight, dTop, dBot));
    const c = model(x, y);
    const i = idx(x, y);
    out[i]   = Math.round(c[0] * a + data[i] * (1 - a));
    out[i+1] = Math.round(c[1] * a + data[i+1] * (1 - a));
    out[i+2] = Math.round(c[2] * a + data[i+2] * (1 - a));
    painted++;
  }
  console.log("painted", painted);
  await sharp(out, { raw: { width: W, height: H, channels: ch } }).png().toFile(path.join(__dirname, "cleared.png"));
  await sharp(path.join(__dirname,"cleared.png")).extract({left:360,top:150,width:340,height:260}).toFile(path.join(__dirname,"cleared-crop.png"));
  console.log("done");
})();
