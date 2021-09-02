const express = require("express");
const app = express();

// Best to set a file limit on it express.json({limit: '1mb'})
app.use(express.json());

require("dotenv").config();

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.get("/", (req, res) => {
  res.send("ITS OK MAN");
});

// Import Routes
const databaseRoute = require("./routes/database");
app.use("/database", databaseRoute);
