const puppeteer = require('puppeteer');
const getNumber = require('./startChat');
const sendMessage = require('./sendMessage');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: 'session_one'
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');

    await page.goto("https://web.whatsapp.com/");
    await page.waitForTimeout(2000);
    await page.waitForSelector('#app > div > div > div._2Ts6i._2xAQV > div > div > div._2v9n- > div._3RpB9 > h1');
    console.log("Logado com sucesso!");
    await page.waitForTimeout(2000);

    await sendMessage(page);
    // await page.evaluate(() => {
    //     const h1 = document.querySelector('#app > div > div > div._2Ts6i._2xAQV > div > div > div._2v9n- > div._3RpB9 > h1');
    //     const a = document.createElement('a');
    //     a.href = 'https://web.whatsapp.com/send?phone=5588992663419';
    //     a.textContent = h1.textContent;
    //     for (const attr of h1.attributes) {
    //         a.setAttribute(attr.name, attr.value);
    //     }
    //     h1.replaceWith(a);
    // });
    //
    // await page.waitForTimeout(2000);
    //
    // await page.click('#app > div > div > div._2Ts6i._2xAQV > div > div > div._2v9n- > div._3RpB9 > a');
    // await page.waitForSelector('#main > div._2gzeB > div > div._5kRIK > div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs > div._1-FMR._15WYQ.focusable-list-item > div');

    //await browser.close();
    //await getNumber(page);

})();
