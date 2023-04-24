const { keyboard } = require('puppeteer');
const fs = require('fs');

const message = "Olá, como vai?";
let numbersMaturado = 0;
let pageNew;

async function getNumber(page, patchFileCrua, savePatch){
    pageNew = page;

        const data = fs.readFileSync(patchFileCrua, 'utf8');
        const phoneNumbers = data.split('\n').map(Number);

    for (const phoneNumber of phoneNumbers){
        try{
            await startChat(phoneNumber, savePatch);
            await removeNumber(phoneNumber, patchFileCrua);
        } catch (e) {
            console.log("ERRROOORRRR")
        }
    };

    console.log("Maturação concluida!")
};


async function startChat(numberAPI, savePatch){
    try {
        await pageNew.waitForTimeout(2000);
        await pageNew.waitForSelector('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p');

        await pageNew.evaluate((numberAPI) => {
            const header = document.querySelector('#main > header');
            const divBotao = header.querySelector('div._1yNrt');
            divBotao.innerHTML += `<a href="https://web.whatsapp.com/send?phone=${numberAPI}">Proximo</a>`;
        }, numberAPI);

        await pageNew.waitForSelector('#main > header > div._1yNrt > a')

        await pageNew.waitForSelector('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p')
        await pageNew.waitForTimeout(1700);

        await pageNew.click('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p');
        await pageNew.waitForTimeout(500);

        for (const character of message) {
            await pageNew.keyboard.type(character);
            await pageNew.waitForTimeout(100);
        }

        await pageNew.waitForTimeout(2000);
        await pageNew.waitForSelector('#main > header > div._1yNrt > a')
        await pageNew.waitForTimeout(200);
        await pageNew.click('#main > header > div._1yNrt > a')


        await pageNew.waitForTimeout(1000);
        const sendMessageButton = await pageNew.$('#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button');

        if (sendMessageButton) {
            NextPhoneErro()
            return;
        };

        await NumberSucellMaturado(numberAPI, savePatch);

    } catch (e) {
        console.log("Erro no 01")
    }
};

async function NumberSucellMaturado(NumberMatureted, savePatch){
    fs.appendFile(savePatch, `${NumberMatureted}\n`, (err) => {
        if (err) throw err;
        console.log(`${numbersMaturado} Numeros Maturados`);
    });
    numbersMaturado++
}

async function NextPhoneErro(){
try{
    await pageNew.waitForSelector('#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button');
    await pageNew.waitForTimeout(1000);
    await pageNew.click('#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button');

    await pageNew.waitForTimeout('#main > header > div._1yNrt > a')
    await pageNew.evaluate((selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.remove();
        }
    }, '#main > header > div._1yNrt > a');
    await pageNew.waitForTimeout(2000);

} catch (e) {
    console.log("Erro no 02")
}
};

async function removeNumber(phoneNumber, patchFileCrua){
    const fileContent = await fs.promises.readFile(patchFileCrua, 'utf8');
    const phoneNumbers = fileContent.split('\n');
    const firstPhoneNumber = phoneNumbers.shift();

    const newFileContent = phoneNumbers.join('\n');
    await fs.promises.writeFile(patchFileCrua, newFileContent, 'utf8');
};

module.exports = getNumber;