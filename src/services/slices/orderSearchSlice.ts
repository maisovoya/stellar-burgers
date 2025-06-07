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

export const initialState: TOrderSearchState = {
  allOrders: [],
  orderDetails: null,
  isFetching: false,
  rawResponse: null,
  fetchError: null
};

export const fetchOrderDetails = createAsyncThunk(
  'orderSearch/fetchByNumber',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

export const orderSearchSlice = createSlice({
  name: 'orderSearch',
  initialState,
  reducers: {},
  selectors: {
    selectOrderSearchState: (state: any) => state
  },
  extraReducers: (builder: { addCase: (arg0: any, arg1: (state: any) => void) => { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): void; new(): any; }; }; new(): any; }; }; }) => {
    builder
      .addCase(fetchOrderDetails.pending, (state: { fetchError: null; isFetching: boolean; }) => {
        state.fetchError = null;
        state.isFetching = true;
      })
      .addCase(fetchOrderDetails.rejected, (state: { fetchError: string; isFetching: boolean; }, action: { error: { message: string; }; }) => {
        state.fetchError = action.error.message as string;
        state.isFetching = false;
      })
      .addCase(fetchOrderDetails.fulfilled, (state: { fetchError: null; isFetching: boolean; orderDetails: any; }, action: { payload: { orders: any[]; }; }) => {
        state.fetchError = null;
        state.isFetching = false;
        state.orderDetails = action.payload.orders[0];
      });
  }
});

export const { selectOrderSearchState } = orderSearchSlice.selectors;
export default orderSearchSlice.reducer;
