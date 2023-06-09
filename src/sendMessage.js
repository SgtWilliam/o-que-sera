const puppeteer = require('puppeteer');
const fs = require("fs");
const test = require('../lists_maturada/phone_01.txt')


const messages = "Olá, Bom dia!"
let numbersMatured = 0;
let pageNew;


async function sendMessage(page, patchFile){
    pageNew = page;


    await page.waitForSelector('#side > div._3gYev > div > div > div._2vDPL > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt.qh0vvdkp > p');

    const data = fs.readFileSync(patchFile, 'utf8');
    const phoneNumbersMatured = data.split('\n').map(Number);

    for(let number of phoneNumbersMatured){
        if(numbersMatured <= 0){
            try{
                await searchNumber(number, patchFile);
            } catch (e) {console.log("Error no loop principal")
            };
        } else {
            console.log("Limite de 100 numeros atingido");
            break;
        };

    };
};

async function searchNumber(phone, patchFile){

    const min = 30000 ;
    const max = 100000;

    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

    await pageNew.waitForTimeout(2000);

    await pageNew.click('#side > div._3gYev > div > div > div._2vDPL > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt.qh0vvdkp > p');
    await pageNew.keyboard.type(phone.toString());
    await pageNew.waitForTimeout(2000);

    const sendMessageButton = await pageNew.$('#pane-side > div.cm280p3y.p357zi0d.tvf2evcx.f8m0rgwh.gndfcl4n.fhf7t426.bvcnfjzh.cihm0v32.td5bf8pq.ctv2fiom.l3k7h4x6.hp667wtd.qfejxiq4.oq44ahr5.lb5m6g5c > div');

    if (sendMessageButton) {
        await phoneNotFound(phone, patchFile);
        return false;
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

    await pageNew.waitForTimeout(2000);
    // Enviar
    //await pageNew.click('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._2xy_p._3XKXx > button > span');

    numbersMatured++
    console.log(`${numbersMatured} Envios`);

    await pageNew.waitForTimeout(1000);
    await removePhone(patchFile);
    await pageNew.click('#side > div._3gYev > div > div > button > div._3xdht._1ZD3q > span');
};

async function phoneNotFound(phone, patchFile){
    console.log(`${phone} Não foi maturado!`);
    await removePhone(patchFile);
    await pageNew.click('#side > div._3gYev > div > div > button > div._3xdht._1ZD3q > span');
};

async function removePhone(patchFile){
    const fileContent = await fs.promises.readFile('listas_crua/phone_01.txt', 'utf8');
    const phoneNumbers = fileContent.split('\n');
    const firstPhoneNumber = phoneNumbers.shift();

    const newFileContent = phoneNumbers.join('\n');
    await fs.promises.writeFile('listas_crua/phone_01.txt', newFileContent, 'utf8');
};


module.exports = sendMessage;