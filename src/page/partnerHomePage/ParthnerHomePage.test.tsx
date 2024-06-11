import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PartnerHomePage from './PartnerHomePage';
import { AccountContext } from '@/contexts/AccountContext';
import { axiosInstance } from '../../RequestInterceptor';
import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';
import fetchMock from 'jest-fetch-mock';
import MockAdapter from 'axios-mock-adapter';

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
  const accountToDelete = { membreId: '', login: '', email: '' };

  beforeEach(async () => {
    jest.mock('../../hooks/useDeleteAccount', () => ({
      useDeleteAccount: jest.fn().mockReturnValue({ deleteAction }),
    }));
  });

  it('should render the partner information', () => {
    const { getByText } = render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    const partnerInfo = getByText('Mes informations');
    expect(partnerInfo).toBeInTheDocument();
  });

  it('should render the partner historique', () => {
    const { getByText } = render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    const partnerStats = getByText('Historique');
    expect(partnerStats).toBeInTheDocument();
  });

  it('should render the partner Mon équipe', () => {
    const { getByText } = render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    const partnerStats = getByText('Mon équipe');
    expect(partnerStats).toBeInTheDocument();
  });

  it('should render the partner Mes établissements', () => {
    const { getByText } = render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    const partnerStats = getByText('Mes établissements');
    expect(partnerStats).toBeInTheDocument();
  });

  it('should navigate to Accueil tab when button is cliked', async () => {
    // Given
    render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane
    // Then
    const tabTitle = await waitFor(() =>
      screen.getByText(`Le petit mot de l'équipe C2S`)
    );

    const title = await waitFor(() =>
      screen.getByText(/Ravi de vous retrouver/)
    );

    expect(tabTitle).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('should render information bloc', () => {
    // Given
    render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane

    // THEN
    expect(screen.getAllByText('Mes informations').length).toEqual(2);
  });
  it('should render Mes établissements bloc', () => {
    // Given
    render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane

    // THEN
    expect(screen.getAllByText('Mes établissements').length).toEqual(2);
  });
  it('should render Mon équipe bloc', () => {
    // Given
    render(
      <AccountContext.Provider
        value={{ setAccountToDelete, accountToDelete, deleteAction }}
      >
        <PartnerHomePage />
      </AccountContext.Provider>
    );
    // When
    const homeButton = screen.getAllByText('Accueil');
    fireEvent.click(homeButton[1]); // Accueil est present dans le fil d'ariane

    // THEN
    expect(screen.getAllByText('Mon équipe').length).toEqual(2);
  });
});