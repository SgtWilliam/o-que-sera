// const { keyboard } = require('puppeteer');
// const fs = require('fs');
//
// const message = "Olá, como vai?";
// let numbersMaturado = 0;
// let pageNew;
//
// async function getNumber(page){
//     pageNew = page
//     // const fileContent = fs.readFileSync('./numeros.txt', 'utf-8');
//     // const phoneNumbers = fileContent.split('\n');
//
//     try {
//         const data = fs.readFileSync('./numeros.txt', 'utf8');
//         const phoneNumbers = data.split('\n').map(Number);
//     } catch (err) {
//         console.error(err);
//     }
//
// //const number = '5511971842185'
//
//     //const phoneNumbers = ['551523996479241332', '5564992094462', '551523996479241332', '5563984887783', '551523996479241332', '12796899829', '5581988556405', '5541998039573', '5561984022801', '5531994206558', '5585997908553', '552225232016', '554430403120', '5511971842185', '5515997481920', '5549984121875'];
//
//     // await startChat('551523996479241332')
//
//     for (const phoneNumber of phoneNumbers){
//         try{
//             await startChat(phoneNumber)
//         } catch (e) {
//             console.log("ERRROOORRRR")
//         }
//     }
//
//     console.log("Maturação concluida!")
//
//     // for (const phoneNumber of phoneNumbers) {
//     //     await startChat(phoneNumber);
//     //     console.log(`Iniciando chat com número ${phoneNumber}`);
//     // }
//
//
//     // for (const phoneNumber of phoneNumbers) {
//     //     try{
//     //         numbersMaturado++;
//     //         console.log(phoneNumber)
//     //         // console.log(`Foram ${numbersMaturado} Numeros Maturados!`);
//     //         // fs.appendFileSync('./numero_maturado.txt', phoneNumber + '\n');
//     //         //await removeNumber(phoneNumber)
//     //
//     //     } catch (e) {
//     //         console.log(`Erro no numero ${phoneNumber} ele era o numero ${numbersMaturado}`);
//     //         //await removeNumber(phoneNumber)
//     //
//     //
//     //     }
//     // }
// };
//
//
// async function startChat(numberAPI){
//     try {
//         await pageNew.waitForTimeout(2000);
//         await pageNew.waitForSelector('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p');
//
//         await pageNew.evaluate((numberAPI) => {
//             const header = document.querySelector('#main > header');
//             const divBotao = header.querySelector('div._1yNrt');
//             divBotao.innerHTML += `<a href="https://web.whatsapp.com/send?phone=${numberAPI}">Proximo</a>`;
//         }, numberAPI);
//
//         await pageNew.waitForSelector('#main > header > div._1yNrt > a')
//
//         await pageNew.waitForSelector('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p')
//         await pageNew.waitForTimeout(1700);
//
//         await pageNew.click('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p');
//         await pageNew.waitForTimeout(500);
//
//         for (const character of message) {
//             await pageNew.keyboard.type(character);
//             await pageNew.waitForTimeout(100);
//         }
//
//         await pageNew.waitForSelector('#main > header > div._1yNrt > a')
//         await pageNew.waitForTimeout(200);
//         await pageNew.click('#main > header > div._1yNrt > a')
//
//
//         await pageNew.waitForTimeout(1000);
//         const sendMessageButton = await pageNew.$('#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button');
//
//         if (sendMessageButton) {
//             NextPhoneErro()
//         }
//         ;
//     } catch (e) {
//         console.log("Erro no 01")
//     }
// };
//
// async function NextPhoneErro(){
//     try{
//         await pageNew.waitForSelector('#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button');
//         await pageNew.click('#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button');
//
//
//         await pageNew.waitForTimeout('#main > header > div._1yNrt > a')
//         await pageNew.evaluate((selector) => {
//             const element = document.querySelector(selector);
//             if (element) {
//                 element.remove();
//             }
//         }, '#main > header > div._1yNrt > a');
//         await pageNew.waitForTimeout(2000);
//
//     } catch (e) {
//         console.log("Erro no 02")
//     }
// };
//
// async function removeNumber(numberToRemove){
//
//     const fileContent = fs.readFileSync('./numeros.txt', 'utf-8');
//     const phoneNumbers = fileContent.split('\n');
//     const indexToRemove = phoneNumbers.indexOf(numberToRemove);
//     if (indexToRemove === -1) {
//         console.log(`O número ${numberToRemove} não foi encontrado na lista.`);
//         return;
//     }
//
//     phoneNumbers.splice(indexToRemove, 1);
//     fs.writeFileSync('./numeros.txt', phoneNumbers.join('\n'));
//     console.log(`O número ${numberToRemove} foi removido da lista.`);
// };
//
// module.exports = getNumber;