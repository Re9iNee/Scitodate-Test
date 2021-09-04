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

router.get("/:id", (req, res) => {
  // return author with the id of :id
});

module.exports = router;
