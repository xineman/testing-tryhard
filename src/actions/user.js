import { NotificationManager } from 'react-notifications';
import api from '../api';
import {
  SET_USER,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
} from '../constants';


export const getUser = () => (dispatch, getState) => {
  dispatch({ type: SET_USER });

  api.getUserData({ token: getState().auth.token.raw })
    .then(data => dispatch({
      type: SET_USER_SUCCESS,
      payload: data,
    }))
    .catch(() => {
      NotificationManager.error('Could not get user', 'Error', 3000);
      dispatch({ type: SET_USER_FAIL });
    });
};

export const test = 0;

