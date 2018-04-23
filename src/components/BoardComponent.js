import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'warcaby/reducers';

import FieldComponent from 'warcaby/components/FieldComponent';

import Game from 'warcaby/classes/Game';

class BoardComponent extends Component {
  constructor(){
    super();
    this.state = {}
  }

  renderRow(row, index) {
    return (
      <div className="row" key={index}>
        {row.map( (field) => <FieldComponent field={field} key={field.id}/>)}
      </div>
    )
  }
  
  renderBoard() {
    return (
      this.props.board && this.props.board.map(this.renderRow)
    )
  }

  render() {
    return (
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    board: store.gameState.board
  };
}

export default connect(mapStateToProps)(BoardComponent);
