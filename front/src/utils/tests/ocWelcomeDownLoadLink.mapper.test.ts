import '@testing-library/jest-dom';
import { ocWelcomeFixture } from './ocWelcome.fixtures.ts';
import { ocWelcomeDownLoadLinkMapper } from '../ocWelcomeDownLoadLink.mapper.ts';
import { OcDownLoadLinksFromAPI } from '../../domain/OcAccueil.ts';

describe('ocWelcomeDowloadLinksMapper', () => {
  it('should return expect array of object', () => {
    // GIVEN
    const welcomeLinkListFromAPI: OcDownLoadLinksFromAPI[] =
      ocWelcomeFixture.ressourceFiles;
    // WHEN
    const mappedLinkList = ocWelcomeDownLoadLinkMapper(welcomeLinkListFromAPI);
    // THEN
    expect(mappedLinkList).toMatchObject([
      {
        fileName: 'Test_fichier_1',
        fileType: 'PDF',
        fileUrl: '/api/partenaire/ressources/fichiers/1',
        fileWeight: '3374.47',
      },
      {
        fileName: 'Test_fichier_3',
        fileType: 'CSV',
        fileUrl: '/api/partenaire/ressources/fichiers/3',
        fileWeight: '3375.00',
      },
      {
        fileName: 'Test_fichier_5',
        fileType: 'DOC',
        fileUrl: '/api/partenaire/ressources/fichiers/5',
        fileWeight: '4741.66',
      },
      {
        fileName: 'Test_fichier_7',
        fileType: 'PDF',
        fileUrl: '/api/partenaire/ressources/fichiers/7',
        fileWeight: '3374.47',
      },
      {
        fileName: 'Test_fichier_9',
        fileType: 'XLS',
        fileUrl: '/api/partenaire/ressources/fichiers/9',
        fileWeight: '3375.00',
      },
      {
        fileName: 'Test_fichier_10',
        fileType: 'PDF',
        fileUrl: '/api/partenaire/ressources/fichiers/10',
        fileWeight: '3374.47',
      },
      {
        fileName: 'Test_fichier_13',
        fileType: 'CSV',
        fileUrl: '/api/partenaire/ressources/fichiers/12',
        fileWeight: '3375.00',
      },
    ]);
  });
});
