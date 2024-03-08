import {
  FETCH_RESET_PASSWORD_REQUEST,
  FETCH_RESET_PASSWORD_REQUEST_ERROR,
  FETCH_RESET_PASSWORD_REQUEST_SUCCESS,
} from "./Contants.ts";

interface RequestResetPasswordState {
  email: string;
  sentRequestSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

type RequestResetRequestPasswordAction =
  | { type: typeof FETCH_RESET_PASSWORD_REQUEST }
  | { type: typeof FETCH_RESET_PASSWORD_REQUEST_SUCCESS }
  | { type: typeof FETCH_RESET_PASSWORD_REQUEST_ERROR; payload: string };

const initialState: RequestResetPasswordState = {
  email: "",
  sentRequestSuccess: false,
  isLoading: false,
  error: null,
};
const requestResetPasswordReducer = (
  state: RequestResetPasswordState = initialState,
  action: RequestResetRequestPasswordAction,
): RequestResetPasswordState => {
  switch (action.type) {
    case FETCH_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        sentRequestSuccess: false,
      };
    case FETCH_RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sentRequestSuccess: true,
      };
    case FETCH_RESET_PASSWORD_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        sentRequestSuccess: false,
      };
    default:
      return state;
  }
};

export default requestResetPasswordReducer;
