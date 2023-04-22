const puppeteer = require('puppeteer');
const fs = require("fs");

const messages = "Olá, Bom dia!"

let pageNew;


async function sendMessage(page){
    pageNew = page;

    await page.waitForSelector('#side > div._3gYev > div > div > div._2vDPL > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt.qh0vvdkp > p');

    const data = fs.readFileSync('./numero_maturado.txt', 'utf8');
    const phoneNumbersMatured = data.split('\n').map(Number);

    for(let i = 0; i <= 5; i++){
        await searchNumber(phoneNumbersMatured[i]);
    };
};

async function searchNumber(phone){
    await pageNew.waitForTimeout(1000);

    await pageNew.click('#side > div._3gYev > div > div > div._2vDPL > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt.qh0vvdkp > p');
    await pageNew.keyboard.type(phone.toString());
    await pageNew.waitForTimeout(2000);

    const sendMessageButton = await pageNew.$('#pane-side > div.cm280p3y.p357zi0d.tvf2evcx.f8m0rgwh.gndfcl4n.fhf7t426.bvcnfjzh.cihm0v32.td5bf8pq.ctv2fiom.l3k7h4x6.hp667wtd.qfejxiq4.oq44ahr5.lb5m6g5c > div');

    if (sendMessageButton) {
       await phoneNotFound(phone)
       return;
    };

    await pageNew.waitForSelector('#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div > div._8nE1Y');
    await pageNew.click('#pane-side > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div > div._8nE1Y');
    await pageNew.waitForSelector('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt');
    await pageNew.click('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt');

    await pageNew.waitForTimeout(2000);
    for(let character of messages){
        await pageNew.keyboard.type(character);
        await pageNew.waitForTimeout(300);
    }

    // Enviar
    await pageNew.waitForTimeout(2000)
    await removePhone()
    await pageNew.click('#side > div._3gYev > div > div > button > div._3xdht._1ZD3q > span');
};

async function phoneNotFound(phone){
    console.log(`${phone} Não foi maturado!`)
    await pageNew.click('#side > div._3gYev > div > div > button > div._3xdht._1ZD3q > span');
};

async function removePhone(){
    const fileContent = await fs.promises.readFile('./numeros.txt', 'utf8');
    const phoneNumbers = fileContent.split('\n');
    const firstPhoneNumber = phoneNumbers.shift();

    const newFileContent = phoneNumbers.join('\n');
    await fs.promises.writeFile('./numero_maturado.txt', newFileContent, 'utf8');
};


module.exports = sendMessage;