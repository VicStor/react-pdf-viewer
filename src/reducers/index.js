import { combineReducers } from 'redux';

import docReducer from './docs_reducer';

const rootReducer = combineReducers({
  docs: docReducer
});

export default rootReducer;
