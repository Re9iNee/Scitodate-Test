import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Authors from "./components/Authors";
import Home from "./components/Home";
import Scientist from "./components/Scientist";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/authors">
            <Authors />
          </Route>
          {/* Temprory Route */}
          <Route path="/scientist">
            <Scientist />
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
