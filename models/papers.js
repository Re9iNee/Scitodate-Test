const mongoose = require("mongoose");

const PapersSchema = mongoose.Schema({
  _id: {
    Type: String,
    required: true,
  },
  date: Date,
  topic_scores: [Number],
  topics: [String],
  title: String,
  abstract: String,
  authors: [mongoose.Types.ObjectId],
});

module.exports = mongoose.model("Papers", PapersSchema);
