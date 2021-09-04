import React from "react";
import { withRouter } from "react-router-dom";

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.authorId,
    };
  }
  render() {
    return (
      <div>
        <h1>Scientist Name, with the ID of {this.state.id}</h1>
        <h3>Affilitaion</h3>
        <ul>
          <li>Paper Titles Sorted By Published Date</li>
        </ul>
        <h3>Co Authors:</h3>
        <ul>
          <li>
            <a href="/authors/4">Co-Authors #1</a>
          </li>
        </ul>
      </div>
    );
  }
}

const AuthorWithRouter = withRouter(Author);
export default AuthorWithRouter;
