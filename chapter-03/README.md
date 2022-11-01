# Livro NodeJS  

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
- **Recurso:** é um caminho. Exemplo: na URL `https://site.com.br/livros` a palavra `livros` é um recurso;
- **Parâmetros:** são variáveis enviadas na URL. Exemplo: na URL `https://site.com.br/livros/1` o número `1` é o parâmetro;
- **Cabeçalho:** são dados adicionais enviados na requisição. Exemplo: tipo de mídia que aceitamos como retorno, toke para autenticação, cookies etc.;
- **Método:** é o tipo de requisição, chamado também de verbo. Os métodos existentes no HTTP são: OPTIONS, GET, HEAD, POST, PUT, PATCH, DELETE, TRACE e CONNECT;
- **Dado:** é o corpo da requisição. Exemplo: quando enviamos um formulário via POST, os dados nos inputs são o corpo da requisição.

#### Endpoint/rota(route)

Quando ouvir alguém falando sobre `endpoints`, entenda como a URL de um web service. É o caminho web até alguma coisa. Aquele endereço que digitamos no browser, por exemplo. 
Um endpoint é composto de três partes: query, recurso e parâmetro. Um endpoint também pode ser chamado de `rota`.

#### Query

Devemos utilizar a query para filtrar dados. Imagine que você tenha uma URL que, quando acessada, retorna muitos livros. Se quisermos apenas os livros escritos em português, utilizaremos a query para filtrar esses dados: 

``` 
/livros?language=pt-br
```

Podemos continuar filtrando e pedir apenas os dez primeiros: 

```
/livros?language=pt-br&limit=10
```

A sintaxe de uma query string é `<busca>=<valor>`. 
Indicamos que vamos concatenar mais uma busca após outra com o caractere `&`(e comercial).
O início da query string é indicado pelo caractere `?`(interrogação), ficando entãi uma query string com três parâmetros assim:

```
?<query>=<value>&<query2>=<value2>&<query3>=<value3>
```

#### Recurso (URI)/Resource

É a primeira parte da URL logo após o domínio. Aquela parte que fica entre barras. Quando construímos uma API, pensamos nos recursos que iremos disponibilizar e escrevemos as URLs de uma maneira clara e legível para que a nossa URI identifique claramento o que será retornado.

```
http://site.com/worlds
```

#### Parâmetros/Params

Um parâmetro é uma informação variável em uma URI. Aquela parte após o domínio e o recurso que aceita diferentes valores e, consequentemente, retorna dados diferentes. Geralmente utilizamos os parâmetros para informar ids do banco de dado, assim pedimos para esse endpoint/rota apenas um produto específico.

```
http://site.com/worlds/5506dc648ccdc491c6b2b61
```

Nesse caso, a string/hash "5506dc648ccdc491c6b2b61" é o parâmetro, e `worlds` é o recurso.

#### Cabeçalho/Header

São informações adicionais, enviadas na requisição. Se quisermos avisar o servidor que estamos enviando uma requisição com um conteúdo formatado em JSON, informamos via cabeçalho/headers.

```
H "Content-Type: application/json"
```

Os cabeçalhos não aparecem na URL, e não conseguimis manipulá-los com HTML, por isso talvez seja difícil identificar exatamente onde eles estão.

Cabeçalhos personalizados eram geralmente prefixados com a letra `X-`. Como `X-Auth-Token`. Porém, essa convenção caiu em desuso, e hoje é encorajado que utilizemos diretamente o nome que queremos, sem prefixo algum.

#### Método/Method

É o tipo de requisição que estamos fazendo. Pense no método como um verbo, ou seja, uma ação. Para cada tipo de ação existe um verbo correspondente. Os verbos HTTP permitem que uma mesma URL, tenha ações diferentes sob um mesmo recurso, assim:

- **GET**/troopers/id - retorna um soldado específico pelo seu `id`;
- **PUT**/troopers/id - atualiza um soldado pelo seu `id`. No PUT toda a entidade deve ser enviada;
- **PATCH**/troopers/id - atualiza alguma informação do soldado pelo seu `id`. Diferente do PUT o PATCH não requer que todas as informações sejam enviadas, mas apenas aquelas que forem de fato modificadas;
- **DELETE**/troopers/id - exclui um soldado do `id` tal;

- **GET**/troopers - retorna todos soldados;
- **POST**/troopers - cria um novo soldado.

O HEAD é bem parecido com o GET a diferença é que o servidor não retorna o copo da resposta(body).

#### Corpo/Body

É o corpo da requisição, ou seja, os dados que queremos enviar. Pode ser texto puro, formatado em XML, em JSON, imagem ou qualquer outro tipo de mídia.

### 3.3 Estrutura da resposta

A resposta é o `retorno`, ou seja, é o resultado de uma requisição. A estrutura de uma resposta:

- **Status code:** é um número de 100 a 599. Ex.: 404 para página não encontrada.
- **Dado/Data:** é o corpo do retorno. Ex.: ao pedir por um HTML, o HTML é o corpo do retorno.
- **Cabeçalho/Header:** são informações extras enviadas pelo servidor. Ex.: tempo de expiração de um recurso.

#### Status code

- **1xx Informational**
`100` Continue
`101` Switching Protocols
`102` Processing

- **2×× Success**
`200` OK
`201` Created
`202` Accepted
`203` Non-authoritative Information
`204` No Content
`205` Reset Content
`206` Partial Content
`207` Multi-Status
`208` Already Reported
`226` IM Used

- **3×× Redirection**
`300` Multiple Choices
`301` Moved Permanently
`302` Found
`303` See Other
`304` Not Modified
`305` Use Proxy
`307` Temporary Redirect
`308` Permanent Redirect

- **4×× Client Error**
`400` Bad Request
`401` Unauthorized
`402` Payment Required
`403` Forbidden
`404` Not Found
`405` Method Not Allowed
`406` Not Acceptable
`407` Proxy Authentication Required
`408` Request Timeout
`409` Conflict
`410` Gone
`411` Length Required
`412` Precondition Failed
`413` Payload Too Large
`414` Request-URI Too Long
`415` Unsupported Media Type
`416` Requested Range Not Satisfiable
`417` Expectation Failed
`418` I’m a teapot
`421` Misdirected Request
`422` Unprocessable Entity
`423` Locked
`424` Failed Dependency
`426` Upgrade Required
`428` Precondition Required
`429` Too Many Requests
`431` Request Header Fields Too Large
`444` Connection Closed Without Response
`451` Unavailable For Legal Reasons
`499` Client Closed Request

- **5×× Server Error**
`500` Internal Server Error
`501` Not Implemented
`502` Bad Gateway
`503` Service Unavailable
`504` Gateway Timeout
`505` HTTP Version Not Supported
`506` Variant Also Negotiates
`507` Insufficient Storage
`508` Loop Detected
`510` Not Extended
`511` Network Authentication Required
`599` Network Connect Timeout Error

#### Cookies 

Fazem parte da resposta, são arquivos temporários, gravados no navegador, com escopo do site que os criou, para gravar e manipular informações.

### 3.4 Restrições do REST

O REST foi definido com base em seis restrições, que são: `client-server`, `stateless`, `cacheable`, `uniform interface`, `layered system` e `code-on-demand`.

#### Client-Server

É a restrição básica para uma aplicação REST. O objetivo desta divisão é separar a arquiterura e responsabilidades em dois ambientes. Assim, o cliente(consumidor do serviço) não se preocupa com tarefas do tipo: comunicação com banco de dados, gerenciamento de cache, log, etc. E o contrário também é válido, o servidor(provedor do serviço) não se preocupa com tarefas como: interface, experiência do usuário, etc. Permitindo, assim, a evolução independente das duas arquiteturas.

#### Stateless

Um mesmo cliente pode mandar várias requisições para o servidor, porém, cada uma delas devem ser independentes, ou seja, toda requisição deve conter todas as informações necessárias para que o servidor consiga entendê-la e processá-la adequatamente.

Neste caso, o servidor não deve guardar nenhuma informação a respeito do estado do cliente. Qualquer informação de estado deve ficar no cliente, como as sessões, por exemplo.

#### Cacheable

Como muitos clientes acessam um mesmo servidor, e muitas vezes requisitando os mesmos recursos, é necessário que estas respostas possam ser cacheadas, `evitando processamento desnecessário` e aumentando significativamente a performance.

Isso significa que um primeiro cliente solicita um determinado resource para o servidor, o servidor processa esta requisição e armazena isso temporariamente no cache. Quando os demais clientes solicitam o mesmo resource, o servidor devolve o que está no cache sem ter que reprocessá-lo. A regra para limpar o cache varia de resource para resource, pode ser limpo sempre que houver uma troca de estado no resource; pode ser limpo em um determinado intervalo de tempo antes de ser reprocessado, de hora em hora, por exemplo, e por aí vai.


#### Uniform Interface

É, basicamente, um contrato para comunicação entre clientes e servidor. São pequenas regras para deixar um componente o mais genérico possível, o tornando muito mais fácil de ser refatorado e melhorado.

Dentro desta regra, existe uma espécie de guideline para fazer essa comunicação uniforme:

  1) **Identificando o resource** – cada resource deve ter uma URI específica e coesa para poder ser acessado, por exemplo, para trazer um determinado usuário cadastrado no site:

  ```
  HTTP/1.1 GET http://rplansky.com/user/rplansky
  ```

  2) **Representação do resource** – é a forma como o resource vai ser devoldido para o cliente. Esta representação pode ser em HTML, XML, JSON, TXT, entre outras. Exemplo de como seria um retorno simples da chamada acima:

  ``` JSON
  {
    "name": "Ricardo Plansky",
    "job": "Web Analyst/Developer",
    "hobbies": ["football", "coding", "music"]
  }
  ```

  3) **Resposta auto-explicativa** – além do que vimos até agora, é necessário a passagem de meta informações (metadata) na requisição e na resposta. Algumas destas informações são: código HTTP da resposta, Host, Content-Type, etc. Tendo como exemplo a mesma URI que acabamos de ver:

  ```
  GET /#!/users/rplansky HTTP/1.1
    User-Agent: Chrome/37.0.2062.94
    Accept: application/json
    Host: rplansky.com
  ```

  4) **Hypermedia** – Esta parte por muitas vezes é esquecida quando falamos de REST. Consiste em retornar todas as informações necessárias na resposta para que cliente saiba navegar e ter acesso a todos os resources da aplicação. Exemplo:

  Requisição

  ``` 
  HTTP/1.1 POST http://rplansky.com/rplansky/posts
  ```

  Resposta:

  ``` JSON
  {
    "post": {
      "id": 42,
      "title": "Conceitos REST",
      "decription": "Um pouco sobre conceito da arquitetura REST",
      "_links": [
        {
          "href": "/rplansky/post/42",
          "method": "GET",
          "rel": "self"
        },
        {
          "href": "/rplansky/post/42",
          "method": "DELETE",
          "rel": "remove"
        },
        {
          "href": "/rplansky/post/42/comments",
          "method": "GET",
          "rel": "comments"
        },
        {
          "href": "/rplansky/posts/42/comments",
          "method": "POST",
          "rel": "new_comment"
        },
        // {...}
      ]
  },
    "_links": {
      "href": "/post",
      "method": "GET",
      "rel": "list"
    }
  }
  ```

#### Layered System

A sua aplicação deve ser composta por camadas, e estas camadas devem ser fáceis de alterar, tanto para adicionar mais camadas, quanto para removê-las. Dito isso, um dos princípios desta restrição é que o cliente nunca deve chamar diretamente o servidor da aplicação sem antes passar por um intermediador, no caso, pode ser um load balancer ou qualquer outra máquina que faça a interface com o(s) servidor(es). 
Isso garante que o cliente se preocupe apenas com a comunicação com o intermediador e o intermediador fica responsável por distribuir as requições nos servidores, seja um ou mais, indifere nesse caso. O importante é ficar claro que criando um intermediador, a sua estrutura fica muito mais flexível à mudanças.

#### Code-On-Demand (Opcional)

Esta condição permite que o cliente possa executar algum código sob demanda, ou seja, estender parte da lógica do servidor para o cliente, seja através de um applet ou scripts. Assim, diferentes clientes podem se comportar de maneiras específicas mesmo que utilizando exatamente os mesmos serviços providos pelo servidor.

Como este item não faz parte da arquitetura em si, ele é considerado opcional. Ele pode ser utilizado quando executar alguma parte do serviço do lado do cliente for mais eficaz ou rápida.

