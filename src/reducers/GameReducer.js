import ACTIONS from 'warcaby/actions';
import Game from 'warcaby/classes/Game';

let GameReducer = function(state = {}, action){
  switch(action.type){
    case ACTIONS.GAME.INIT_GAME:
      return Object.assign({}, state, { ...action.data });

    case ACIONS.GAME.ACTIVATE_SOLDIER:
      return Object.assign({}, state, { soldiers: action.soldiers });

  }

  return state;
};

export default GameReducer;
