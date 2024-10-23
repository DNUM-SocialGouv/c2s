import '@testing-library/jest-dom';
import { ocWelcomeAPIResponse } from './ocWelcome.fixtures.ts';
import {
  dateFormatter,
  ocWelcomeMessageMapper,
} from '../ocWelcomeMessage.mapper.ts';
import { OcWelcomeMessageFromAPI } from '../../domain/OcAccueil.ts';

describe('ocWelcomeMessageMapper', () => {
  it('should return expected object', () => {
    // GIVEN
    const welcomeMessageFromAPI: OcWelcomeMessageFromAPI =
      ocWelcomeAPIResponse.messageAccueil;
    // WHEN
    const mappedMessage = ocWelcomeMessageMapper(welcomeMessageFromAPI);
    // THEN
    expect(mappedMessage).toMatchObject({
      content: 'Bienvenu OC 2',
      updateDate: '30 juin 2023',
    });
  });

  it('should return expected date', () => {
    // GIVEN
    const welcomeMessageFromAPI: OcWelcomeMessageFromAPI = {
      id: 14,
      contenu: 'Bienvenu OC 2 Second message test with credential test 2',
      groupe: 'ORGANISME_COMPLEMENTAIRE',
      dateCrea: '2024-06-04T16:46:31.722989',
      dateMaj: null,
    };
    // WHEN
    const date = dateFormatter(welcomeMessageFromAPI.dateCrea);
    // THEN
    expect(date).toBe('4 juin 2024');
  });
});
