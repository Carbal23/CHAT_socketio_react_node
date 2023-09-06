const store = require("../chat/store");

const addChat = (users) => {
  if (!users || !Array.isArray(users)) {
    return Promise.reject("Usuarios invalido");
  }
  const chat = {
    users,
  };

  return store.add(chat);
};

const listChats = (userId)=>{
    return store.list(userId)

};

module.exports = {
    addChat,
    listChats,
}