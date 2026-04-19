const sharp = require('sharp');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOGO = path.join(ROOT, 'assets', 'img', 'logo.png');
const OUT_DIR = path.join(ROOT, 'assets', 'img');

async function makeFavicon(size, outPath) {
  await sharp(LOGO)
    .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log('wrote', outPath);
}

(async () => {
  await makeFavicon(48, path.join(OUT_DIR, 'favicon-48.png'));
  await makeFavicon(96, path.join(OUT_DIR, 'favicon-96.png'));
  await makeFavicon(192, path.join(OUT_DIR, 'favicon-192.png'));
  await makeFavicon(512, path.join(OUT_DIR, 'favicon-512.png'));
  await makeFavicon(180, path.join(OUT_DIR, 'apple-touch-icon.png'));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
