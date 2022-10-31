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
$ npm i debug --save
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

O TCP ou Protocolo de Controle de Transmissão é um dos protocolos de comunicação de rede de computadores.

Uma característica muito importante de uma ferramenta de linha de comando é que, após ter sido executada o processo devolve o cursor do terminal ao usuário, para que ele possa continuar trabalhando, digitando outros comnados ou invocando novamente a ferramenta.

No caso de servidores, não acontece isso. O processo não pode simplesmente fechar. Ele precisa continuar aberto, aguardando conexões, para poder responder o que for solicitado.

Para entendermos melhor, vamos instalar o TCP telnet via brew:

```
$ brew install telnet
```

Vamos construir um pequeno e simples chat TCP com NodeJS, utilizando o módulo `net` nativo do core da plataforma.

``` JS
const net = require("net");
const chatServer  = net.createServer(); // criação do servidor
const clientList  = []; // variável para lista de usuários conectados
```

Criamos um servidor com a função `net.createServer()` e uma variável para conter a lista de usuários conectados `clientList`.

``` JS
const net = require("net");
const chatServer = net.createServer(); 
const clientList = []; 

const broadcast = (message, client) => { // broadcast irá enviar o que for digitado por um usuário aos demais conectados
  clientList
    .filter(item => item !== client) // filter para não duplicar a mensagem para quem acabou de enviar
    .forEach(item => item.write(message)) // escreve a mensagem
};
```

Depois declaramos a função `broadcast` que será responsável por enviar o que for digitado por qualquer usuário aos demais que também estão conectados. Utilizamos o método `filter` para não duplicar a mensagem para quem acabou de enviar.

``` JS
const net = require("net");
const chatServer = net.createServer();
const clientList = [];

const broadcast = (message, client) => {
  clientList
    .filter(item => item !== client)
    .forEach(item => item.write(message))
};

chatServer.on("connection", (client) => { // quando o usuário conectar, o evento on vai ser disparado
  client.write("Hi guest" + "!\n"); // escrevendo uma mensagem e pulando uma linha
  // [...]
});
```

Agora definimos o que irá acontecer quando um usuário conectar, ou seja, se o evento `chatServer.on("connection")` for disparado. Estamos escrevendo uma mensagem e pulando uma linha com `/n`.

``` JS
const net = require("net");
const chatServer = net.createServer();
const clientList = [];

const broadcast = (message, client) => {
  clientList
    .filter(item => item !== client)
    .forEach(item => item.write(message))
};

chatServer.on("connection", (client) => {
  client.write("Hi guest" + "!\n");
  clientList.push(client);
  client.on("data", (data) => broadcast(data, client));
  client.on("end", () => {
    console.log("client end", clientList.indexOf(client))
    clientList.splice(clientList.indexOf(client), 1) // removendo o usuário que desconectou do array clientList
  });
  client.on("error", (err) => console.log(err));
});
```

Quando um usuário digitar algo, logo o evento `on("data")` será disparado, podemos cjamar a função `brodcast` para transmitir para todos que estiverem conectados.

Sempre que um novo usuário `client` conecta, aguardamos uma referência dele no array `clientList`; caso ele desconecte, ou seja, quando o evento `on("end")` for recebido pelo servidor tcp, temos que removê-lo.

``` JS
// arquivo chat-tcp.js

const net = require("net");
const chatServer = net.createServer();
const clientList = [];

const broadcast = (message, client) => {
  clientList
    .filter(item => item !== client)
    .forEach(item => item.write(message))
};

chatServer.on("connection", (client) => {
  client.write("Hi guest" + "!\n");
  clientList.push(client);
  client.on("data", (data) => broadcast(data, client));
  client.on("end", () => {
    console.log("client end", clientList.indexOf(client))
    clientList.splice(clientList.indexOf(client), 1)
  });
  client.on("error", (err) => console.log(err));
});

chatServer.listen(9000);
```

Por fim, podemos informar ao nosso serviodr TCP para escutar;/ouvir(`listen`) as conexões na porta `9000`.

Para iniciar o nosso servidor TCP, utilizaremos o comando `node` seguido pelo nome do arquivo(ou o caminho), em uma janela do terminal:

``` 
$ node chat-tcp.js
```

Podemos notar que o cursor no terminal ficará aberto, em estado de espera. Isso ocorre porque abrimos um processo que é um `ouvinte`, aguardando que novos clientes se conectem a ele.

Para conversar nesse chat, basta conectar no IP de rede da máquina que está com o programa do servidor em execução, na porta 9000, como definimos no código. Em outra aba do terminal, iremos nos conectar como cliente, com o comando `telnet`:

```
$ telnet localhost 9000
Trying ::1...
Connected to localhost.
Escape character is '^]'.
Hi guest!
```

Alguém que estiver na mesma rede local poderá se conectar a esse servidor informando o IP da máquina que está rodando.

### 2.4 Criando um servidor HTTP

Bem parecido com o chat TCP, um servidor HTTP também é um processo que fica aberto aguardando conexões. 
Utilizaremos o módulo `http` do core do NodeJS para construir um simples servidor HTTP.

``` JS
const http = require("http");

const server = http.createServer((request, response) => {
  // [...]
});
```

Importamos o módulo `http` e criamos o servidor `http.createServer()`.

``` JS
const http = require("http");

const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Open the blast doors!\n");
});
```

Em seguida, escrevemos um cabeçalho com o status code 200, o content type de texto, e a string "Open the blast doors!\n".

``` JS
const http = require("http");

const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Open the blast doors!\n");
});

server.listen(1337);
```

Feito isso, colocamos o método `listen` na porta 1337, e está pronto nosso Hello World em NodeJS.

``` JS
// arquivo server-http.js

const http = require("http");

const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Open the blast doors!\n");
});

server.listen(1337, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:1337/");
});
```
server-http.js identificarmos que deu tudo certo.

Iniciamos o servidor pelo terminal:

```
$ node server-http.js
Server running at http://127.0.0.1:1337/
```

Depois, abrindo um navegador e visitando o endereço http://127.0.0.1:1337(ou http://localhost:1337), veremos a frase "Open the blast doors!" na página.

Podemos notar que, assim como o chat, fizemos o `require` de um módulo, criamos um servidor com a função `createServer()` e delegamos a uma porta um `listen`. Foi a porta 9000 no TCP e agora a porta 1337 no HTTP, mas poderia ser qualquer outro número acima de `1024`, que ainda não estivesse em uso.

#### 2.4.1 Outros endpoints

Os dois parâmetros da função `createServer()` são os objetos `request` e `response, que representam uma requisição HTTP e consistem sempre em um pedido e uma resposta, respectivamente.

O truque para responder a mais de uma requisiçaõ está em identificar o que foi solicitado e estão escrever algo diferente na tela. Para isso, podemos dar uma olhada na propriedade `url` do objeto `request`.

``` JS
const http = require("http");
const routes = new Map();

routes.set("/", (request, response) => response.end("Open the blast doors!\n"));
routes.set("/close", (request, response) => response.end("Close the blast doors!\n"));

const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  if (!routes.has(request.url)) {
    return response.end("No doors!\n")
  }
  return routes.get(request.url)(request, response)
});

server.listen(1337, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:1337/");
});
```

Agora, ao acessar pelo navegador http://localhost:1337, vemos a frase "Open the blast doors!" e ao acessar http://localhost:1337/close aparece a frase "Close the blast doors!" e ao tentar qualquer outra rota aparece a frase "No doors!".


A função `require` que utilizamos para disponibilizar o módulo `http` no programa é uma das poucas funções síncronas do NodeJs. Outra coisa importante a notar é que o require é cacheado, então não importa quantas vezes você faça require do mesmo módulo, core do NodeJS só vai fato acessar o disco uma vez; portanto, tenho cuidado ao tentar alterar algo importado com require, pois estará alterando a referência do módulo na sua aplicação como um todo.

Utilizamos a coleção `Map`, para melhorar a manutenilidade e legibilidade do código.

### 2.6 Express Generator

O módulo Express Generator cria uma estrutura inicial bem bacana para começar projetos. Vamos executar o módulo `express-generator` com o `npx`:

```
npx express-generator
```

### 2.7 Método process.nextTick

Entender como o Node JS funciona e por que é tão importante programar tudo de forma assíncrona também é um passo muito importante para colocar a aplicação no ar.

Rotinas síncronas são bloqueantes, pois ocupam o processador até estarem finalizadas. Como o Node é `single-thread`, se o processo estiver ocupado realizando alguma rotina síncrona muito demorada, então sua APO ficará incapaz de responder a novas requisições até que a rotina termine. Em outras palavras, qualquer coisa que bloquear o `Event Loop` irá bloquear tudo.

Por esse motivo, o NodeJS não é uma boa escolha para trabalhos que envolvam processamento pesado, como tratamento de imagens, parser de arquivos gigantes etc. 
Desde que este não seja o principal intuito da aplicação, se estivermos escrevendo uma ferramenta de linha de comando que redimensione imagens, então tudo bem; mas, se estivermos escrevendo uma API que deve responder a milhares de requisições simultâneas, então fazer o NodeJS responder a essas requisições e redimensionar imagens ao mesmo tempo talvez não seja uma boa ideia.

Em uma situação assim, o ideal seria fazer o NodeJS delegar o trabalho pesado de CPU para outra rotina, talvez escrita até em outra linguagem, que poderia ter melhor desempenho em uma situação dessas e deixaria o NodeJS como o maestro, transferindo para o `Event Loop` a espera do término do processamento, sem bloqueio.

Quando precisamos de algo assim no meio do código, como uma função recursiva, podemos utilizar o método `process.nextTick()`. Esse método adia a execução de uma função principal para o próximo ciclo do `Event Loop`, liberando assim o processo principal para receber novas requisições e enfileirá-las para execução.

Em vez de usarmos:

``` JS
const recursiveCompute = function() {
  // [...]
  recursiveCompute();
}
```

Podemos usar:

``` JS
const recursiveCompute = function() {
  // [...]
  process.nextTick(recursiveCompute);
};
recursiveCompute();
```

### 2.8 Star Wars API 

Usaremos a Star Wars API para escrever um programa que, quando invocado, realiza diversas requisições HTTP, interpola o retorno em um template markdown e escreve o resultado em um arquivo `.html`.

Olhando o contrato da API:

```
$ curl -i "https://swapi.dev/api/people"
HTTP/2 200 
server: nginx/1.16.1
date: Sun, 30 Oct 2022 22:29:47 GMT
content-type: application/json
vary: Accept, Cookie
x-frame-options: SAMEORIGIN
etag: "b493126da505af6fec015ec116fec193"
allow: GET, HEAD, OPTIONS
strict-transport-security: max-age=15768000

{"count":82,
"next":"https://swapi.dev/api/people/?page=2",
"previous":null,
"results":[
  {"name":"Luke Skywalker", ...
```

Podemos notar que ela possui uma paginação de dez em dez, e no total 82 pessoas cadastradas.

Para não usar o módulo http diretamente, iremos instalar o Axios:

```
$ npm init -y
$ npm i --save axios
```

O axios abstrai a interface de uso de modulo http, deixando nosso código mais expressivo e conciso.

O programa mais simples para a requisição fica:

``` JS
const axios = require("axios");

axios.get("https://swapi.dev/api/people/")
  .then(result => {
    console.log(result.data);
  })
  .then(result => {
    process.exit()
  });
```

Testando nosso programa:

``` bash
$ node index.js 
{
  count: 82,
  next: 'https://swapi.dev/api/people/?page=2',
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [Array],
      species: [],
      vehicles: [Array],
      starships: [Array],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/'
    }, ...
```

Queremos gerar o markdown a seguir:

```
# Star Wars API

Tem 82 pessoas
Name           | Height | Mass | Hair Color | Skin Color | Eye Color | Birth Year | Gender |
---------------|--------|------|------------|------------|-----------|------------|--------|
Luke Skywalker | 172    | 77   | Blond      | Fair       | Blue      | 19BBY      | male   |
```

Precisamos de um template engine para fazer interpolação das variáveis com o markdown, para isso usaremos uma feature das template strings.

``` JS
const axios = require("axios");
const fs = require("fs/promises");
const marked = require("marked");

const engine = (template, ...data) => {
  return template.map((s, i) => s + `${data[i] || ""}`).join("")
};

const render = result => {
  const title = "Star Wars API";
  const count = result.count;
  const items = result.results;

  const markdown = engine`
# ${title}
Tem ${count} pessoas
Name           | Height | Mass | Hair Color | Skin Color | Eye Color | Birth Year | Gender |
---------------|--------|------|------------|------------|-----------|------------|--------|
${items.map(item => {
  return [
    item.name,
    item.height,
    item.mass,
    item.hair_color,
    item.skin_color,
    item.eye_color,
    item.birth_year,
    item.gender,
    ""
  ].join("|")
}).join("\n")}
`
  return marked(markdown);
}

axios.get(`https://swapi.dev/api/people`)
  .then(render)
  .then(_ => process.exit());
```

A função `engine` fará toda a mágica de que precisamos ao passar uma template string para ela. É importante não ter tabulação à esquerda na declaração do template, para não interferir no markdown final gerado.

Com o módulo `marked`(devemos instalar essa dependência no projeto com o comando `npm i --save marked`) convertemos o markdown em HTML.

O resultado é:

``` 
$ node index.js
<h1 id="star-wars-api">Star Wars API</h1>
<p>Tem 82 pessoas</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Height</th>
<th>Mass</th>
<th>Hair Color</th>
<th>Skin Color</th>
<th>Eye Color</th>
<th>Birth Year</th>
<th>Gender</th>
</tr>
</thead>
<tbody><tr>
<td>Luke Skywalker</td>
<td>172</td>
...
```

Com essa etapa pronta, vamos nos concentrar em realizar a paginação para ler todos os dados. Como não queremos causar impactos na Star Wars API, vamos fazer uma requisição de cada vez, para isso usaremos generators.

``` JS
const axios = require("axios");
const fs = require("fs/promises");
const marked = require("marked");

const engine = (template, ...data) => {
  return template.map((s, i) => s + `${data[i] || ""}`).join("")
};

const render = result => {
  const title = "Star Wars API";
  const count = result.count;
  const items = result.results;

  const markdown = engine`
# ${title}
Tem ${count} pessoas
Name           | Height | Mass | Hair Color | Skin Color | Eye Color | Birth Year | Gender |
---------------|--------|------|------------|------------|-----------|------------|--------|
${items.map(item => {
  return [
    item.name,
    item.height,
    item.mass,
    item.hair_color,
    item.skin_color,
    item.eye_color,
    item.birth_year,
    item.gender,
    ""
  ].join("|")
}).join("\n")}
`
  return marked(markdown);
}

async function* paginate() {
  let page = 1;
  let result;
  while (!result || result.status === 200) {
    try {
      result = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
      page++
      yield result;
    } catch (e) {
      return e;
    }
  }
}

const getData = async () => {
  let results = [];
  for await (const response of paginate()) {
    results = results.concat(response.data.results);
  }

  return {
    count: results.length,
    results
  }
}
```

A função `paginate()` faz requisições de página em página enquanto o status code retornado for 200. Cada requisição devolve dez pessoas, e são 82 no total, logo temos nove páginas; ao tentar fazer um request para a décima página, recebemos um 404 de retorno e, nesse momento, sabemos que acabamos de recuperar todas as pessoas.

A função `getData` usa o `for await` para aguardar um retorno por vez, concatena os dados em um array e envia para a função `render` todas as 82 pessoas.

O código final fica assim:

``` JS
const axios = require("axios");
const fs = require("fs/promises");
const marked = require("marked");

const engine = (template, ...data) => {
  return template.map((s, i) => s + `${data[i] || ""}`).join("")
};

const render = result => {
  const title = "Star Wars API";
  const count = result.count;
  const items = result.results;

  const markdown = engine`
# ${title}
Tem ${count} pessoas
Name           | Height | Mass | Hair Color | Skin Color | Eye Color | Birth Year | Gender |
---------------|--------|------|------------|------------|-----------|------------|--------|
${items.map(item => {
  return [
    item.name,
    item.height,
    item.mass,
    item.hair_color,
    item.skin_color,
    item.eye_color,
    item.birth_year,
    item.gender,
    ""
  ].join("|")
}).join("\n")}
`
  return marked(markdown);
}

async function* paginate() {
  let page = 1;
  let result;
  while (!result || result.status === 200) {
    try {
      result = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
      page++
      yield result;
    } catch (e) {
      return e;
    }
  }
}

const getData = async () => {
  let results = [];
  for await (const response of paginate()) {
    results = results.concat(response.data.results);
  }

  return {
    count: results.length,
    results
  }
}

getData()
  .then(render)
  .then(result => fs.writeFile("people.html", result))
  .then(_ => process.exit());
```

Ao executar, termos um arquivo `people.html` com todas as pessoas da API.

## Anotações Capítulo 3

- **REST (Representational State Transfer - Transferência de Estado Representacional):**

É um design de arquitetura para troca de informações entre aplicações pela rede. Esse termo foi definido no ano de 2000 por Roy Fielding, que também havia sido um dos autores da especificação do protocolo HTTP. 
Utilizamos REST para desenvolver no protocolo HTTP e, quando  seguimos as restrições descritas pela especificação, podemos dizer que fizemos um web service RESTful.

Um web service é uma solução de integração e comunicação entre aplicações diferentes através da internet. Essa arquitetura permite que sistemas disponibilizem, com segurança, dados para outros consumidores. 
São preceitos que um web service deve garantir autenticidade, privacidade e integridade. Grosso modo, é uma forma de permitir que outras aplicações façam queries no seu BD, mas apenas as que você permitir e se aquele cliente tiver permissão de acesso suficiente para poder realizar essa operação.

Uma API(Application Public Interface) é a interface que expomos ao mundo. É a forma de deixar que outras aplicações manipulem a nossa aplicação, os nossos dados, seja editando ou apenas filtrando alguma informação.

Vamos juntar todos esses conceitos e construit uma web service com uma API RESTful.

Para construir uma boa API, precisamos entender cada uma das partes e planejar um design que faça sentido para os nossos clientes.

Na web, um web service que trafega informações via HTTP é composto basicamente por duas partes a `requisição` e a `resposta`.

### 3.2 Estrutura da requisição

Uma requisição é um `pedido` que fazemos a um web service. O protocolo HTTP é baseado em pedido e resposta. Quando um navegador acessa um site, ele está pedindo um conteúdo para o servidor daquele site. Esse pedido que vem em forma de HTML é a resposta do servidor.

Atualmente, utilizamos o protocolo HTTP 1.1. Nele temos que uma requisição gera uma resposta. Porém, essa requisição pode ser bem detalhada e especificar muitas coisas, como qual tipo de mídia queremos como retorno, quais tipos de dados e em qual quantidade etc.

Estrutura de uma requisição:

- **Endpoint:** é o URL, um endereço web. Exemplo: `https://site.com.br/livros`; 
- **Query:** é a query string na URI. Exemplo: `?param=value&param2=value2`;
- **Recurso:** é um caminho. Exemplo: na URI `https://site.com.br/livros` a palavra `livros` é um recurso;
- **Parâmetros:** são variáveis enviadas na URI. Exemplo: na URI `https://site.com.br/livros/1` o número `1` é o parâmetro;
- **Cabeçalho:** são dados adicionais enviados na requisição. Exemplo: tipo de mídia que aceitamos como retorno, toke para autenticação, cookies etc.;
- **Método:** é o tipo de requisição, chamado também de verbo. Os métodos existentes no HTTP são: OPTIONS, GET, HEAD, POST, PUT, PATCH, DELETE, TRACE e CONNECT;
- **Dado:** é o corpo da requisição. Exemplo: quando enviamos um formulário via POST, os dados nos inputs são o corpo da requisição. 