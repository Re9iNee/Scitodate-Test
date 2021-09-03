import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function Admin() {
  return <pre>This is Admin Area</pre>
}
function Authors() {
  return <pre>This is Authors List</pre>
}
function Home() {
  return <pre>This is Home? </pre>
}

export default App;
