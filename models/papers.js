const mongoose = require("mongoose");

const PapersSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  date: Date,
  topic_scores: [Number],
  topics: [String],
  title: String,
  abstract: String,
  authors: [String],
});

module.exports = mongoose.model("Papers", PapersSchema);
