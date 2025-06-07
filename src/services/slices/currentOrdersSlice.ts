import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TcurrentOrdersState = {
  liveOrders: TOrder[];
  totalCompleted: number;
  completedToday: number;
  isLoading: boolean;
  fetchError: string | null;
};

export const initialState: TcurrentOrdersState = {
  liveOrders: [],
  totalCompleted: 0,
  completedToday: 0,
  isLoading: false,
  fetchError: null
};

export const fetchCurrentOrders = createAsyncThunk('currentOrders/fetchAll', getFeedsApi);
export const currentOrdersSlice = createSlice({
  name: 'currentOrders',
  initialState,
  reducers: {},
  selectors: {
    selectLiveOrdersState: (state: any) => state
  },
  extraReducers: (builder: { addCase: (arg0: any, arg1: (state: any) => void) => { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): void; new(): any; }; }; new(): any; }; }; }) => {
    builder
      .addCase(fetchCurrentOrders.pending, (state: { isLoading: boolean; fetchError: null; }) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchCurrentOrders.rejected, (state: { isLoading: boolean; fetchError: string; }, action: { error: { message: string; }; }) => {
        state.isLoading = false;
        state.fetchError = action.error.message as string;
      })
      .addCase(fetchCurrentOrders.fulfilled, (state: { isLoading: boolean; fetchError: null; liveOrders: any; totalCompleted: any; completedToday: any; }, action: { payload: { orders: any; total: any; totalToday: any; }; }) => {
        state.isLoading = false;
        state.fetchError = null;
        state.liveOrders = action.payload.orders;
        state.totalCompleted = action.payload.total;
        state.completedToday = action.payload.totalToday;
      });
  }
});
export const { selectLiveOrdersState } = currentOrdersSlice.selectors;
export default currentOrdersSlice.reducer;