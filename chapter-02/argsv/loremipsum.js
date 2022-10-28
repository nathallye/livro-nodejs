#!/usr/bin/env node

/*
 * loremipsum.js
 *
 * Faz uma requisição na API `http://loripsum.net/api/`
 * E grava um arquivo com o nome e a quantidade de parágrafos especificados
 *
*/

const http = require("http"); // atribui o módulo http a const http
const fs = require("fs"); // atribui o módulo fs a const fs

const fileName = String(process.argv[2] || "").replace(/[^a-z0-9\.]/gi, ""); // verifa se o argumento passado é válido(nome do arquivo)
const quantityOfParagraphs = String(process.argv[3] || "").replace(/[^\d]/g, "");// verifa se o argumento passado é válido(quant. paragráfos)
const USAGE = "USO: node loremipsum.js {nomeArquivo} {quantidadeParágrafos}"; // 

if (!fileName || !quantityOfParagraphs) { // se não for passado nenhum argumento será undefined, por isso, ! para tornar false
    return console.log(USAGE); // se um for dos argumentos for false, força a saída exibindo no console o texto que está em USAGE
}
http.get("http://loripsum.net/api/" + quantityOfParagraphs, (res) => {
  let text = "";
  res.on("data", (chunk) => {
    text += chunk;
  });
  res.on("end", () => {
    fs.writeFile(fileName, text, () => {
      console.log("Arquivo " + fileName + " pronto!");
    });
  });
})
.on("error", (e) => {
  console.log("Got error: " + e.message);
});