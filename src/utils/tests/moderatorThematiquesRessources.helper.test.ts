import {
  moderatorRessources,
  moderatorThematiques,
} from '@/utils/tests/moderatorRessources.fixtures';
import {
  findThematiqueById,
  moderatorThematiqueLinkFromAPIResponse,
} from '../moderatorThematiquesRessources.helper';
import { ModeratorRessourcesFromAPI } from '@/domain/ModeratorRessources';
describe('moderatorThematiquesRessources helper', () => {
  describe('findThematiqueById', () => {
    it('should find thematique by id', () => {
      //WHEN
      const thematique = findThematiqueById(moderatorThematiques, 1);
      // THEN
      expect(thematique).toMatchObject({
        id: 1,
        titre: 'Rubrique OC 1',
        description: 'Description 1',
        groupes: ['ORGANISME_COMPLEMENTAIRE'],
        ordre: 1,
      });
    });
  });

  describe('moderatorThematiqueLinkFromAPIResponse', () => {
    it('should return an array of ressource for given thematique', () => {
      //When
      const ressourcesFilesForThematique =
        moderatorThematiqueLinkFromAPIResponse(
          1,
          moderatorRessources as ModeratorRessourcesFromAPI[]
        );
      // Then
      expect(ressourcesFilesForThematique).toEqual([
        {
          dateCrea: '2024-10-02T13:22:50.009Z',
          dateMaj: '2024-10-02T13:22:50.009Z',
          extension: 'string',
          id: 1,
          nom: 'string',
          repertoire: 'string',
          taille: 100,
          thematique: {
            description: 'Description 1 ORGANISME_COMPLEMENTAIRE',
            groupes: ['ORGANISME_COMPLEMENTAIRE'],
            id: 1,
            ordre: 1,
            titre: 'Rubrique ORGANISME_COMPLEMENTAIRE 1',
          },
        },
      ]);
    });
  });
});
