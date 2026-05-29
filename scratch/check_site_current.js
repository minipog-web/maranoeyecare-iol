const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const screenshotPath = path.join(__dirname, 'verification_screenshot.png');
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:4028...');
    const response = await page.goto('http://localhost:4028', { waitUntil: 'networkidle', timeout: 15000 });
    console.log(`Response status: ${response ? response.status() : 'No response'}`);
    
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot to ${screenshotPath}`);
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    await browser.close();
  }
}

main();
