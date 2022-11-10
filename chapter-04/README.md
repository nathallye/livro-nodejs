## Anotações Capítulo 4

### 4.1 Banco de dados - Postgres

PostgreSQL é um sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto.

#### 4.1.1 Modelagem

- Acessando o postgres via terminal: 

```
$ psql -d postgress
```

- Criando banco de dados: 

``` SQL
postgres=# create database livro_nodejs;
                           [name-database]
```

- Listando banco de dados existentes no postgres:

``` 
postgres=# \l
```

- Acessando o banco de dados: 

```
postgres=# \c livro_nodejs
              [name-database]
```

- Criando as tabelas:

``` SQL
CREATE TABLE patents (
	id serial PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE divisions (
	id serial PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE stormtroopers (
	id serial PRIMARY KEY,
	name TEXT NOT NULL,
	nickname TEXT NOT NULL,
	id_patent INT NOT NULL,
	FOREIGN KEY (id_patent) REFERENCES patents(id)
);

CREATE TABLE stormtrooper_division (
	id_stormtrooper INT NOT NULL,
	id_division INT NOT NULL,
	FOREIGN KEY (id_stormtrooper) REFERENCES stormtroopers(id),
	FOREIGN KEY (id_division) REFERENCES divisions(id)
);
```

- Listando as tabelas: 

Comando
```
livro_nodejs=# \dt
[name-database]
```

Retorno
```
Schema |         Name          | Type  |   Owner   
--------+-----------------------+-------+-----------
 public | divisions             | table | nathallye
 public | patents               | table | nathallye
 public | stormtrooper_division | table | nathallye
 public | stormtroopers         | table | nathallye
(4 rows)
```

- Excluindo uma tabela: 

``` SQL
livro_nodejs=# DROP TABLE divisions;
[database-name]           [table-name]
```

##### Relacionamento 1:N

Cada soldado tem uma patente, então temos um relacionamento 1 para n. Onde cada soldado/`stormtrooper` tem uma patente/`patent` e cada patente/`patent` pode ter n soldados/`stormtroopers` Por isso, criamos a tabela `patents` e iremos cadastrar as possíveis patentes, feito isso, podemos inserir um soldado na tabela `stormtroopers`.

- Visualizando itens de uma tabela tabela: 

Comando
```
livro_nodejs=# \d stormtroopers
[database-name]   [table-name]
```

Retorno
```
  Column   |  Type   | Collation | Nullable |                  Default                  
-----------+---------+-----------+----------+-------------------------------------------
 id        | integer |           | not null | nextval('stormtroopers_id_seq'::regclass)
 name      | text    |           | not null | 
 nickname  | text    |           | not null | 
 id_patent | integer |           | not null | 

Indexes:
    "stormtroopers_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "stormtroopers_id_patent_fkey" FOREIGN KEY (id_patent) REFERENCES patents(id)
Referenced by:
    TABLE "stormtrooper_division" CONSTRAINT "stormtrooper_division_id_stormtrooper_fkey" FOREIGN KEY (id_stormtrooper) REFERENCES stormtroopers(id)
```

- Inserindo dados nas tabelas(inserindo patentes):

``` SQL
            [table-name]
INSERT INTO patents (name) VALUES ('Soldier'), ('Commander'), ('Captain'), ('Lieutenant'), ('Sergent');
                    [column-name]
```

- Inserindo dados nas tabelas(inserindo soldado com uma divisão):

``` SQL
            [table-name]
INSERT INTO stormtroopers (name, nickname, id_patent) VALUES ('CC-1010', 'Fox', 2);
                                 [columns-name]                     [values]
```

- Visualizando as informações cadastradas:

Comando
``` SQL
livro_nodejs=# SELECT stormtroopers.id, stormtroopers.name, nickname, patents.name FROM stormtroopers INNER JOIN patents ON patents.id = stormtroopers.id_patent;
```

Retorno
```
 id |  name   | nickname |   name    
----+---------+----------+-----------
  1 | CC-1010 | Fox      | Commander
(1 row)
```

##### Relacionamento N:N

Um soldado pode pertencer a mais de uma divisão, por isso precisamos de um relacionamento n para n, em que cada soldado/`stormtrooper` tem n divisões/`divisions` e cada divisão/`division` tem n soldados/`stormtroopers`. 


- Inserindo dados nas tabelas(inserindo divisões):

``` SQL
INSERT INTO divisions (name) VALUES ('Breakout Squad'), ('501st Legion'), ('35th Infantry'), ('212th Attck Battalion'), ('Squad Seven'), ('44th Special Operations Division'), ('Lightning Squadron'), ('Coruscant Guard');
```

- Para fazer o relacionamento n:n é necessário uma tabela de relacionamento, nesse caso ela se chama `stormtrooper_division`.
Visualizando itens de uma tabela tabela: 

Comando
```
livro_nodejs=# \d stormtrooper_division
[database-name]   [table-name]
```

Retorno
```
    Column      |  Type   | Collation | Nullable | Default 
-----------------+---------+-----------+----------+---------
 id_stormtrooper | integer |           | not null | 
 id_division     | integer |           | not null | 
Foreign-key constraints:
    "stormtrooper_division_id_division_fkey" FOREIGN KEY (id_division) REFERENCES divisions(id)
    "stormtrooper_division_id_stormtrooper_fkey" FOREIGN KEY (id_stormtrooper) REFERENCES stormtroopers(id)
```

- Para inserirmos a divisão/`division` do Comandante Fox (id 1 da tabela `stormtroopers`), precisamos de dois inserts na tabela de relacionamento, pois ele passou por dois postos: 501st Legion ( id 2 da tabela `divisions`) e Coruscant Guard (id 8 da tabela `divisions`).

``` SQL
INSERT INTO stormtrooper_division (id_stormtrooper, id_division) VALUES (1, 2), (1, 8);
```

- Visualizando as informações cadastradas:

Comando
``` SQL
SELECT id_stormtrooper, name, nickname, id_patent, stormtrooper_division.id_division 
  FROM stormtroopers 
  INNER JOIN stormtrooper_division ON stormtroopers.id = stormtrooper_division.id_stormtrooper;
```

Retorno
```
 id_stormtrooper |  name   | nickname | id_patent | id_division 
-----------------+---------+----------+-----------+-------------
               1 | CC-1010 | Fox      |         2 |           2
               1 | CC-1010 | Fox      |         2 |           8
(2 rows)
```

- Visualizando os dados inseridos com mais informações(name patent e name division ao invés de id_patent e id_division):

Comando
``` SQL
SELECT id_stormtrooper, stormtroopers.name, nickname, patents.name, divisions.name 
	FROM stormtroopers 
	INNER JOIN stormtrooper_division ON stormtroopers.id = stormtrooper_division.id_stormtrooper
	INNER JOIN patents ON patents.id = stormtroopers.id_patent
	INNER JOIN divisions ON divisions.id = stormtrooper_division.id_division;
```

Retorno
```
 id_stormtrooper |  name   | nickname |   name    |      name       
-----------------+---------+----------+-----------+-----------------
               1 | CC-1010 | Fox      | Commander | 501st Legion
               1 | CC-1010 | Fox      | Commander | Coruscant Guard
(2 rows)
```

O Comandante Fox(id 1 da tabela `stormtroopers`) aparece duplicado, pois é assim que os bancos SQL tratam relacionamentos muitos para muitos (n:n).

#### 4.1.2 Node-postgres

- Instalação do pacote no projeto(depois de iniciar com `npm init`):

``` 
npm i pg
```

- Usando o módulo `pg` com NodeJS, fica assim (arquivo `pg-create.js`):

``` JS
const { Client } = require("pg");

const client = new Client({
  user: "nathallye",
  password: "",
  host: "localhost",
  port: 5432,
  database: "livro_nodejs",
});

client.connect();

const params = ["CT-5555", "Fives", 2];
const sql = `INSERT INTO stormtroopers (name, nickname, id_patent)
  VALUES ($1::text, $2::text, $3::int)`;

client.query(sql, params)
  .then(result => {
    console.log(result);
    process.exit();
  });
```

- O script para o SELECT(arquivo `pg-retrieve.js`):

``` JS
const { Client } = require("pg");

const client = new Client({
  user: "nathallye",
  password: "",
  host: "localhost",
  port: 5432,
  database: "livro_nodejs",
});

client.connect();

const params = ["CT-5555"];

const sql = `SELECT * FROM stormtroopers WHERE name = $1::text`
client.query(sql, params)
  .then(result => {
    console.log(result.rows);
    process.exit();
  });
```

- Executando:

```
$ node pg-retrieve.js
[
  { id: 6, name: 'CT-5555', nickname: 'Fives', id_patent: 2 }
]
```

### 4.2 Banco de dados - MongoDB

MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas. 

Ele trabalha com conceito de documentos/`documents` em vez de linhas/rows, e coleções/`collections` em vez de tabelas e campos/`fields` em vez de columns.

```
{
  "name": "CT-1010",
  "nickname": "Fox",
  "divisions": [
    "501st Legion",
    "Coruscant Guard"
  ],
  "patent": "Commander"
}
```

No MongoDB não há a necessidade de criar o database. Ele será criado quando for utilizado pela primeria vez. Nem de criar uma colletion, que será criada quando o primeiro registro for inserido. Com o comando `use` trocamos de database.

Para entrar no terminal do mongo, após instalar o MongoDB iremos criar um diretório chamado `/data/db` na raiz do computador. E para iniciar o mongo iremos abrir um terminal nesse diretório e digitar:

```
$ mongod
```

No entanto, na minha máquina não é necessário, pois ele já está rodando em segundo plano.

- Vamos acessar o MOngoDB com o comando seguinte:

```
$ mongo
> use livreo_nodejs;
switched to db livro_nodejs
```

O console do MongoDB também é JavaScript, assim como o console do NodeJS, logo, também podemos escrever qualquer JS válido.

**Mongo Hacker:** É um projeto muito legal, com ele instalado, melhora a experiência do shell do mongo, ao adicionar comandos e diversos hacks no arquivo `~/.mongorc.js`.

- Para listar todos os databases disponíveis, iremos usar o comando `show dbs`:

```
> show dbs;
admin        0.000GB
config       0.000GB
db_finance   0.000GB
gryfus       3.162GB
local        0.000GB
orcafascio  88.101GB
todo         0.000GB
```

- A palavra reservada `db` é um ponteiro que aponta para o database em que estamos logados:

```
> db
livro_nodejs
```

- A sintaxe para realizar alguma coisa pelo console é:

```
db.<collectionname>.<operation>;
```

##### Inserindo registros

- Podemos inserir diretamente um soldado/`stormtroopers`, sem ter criado a collection previamente:

``` 
> db.stormtroopers.insert({ name: 'CT-1010', nickname: 'Fox', divisions: ['501st Legion', 'Coruscant Guard'], patent: 'Commander' });
WriteResult({ "nInserted" : 1 })
```

- Com isso, o banco vai automaticamente criar a collection `stormtroopers` e persisti-la no disco. Podemos visualizar as collections do banco em questão, com o comando seguinte:

```
> show collections;
stormtroopers
```

- Podemos consultar o soldado que acabamos de inserir com o comando seguinte:

```
> db.stormtroopers.findOne();
{
	"_id" : ObjectId("6364511d59a03896b63f19bc"),
	"name" : "CT-1010",
	"nickname" : "Fox",
	"divisions" : [
		"501st Legion",
		"Coruscant Guard"
	],
	"patent" : "Commander"
}
```

**Obs.:** `ObjectId` é uma função interna do MongoDB que garante que esse `_id` será único. DEntro do hash de 24 caraceteres do ObjectId, existe a informação do segundo em que aquele registro foi inserido no MongoDB, podemos resgatá-lo com o método `getTimestamp()`.

- Inserir mais soldados é tão simples quanto enviar um array para o BD; na verdade, podemos de fato criar uma variável com um array e depois inseri-lo:

``` 
const clones = [{ name: 'CT-1020', nickname: 'Hardcase', divisions: ['501st Legion'], patent: 'Soldier' }, { name: 'CT-27-5555', nickname: 'Fives', divisions: ['Coruscant Guard'], patent: 'Soldier' }, { name: 'CT-2224', nickname: 'Cody', divisions: ['212th Attack Battalion'], patent: 'Commander' }, { name: 'CT-7567', nickname: 'Rex', divisions: ['501st Legion'], patent: 'Capitain' }];

> db.stormtroopers.insert(clones);
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 4,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

##### Selecionando resultados

- Utilizando o comando `find()`, conseguimos fazer uma query e trazer todos os dados/`documents` cadastrados:

``` 
> db.stormtroopers.find();
{ "_id" : ObjectId("6364511d59a03896b63f19bc"), "name" : "CT-1010", "nickname" : "Fox", "divisions" : [ "501st Legion", "Coruscant Guard" ], "patent" : "Commander" }
{ "_id" : ObjectId("6364545059a03896b63f19bd"), "name" : "CT-1020", "nickname" : "Hardcase", "divisions" : [ "501st Legion" ], "patent" : "Soldier" }
{ "_id" : ObjectId("6364545059a03896b63f19be"), "name" : "CT-27-5555", "nickname" : "Fives", "divisions" : [ "Coruscant Guard" ], "patent" : "Soldier" }
{ "_id" : ObjectId("6364545059a03896b63f19bf"), "name" : "CT-2224", "nickname" : "Cody", "divisions" : [ "212th Attack Battalion" ], "patent" : "Commander" }
{ "_id" : ObjectId("6364545059a03896b63f19c0"), "name" : "CT-7567", "nickname" : "Rex", "divisions" : [ "501st Legion" ], "patent" : "Capitain" }
```

- Se quiséssemos que o banco não retornasse o atributo `_id`, bastaria passarmos `id: 0` como segundo argumento da função `find()`. O primero é a query e o segundo quais campos queremos ou não retornar:

```
> db.stormtroopers.find({}, {_id: 0});
{ "name" : "CT-1010", "nickname" : "Fox", "divisions" : [ "501st Legion", "Coruscant Guard" ], "patent" : "Commander" }
{ "name" : "CT-1020", "nickname" : "Hardcase", "divisions" : [ "501st Legion" ], "patent" : "Soldier" }
{ "name" : "CT-27-5555", "nickname" : "Fives", "divisions" : [ "Coruscant Guard" ], "patent" : "Soldier" }
{ "name" : "CT-2224", "nickname" : "Cody", "divisions" : [ "212th Attack Battalion" ], "patent" : "Commander" }
{ "name" : "CT-7567", "nickname" : "Rex", "divisions" : [ "501st Legion" ], "patent" : "Capitain" }
```

- Caso quiséssemos retornar apenas alguns campos, passaríamos esses campos com o número 1, indicando true:

```
> db.stormtroopers.find({}, {_id: 0, nickname: 1, divisions: 1});
{ "nickname" : "Fox", "divisions" : [ "501st Legion", "Coruscant Guard" ] }
{ "nickname" : "Hardcase", "divisions" : [ "501st Legion" ] }
{ "nickname" : "Fives", "divisions" : [ "Coruscant Guard" ] }
{ "nickname" : "Cody", "divisions" : [ "212th Attack Battalion" ] }
{ "nickname" : "Rex", "divisions" : [ "501st Legion" ] }
```

##### Realizando buscas

- Podemos realizar buscas por qualquer um dos atributos do nosso documento(linha), como por exemplo, contar quantos são comandantes:

```
> db.stormtroopers.find({ patent: "Commander" }).count();
2
```

- Ou se quisermos saber quantos soldades/clones pertencem à 501st Legion:

```
> db.stormtroopers.find({ divisions: { $in: ["501st Legion"] } }).count();
3
```

- Utilizar `.find().count` é uma forma lenta de saber quantos registros existem, pois primeiro subimos os registros para a memória com o `.find()` e depois perguntamos quantos são com o `.count()`. Podemos usar o `.count()` diretamente, com qualquer query:

```
> db.stormtroopers.count({ divisions: { $in: ["501st Legion"] } });
3
```

- Podemos utilizar expressões regulares para simular um `LIKE` do SQL e busvatr um soldado/clone por parte do seu nome. Com a expressão `/CT-2(.*)/` teremos como retorno todos os clones que tenham o nome iniciado com CT-2:

```
> db.stormtroopers.find({ name: /CT-2(.*)/ });
{ "_id" : ObjectId("6364545059a03896b63f19be"), "name" : "CT-27-5555", "nickname" : "Fives", "divisions" : [ "Coruscant Guard" ], "patent" : "Soldier" }
{ "_id" : ObjectId("6364545059a03896b63f19bf"), "name" : "CT-2224", "nickname" : "Cody", "divisions" : [ "212th Attack Battalion" ], "patent" : "Commander" }
```

- Para encontrar todos os nomes que terminam com o número 5 - `{ name: /5$/}` - ou todos que começam com a letra F - `{ name: /^F/ }`.

- O método `.distinct()` pode ser usado para se ter uma ideia dos valores único do database.

```
> db.stormtroopers.distinct('patent');
[ "Capitain", "Commander", "Soldier" ]
```

- E funciona também com arrays:

```
> db.stormtroopers.distinct('divisions');
[ "212th Attack Battalion", "501st Legion", "Coruscant Guard" ]
```

##### Atualizando informações

- Com o comando `update()`, nós podemos atualizar um ou vários registros. Para trocar o nome do soldado `Fives` de `CT-27-5555` para `CT-5555`, procurando pelo apelido(ideal que essa busca seja feita pelo id para que não ocorram atualizações equivocas, tendo em vista que o ObjectId é um valor único por documento), fazemos assim:

```
> db.stormtroopers.update({ nickname: "Fives" }, { $set: { name: "CT-5555" } });
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.stormtroopers.find({ nickname: "Fives" });
{ "_id" : ObjectId("6364545059a03896b63f19be"), "name" : "CT-5555", "nickname" : "Fives", "divisions" : [ "Coruscant Guard" ], "patent" : "Soldier" }
```

- Utilizamos o operador `$set` para que o MongoDB entendesse que queremos atualizar um dos campos desse documento, e não ele todo. Senão, ele iria apagar todos os outros e apenas manter o que enviamos.

- Por padrão, o `.update()` não realiza múltiplas operações, o que quer dizer que, caso a query case mais de um registro, apenas o primeiro encontrado é que será atualizado, é como se fosse uma "proteção" contra UPDATE sem WHERE. Porém, se soubermos exatamente o que estamos fazendo, podemos usar o terceiro para dizer que queremos simrealizar um update em vários documentos:

```
> db.stormtroopers.update({}, { $set: { age: 32 }, { multi: 1 } });
```

##### Excluindo registros

- A sintaxe do comando `.remove()` é bem semelhante ao `.find()`, por aceitar um argumento que fará uma busca nos registros. Informamos a query como primeiro argumento, e o `.remove()` irá apagar todos os registros que atenderem a essa busca do banco de dados. Então, para excluir o Rex pelo apelido(ideal que essa exclusão seja feita pelo id para que não ocorram atualizações equivocas, tendo em vista que o ObjectId é um valor único por documento), basta:

```
> db.stormtroopers.remove({ nickname: "Rex" });
WriteResult({ "nRemoved" : 1 })
```

- Outra forma de apagar registros é utilizar o método `.drop()`. A diferença é que o `.remove()` mantém os índices e as constrains (índice único) e pode ser aplicado a um documento, alguns ou todos, enquanto o `.drop()` limpa toda a collection, removendo os registros e os índices.

```
> db.stormtroopers.drop();
```

##### Excluindo registros

- Ao instalar o MongoDB, outros dois pares de executáveis também ficam disponíveis, são eles: `mongoexport/mongoimport` e `mongodump/mongorestore`. A forma de uso é muito simples, podemos salvar os dados em arquivos utilizando o `mongoexport`:

```
> mongoexport -d livro_nodejs -c stormtroopers > mongodb.json
```

- E podemos usar o `mongoimport` para importar esses arquivo:

```
> mongoexport -d livro_nodejs -c stormtroopers --drop < mongodb.json
```

- Utilizamos a flag `--drop` para limpar a collection do servidor e aceitar apenas dados do arquivo. Caso seja necessário fazer uma importação incremental, não usaremos a flag `--drop`.

#### 4.1.2 mongoist

- Usando o módulo mongoist com NodeJS:

```
$ npm i mongoist
```

- Após instalado, importamos a lib e conectamos no servidor do banco de dados;

``` JS
const mongoist = require("mongoist");
const db = mongoist("mongodb://localhost:27017/livro_nodejs");
```

- A sintaxe de conexão é:

``` 
mongodb://<usuario>:<senha>@<servidor>:<porta>/<database>
?replicaSet=<nome do replica set>
```

- Como estamos conectando em localhost, não há usuário, senha, nem replicaSet. Vamos criar um arquivo que insere soldados na base e, para isso, basta chamar a função `.insert`, como fizemos quando estávamos conectados no mongo shell:

``` JS
// arquivo mongo-create.js

const mongoist = require("mongoist");
const db = mongoist("mongodb://0.0.0.0:27017/livro_nodejs");

const data = {
  "name" : "CT-5555",
  "nickname" : "Fives",
  "divisions" : [ "Coruscant Guard" ],
  "patent" : "Soldier"
}

db.stormtroopers.insert(data)
  .then(result => {
    console.log(result);
    process.exit();
  });
```

**Obs.:** Devido a atualização do NodeJS a uri no seguinte formato `mongodb://localhost:27017/livro_nodejs` está dando erro, buscando mais informações na internet encontrei que substituindo o localhost por `0.0.0.0` volta a funcionar.

- Podemos notar que `db.stormtroopers.insert()` retorna uma promise, por isso encadeamos um `.then` para poder imprimir o resultado da execução. Invocamos o método `process.exit()` para liberar o terminal, avisando que o nosso script encerrou:

```
$ node mongo-create.js 
{
  name: 'CT-5555',
  nickname: 'Fives',
  divisions: [ 'Coruscant Guard' ],
  patent: 'Soldier',
  _id: 6367091dca7bae1ed8699205
}
```

- Agora fazermos outro arquivo para recuperar o que está gravado no banco:

``` JS
// arquivo mongo-retrieve.js

const mongoist = require("mongoist");
const db = mongoist("mongodb://localhost:27017/livro_nodejs");

db.stormtroopers.find()
  .then(result => {
    console.log(result);
    process.exit();
  })
```

- É bem parecido, mas agora usamos a função `.find()`. 

```
node mongo-retrieve.js 
[
  {
    _id: 6364511d59a03896b63f19bc,
    name: 'CT-1010',
    nickname: 'Fox',
    divisions: [ '501st Legion', 'Coruscant Guard' ],
    patent: 'Commander'
  },
  {
    _id: 6364545059a03896b63f19bd,
    name: 'CT-1020',
    nickname: 'Hardcase',
    divisions: [ '501st Legion' ],
    patent: 'Soldier'
  }
]
```

O retorno vem dentro de colchetes, pois o método `.find()` pode retornar uma lista de documentos, a depender da query.

### 4.3 Banco de dados - Redis

O armazenamento de dados na memória open source usado por milhões de desenvolvedores como banco de dados, cache, mecanismo de streaming e agente de mensagens.

#### 4.3.1 Modelagem

Não fazemos queries complexas no Redis, apenas basicamente retornamos valores dada uma certa chave exata, então a modelagem dos valores pode ser qualquer coisa, desde valores simples até objetos.

- Após instalar o servidor do Redis, para subir o servidor iremos executar o comando seguinte:

```
$ redis-server
```

- E para se conectar no Redis rodaremos o comando seguinte:

```
$ redis-cli
127.0.0.1:6379>
```

- O comando `keys` lista as chaves existentes:

```
127.0.0.1:6379> keys *
 1) "queues"
 2) "queue:default"
 3) "cron_jobs"
```

- Para criar uma chave com um valor usaremos o comando `set`:

```
127.0.0.1:6379> set obi-wan "Não há emoção, há a paz."
OK
```

- Podemos sobrescrever o valores de uma chave apenas setando-a novamente:

```
127.0.0.1:6379> set obi-wan "A emoção, ainda a paz. A ignorância, ainda o conhecimento."
OK
```

- É possível realizar uma busca por chaves:

```
127.0.0.1:6379> keys obi*
1) "obi-wan"
```

Porém não é possível realizar busca pelos valores, por isso que não dizemos que o Redis é um Banco de Dados.

- Outro recurso muito util é o TTL(Time to Live), em que escolhemos determinado tempo em que uma chave deve existir, após certo tempo ela simplesmente desaparece (o Redis se encarregad e apagá-la). Usamos o comando `set` e depois `expire` para dizer quantos segundos aquela chavae deve permanecer, e dpois o comando `ttl` para ver quanto tempo de vida ainda resta:

```
127.0.0.1:6379> set a-ameaca-fantasma "Episode I"
OK

127.0.0.1:6379> expire a-ameaca-fantasma 327
(integer) 1

127.0.0.1:6379> ttl a-ameaca-fantasma
(integer) 274
```

Uma vez expirado o tempo daquela chave, o retorno é -2.

- Com o comando `info`, é possível ter uma rápida ideia do que está acontecendo com os recursos do servidor:

```
info memory
# Memory
used_memory:865256
used_memory_human:844.98K
used_memory_rss:12587008
used_memory_rss_human:12.00M
used_memory_peak:865256
...
```

Para uma boa performace de leitura, é indicado que a máquina na qual o Redis será instalado tenha memória RAM suficiente para comportar todos os dados que você pretende armazenar nele.

#### 4.3.2 node-redis

- Em nossas aplicações NodeJS, é bem comum utilizar o Redis para cache ou para guardar a sessão dos usuários. Usando o módulo node-redis:

```
$ npm i redis
```

- Podemos conectar no servidor do Redis e inserir a nossa chave:

``` JS
// arquivo redis-create.js

const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  host: "localhost",
  port: 6379
});

const setAsync = promisify(client.set).bind(client);

setAsync("jedi-code", "Nao ha emocao, ha a paz. Nao ha ignorancia, ha conhecimento. Nao ha paixao, ha serenidade.Nao ha caos, ha harmonia. Nao ha morte, ha a Forca.")
  .then(result => {
    console.log(result)
    process.exit()
  })
```

- Executando:

```
$ node redis-create.js
OK
```

- E agora, para conferir o que foi inscrito no Redis:

``` JS
// arquivo redis-retrieve.js

const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  host: "localhost",
  port: 6379
});

const getAsync = promisify(client.get).bind(client);

getAsync("jedi-code")
  .then(result => {
    console.log(result)
    process.exit()
  })
```

- Executando:

```
$ node redis-retrieve
Nao ha emocao, ha a paz. Nao ha ignorancia, ha conhecimento. Nao ha paixao, ha serenidade.Nao ha caos, ha harmonia. Nao ha morte, ha a Forca.
```

Usamos o método `promisify` do módulo útil do core do NodeJS para trabalhar com promises em vez de callbacks.