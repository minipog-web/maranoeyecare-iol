const { Jimp } = require('jimp');
const path = require('path');

async function inspect(filename) {
  try {
    const logoPath = path.join(__dirname, '..', 'public', 'assets', 'images', filename);
    const image = await Jimp.read(logoPath);
    console.log(`\n--- Inspecting ${filename} ---`);
    console.log(`Dimensions: ${image.bitmap.width}x${image.bitmap.height}`);
    
    let transparentCount = 0;
    let whiteCount = 0;
    let otherCount = 0;
    const colors = new Map();
    
    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        const idx = (image.bitmap.width * y + x) * 4;
        const r = image.bitmap.data[idx];
        const g = image.bitmap.data[idx+1];
        const b = image.bitmap.data[idx+2];
        const a = image.bitmap.data[idx+3];
        
        if (a === 0) {
          transparentCount++;
        } else if (r > 240 && g > 240 && b > 240) {
          whiteCount++;
        } else {
          otherCount++;
          const hex = `${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
          colors.set(hex, (colors.get(hex) || 0) + 1);
        }
      }
    }
    
    console.log(`Total pixels: ${image.bitmap.width * image.bitmap.height}`);
    console.log(`Transparent pixels: ${transparentCount} (${((transparentCount / (image.bitmap.width * image.bitmap.height)) * 100).toFixed(2)}%)`);
    console.log(`White/near-white pixels: ${whiteCount} (${((whiteCount / (image.bitmap.width * image.bitmap.height)) * 100).toFixed(2)}%)`);
    console.log(`Other opaque pixels: ${otherCount} (${((otherCount / (image.bitmap.width * image.bitmap.height)) * 100).toFixed(2)}%)`);
    
    console.log('Sample non-white opaque color counts (top 5):');
    const sorted = [...colors.entries()].sort((a, b) => b[1] - a[1]);
    for (const [color, count] of sorted.slice(0, 5)) {
      console.log(`#${color}: ${count}`);
    }
  } catch (err) {
    console.error(`Error inspecting ${filename}:`, err);
  }
}

async function run() {
  await inspect('marano_logo.png');
  await inspect('app_logo.png');
  await inspect('Marano_Eye_Care-1777160896260.png');
}

run();
