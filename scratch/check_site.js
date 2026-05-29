const { chromium } = require('playwright');

async function main() {
  const screenshotPath = 'C:\\Users\\adamp\\.gemini\\antigravity\\brain\\b616a1f4-0efd-4760-b78f-df666e5096c3\\site_screenshot_js.png';
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
