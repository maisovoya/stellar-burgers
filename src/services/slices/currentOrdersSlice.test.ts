import reducer, { fetchCurrentOrders } from './currentOrdersSlice';

describe('currentOrdersSlice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' }).isLoading).toBe(false);
  });

  it('должен устанавливать загрузку при pending', () => {
    const action = { type: fetchCurrentOrders.pending.type };
    const state = reducer(undefined, action);
    expect(state.isLoading).toBe(true);
  });

  it('должен устанавливать данные при fulfilled', () => {
    const orders = [{ number: 1 }];
    const action = {
      type: fetchCurrentOrders.fulfilled.type,
      payload: { orders, total: 100, totalToday: 10 }
    };
    const state = reducer(undefined, action);
    expect(state.currentOrders).toEqual(orders);
  });
});
