import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientCatalogState = {
  inventoryItems: TIngredient[];
  isLoading: boolean;
  fetchError: string | null;
};

const initialState: TIngredientCatalogState = {
  inventoryItems: [],
  isLoading: false,
  fetchError: null,
};

export const fetchInventory = createAsyncThunk('inventory/fetchAll', getIngredientsApi);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message ?? 'Failed to fetch inventory';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchError = null;
        state.inventoryItems = action.payload;
      });
  },
});

export const selectInventoryState = (state: { inventory: TIngredientCatalogState }) => state.inventory;

export default inventorySlice.reducer;
