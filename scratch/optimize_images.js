const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/assets/images');

const imagesToOptimize = [
  // Simulator images (Huge 2MB+ PNGs -> clean 80% JPEGs, max width 1200px)
  { src: 'eyhance_day_distance_pro.png', dest: 'eyhance_day_distance_pro.jpg', width: 1200 },
  { src: 'monofocal_day_distance_pro.png', dest: 'monofocal_day_distance_pro.jpg', width: 1200 },
  { src: 'monofocal_day_intermediate_pro.png', dest: 'monofocal_day_intermediate_pro.jpg', width: 1200 },
  { src: 'monofocal_day_near_pro_v2.png', dest: 'monofocal_day_near_pro_v2.jpg', width: 1200 },
  { src: 'eyhance_day_intermediate_pro_v2.png', dest: 'eyhance_day_intermediate_pro_v2.jpg', width: 1200 },
  { src: 'eyhance_day_near_pro_v2.png', dest: 'eyhance_day_near_pro_v2.jpg', width: 1200 },
  { src: 'panoptix_day_near_pro.png', dest: 'panoptix_day_near_pro.jpg', width: 1200 },
  { src: 'vivity_day_near_pro.png', dest: 'vivity_day_near_pro.jpg', width: 1200 },
  { src: 'sharp_day_intermediate_pro.png', dest: 'sharp_day_intermediate_pro.jpg', width: 1200 },
  { src: 'day_intermediate.png', dest: 'day_intermediate.jpg', width: 1200 },

  // Avatars (Tiny display, 600KB+ source -> 96px width JPGs)
  { src: 'avatar_patricia.png', dest: 'avatar_patricia.jpg', width: 128 },
  { src: 'avatar_robert.png', dest: 'avatar_robert.jpg', width: 128 },
  { src: 'avatar_linda.png', dest: 'avatar_linda.jpg', width: 128 },
  { src: 'avatar_james.png', dest: 'avatar_james.jpg', width: 128 },

  // Profiles (Candidate cards -> 400px width JPEGs)
  { src: 'profile_active_professional.png', dest: 'profile_active_professional.jpg', width: 400 },
  { src: 'profile_conservative_candidate.png', dest: 'profile_conservative_candidate.jpg', width: 400 },
  { src: 'profile_tech_conscious.png', dest: 'profile_tech_conscious.jpg', width: 400 },

  // Surgeon portrait (overflow hidden container -> 500px width JPEG)
  { src: 'Marano-1777328574709.png', dest: 'Marano-1777328574709.jpg', width: 600 },

  // Lens illustrations (Dark background, 500KB+ source -> 400px width JPEGs)
  { src: 'vivity_iol_dark.png', dest: 'vivity_iol_dark.jpg', width: 400 },
  { src: 'panoptix_iol_dark.png', dest: 'panoptix_iol_dark.jpg', width: 400 },
  { src: 'eyhance_iol_dark.png', dest: 'eyhance_iol_dark.jpg', width: 400 },
  { src: 'monofocal_iol_dark.png', dest: 'monofocal_iol_dark.jpg', width: 400 },
];

async function run() {
  console.log('Starting image optimization pass...');
  
  for (const task of imagesToOptimize) {
    const srcPath = path.join(IMAGES_DIR, task.src);
    const destPath = path.join(IMAGES_DIR, task.dest);
    
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file not found: ${task.src}`);
      continue;
    }
    
    try {
      console.log(`Processing: ${task.src} -> ${task.dest} (width: ${task.width})`);
      const img = await Jimp.read(srcPath);
      
      // Resize preserving aspect ratio if larger than target width
      if (img.bitmap.width > task.width) {
        const w = task.width;
        const h = Math.round(img.bitmap.height * (w / img.bitmap.width));
        img.resize({ w, h });
      }
      
      // Save as JPEG with quality 80
      await img.write(destPath, { quality: 80 });
      
      const srcSize = fs.statSync(srcPath).size;
      const destSize = fs.statSync(destPath).size;
      const reduction = ((srcSize - destSize) / srcSize * 100).toFixed(1);
      
      console.log(`  Success! Size reduced from ${(srcSize / 1024 / 1024).toFixed(2)} MB to ${(destSize / 1024).toFixed(1)} KB (-${reduction}%)`);
    } catch (err) {
      console.error(`  Error processing ${task.src}:`, err);
    }
  }
  
  console.log('Image optimization pass complete.');
}

run();
