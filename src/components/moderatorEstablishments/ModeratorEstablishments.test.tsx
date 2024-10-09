import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import { ModeratorEstablishments } from './ModeratorEstablishments';
import { axiosInstance } from '../../RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';
import { LoginContext } from '@/contexts/LoginContext';

describe('ModeratorEstablishments', () => {
  describe('ModeratorEstablishments when front is logged', () => {
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

    beforeEach(() => {
      render(
        <LoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <ModeratorEstablishments />
        </LoginContext.Provider>
      );
    });

    it('should render the component', () => {
      // THEN
      expect(screen.getByText('Etablissements')).toBeInTheDocument();
    });

    it('should show the add establishment form when the button is clicked', async () => {
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
  });
  describe('ModeratorEstablishments when front is not logged', () => {
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

    beforeEach(() => {
      render(
        <LoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <ModeratorEstablishments />
        </LoginContext.Provider>
      );
    });

    it('should render loader', async () => {
      // THEN
      waitFor(() => expect(screen.getByRole('alert')).toBeVisible());
    });
  });
});
