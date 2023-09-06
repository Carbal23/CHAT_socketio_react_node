const express = require("express");
const http = require("http");
// const { Server } = require("socket.io");
const cors = require("cors");
const config = require("./config");

const app = express();
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

const bodyParser = require("body-parser");
const socket = require("./socket");
const routes = require("./network/routes");
const db = require("./db");

app.use(cors());
db(config.dbUrl);
app.use(bodyParser.json());
routes(app);

// io.on("connection", (socket) => {
//   console.log("usuario conectado");
//   socket.on("message", "hola desde el backend");
// });
socket.connect(server);

app.use(config.publicRoute, express.static("public"));

server.listen(config.port, () => {
  console.log(
    `La aplicacion esta escuchando el el puerto ${config.host}:${config.port}`
  );
});
