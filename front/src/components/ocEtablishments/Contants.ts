import {
  FormDataOC,
  PointAcceuilInfo,
  FilterParams,
} from '@/domain/OcEtablissements';

const POINTS_ACCUEIL_PER_PAGE = 10;

const POINT_ACCUEIL_DEFAULT_VALUES = {
  id: '',
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  adresse2: '',
  adresse3: '',
  adresseComplete: '',
  cedex: '',
  codePostal: '',
  ville: '',
  region: '',
  departement: '',
  dateMaj: '',
};

const initialValue = 0;

const siegeDefaultData: FormDataOC = {
  locSiren: '',
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  groupe: '',
  siteWeb: '',
  ocAddedtoLPA: false,
  dateMaj: '',
  totalPAitems: initialValue,
};
const pointsAccueilDefaultData: PointAcceuilInfo[] = [
  POINT_ACCUEIL_DEFAULT_VALUES,
];

const filtersDefaultValues: FilterParams = {
  searchQuery: '',
  region: '',
  department: '',
};

export {
  POINT_ACCUEIL_DEFAULT_VALUES,
  POINTS_ACCUEIL_PER_PAGE,
  initialValue,
  siegeDefaultData,
  pointsAccueilDefaultData,
  filtersDefaultValues,
};
