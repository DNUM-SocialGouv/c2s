export const FETCH_MEMBRE_INFO_SUCCESS = 'FETCH_MEMBRE_INFO_SUCCESS';
export const FETCH_MEMBRE_INFO_ERROR = 'FETCH_MEMBRE_INFO_ERROR';
export const FETCH_MEMBRE_INFO = 'FETCH_MEMBRE_INFO';
export const UPDATE_MEMBRE_INFO_SUCCESS = 'UPDATE_MEMBRE_INFO_SUCCESS';
export const UPDATE_MEMBRE_INFO_FAIL = 'UPDATE_MEMBRE_INFO_FAIL';
export const DELETE_MEMBRE_ERROR = 'DELETE_MEMBRE_ERROR';
export const DELETE_MEMBRE_SUCCESS = 'DELETE_MEMBRE_SUCCESS';
interface MembreInfoData {
  login: string;
  nom: string;
  prenom: string;
  fonction: string;
  email: string;
  telephone: string;
  password: string;
}

interface FetchDataSuccessAction {
  type: typeof FETCH_MEMBRE_INFO_SUCCESS;
  payload: MembreInfoData;
}

interface FetchDataErrorAction {
  type: typeof FETCH_MEMBRE_INFO_ERROR;
  payload: string;
}

interface DeleteMembreErrorAction {
  type: typeof DELETE_MEMBRE_ERROR;
  payload: string;
}
interface DeleteMembreSuccessAction {
  type: typeof DELETE_MEMBRE_SUCCESS;
  payload: string;
}
interface FetchMembreInfo {
  type: typeof FETCH_MEMBRE_INFO;
}
interface UpdateMembreInfoSuccess {
  type: typeof UPDATE_MEMBRE_INFO_SUCCESS;
  payload: string;
}
interface UpdateMembreInfoError {
  type: typeof UPDATE_MEMBRE_INFO_FAIL;
  payload: string;
}

export type AppActions =
  | FetchDataSuccessAction
  | FetchDataErrorAction
  | FetchMembreInfo
  | UpdateMembreInfoSuccess
  | UpdateMembreInfoError
  | DeleteMembreErrorAction
  | DeleteMembreSuccessAction;
