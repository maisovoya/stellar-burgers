import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi, TRegisterData } from '@api';
import { TUser } from '@utils-types';

type TUserState = {
  currentUser: TUser | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TUserState = {
  currentUser: null,
  isLoading: false,
  error: null
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to load user';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(updateAccountInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      });
  }
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
