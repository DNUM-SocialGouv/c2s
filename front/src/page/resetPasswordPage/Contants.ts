export const FETCH_RESET_PASSWORD_SUCCESS = 'FETCH_RESET_PASSWORD_SUCCESS';
export const FETCH_RESET_PASSWORD_ERROR = 'FETCH_RESET_PASSWORD_ERROR';
export const FETCH_RESET_PASSWORD = 'FETCH_RESET_PASSWORD';

interface FetchResetSuccessAction {
  type: typeof FETCH_RESET_PASSWORD_SUCCESS;
  payload: string;
}

interface FetchResetPassword {
  type: typeof FETCH_RESET_PASSWORD;
}

interface FetchResetPasswordErrorAction {
  type: typeof FETCH_RESET_PASSWORD_ERROR;
  payload: string;
}

export type AppActions =
  | FetchResetSuccessAction
  | FetchResetPassword
  | FetchResetPasswordErrorAction;
