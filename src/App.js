import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'warcaby/reducers';
import BoardComponent from 'warcaby/components/BoardComponent';
import Game from 'warcaby/classes/Game';

import './App.css';

class App extends Component {
  constructor (){
    super();
    new Game();
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
