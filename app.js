const { readFileSync } = require("fs");
const Authors = require("./models/authors");
const Papers = require("./models/papers");
const { nanoid } = require("nanoid");

async function processData(path) {
  const datas = JSON.parse(readFileSync(path, { encoding: "utf-8" }));

  let allAuthors = new Array();
  let allAuthIDs = new Array();

  //   Loop through all datas
  // Process Authors
  for (let data of datas) {
    //   Gather all authorsIDs for this paper
    let thisPaperAuthIDs = data.authors.map((author) => author._id);
    for (let author of data.authors) {
      // Filter IDs
      const coAuthIDs = thisPaperAuthIDs.filter((x) => x !== author._id);
      let existedAuthIndex = allAuthIDs.indexOf(author._id);
      if (existedAuthIndex > -1) {
        //   Author Exists -> push Co-Auths to the AllAuthors Array
        allAuthors[existedAuthIndex].coAuthors.push(...coAuthIDs);
      } else {
        //   Author Does not exist
        // Creates a new Author
        const newAuth = new Authors({
          _id: author._id,
          name: author.name,
          email: author.email || "",
          affiliation: author.affiliation,
          coAuthors: [...coAuthIDs],
        });
        // save all IDs for Indexing. and avoiding Duplicates.
        allAuthIDs.push(author._id);
        //   Push to an Array of Models. (inserting all together instead of one by one to DB)
        allAuthors.push(newAuth);
      }
    }
  }

  // Process Papers
  let allPapers = new Array();
  for (let data of datas) {
    //   Gather all authorsIDs for this paper
    let thisPaperAuthIDs = data.authors.map((author) => author._id);

    // Generate newId for this paper
    const paperId = nanoid();
    //   Assign this paper to Authors
    // update Authors locally. (assign PaperId to Authors)
    for (let AuthId of thisPaperAuthIDs) {
      let existedAuthorIndex = allAuthIDs.indexOf(AuthId);
      if (existedAuthorIndex > -1) {
        allAuthors[existedAuthorIndex].papers.push(`${paperId}`);
      }
    }

    const newPaper = new Papers({
      _id: paperId,
      date: data.date,
      topic_scores: [...data.topic_scores],
      topics: [...data.topics],
      abstract: data.abstract,
      title: data.title,
      authors: [...thisPaperAuthIDs],
    });
    allPapers.push(newPaper);
  }
  //   Save Authors to DB
  try {
    const resp = await Authors.insertMany([...allAuthors], {
      ordered: false,
    });
    console.log("Inserting Authors: ", resp);
  } catch (err) {
    console.log("Inserting Authors: ", err);
  }

  //   Save Papers to DB
  try {
    const resp = await Papers.insertMany([...allPapers], { ordered: false });
    console.log("Inserting Papers: ", resp);
  } catch (err) {
    console.log("Inserting Papers: ", err);
  }
}

module.exports = { processData };
