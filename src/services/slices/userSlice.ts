import {
  TRegisterData,
  TLoginData,
  getOrdersApi,
  logoutApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  registerUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TStateAccount = {
  currentUser: TUser | null;
  authError: string | null;
  authResponse: TUser | null;
  registrationInfo: TRegisterData | null;
  personalOrders: TOrder[];
  isLoading: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  hasCheckedAuth: boolean;
};

export const initialState: TStateAccount = {
  currentUser: null,
  authError: null,
  registrationInfo: null,
  authResponse: null,
  isLoading: false,
  hasCheckedAuth: false,
  isLoggedIn: false,
  isLoggingIn: false,
  personalOrders: []
};

export const accountLogin = createAsyncThunk(
  'account/login',
  async ({ email, password }: TLoginData, thunkAPI) => {
    const result = await loginUserApi({ email, password });

    if (!result.success) {
      return thunkAPI.rejectWithValue(result);
    }

    // Сохраняем токены
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    // Загрузка текущего пользователя
    const userRes = await getUserApi();

    if (userRes.success) {
      // Обновляем Redux
      thunkAPI.dispatch(setUser(userRes.user));
    }

    return result;
  }
);

export const accountRegister = createAsyncThunk(
  'account/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const currentUserFetch = createAsyncThunk(
  'account/fetchUser',
  getUserApi
);

export const accountUpdateInfo = createAsyncThunk(
  'account/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const userOrdersFetch = createAsyncThunk(
  'account/fetchOrders',
  getOrdersApi
);

export const accountLogout = createAsyncThunk('account/logout', async () => {
  await logoutApi(); // ждём успешного завершения логаута на сервере
  localStorage.clear();
  deleteCookie('accessToken');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.currentUser = null;
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
    setUser: (state, action: { payload: TUser }) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.hasCheckedAuth = false;
    }
  },
  selectors: {
    selectAccountState: (state) => state,
    selectAuthError: (state) => state.authError
  },
  extraReducers: (builder) => {
    builder
      .addCase(accountRegister.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.hasCheckedAuth = false;
        state.isLoading = false;
      })
      .addCase(accountRegister.fulfilled, (state, action) => {
        state.hasCheckedAuth = false;
        state.currentUser = action.payload.user;
        state.authError = null;
        state.authResponse = action.payload.user;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(accountRegister.pending, (state) => {
        state.hasCheckedAuth = true;
        state.authError = null;
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(accountLogin.pending, (state) => {
        state.isLoggedIn = false;
        state.authError = null;
        state.isLoggingIn = true;
        state.hasCheckedAuth = true;
      })
      .addCase(accountLogin.rejected, (state, action) => {
        state.hasCheckedAuth = false;
        state.authError = action.error.message as string;
        state.isLoggingIn = false;
      })
      .addCase(accountLogout.pending, (state) => {
        state.isLoading = true;
        state.hasCheckedAuth = true;
        state.authError = null;
        state.isLoggedIn = true;
      })
      .addCase(accountLogin.fulfilled, (state) => {
        state.isLoggingIn = false;
        state.isLoggedIn = true;
        state.authError = null;
      })
      .addCase(currentUserFetch.rejected, (state) => {
        state.isLoggingIn = false;
        state.isLoggedIn = false;
        state.hasCheckedAuth = false;
      })
      .addCase(currentUserFetch.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.currentUser = action.payload.user;
        state.hasCheckedAuth = false;
        state.isLoggedIn = true;
      })
      .addCase(accountUpdateInfo.pending, (state) => {
        state.authError = null;
        state.isLoading = true;
      })
      .addCase(currentUserFetch.pending, (state) => {
        state.isLoggingIn = true;
        state.hasCheckedAuth = true;
        state.isLoggedIn = true;
      })
      .addCase(accountUpdateInfo.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(accountUpdateInfo.fulfilled, (state, action) => {
        state.authError = null;
        state.isLoading = false;
        state.authResponse = action.payload.user;
        state.currentUser = action.payload.user;
      })

      .addCase(accountLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.hasCheckedAuth = false;
        state.isLoggedIn = true;
        state.authError = action.error.message as string;
      })
      .addCase(accountLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.hasCheckedAuth = false;
        state.currentUser = null;
        state.authError = null;
      })
      .addCase(userOrdersFetch.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.error.message as string;
      })
      .addCase(userOrdersFetch.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(userOrdersFetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authError = null;
        state.personalOrders = action.payload;
      });
  }
});

export const { clearUserData, clearAuthError, setUser } = userSlice.actions;
export const { selectAccountState, selectAuthError } = userSlice.selectors;
export default userSlice.reducer;
