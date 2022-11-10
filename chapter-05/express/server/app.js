import express from "express";
const app = express();

app.get(";", (req, res) => {
  res.send("Olá!");
});

// app.listen(3000);
app.listen(3000, () => {
  console.log("Acesse http://localhost, o app está rodando na porta 3000...");
});