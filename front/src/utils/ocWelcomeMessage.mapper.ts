import {
  OcAccueilCitation,
  OcWelcomeMessageFromAPI,
} from '../domain/OcAccueil.ts';

export function ocWelcomeMessageMapper(
  welcomeMessageFromAPI: OcWelcomeMessageFromAPI
): OcAccueilCitation {
  const date =
    welcomeMessageFromAPI.dateMaj !== null
      ? welcomeMessageFromAPI.dateMaj
      : welcomeMessageFromAPI.dateCrea;
  return {
    content: welcomeMessageFromAPI.contenu,
    updateDate: dateFormatter(date),
  };
}

export function dateFormatter(date: string): string {
  return new Date(date).toLocaleString('fr-FR', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
}
