const express = require("express");
const formidable = require("formidable");
const router = express.Router();

// Process Data
const { processData } = require("../app");

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
    await processData(filePath);
    res
      .status(200)
      .json({ fields, files, message: "uploading file to database" });
  });
});

module.exports = router;
