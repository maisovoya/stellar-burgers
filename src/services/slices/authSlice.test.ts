import authReducer, {
  initialState,
  clearAuthError,
  registerAccount,
  loginAccount,
  logoutAccount
} from './authSlice';

describe('authSlice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен сбрасывать ошибку авторизации', () => {
    const errorState = { ...initialState, authError: 'Ошибка' };
    expect(authReducer(errorState, clearAuthError())).toEqual(initialState);
  });

  it('должен установить состояние pending при регистрации', () => {
    const action = { type: registerAccount.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('должен установить ошибку при отклонённой регистрации', () => {
    const action = {
      type: registerAccount.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = authReducer(initialState, action);
    expect(state.authError).toBe('Ошибка регистрации');
  });

  it('должен сбрасывать токены при выходе', () => {
    const action = { type: logoutAccount.fulfilled.type };
    const state = authReducer({ ...initialState, isLoggedIn: true }, action);
    expect(state.isLoggedIn).toBe(false);
    expect(state.authResponse).toBeNull();
  });
});
