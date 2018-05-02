import React, { Component } from 'react';
import { connect } from 'react-redux';

import Helper from 'warcaby/classes/Helper';
import Game from 'warcaby/classes/Game';

import SoldierComponent from 'warcaby/components/SoldierComponent.js';

class FieldComponent extends Component {
  constructor(){
    super();
    this.state = {};
  }

  updateItems(props){
    let x = this.props.field.row;
    let y = this.props.field.column;

    this.setState({
      soldiers: this.props.soldiers,
      possibleMove: props.possibleMoves && props.possibleMoves.filter((item) => {
        return item.x === x && item.y === y;
      })[0]
    });
  }

  componentDidMount() {
    this.updateItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateItems(nextProps);
  }

  comonMakeAmoveOnMe(){
    if(!this.state.possibleMove) return;
    Game.makeMove(this.state.possibleMove, this.state.soldiers);
  }

  render() {
    let classes = Helper.classes({
      'possible-move': this.state.possibleMove,
      'field': true,
      'black': this.props.field.isBlack,
    });

    return (
      <div className={classes} onClick={()=>this.comonMakeAmoveOnMe()}>
        <SoldierComponent field={this.props.field} />
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    possibleMoves: store.gameState.possibleMoves,
    soldiers: store.gameState.soldiers
  };
}

export default connect(mapStateToProps)(FieldComponent);
