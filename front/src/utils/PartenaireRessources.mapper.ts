import {
  PartenaireRessourcesFromAPI,
  PartenairesMappedRessources,
} from '@/domain/RessourceFile.ts';

export const partenaireRessourcesMapper = (
  data: PartenaireRessourcesFromAPI | null
): PartenairesMappedRessources | null => {
  if (!data) {
    return null;
  }
  const updatedThematiques = data.thematiques.map((thematique) => {
    const associatedFiles = data.fichiers.filter(
      (fichier) => fichier.thematique.id === thematique.id
    );
    return { ...thematique, associatedFiles };
  });

  return { ...data, thematiques: updatedThematiques };
};
