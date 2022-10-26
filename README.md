# Livro NodeJS  

## Anotações Capítulo 1

### 1.3 NPM

É um gerenciador de pacotes para o Node.JS. Ferramenta de linha de comando, que gerencia pacotes do registry npmjs.

Por exemplo, se quisermos utilizar o ExpressJS basta digitar o comando seguinte no terminal:

``` bash
$ npm install express
```

Ou 

``` bash
$ npm i express
```

Com esse comando, o módulo será baixado para uma pasta chamada `node_modules` no diretório raiz do projeto.

Vale configurar na máquina local os dados no npm. No linux é necessário criar ou editar o arquivo `.npmrc` na raizxz do usuário.

``` bash
$ cat ~/.npmrc

init.author.name=[user-name]
init.author.email=[user-email]
init.author.url=[user-url]
```

#### 1.3.1 npm update

O comando `npm update` nos ajuda a verificar quais módulos que podem ser atualizados.

``` bash
$ npm update -save
```

A flag `--save` vai se encarregar de escrever no `package.json` a nova versão dos módulos que forma atualizados.

Existe uma diferença entre os símbolos ^ e ~ que podem vir na frente da versão de cada módulo no `package.json`. O `~` é mais restritivo e só permite atualizações `patch`(último dígido do número da versão), enquanto o `^` permite que atualizações `minor`(segundo dígito do número da versão) sejam realizadas.

Isso porque uma atualização `major`(primeiro dígido do número da versão) pode quebrar a compatibilidade e por isso esse tipo de atualização deve ser feito manualmente.

#### 1.3.2 npx

Ele instala o módulo numa pasta temporária do registry npm, mas sem  necessariamente instalá-los globalmente, como fazíamos antigamente com pacotes como `express-generator`, `create-react-app` para só depois executá-los.

Ele instala o módulo numa pasta temporária - se já não estiver instalado no projeto local, ou no `node_modules` global -, executa o comando e depois remove a biblioteca, liberando espaço em disco.

Em vez de fazer:

``` bash
$ npm install -g express-generator
$ express
```

Usando npx, fazemos:

``` bash
$ npx express-generator
```

Outro exemplo, executando o `cowsay`(é uma vaca falante configurável):

``` bash
$ npx cowsay "Eu, Luke Skywalker, juro por minha honra e pela fé da irmandade dos cavaleiros, usar a Força apenas para o bem, sempre negando
ceder ao Lado Sombrio, e dedicar minha vida a causa da liberdade e da justica. Se eu nao cumprir esse voto, minha vida será perdida,
aqui e no futuro."
```

##### Learn you Node

`learnyounode` é um pacote que contém uma série de lições de workshop que ensinarão o básico sobre como escrever aplicativos Node.js por meio de uma interface interativa. As lições começam com uma lição básica "HELLO WORLD" e, em seguida, passam para exercícios mais avançados sobre como lidar com E/S síncrona e assíncrona, operações de sistema de arquivos, redes TCP e HTTP, eventos e fluxos.

Instalando o learnyounode globalmente:

``` bash
$ npm install -g learnyounode
```

Inciando o learnyounode:

``` bash
$ learnyounode
```

Ou usuando o npx:

``` bash
$ npx learnyounode
```# livro-nodejs
