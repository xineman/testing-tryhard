import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from '../constants';


const defaultStore = {
  isAuth: false,
  isLoading: false,
  token: null,
};

const auth = (state = defaultStore, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isAuth: false, isLoading: true };
    case SIGN_IN_SUCCESS:
      return {
        isAuth: true,
        isLoading: false,
        ...action.payload,
      };
    case SIGN_IN_FAIL:
      return { ...state, isLoading: false };
    case SIGN_OUT:
      return defaultStore;
    default:
      return state;
  }
};

export default auth;
