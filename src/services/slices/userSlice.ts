import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi, TRegisterData } from '@api';
import { TUser } from '@utils-types';


export type TUserState = {
  currentUser: TUser | null;
  isLoading: boolean;
  error: string | null;
};


export const initialState: TUserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};


export const fetchCurrentUser = createAsyncThunk('user/fetchUser', getUserApi);

export const updateAccountInfo = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to load user';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(updateAccountInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAccountInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to update user';
      })
      .addCase(updateAccountInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
      });
  },
});

export const { clearUserData } = userSlice.actions;


import type { RootState } from '../store'; 

export const selectAccountState = (state: RootState) => state.user;

export default userSlice.reducer;
