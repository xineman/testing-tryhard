import {
  SET_USER,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
} from '../constants';

const store = {
  username: '',
  isLoaded: false,
  isLoading: false,
};

const user = (state = store, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, isLoaded: false, isLoading: true };
    case SET_USER_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        ...action.payload,
      };
    case SET_USER_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default user;
