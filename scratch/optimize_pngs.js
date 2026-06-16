const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/assets/images');

async function run() {
  console.log('Optimizing remaining high-resolution assets...');

  // 1. Optimize clean IOL images (keep transparency, resize to 400x400 PNG)
  const cleanIols = [
    'vivity_iol_clean.png',
    'panoptix_iol_clean.png',
    'eyhance_iol_clean.png'
  ];

  for (const name of cleanIols) {
    const srcPath = path.join(IMAGES_DIR, name);
    if (fs.existsSync(srcPath)) {
      try {
        console.log(`Resizing PNG: ${name} to 400x400...`);
        const img = await Jimp.read(srcPath);
        img.resize({ w: 400, h: 400 });
        
        const backupPath = srcPath + '.backup';
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(srcPath, backupPath);
        }
        
        await img.write(srcPath);
        const originalSize = fs.statSync(backupPath).size;
        const newSize = fs.statSync(srcPath).size;
        console.log(`  Success! Size reduced from ${(originalSize / 1024).toFixed(1)} KB to ${(newSize / 1024).toFixed(1)} KB (-${((originalSize - newSize) / originalSize * 100).toFixed(1)}%)`);
      } catch (err) {
        console.error(`  Error optimizing ${name}:`, err);
      }
    }
  }

  // 2. Optimize app_logo.png (resize to 200px width PNG)
  const logoPath = path.join(IMAGES_DIR, 'app_logo.png');
  if (fs.existsSync(logoPath)) {
    try {
      console.log('Optimizing app_logo.png...');
      const img = await Jimp.read(logoPath);
      const w = 200;
      const h = Math.round(img.bitmap.height * (w / img.bitmap.width));
      img.resize({ w, h });

      const backupPath = logoPath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(logoPath, backupPath);
      }

      await img.write(logoPath);
      const originalSize = fs.statSync(backupPath).size;
      const newSize = fs.statSync(logoPath).size;
      console.log(`  Success! app_logo.png reduced from ${(originalSize / 1024).toFixed(1)} KB to ${(newSize / 1024).toFixed(1)} KB (-${((originalSize - newSize) / originalSize * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error('  Error optimizing app_logo.png:', err);
    }
  }

  // 3. Optimize lensar_ally_screen.png -> convert to lensar_ally_screen.jpg (600px width)
  const lensarPath = path.join(IMAGES_DIR, 'lensar_ally_screen.png');
  const lensarDestPath = path.join(IMAGES_DIR, 'lensar_ally_screen.jpg');
  if (fs.existsSync(lensarPath)) {
    try {
      console.log('Optimizing lensar_ally_screen.png -> converting to JPG...');
      const img = await Jimp.read(lensarPath);
      const w = 600;
      const h = Math.round(img.bitmap.height * (w / img.bitmap.width));
      img.resize({ w, h });
      
      await img.write(lensarDestPath, { quality: 82 });
      const originalSize = fs.statSync(lensarPath).size;
      const newSize = fs.statSync(lensarDestPath).size;
      console.log(`  Success! lensar_ally_screen.jpg created. Size reduced from ${(originalSize / 1024).toFixed(1)} KB to ${(newSize / 1024).toFixed(1)} KB (-${((originalSize - newSize) / originalSize * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error('  Error optimizing lensar_ally_screen.png:', err);
    }
  }
}

run();
