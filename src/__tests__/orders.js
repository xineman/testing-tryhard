import jwt from 'jsonwebtoken';
import * as constants from '../constants';
import * as selectors from '../selectors';
import store from '../store';


describe('store', () => {
  describe('orders', () => {
    const mockOrders = [
      { createdBy: 'me', type: 'sell' },
      { createdBy: 'he', type: 'sell' },
      { createdBy: 'me', type: 'buy' },
      { createdBy: 'he', type: 'sell' },
      { createdBy: 'he', type: 'buy' },
    ];

    beforeEach(() => {
      store.dispatch({
        type: constants.ORDERS_GET_ALL_FULFILLED,
        payload: mockOrders,
      });
      store.dispatch({
        type: constants.SIGN_IN_SUCCESS,
        payload: {
          token: jwt.sign({ distId: 'me' }, 'secret'),
        },
      });
    });

    it('getAllOrder', () =>
      expect(selectors.getAllOrders(store.getState()))
        .toEqual(mockOrders));
    it('getAllBuyOrders', () =>
      expect(selectors.getActiveBuyOrders(store.getState()))
        .toEqual(mockOrders.filter(o => o.status === 'active' && o.type === 'buy')));
    it('getAllSellOrders', () =>
      expect(selectors.getActiveSellOrders(store.getState()))
        .toEqual(mockOrders.filter(o => o.status === 'active' && o.type === 'sell')));

    it('getMyOrders', () =>
      expect(selectors.getMyOrders(store.getState()))
        .toEqual(mockOrders.filter(o => o.createdBy === 'me')));
    it('getMyBuyOrders', () =>
      expect(selectors.getMyBuyOrders(store.getState()))
        .toEqual(mockOrders.filter(o => o.type === 'buy' && o.createdBy === 'me')));
    it('getMySellOrders', () =>
      expect(selectors.getMySellOrders(store.getState()))
        .toEqual(mockOrders.filter(o => o.type === 'sell' && o.createdBy === 'me')));

    it(constants.ORDERS_GET_ALL, () => {
      store.dispatch({
        type: constants.ORDERS_GET_ALL,
      });

      expect(selectors.getAllOrders(store.getState())).toEqual([]);
    });
    it(constants.ORDERS_GET_ALL_FULFILLED, () => {
      const payload = Math.random();

      store.dispatch({
        type: constants.ORDERS_GET_ALL_FULFILLED,
        payload,
      });

      expect(selectors.getAllOrders(store.getState())).toEqual(payload);
    });
    it(constants.ORDERS_GET_ALL_PENDING, () => {
      store.dispatch({
        type: constants.ORDERS_GET_ALL_PENDING,
      });

      expect(selectors.getAllOrders(store.getState())).toEqual(mockOrders);
    });
    it(constants.ORDERS_GET_ALL_REJECTED, () => {
      store.dispatch({
        type: constants.ORDERS_GET_ALL_REJECTED,
      });

      expect(selectors.getAllOrders(store.getState())).toEqual(mockOrders);
    });
  });
});
