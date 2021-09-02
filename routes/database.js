const express = require("express");
const formidable = require("formidable");
const router = express.Router();

router.post("/", (req, res) => {
  // TODO: use Paths module to define uploadDir
  // recommended: max file size: 2mb
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    // maxFileSize: 2 * 1024 * 1024,
    uploadDir: "./uploads",
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log("error", err);
      return;
    }
    res.status(200).json({ fields, files });
  });
});

module.exports = router;
