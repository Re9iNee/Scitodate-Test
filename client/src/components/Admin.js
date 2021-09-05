import React from "react";

export default class Admin extends React.Component {
  render() {
    return (
      <form action="/database" enctype="multipart/form-data" method="post">
        <h1>Upload your data file here</h1>
        <pre>.json format</pre>
        <div>
          File: <input type="file" name="dataFile" />
        </div>
        <input type="submit" value="Upload" />
      </form>
    );
  }
}
