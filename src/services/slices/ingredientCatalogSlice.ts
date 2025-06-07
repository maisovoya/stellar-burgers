import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngredientCatalogState = {
  inventoryItems: TIngredient[];
  isLoading: boolean;
  fetchError: string | null;
};

export const initialState: TIngredientCatalogState = {
  inventoryItems: [],
  isLoading: false,
  fetchError: null
};

export const fetchInventory = createAsyncThunk(
  'inventory/fetchAll',
  getIngredientsApi
);

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder: { addCase: (arg0: any, arg1: (state: any) => void) => { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): void; new(): any; }; }; new(): any; }; }; }) => {
    builder
      .addCase(fetchInventory.pending, (state: { isLoading: boolean; fetchError: null; }) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchInventory.rejected, (state: { isLoading: boolean; fetchError: any; }, action: { error: { message: string; }; }) => {
        state.isLoading = false;
        state.fetchError = action.error.message ?? 'Failed to fetch inventory';
      })
      .addCase(fetchInventory.fulfilled, (state: { isLoading: boolean; fetchError: null; inventoryItems: any; }, action: { payload: any; }) => {
        state.isLoading = false;
        state.fetchError = null;
        state.inventoryItems = action.payload;
      });
  }
});

export const selectInventoryState = (state: { inventory: TIngredientCatalogState }) => state.inventory;

export default inventorySlice.reducer;
