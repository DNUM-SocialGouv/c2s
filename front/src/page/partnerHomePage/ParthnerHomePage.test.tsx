import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PartnerHomePage from './PartnerHomePage.tsx';
import { AccountContext } from '../../contexts/AccountContext.tsx';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import { ocWelcomeAPIResponse } from '../../utils/tests/ocWelcome.fixtures.ts';
import fetchMock from 'jest-fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import { LoginContext } from '../../contexts/LoginContext.tsx';

fetchMock.dontMock();
const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
mock.onGet('/partenaire/welcome').reply(200, {
  users: ocWelcomeAPIResponse,
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

describe('PartnerHomePage', () => {
  const deleteAction = jest.fn();
  const setAccountToDelete = jest.fn();
  const accountToDelete = { membreId: 0, email: '' };

  beforeEach(async () => {
    jest.mock('../../hooks/useDeleteAccount.tsx', () => ({
      useDeleteAccount: jest.fn().mockReturnValue({ deleteAction }),
    }));
  });

  it('should render the partner information', () => {
    const { getAllByText } = render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    const partnerInfo = getAllByText('Mes informations');
    expect(partnerInfo[0]).toBeInTheDocument();
  });

  it('should render the partner historique', () => {
    const { getAllByText } = render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    const partnerStats = getAllByText('Historique');
    expect(partnerStats[0]).toBeInTheDocument();
  });

  it('should render the partner Mon équipe', () => {
    const { getAllByText } = render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    const partnerStats = getAllByText('Mon équipe');
    expect(partnerStats[0]).toBeInTheDocument();
  });

  it('should render the partner Mes établissements', () => {
    const { getAllByText } = render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    const partnerStats = getAllByText('Mes établissements');
    expect(partnerStats[0]).toBeInTheDocument();
  });

  it('should navigate to Accueil tab when button is cliked', () => {
    // Given
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane
    // Then
    const tabTitle = screen.getByText(`Le petit mot de l'équipe C2S`);
    const title = screen.getByText(/Ravi de vous retrouver/);

    expect(tabTitle).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('should render information bloc', () => {
    // Given
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane

    // Then
    expect(screen.getAllByText('Mes informations').length).toEqual(2);
  });
  it('should render Mes établissements bloc', async () => {
    // Given
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane

    // The
    expect(screen.getAllByText('Mes établissements').length).toEqual(2);
  });
  it('should render Mon équipe bloc', () => {
    // Given
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <AccountContext.Provider
          value={{ setAccountToDelete, accountToDelete, deleteAction }}
        >
          <PartnerHomePage />
        </AccountContext.Provider>
      </LoginContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane

    // Then
    expect(screen.getAllByText('Mon équipe').length).toEqual(2);
  });
});
