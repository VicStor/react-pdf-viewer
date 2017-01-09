import {
  REQUEST_DOCS,
  RECEIVE_DOCS
} from '../actions/docs_actions';

const docsSate = {
  isFetching: false,
  docList: []
};

const docReducer = (state = docsSate, { type, docList }) => {
  switch (type) {
    case REQUEST_DOCS: {
      return ({
        ...state,
        isFetching: true
      });
    }
    case RECEIVE_DOCS: {
      return ({
        docList,
        isFetching: false
      });
    }
    default: return state;
  }
};

export default docReducer;
