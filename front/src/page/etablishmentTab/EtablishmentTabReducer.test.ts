import etablishmentTabReducer, { OcInfoAction } from './EtablishmentTabReducer.ts';
import {
  UPDATE_OC_INFO_FAIL,
  UPDATE_OC_INFO_SUCCESS,
  FETCH_OC_INFO,
  FETCH_OC_INFO_SUCCESS,
  FETCH_OC_INFO_ERROR,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_REGION_SUCCESS,
  FETCH_LPA_INFO_PAGINATED_SUCCESS,
  UPDATE_LPA_INFO_FAIL,
  UPDATE_LPA_INFO_SUCCESS,
  CREATE_LPA_SUCCESS,
  CREATE_LPA_FAIL,
  DELETE_LPA_SUCCESS,
} from './Contants.ts';

describe('etablishmentTabReducer', () => {
  const initialState = {
    ocData: {
      locSiren: '',
      nom: '',
      email: '',
      telephone: '',
      adresse: '',
      groupe: '',
      siteWeb: '',
      ocAddedtoLPA: false,
      dateMaj: '',
      totalPAitems: 0,
    },
    lpaData: {
      content: [],
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,
    },
    regions: [],
    departments: [],
    loadingLPA: false,
    loadingOC: false,
    error: null,
  };

  it('should handle FETCH_OC_INFO_ERROR', () => {
    const action: OcInfoAction = {
      type: FETCH_OC_INFO_ERROR,
      payload: 'Error message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe('Error message');
    expect(newState.loadingOC).toBe(false);
  });

  it('should handle FETCH_OC_INFO', () => {
    const action: OcInfoAction = { type: FETCH_OC_INFO };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.loadingOC).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('should handle FETCH_OC_INFO_SUCCESS', () => {
    const payload = {
      locSiren: '123456789',
      nom: 'Company Name',
      email: 'company@example.com',
      telephone: '1234567890',
      adresse: '123 Main St',
      groupe: 'Group Name',
      siteWeb: 'https://example.com',
      ocAddedtoLPA: false,
      dateMaj: '2022-01-01',
      totalPAitems: 10,
    };
    const action: OcInfoAction = {
      type: FETCH_OC_INFO_SUCCESS,
      payload: payload,
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.ocData).toEqual(payload);
    expect(newState.loadingOC).toBe(false);
    expect(newState.error).toBe(null);
  });

  it('should handle UPDATE_OC_INFO_FAIL', () => {
    const action: OcInfoAction = {
      type: UPDATE_OC_INFO_FAIL,
      payload: 'Error message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe('Error message');
    expect(newState.loadingOC).toBe(false);
  });

  it('should handle UPDATE_OC_INFO_SUCCESS', () => {
    const action: OcInfoAction = {
      type: UPDATE_OC_INFO_SUCCESS,
      payload: 'Success message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe(null);
  });

  it('should handle FETCH_DEPARTMENT_SUCCESS', () => {
    const payload = ['Department 1', 'Department 2'];
    const action: OcInfoAction = {
      type: FETCH_DEPARTMENT_SUCCESS,
      payload: payload,
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.departments).toEqual(payload);
  });

  it('should handle FETCH_REGION_SUCCESS', () => {
    const payload = ['Region 1', 'Region 2'];
    const action: OcInfoAction = {
      type: FETCH_REGION_SUCCESS,
      payload: payload,
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.regions).toEqual(payload);
  });

  it('should handle DELETE_LPA_SUCCESS', () => {
    const action: OcInfoAction = {
      type: DELETE_LPA_SUCCESS,
      payload: 'Success message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe(null);
  });

  it('should handle FETCH_LPA_INFO_PAGINATED_SUCCESS', () => {
    const payload = {
      content: [
        {
          lpaId: '1',
          nom: 'LPA 1',
          email: 'lpa1@example.com',
          telephone: '1234567890',
          adresse: '123 Main St',
          adresseComplete: '123 Main St, City, State',
          codePostal: '12345',
          context: 'Context 1',
          ville: 'City 1',
        },
        {
          lpaId: '2',
          nom: 'LPA 2',
          email: 'lpa2@example.com',
          telephone: '9876543210',
          adresse: '456 Elm St',
          adresseComplete: '456 Elm St, City, State',
          codePostal: '54321',
          context: 'Context 2',
          ville: 'City 2',
        },
      ],
      totalElements: 2,
      totalPages: 1,
      currentPage: 1,
    };
    const action: OcInfoAction = {
      type: FETCH_LPA_INFO_PAGINATED_SUCCESS,
      payload: payload,
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.lpaData).toEqual(payload);
  });

  it('should handle UPDATE_LPA_INFO_FAIL', () => {
    const action: OcInfoAction = {
      type: UPDATE_LPA_INFO_FAIL,
      payload: 'Error message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe('Error message');
    expect(newState.loadingLPA).toBe(false);
  });

  it('should handle UPDATE_LPA_INFO_SUCCESS', () => {
    const action: OcInfoAction = {
      type: UPDATE_LPA_INFO_SUCCESS,
      payload: 'Success message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe(null);
  });

  it('should handle CREATE_LPA_FAIL', () => {
    const action: OcInfoAction = {
      type: CREATE_LPA_FAIL,
      payload: 'Error message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe('Error message');
    expect(newState.loadingLPA).toBe(false);
  });

  it('should handle CREATE_LPA_SUCCESS', () => {
    const action: OcInfoAction = {
      type: CREATE_LPA_SUCCESS,
      payload: 'Success message',
    };
    const newState = etablishmentTabReducer(initialState, action);
    expect(newState.error).toBe(null);
  });
});
