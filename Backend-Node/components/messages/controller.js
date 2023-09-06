const store = require("./store");
// const { io } = require("../../server");
const config = require("../../config");
const {socket} = require("../../socket");

const addMessage = (chat, user, msg, file) => {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !msg) {
      console.error("[msg controller] No hay usuario o mensaje");
      return reject("Los datos son incorrectos");
    }

    let fileUrl = "";
    if (file) {
      fileUrl = `${config.host}:${config.port}${config.publicRoute}/${config.filesRoute}/${file.filename}`;
    }
    const fullMessage = {
      chat,
      user,
      msg,
      file: fileUrl,
      date: new Date(),
    };
    store.add(fullMessage);

    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
};

const getMessages = (filterChat) => {
  return new Promise((resolve, reject) => {
    store
      .list(filterChat)
      .then((messagesList) => {
        socket.io.emit("messageList", messagesList);
        resolve(messagesList);
      })
      .catch((error) => {
        console.error("hubo un error al obtener los mensajes", error);
        reject(error);
      });
  });
};

const updateMessage = (id, msg) => {
  return new Promise(async (resolve, reject) => {
    if (!id || !msg) {
      return reject("invalid date");
    }
    const result = await store.updateText(id, msg);
    resolve(result);
  });
};

const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject("Id invalido");
    }
    store
      .remove(id)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
