import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'warcaby/reducers';
import ACTIONS from 'warcaby/actions';

import Helper from 'warcaby/classes/Helper';
// import Game from 'warcaby/classes/Game';
import Soldier from 'warcaby/classes/Soldier';

class SoldierComponent extends Component {
  constructor(){
    super();
    this.state = {};
  }

  updateItems(props){
    let x = this.props.field.row;
    let y = this.props.field.column;

    this.setState({
      soldier: Soldier.find(x, y, props.soldiers),
      player: props.player
    });
  }

  componentDidMount() {
    this.updateItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateItems(nextProps);
  }

  activateSoldier() {
    let soldier = this.state.soldier;
    let player = this.state.player;
    if(!player.myMove || soldier.color !== player.color) return;

    store.dispatch({
      type: ACTIONS.GAME.ACTIVATE_SOLDIER,
      soldier: soldier.id
    });
  }

  render() {
    let soldier = this.state.soldier;
    if(!soldier) return null;

    let classes = Helper.classes({
      'soldier': soldier !== undefined,
      'king': soldier && soldier.isKing,
      'black': soldier && soldier.color === 'black',
      'active': soldier && soldier.active
    });

    return (
      <div className={classes} onClick={()=> this.activateSoldier() }>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    soldiers: store.gameState.soldiers,
    player: store.gameState.player
  };
}

export default connect(mapStateToProps)(SoldierComponent);
