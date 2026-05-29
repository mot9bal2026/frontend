const sharp = require("sharp");
const path = require("path");
const file = path.join(__dirname, "..", "public", "product-box-lux.png");
(async () => {
  await sharp(file).extract({ left: 430, top: 170, width: 320, height: 200 })
    .toFile(path.join(__dirname, "crop-title2.png"));
  console.log("done");
})();
