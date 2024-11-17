import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SiegeForm } from './SiegeForm.tsx';
import { axe, toHaveNoViolations } from 'jest-axe';
import { OcEtablissementsContext } from '@/contexts/ocEtablissementsTab/OcEtablissementsContext.tsx';
import { LoginContext } from '@/contexts/LoginContext.tsx';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '@/RequestInterceptor.tsx';

expect.extend(toHaveNoViolations);

const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });

describe('SiegeForm', () => {
  const SiegeData = {
    nom: 'Test Company',
    locSiren: '775659923',
    email: 'test@example.com',
    siteWeb: 'https://example.com',
    adresse: '123 Test Street',
    groupe: 'oc',
    telephone: '1234567890',
    ocAddedtoLPA: true,
    dateMaj: '',
    totalPAitems: 0,
  };

  const filters = {
    searchQuery: '',
    region: '',
    department: '',
  };

  it('should render component wihtout violation', async () => {
    // GIVEN
    const { container } = render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <OcEtablissementsContext.Provider
          value={{
            count: 0,
            setCount: () => {},
            siegeData: SiegeData,
            setSiegeData: () => {},
            pointsAccueilData: [],
            setPointsAccueilData: () => {},
            filters: filters,
            setFilters: () => {},
            isPAListLoading: false,
            setIsPAListLoading: () => {},
          }}
        >
          <SiegeForm />
        </OcEtablissementsContext.Provider>
      </LoginContext.Provider>
    );

    // WHEN
    const results = await axe(container);

    // THEN
    expect(results).toHaveNoViolations();
  });

  describe('when is logged in', () => {
    it('should render the form inputs', async () => {
      // GIVEN
      render(
        <LoginContext.Provider
          value={{ isLogged: true, setIsLogged: () => undefined }}
        >
          <OcEtablissementsContext.Provider
            value={{
              count: 0,
              setCount: () => {},
              siegeData: SiegeData,
              setSiegeData: () => {},
              pointsAccueilData: [],
              setPointsAccueilData: () => {},
              filters: filters,
              setFilters: () => {},
              isPAListLoading: false,
              setIsPAListLoading: () => {},
            }}
          >
            <SiegeForm />
          </OcEtablissementsContext.Provider>
        </LoginContext.Provider>
      );
      // THEN
      await waitFor(() => {
        expect(screen.getByLabelText(`Nom de l'organisme`)).toBeInTheDocument();
        expect(screen.getByLabelText('Siren')).toBeInTheDocument();
        expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
        expect(screen.getByLabelText('Site web')).toBeInTheDocument();
        expect(screen.getByLabelText('Adresse')).toBeInTheDocument();
        expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
        expect(
          screen.getByLabelText(`Inclure le siège comme un point d'accueil`)
        ).toBeInTheDocument();
      });
    });

    describe('should display error messages', () => {
      beforeEach(() => {
        render(
          <LoginContext.Provider
            value={{ isLogged: true, setIsLogged: () => undefined }}
          >
            <OcEtablissementsContext.Provider
              value={{
                count: 0,
                setCount: () => {},
                siegeData: SiegeData,
                setSiegeData: () => {},
                pointsAccueilData: [],
                setPointsAccueilData: () => {},
                filters: filters,
                setFilters: () => {},
                isPAListLoading: false,
                setIsPAListLoading: () => {},
              }}
            >
              <SiegeForm />
            </OcEtablissementsContext.Provider>
          </LoginContext.Provider>
        );
      });

      it('should display Email error message', () => {
        // GIVEN
        const emailInput = screen.getByLabelText('E-mail');

        // WHEN
        fireEvent.change(emailInput, { target: { value: 'invalid' } });

        // THEN
        expect(
          screen.getByText('Veuillez entrer une adresse e-mail valide.')
        ).toBeInTheDocument();
      });

      it('should display Phone error message', () => {
        // GIVEN
        const phoneInput = screen.getByLabelText('Téléphone');

        // WHEN
        fireEvent.change(phoneInput, { target: { value: 'invalid' } });

        // THEN
        expect(
          screen.getByText('Veuillez entrer un numéro de téléphone valide.')
        ).toBeInTheDocument();
      });
    });

    it('should display informationMessage', () => {
      // GIVEN
      render(
        <OcEtablissementsContext.Provider
          value={{
            count: 0,
            setCount: () => {},
            siegeData: SiegeData,
            setSiegeData: () => {},
            pointsAccueilData: [],
            setPointsAccueilData: () => {},
            filters: filters,
            setFilters: () => {},
            isPAListLoading: false,
            setIsPAListLoading: () => {},
          }}
        >
          <SiegeForm />
        </OcEtablissementsContext.Provider>
      );

      // WHEN
      const informationMessage = screen.getByText(
        /Ne pas cocher la case s’il existe déjà un point d’accueil/
      );

      // THEN
      expect(informationMessage).toBeInTheDocument();
    });

    it('should display error message when the form is submitted', async () => {
      // GIVEN
      mock.onPut('/oc/update').reply(500);
      render(
        <LoginContext.Provider
          value={{ isLogged: true, setIsLogged: () => undefined }}
        >
          <OcEtablissementsContext.Provider
            value={{
              count: 0,
              setCount: () => {},
              siegeData: SiegeData,
              setSiegeData: () => {},
              pointsAccueilData: [],
              setPointsAccueilData: () => {},
              filters: filters,
              setFilters: () => {},
              isPAListLoading: false,
              setIsPAListLoading: () => {},
            }}
          >
            <SiegeForm />
          </OcEtablissementsContext.Provider>
        </LoginContext.Provider>
      );

      const saveBtn = screen.getByRole('button', {
        name: /enregistrer/i,
      });

      // WHEN
      fireEvent.click(saveBtn);

      // THEN
      await waitFor(() => {
        expect('Erreur : Veuillez réessayer ultérieurement').toBeInTheDocument;
      });
    });

    it('should display success message when the form is submitted', async () => {
      // GIVEN
      mock.onPut('/oc/update').reply(200);
      render(
        <LoginContext.Provider
          value={{ isLogged: true, setIsLogged: () => undefined }}
        >
          <OcEtablissementsContext.Provider
            value={{
              count: 0,
              setCount: () => {},
              siegeData: SiegeData,
              setSiegeData: () => {},
              pointsAccueilData: [],
              setPointsAccueilData: () => {},
              filters: filters,
              setFilters: () => {},
              isPAListLoading: false,
              setIsPAListLoading: () => {},
            }}
          >
            <SiegeForm />
          </OcEtablissementsContext.Provider>
        </LoginContext.Provider>
      );

      const saveBtn = screen.getByRole('button', {
        name: /enregistrer/i,
      });

      const phoneInput = await waitFor(() =>
        screen.getByLabelText('Téléphone')
      );
      const emailInput = await waitFor(() => screen.getByLabelText('E-mail'));
      const siteWebInput = await waitFor(() =>
        screen.getByLabelText('Site web')
      );
      const organismeInput = await waitFor(() =>
        screen.getByLabelText(/Nom de l'organisme/)
      );
      const locSirenInput = await waitFor(() => screen.getByLabelText('Siren'));
      const adresseInput = await waitFor(() =>
        screen.getByLabelText('Adresse')
      );

      fireEvent.change(emailInput, { target: { value: 'c2s@c2s.com' } });
      fireEvent.change(phoneInput, { target: { value: '0102030405' } });
      fireEvent.change(siteWebInput, { target: { value: 'monsite.com' } });
      fireEvent.change(organismeInput, { target: { value: SiegeData.nom } });
      fireEvent.change(locSirenInput, {
        target: { value: SiegeData.locSiren },
      });
      fireEvent.change(adresseInput, { target: { value: SiegeData.adresse } });

      // WHEN
      fireEvent.click(saveBtn);

      // THEN
      await waitFor(() => {
        expect(
          screen.getByText(/Le siège est mis à jour./)
        ).toBeInTheDocument();
      });
    });
  });
});
