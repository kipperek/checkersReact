import ACTIONS from 'warcaby/actions';

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
      return Object.assign({}, state, { soldiers });

    case ACTIONS.GAME.SHOW_POSSIBLE_MOVES:
      return Object.assign({}, state, { possibleMoves: action.possibleMoves });
  }

  return state;
};

export default GameReducer;
