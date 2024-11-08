import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModeratorPage } from './ModeratorPage.tsx';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import { apiResponse } from '../../components/moderatorContent/tests/moderatorContent.fixture.ts';
import MockAdapter from 'axios-mock-adapter';
import fetchMock from 'jest-fetch-mock';
import { LoginContext } from '@/contexts/LoginContext.tsx';

fetchMock.dontMock();

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

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

describe('ModeratorPage', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/moderateur/message/oc').reply(200, {
      users: apiResponse,
    });
  });

  it('should render 7 tabs with their titles', () => {
    // Given
    render(<ModeratorPage />);
    // When
    const tabList = screen.getAllByRole('presentation');
    // Then
    expect(tabList.length).toEqual(7);
  });

  it('should navigate to Accueil tab when button is cliked', async () => {
    // GIVEN
    render(<ModeratorPage />);
    // WHEN
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]);
    // THEN
    const tabTitle = await waitFor(() =>
      screen.getByText('Cet onglet est en cours de développement')
    );
    expect(tabTitle).toBeInTheDocument();
  });

  it('should navigate to Utilisateurs tab when button is cliked', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ModeratorPage />
      </LoginContext.Provider>
    );
    // WHEN
    const utilisateursButton = screen.getByText('Utilisateurs');
    fireEvent.click(utilisateursButton);
    // THEN
    const tabContent = await waitFor(() => screen.getAllByText('Utilisateurs'));
    expect(tabContent).toHaveLength(2);
  });

  it('should navigate to Ressources tab when button is cliked', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ModeratorPage />
      </LoginContext.Provider>
    );
    const ressourcesButton = screen.getByText('Ressources');
    fireEvent.click(ressourcesButton);
    // THEN
    const tabContent = await waitFor(() =>
      screen.getByText('Nouvelle ressource')
    );
    expect(tabContent).toBeInTheDocument();
  });

  it('should navigate to Historique tab when button is cliked', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ModeratorPage />
      </LoginContext.Provider>
    );
    const ressourcesButton = screen.getByText('Historique');
    fireEvent.click(ressourcesButton);
    // THEN
    const tabContent = await waitFor(() =>
      screen.getByText('Historique des actions')
    );
    expect(tabContent).toBeInTheDocument();
  });
});
