//todo: supprimer et utiliser "OrganisationType" ?
export type EstablishmentType = 'ORGANISME_COMPLEMENTAIRE' | 'CAISSE' | '';

// Interface for an individual establishment
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
  adresseComplete: string;
  codePostal: string;
  ville: string;
  region: string;
  departement: string;
  dateMaj: string;
}
export interface PASApiResponse {
  list: PA[];
  count: number;
}

interface AddEstablishmentErrorResponseData {
  [key: string]: string | undefined;
}

export interface AddEstablishmentErrorResponse {
  response: {
    data: AddEstablishmentErrorResponseData;
    status: number;
    statusText: string;
  };
}
