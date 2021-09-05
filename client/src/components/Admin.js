import React from "react";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }
  handleFileChange = (ev) => {
    if (
      ev.target.files.length &&
      ev.target.files[0].type === "application/json"
    ) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };
  render() {
    return (
      <form
        action="/database"
        encType="multipart/form-data"
        method="post"
        className="container"
        onSubmit={this.submit}
      >
        <h1>Upload your data file</h1>
        <p className="small-p text-secondary subhead">
          you can upload your .json file here.
        </p>
        <div className="input-container medium-p">
          File:{" "}
          <input type="file" name="dataFile" onChange={this.handleFileChange} />
        </div>
        <input
          id="uploadBtn"
          className="large-p"
          type="submit"
          value="Upload"
          disabled={this.state.disabled}
        />
      </form>
    );
  }
}
