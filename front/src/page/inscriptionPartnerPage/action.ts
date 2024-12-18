import { axiosInstance } from '../../RequestInterceptor.tsx';
import { AxiosError } from 'axios';

import {
  AppActions,
  FETCH_COMPANY_INFO_FAILURE,
  FETCH_COMPANY_INFO_REQUEST,
  FETCH_COMPANY_INFO_SUCCESS,
  FETCH_DATA_ERROR,
  FETCH_DATA_SUCCESS,
  FETCH_SUBMIT_REQUEST,
  RESET_FORM_DATA,
  SELECT_COMPANY_NAME,
  FETCH_ERRORS_FROM_BACKEND,
  RESET_ERROR_FROM_BACKEND_FIELD,
} from './Contants.ts';
import { Dispatch } from 'redux';
import { iFormData } from './InscriptionPartnerPage.tsx';
import {
  InscriptionErrorResponseData,
  InscriptionErrorResponse,
} from './FormComponent.tsx';

export const selectCompanyName = (
  field: string,
  value: string
): AppActions => ({
  type: SELECT_COMPANY_NAME,
  payload: { field, value },
});

export const submitFormData =
  (formData: iFormData) => async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_SUBMIT_REQUEST });
      const response = await axiosInstance.post(
        '/public/inscription',
        formData
      );
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
      dispatch(resetFormData());
    } catch (error) {
      const axiosError = error as AxiosError<InscriptionErrorResponse>;
      const errorMessage = 'An unknown error occurred';
      if (axiosError.response) {
        const { status, data } = axiosError.response;

        if (status === 400) {
          dispatch({
            type: FETCH_ERRORS_FROM_BACKEND,
            payload: data as unknown as InscriptionErrorResponseData,
          });
        }
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_DATA_ERROR, payload: error.toString() });

      throw new Error(errorMessage);
    }
  };

export const fetchCompanyInfoFromSiren =
  (siren: string, groupeValue: string) =>
  async (dispatch: Dispatch<AppActions>) => {
    const validGroupValues = ['ORGANISME_COMPLEMENTAIRE', 'CAISSE'];
    if (!groupeValue || !validGroupValues.includes(groupeValue)) {
      throw new Error(`Groupe invalide: "${groupeValue}`);
    }

    dispatch({ type: FETCH_COMPANY_INFO_REQUEST });

    const sirenEndpoint =
      groupeValue === 'ORGANISME_COMPLEMENTAIRE'
        ? '/public/recherche/siren/oc?siren='
        : '/public/recherche/siren/caisse?siren=';

    try {
      const response = await axiosInstance.get(`${sirenEndpoint}${siren}`);
      dispatch({ type: FETCH_COMPANY_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          dispatch({
            type: FETCH_COMPANY_INFO_FAILURE,
            payload: error.response?.data,
          });
          return;
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_COMPANY_INFO_FAILURE, payload: error.toString() });
    }
  };

export const resetFormData = (): AppActions => ({
  type: RESET_FORM_DATA,
});

export const resetErrorFromBackendField =
  (field: string) => (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: RESET_ERROR_FROM_BACKEND_FIELD, payload: field });
  };
