export interface Member {
  id: number;
  nom: string;
  prenom: string;
  fonction: string;
  email: string;
  telephone: string;
  password: string | null;
  groupe: string | null;
  societe: string;
  types: memberTypes;
}

export type memberTypes = string[] | null;
