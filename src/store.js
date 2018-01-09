import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { get, set } from './services/localStorage';


const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const state = {
  auth: {
    ...(get('auth') || {
      isAuth: false,
    }),
    isLoading: false,
  },
};

const store = createStore(
  reducers,
  state,
  applyMiddleware(...middlewares),
);

store.subscribe(() => {
  set('auth', store.getState().auth);
});

export default store;
