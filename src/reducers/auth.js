import jwt from 'jsonwebtoken';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from '../constants';


const store = {
  isAuth: false,
  isLoading: false,
  token: null,
};

function parseToken(token) {
  try {
    return {
      raw: token,
      payload: jwt.decode(token),
    };
  } catch (e) {
    return null;
  }
}

const auth = (state = store, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isAuth: false, isLoading: true };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        token: parseToken(action.payload.token),
      };
    case SIGN_IN_FAIL:
      return { ...state, isLoading: false };
    case SIGN_OUT:
      return { ...state, isAuth: false, isLoading: false };
    default:
      return state;
  }
};

export default auth;
