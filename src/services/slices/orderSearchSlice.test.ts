import reducer, { fetchOrderDetails } from './orderSearchSlice';

describe('orderSearchSlice', () => {
  it('должен сохранять детали заказа при успехе', () => {
    const order = { number: 123 };
    const action = {
      type: fetchOrderDetails.fulfilled.type,
      payload: { orders: [order] }
    };
    const state = reducer(undefined, action);
    expect(state.orderDetails).toEqual(order);
  });

  it('должен устанавливать флаг загрузки при pending', () => {
    const action = { type: fetchOrderDetails.pending.type };
    const state = reducer(undefined, action);
    expect(state.isFetching).toBe(true);
  });
});
