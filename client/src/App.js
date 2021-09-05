import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Authors from "./components/Authors";
import Home from "./components/Home";
import Author from "./components/Author";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/authors/:authorId">
            <Author />
          </Route>
          <Route path="/authors">
            <Authors />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
