// Regenerate: pnpm add -D sharp && node scripts/generate-favicon.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "src/assets/aarya1.jpg");
const OUT_DIR = path.join(ROOT, "public");

function frameSvg(size) {
  const cx = size / 2;
  const photoR = cx - Math.max(2, size * 0.025);
  const ringR = cx - Math.max(1, size * 0.012);
  const stroke = Math.max(2, size / 40);

  return Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#0a0a3b"/>
    <circle cx="${cx}" cy="${cx}" r="${ringR}" fill="none" stroke="#FBAC18" stroke-width="${stroke}"/>
    <circle cx="${cx}" cy="${cx}" r="${photoR}" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="${Math.max(1, stroke / 2)}"/>
  </svg>`);
}

async function makeIcon(size) {
  const meta = await sharp(SOURCE).metadata();
  const full = Math.min(meta.width, meta.height);
  const crop = Math.floor(full * 0.72);
  const left = Math.floor((meta.width - crop) / 2);
  const top = Math.min(Math.floor(meta.height * 0.06), meta.height - crop);

  const photoR = Math.floor(size / 2 - Math.max(2, size * 0.025));
  const photoSize = photoR * 2;

  const mask = Buffer.from(
    `<svg width="${photoSize}" height="${photoSize}">
      <circle cx="${photoR}" cy="${photoR}" r="${photoR}" fill="white"/>
    </svg>`,
  );

  const photo = await sharp(SOURCE)
    .extract({ left, top, width: crop, height: crop })
    .resize(photoSize, photoSize)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const offset = Math.floor((size - photoSize) / 2);

  return sharp(await sharp(frameSvg(size)).png().toBuffer())
    .composite([{ input: photo, left: offset, top: offset }])
    .png()
    .toBuffer();
}

const outputs = {
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "apple-touch-icon.png": 180,
  "android-chrome-192x192.png": 192,
  "android-chrome-512x512.png": 512,
};

for (const [name, size] of Object.entries(outputs)) {
  fs.writeFileSync(path.join(OUT_DIR, name), await makeIcon(size));
  console.log(`Wrote ${name}`);
}

fs.writeFileSync(path.join(OUT_DIR, "favicon.ico"), await makeIcon(32));
console.log("Wrote favicon.ico");
