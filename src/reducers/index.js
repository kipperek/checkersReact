import { createStore, combineReducers } from 'redux';

import appReducer from './AppReducer';

// Combine Reducers
const reducers = combineReducers({
  appState: appReducer
});

export const store = createStore(reducers);
