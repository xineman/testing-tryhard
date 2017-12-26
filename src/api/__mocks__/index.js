export const getRecentTrades = jest.fn();

getRecentTrades
  .mockReturnValueOnce(Promise.resolve('getRecentTrades'))
  .mockReturnValueOnce(Promise.reject('getRecentTrades'));

export default {
  getRecentTrades,
};
