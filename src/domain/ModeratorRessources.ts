export interface ModeratorThematiqueFromAPI {
  id: number;
  titre: string;
  description: string;
  groupe: string;
  ordre: number;
}

export interface ModeratorRessourcesFromAPI {
  id: number;
  thematique: ModeratorThematiqueFromAPI;
  repertoire: string;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
}
