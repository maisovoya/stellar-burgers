import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TOrdersState = {
  personalOrders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TOrdersState = {
  personalOrders: [],
  isLoading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', getOrdersApi);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch orders';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.personalOrders = action.payload;
      });
  }
});



export default ordersSlice.reducer;
