import { OcAccueilCitationProps } from '@/components/ocAccueil/ocAccueilCitation/OcAccueilCitation';

export interface OcWelcomeMessageFromAPI {
  messageAccueilId: number;
  contenu: string;
  cible: string;
  dateCrea: string;
  dateMaj: string;
}

export function ocWelcomeMessageMapper(
  welcomeMessageFromAPI: OcWelcomeMessageFromAPI
): OcAccueilCitationProps {
  return {
    content: welcomeMessageFromAPI.contenu,
    updateDate: new Date(welcomeMessageFromAPI.dateMaj).toLocaleDateString(),
  };
}
