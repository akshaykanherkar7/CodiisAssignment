const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const { connection } = require("./Config/config");
const UserController = require("./Controllers/User.controller");
const PlanController = require("./Controllers/Plan.controller");
const BuyedPlanController = require("./Controllers/BuyedPlan.controller");

app.get("/", async (req, res) => {
  return res.status(200).send("HomePage");
});

app.use("/user", UserController);
app.use("/plan", PlanController);
app.use("/buyedplan", BuyedPlanController);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connection established");
  } catch (err) {
    console.log(err);
  }
  console.log("server listening on port " + process.env.PORT);
});
