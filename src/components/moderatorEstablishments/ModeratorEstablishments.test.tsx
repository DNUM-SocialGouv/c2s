import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModeratorEstablishments } from './ModeratorEstablishments';
import fetchMock from 'jest-fetch-mock';
import { axiosInstance } from '../../RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';

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

describe('ModeratorEstablishments', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock.onGet('/moderateur/etablissements/home').reply(200, {
      data: {
        ocActifsCount: 0,
        pointsAccueilCount: 0,
        etablissementTypes: {
          additionalProp1: 'props',
          additionalProp2: 'pros',
          additionalProp3: 'props',
        },
        regions: ['région 1'],
        departements: ['Paris'],
      },
    });
  });

  it('should render the component', () => {
    // WHEN
    render(<ModeratorEstablishments />);

    // THEN
    expect(screen.getByText('Etablissements')).toBeInTheDocument();
  });

  it('should show the add establishment form when the button is clicked', () => {
    // GIVEN
    render(<ModeratorEstablishments />);
    const addButton = screen.getByText('Nouvel organisme');

    // WHEN
    fireEvent.click(addButton);

    // THEN
    waitFor(() =>
      expect(
        screen.getByText('Ajouter un nouvel etablissement')
      ).toBeInTheDocument()
    );
  });

  it('should display error message', async () => {
    // GIVEN
    render(<ModeratorEstablishments />);
    const addButton = screen.getByText('Nouvel organisme');

    waitFor(() => fireEvent.click(addButton));

    const establishmentNameInput =
      screen.getByLabelText(`Nom de l'organisme *`);
    const submitButton = screen.getByText('Confirmer');

    // WHEN
    fireEvent.change(establishmentNameInput, {
      target: { value: 'Test Establishment' },
    });

    waitFor(() => fireEvent.click(submitButton));

    // THEN
    waitFor(() => {
      expect(
        screen.getByText('Veuillez sélectionner un Type d’établissement')
      ).toBeInTheDocument();
    });
  });
});
