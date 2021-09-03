import React from "react";

export default class Scientist extends React.Component {
  render() {
    return (
      <div>
        <h1>Scientist Name</h1>
        <h3>Affilitaion</h3>
        <ul>
          <li>Paper Titles Sorted By Published Date</li>
        </ul>
        <h3>Co Authors:</h3>
        <ul>
          <li>
            <a href="#">Co-Authors #1</a>
          </li>
        </ul>
      </div>
    );
  }
}
