import '@testing-library/jest-dom';
import { ocWelcomeAPIResponse } from './ocWelcome.fixtures';
import {
  OcDownLoadLinksFromAPI,
  ocWelcomeDownLoadLinkMapper,
} from '../ocWelcomeDownLoadLink.mapper';

describe('ocWelcomeDowloadLinksMapper', () => {
  it('should return expect array of object', () => {
    // GIVEN
    const welcomeLinkListFromAPI: OcDownLoadLinksFromAPI[] =
      ocWelcomeAPIResponse.ressourceFiles;
    // WHEN
    const mappedLinkList = ocWelcomeDownLoadLinkMapper(welcomeLinkListFromAPI);
    // THEN
    expect(mappedLinkList).toMatchObject([
      {
        fileName: 'Test_fichier_1',
        fileType: 'PDF',
        fileUrl: '********/Test_fichier_1.pdf',
        fileWeigth: '346',
      },
      {
        fileName: 'Test_fichier_3',
        fileType: 'EXCEL',
        fileUrl: '********/Test_fichier_3.csv',
        fileWeigth: '346',
      },
      {
        fileName: 'Test_fichier_5',
        fileType: 'WORD',
        fileUrl: '********/Test_fichier_5.doc',
        fileWeigth: '486',
      },
      {
        fileName: 'Test_fichier_7',
        fileType: 'PDF',
        fileUrl: '********/Test_fichier_7.pdf',
        fileWeigth: '346',
      },
      {
        fileName: 'Test_fichier_9',
        fileType: 'EXCEL',
        fileUrl: '********/Test_fichier_9.xls',
        fileWeigth: '346',
      },
      {
        fileName: 'Test_fichier_10',
        fileType: 'PDF',
        fileUrl: '********/Test_fichier_10.pdf',
        fileWeigth: '346',
      },
      {
        fileName: 'Test_fichier_13',
        fileType: 'EXCEL',
        fileUrl: '********/Test_fichier_13.csv',
        fileWeigth: '346',
      },
    ]);
  });
});
