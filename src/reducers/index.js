import { createStore, combineReducers } from 'redux';

import GameReducer from './GameReducer';

// Combine Reducers
const reducers = combineReducers({
  gameState: GameReducer
});

const store = createStore(reducers);

export default store;
