//todo: supprimer et utiliser "OrganisationType" ?
export type EstablishmentType = 'ORGANISME_COMPLEMENTAIRE' | 'CAISSE' | '';

type membre = {
  id: number;
  nom: string;
  prenom: string;
  types: string[] | null;
};

export interface Establishment {
  id: number;
  locSiren: string;
  dateCrea?: string;
  dateMaj?: string;
  nom: string;
  email: string | null;
  telephone: string | null;
  adresse: string;
  codePostal: string;
  ville: string;
  siteWeb: string;
  groupe: EstablishmentType;
  ocAddedtoLPA?: boolean;
  pointAccueilCount: number;
  membres?: membre[];
}

export interface EstablishmentsApiResponse {
  list: Establishment[];
  count: number;
}

export type establissementTypes = {
  [key: string]: string;
};

export interface FiltersApiResponse {
  ocActifsCount: number;
  pointsAccueilCount: number;
  etablissementTypes: establissementTypes;
  regions: string[];
  departements: string[];
}

export interface PA {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  adresse2: string;
  adresse3: string;
  adresseComplete: string;
  codePostal: string;
  ville: string;
  cedex: string;
  region: string;
  departement: string;
  dateMaj: string;
}
export interface PASApiResponse {
  list: PA[];
  count: number;
}

export interface AddEstablishmentErrorResponseData {
  [key: string]: string | undefined;
}

export interface AddEstablishmentErrorResponse {
  response: {
    data: AddEstablishmentErrorResponseData;
    status: number;
  };
}
