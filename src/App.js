import React, { Component } from 'react';
import BoardComponent from 'warcaby/components/BoardComponent';
import Game from 'warcaby/classes/Game';

import './App.css';

class App extends Component {
  constructor (){
    super();
    Game.initGame();
  }

  render() {
    return (
      <div className="App">
        <BoardComponent />
      </div>
    );
  }
}

export default App;
