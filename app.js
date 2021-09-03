const { readFileSync } = require("fs");
const Authors = require("./models/authors");

function processData(path) {
  const datas = JSON.parse(readFileSync(path, { encoding: "utf-8" }));

  let allAuthors = new Array();

  // TODO: AddAuthor() function
  //   Loop through all datas
  for (let data of datas) {
    //   Gather all authorsIDs for this paper
    let authIDs = new Array();
    for (let author of data.authors) {
      authIDs.push(author._id);
    }
    for (let author of data.authors) {
      // Filter IDs
      const coAuthIDs = authIDs.filter((x) => x !== author._id);
      // Create a new model
      const newAuth = new Authors({
        _id: author._id,
        name: author.name,
        email: author.email || "",
        affiliation: author.affiliation,
        coAuthors: [...coAuthIDs],
      });
      //   Push to an Array of Models (sending all together instead of one by one)
      allAuthors.push(newAuth);
    }
  }
  //   TODO: remove duplicates from allAuthors. (currently handled by mongoDB)
  //   Save to DB
  Authors.insertMany([...allAuthors], { ordered: false })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => console.log("myError  ", err));
}

module.exports = { processData };
