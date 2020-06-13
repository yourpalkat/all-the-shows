import React from 'react';
import './App.css';
import AllShows from './components/AllShows';
import AddShow from './components/AddShow';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Testing Apollo Client.
        </p>
        <AllShows />
      </header>
      <AddShow />
    </div>
  );
}

export default App;
