const puppeteer = require('puppeteer');
const fs = require('fs');
const getNumber = require("./startChat");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: 'session_one'
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');

    await page.goto("https://web.whatsapp.com/");
    await page.waitForSelector('#app > div > div > div._2Ts6i._2xAQV > div > div > div._3q5qB > div._1vjYt > h1');
    console.log("Logado com sucesso!");

    await page.waitForTimeout(2000);
    await getNumber(page);
})();
