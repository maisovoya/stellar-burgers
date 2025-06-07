import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TRegisterData, TLoginData, loginUserApi, registerUserApi, logoutApi } from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

type TAuthState = {
  authError: string | null;
  authResponse: TUser | null;
  hasCheckedAuth: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isLoading: boolean;
};

export const initialState: TAuthState = {
  authError: null,
  authResponse: null,
  hasCheckedAuth: false,
  isLoggedIn: false,
  isLoggingIn: false,
  isLoading: false,
};

export const registerAccount = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginAccount = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const result = await loginUserApi({ email, password });
    if (result.success) {
      setCookie('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
    }
    return result;
  }
);

export const logoutAccount = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAccount.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
        state.hasCheckedAuth = true;
        state.isLoggedIn = false;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.error.message as string;
        state.hasCheckedAuth = false;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authResponse = action.payload.user;
        state.authError = null;
        state.hasCheckedAuth = false;
        state.isLoggedIn = true;
      })
      .addCase(loginAccount.pending, (state) => {
        state.isLoggingIn = true;
        state.authError = null;
        state.hasCheckedAuth = true;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.authError = action.error.message as string;
        state.hasCheckedAuth = false;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authError = null;
        state.authResponse = action.payload.user;
        state.isLoggedIn = true;
        state.hasCheckedAuth = false;
      })
      .addCase(logoutAccount.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.authError = null;
        state.authResponse = null;
        state.hasCheckedAuth = false;
      });
  }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
