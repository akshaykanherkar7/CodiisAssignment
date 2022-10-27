const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserController = express.Router();

const UserModel = require("../Models/User.model");
const Userregisterlogger = require("../Middlewares/Userregisterlogger");
const Userloginlogger = require("../Middlewares/Userloginlogger");
UserController.post("/register", Userregisterlogger, async (req, res) => {
  const { fname, lname, email, phone, role, password } = req.body;

  // const user = await UserModel.findOne({ email: email, phone: phone });
  // console.log("user:", user);
  // if (user) {
  //   return res.status(200).send("User Allready Exist");
  // }
  await bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.status(500).send("Error in Password hash calculation");
    }
    try {
      const user = new UserModel({
        fname,
        lname,
        email,
        phone,
        role,
        password: hash,
      });
      await user.save();
      return res
        .status(200)
        .send({ message: "Registration successfull", user: user });
    } catch (err) {
      console.log("err:", err);
      res.status(300).send({ message: "User Allready Exist", err: err });
    }
  });
});

UserController.post("/login", Userloginlogger, async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  // console.log("user:", user);
  if (!user) {
    return res.status(501).send("Login Failed, User Not Found!");
  }
  const hashed_password = user.password;
  await bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
      return res.status(500).send("Error in Password hash calculation");
    }
    if (result) {
      return res.status(200).send({ message: "Login Success", data: user });
    } else {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
  });
});

module.exports = UserController;
