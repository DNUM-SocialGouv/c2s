import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ModeratorContent } from '../ModeratorContent.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import MockAdapter from 'axios-mock-adapter';
import { apiResponse } from './moderatorContent.fixture.ts';
import fetchMock from 'jest-fetch-mock';

fetchMock.dontMock();

jest.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    initialized: true,
    keycloak: {
      authenticated: true,
      token: 'fake_token',
      loadUserProfile: () =>
        Promise.resolve({
          id: 'test-id',
          username: 'test-username',
          email: 'test-email',
          firstName: 'test-firstName',
          lastName: 'test-lastName',
        }),
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
      updateToken: jest.fn(),
    },
  }),
}));

describe('ModeratorContent', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/moderateur/message/oc').reply(200, {
      oc: apiResponse,
    });
  });

  it('should render tab header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(screen.getByText(`Gestion des contenus`)).toBeInTheDocument();
  });

  it('should render caisse text editor header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(
      screen.getByText(`Bloc éditorial - Caisses d'assurance Maladie`)
    ).toBeInTheDocument();
  });

  it('should render oc text editor header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(
      screen.getByText(`Bloc éditorial - Organismes complémentaires`)
    ).toBeInTheDocument();
  });
});
