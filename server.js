const express = require("express");
const app = express();

require('dotenv').config();

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));


app.get('/', (req, res) => {
    res.send("ITS OK MAN")
})
