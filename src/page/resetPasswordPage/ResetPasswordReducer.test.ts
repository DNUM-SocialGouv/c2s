import {
  FETCH_RESET_PASSWORD_ERROR,
  FETCH_RESET_PASSWORD_SUCCESS,
} from './Contants.ts';
import resetPasswordReducer, {
  ConfirmResetPasswordAction,
} from './ResetPasswordReducer.ts';

describe('resetPasswordReducer', () => {
  it('should handle FETCH_RESET_PASSWORD action', () => {
    const initialState = {
      email: '',
      password: '',
      resetPasswordSuccess: false,
      isLoading: false,
      error: null,
    };

    const action: ConfirmResetPasswordAction = {
      type: 'FETCH_RESET_PASSWORD_ERROR',
      payload: 'Error message',
    };
    const newState = resetPasswordReducer(initialState, action);

    expect(newState.resetPasswordSuccess).toBe(false);
  });

  it('should handle FETCH_RESET_PASSWORD_SUCCESS action', () => {
    const initialState = {
      email: '',
      password: '',
      resetPasswordSuccess: false,
      isLoading: false,
      error: null,
    };
    const action: ConfirmResetPasswordAction = {
      type: FETCH_RESET_PASSWORD_SUCCESS,
    };

    const newState = resetPasswordReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.resetPasswordSuccess).toBe(true);
  });

  it('should handle FETCH_RESET_PASSWORD_ERROR action', () => {
    const initialState = {
      email: '',
      password: '',
      resetPasswordSuccess: false,
      isLoading: false,
      error: null,
    };
    const action: ConfirmResetPasswordAction = {
      type: FETCH_RESET_PASSWORD_ERROR,
      payload: 'Error message',
    };

    const newState = resetPasswordReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.resetPasswordSuccess).toBe(false);
    expect(newState.error).toBe('Error message');
  });

  it('should handle FETCH_RESET_PASSWORD_ERROR action with loading state', () => {
    const initialState = {
      email: '',
      password: '',
      resetPasswordSuccess: false,
      isLoading: true,
      error: null,
    };
    const action: ConfirmResetPasswordAction = {
      type: FETCH_RESET_PASSWORD_ERROR,
      payload: 'Error message',
    };

    const newState = resetPasswordReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.resetPasswordSuccess).toBe(false);
    expect(newState.error).toBe('Error message');
  });
});
