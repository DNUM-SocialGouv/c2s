export interface OcDownLoadLinksFromAPI {
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

export interface OcWelcomeMessageFromAPI {
  id: number;
  contenu: string;
  cible: string;
  dateCrea: string;
  dateMaj: string | null;
}

export interface Thematique {
  ressourceThematiqueId: number;
  titre: string;
  description: string;
  cible: string;
  ordre: number;
  publique: boolean;
}

export interface RessourceFile {
  ressourceFichierId: number;
  thematique: Thematique;
  repertoire: string;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
  type: string;
}

export interface WelcomeAPIResponse {
  messageAccueil: {
    id: number;
    contenu: string;
    cible: string;
    dateCrea: string;
    dateMaj: string | null;
  };
  ressourceFiles: RessourceFile[];
}

export interface OcAccueilCitation {
  content: string;
  updateDate: string;
}
