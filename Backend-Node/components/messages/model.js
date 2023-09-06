const mongoose = require("mongoose");

const schema = mongoose.Schema;

const messageSchema = new schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  msg: {
    type: String,
    require: true,
  },
  date: Date,
  file: String,
});

const Model = mongoose.model("Message", messageSchema);
module.exports = Model;
