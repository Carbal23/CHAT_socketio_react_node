const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    require: true,
  },
});

const Model = mongoose.model("User", userSchema);
module.exports = Model;
