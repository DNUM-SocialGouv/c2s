export interface iMembreData {
  membreId: number;
  nom: string;
  prenom: string;
  fonction: string;
  email: string;
  telephone: string;
  password: string;
}

export interface iDeleteObject {
  membreId: number;
  email: string;
}
