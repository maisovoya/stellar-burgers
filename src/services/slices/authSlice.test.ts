import reducer, {
    initialState,
    registerAccount,
    clearAuthError
  } from './authSlice';
  import { TUser } from '@utils-types';
  
  describe('authSlice', () => {
    const fakeUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };
  
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown_action' })).toEqual(
        initialState
      );
    });
  
    it('should handle clearAuthError', () => {
      const errorState = {
        ...initialState,
        authError: 'Some error'
      };
      const newState = reducer(errorState, clearAuthError());
      expect(newState.authError).toBeNull();
    });
  
    it('should handle registerAccount.pending', () => {
      const action = { type: registerAccount.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.authError).toBeNull();
      expect(state.hasCheckedAuth).toBe(true);
      expect(state.isLoggedIn).toBe(false);
    });
  
    it('should handle registerAccount.rejected', () => {
      const action = {
        type: registerAccount.rejected.type,
        error: { message: 'Registration failed' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.authError).toBe('Registration failed');
      expect(state.hasCheckedAuth).toBe(false);
    });
  
    it('should handle registerAccount.fulfilled', () => {
      const action = {
        type: registerAccount.fulfilled.type,
        payload: { user: fakeUser }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.authError).toBeNull();
      expect(state.authResponse).toEqual(fakeUser);
      expect(state.isLoggedIn).toBe(true);
      expect(state.hasCheckedAuth).toBe(false);
    });
  });