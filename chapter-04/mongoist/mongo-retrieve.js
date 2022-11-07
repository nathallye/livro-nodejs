// arquivo mongo-retrieve.js

const mongoist = require("mongoist");
const db = mongoist("mongodb://0.0.0.0:27017/livro_nodejs");

db.stormtroopers.find()
  .then(result => {
    console.log(result);
    process.exit();
  })