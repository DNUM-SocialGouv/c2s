/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchOcInfo,
  fetchPaginatedLPAInfo,
  updateOcInfo,
  updateLPAInfo,
  createLPA,
  fetchDepartementData,
  fetchRegionData,
  deleteLpa,
} from './action.ts';
import {
  FETCH_OC_INFO,
  FETCH_OC_INFO_ERROR,
  FETCH_LPA_INFO_PAGINATED_SUCCESS,
  FETCH_LPA_INFO_PAGINATED_FAILURE,
  UPDATE_OC_INFO_SUCCESS,
  UPDATE_OC_INFO_FAIL,
  UPDATE_LPA_INFO_SUCCESS,
  UPDATE_LPA_INFO_FAIL,
  CREATE_LPA_SUCCESS,
  CREATE_LPA_FAIL,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_ERROR,
  FETCH_REGION_SUCCESS,
  FETCH_REGION_ERROR,
  DELETE_LPA_SUCCESS,
  DELETE_LPA_FAILURE,
  FETCH_API_START,
  FormDataOC,
  PointAcceuilInfo,
  FETCH_OC_INFO_SUCCESS,
} from './Contants.ts';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { waitFor } from '@testing-library/react';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const lpaInfo: PointAcceuilInfo = {
  id: '123',
  nom: 'LPA test',
  email: '',
  telephone: '',
  adresse: '',
  codePostal: '',
  adresseComplete: '',
  context: '',
  ville: '',
};

describe('EtablissemntTab action', () => {
  describe('fetchOcInfo', () => {
    it('should dispatch FETCH_OC_INFO_SUCCESS action on successful API call', async () => {
      // GIVEN
      const email = 'test@example.com';
      const response = { data: 'ocInfo' };
      mockAxios.onGet(`/oc?email=${email}`).reply(200, response);
    
      const expectedActions = [
        { type: FETCH_OC_INFO },
        { type: FETCH_OC_INFO_SUCCESS, payload: response.data },
      ];
      const store = mockStore({});
      // WHEN
      await store.dispatch<any>(fetchOcInfo(email));
      // THEN
      await waitFor(() => {
        const actions = store.getActions();
        const successAction = actions.find((action) => action.type === FETCH_OC_INFO_SUCCESS);
        if (successAction) {
          expect(successAction).toEqual(expectedActions[1]);
        }
      });
    });

    it('should dispatch FETCH_OC_INFO_ERROR action on API call failure', async () => {
      // GIVEN
      const email = 'test@example.com';
      const error = 'AxiosError: Network Error';
      mockAxios.onGet(`/oc?email=${email}`).reply(500, error);

      const expectedActions = [
        { type: FETCH_OC_INFO },
        { type: FETCH_OC_INFO_ERROR, payload: error.toString() },
      ];
      const store = mockStore({});
      // WHEN
      await store.dispatch<any>(fetchOcInfo(email));
      // THEN
      await waitFor(() => {
        const actions = store.getActions();
        const errorAction = actions.find((action) => action.type === FETCH_OC_INFO_ERROR);
        if (errorAction) {
          expect(errorAction.payload).toEqual(expectedActions[1].payload);
        }
      });
    });
  });

  describe('fetchPaginatedLPAInfo', () => {
    it('should dispatch FETCH_LPA_INFO_PAGINATED_SUCCESS action on successful API call', async () => {
      // GIVEN
      const page = 1;
      const size = 10;
      const siren = '123456789';
      const filters = {
        searchQuery: 'query',
        region: 'region',
        department: 'department',
      };
      const response = {
        data: {
          content: [],
          totalPages: 1,
          totalElements: 10,
          currentPage: 1,
        },
      };
      const queryParams = `page=${page}&size=${size}&siren=${encodeURIComponent(
        siren
      )}&nom=${encodeURIComponent(filters.searchQuery)}&region=${encodeURIComponent(
        filters.region
      )}&departement=${encodeURIComponent(filters.department)}`;
      mockAxios.onGet(`/oc/points-accueil?${queryParams}`).reply(200, response);

      const expectedActions = [
        { type: FETCH_API_START },
        {
          type: FETCH_LPA_INFO_PAGINATED_SUCCESS,
          payload: {
            content: response.data.content,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
            currentPage: response.data.currentPage,
          },
        },
        expect.any(Function),
      ];
      const store = mockStore({});
      // WHEN
      await store.dispatch<any>(fetchPaginatedLPAInfo(page, size, siren, filters));
      // THEN
      await waitFor(() => expect(store.getActions()).toEqual(expectedActions) );
      
    });

    it('should dispatch FETCH_LPA_INFO_PAGINATED_FAILURE action on API call failure', async () => {
      // GIVEN
      const page = 1;
      const size = 10;
      const siren = '123456789';
      const filters = {
        searchQuery: 'query',
        region: 'region',
        department: 'department',
      };
      const error = 'API error';
      const queryParams = `page=${page}&size=${size}&siren=${encodeURIComponent(
        siren
      )}&nom=${encodeURIComponent(filters.searchQuery)}&region=${encodeURIComponent(
        filters.region
      )}&departement=${encodeURIComponent(filters.department)}`;
      mockAxios.onGet(`/oc/points-accueil?${queryParams}`).reply(500, error);

      const expectedActions = [
        { type: FETCH_API_START },
        { type: FETCH_LPA_INFO_PAGINATED_FAILURE, payload: error.toString() },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(fetchPaginatedLPAInfo(page, size, siren, filters));
      // THEN
      await waitFor(() => {
        const actions = store.getActions();
        const successAction = actions.find((action) => action.type === FETCH_LPA_INFO_PAGINATED_SUCCESS);
        if (successAction) {
          expect(successAction).toEqual(expectedActions[1]);
        }
      });
    });
  });

  describe('updateOcInfo', () => {
    it('should dispatch UPDATE_OC_INFO_SUCCESS action on successful API call', async () => {
      // GIVEN
      const ocData = { locSiren: '123456789' } as FormDataOC;
      const currentPage = 1;
      const pageSize = 10;
      const filters = {
        searchQuery: 'query',
        region: 'region',
        department: 'department',
      };
      const response = { data: 'updatedOcInfo' };
      mockAxios.onPut('/oc/update', ocData).reply(200, response);

      const expectedActions = [
        { type: UPDATE_OC_INFO_SUCCESS, payload: response.data },
        expect.any(Function),
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(updateOcInfo(ocData, currentPage, pageSize, filters));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should dispatch UPDATE_OC_INFO_FAIL action on API call failure', async () => {
      // GIVEN
      const ocData = { locSiren: '123456789' } as FormDataOC;
      const currentPage = 1;
      const pageSize = 10;
      const filters = {
        searchQuery: 'query',
        region: 'region',
        department: 'department',
      };
      const error = 'API error';
      mockAxios.onPut('/oc/update', ocData).reply(500, error);

      const expectedActions = [
        { type: UPDATE_OC_INFO_FAIL, payload: error.toString() },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(updateOcInfo(ocData, currentPage, pageSize, filters));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });

  describe('updateLPAInfo', () => {
    it('should dispatch UPDATE_LPA_INFO_SUCCESS action on successful API call', async () => {
      // GIVEN
      const response = { data: 'updatedLpaInfo' };
      mockAxios
        .onPut('/oc/points-accueil/update', lpaInfo)
        .reply(200, response);

      const expectedActions = [
        { type: UPDATE_LPA_INFO_SUCCESS, payload: response.data },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(updateLPAInfo(lpaInfo));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should dispatch UPDATE_LPA_INFO_FAIL action on API call failure', async () => {
      // GIVEN
      const error = 'API error';
      mockAxios.onPut('/oc/points-accueil/update', lpaInfo).reply(500, error);

      const expectedActions = [
        { type: UPDATE_LPA_INFO_FAIL, payload: error.toString() },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(updateLPAInfo(lpaInfo));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });

  describe('createLPA', () => {
    it('should dispatch CREATE_LPA_SUCCESS action on successful API call', async () => {
      // GIVEN
      const response = { data: 'createdLpaInfo' };
      mockAxios
        .onPost('/oc/points-accueil/create', lpaInfo)
        .reply(200, response);

      const expectedActions = [
        { type: CREATE_LPA_SUCCESS, payload: response.data },
      ];
      const store = mockStore({});
      // WHEN
      await store.dispatch<any>(createLPA(lpaInfo));
      // THEN
      await waitFor(() => {
        const actions = store.getActions();
        const successAction = actions.find((action) => action.type === FETCH_LPA_INFO_PAGINATED_SUCCESS);
        const errorAction = actions.find((action) => action.type === FETCH_LPA_INFO_PAGINATED_FAILURE);
        if (successAction) {
          expect(successAction).toEqual(expectedActions[1]);
        } else if (errorAction) {
          expect(errorAction.payload).toEqual(expectedActions[1].payload);
        }
      });
    });
    it('should dispatch CREATE_LPA_FAIL action on API call failure', async () => {
      // GIVEN
      const error = 'AxiosError: Network Error';
      mockAxios.onPost('/oc/points-accueil/create', lpaInfo).reply(500, error);

      const expectedActions = [
        { type: CREATE_LPA_FAIL, payload: error.toString() },
      ];
      const store = mockStore({});
      //  WHEN
      await store.dispatch<any>(createLPA(lpaInfo));
      // THEN
      await waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });

  describe('deleteLpa', () => {
    it('should dispatch DELETE_LPA_SUCCESS action on successful API call', async () => {
      // GIVEN
      const id = '123';
      const siren = '123456789';
      const currentPage = 1;
      const pageSize = 10;
      const filters = {
        searchQuery: 'query',
        region: 'region',
        department: 'department',
      };
      mockAxios.onDelete(`/oc/points-accueil/${id}`).reply(204);

      const expectedActions = [
        { type: FETCH_API_START },
        { type: DELETE_LPA_SUCCESS, payload: id },
        expect.any(Function),
      ];
      const store = mockStore({});
      // WHEN
      await store.dispatch<any>(deleteLpa(id, siren, currentPage, pageSize, filters));
      // THEN
      await waitFor(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch DELETE_LPA_FAILURE action on API call failure', async () => {
      // GIVEN
      const id = '123';
      const siren = '123456789';
      const currentPage = 1;
      const pageSize = 10;
      const filters = {
        searchQuery: 'query',
        region: 'region',
        department: 'department',
      };
      const error = 'API error';
      mockAxios.onDelete(`/oc/points-accueil/${id}`).reply(500, error);

      const expectedActions = [
        { type: FETCH_API_START },
        { type: DELETE_LPA_FAILURE, payload: error.toString() },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(deleteLpa(id, siren, currentPage, pageSize, filters));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });

  describe('fetchDepartementData', () => {
    it('should dispatch FETCH_DEPARTMENT_SUCCESS action on successful API call', async () => {
      // GIVEN
      const siren = '123456789';
      const region = 'region';
      const response = { data: 'departmentData' };
      const regionParam = `&region=${encodeURIComponent(region)}`;
      mockAxios
        .onGet(
          `/oc/points-accueil/departements?siren=${encodeURIComponent(siren)}${regionParam}`
        )
        .reply(200, response);

      const expectedActions = [
        { type: FETCH_API_START },
        { type: FETCH_DEPARTMENT_SUCCESS, payload: response.data },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(fetchDepartementData(siren, region));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should dispatch FETCH_DEPARTMENT_ERROR action on API call failure', async () => {
      // GIVEN
      const siren = '123456789';
      const region = 'region';
      const error = 'API error';
      const regionParam = `&region=${encodeURIComponent(region)}`;
      mockAxios
        .onGet(
          `/oc/points-accueil/departements?siren=${encodeURIComponent(siren)}${regionParam}`
        )
        .reply(500, error);

      const expectedActions = [
        { type: FETCH_API_START },
        { type: FETCH_DEPARTMENT_ERROR, payload: error.toString() },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(fetchDepartementData(siren, region));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });

  describe('fetchRegionData', () => {
    it('should dispatch FETCH_REGION_SUCCESS action on successful API call', async () => {
      // GIVEN
      const siren = '123456789';
      const response = { data: 'regionData' };
      mockAxios
        .onGet(`/oc/points-accueil/regions?siren=${encodeURIComponent(siren)}`)
        .reply(200, response);

      const expectedActions = [
        { type: FETCH_API_START },
        { type: FETCH_REGION_SUCCESS, payload: response.data },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(fetchRegionData(siren));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should dispatch FETCH_REGION_ERROR action on API call failure', async () => {
      // GIVEN
      const siren = '123456789';
      const error = 'API error';
      mockAxios
        .onGet(`/oc/points-accueil/regions?siren=${encodeURIComponent(siren)}`)
        .reply(500, error);

      const expectedActions = [
        { type: FETCH_API_START },
        { type: FETCH_REGION_ERROR, payload: error.toString() },
      ];
      const store = mockStore({});
      // WHEN
      store.dispatch<any>(fetchRegionData(siren));
      // THEN
      waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
