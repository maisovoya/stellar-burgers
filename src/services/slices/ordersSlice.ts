import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type TOrdersState = {
  isLoading: boolean;
  error: string | null;
  personalOrders: TOrder[];
};

export const initialState: TOrdersState = {
  isLoading: false,
  error: null,
  personalOrders: []
};

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  getOrdersApi
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch orders';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.personalOrders = action.payload;
      });
  }
});

export const selectOrdersState = (state: RootState) => state.orders;
export default ordersSlice.reducer;
