const mongoose = require("mongoose");

const AuthorsSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  affiliation: String,
  papers: [mongoose.Types.ObjectId],
  coAuthors: [mongoose.Types.ObjectId],
});

module.exports = mongoose.model("Authors", AuthorsSchema);
