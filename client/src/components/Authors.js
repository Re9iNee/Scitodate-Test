import React from "react";

export default class Authors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      searchTerm: "",
    };
  }
  // NOTE: i feel better to use callback api, fetch data in getDerivedStateFromProps - but since our application is not a CRUD App, there won't be any component updates.
  componentDidMount() {
    this.loadAllAuthors()
      .then((res) => this.setState({ authors: res.slice() }))
      .catch((err) => console.log(err));
  }

  loadAllAuthors = async () => {
    const response = await fetch("/author");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(
        `Loading all Authors, status code: ${response.status}, ${response.statusText}`
      );
    }
    return body;
  };

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <h5>List of All Authors here</h5>
        <input
          type="text"
          placeholder="search through Authors"
          onChange={(event) =>
            this.setState({ searchTerm: event.target.value })
          }
        />
        <ul>
          {/* Render all authors */}
          {this.state.authors
            .filter((val) => {
              // query items (using searchbar)
              if (this.state.searchTerm === "") {
                return val;
              } else if (
                val.name
                  .toLowerCase()
                  .includes(this.state.searchTerm.toLowerCase())
              ) {
                return val;
              } else {
                return false;
              }
            })
            .map((author) => {
              return (
                <li key={author._id}>
                  <a href={"/Authors/" + author._id}>{author.name}</a>
                  <pre>{author.affiliation}</pre>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
