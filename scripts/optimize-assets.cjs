const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images');

async function optimize() {
  console.log('--- Optimizing heavy images for Netlify production performance ---');

  // 1. Five huge 1024x1024 avatars (currently ~800KB each, displayed at 48x48)
  const avatars = [
    'avatar_donna.jpg',
    'avatar_eleanor.jpg',
    'avatar_evelyn.jpg',
    'avatar_marcus.jpg',
    'avatar_thomas.jpg',
  ];

  for (const name of avatars) {
    const file = path.join(imagesDir, name);
    if (!fs.existsSync(file)) continue;
    const beforeSize = fs.statSync(file).size;
    const img = await Jimp.read(file);
    img.resize({ w: 128, h: 128 });
    const buffer = await img.getBuffer('image/jpeg', { quality: 80 });
    fs.writeFileSync(file, buffer);
    const afterSize = fs.statSync(file).size;
    console.log(`Avatar ${name}: ${(beforeSize / 1024).toFixed(1)} KB -> ${(afterSize / 1024).toFixed(1)} KB`);
  }

  // 2. Hero lens cards (currently 1024x1024, ~420KB each, displayed in 162px wide card)
  const heroImages = [
    'vivity_hero.jpg',
    'panoptix_hero.jpg',
    'puresee_hero.jpg',
  ];

  for (const name of heroImages) {
    const file = path.join(imagesDir, name);
    if (!fs.existsSync(file)) continue;
    const beforeSize = fs.statSync(file).size;
    const img = await Jimp.read(file);
    img.resize({ w: 512, h: 512 });
    const buffer = await img.getBuffer('image/jpeg', { quality: 82 });
    fs.writeFileSync(file, buffer);
    const afterSize = fs.statSync(file).size;
    console.log(`Hero ${name}: ${(beforeSize / 1024).toFixed(1)} KB -> ${(afterSize / 1024).toFixed(1)} KB`);
  }

  // 3. Doctor Raouf portrait (currently 959x1440, 218KB)
  const raoufFile = path.join(imagesDir, 'Raouf.jpg');
  if (fs.existsSync(raoufFile)) {
    const beforeSize = fs.statSync(raoufFile).size;
    const img = await Jimp.read(raoufFile);
    img.resize({ w: 480, h: 720 });
    const buffer = await img.getBuffer('image/jpeg', { quality: 80 });
    fs.writeFileSync(raoufFile, buffer);
    const afterSize = fs.statSync(raoufFile).size;
    console.log(`Raouf.jpg: ${(beforeSize / 1024).toFixed(1)} KB -> ${(afterSize / 1024).toFixed(1)} KB`);
  }

  // 4. Simulator driving image (day_driving_pro.jpg - currently 1024x819, 390KB)
  const drivingFile = path.join(imagesDir, 'day_driving_pro.jpg');
  if (fs.existsSync(drivingFile)) {
    const beforeSize = fs.statSync(drivingFile).size;
    const img = await Jimp.read(drivingFile);
    img.resize({ w: 800, h: 640 });
    const buffer = await img.getBuffer('image/jpeg', { quality: 80 });
    fs.writeFileSync(drivingFile, buffer);
    const afterSize = fs.statSync(drivingFile).size;
    console.log(`day_driving_pro.jpg: ${(beforeSize / 1024).toFixed(1)} KB -> ${(afterSize / 1024).toFixed(1)} KB`);
  }

  console.log('--- Image optimization complete ---');
}

optimize().catch(console.error);
