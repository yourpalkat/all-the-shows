import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AllShows from './components/AllShows';
import AddShow from './components/AddShow';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AllShows />
        </Route>
        <PrivateRoute path="/add">
          <AddShow />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
