const { Jimp } = require('jimp');
const path = require('path');

const srcPath = 'C:\\Users\\adamp\\.gemini\\antigravity-ide\\brain\\ef4b89c5-08d6-4970-b0da-752a2451313b\\media__1781290310235.jpg';
const destPath = path.join(__dirname, '../public/assets/images/Marano-1777328574709.jpg');

async function run() {
  try {
    const img = await Jimp.read(srcPath);
    
    // We want a portrait crop.
    // Width = 512, Height = 640 (aspect ratio 4:5)
    // Centered horizontally: x = (1024 - 512) / 2 = 256
    // Shift slightly to the right to center his face (his head is slightly right of center): x = 270
    // Vertically: start at y = 0
    const cropX = 270;
    const cropY = 0;
    const cropW = 512;
    const cropH = 640;
    
    console.log(`Cropping from: x=${cropX}, y=${cropY}, w=${cropW}, h=${cropH}`);
    img.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
    
    // Resize to 400px width for fast loading while maintaining high visual quality
    img.resize({ w: 400, h: 500 });
    
    await img.write(destPath, { quality: 85 });
    console.log('Successfully cropped and saved Dr. Marano portrait to public assets!');
  } catch (err) {
    console.error('Error cropping image:', err);
  }
}

run();
