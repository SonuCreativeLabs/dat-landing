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

    // Generate Microsoft tile icons
    console.log('Generating Microsoft tile icons...');
    const tileSizes = [70, 150, 310];
    for (const size of tileSizes) {
      await sharp(logoBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(join(ICONS_DIR, `ms-icon-${size}x${size}.png`));
      console.log(`Generated ${size}x${size} Microsoft tile icon`);
    }

    // Generate favicon.ico with multiple sizes
    console.log('Generating favicon.ico...');
    const faviconSizes = [16, 24, 32, 64];
    const faviconBuffers = await Promise.all(
      faviconSizes.map(size =>
        sharp(logoBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .toBuffer()
      )
    );

    await sharp(faviconBuffers[0])
      .toFile(join(__dirname, '../public/favicon.ico'));

    // Generate apple touch icon
    console.log('Generating apple touch icon...');
    await sharp(logoBuffer)
      .resize(160, 160, {  // Slightly smaller size to add padding
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .extend({
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFormat('png')
      .toFile(join(ICONS_DIR, 'apple-touch-icon.png'));

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 