import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import PartnerHomePage from './PartnerHomePage.tsx';
import { AccountContext } from '../../contexts/AccountContext.tsx';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import { ocWelcomeAPIResponse } from '../../utils/tests/ocWelcome.fixtures.ts';
import fetchMock from 'jest-fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { ActiveTabProvider } from '@/contexts/ActiveTabContext.tsx';

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

afterEach(() => {
  cleanup();
});

describe('PartnerHomePage', () => {
  const deleteAction = jest.fn();
  const setAccountToDelete = jest.fn();
  const accountToDelete = { membreId: 0, email: '' };

  describe('should render the partner home page', () => {
    beforeEach(async () => {
      jest.mock('../../hooks/useDeleteAccount.tsx', () => ({
        useDeleteAccount: jest.fn().mockReturnValue({ deleteAction }),
      }));
    });

    it('should render the loader if user is not logged', () => {
      render(
        <LoginContext.Provider
          value={{
            isLogged: false,
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
      expect(screen.getByRole('alert')).toBeInTheDocument();
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

    it('should render Mon équipe bloc', () => {
      // GIVEN
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

      // THEN
      expect(screen.getAllByText('Mon équipe').length).toEqual(2);
    });
  });

  describe('should navigate on click', () => {
    jest.mock('../../hooks/useFetchPartenairesRessources.tsx', () => ({
      useFetchPartenairesRessources: () => ({
        loading: false,
        error: null,
      }),
    }));

    // it('should navigate to Ressources', async () => {
    //   // GIVEN
    //   const { getAllByText } = render(
    //     <LoginContext.Provider
    //       value={{
    //         isLogged: true,
    //         setIsLogged: () => undefined,
    //       }}
    //     >
    //       <AccountContext.Provider
    //         value={{ setAccountToDelete, accountToDelete, deleteAction }}
    //       >
    //         <ActiveTabProvider>
    //           <PartnerHomePage />
    //         </ActiveTabProvider>
    //       </AccountContext.Provider>
    //     </LoginContext.Provider>
    //   );

    //   expect(
    //     screen.getByText(`Le petit mot de l'équipe C2S`)
    //   ).toBeInTheDocument();
    //   const partnerRessources = getAllByText('Ressources');
    //   // WHEN
    //   fireEvent.click(partnerRessources[0]);

    //   // THEN
    //   await waitFor(() => {
    //     expect(screen.getByText('Référents Gestion C2S')).not.toBeInTheDocument();
    //   });
    // });

    it('should navigate to Mon équipe', async () => {
      // GIVEN
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
            <ActiveTabProvider>
              <PartnerHomePage />
            </ActiveTabProvider>
          </AccountContext.Provider>
        </LoginContext.Provider>
      );

      const partnerTeam = getAllByText('Mon équipe');
      // WHEN
      fireEvent.click(partnerTeam[1]);

      // THEN
      await waitFor(() => {
        expect(
          screen.getByText(/Les membres de votre équipe seront/)
        ).toBeInTheDocument();
      });
    });
  });
});
