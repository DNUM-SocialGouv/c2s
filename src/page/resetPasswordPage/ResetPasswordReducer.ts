import {
  FETCH_RESET_PASSWORD_ERROR,
  FETCH_RESET_PASSWORD_SUCCESS,
  FETCH_RESET_PASSWORD,
} from './Contants.ts';

interface ResetPasswordState {
  email: string;
  password: string;
  resetPasswordSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

export type ConfirmResetPasswordAction =
  | { type: typeof FETCH_RESET_PASSWORD }
  | { type: typeof FETCH_RESET_PASSWORD_SUCCESS }
  | { type: typeof FETCH_RESET_PASSWORD_ERROR; payload: string };

const initialState: ResetPasswordState = {
  email: '',
  password: '',
  resetPasswordSuccess: false,
  isLoading: false,
  error: null,
};
const resetPasswordReducer = (
  state: ResetPasswordState = initialState,
  action: ConfirmResetPasswordAction
): ResetPasswordState => {
  switch (action.type) {
    case FETCH_RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
        resetPasswordSuccess: false,
      };
    case FETCH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resetPasswordSuccess: true,
      };
    case FETCH_RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        resetPasswordSuccess: false,
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
