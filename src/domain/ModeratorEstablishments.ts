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

// Interface for the API response
export interface ApiResponse {
  list: Establishment[];
  count: number;
}
