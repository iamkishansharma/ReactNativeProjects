import {IS_AUTHENTICATED, SET_USER} from '../action/action.types';

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  //

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
