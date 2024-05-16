export const FETCH_OC_INFO_SUCCESS = "FETCH_OC_INFO_SUCCESS";
export const FETCH_OC_INFO_ERROR = "FETCH_OC_INFO_ERROR";
export const FETCH_OC_INFO = "FETCH_OC_INFO";
export const UPDATE_OC_INFO_SUCCESS = "UPDATE_OC_INFO_SUCCESS";
export const UPDATE_OC_INFO_FAIL = "UPDATE_OC_INFO_FAIL";
export const FETCH_DEPARTMENT_SUCCESS="FETCH_DEPARTMENT_SUCCESS";
export const FETCH_DEPARTMENT_ERROR ="FETCH_DEPARTMENT_ERROR"
export const FETCH_API_START ="FETCH_API_START"
export const FETCH_REGION_SUCCESS ="FETCH_REGION_SUCCESS"
export const FETCH_REGION_ERROR ="FETCH_REGION_ERROR"
export const FETCH_LPA_INFO_PAGINATED_SUCCESS = 'FETCH_LPA_INFO_PAGINATED_SUCCESS';
export const FETCH_LPA_INFO_PAGINATED_FAILURE = 'FETCH_LPA_INFO_PAGINATED_FAILURE';

export const UPDATE_LPA_INFO_SUCCESS= "UPDATE_LPA_INFO_SUCCESS";
export const UPDATE_LPA_INFO_FAIL="UPDATE_LPA_INFO_FAIL";
export const CREATE_LPA_SUCCESS="CREATE_LPA_SUCCESS";
export const CREATE_LPA_FAIL="CREATE_LPA_FAIL";
export const DELETE_LPA_START = 'DELETE_LPA_START';
export const DELETE_LPA_SUCCESS = 'DELETE_LPA_SUCCESS';
export const DELETE_LPA_FAILURE = 'DELETE_LPA_FAILURE';
export const FETCH_ADRESSE_SUCCESS = "FETCH_ADRESSE_SUCCESS";
export const FETCH_ADRESSE_FAIL = "FETCH_ADRESSE_FAIL";
export interface LpaData {
  content: LpaInfo[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
export interface FormDataOC {
  locSiren: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  groupe: string;
  siteWeb: string;
  ocAddedtoLPA: boolean;
  dateMaj: string;
  totalPAitems: number;
}
export interface LpaInfo {
  lpaId: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  adresseComplete: string;
  codepostal: string;
  context: string;
  ville: string;
  locSiren: string;
}
export interface FilterParams {
  searchQuery?: string;
  region?: string;
  department?: string;
}

export interface AdresseInfo {
  label: string;
  context: string;
  codePostal: string;
  ville: string;
  adresse: string;
}
interface FetchDataSuccessAction {
  type: typeof FETCH_OC_INFO_SUCCESS;
  payload: FormDataOC;
}

interface FetchDataErrorAction {
  type: typeof FETCH_OC_INFO_ERROR;
  payload: string;
}
interface FetchOcInfoAction {
  type: typeof FETCH_OC_INFO;
}
interface UpdateOcInfoSuccessAction {
  type: typeof UPDATE_OC_INFO_SUCCESS;
  payload: FormDataOC;
}
interface UpdateLPAInfoSuccessAction {
  type: typeof UPDATE_LPA_INFO_SUCCESS;
  payload: string;
}
interface UpdateLPAInfoErrorAction {
  type: typeof UPDATE_LPA_INFO_FAIL;
  payload: string;
}
interface UpdateOcInfoErrorAction {
  type: typeof UPDATE_OC_INFO_FAIL;
  payload: string;
}
interface FetchLPAInfoSuccessAction {
  type: typeof FETCH_LPA_INFO_PAGINATED_SUCCESS;
  payload: LpaData;
}
interface FetchLPAInfoErrorAction {
  type: typeof FETCH_LPA_INFO_PAGINATED_FAILURE;
  payload: string
}
interface FetchDepartmentStartAction {
  type: typeof FETCH_API_START;
}
interface DeleteLpaStart {
  type: typeof DELETE_LPA_START
}
interface DeleteLpaSuccess {
  type: typeof DELETE_LPA_SUCCESS;
  payload: string;
}
interface DeleteLpaFailure {
  type: typeof DELETE_LPA_FAILURE;
  payload: string
}
interface FetchDepartmentSuccessAction {
  type: typeof FETCH_DEPARTMENT_SUCCESS;
  payload: string;
}
interface FetchDepartmentErrorAction {
  type: typeof FETCH_DEPARTMENT_ERROR;
  payload: string;
}
interface FetchRegionSuccessAction {
  type: typeof FETCH_REGION_SUCCESS;
  payload: string;
}
interface FetchRegionErrorAction {
  type: typeof FETCH_REGION_ERROR;
  payload: string;
}
interface CreateLPASuccessAction {
  type: typeof CREATE_LPA_SUCCESS;
  payload: string;
}
interface CreateLPAErrorAction {
  type: typeof CREATE_LPA_FAIL;
  payload: string;
}
interface FetchAdresseSuccess {
  type: typeof FETCH_ADRESSE_SUCCESS;
  payload: AdresseInfo;
}
interface FetchAdresseFail {
  type: typeof FETCH_ADRESSE_FAIL;
  payload: string;
}

export type AppActions =
  | FetchDataSuccessAction
  | FetchDataErrorAction
  | FetchOcInfoAction
  | UpdateOcInfoSuccessAction
  | UpdateOcInfoErrorAction
  | FetchDepartmentStartAction
  | FetchDepartmentSuccessAction
  | FetchDepartmentErrorAction
  | FetchRegionSuccessAction
  | FetchRegionErrorAction
  | FetchLPAInfoSuccessAction
  | UpdateLPAInfoSuccessAction
  | UpdateLPAInfoErrorAction
  | CreateLPASuccessAction
  | CreateLPAErrorAction
  | DeleteLpaStart
  | DeleteLpaSuccess
  | DeleteLpaFailure
  | FetchAdresseSuccess
  | FetchAdresseFail
  | FetchLPAInfoErrorAction
