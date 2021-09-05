const express = require("express");
const router = express.Router();
const Papers = require("../models/papers");

router.get("/", async (req, res) => {
  // return all papers
  try {
    const result = await Papers.find();
    if (!result) {
      throw "something amiss, check server console";
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ msg: "failed", error: err });
  }
});

router.get("/:id", async (req, res) => {
  // return paper with the id of :id
  try {
    const result = await Papers.findById(req.params.id);
    if (!result) {
      throw "couldn't find this author";
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ msg: "failed", error: err });
  }
});

router.get("/author/:authorId", async (req, res) => {
  // return all the papers that :authorId wrote
  try {
    const result = await Papers.find({ authors: req.params.authorId }).sort([['date', 1]]);
    if (!result) {
      throw "couldn't find papers that this authorId wrote ";
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ msg: "failed", error: err });
  }
});

module.exports = router;
