
const fs = require('fs');

fs.readFile('listaremove.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    const linhas = data.split('\n').filter((linha) => linha.trim() !== '');

    const conteudoSemLinhasVazias = linhas.join('\n');

    fs.writeFile('numero_maturado.txt', conteudoSemLinhasVazias, 'utf-8', (err) => {
        if (err) throw err;
        console.log('Linhas vazias removidas com sucesso!');
    });
});
