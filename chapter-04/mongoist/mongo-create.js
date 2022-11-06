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
