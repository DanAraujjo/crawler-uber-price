import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

export default async ({ source, destiny }) => {
  const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
  ];

  const options = {
    args,
    headless: true,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
  };

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('https://www.uber.com/br/pt-br/price-estimate/');
  await page.waitFor(1500);

  // source
  await page.type('input[name="pickup"]', source, {
    delay: 100,
  });

  await page.waitFor(1000);
  await page.keyboard.press('Enter');

  // destiny
  await page.type('input[name="destination"]', destiny, { delay: 100 });

  await page.waitFor(1000);
  await page.keyboard.press('Enter');

  await page.waitFor(2000);

  // printscreen
  // await page.screenshot({ path: `./tmp/${id}.png` });

  const content = await page.content();
  const $ = cheerio.load(content);

  const value = $('#main>div>div>div>div>div>div>div>div>div>div>span').html();

  await browser.close();

  return value;
};
