export interface ModerateurContent {
  contenu: string;
  groupe: string;
}

export interface ModerateurContentFromAPI {
  id: number;
  contenu: string;
  groupe: string;
  dateCrea: string;
  dateMaj: string | null;
}
