export interface User {
  locSiren: string | null;
  dateMaj: string | null;
  nom: string;
  email: string;
  telephone: string;
  adresse: string | null;
  codepostal: string | null;
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
  NoStatus = 0,
  Subsbribed = 1,
  ToModerate = 2,
  Validated = 3,
  Unsubscribed = 4,
  Refused = 5,
}

export interface StatusUpdateResponse {
  data: boolean;
  status: number;
}
