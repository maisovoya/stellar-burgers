import reducer, { fetchCurrentOrders } from './currentOrdersSlice';

describe('currentOrdersSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'undefined' }).isLoading).toBe(false);
  });

  it('should set loading on pending', () => {
    const action = { type: fetchCurrentOrders.pending.type };
    const state = reducer(undefined, action);
    expect(state.isLoading).toBe(true);
  });

  it('should set data on fulfilled', () => {
    const orders = [{ number: 1 }];
    const action = {
      type: fetchCurrentOrders.fulfilled.type,
      payload: { orders, total: 100, totalToday: 10 }
    };
    const state = reducer(undefined, action);
    expect(state.currentOrders).toEqual(orders);
  });
});