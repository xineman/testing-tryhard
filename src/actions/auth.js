import { NotificationManager } from 'react-notifications';
import api from '../api';
import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from '../constants';


export const login = credentials => (dispatch) => {
  dispatch({ type: SIGN_IN });

  return api.login(credentials)
    .then(({ token }) => dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { token },
    }))
    .catch(() => {
      NotificationManager.error('Could not login', 'Error', 3000);
      dispatch({ type: SIGN_IN_FAIL });
    });
};

export const logout = () => dispatch => dispatch({ type: SIGN_OUT });
