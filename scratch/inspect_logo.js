const { Jimp } = require('jimp');
const path = require('path');

async function inspect() {
  try {
    const logoPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'marano_logo.png');
    const image = await Jimp.read(logoPath);
    console.log(`Dimensions: ${image.bitmap.width}x${image.bitmap.height}`);
    
    // Check some sample pixels
    const colors = new Map();
    for (let y = 0; y < image.bitmap.height; y += Math.max(1, Math.floor(image.bitmap.height / 10))) {
      for (let x = 0; x < image.bitmap.width; x += Math.max(1, Math.floor(image.bitmap.width / 10))) {
        const idx = (image.bitmap.width * y + x) * 4;
        const r = image.bitmap.data[idx];
        const g = image.bitmap.data[idx+1];
        const b = image.bitmap.data[idx+2];
        const a = image.bitmap.data[idx+3];
        const hex = `${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        colors.set(hex, (colors.get(hex) || 0) + 1);
      }
    }
    
    console.log('Sample color counts:');
    const sorted = [...colors.entries()].sort((a, b) => b[1] - a[1]);
    for (const [color, count] of sorted.slice(0, 10)) {
      console.log(`#${color}: ${count}`);
    }
  } catch (err) {
    console.error('Inspection error:', err);
  }
}

inspect();
