import store from './store';
import { addItem } from './slices/burgerCreationSlice';

describe('Redux Store', () => {
  it('должен инициализироваться корректно', () => {
    const state = store.getState();
    expect(state).toHaveProperty('burgerCreation');
    expect(state).toHaveProperty('inventory');
    expect(state).toHaveProperty('currentOrders');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('orderSearch');
  });

  it('должен обрабатывать экшены', () => {
    const previous =
      store.getState().burgerCreation.creationData.filling.length;

    const fakeIngredient = {
      _id: '123',
      name: 'Test Ingredient',
      type: 'main',
      price: 100,
      image: '',
      image_large: '',
      image_mobile: '',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100
    };

    store.dispatch(addItem(fakeIngredient));
    const next = store.getState().burgerCreation.creationData.filling.length;

    expect(next).toBe(previous + 1);
  });
});
