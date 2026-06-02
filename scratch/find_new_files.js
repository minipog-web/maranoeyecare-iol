const fs = require('fs');
const path = require('path');

function findRecentFiles(dir, maxAgeMinutes = 15) {
  const now = Date.now();
  const results = [];

  function traverse(currentDir) {
    let files;
    try {
      files = fs.readdirSync(currentDir);
    } catch (e) {
      return;
    }

    for (const file of files) {
      if (file === 'node_modules' || file === '.next' || file === '.git') continue;
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
        const ageMs = now - stat.mtimeMs;
        const ageMinutes = ageMs / 1000 / 60;
        if (ageMinutes <= maxAgeMinutes) {
          results.push({
            path: fullPath,
            mtime: stat.mtime,
            ageMinutes: ageMinutes.toFixed(2)
          });
        }
      }
    }
  }

  traverse(dir);
  return results;
}

const projectRoot = path.join(__dirname, '..');
console.log('Searching for recent files in:', projectRoot);
const recent = findRecentFiles(projectRoot);
console.log('Recent files found:');
recent.forEach(r => {
  console.log(`- ${r.path} (modified ${r.ageMinutes} mins ago)`);
});
