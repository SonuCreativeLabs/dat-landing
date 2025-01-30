import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOGO_URL = 'https://ik.imagekit.io/projectassets/Assets/DAT%20NEW%20LOGO-04.png?updatedAt=1737985280218';
const ICONS_DIR = join(__dirname, '../public/icons');

const ICON_SIZES = [
  16, 24, 32, 64,  // favicon sizes
  72, 96, 128, 144, 152, 192, 384, 512  // PWA icon sizes
];

async function downloadImage(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    await fs.mkdir(ICONS_DIR, { recursive: true });

    // Download the logo
    console.log('Downloading logo...');
    const logoBuffer = await downloadImage(LOGO_URL);

    // Generate PWA icons
    console.log('Generating PWA icons...');
    for (const size of ICON_SIZES) {
      await sharp(logoBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(join(ICONS_DIR, `icon-${size}x${size}.png`));
      console.log(`Generated ${size}x${size} icon`);
    }

    // Generate favicon.ico with white background
    console.log('Generating favicon.ico...');
    const faviconSizes = [16, 24, 32, 64];
    const faviconBuffers = await Promise.all(
      faviconSizes.map(size =>
        sharp(logoBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid white background
          })
          .toBuffer()
      )
    );

    await sharp(faviconBuffers[0])  // Use the 16x16 as base
      .toFile(join(ICONS_DIR, 'favicon.ico'));

    // Generate apple touch icon with white background
    console.log('Generating apple touch icon...');
    await sharp(logoBuffer)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid white background
      })
      .toFile(join(ICONS_DIR, 'apple-touch-icon.png'));

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 