const Model = require("./model");

const addChat = (chat) => {
  const myChat = new Model(chat);
  return myChat.save();
};

const listChats = (userId) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (userId) {
      filter = {
        users: userId,
      };
    }
    Model.find(filter)
      .populate("users")
      .exec()
      .then((populated) => {
        resolve(populated);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = {
  add: addChat,
  list: listChats,
};
