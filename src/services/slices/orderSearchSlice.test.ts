import reducer, { fetchOrderDetails } from './orderSearchSlice';

describe('orderSearchSlice', () => {
<<<<<<< HEAD
  it('should save order details on success', () => {
=======
  it('должен сохранять детали заказа при успехе', () => {
>>>>>>> review-an
    const order = { number: 123 };
    const action = {
      type: fetchOrderDetails.fulfilled.type,
      payload: { orders: [order] }
    };
    const state = reducer(undefined, action);
    expect(state.orderDetails).toEqual(order);
  });

<<<<<<< HEAD
  it('should set loading flag on pending', () => {
=======
  it('должен устанавливать флаг загрузки при pending', () => {
>>>>>>> review-an
    const action = { type: fetchOrderDetails.pending.type };
    const state = reducer(undefined, action);
    expect(state.isFetching).toBe(true);
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> review-an
