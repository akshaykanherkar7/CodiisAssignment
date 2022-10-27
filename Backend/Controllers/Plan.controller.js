const express = require("express");
const PlanController = express.Router();

const PlanModel = require("../Models/Plan.model");

PlanController.post("/", async (req, res) => {
  const { name, price, months, admin } = req.body;
  const newPlan = new PlanModel({
    name,
    price,
    months,
    admin,
  });
  await newPlan.save();
  return res
    .status(200)
    .send({ message: "Plan Successfully Saved", plan: newPlan });
});

PlanController.get("/", async (req, res) => {
  let plans = await PlanModel.find();
  return res.status(200).send(plans);
});
PlanController.get("/:id", async (req, res) => {
  let plans = await PlanModel.findOne({ _id: req.params.id }).populate("admin");
  return res.status(200).send(plans);
});

PlanController.patch("/:id", async (req, res) => {
  const updated_plan = await PlanModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).send({
    message: "Plan updated successfully",
    updated_plan: updated_plan,
  });
});

PlanController.delete("/:id", async (req, res) => {
  const deleted_plan = await PlanModel.findOneAndDelete(
    { _id: req.params.id },
    { new: true }
  );
  return res.status(200).send({
    message: "Plan deleted successfully",
    deleted_plan: deleted_plan,
  });
});

module.exports = PlanController;
