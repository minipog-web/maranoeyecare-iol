const { Jimp } = require('jimp');
const path = require('path');

async function run() {
  const srcPath = 'C:\\Users\\adamp\\.gemini\\antigravity-ide\\brain\\6ca2a902-af2f-40e2-9dcf-6327cc1ff988\\media__1780345395570.jpg';
  const destPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'marano_thumbnail.png');
  
  try {
    console.log('Loading image...');
    const img = await Jimp.read(srcPath);
    
    // Crop coordinate settings:
    // Original: 1024x770
    // Dr. Marano is on the right wearing yellow.
    // Let's crop from x=470 to x=990 (width 520) and y=80 to y=600 (height 520).
    const x = 470;
    const y = 80;
    const w = 520;
    const h = 520;
    
    console.log(`Cropping at: x=${x}, y=${y}, w=${w}, h=${h}...`);
    img.crop({ x, y, w, h });
    
    console.log('Resizing to 240x240...');
    img.resize({ w: 240, h: 240 });
    
    console.log('Writing to:', destPath);
    await img.write(destPath);
    console.log('Crop completed successfully!');
  } catch (err) {
    console.error('Error during image crop:', err);
  }
}

run();
