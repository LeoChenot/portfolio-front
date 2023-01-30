import { SET_STATE_GLOBAL } from '../actions/global';

const initialState = {
  currentUrl: '',
  currentTitle: '',
  headerRef: undefined,
};

const globalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE_GLOBAL: {
      return {
        ...state,
        [action.state]: action.value,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default globalReducer;
