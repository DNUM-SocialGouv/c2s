import axios, { AxiosError } from 'axios';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import {
  AdresseInfo,
  AppActions,
  CREATE_LPA_FAIL,
  CREATE_LPA_SUCCESS,
  DELETE_LPA_FAILURE,
  DELETE_LPA_SUCCESS,
  FETCH_API_START,
  FETCH_DEPARTMENT_ERROR,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_LPA_INFO_PAGINATED_FAILURE,
  FETCH_LPA_INFO_PAGINATED_SUCCESS,
  FETCH_OC_INFO,
  FETCH_OC_INFO_ERROR,
  FETCH_OC_INFO_SUCCESS,
  FETCH_REGION_ERROR,
  FETCH_REGION_SUCCESS,
  FilterParams,
  FormDataOC,
  PointAcceuilInfo,
  UPDATE_LPA_INFO_FAIL,
  UPDATE_LPA_INFO_SUCCESS,
  UPDATE_OC_INFO_FAIL,
  UPDATE_OC_INFO_SUCCESS,
  RESET_ESTABLISHMENT_FORM_ERRORS,
} from './Contants.ts';
import { Dispatch } from 'redux';

export const fetchOcInfo =
  (email: string) => async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_OC_INFO });
      const response = await axiosInstance.get(`/oc?email=${email}`);
      dispatch({ type: FETCH_OC_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch({ type: FETCH_OC_INFO_ERROR, payload: error.toString() });
    }
  };
export const fetchPaginatedLPAInfo =
  (page: number, size: number, siren: string, filters: FilterParams) =>
  async (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: FETCH_API_START });
    try {
      let queryParams = `page=${page}&size=${size}`;
      if (siren) {
        queryParams += `&siren=${encodeURIComponent(siren)}`;
      }
      if (filters.searchQuery) {
        queryParams += `&nom=${encodeURIComponent(filters.searchQuery)}`;
      }
      if (filters.region) {
        queryParams += `&region=${encodeURIComponent(filters.region)}`;
      }
      if (filters.department) {
        queryParams += `&departement=${encodeURIComponent(filters.department)}`;
      }

      const response = await axiosInstance.get(
        `/oc/points-accueil?${queryParams}`
      );
      dispatch({
        type: FETCH_LPA_INFO_PAGINATED_SUCCESS,
        payload: {
          content: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          currentPage: response.data.currentPage,
        },
      });
      // FIXME: quick fix à corriger
      localStorage.setItem(
        'totalElementForOC',
        JSON.stringify(response.data.totalElements)
      );
    } catch (error) {
      dispatch({
        type: FETCH_LPA_INFO_PAGINATED_FAILURE,
        // FIXME: erreur de typage
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        payload: error.toString(),
      });
    }
  };
export const updateOcInfo =
  (
    ocData: FormDataOC,
    currentPage: number,
    pageSize: number,
    filters: FilterParams
  ) =>
  async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.put('/oc/update', ocData);
      dispatch({
        type: UPDATE_OC_INFO_SUCCESS,
        payload: response.data,
      });
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // FIXME: erreur de typage
        fetchPaginatedLPAInfo(currentPage, pageSize, ocData.locSiren, filters)
      );
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: UPDATE_OC_INFO_FAIL, payload: error.toString() });
    }
  };

export const updateLPAInfo =
  (lpaInfo: PointAcceuilInfo) => async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.put(
        '/oc/points-accueil/update',
        lpaInfo
      );
      dispatch({
        type: UPDATE_LPA_INFO_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      let err;

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        err = axiosError.response?.data || error;
      } else {
        err = error;
      }

      if (typeof err === 'object' && err !== null) {
        const errorWithId = { ...err, id: lpaInfo?.id };
        dispatch({ type: UPDATE_LPA_INFO_FAIL, payload: errorWithId });
        return;
      }

      console.error('Error updating LPA info:', err);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: UPDATE_LPA_INFO_FAIL, payload: err });
    }
  };
export const createLPA =
  (lpaInfo: PointAcceuilInfo) => async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.post(
        '/oc/points-accueil/create',
        lpaInfo
      );

      dispatch({
        type: CREATE_LPA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: CREATE_LPA_FAIL, payload: error.toString() });
    }
  };
export const fetchDepartementData =
  (siren: string, region: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: FETCH_API_START });
    const regionParam = region ? `&region=${encodeURIComponent(region)}` : '';
    try {
      const response = await axiosInstance.get(
        `/oc/points-accueil/departements?siren=${encodeURIComponent(siren)}${regionParam}`
      );
      dispatch({ type: FETCH_DEPARTMENT_SUCCESS, payload: response.data });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_DEPARTMENT_ERROR, payload: error.toString() });
    }
  };
export const fetchRegionData =
  (siren: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: FETCH_API_START });
    try {
      const response = await axiosInstance.get(
        `/oc/points-accueil/regions?siren=${encodeURIComponent(siren)}`
      );
      dispatch({ type: FETCH_REGION_SUCCESS, payload: response.data });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: FETCH_REGION_ERROR, payload: error.toString() });
    }
  };
export const deleteLpa =
  (
    id: string,
    siren: string,
    currentPage: number,
    pageSize: number,
    filters: FilterParams
  ) =>
  async (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: FETCH_API_START });
    try {
      await axiosInstance.delete(`/oc/points-accueil/${id}`);
      dispatch({ type: DELETE_LPA_SUCCESS, payload: id });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(fetchPaginatedLPAInfo(currentPage, pageSize, siren, filters));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch({ type: DELETE_LPA_FAILURE, payload: error.toString() });
    }
  };
export const fetchAdresseSuggestions = async (
  inputValue: string
): Promise<AdresseInfo[]> => {
  try {
    const response = await axiosInstance.get<AdresseInfo[]>(
      'private/adresse/auto-complete',
      {
        params: { query: inputValue },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error retrieving addresses:', error);
    return [];
  }
};

export const ResetEstablishmentFormErrors =
  () => (dispatch: Dispatch<AppActions>) => {
    console.log('ResetEstablishmenFormErrors');
    dispatch({ type: RESET_ESTABLISHMENT_FORM_ERRORS });
  };
