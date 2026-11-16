import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { ModeratorPage } from './ModeratorPage.tsx';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import {
  moderatorRessources,
  moderatorThematiques,
} from '../../utils/tests/moderatorRessources.fixtures.ts';
import MockAdapter from 'axios-mock-adapter';
import fetchMock from 'jest-fetch-mock';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { ActiveTabProvider } from '../../contexts/ActiveTabContext.tsx';

fetchMock.enableMocks();

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
  let mock: MockAdapter;

  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse('');
    mock = new MockAdapter(axiosInstance, {
      onNoMatch: 'throwException',
    });
    mock.onGet('/moderateur/welcome').reply(200, {
      membresAModerer: [],
      membresActifCount: 0,
      organisationsActifCount: 0,
      pointAccueilActifCount: 0,
    });
    mock.onGet('/moderateur/membres/home').reply(200, { membreCount: 0 });
    mock.onGet(/^\/moderateur\/membres\?/).reply(200, {
      list: [],
      count: 0,
    });
    mock.onGet('/moderateur/thematiques').reply(200, moderatorThematiques);
    mock.onGet('/moderateur/fichiers/').reply(200, moderatorRessources);
    for (const id of [
      0,
      ...moderatorThematiques.map((thematique) => thematique.id),
    ]) {
      mock.onGet(`/moderateur/fichiers/search?thematiqueId=${id}`).reply(
        200,
        moderatorRessources.filter(
          (ressource) => ressource.thematique.id === id
        )
      );
    }
    mock.onGet(/^\/moderateur\/operations\/search\?/).reply(200, {
      list: [],
      count: 0,
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should render 7 tabs with their titles', () => {
    // Given
    render(
      <ActiveTabProvider>
        <ModeratorPage />
      </ActiveTabProvider>
    );
    // When
    const tabList = screen.getAllByRole('presentation');
    // Then
    expect(tabList.length).toEqual(7);
  });

  it('should navigate to Accueil tab when button is clicked', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ActiveTabProvider>
          <ModeratorPage />
        </ActiveTabProvider>
      </LoginContext.Provider>
    );
    // WHEN
    const homeButton = screen.getAllByText('Accueil');
    await act(async () => {
      fireEvent.click(homeButton[1]);
    });
    // THEN
    const tabTitle = await waitFor(() =>
      screen.getByText(/Ravi de vous retrouver/i)
    );
    expect(tabTitle).toBeInTheDocument();
  });

  it('should navigate to Utilisateurs tab when button is clicked', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ActiveTabProvider>
          <ModeratorPage />
        </ActiveTabProvider>
      </LoginContext.Provider>
    );
    // WHEN
    const utilisateursButton = screen.getAllByText('Utilisateurs');
    await act(async () => {
      fireEvent.click(utilisateursButton[0]);
    });
    // THEN
    const tabContent = await waitFor(() => screen.getAllByText('Utilisateurs'));
    expect(tabContent).toHaveLength(2);
  });

  it('should navigate to Ressources tab when button is clicked', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ActiveTabProvider>
          <ModeratorPage />
        </ActiveTabProvider>
      </LoginContext.Provider>
    );
    const ressourcesButton = screen.getByText('Ressources');
    await act(async () => {
      fireEvent.click(ressourcesButton);
    });
    // THEN
    const tabContent = await waitFor(() =>
      screen.getByText('Nouvelle ressource')
    );
    expect(tabContent).toBeInTheDocument();
  });

  it('should navigate to Historique tab when button is clicked', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ActiveTabProvider>
          <ModeratorPage />
        </ActiveTabProvider>
      </LoginContext.Provider>
    );
    const historiqueButton = screen.getByText('Historique');
    await act(async () => {
      fireEvent.click(historiqueButton);
    });
    // THEN
    const tabContent = await waitFor(() =>
      screen.getByText('Historique des actions')
    );
    expect(tabContent).toBeInTheDocument();
    expect(screen.getByText("Pas d'actions à afficher")).toBeInTheDocument();
  });
});
