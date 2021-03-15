require("dotenv").config();
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
// const middlewares = jsonServer.defaults();
const express = require("express");
let port = process.env.PORT;
const server = express();
const isDev = process.env.NODE_ENV !== "production";

if (isDev) {
  server.use(cors());
  port = "3001";
}

if (!isDev) {
  // Priority serve any static files.
  server.use(express.static(path.resolve(__dirname, "../../build")));
}

// Answer API requests.
// server.use(middlewares);
server.use(
  "/api",
  jsonServer.defaults(),
  jsonServer.router(path.join(__dirname, "db.json"))
);

if (!isDev) {
  // All remaining requests return the React app, so it can handle routing.
  server.get("*", function (req: any, res: any) {
    res.sendFile(path.join(__dirname, "../../build", "index.html"));
  });
}

server.listen(port);
