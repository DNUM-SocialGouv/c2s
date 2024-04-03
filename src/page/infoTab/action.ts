import { axiosInstance } from '../../RequestInterceptor';

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
import { iDeleteObject, iMembreData } from '@/page/infoTab/InfoTab.tsx';

export const fetchMembreInfo =
  (login: string) => async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_MEMBRE_INFO });
      const response = await axiosInstance.get(`/membre/search?login=${login}`);
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
      const response = await axiosInstance.put('/membre/update', membreData);
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
      const response = await axiosInstance.post('/membre/delete', deleteObject);
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
