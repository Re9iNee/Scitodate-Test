const { readFileSync } = require("fs");
const Authors = require("./models/authors");
const Papers = require("./models/papers");
const { nanoid } = require("nanoid");

async function processData(path) {
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
  try {
    const resp = await Authors.insertMany([...allAuthors], {
      ordered: false,
    });
    console.log("Inserting Authors: ", resp);
  } catch (err) {
    console.log("Inserting Authors: ", err);
  }

  // NOTE: is there a way to find in Authors locally? cause we would upload once. without any modifications to Authors Papers, and we would do that locally
  // Process Papers
  let allPapers = new Array();
  for (let data of datas) {
    let authIDs = new Array();
    for (let author of data.authors) {
      authIDs.push(author._id);
    }

    // Generate newId
    const paperId = nanoid();
    //   Assign this paper to Authors
    for (let AuthId of authIDs) {
      try {
        const resp = await Authors.findByIdAndUpdate(AuthId, {
          $push: { papers: `${paperId}` },
        }).exec();
        console.log("Updating Authors: ", resp);
      } catch (err) {
        console.log("Updating Authors: ", err);
      }
    }
    const newPaper = new Papers({
      _id: paperId,
      date: data.date,
      topic_scores: [...data.topic_scores],
      topics: [...data.topics],
      abstract: data.abstract,
      title: data.title,
      authors: [...authIDs],
    });
    allPapers.push(newPaper);
  }
  //   Save to DB
  try {
    const resp = await Papers.insertMany([...allPapers], { ordered: false });
    console.log("Inserting Papers: ", resp);
  } catch (err) {
    console.log("Inserting Papers: ", err);
  }
}

module.exports = { processData };
