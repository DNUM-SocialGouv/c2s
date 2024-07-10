import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ModeratorRessources } from '../ModeratorRessources';
import fetchMock from 'jest-fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '@/RequestInterceptor';
import { moderatorRessources } from './moderatorRessources.fixtures';
import { axe, toHaveNoViolations } from 'jest-axe';
//import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';

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

    // const mockRessourcesFiles = new MockAdapter(axiosInstance, {
    //   delayResponse: 200,
    // });
    // mockRessourcesFiles.onGet('/moderateur/fichiers').reply(200, {
    //   data: ocWelcomeAPIResponse,
    // });
  });

  it('should pass accessibility tests', async () => {
    const { container } = render(<ModeratorRessources />);
    const results = await axe(container);
    waitFor(() => {
      expect(results).toHaveNoViolations();
    });
  });

  it('should render the RessourcesHeader component', () => {
    render(<ModeratorRessources />);
    waitFor(() => {
      expect(screen.getByText(/ressources publiées/)).toBeInTheDocument();
    });
  });

  it('should render the RessourceForm component', () => {
    render(<ModeratorRessources />);
    waitFor(() => {
      expect(screen.getByText('évolutions juridiques')).toBeInTheDocument();
    });
  });

  describe('should render 4 thematique', () => {
    it('should render Rubrique OC 1', () => {
      render(<ModeratorRessources />);
      waitFor(() => {
        expect(screen.getByText('Rubrique OC 1')).toBeInTheDocument();
      });
    });

    it('should render Rubrique OC 2', () => {
      render(<ModeratorRessources />);
      waitFor(() => {
        expect(screen.getByText('Rubrique OC 2')).toBeInTheDocument();
      });
    });
    it('should render Rubrique OC 1', () => {
      render(<ModeratorRessources />);
      waitFor(() => {
        expect(screen.getByText('Rubrique Caisse 1')).toBeInTheDocument();
      });
    });

    it('should render Rubrique OC 2', () => {
      render(<ModeratorRessources />);
      waitFor(() => {
        expect(screen.getByText('Rubrique Caisse 2')).toBeInTheDocument();
      });
    });
  });
});
