import express, { response } from "express";
const app = express();

app.get(";", (req, res) => {
  res.send("Olá!");
});

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
  if (request.url ===  '/favicon.icon') {

  }
});

// app.listen(3000);
app.listen(3000, () => {
  console.log("Acesse http://localhost, o app está rodando na porta 3000...");
});