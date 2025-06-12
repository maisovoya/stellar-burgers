import reducer, { fetchOrderDetails } from './orderSearchSlice';

describe('orderSearchSlice', () => {
  it('should save order details on success', () => {
    const order = { number: 123 };
    const action = {
      type: fetchOrderDetails.fulfilled.type,
      payload: { orders: [order] }
    };
    const state = reducer(undefined, action);
    expect(state.orderDetails).toEqual(order);
  });

  it('should set loading flag on pending', () => {
    const action = { type: fetchOrderDetails.pending.type };
    const state = reducer(undefined, action);
    expect(state.isFetching).toBe(true);
  });
});