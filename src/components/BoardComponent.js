import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldComponent from 'warcaby/components/FieldComponent';
import Game from 'warcaby/classes/Game';

class BoardComponent extends Component {
  constructor(props){
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
      this.state.board && this.state.board.map(this.renderRow)
    )
  }

  updateItems(props, oldProps){
    if(props.move === 'black' && this.state.move === 'white'){
      Game.makeComputerMove(props.board, props.soldiers);
    }

    this.setState({
      board: props.board,
      move: props.move
    });
  }

  componentDidMount() {
    this.updateItems(this.props);
  }

  componentWillReceiveProps(nextProps, oldProps) {
    this.updateItems(nextProps, oldProps);
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
    board: store.gameState.board,
    move: store.gameState.move,
    soldiers: store.gameState.soldiers
  };
}

export default connect(mapStateToProps)(BoardComponent);
