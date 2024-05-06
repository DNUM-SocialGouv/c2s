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
        fileWeight: '345.55',
      },
      {
        fileName: 'Test_fichier_3',
        fileType: 'EXCEL',
        fileUrl: '********/Test_fichier_3.csv',
        fileWeight: '345.60',
      },
      {
        fileName: 'Test_fichier_5',
        fileType: 'WORD',
        fileUrl: '********/Test_fichier_5.doc',
        fileWeight: '485.55',
      },
      {
        fileName: 'Test_fichier_7',
        fileType: 'PDF',
        fileUrl: '********/Test_fichier_7.pdf',
        fileWeight: '345.55',
      },
      {
        fileName: 'Test_fichier_9',
        fileType: 'EXCEL',
        fileUrl: '********/Test_fichier_9.xls',
        fileWeight: '345.60',
      },
      {
        fileName: 'Test_fichier_10',
        fileType: 'PDF',
        fileUrl: '********/Test_fichier_10.pdf',
        fileWeight: '345.55',
      },
      {
        fileName: 'Test_fichier_13',
        fileType: 'EXCEL',
        fileUrl: '********/Test_fichier_13.csv',
        fileWeight: '345.60',
      },
    ]);
  });
});
