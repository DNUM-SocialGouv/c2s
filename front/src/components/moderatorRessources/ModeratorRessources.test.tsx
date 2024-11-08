import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ModeratorRessources } from './ModeratorRessources.tsx';
import fetchMock from 'jest-fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import {
  moderatorRessources,
  moderatorThematiques,
} from '../../utils/tests/moderatorRessources.fixtures.ts';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LoginContext } from '@/contexts/LoginContext.tsx';
import { ModeratorRessourcesContext } from '@/contexts/ModeratorRessourceContext.tsx';

expect.extend(toHaveNoViolations);

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

describe('ModeratorRessources', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/moderateur/thematiques').reply(200, {
      ressources: moderatorRessources,
    });
  });

  it('should pass accessibility tests', async () => {
    const { container } = render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ModeratorRessourcesContext.Provider
          value={{
            thematiques: moderatorThematiques,
            setThematiques: () => undefined,
          }}
        >
          <ModeratorRessources />
        </ModeratorRessourcesContext.Provider>
      </LoginContext.Provider>
    );
    const results = await axe(container);
    await waitFor(() => {
      expect(results).toHaveNoViolations();
    });
  });

  describe('when the user is logged in', () => {
    beforeEach(() => {
      // GIVEN
      render(
        <LoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <ModeratorRessourcesContext.Provider
            value={{
              thematiques: moderatorThematiques,
              setThematiques: () => undefined,
            }}
          >
            <ModeratorRessources />
          </ModeratorRessourcesContext.Provider>
        </LoginContext.Provider>
      );
    });
    it('should render the RessourcesHeader component', async () => {
      await waitFor(() => {
        expect(screen.getByText(/ressources publiées/)).toBeInTheDocument();
      });
    });

    it('should render the RessourceForm component', async () => {
      await waitFor(() => {
        expect(screen.getAllByText('Description de la thématique').length).toBe(
          2
        );
      });
    });

    it('should render 2 thematiques', async () => {
      expect(
        screen.getByText('Rubrique OC 1', { selector: 'h3' })
      ).toBeInTheDocument();
      expect(
        screen.getByText('Rubrique MODERATEUR 1', { selector: 'h3' })
      ).toBeInTheDocument();
    });
  });
});
