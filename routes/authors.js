const express = require("express");
const router = express.Router();
const Authors = require("../models/authors");

router.get("/", async (req, res) => {
  // return all authors
  try {
    const result = await Authors.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ msg: "failed", error: err });
  }
});

router.get("/:id", async (req, res) => {
  // return author with the id of :id
  try {
    const result = await Authors.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ msg: "failed", error: err });
  }
});

module.exports = router;
