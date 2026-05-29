const { chromium } = require('playwright');

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`BROWSER ERROR: ${msg.text()}`);
    } else {
      console.log(`BROWSER CONSOLE: [${msg.type()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`BROWSER PAGE ERROR: ${err.message}`);
    console.log(err.stack);
  });

  try {
    console.log('Navigating to http://localhost:4028...');
    await page.goto('http://localhost:4028', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(5000);
  } catch (err) {
    console.error('Execution error:', err);
  } finally {
    await browser.close();
  }
}

main();
