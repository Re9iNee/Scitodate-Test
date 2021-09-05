import React from "react";

export default class Scientist extends React.Component {
  render() {
    return (
      <li>
        <a href={"/Authors/" + this.props.author._id}>{this.props.author.name}</a>
        <pre>{this.props.author.affiliation}</pre>
      </li>
    );
  }
}
