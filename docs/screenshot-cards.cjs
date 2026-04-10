const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 设置视口宽度足够容纳 1080px 的卡片
  await page.setViewportSize({ width: 1200, height: 2000 });

  const htmlPath = path.join(__dirname, 'cards.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  // 等待字体和图片加载
  await page.waitForTimeout(3000);

  for (let i = 1; i <= 6; i++) {
    const card = page.locator(`#card-${i}`);
    await card.screenshot({
      path: path.join(__dirname, `card-${i}.png`),
      type: 'png',
    });
    console.log(`card-${i}.png saved`);
  }

  await browser.close();
  console.log('Done!');
})();
