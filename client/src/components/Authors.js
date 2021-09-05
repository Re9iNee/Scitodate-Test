import React from "react";
import Scientist from "./Scientist";

export default class Authors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      searchTerm: "",
    };
  }

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
            // query items (using searchbar)
            .filter(
              (val) =>
                this.state.searchTerm === "" ||
                val.name
                  .toLowerCase()
                  .includes(this.state.searchTerm.toLowerCase())
            )
            .map((author) => {
              return (
                <Scientist author={author} />
              );
            })}
        </ul>
      </div>
    );
  }
}
