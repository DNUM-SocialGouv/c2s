export interface OcDownLoadLinksFromAPI {
  id: number;
  thematique: {
    id: number;
    titre: string;
    description: string;
    groupe: string;
    ordre: number;
  };
  repertoire: string | null;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
}

export interface OcWelcomeMessageFromAPI {
  id: number;
  contenu: string;
  groupe: string;
  dateCrea: string;
  dateMaj: string | null;
}

export interface Thematique {
  id: number;
  titre: string;
  description: string;
  groupe: string;
  ordre: number;
}

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

export interface WelcomeAPIResponse {
  messageAccueil: {
    id: number;
    contenu: string;
    groupe: string;
    dateCrea: string;
    dateMaj: string | null;
  };
  ressourceFiles: RessourceFile[];
}

export interface OcAccueilCitation {
  content: string;
  updateDate: string;
}
