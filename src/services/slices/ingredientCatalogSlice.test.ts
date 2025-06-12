import reducer, { fetchInventory } from './ingredientCatalogSlice';

describe('ingredientCatalogSlice', () => {
  it('должен обновлять инвентарь при успешной загрузке', () => {
    const ingredients = [{ _id: '1', name: 'Булка' }];
    const action = {
      type: fetchInventory.fulfilled.type,
      payload: ingredients
    };
    const state = reducer(undefined, action);
    expect(state.inventoryItems).toEqual(ingredients);
  });

  it('должен обрабатывать ошибку загрузки', () => {
    const action = {
      type: fetchInventory.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = reducer(undefined, action);
    expect(state.fetchError).toBe('Ошибка загрузки');
  });
});
