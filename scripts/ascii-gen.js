// scripts/ascii-gen.js
import sharp from "sharp";
import { writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CHAR_WIDTH = 80;
const CHAR_HEIGHT_RATIO = 0.45; // monospace chars are taller than wide
const CHARS = " ░▒▓█"; // dark → light

async function generateAscii() {
  const inputPath = resolve(__dirname, "../public/images/portrait.jpg");
  const outputPath = resolve(__dirname, "../src/data/ascii.txt");

  // Graceful fallback: if portrait.jpg doesn't exist, skip generation
  if (!existsSync(inputPath)) {
    console.warn(`⚠️  Portrait image not found at ${inputPath}`);
    console.warn(
      "Skipping ASCII art generation. Make sure to commit portrait.jpg and ascii.txt for production.",
    );
    process.exit(0);
  }

  const height = Math.round(CHAR_WIDTH * CHAR_HEIGHT_RATIO);

  const { data, info } = await sharp(inputPath)
    .resize(CHAR_WIDTH, height)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rows = [];
  for (let y = 0; y < info.height; y++) {
    let row = "";
    for (let x = 0; x < info.width; x++) {
      const pixel = data[y * info.width + x];
      const charIndex = Math.floor((pixel / 255) * (CHARS.length - 1));
      row += CHARS[charIndex];
    }
    rows.push(row);
  }

  writeFileSync(outputPath, rows.join("\n"), "utf-8");
  console.log(
    `ASCII art written to ${outputPath} (${info.width}×${info.height} chars)`,
  );
}

generateAscii().catch(console.error);
