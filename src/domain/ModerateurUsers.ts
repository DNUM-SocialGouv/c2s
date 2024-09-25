import { OrganisationType } from './Commons';

export interface User {
  locSiren: string | null;
  dateMaj: string | null;
  nom: string;
  email: string;
  telephone: string;
  adresse: string | null;
  codePostal: string | null;
  ville: string | null;
  groupe: string | null;
  siteWeb: string | null;
  ocAddedtoLPA: boolean;
  prenom: string;
  societe: string;
  fonction: string;
  adresseOrganisation: string | null;
  codePostalOrganisation: string | null;
  villeOrganisation: string | null;
  sirenOrganisation: string | null;
  emailOrganisation: string | null;
  siteWebOrganisation: string | null;
  typeOrganisation: string;
  telephoneOrganisation: string | null;
  pointAccueil: boolean;
}

export interface UserApiResponse {
  list: User[];
  count: number;
}

export enum UserStatus {
  AModerer = 'A_MODERER',
  Valide = 'ACTIF',
  Desinscrit = 'INACTIF',
  Supprime = 'SUPPRIME',
  Refuse = 'REFUSE',
}

export interface StatusUpdateResponse {
  data: boolean;
  status: number;
}

export interface QueryFilters {
  statut?: string;
  groupe?: OrganisationType;
  size?: number;
  page?: number;
  search?: string;
}
