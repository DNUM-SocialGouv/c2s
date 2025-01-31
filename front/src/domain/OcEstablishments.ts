export interface FormDataOC {
  id: string | null;
  locSiren: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  groupe: string;
  siteWeb: string;
  ocAddedtoLPA: boolean;
  dateMaj: string;
  dateCrea: string;
  totalPAitems: number;
  codePostal?: string;
  ville?: string;
}

export interface PointAcceuilInfo {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  adresse2?: string;
  adresse3?: string;
  cedex?: string;
  codePostal: string;
  adresseComplete: string;
  context: string;
  ville: string;
  departement?: string;
  region?: string;
  dateMaj?: string;
}
