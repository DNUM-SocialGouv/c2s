import { InscriptionErrorResponseData } from './FormComponent.tsx';

import {
  FETCH_COMPANY_INFO_FAILURE,
  FETCH_COMPANY_INFO_SUCCESS,
  FETCH_COMPANY_INFO_REQUEST,
  RESET_FORM_DATA,
  SELECT_COMPANY_NAME,
  FETCH_DATA_ERROR,
  FETCH_SUBMIT_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_ERRORS_FROM_BACKEND,
  RESET_ERROR_FROM_BACKEND_FIELD,
} from './Contants.ts';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  groupe: string;
  siren: string;
  fonction: string;
  companyName?: string;
}

interface InscriptionState {
  formData: FormData;
  companyInfo: string | null;
  isLoading: boolean;
  isLoadingSubmit: boolean;
  isClicked: boolean;
  isSubscribe: boolean;
  error: string | null;
  errorsFromBackend: InscriptionErrorResponseData;
}

type InscriptionAction =
  | { type: typeof SELECT_COMPANY_NAME; payload: { value: boolean } }
  | { type: typeof RESET_FORM_DATA }
  | { type: typeof FETCH_COMPANY_INFO_REQUEST }
  | { type: typeof FETCH_COMPANY_INFO_SUCCESS; payload: string }
  | { type: typeof FETCH_COMPANY_INFO_FAILURE; payload: string }
  | { type: typeof FETCH_DATA_ERROR; payload: string }
  | {
      type: typeof FETCH_ERRORS_FROM_BACKEND;
      payload: InscriptionErrorResponseData;
    }
  | {
      type: typeof RESET_ERROR_FROM_BACKEND_FIELD;
      payload: InscriptionErrorResponseData;
    }
  | { type: typeof FETCH_SUBMIT_REQUEST }
  | { type: typeof FETCH_DATA_SUCCESS };

const initialState: InscriptionState = {
  formData: {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    societe: '',
    groupe: 'ORGANISME_COMPLEMENTAIRE',
    siren: '',
    fonction: '',
    companyName: '',
  },
  companyInfo: null,
  isLoading: false,
  isClicked: false,
  isLoadingSubmit: false,
  isSubscribe: false,
  error: null,
  errorsFromBackend: {},
};
const inscriptionPartnerReducer = (
  state: InscriptionState = initialState,
  action: InscriptionAction
): InscriptionState => {
  switch (action.type) {
    case SELECT_COMPANY_NAME:
      return {
        ...state,
        isClicked: action.payload.value,
      };

    case RESET_FORM_DATA:
      return {
        formData: {
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          societe: '',
          groupe: 'ORGANISME_COMPLEMENTAIRE',
          siren: '',
          fonction: '',
          companyName: '',
        },
        companyInfo: null,
        isLoading: false,
        isClicked: false,
        isLoadingSubmit: false,
        isSubscribe: true,
        error: null,
        errorsFromBackend: {},
      };

    case FETCH_COMPANY_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoadingSubmit: false,
        error: null,
      };

    case FETCH_ERRORS_FROM_BACKEND:
      return {
        ...state,
        errorsFromBackend: action.payload,
      };

    case RESET_ERROR_FROM_BACKEND_FIELD: {
      const { [action.payload as unknown as string]: ignored, ...restErrors } =
        state.errorsFromBackend;

      if (!ignored) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        errorsFromBackend: restErrors,
      };
    }

    case FETCH_COMPANY_INFO_SUCCESS:
      return {
        ...state,
        companyInfo: action.payload,
        isLoadingSubmit: false,
        isLoading: false,
        isClicked: false,
      };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    case FETCH_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoadingSubmit: false,
      };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    case FETCH_COMPANY_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isLoadingSubmit: false,
      };

    case FETCH_SUBMIT_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true,
        error: null,
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isSubscribe: true,
        error: null,
      };
    default:
      return state;
  }
};

export default inscriptionPartnerReducer;
