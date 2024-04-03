import React from 'react';
import Player from '../src/components/Players/Players'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>D&D Combat Tracker</h1>
      </header>
      <main>
        <Player />
      </main>
    </div>
  );
}

export default App;