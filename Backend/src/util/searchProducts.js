import puppeteer from 'puppeteer';

export default async function searchProducts(search) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://vigiadepreco.com.br/');

  await page.type('div > label > input', search);
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  const result = await page.evaluate(async () => {
    const products = Array.from(document.querySelectorAll('article > a'));
    return products.map((item) => {
      return {
        description: item.getElementsByTagName('h3')[0].innerText,
        price: parseFloat(
          String(item.getElementsByClassName('price')[0].innerText)
            .replace(',', '.')
            .replace('R$', '')
            .trim()
        ),
        image: item.getElementsByTagName('img')[0].src,
        store: item.getElementsByTagName('b')[0].innerText,
      };
    });
  });
  // await browser.close();
  return result;
}
