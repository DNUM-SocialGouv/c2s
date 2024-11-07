export interface OcInfoData {
  locSiren: string;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
  groupe: string;
  siteWeb: string;
  ocAddedtoLPA: boolean;
  dateMaj: string;
  totalPAitems: number;
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
  codePostal?: string;
  ville?: string;
}

export interface FilterParams {
  searchQuery?: string;
  region?: string;
  department?: string;
}
