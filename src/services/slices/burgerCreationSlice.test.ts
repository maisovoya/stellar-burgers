import burgerReducer, {
  initialState,
  addItem,
  removeItem,
  moveItemUp,
  moveItemDown
} from './burgerCreationSlice';
import { TConstructorIngredient } from '@utils-types';

const mockIngredient: TConstructorIngredient = {
  _id: 'x',
  id: 'x',
  name: 'Котлета',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 200,
  image: 'image.jpg',
  image_mobile: 'image_mobile.jpg',
  image_large: 'image_large.jpg'
};

describe('burgerCreationSlice', () => {
  it('должен добавлять булку', () => {
    const bun = { id: '1', type: 'bun', name: 'Булка' } as any;
    const state = burgerReducer(initialState, addItem(bun));
    expect(state.creationData.selectedBun?.name).toBe('Булка');
  });

  it('должен добавлять ингредиент', () => {
    const ingredient = { id: '2', type: 'main', name: 'Котлета' } as any;
    const state = burgerReducer(initialState, addItem(ingredient));
    expect(state.creationData.filling.length).toBe(1);
  });

  it('должен удалять ингредиент', () => {
    const startState = {
      ...initialState,
      creationData: { selectedBun: null, filling: [mockIngredient] }
    };

    const state = burgerReducer(startState, removeItem('x'));
    expect(state.creationData.filling.length).toBe(0);
  });
});
