import * as actions from '../actions';
import * as constants from '../constants';
import * as selectors from '../selectors/index';
import store from '../store';


jest.mock('../api');


describe('store/trades', () => {
  const mockTrades = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];

  beforeEach(() => {
    store.dispatch({
      type: constants.TRADES_GET_RECENT_FULFILLED,
      payload: mockTrades,
    });
  });

  it('getRecentTrades', () =>
    expect(selectors.getRecentTrades(store.getState()))
      .toEqual(mockTrades));

  it(constants.TRADES_GET_RECENT, () => {
    store.dispatch({
      type: constants.TRADES_GET_RECENT,
    });

    expect(selectors.getRecentTrades(store.getState())).toEqual([]);
  });
  it(constants.TRADES_GET_RECENT_FULFILLED, () => {
    const payload = Math.random();

    store.dispatch({
      type: constants.TRADES_GET_RECENT_FULFILLED,
      payload,
    });

    expect(selectors.getRecentTrades(store.getState())).toEqual(payload);
  });
  it(constants.TRADES_GET_RECENT_PENDING, () => {
    store.dispatch({
      type: constants.TRADES_GET_RECENT_PENDING,
    });

    expect(selectors.getRecentTrades(store.getState())).toEqual(mockTrades);
  });
  it(constants.TRADES_GET_RECENT_REJECTED, () => {
    store.dispatch({
      type: constants.TRADES_GET_RECENT_REJECTED,
    });

    expect(selectors.getRecentTrades(store.getState())).toEqual(mockTrades);
  });

  it('fetchRecentTrades', async () => {
    const thunk = actions.fetchRecentTrades();
    expect(typeof thunk).toEqual('function');

    const dispatch = jest.fn();
    thunk(dispatch);
    thunk(dispatch);

    await new Promise(resolve => setTimeout(resolve, 10));
    expect(dispatch).toBeCalledWith({ type: constants.TRADES_GET_RECENT });
    expect(dispatch).toBeCalledWith({ type: constants.TRADES_GET_RECENT_PENDING });
    expect(dispatch).toBeCalledWith({ type: constants.TRADES_GET_RECENT_FULFILLED, payload: 'getRecentTrades' });
    expect(dispatch).toBeCalledWith({ type: constants.TRADES_GET_RECENT_REJECTED });
  });
});
