import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

/*
Esse trecho foi para o arquivo routes/index.js

app.get("/", (req, res) => {
  res.send("Olá!");
});

app.use((request, response, next) => {
  if (request.url ===  "/favicon.icon") {
    response.writeHead(200, { "Content-Type": "image/x-icon" });
    response.end("");
  } else {
    next();
  }
});
*/

app.use((request, response, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, request, response, next) => {
  if (err.status !== 404) console.log(err.stack);
  response.status(err.status || 500).json({ err: err.mensage });
});

app.use((request, response, next) => {
  response.header("Acess-Control-Allow-Origin", "*");
  response.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.listen(3000);
app.listen(3000, () => {
  console.log("Acesse http://localhost, o app está rodando na porta 3000...");
});