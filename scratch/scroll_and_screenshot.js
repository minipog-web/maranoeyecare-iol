const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const screenshotPath = path.join(__dirname, 'test-full-scroll.png');
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:4028...');
    await page.goto('http://localhost:4028', { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log('Manually adding is-revealed class to all reveal-on-scroll elements...');
    await page.evaluate(() => {
      // Disable smooth scroll
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Reveal all elements
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed');
      });
    });

    console.log('Scrolling down to trigger any dynamic animations...');
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });
    });

    console.log('Waiting for elements to settle...');
    await page.waitForTimeout(3000);

    console.log('Taking full page screenshot...');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot to ${screenshotPath}`);
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    await browser.close();
  }
}

main();
