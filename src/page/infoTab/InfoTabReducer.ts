import {
  UPDATE_MEMBRE_INFO_FAIL,
  UPDATE_MEMBRE_INFO_SUCCESS,
  FETCH_MEMBRE_INFO,
  FETCH_MEMBRE_INFO_SUCCESS,
  FETCH_MEMBRE_INFO_ERROR,
  DELETE_MEMBRE_ERROR,
  DELETE_MEMBRE_SUCCESS,
} from "./Contants.ts";

interface MembreInfoData {
  membreId: string;
  login: string;
  nom: string;
  prenom: string;
  fonction: string;
  email: string;
  telephone: string;
  password: string;
}

interface MembreInfoState {
  membreData: MembreInfoData;
  isLoading: boolean;
  isLoadingSubmit: boolean;
  error: string | null;
}

type MembreInfoAction =
  | { type: typeof FETCH_MEMBRE_INFO_ERROR; payload: string }
  | { type: typeof FETCH_MEMBRE_INFO }
  | { type: typeof FETCH_MEMBRE_INFO_SUCCESS; payload: MembreInfoData }
  | { type: typeof UPDATE_MEMBRE_INFO_FAIL; payload: string }
  | { type: typeof UPDATE_MEMBRE_INFO_SUCCESS; payload: string }
  | { type: typeof DELETE_MEMBRE_ERROR; payload: string }
  | { type: typeof DELETE_MEMBRE_SUCCESS; payload: string };

const initialState: MembreInfoState = {
  membreData: {
    membreId: "",
    login: "",
    nom: "",
    prenom: "",
    fonction: "",
    email: "",
    telephone: "",
    password: "",
  },
  isLoading: false,
  isLoadingSubmit: false,
  error: null,
};
const infoTabReducer = (
  state: MembreInfoState = initialState,
  action: MembreInfoAction,
): MembreInfoState => {
  switch (action.type) {
    case FETCH_MEMBRE_INFO_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingSubmit: false,
      };

    case FETCH_MEMBRE_INFO:
      return {
        ...state,
        isLoadingSubmit: true,
        error: null,
      };

    case FETCH_MEMBRE_INFO_SUCCESS:
      return {
        ...state,
        membreData: action.payload,
        error: null,
      };
    case UPDATE_MEMBRE_INFO_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false,
        error: null,
      };
    case UPDATE_MEMBRE_INFO_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoadingSubmit: false,
      };
    case DELETE_MEMBRE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MEMBRE_SUCCESS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default infoTabReducer;
