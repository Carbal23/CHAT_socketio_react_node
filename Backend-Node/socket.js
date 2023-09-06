const {Server} = require("socket.io");
const socket = {}

const connect = (server) => {
  socket.io = new Server(server,{
    cors: {
      origin: "*"
    }
  });
};

module.exports = {
  socket,
  connect,
};
