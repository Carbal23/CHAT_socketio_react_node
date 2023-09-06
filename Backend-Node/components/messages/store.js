const Model = require("./model");

const addMessage = async (message) => {
  const msg = new Model(message);
  await msg.save();
};

const getMessage = (filterChat) => {
  return new Promise(async (resolve, reject) => {
    let filter = {};
    if (filterChat) {
      filter = { chat: filterChat };
    }
    await Model.find(filter)
      .populate("user")
      .exec()
      .then((populated) => {
        resolve(populated);
      })
      .catch((e) => {
        return reject("get error message ", e);
      });
  });
};

const updateText = async (id, msg) => {
  const message = await Model.findOne({
    _id: id,
  });
  message.msg = msg;
  const newMessage = await message.save();
  return newMessage;
};

const removeMessage = (id) => {
  return Model.deleteOne({
    _id: id,
  });
};

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText,
  remove: removeMessage,
};
