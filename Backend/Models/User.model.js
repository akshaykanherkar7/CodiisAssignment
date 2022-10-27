const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  // username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("commonuser", userSchema);

module.exports = UserModel;
