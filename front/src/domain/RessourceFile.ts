import {
  ModeratorRessourcesFromAPI,
  ModeratorThematiqueFromAPI,
} from './ModeratorRessources';
import { Thematique } from './Thematique';

// Pour OC et CAISSE accueil
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
  dateMiseAJour: string;
}

export interface PartenaireThematique {
  id: number;
  titre: string;
  description: string;
  groupes: string[];
  ordre: number;
}

export interface PartenaireMappedThematique {
  id: number;
  titre: string;
  description: string;
  groupes: string[];
  ordre: number;
  associatedFiles: ModeratorRessourcesFromAPI[];
}

export interface PartenairesMappedRessources {
  thematiques: PartenaireMappedThematique[];
  fichiers: ModeratorRessourcesFromAPI[];
  dateMiseAJour: string;
}
