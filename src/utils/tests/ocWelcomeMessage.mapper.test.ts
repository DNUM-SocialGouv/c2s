import '@testing-library/jest-dom';
import { ocWelcomeAPIResponse } from './ocWelcome.fixtures';
import {
  OcWelcomeMessageFromAPI,
  ocWelcomeMessageMapper,
} from '../ocWelcomeMessage.mapper';

describe('ocWelcomeMessageMapper', () => {
  it('should return expect object', () => {
    // GIVEN
    const welcomeMessageFromAPI: OcWelcomeMessageFromAPI =
      ocWelcomeAPIResponse.messageAccueil;
    // WHEN
    const mappedMessage = ocWelcomeMessageMapper(welcomeMessageFromAPI);
    // THEN
    expect(mappedMessage).toMatchObject({
      content: 'Bienvenu OC 2',
      updateDate: '6/30/2023',
    });
  });
});
