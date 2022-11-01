# Livro NodeJS  

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