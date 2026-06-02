const fs = require('fs');
const path = require('path');

function searchImages(dir) {
  const results = [];
  function traverse(currentDir) {
    let files;
    try {
      files = fs.readdirSync(currentDir);
    } catch (e) {
      return;
    }

    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        continue;
      }

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
          results.push({
            path: fullPath,
            size: stat.size,
            mtime: stat.mtime
          });
        }
      }
    }
  }

  traverse(dir);
  return results;
}

const brainDir = 'C:\\Users\\adamp\\.gemini\\antigravity-ide\\brain\\6ca2a902-af2f-40e2-9dcf-6327cc1ff988';
console.log('Searching for images in brain directory:', brainDir);
const found = searchImages(brainDir);
console.log('Found files:');
found.forEach(f => {
  console.log(`- ${f.path} (size: ${f.size} bytes, modified: ${f.mtime})`);
});
