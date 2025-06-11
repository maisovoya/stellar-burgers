import reducer, { fetchUserOrders } from './ordersSlice';

describe('ordersSlice', () => {
  it('должен загружать пользовательские заказы', () => {
    const orders = [{ number: 1 }];
    const action = { type: fetchUserOrders.fulfilled.type, payload: orders };
    const state = reducer(undefined, action);
    expect(state.personalOrders).toEqual(orders);
  });

  it('должен устанавливать ошибку при неудаче', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = reducer(undefined, action);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
