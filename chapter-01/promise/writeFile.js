// arquivo writeFile.js

const fs = require("fs");
const promisify = require("util",).promisify;

const text = "Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.\n";

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

writeFileAsync("promise.txt", text)
  .then(_ => readFileAsync("promise.txt"))
  .then(data => console.log(data.toString()));