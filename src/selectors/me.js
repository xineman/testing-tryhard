import { createSelector } from 'reselect';


function getToken(store) {
  return store.auth.token;
}
function getUaerAttrs(store) {
  return store.user.data || {};
}
const getPayload = createSelector(
  [getToken],
  token => token && token.payload,
);


export const getUser = createSelector(
  [getUaerAttrs, getPayload],
  (attrs, payload) => ({
    ...(payload || {}),
    ...(attrs || {}),
  }),
);
export const getUserId = createSelector(
  [getPayload],
  payload => payload && payload.distId,
);
export const getWallet = createSelector(
  [getPayload],
  data => data && data.wallet,
);
export const getRawToken = createSelector(
  [getToken],
  token => token && token.raw,
);

export const getSubscribedBalance = createSelector(
  [getUser],
  user => user.subscribed,
);
