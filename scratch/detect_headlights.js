
const Jimp = require('jimp');
const path = require('path');

async function findHeadlights() {
  const imagePath = path.join('c:', 'Users', 'adamp', 'OneDrive', 'Desktop', 'MEC', 'mec_premium_iol', 'maranoeyecare', 'public', 'assets', 'images', 'night_driving_single_car.png');
  const image = await Jimp.read(imagePath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  console.log(`Image dimensions: ${width}x${height}`);

  let pixels = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = Jimp.intToRGBA(image.getPixelColor(x, y));
      const brightness = (color.r + color.g + color.b) / 3;
      if (brightness > 200) {
        pixels.push({ x, y, brightness });
      }
    }
  }

  // Group pixels into clusters (headlights)
  let clusters = [];
  pixels.forEach(p => {
    let found = false;
    for (let c of clusters) {
      if (Math.abs(c.x - p.x) < 20 && Math.abs(c.y - p.y) < 20) {
        c.x = (c.x * c.count + p.x) / (c.count + 1);
        c.y = (c.y * c.count + p.y) / (c.count + 1);
        c.count++;
        found = true;
        break;
      }
    }
    if (!found) {
      clusters.push({ x: p.x, y: p.y, count: 1 });
    }
  });

  clusters.sort((a, b) => b.count - a.count);

  console.log('Clusters found:');
  clusters.forEach((c, i) => {
    console.log(`Cluster ${i}: (${c.x.toFixed(2)}, ${c.y.toFixed(2)}) - ${c.count} pixels`);
  });

  if (clusters.length >= 2) {
    const hl1 = clusters[0];
    const hl2 = clusters[1];
    
    // Sort left to right
    const sorted = [hl1, hl2].sort((a, b) => a.x - b.x);
    const leftHl = sorted[0];
    const rightHl = sorted[1];

    console.log(`\nDetected Headlights:`);
    console.log(`Left: x=${leftHl.x.toFixed(2)} (${(leftHl.x/width*100).toFixed(2)}%), y=${leftHl.y.toFixed(2)} (${(leftHl.y/height*100).toFixed(2)}%)`);
    console.log(`Right: x=${rightHl.x.toFixed(2)} (${(rightHl.x/width*100).toFixed(2)}%), y=${rightHl.y.toFixed(2)} (${(rightHl.y/height*100).toFixed(2)}%)`);
  }
}

findHeadlights().catch(console.error);
