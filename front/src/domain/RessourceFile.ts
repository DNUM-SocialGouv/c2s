import {
  ModeratorRessourcesFromAPI,
  ModeratorThematiqueFromAPI,
} from './ModeratorRessources';
import { Thematique } from './Thematique';
// Pour OC accueil
export interface RessourceFile {
  id: number;
  thematique: Thematique;
  repertoire: string;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
}

// OC et CAISSE ressources
export interface PartenaireRessourcesFromAPI {
  thematiques: ModeratorThematiqueFromAPI[];
  fichiers: ModeratorRessourcesFromAPI[];
}
