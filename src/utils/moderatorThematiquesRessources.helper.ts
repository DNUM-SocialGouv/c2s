import {
  ModeratorRessourcesFromAPI,
  ModeratorThematiqueFromAPI,
} from '@/domain/ModeratorRessources';

export function moderatorThematiqueLinkFromAPIResponse(
  thematiqueId: number,
  ressourcesFilesFromAPI: ModeratorRessourcesFromAPI[]
) {
  return ressourcesFilesFromAPI.filter(
    (ressource) => ressource.thematique.id === thematiqueId
  );
}

export const findThematiqueById = (
  thematiques: ModeratorThematiqueFromAPI[],
  id: number
) => {
  return thematiques.find((thematique) => thematique.id === id);
};
