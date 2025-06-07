import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

type TOrderSearchState = {
  allOrders: TOrder[];
  orderDetails: TOrder | null;
  isFetching: boolean;
  rawResponse: null;  
  fetchError: string | null;
};

const initialState: TOrderSearchState = {
  allOrders: [],
  orderDetails: null,
  isFetching: false,
  rawResponse: null,
  fetchError: null,
};

export const fetchOrderDetails = createAsyncThunk(
  'orderSearch/fetchByNumber',
  (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

const orderSearchSlice = createSlice({
  name: 'orderSearch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderDetails.pending, state => {
        state.isFetching = true;
        state.fetchError = null;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchError = action.error.message ?? 'Failed to fetch order';
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.isFetching = false;
        state.fetchError = null;
        state.orderDetails = action.payload.orders[0];
      });
  }
});

export const selectOrderSearchState = (state: { orderSearch: TOrderSearchState }) => state.orderSearch;

export default orderSearchSlice.reducer;
