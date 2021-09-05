import React from "react";

export default class Admin extends React.Component {
  submit = (ev) => {
    // ev.preventDefault();
    // TODO: local validation here
  };
  render() {
    return (
      <form
        action="/database"
        enctype="multipart/form-data"
        method="post"
        className="container"
        onSubmit={this.submit}
      >
        <h1>Upload your data file</h1>
        <p className="large-p text-secondary subhead">.json format</p>
        <div>
          File: <input type="file" name="dataFile" />
        </div>
        <input
          id="uploadBtn"
          className="large-p"
          type="submit"
          value="Upload"
        />
      </form>
    );
  }
}
