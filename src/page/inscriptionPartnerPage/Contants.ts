import { InscriptionErrorResponseData } from '@/domain/InscriptionForm';

export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';
export const FETCH_COMPANY_INFO_REQUEST = 'FETCH_COMPANY_INFO_REQUEST';
export const FETCH_COMPANY_INFO_SUCCESS = 'FETCH_COMPANY_INFO_SUCCESS';
export const FETCH_COMPANY_INFO_FAILURE = 'FETCH_COMPANY_INFO_FAILURE';
export const RESET_FORM_DATA = 'RESET_FORM_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const SELECT_COMPANY_NAME = 'SELECT_COMPANY_NAME';
export const FETCH_SUBMIT_REQUEST = 'FETCH_SUBMIT_REQUEST';
export const FETCH_ERRORS_FROM_BACKEND = 'FETCH_ERRORS_FROM_BACKEND';
export const RESET_ERROR_FROM_BACKEND_FIELD = 'RESET_ERROR_FROM_BACKEND_FIELD';
interface UpdateFormDataAction {
  type: typeof SELECT_COMPANY_NAME;
  payload: { field: string; value: string };
}

interface FetchCompanyInfoRequestAction {
  type: typeof FETCH_COMPANY_INFO_REQUEST;
}

interface FetchCompanyInfoSuccessAction {
  type: typeof FETCH_COMPANY_INFO_SUCCESS;
  payload: string;
}

interface FetchCompanyInfoFailureAction {
  type: typeof FETCH_COMPANY_INFO_FAILURE;
  payload: string;
}

interface ResetFormDataAction {
  type: typeof RESET_FORM_DATA;
}

interface FetchDataSuccessAction {
  type: typeof FETCH_DATA_SUCCESS;
  payload: string;
}

interface FetchDataErrorAction {
  type: typeof FETCH_DATA_ERROR;
  payload: string;
}
interface FetchSubmitRequest {
  type: typeof FETCH_SUBMIT_REQUEST;
}

interface FetchErrorsFromBackend {
  type: typeof FETCH_ERRORS_FROM_BACKEND;
  payload: InscriptionErrorResponseData;
}

interface ResetErrorFromBackendField {
  type: typeof RESET_ERROR_FROM_BACKEND_FIELD;
  payload: string;
}

export type AppActions =
  | UpdateFormDataAction
  | FetchCompanyInfoRequestAction
  | FetchCompanyInfoSuccessAction
  | FetchCompanyInfoFailureAction
  | ResetFormDataAction
  | FetchDataSuccessAction
  | FetchDataErrorAction
  | FetchSubmitRequest
  | FetchErrorsFromBackend
  | ResetErrorFromBackendField;
