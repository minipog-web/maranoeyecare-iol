const { Jimp } = require('jimp');

async function run() {
  const imgPath = 'C:\\Users\\adamp\\.gemini\/\/antigravity-ide\\brain\\6ca2a902-af2f-40e2-9dcf-6327cc1ff988\\media__1780345395570.jpg';
  try {
    const img = await Jimp.read(imgPath);
    console.log(`Original dimensions: ${img.bitmap.width}x${img.bitmap.height}`);
  } catch (err) {
    console.error('Error reading image:', err);
  }
}

run();
