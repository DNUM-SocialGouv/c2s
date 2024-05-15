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
  messageAccueilId: number;
  contenu: string;
  cible: string;
  dateCrea: string;
  dateMaj: string;
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
    messageAccueilId: number;
    contenu: string;
    cible: string;
    dateCrea: string;
    dateMaj: string;
  };
  ressourceFiles: RessourceFile[];
}

export interface OcAccueilCitation {
  content: string;
  updateDate: string;
}
