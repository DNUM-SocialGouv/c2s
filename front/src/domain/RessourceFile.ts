import { Thematique } from './Thematique';

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
