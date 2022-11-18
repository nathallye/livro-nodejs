import { Router } from "express";

const routes = new Router;

routes.get("/", (req, res) => {
  res.send("Olá!");
});

routes.use((request, response, next) => {
  response.writeHead(200, { "Content-Type": "image/x-icon" });
  response.end("");
});

export default routes;