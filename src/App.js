import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllShows from './components/AllShows';
import AddShow from './components/AddShow';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AllShows />
        </Route>
        <Route path="/add">
          <AddShow />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
