export interface ModerateurContent {
  contenu: string;
  cible: string;
}

export interface ModerateurContentFromAPI {
  id: number;
  contenu: string;
  cible: string;
  dateCrea: string;
  dateMaj: string | null;
}
