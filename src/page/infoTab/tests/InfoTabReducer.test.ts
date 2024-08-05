import infoTabReducer, {
  MembreInfoState,
  MembreInfoAction,
} from '../InfoTabReducer';
import {
  FETCH_MEMBRE_INFO_ERROR,
  FETCH_MEMBRE_INFO,
  FETCH_MEMBRE_INFO_SUCCESS,
  UPDATE_MEMBRE_INFO_FAIL,
  UPDATE_MEMBRE_INFO_SUCCESS,
  DELETE_MEMBRE_ERROR,
  DELETE_MEMBRE_SUCCESS,
} from '../Contants';

describe('infoTabReducer', () => {
  const initialState: MembreInfoState = {
    membreData: {
      membreId: '',
      nom: '',
      prenom: '',
      fonction: '',
      email: '',
      telephone: '',
      password: '',
    },
    isLoading: false,
    isLoadingSubmit: false,
    error: null,
  };

  it('should handle FETCH_MEMBRE_INFO_ERROR', () => {
    const action: MembreInfoAction = {
      type: FETCH_MEMBRE_INFO_ERROR,
      payload: 'Error message',
    };

    const newState = infoTabReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      error: 'Error message',
      isLoading: false,
    });
  });

  it('should handle FETCH_MEMBRE_INFO', () => {
    const action: MembreInfoAction = {
      type: FETCH_MEMBRE_INFO,
    };

    const newState = infoTabReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should handle FETCH_MEMBRE_INFO_SUCCESS', () => {
    const action: MembreInfoAction = {
      type: FETCH_MEMBRE_INFO_SUCCESS,
      payload: {
        membreId: '1',
        nom: 'John',
        prenom: 'Doe',
        fonction: 'Developer',
        email: 'john.doe@example.com',
        telephone: '1234567890',
        password: 'password',
      },
    };

    const newState = infoTabReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      membreData: {
        membreId: '1',
        nom: 'John',
        prenom: 'Doe',
        fonction: 'Developer',
        email: 'john.doe@example.com',
        telephone: '1234567890',
        password: 'password',
      },
      isLoading: false,
      error: null,
    });
  });

  it('should handle UPDATE_MEMBRE_INFO_SUCCESS', () => {
    const action: MembreInfoAction = {
      type: UPDATE_MEMBRE_INFO_SUCCESS,
      payload: 'Success message',
    };

    const newState = infoTabReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      error: null,
    });
  });

  it('should handle UPDATE_MEMBRE_INFO_FAIL', () => {
    const action: MembreInfoAction = {
      type: UPDATE_MEMBRE_INFO_FAIL,
      payload: 'Error message',
    };

    const newState = infoTabReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      error: 'Error message',
      isLoading: false,
    });
  });

  it('should handle DELETE_MEMBRE_ERROR', () => {
    const action: MembreInfoAction = {
      type: DELETE_MEMBRE_ERROR,
      payload: 'Error message',
    };

    const newState = infoTabReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      error: 'Error message',
    });
  });

  it('should handle DELETE_MEMBRE_SUCCESS', () => {
    const action: MembreInfoAction = {
      type: DELETE_MEMBRE_SUCCESS,
      payload: 'Success message',
    };

    const newState = infoTabReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      error: null,
    });
  });
});
