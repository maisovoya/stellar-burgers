import { orderBurgerApi } from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TBurgerCreationState = {
  loading: boolean;
  creationData: {
    selectedBun: TConstructorIngredient | null;
    filling: TConstructorIngredient[];
  };
  ordering: boolean;
  orderDetails: TOrder | null;
  error: string | null;
};

export const initialState: TBurgerCreationState = {
  loading: false,
  creationData: {
    selectedBun: null,
    filling: []
  },
  ordering: false,
  orderDetails: null,
  error: null
};

export const submitBurgerOrder = createAsyncThunk(
  'burger/submitOrder',
  async (ingredientIds: string[]) => orderBurgerApi(ingredientIds)
);

const moveItem = (array: TConstructorIngredient[], from: number, to: number) => {
  if (to < 0 || to >= array.length) return;
  const item = array.splice(from, 1)[0];
  array.splice(to, 0, item);
};

export const burgerCreationSlice = createSlice({
  name: 'burgerCreation',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.creationData.selectedBun = action.payload;
        } else {
          state.creationData.filling.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.creationData.filling = state.creationData.filling.filter(item => item.id !== action.payload);
    },
    moveItemUp: (state, action: PayloadAction<number>) => {
      moveItem(state.creationData.filling, action.payload, action.payload - 1);
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      moveItem(state.creationData.filling, action.payload, action.payload + 1);
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(submitBurgerOrder.pending, (state) => {
        state.loading = true;
        state.ordering = true;
        state.error = null;
      })
      .addCase(submitBurgerOrder.rejected, (state, action) => {
        state.loading = false;
        state.ordering = false;
        state.error = action.error.message ?? 'Order failed';
      })
      .addCase(submitBurgerOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.ordering = false;
        state.error = null;
        state.orderDetails = action.payload.order;
        state.creationData = {
          selectedBun: null,
          filling: []
        };
      });
  }
});

export const {
  addItem,
  removeItem,
  moveItemUp,
  moveItemDown,
  clearOrderDetails
} = burgerCreationSlice.actions;

export const selectBurgerBuilder = (state: { burgerCreation: TBurgerCreationState }) => state.burgerCreation;

export default burgerCreationSlice.reducer;
