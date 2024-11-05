import { iDeleteObject, iMembreData } from '../../domain/OcInformationTab.ts';
import { axiosInstance } from '../../RequestInterceptor.tsx';

import {
  AppActions,
  FETCH_MEMBRE_INFO_ERROR,
  FETCH_MEMBRE_INFO_SUCCESS,
  FETCH_MEMBRE_INFO,
  UPDATE_MEMBRE_INFO_FAIL,
  UPDATE_MEMBRE_INFO_SUCCESS,
  DELETE_MEMBRE_SUCCESS,
  DELETE_MEMBRE_ERROR,
} from './Contants.ts';
import { Dispatch } from 'redux';

export const fetchMembreInfo =
  (email: string) => async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_MEMBRE_INFO });
      const response = await axiosInstance.get(
        `/oc/membres/search?email=${email}`
      );
      dispatch({ type: FETCH_MEMBRE_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_MEMBRE_INFO_ERROR, payload: error.toString() });
    }
  };
export const updateMembreInfo =
  (membreData: iMembreData) => async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.put(
        '/oc/membres/update',
        membreData
      );
      dispatch({
        type: UPDATE_MEMBRE_INFO_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: UPDATE_MEMBRE_INFO_FAIL, payload: error.toString() });
    }
  };

export const deleteMembre =
  (deleteObject: iDeleteObject) => async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.post(
        '/partenaire/membres/delete',
        deleteObject
      );
      dispatch({
        type: DELETE_MEMBRE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: DELETE_MEMBRE_ERROR, payload: error.toString() });
    }
  };
