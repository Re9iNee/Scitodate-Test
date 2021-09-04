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
