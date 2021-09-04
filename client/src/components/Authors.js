import React from "react";

export default class Authors extends React.Component {
  render() {
    return (
      <div>
        <h1>Authors</h1>
        <h5>List of All Authors here</h5>
        <input type="text" placeholder="search through Authors" />
        <ul>
          <li>
            <a href="/Authors/2">Wong</a>
            <pre>Affilitaion</pre>
          </li>
          <li>
            <a href="/Authors/3">Wong</a>
            <pre>Affilitaion</pre>
          </li>
        </ul>
      </div>
    );
  }
}
