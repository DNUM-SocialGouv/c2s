import { LoginContext } from '../../contexts/LoginContext';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { CaisseRessources } from './CaisseRessources';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

jest.mock('@/hooks/useFetchPartenairesRessources', () => ({
  useFetchPartenairesRessources: () => ({
    loading: false,
  }),
}));

describe('OcRessources', () => {
  describe('Accessibility', () => {
    it('should pass accessibility standards', async () => {
      // GIVEN
      render(
        <LoginContext.Provider
          value={{ isLogged: true, setIsLogged: () => undefined }}
        >
          <CaisseRessources />
        </LoginContext.Provider>
      );
      // THEN
      const results = await axe(screen.getByTestId('caisseRessources'));
      expect(results).toHaveNoViolations();
    });
  });

  it('should render Loader when not logged in', () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{ isLogged: false, setIsLogged: () => undefined }}
      >
        <CaisseRessources />
      </LoginContext.Provider>
    );
    // THEN
    const loaderElement = screen.getByRole('alert');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should render PartenairesRessourcesHeader when logged in', () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <CaisseRessources />
      </LoginContext.Provider>
    );
    // THEN
    const partenairesRessourcesHeaderElement = screen.getByText('Ressources');
    expect(partenairesRessourcesHeaderElement).toBeInTheDocument();
  });

  it('should render Separator when logged in', () => {
    // WHEN
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <CaisseRessources />
      </LoginContext.Provider>
    );
    // THEN
    waitFor(() => {
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });
  });

  it('should render PartenairesReferentsList when logged in', () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <CaisseRessources />
      </LoginContext.Provider>
    );
    // THEN
    expect(screen.getByText('Référents Gestion C2S')).toBeInTheDocument();
    expect(
      screen.getByText(/Téléchargez la liste complète /)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Télécharger la liste des référents')
    ).toBeInTheDocument();
  });

  it('should render error message when useFetchPartenairesRessources returns an error', () => {
    // GIVEN
    jest.mock('@/hooks/useFetchPartenairesRessources', () => ({
      useFetchPartenairesRessources: () => ({
        loading: false,
        error: true,
      }),
    }));

    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <CaisseRessources />
      </LoginContext.Provider>
    );

    // THEN
    waitFor(() => {
      expect(
        screen.getByText(
          'Une erreur est survenue lors de la récupération des ressources publiées.'
        )
      ).toBeInTheDocument();
    });
  });
});
