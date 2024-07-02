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
  NoStatus = 'ENREGISTRE',
  Subsbribed = 'INSCRIT',
  ToModerate = 'A_MODERER',
  Validated = 'VALIDE',
  Unsubscribed = 'DESINSCRIT',
  Refused = 'REFUSE',
}

export interface StatusUpdateResponse {
  data: boolean;
  status: number;
}
