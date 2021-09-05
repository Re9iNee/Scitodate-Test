import React from "react";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome Home!</h1>
        <p>
          You can head over to: <a href="/admin">Admin area</a> to upload data
          file.
        </p>
        <p>
          or <a href="/authors">See all authors list</a>
        </p>
      </div>
    );
  }
}
