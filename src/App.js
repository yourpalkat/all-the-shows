import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllShows from './components/AllShows';
import AddShow from './components/AddShow';
import Signup from './components/Signup';

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
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
