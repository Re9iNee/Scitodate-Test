const express = require("express");
const formidable = require("formidable");
const router = express.Router();

// Process Data
const { processData } = require("../app");

// TODO: get route (send uploaded file information)

router.post("/", (req, res) => {
  // TODO: if uploads/ directory doesn't exist make one
  // TODO: use Paths module to define uploadDir
  // recommended: max file size: 2mb
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    // maxFileSize: 2 * 1024 * 1024,
    uploadDir: "./uploads",
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("error parsing form: ", err);
      return;
    }
    const file = files.dataFile;
    const filePath = file.path;
    try {
      await processData(filePath);
      res
        .status(200)
        .json({
          response:
            "Thank you for uploading data, go to localhost:3000/Authors/ ",
          fileInfo: file,
          message: "uploading file to database",
        });
    } catch (err) {
      console.log("error while inserting to database: ", err, " make sure your json file is VALID.");
      res.status(400).json({ msg: "Couldn't process data file", error: err });
    }
  });
});

module.exports = router;
