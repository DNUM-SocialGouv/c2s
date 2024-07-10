export interface ModeratorThematiqueFromAPI {
  id: number;
  titre: string;
  description: string;
  groupe: string;
  ordre: number;
  publique: boolean;
}

export interface ModeratorRessourcesFromAPI {
  ressourceFichierId: number;
  thematique: {
    ressourceThematiqueId: number;
    titre: string;
    description: string;
    cible: string;
    ordre: number;
    publique: boolean;
  };
  repertoire: string;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
  type: string;
}
