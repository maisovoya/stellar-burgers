import reducer, {
    addItem,
    removeItem,
    moveItemUp,
    moveItemDown,
    clearOrderDetails,
    initialState,
    TBurgerCreationState
  } from './burgerCreationSlice';
  import { TConstructorIngredient } from '@utils-types';
  
  describe('burgerCreationSlice', () => {
    const bunIngredient: TConstructorIngredient = {
      _id: '123',
      name: 'Test Bun',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 500,
      image: '',
      image_mobile: '',
      image_large: '',
      id: 'bun-1'
    };
  
    const mainIngredient: TConstructorIngredient = {
      ...bunIngredient,
      type: 'main',
      id: 'main-1'
    };
  
    it('adds bun correctly', () => {
      const state = reducer(initialState, addItem(bunIngredient));
      expect(state.creationData.selectedBun?._id).toBe('123');
    });
  
    it('adds main ingredient correctly', () => {
      const state = reducer(initialState, addItem(mainIngredient));
      expect(state.creationData.filling).toHaveLength(1);
      expect(state.creationData.filling[0]._id).toBe('123');
    });
  
    it('removes item by id', () => {
      const filledState: TBurgerCreationState = {
        ...initialState,
        creationData: {
          selectedBun: null,
          filling: [mainIngredient]
        },
        ordering: false,
        orderDetails: null,
        error: null,
        loading: false
      };
      const state = reducer(filledState, removeItem('main-1'));
      expect(state.creationData.filling).toHaveLength(0);
    });
  
    it('moves item down', () => {
      const itemA = { ...mainIngredient, id: 'a' };
      const itemB = { ...mainIngredient, id: 'b' };
      const preState: TBurgerCreationState = {
        ...initialState,
        creationData: {
          selectedBun: null,
          filling: [itemA, itemB]
        },
        ordering: false,
        orderDetails: null,
        error: null,
        loading: false
      };
      const state = reducer(preState, moveItemDown(0));
      expect(state.creationData.filling[1].id).toBe('a');
    });
  
    it('moves item up', () => {
      const itemA = { ...mainIngredient, id: 'a' };
      const itemB = { ...mainIngredient, id: 'b' };
      const preState: TBurgerCreationState = {
        ...initialState,
        creationData: {
          selectedBun: null,
          filling: [itemA, itemB]
        },
        ordering: false,
        orderDetails: null,
        error: null,
        loading: false
      };
      const state = reducer(preState, moveItemUp(1));
      expect(state.creationData.filling[0].id).toBe('b');
    });
  
    it('clears order details', () => {
      const modifiedState: TBurgerCreationState = {
        ...initialState,
        orderDetails: {
          _id: 'order1',
          number: 123,
          status: 'done',
          name: 'Test Order',
          createdAt: '',
          updatedAt: '',
          ingredients: []
        }
      };
      const state = reducer(modifiedState, clearOrderDetails());
      expect(state.orderDetails).toBeNull();
    });
  });