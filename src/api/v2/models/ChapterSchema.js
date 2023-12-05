const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  name: String,
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
});

module.exports = mongoose.model("Chapter", ChapterSchema);
