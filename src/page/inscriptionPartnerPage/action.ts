import { axiosInstance } from '../../RequestInterceptor';

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
} from './Contants.ts';
import { Dispatch } from 'redux';
import { iFormData } from '@/page/inscriptionPartnerPage/InscriptionPartnerPage.tsx';

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
        '/public/inscriptions',
        formData
      );
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
      dispatch(resetFormData());
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_DATA_ERROR, payload: error.toString() });
    }
  };

export const fetchCompanyInfoFromSiren =
  (siren: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: FETCH_COMPANY_INFO_REQUEST });

    try {
      const response = await axiosInstance.get(
        `/public/recherche/siren?siren=${siren}`
      );
      dispatch({ type: FETCH_COMPANY_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_COMPANY_INFO_FAILURE, payload: error.toString() });
    }
  };

export const resetFormData = (): AppActions => ({
  type: RESET_FORM_DATA,
});
