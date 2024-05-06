import { axiosInstance } from '../../RequestInterceptor';

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
  LpaInfo,
  UPDATE_LPA_INFO_FAIL,
  UPDATE_LPA_INFO_SUCCESS,
  UPDATE_OC_INFO_FAIL,
  UPDATE_OC_INFO_SUCCESS,
} from './Contants.ts';
import { Dispatch } from 'redux';

export const fetchOcInfo =
  (login: string) => async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_OC_INFO });
      const response = await axiosInstance.get(`/oc?login=${login}`);
      dispatch({ type: FETCH_OC_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch({ type: FETCH_OC_INFO_ERROR, payload: error.toString() });
    }
  };
export const fetchPaginatedLPAInfo = (page: number, size: number, siren: string, filters: FilterParams) => async (dispatch: Dispatch<AppActions>) => {

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

    const response = await axiosInstance.get(`/palpa?${queryParams}`);
    dispatch({
      type: FETCH_LPA_INFO_PAGINATED_SUCCESS,
      payload: {
        content: response.data.content,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        currentPage: response.data.currentPage
      }
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch({ type: FETCH_LPA_INFO_PAGINATED_FAILURE, payload: error.toString() });
  }
};
export const updateOcInfo =
  (ocData: FormDataOC,currentPage: number, pageSize: number, filters: FilterParams) => async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.put("/oc/update", ocData);
      dispatch({
        type: UPDATE_OC_INFO_SUCCESS,
        payload: response.data,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(fetchPaginatedLPAInfo(currentPage, pageSize, ocData.locSiren, filters));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: UPDATE_OC_INFO_FAIL, payload: error.toString() });
    }
  };
export const updateLPAInfo =
  (lpaInfo: LpaInfo) => async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.put("/palpa/update", lpaInfo);
      dispatch({
        type: UPDATE_LPA_INFO_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: UPDATE_LPA_INFO_FAIL, payload: error.toString() });
    }
  };
export const createLPA=
  (lpaInfo: LpaInfo) => async (dispatch: Dispatch<AppActions>) => {
    try {
      const response = await axiosInstance.post("/palpa/create", lpaInfo);
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
export const fetchDepartementData = (siren: string, region: string = '') => async (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: FETCH_API_START});
  const regionParam = region ? `&region=${encodeURIComponent(region)}` : '';
  try {
    const response = await axiosInstance.get(`/palpa/departements?siren=${encodeURIComponent(siren)}${regionParam}`);
    dispatch({ type: FETCH_DEPARTMENT_SUCCESS, payload: response.data });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch({ type: FETCH_DEPARTMENT_ERROR, payload: error.toString() });
  }
};
export const fetchRegionData = (siren: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: FETCH_API_START});
  try {
    const response = await axiosInstance.get(`/palpa/regions?siren=${encodeURIComponent(siren)}`);
    dispatch({ type: FETCH_REGION_SUCCESS, payload: response.data });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch({ type: FETCH_REGION_ERROR, payload: error.toString() });
  }};
export const deleteLpa = (id: string, siren: string, currentPage: number, pageSize: number, filters: FilterParams) => async (dispatch: Dispatch<AppActions>) =>  {
  dispatch({ type: FETCH_API_START });
  try {
    await axiosInstance.delete(`/palpa/${id}`);
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
export const fetchAdresseSuggestions = async (inputValue: string): Promise<AdresseInfo[]> => {
  try {
    const response = await axiosInstance.get<AdresseInfo[]>("/adresse/auto-complete", {
      params: { query: inputValue },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    return [];
  }
};
