import React from "react";
import { withRouter } from "react-router-dom";

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.authorId,
      author: {},
      papers: [],
      coAuthors: [],
    };
  }

  componentDidMount() {
    this.loadAuthor(this.state.id)
      .then((res) =>
        this.setState({
          author: Object.assign({}, res),
        })
      )
      .catch((err) => console.log(err));
    this.loadPapers(this.state.id)
      .then((res) =>
        this.setState({
          papers: [...res],
        })
      )
      .catch((err) => console.log(err));
    this.loadCoAuthors(this.state.id)
      .then((res) =>
        this.setState({
          coAuthors: [...res],
        })
      )
      .catch((err) => console.log(err));
  }

  loadAuthor = async (id) => {
    const response = await fetch(`/author/${id}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(
        `Loading author ${id} failed, status code ${response.status}, ${response.statusText}`
      );
    }
    return body;
  };

  loadPapers = async (authorId) => {
    const response = await fetch(`/paper/author/${authorId}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(
        `Loading papers failed, status code ${response.status}, ${response.statusText}`
      );
    }
    return body;
  };

  loadCoAuthors = async (authorId) => {
    const response = await fetch(`/author/coAuthors/${authorId}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(
        `Loading CoAuthors failed, status code ${response.status}, ${response.statusText}`
      );
    }
    return body;
  };

  render() {
    const author = Object.assign({}, this.state.author);
    return (
      <div>
        <h1>Scientist {author.name}</h1>
        <h3>{author.affiliation}</h3>
        <ul>
          {this.state.papers.map((paper) => (
            <li key={paper._id}>{paper.title}</li>
          ))}
        </ul>
        <h3>Co Authors:</h3>
        <ul>
          {this.state.coAuthors.map((coAuthor) => (
            <li key={coAuthor._id}>
              <a href={"/Authors/" + coAuthor._id}>{coAuthor.name}</a>
              <pre>{coAuthor.affiliation}</pre>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const AuthorWithRouter = withRouter(Author);
export default AuthorWithRouter;
