import reducer, {
    initialState,
    accountLogin,
    accountLogout,
    accountRegister
  } from './userSlice';
  
  describe('userSlice', () => {
    it('should set login as successful', () => {
      const action = { type: accountLogin.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state.isLoggedIn).toBe(true);
    });
  
    it('should reset user on logout', () => {
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
  
    it('should save error on failed registration', () => {
      const action = {
        type: accountRegister.rejected.type,
        error: { message: 'Ошибка' }
      };
      const state = reducer(initialState, action);
      expect(state.authError).toBe('Ошибка');
    });
  });