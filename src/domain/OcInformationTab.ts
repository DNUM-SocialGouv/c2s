export interface iMembreData {
  membreId: string;
  nom: string;
  prenom: string;
  fonction: string;
  email: string;
  telephone: string;
  password: string;
}

export interface iDeleteObject {
  membreId: string;
  email: string;
}
