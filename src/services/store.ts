import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import burgerCreationReducer from './slices/burgerCreationSlice';
import currentOrdersReducer from './slices/currentOrdersSlice';
import ingredientCatalogReducer from './slices/ingredientCatalogSlice';
import orderSearchReducer from './slices/orderSearchSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  orders: ordersReducer,
  burgerCreation: burgerCreationReducer,
  currentOrders: currentOrdersReducer,
  ingredientCatalog: ingredientCatalogReducer,
  orderSearch: orderSearchReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
