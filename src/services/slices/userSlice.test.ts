import reducer, {
  initialState,
  accountLogin,
  accountLogout,
  accountRegister
} from './userSlice';

describe('userSlice', () => {
  it('должен устанавливать логин как успешный', () => {
    const action = { type: accountLogin.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state.isLoggedIn).toBe(true);
  });

  it('должен сбрасывать пользователя при logout', () => {
    const action = { type: accountLogout.fulfilled.type };
    const loggedState = {
      ...initialState,
      isLoggedIn: true,
      currentUser: { email: 'a' } as any
    };
    const state = reducer(loggedState, action);
    expect(state.isLoggedIn).toBe(false);
    expect(state.currentUser).toBeNull();
  });

  it('должен сохранять ошибку при неудачной регистрации', () => {
    const action = {
      type: accountRegister.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = reducer(initialState, action);
    expect(state.authError).toBe('Ошибка');
  });
});
