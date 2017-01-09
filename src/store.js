import { createStore, applyMiddleware, compose } from 'redux';

import { createEpicMiddleware } from 'redux-observable';
import { fetchDocs } from './actions/docs_actions';

import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware(fetchDocs);
const middlewares = applyMiddleware(epicMiddleware);
// const initialState = global.__INITIAL_STATE__;

const store = createStore(
  rootReducer,
  {},
  compose(middlewares, global.devToolsExtension ? global.devToolsExtension() : f => f)
);

export default store;
