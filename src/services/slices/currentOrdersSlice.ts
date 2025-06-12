<<<<<<< HEAD
import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TCurrentOrdersState = {
  totalCompleted: number;
  completedToday: number;
  isLoading: boolean;
  fetchError: string | null;
  currentOrders: TOrder[];
};

const initialState: TCurrentOrdersState = {
  totalCompleted: 0,
  completedToday: 0,
  isLoading: false,
  fetchError: null,
  currentOrders: []
};

export const fetchCurrentOrders = createAsyncThunk(
  'fetchOrders/fetchAll',
  getFeedsApi
);

const currentOrdersSlice = createSlice({
  name: 'currentOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message ?? 'Failed to fetch orders';
      })
      .addCase(fetchCurrentOrders.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchCurrentOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchError = null;
        state.currentOrders = action.payload.orders;
        state.totalCompleted = action.payload.total;
        state.completedToday = action.payload.totalToday;
      });
  }
});

export const selectCurrentOrders = (state: {
  currentOrders: TCurrentOrdersState;
}) => state.currentOrders;

export default currentOrdersSlice.reducer;
=======
import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TCurrentOrdersState = {
  totalCompleted: number;
  completedToday: number;
  isLoading: boolean;
  fetchError: string | null;
  currentOrders: TOrder[];
};

const initialState: TCurrentOrdersState = {
  totalCompleted: 0,
  completedToday: 0,
  isLoading: false,
  fetchError: null,
  currentOrders: []
};

export const fetchCurrentOrders = createAsyncThunk(
  'fetchOrders/fetchAll',
  getFeedsApi
);

const currentOrdersSlice = createSlice({
  name: 'currentOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message ?? 'Failed to fetch orders';
      })
      .addCase(fetchCurrentOrders.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchCurrentOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchError = null;
        state.currentOrders = action.payload.orders;
        state.totalCompleted = action.payload.total;
        state.completedToday = action.payload.totalToday;
      });
  }
});

export const selectCurrentOrders = (state: {
  currentOrders: TCurrentOrdersState;
}) => state.currentOrders;

export default currentOrdersSlice.reducer;
>>>>>>> review-an
