const { keyboard } = require('puppeteer');

const fs = require('fs');

const message = "Olá, como vai?";
let numbersMaturado = 0;


async function getNumber(page){

    const fileContent = fs.readFileSync('./numeros.txt', 'utf-8');
    const phoneNumbers = fileContent.split('\n');
    for (const phoneNumber of phoneNumbers) {
        try{
            await startChat(page, phoneNumber);
            numbersMaturado++
            console.log(`Foram ${numbersMaturado} Numeros Maturados!`);
            fs.appendFileSync('./numero_maturado.txt', phoneNumber + '\n');
            await removeNumber(phoneNumber)

        } catch (e) {
            console.log(`Erro no numero: ${phoneNumber} ele era o numero ${numbersMaturado}`);
            await removeNumber(phoneNumber)


        }
    }
};


async function startChat(page, number){

    await page.goto(`https://web.whatsapp.com/send?phone=${number}`);

    await page.waitForSelector('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_', { timeout: 10000 });
    await page.waitForSelector('#app > div > span:nth-child(2) > div > span > div > div > div > div');
    await page.waitForTimeout(1000);

    await page.click('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p');
    await page.waitForTimeout(500);

    for (const character of message) {
        await page.keyboard.type(character);
        await page.waitForTimeout(100);
    }
}

async function removeNumber(numberToRemove){

    const fileContent = fs.readFileSync('./numeros.txt', 'utf-8');
    const phoneNumbers = fileContent.split('\n');
    const indexToRemove = phoneNumbers.indexOf(numberToRemove);
    if (indexToRemove === -1) {
        console.log(`O número ${numberToRemove} não foi encontrado na lista.`);
        return;
    }

    phoneNumbers.splice(indexToRemove, 1);
    fs.writeFileSync('./numeros.txt', phoneNumbers.join('\n'));
    console.log(`O número ${numberToRemove} foi removido da lista.`);
};

module.exports = getNumber;