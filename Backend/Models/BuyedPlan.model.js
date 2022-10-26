const mongoose = require("mongoose");

const BuyedPlanSchema = new mongoose.Schema({
  //   name: { type: String, require: true },
  //   price: { type: Number, required: true },
  //   months: { type: Number, required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "plan" },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "commonuser" },
});

const BuyedPlanModel = mongoose.model("buyedplan", BuyedPlanSchema);
module.exports = BuyedPlanModel;
