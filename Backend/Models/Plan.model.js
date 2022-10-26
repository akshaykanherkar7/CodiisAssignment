const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, required: true },
  months: { type: Number, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "commonuser" },
});

const PlanModel = mongoose.model("plan", PlanSchema);
module.exports = PlanModel;