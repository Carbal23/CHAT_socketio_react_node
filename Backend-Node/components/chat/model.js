const mongoose = require("mongoose");

const schema = mongoose.Schema;

const chatSchema = new schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Model = mongoose.model("Chat", chatSchema);
module.exports = Model;
