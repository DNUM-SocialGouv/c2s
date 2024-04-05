import {
  UPDATE_OC_INFO_FAIL,
  UPDATE_OC_INFO_SUCCESS,
  FETCH_OC_INFO,
  FETCH_OC_INFO_SUCCESS,
  FETCH_OC_INFO_ERROR,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_API_START,
  FETCH_REGION_SUCCESS,
  FETCH_LPA_INFO_PAGINATED_SUCCESS,
  UPDATE_LPA_INFO_FAIL,
  UPDATE_LPA_INFO_SUCCESS,
  CREATE_LPA_SUCCESS,
  CREATE_LPA_FAIL, DELETE_LPA_SUCCESS,
} from './Contants.ts';

interface OcInfoData {
  locSiren: string;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
  groupe: string;
  siteWeb: string;
  ocAddedtoLPA: boolean;
  dateMaj: string;
  totalPAitems:number;
}
interface LpaInfo {
  lpaId: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  adresseComplete:string;
  codepostal: string;
  context: string;
  ville: string;
}
interface LpaData {
  content: LpaInfo[],
  totalElements: number,
  totalPages: number,
  currentPage: number
}


interface OcInfoState {
  ocData: OcInfoData;
  lpaData: LpaData;
  regions: string[];
  departments: string[];
  loadingLPA: boolean;
  loadingOC: boolean;
  error: string | null;
}

type OcInfoAction =
  | { type: typeof FETCH_OC_INFO_ERROR; payload: string }
  | { type: typeof FETCH_OC_INFO }
  | { type: typeof FETCH_OC_INFO_SUCCESS; payload: OcInfoData }
  | { type: typeof UPDATE_OC_INFO_FAIL; payload: string }
  | { type: typeof UPDATE_OC_INFO_SUCCESS; payload: string }
  | { type:  typeof FETCH_DEPARTMENT_SUCCESS; payload: string[]}
  | { type:  typeof FETCH_REGION_SUCCESS; payload: string[]}
  | { type: typeof FETCH_API_START}
  | { type: typeof DELETE_LPA_SUCCESS; payload: string}
  | { type: typeof FETCH_LPA_INFO_PAGINATED_SUCCESS; payload: LpaData }
  | { type: typeof UPDATE_LPA_INFO_FAIL; payload: string }
  | { type: typeof UPDATE_LPA_INFO_SUCCESS; payload: string }
  | { type: typeof CREATE_LPA_FAIL; payload: string }
  | { type: typeof CREATE_LPA_SUCCESS; payload: string };
const initialState: OcInfoState = {
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
    totalPAitems:0
  },
  lpaData: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 0
  },
  regions: [],
  departments: [],
  loadingLPA: false,

  loadingOC: false,
  error: null,
};
const etablishmentTabReducer = (
  state: OcInfoState = initialState,
  action: OcInfoAction,
): OcInfoState => {
  switch (action.type) {
    case FETCH_OC_INFO_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingOC: false,
      };

    case FETCH_OC_INFO:
      return {
        ...state,
        loadingOC: true,
        error: null,
      };

    case FETCH_OC_INFO_SUCCESS:
      return {
        ...state,
        ocData: action.payload,
        loadingOC: false,
        error: null,
      };
    case UPDATE_OC_INFO_SUCCESS:
      return {
        ...state,
        loadingOC: false,
        error: null,
      };
    case UPDATE_OC_INFO_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingOC: false,
      };
    case UPDATE_LPA_INFO_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingLPA: false,
      };
    case UPDATE_LPA_INFO_SUCCESS:
      return {
        ...state,
        loadingLPA: false,
        error: null,
      };

    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: action.payload,
        loadingLPA: false,
        error: null,
      };
    case FETCH_API_START:
      return {
        ...state,
        loadingLPA: true,
        error: null,
      };
    case FETCH_REGION_SUCCESS:
      return {
        ...state,
        regions: action.payload,
        loadingLPA: false,
        error: null,
      };
    case FETCH_LPA_INFO_PAGINATED_SUCCESS:
      return {
        ...state,
        lpaData: action.payload,
        loadingLPA: false,
        error: null,
      };
    case DELETE_LPA_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const updatedContent = state.lpaData.content.filter(item => item.lpaId !== action.payload);
      // eslint-disable-next-line no-case-declarations
      const updatedTotalItems = state.lpaData.totalElements - 1;
      // eslint-disable-next-line no-case-declarations
      const totalPages = Math.ceil(updatedTotalItems / 3);
      // eslint-disable-next-line no-case-declarations
      const currentPage = totalPages < state.lpaData.currentPage + 1 ? totalPages - 1 : state.lpaData.currentPage;

      return {
        ...state,
        lpaData: {
          ...state.lpaData,
          content: updatedContent,
          totalElements: updatedTotalItems,
          totalPages: totalPages,
          currentPage: currentPage,
        },
        ocData: {
          ...state.ocData,
          totalPAitems: updatedTotalItems,
        }
      };
    case CREATE_LPA_SUCCESS:
      return {
        ...state,
        loadingOC: false,
      };
    case CREATE_LPA_FAIL:
      return {
        ...state,
        loadingOC: false,

        error: action.payload,
      };


    default:
      return state;
  }
};

export default etablishmentTabReducer;
