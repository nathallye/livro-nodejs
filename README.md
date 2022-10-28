# Livro NodeJS  

## Anotações Capítulo 1

### 1.3 NPM

É um gerenciador de pacotes para o Node.JS. Ferramenta de linha de comando, que gerencia pacotes do registry npmjs.

Por exemplo, se quisermos utilizar o ExpressJS basta digitar o comando seguinte no terminal:

``` 
$ npm install express
```

Ou abreviando o `install` para `i`:

``` 
$ npm i express
```

Com esse comando, o módulo será baixado para uma pasta chamada `node_modules` no diretório raiz do projeto.

Vale configurar na máquina local os dados no npm. No linux é necessário criar ou editar o arquivo `.npmrc` na raizxz do usuário.

``` 
$ cat ~/.npmrc

init.author.name=[user-name]
init.author.email=[user-email]
init.author.url=[user-url]
```

#### 1.3.1 npm update

O comando `npm update` nos ajuda a verificar quais módulos que podem ser atualizados.

``` 
$ npm update -save
```

A flag `--save` vai se encarregar de escrever no `package.json` a nova versão dos módulos que forma atualizados.

Existe uma diferença entre os símbolos ^ e ~ que podem vir na frente da versão de cada módulo no `package.json`. O `~` é mais restritivo e só permite atualizações `patch`(último dígido do número da versão), enquanto o `^` permite que atualizações `minor`(segundo dígito do número da versão) sejam realizadas.

Isso porque uma atualização `major`(primeiro dígido do número da versão) pode quebrar a compatibilidade e por isso esse tipo de atualização deve ser feito manualmente.

#### 1.3.2 npx

Ele instala o módulo numa pasta temporária do registry npm, mas sem  necessariamente instalá-los globalmente, como fazíamos antigamente com pacotes como `express-generator`, `create-react-app` para só depois executá-los.

Ele instala o módulo numa pasta temporária - se já não estiver instalado no projeto local, ou no `node_modules` global -, executa o comando e depois remove a biblioteca, liberando espaço em disco.

Em vez de fazer:

``` 
$ npm install -g express-generator
$ express
```

Usando npx, fazemos:

``` 
$ npx express-generator
```

Outro exemplo, executando o `cowsay`(é uma vaca falante configurável):

``` 
$ npx cowsay "Eu, Luke Skywalker, juro por minha honra e pela fé da irmandade dos cavaleiros, usar a Força apenas para o bem, sempre negando
ceder ao Lado Sombrio, e dedicar minha vida a causa da liberdade e da justica. Se eu nao cumprir esse voto, minha vida será perdida,
aqui e no futuro."
```

##### Learn you Node

`learnyounode` é um pacote que contém uma série de lições de workshop que ensinarão o básico sobre como escrever aplicativos Node.js por meio de uma interface interativa. As lições começam com uma lição básica "HELLO WORLD" e, em seguida, passam para exercícios mais avançados sobre como lidar com E/S síncrona e assíncrona, operações de sistema de arquivos, redes TCP e HTTP, eventos e fluxos.

Instalando o learnyounode globalmente:

``` 
$ npm install -g learnyounode
```

Inciando o learnyounode:

``` 
$ learnyounode
```

Ou usuando o npx:

``` 
$ npx learnyounode
```

#### 1.3.3 yarn

O `yarn` é uma alternativa ao cli `npm`. Deve ser instalado como pacote global, depois explicitamente dito que queremos a tal versão:

``` 
$ npm i -g yarn
$ yarn set version 2
$ yarn -v
2.4.0
```

Podemos utilizar `yarn install` em vez de usar `npm install` - ou `npm i` - para gerenciar as dependênciasn dos nossos projetos. Da mesma forma que o `npm` cria um `package-lock.json`, o `yarm` cria um arquivo `yarn.lock` para garantir as versões internas das dependências instaladas.

O comando `yarn dlx` é o equivalente ao `npx`:

```
$ yarn dlx cowsay "Eu, Luke Skywalker, juro por minha honra e pela fé da irmandade dos cavaleiros, usar a Força..."
```

### 1.4 Console do NodeJS (REPL)

O NodeJS disponibiliza uma forma para acessar as propriedades e funções utilizando o terminal do sistema operacional sem que seja necessário escrever e salvar códigos em um arquivo. Útil para testar pequenos trechos de código e entender como as coisas funcionam. Esse é o REPL também chamado de console.

Para entarr no console do NodeJS, basta digitar `node` no terminal:

```
$ node
```

O console aceita qualquer expressão JS válida, como:

```
> 1 + 1
2
```

Podemos usar o console do NodeJS para validar uma expressão regular:

```
> /rato/g.test("O rato roeu a roupa")
true
```

O padrão `/rato/` casou com o texto "O rato roeu a roupa". Se mudássemos `rato` para `gato`, teríamos um `false`:

```
> /rato/g.test("O gato comeu a roupa")
false
```

Se quisermos que a regex case tanto com a frase "O rato roeu a roupa" quanto com a frase "O gato comeu a roupa", basta alterar para:

```
> /(g|r)ato (ro|com)eu/g.test("O rato roeu a roupa")
true
> /(g|r)ato (ro|com)eu/g.test("O gato comeu a roupa")
true
```

Para escrever na saída (stdout), utilizamos o `console.log()`:

```
> console.log("Nathallye")
Nathallye
Undefined
```

O primeiro retorno após a chamada da função `console.log()`, com a mesma string que passamos como argumento é a saída, e a linha após esta, com `undefined` é o retorno.

É bem parecido com o console dos navegadores, mas diferentemente dos browsers - no NodeJS - o objeto `window` global do navegador não existe.

```
> window
Uncaught ReferenceError: window is not defined
```

No NodeJS, o objeto root se chama `global`.

### 1.5 Programação síncrona e assíncrona

#### Procedimento síncrono

Um procedimento `síncrono` é aquele em que una operação ocorre após o término de outra. Imagine um procedimento que demore dois segundos para ser executado. A linha de código após esse procedimento não será executada até que o procedimento da linha anterior tenha terminado de executar. Esse é o comportamento previsível ao qual já estamos acostumados quando trabalhamos com outras liguagens de programação.

Essa característica `bloqueante` garante que o fluxo de execução seja exatamente na ordem que lemos as linhas de código.

``` JS
// arquivo síncrono

console.log("1");
t();
console.log("3");
function t() {
  console.log("2");
}
```

A saída no terminal será a ordem natural:

```
$ node sync.js
1
2
3
```

#### Procedimento assíncrono

Um procedimento `assíncrono` não bloqueia a execução do código. Se um procedimento levar certo tempo para ser encerrado, a linha após esse procedimento será executada antes de o procedimento assíncrono terminar.

``` JS
// arquivo assíncrono

console.log("1");
t();
console.log("3");
function t() {
  setTimeout(function() {
    console.log("2");
  }, 10);
}
```

A saída no terminal será a ordem natural:

```
$ node async.js 
1
3
2
```

No NodeJS é preferível programar nossas rotinas de forma `assíncrona` para não bloquear o main thread. É por isso que todas as funções e os métodos, que fazem algum tipo de acesso a disco ou rede(input ou output), têm como parâmetro uma função callback.

Um `callback é um aviso de que uma operação assíncrona terminou`. É através dele que controlamos o fluxo da nossa aplicação.

``` JS
// arquivo writeFileSync.js

const fs = require("fs");
const text = "Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.\n";

fs.writeFileSync("sync.txt", text);

const data = fs.readFileSync("sync.txt");
console.log(data.toString());
```

Ao executar, no terminal com o comando `node writeFileSync.js`, teremos criado um arquivo `sync.txt`, lido o conteúdo e escrito na saída com o console.log.

```
$ node writeFileSync.js 
Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.
```

Utilizando a versão `assíncrona` desses métodos, o código fica assim:

``` JS
// arquivo writeFileAsync.js

const fs = require("fs");
const text = "Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.\n";

fs.writeFile("async.txt", text, (err, result) => {
  fs.readFile("async.txt", (err, data) => {
    console.log(data.toString());
  });
});
```

Tivemos que encaixar `callbacks` para que a leitura do arquivo só acontecesse quando a escrita estivesse finalizada, e aí sim, quando terminar de ler usamos o console.log.

Ao executar, no terminal com o comando `node writeFileAsync.js`, teremos criado um arquivo `async.txt`, lido o conteúdo e escrito na saída com o console.log.

```
$ node writeFileAsync.js 
Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.
```

#### 1.5.1 Promises

Uma promise é a representação de uma operação assíncrona. ALgo que ainda não foi completado, mas é esperado que será num futuro. Uma promise (promessa) é algo que pode ou não ser cumprido.

Utilizando corretamente, conseguimos diminuir o nívek de encadeamento, tornando o nosso código mais legível.

Essa é uma das técnicas para evitar p famoso Callback Hell.

Para declarar uma promise, usaremos a função construtora `Promise`

```
$ node
> new Promise(function(resolve, reject) {});
Promise { <pending> }
```

O retorno é um objeto `promise` que contém os métodos `.then`, `.catch` e `finally()`. 
Quando a execução tiver algum resultado, o `then()` será invocado (`resolve`). 
Quando acontecer algum erro, o `.catch` será invocado (`reject`).
E ambos os casos o `finally()` será invocado, evitando assim a duplicação de código.

Qualquer exceção disparada pela função que gerou a promise ou pelo código dentro do `then()` será capturada pelo metodo `.catch()`, tendo assim um `try/catch` implícito.

Utilizar o `new Promise` no meio do código é um `anti-pattern` e deve ser evitado. Dentro do pacote util do core do nodeJS, temos o método `promisify` que recebe uma função que aceita um callback como último argumento e retorna uma versão que utiliza promise.

Para isso, esse callback deve estar no padrão que o primeiro argumento é o erro `(err, value) => {}`.

O código anterior que escreve um arquivo txt e despois realiza a leitura dele fica dessa forma usando promises:

``` JS
// arquivo writeFile.js

const fs = require("fs");
const promisify = require("util",).promisify;

const text = "Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.\n";

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

writeFileAsync("promise.txt", text)
  .then(_ => readFileAsync("promise.txt"))
  .then(data => console.log(data.toString()));
```

Note que, em comparação com a versão anteriro do código, não temos mais dois níveis de aninhamento, pois estamos retornando uma promise dentro do primeiro `then` e pegando o resultado no mesmo nível da função assíncrona anterior.

No caso específico do módulo `fs`, já existe no core um novo módulo chamado `fs/promise`, removendo a necessidade de usar o `util.promisify`:

``` JS
// arquivo writeFile-promises.js

const fs = require("fs/promises");
const text = "Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.\n";

fs.writeFile("promise.txt", text)
  .then(_ => fs.readFile("async-await.txt"))
  .then(data => console.log(data.toString()));
```

##### 1.5.2 async/await

Uma outra forma de trabalhar com promises é utilizar as palavras `async/await`. O `async` transforma o retorno de uma função em uma promise.

Vejamos a seguinte função com a palavra `async` no início da declaração:

``` JS
// arquivo sabre.js

async function sabre() {
  return "Espada laser";
}

sabre().then(r => console.log(r));
```

Executando:

```
$ node sabre.js
Espada laser
```

Para utilizar `await` em "top level", ou seja, fora de uma função, é preciso definir dynamic imports, declarando `type: "modules"` no `package.json`:

``` JSON
{
  "name": "livro-nodejs",
  "type": "module",
  "version": "1.0.0",
  "description": "",
  "main": "writeFile.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Nathallye Bacelar <nathallye.bacelar@gmail.com>",
  "license": "ISC",
}
```

Ou então, usar arquivos .mjs(module).

Já que a função `sabre`retorna uma `promise`, devido o `async`, podemos usar o `await` para guardar o retorno:

``` JS
// arquivo sabre.mjs

async function sabre() {
  return "Espada laser";
}

const r = await sabre();
console.log(r);
```

Executando:

```
$ node sabre.mjs
Espada laser
```

Retornando ao exemplo de código que escreve o arquivo txt, utilizando `async/await`, fica assim:

``` JS
// arquivo writeFile.js

import fs from "fs/promises";
const text = "Star Wars (Brasil: Guerra nas Estrelas /Portugal: Guerra das Estrelas) é uma franquia do tipo space opera estadunidense criada pelo cineasta George Lucas, que conta com uma série de nove filmes de fantasia científica e dois spin-offs.\n";

await fs.writeFile("async-await.txt", text);
const data = await fs.readFile("async-await.txt");

console.log(data.toString());
```

Não foi necessário usar callbacks nem encaixar `.then`. Também tivemos que mudar o `require` por `import`, utilizando o dynamic imports, por ter habilitado o uso de módulos no `package.json`, e então ser possível utilizar top level `await`.

## Anotações Capítulo 2

### 2.1 Primeiro Programa

Vamos criar um programa chamado `hello.js` com o conteúdo seguinte:

``` JS
process.stdout.write("Han Solo\n");
```

Vamos executar no terminar(no diretório do arquivo):

``` 
$ node hello.js 
Han Solo
```

Geralmente, as ferramentas de linha de comando recebem opções após o comando, algo como:

```
node hello2.js status port 42
```

Conseguimos ler esses argumentos por meio do array `process.argv`.

Para entendermos melhor, vamos criar o arquivo `args.js` com o conteúdo seguinte:

``` JS
process.argv.forEach(arg => console.log(arg))
```

E executar no terminal:

```
$ node args.js status port 42
/usr/local/bin/node
/home/nathallye/dev/livros/livro-nodejs/chapter-02/args.js
status
port
42
```

A primeira linha do retorno é o comando que utilizamos para executar o programa; a próxima linha é o caminho completo até o nosso arquivo; e as demais são os argumentos passados.

A função `console.log()` internamente faz uma chamada à função `process.stdout.write()`.

#### Consumindo a API loremipsum.net

Essa API retorna certa quantidade de texto `lorem ipsum`. Esse texto é uma peça clássica em latim que a indústria gráfica, a web e a editoração utilizam para preencher espaços antes de o conteúdo final.

O nosso programa fará uma requisição nessa API e criará um arquivo `.html` com o conteúdo retornado. Para fazer a requisição, utilizaremos o módulos `http` nativo do NodeJS.

A primeira tarefa é informar que usaremos os módulos `http` e `fs`. Para isso utilizaremos a função `require()`, atribuindo o módulo a uma constante(variável que não pode ser reatribuída):

``` JS
const http = require("http"); // atribui o módulo http a const http
const fs = require("fs"); // atribui o módulo fs a const fs
```

Em seguida, podemos usar esses módulos e consumir a API:

``` JS 
const http = require("http"); // atribui o módulo http a const http
const fs = require("fs"); // atribui o módulo fs a const fs

const fileName = String(process.argv[2] || "").replace(/[^a-z0-9\.]/gi, ""); // regex para formatar o argumento(nome do arquivo)
const quantityOfParagraphs = String(process.argv[3] || "").replace(/[^\d]/g, "");// regex para formatar o argumento(quant. paragráfos)
const USAGE = "USO: node loremipsum.js {nomeArquivo} {quantidadeParágrafos}"; 

if (!fileName || !quantityOfParagraphs) { // se não for passado nenhum argumento será undefined(que é false) por isso, ! tornará true se for false
  return console.log(USAGE); // se um for dos argumentos for false(que será true), força a saída exibindo no console o texto que está em USAGE
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
```

### 2.2 Debug

Um pequeno utilitário de depuração de JavaScript modelado após a técnica de depuração do núcleo Node.js. Funciona em Node.js e navegadores da web.

`debug` expõe uma função; simplesmente passe a esta função o nome do seu módulo, e ela retornará uma versão decorada `console.error` para você passar instruções de depuração. Isso permitirá que você alterne a saída de depuração para diferentes partes do seu módulo, bem como para o módulo como um todo.

Instalação:

```
npm i debug --save
```

Em seguida, devemos informa que usaremos o módulo `debug` no projeto. Para isso utilizaremos a função `require()`, atribuindo o módulo a uma constante:

``` JS
const debug = require("debug");
```

Depois, podemos utilizar da mesma forma que seria com o `console.log`:

``` JS
const debug = require("debug");

debug("Hi");
```

Em seguida, devemos criar a variável de ambiente `DEBUG`:

```
$ export DEBUG=*
```

Obs.: O `*` informa que queremos que ele mostre tudo.

Nesse caso, veremos o debug de outros módulos npm, e não apenas os nossos. Porém, se estivermos interessados apenas no debug da nossa aplicação, devemos declarar a variável de ambiente desta outra forma:

```
$ export DEBUG=livro_nodejs:*
               [namespace]
```

No caso, `livro_nodejs` é um namespace que podemos declarar no momento do require:

``` JS
const debug = require("debug")("livro_nodejs");
```

### 2.3 TCP


