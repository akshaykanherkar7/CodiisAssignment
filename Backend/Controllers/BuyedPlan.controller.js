const express = require("express");
const BuyedPlanController = express.Router();

const BuyedPlanModel = require("../Models/BuyedPlan.model");

BuyedPlanController.post("/", async (req, res) => {
  const { plan, admin } = req.body;
  const newBuyedPlan = new BuyedPlanModel({
    plan,
    admin,
  });
  await newBuyedPlan.save();
  return res
    .status(200)
    .send({ message: "Plan Successfully Saved", BuyedPlan: newBuyedPlan });
});

BuyedPlanController.get("/", async (req, res) => {
  let BuyedPlans = await BuyedPlanModel.find();
  return res.status(200).send(BuyedPlans);
});
BuyedPlanController.get("/:id", async (req, res) => {
  let BuyedPlans = await BuyedPlanModel.findOne({
    _id: req.params.id,
  }).populate("plan");
  return res.status(200).send(BuyedPlans);
});

BuyedPlanController.patch("/:id", async (req, res) => {
  const updated_BuyedPlan = await BuyedPlanModel.findOneAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).send({
    message: "BuyedPlan updated successfully",
    project: updated_BuyedPlan,
  });
});

BuyedPlanController.delete("/:id", async (req, res) => {
  const deleted_BuyedPlan = await BuyedPlanModel.findOneAndDelete(
    { _id: id },
    { new: true }
  );
  return res.status(200).send({
    message: "BuyedPlan deleted successfully",
    project: deleted_BuyedPlan,
  });
});

module.exports = BuyedPlanController;
