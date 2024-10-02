import { moderatorRessources } from '@/components/moderatorRessources/tests/moderatorRessources.fixtures';
import {
  findThematiqueById,
  moderatorThematiqueLinkFromAPIResponse,
} from '../moderatorThematiquesRessources.helper';
describe('moderatorThematiquesRessources helper', () => {
  describe('findThematiqueById', () => {
    it('should find thematique by id', () => {
      //When
      const thematique = findThematiqueById(moderatorRessources, 1);
      // Then
      expect(thematique).toMatchObject({
        id: 1,
        titre: 'Rubrique OC 1',
        description: 'Description 1',
        groupe: 'ORGANISME_COMPLEMENTAIRE',
        ordre: 1,
        publique: false,
      });
    });
  });

  describe('moderatorThematiqueLinkFromAPIResponse', () => {
    it('should return an array of ressource for given thematique', () => {
      //When
      const ressourcesFilesForThematique =
        moderatorThematiqueLinkFromAPIResponse(1, moderatorRessources);
      // Then
      expect(ressourcesFilesForThematique).toEqual([
        {
          ressourceFichierId: 1,
          thematique: {
            ressourceThematiqueId: 1,
            titre: 'Rubrique OC 1',
            description: 'Description 1',
            cible: 'OC',
            ordre: 1,
            publique: false,
          },
          repertoire: '********',
          nom: 'Test_fichier_1',
          taille: 3455455,
          extension: 'pdf',
          dateCrea: '2021-01-30T11:03:16',
          dateMaj: '2021-02-28T11:03:16',
          type: 'PDF',
        },
        {
          ressourceFichierId: 5,
          thematique: {
            ressourceThematiqueId: 1,
            titre: 'Rubrique OC 1',
            description: 'Description 1',
            cible: 'OC',
            ordre: 1,
            publique: false,
          },
          repertoire: '********',
          nom: 'Test_fichier_5',
          taille: 4855455,
          extension: 'doc',
          dateCrea: '2021-05-30T11:03:16',
          dateMaj: '2021-06-30T11:03:16',
          type: 'WORD',
        },
        {
          ressourceFichierId: 9,
          thematique: {
            ressourceThematiqueId: 1,
            titre: 'Rubrique OC 1',
            description: 'Description 1',
            cible: 'OC',
            ordre: 1,
            publique: false,
          },
          repertoire: '********',
          nom: 'Test_fichier_9',
          taille: 3455999,
          extension: 'xls',
          dateCrea: '2021-09-30T11:03:16',
          dateMaj: '2021-10-30T11:03:16',
          type: 'EXCEL',
        },
        {
          ressourceFichierId: 10,
          thematique: {
            ressourceThematiqueId: 1,
            titre: 'Rubrique OC 1',
            description: 'Description 1',
            cible: 'OC',
            ordre: 1,
            publique: false,
          },
          repertoire: '********',
          nom: 'Test_fichier_10',
          taille: 3455455,
          extension: 'pdf',
          dateCrea: '2021-10-30T11:03:16',
          dateMaj: '2021-11-30T11:03:16',
          type: 'PDF',
        },
      ]);
    });
  });
});
