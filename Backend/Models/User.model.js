const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("commonuser", userSchema);

module.exports = UserModel;
