const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Recommended: express.json({limit: '1mb'})
app.use(express.json());
// if you want to use custom port, change /client/package.json proxy settings. (currently set to http://localhost:5000)
const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.get("/", (req, res) => {
  res.send("ITS OK MAN");
});

// Import Routes
const databaseRoute = require("./routes/database");
app.use("/database", databaseRoute);

const authorRoute = require("./routes/authors");
app.use("/author", authorRoute);

const paperRoutes = require("./routes/papers");
app.use("/paper", paperRoutes);

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("connected to DB!");
});
