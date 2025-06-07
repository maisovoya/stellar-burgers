import { orderBurgerApi } from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TburgerCreationState = {
  loading: boolean;
  creationData: {
    selectedBun: TConstructorIngredient | null;
    filling: TConstructorIngredient[];
  };
  ordering: boolean;
  orderDetails: TOrder | null;
  error: string | null;
};

export const initialState: TburgerCreationState = {
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
      reducer: (state: { creationData: { selectedBun: any; filling: any[]; }; }, action: PayloadAction<TConstructorIngredient>) => {
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
    removeItem: (state: { builderData: { filling: any[]; }; }, action: PayloadAction<string>) => {
      state.builderData.filling = state.builderData.filling.filter((item: { id: any; }) => item.id !== action.payload);
    },
    moveItemUp: (state: { builderData: { filling: TConstructorIngredient[]; }; }, action: PayloadAction<number>) => {
      moveItem(state.builderData.filling, action.payload, action.payload - 1);
    },
    moveItemDown: (state: { builderData: { filling: TConstructorIngredient[]; }; }, action: PayloadAction<number>) => {
      moveItem(state.builderData.filling, action.payload, action.payload + 1);
    },
    clearOrderDetails: (state: { orderDetails: null; }) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder: { addCase: (arg0: any, arg1: (state: any) => void) => { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new(): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): void; new(): any; }; }; new(): any; }; }; }) => {
    builder
      .addCase(submitBurgerOrder.pending, (state: { loading: boolean; ordering: boolean; error: null; }) => {
        state.loading = true;
        state.ordering = true;
        state.error = null;
      })
      .addCase(submitBurgerOrder.rejected, (state: { loading: boolean; ordering: boolean; error: any; }, action: { error: { message: string; }; }) => {
        state.loading = false;
        state.ordering = false;
        state.error = action.error.message ?? 'Order failed';
      })
      .addCase(submitBurgerOrder.fulfilled, (state: { loading: boolean; ordering: boolean; error: null; orderDetails: any; builderData: { selectedBun: null; filling: never[]; }; }, action: { payload: { order: any; }; }) => {
        state.loading = false;
        state.ordering = false;
        state.error = null;
        state.orderDetails = action.payload.order;
        state.builderData = {
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

export const selectBurgerBuilder = (state: { burgerBuilder: TburgerCreationState }) => state.burgerBuilder;

export default burgerCreationSlice.reducer;
