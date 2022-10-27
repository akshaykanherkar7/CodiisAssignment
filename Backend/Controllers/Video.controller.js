const express = require("express");
const VideoController = express.Router();

const VideoModel = require("../Models/Video.model");

VideoController.post("/", async (req, res) => {
  const { title, video, category, plan } = req.body;
  const newVideo = new VideoModel({
    title,
    video,
    category,
    plan,
  });
  await newVideo.save();
  return res
    .status(200)
    .send({ message: "Plan Successfully Saved", video: newVideo });
});

VideoController.get("/", async (req, res) => {
  let videos = await VideoModel.find();
  return res.status(200).send(videos);
});

module.exports = VideoController;
