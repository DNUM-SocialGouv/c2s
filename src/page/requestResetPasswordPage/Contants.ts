
export const FETCH_RESET_PASSWORD_REQUEST_SUCCESS = 'FETCH_RESET_PASSWORD_REQUEST_SUCCESS';
export const FETCH_RESET_PASSWORD_REQUEST_ERROR = 'FETCH_RESET_PASSWORD_REQUEST_ERROR';
export const FETCH_RESET_PASSWORD_REQUEST = 'FETCH_RESET_PASSWORD_REQUEST';



interface FetchRequestSuccessAction {
    type: typeof FETCH_RESET_PASSWORD_REQUEST_SUCCESS;
    payload: string;
}

interface FetchDataErrorAction {
    type: typeof FETCH_RESET_PASSWORD_REQUEST_ERROR;
    payload: string;
}
interface FetchResetPasswordRequest {
    type: typeof FETCH_RESET_PASSWORD_REQUEST;
}

interface FetchResetPasswordErrorAction {
    type: typeof FETCH_RESET_PASSWORD_REQUEST_ERROR;
    payload: string;
}

export type AppActions = FetchRequestSuccessAction | FetchDataErrorAction | FetchResetPasswordRequest |FetchResetPasswordErrorAction;
