import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'warcaby/reducers';
import ACTIONS from 'warcaby/actions';

import Helper from 'warcaby/classes/Helper';
import Game from 'warcaby/classes/Game';

class SoldierComponent extends Component {
  activateSoldier(soldier) {
    let player = this.props.player;
    if(!player.myMove || soldier.color !== player.color) return;

    soldier.active = true;

    store.dispatch({
      type: ACTIONS.GAME.ACTIVATE_SOLDIER,
      data: {
        soldier: Game.generateNewSoldiers(this.props.soldiers)
      }
    })
  }

  render() {
    let x = this.props.field.row,  y = this.props.field.column;
    let soldier = this.props.soldiers[`${x}_${y}`];

    let classes = Helper.classes({
      'soldier': soldier !== undefined,
      'black': soldier && soldier.color === 'black',
      'active': soldier && soldier.active
    });

    return (
      <div className={classes} onClick={()=> this.activateSoldier(soldier) }>
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
