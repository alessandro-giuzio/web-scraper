const pw = require('playwright');
const AUTH = 'brd-customer-hl_f5bb9a4f-zone-scraping_browser1:38zowp7hh7li';
const SBR_CDP = `wss://${AUTH}@brd.superproxy.io:9222`;
async function main() {
  console.log('Connecting to Scraping Browser...');
  const browser = await pw.chromium.connectOverCDP(SBR_CDP);
  try {
    console.log('Connected! Navigating...');
    const page = await browser.newPage();
    await page.goto('https://feelfreerentals.com', { timeout: 2 * 60 * 1000 });
    // Start waiting for popup before clicking. Note no await.
    const popupPromise = page.waitForEvent('popup');
    await page.getByText('open the popup').click();
    const popup = await popupPromise;
    // Interact with the new popup normally.
    await popup.getByRole('button').click();
    console.log(await popup.title());
  } finally {
    await browser.close();
  }
}
if (require.main === module) {
  main().catch(err => {
    console.error(err.stack || err);
    process.exit(1);
  });
}
