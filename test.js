import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  const content = await page.evaluate(() => {
    return {
      body: document.body.innerHTML.slice(0, 1000), // First 1000 chars of body
      cards: document.querySelectorAll('.service-card').length,
      hero: document.querySelectorAll('.hero').length,
      overlays: document.querySelectorAll('#vite-error-overlay').length
    }
  });
  console.log(content);
  await browser.close();
})();
