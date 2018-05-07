import ACTIONS from 'warcaby/actions';
import Game from 'warcaby/classes/Game';

let GameReducer = function(state = {}, action){
  switch(action.type){
    case ACTIONS.GAME.INIT_GAME:
      return Object.assign({}, state, { ...action.data });

    case ACTIONS.GAME.ACTIVATE_SOLDIER:
      let soldiers = state.soldiers.map( (item) => {
        return {
          ...item,
          active: action.soldier === item.id
        }
      });

      let possibleMoves = Game.findPossibleMoves(soldiers, 'white', state.board);
      return Object.assign({}, state, { soldiers, possibleMoves });

    case ACTIONS.GAME.SHOW_POSSIBLE_MOVES:
      return Object.assign({}, state, { possibleMoves: action.possibleMoves, isBeating: action.isBeating });

    case ACTIONS.GAME.REFRESH_SOLDIERS:
      let move = state.move;
      move = action.changeMove ? (move === 'white' ? 'black' : 'white') : move;
      return Object.assign({}, state, { move: move, soldiers: action.soldiers });
  }

  return state;
};

export default GameReducer;
