import { OcAccueilCitation, OcWelcomeMessageFromAPI } from '@/domain/OcAccueil';

export function ocWelcomeMessageMapper(
  welcomeMessageFromAPI: OcWelcomeMessageFromAPI
): OcAccueilCitation {
  return {
    content: welcomeMessageFromAPI.contenu,
    updateDate: new Date(welcomeMessageFromAPI.dateMaj).toLocaleString(
      'fr-FR',
      { month: 'long', year: 'numeric', day: 'numeric' }
    ),
  };
}
