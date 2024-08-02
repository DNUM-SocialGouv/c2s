import '@testing-library/jest-dom';
import { ocWelcomeFixture } from './ocWelcome.fixtures';
import { ocWelcomeDownLoadLinkMapper } from '../ocWelcomeDownLoadLink.mapper';
import { OcDownLoadLinksFromAPI } from '@/domain/OcAccueil';

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
        fileUrl: '/api/partenaire/ressource/fichier/1',
        fileWeight: '345.55',
      },
      {
        fileName: 'Test_fichier_3',
        fileType: 'CSV',
        fileUrl: '/api/partenaire/ressource/fichier/3',
        fileWeight: '345.60',
      },
      {
        fileName: 'Test_fichier_5',
        fileType: 'DOC',
        fileUrl: '/api/partenaire/ressource/fichier/5',
        fileWeight: '485.55',
      },
      {
        fileName: 'Test_fichier_7',
        fileType: 'PDF',
        fileUrl: '/api/partenaire/ressource/fichier/7',
        fileWeight: '345.55',
      },
      {
        fileName: 'Test_fichier_9',
        fileType: 'XLS',
        fileUrl: '/api/partenaire/ressource/fichier/9',
        fileWeight: '345.60',
      },
      {
        fileName: 'Test_fichier_10',
        fileType: 'PDF',
        fileUrl: '/api/partenaire/ressource/fichier/10',
        fileWeight: '345.55',
      },
      {
        fileName: 'Test_fichier_13',
        fileType: 'CSV',
        fileUrl: '/api/partenaire/ressource/fichier/12',
        fileWeight: '345.60',
      },
    ]);
  });
});
