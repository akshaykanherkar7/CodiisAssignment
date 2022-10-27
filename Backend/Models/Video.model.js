const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video: { type: String, required: true },
  category: { type: String, required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "plan" },
});

const VideoModel = mongoose.model("video", VideoSchema);

module.exports = VideoModel;
