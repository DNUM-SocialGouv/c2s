import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { LoginContext } from '../../contexts/LoginContext';
import { OcRessources } from './OcRessources';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
jest.mock('../../hooks/useFetchPartenairesRessources', () => ({
  useFetchPartenairesRessources: () => ({
    loading: false,
    error: true,
  }),
}));

describe('OcRessources', () => {
  describe('Accessibility', () => {
    it('should pass accessibility standards', async () => {
      render(
        <LoginContext.Provider
          value={{ isLogged: true, setIsLogged: () => undefined }}
        >
          <OcRessources />
        </LoginContext.Provider>
      );

      const results = await axe(screen.getByTestId('ocRessources'));
      expect(results).toHaveNoViolations();
    });
  });

  it('should render Loader when not logged in', () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{ isLogged: false, setIsLogged: () => undefined }}
      >
        <OcRessources />
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
        <OcRessources />
      </LoginContext.Provider>
    );
    // THEN
    const partenairesRessourcesHeaderElement = screen.getByText('Ressources');
    expect(partenairesRessourcesHeaderElement).toBeInTheDocument();
  });

  it('should render Separators when logged in', () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <OcRessources />
      </LoginContext.Provider>
    );
    // THEN
    const separators = screen.getAllByTestId('separator');
    expect(separators.length).toBe(3);
  });

  it('should render PartenairesReferentsList when logged in', () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <OcRessources />
      </LoginContext.Provider>
    );
    // WHEN
    expect(screen.getByText('Référents Gestion C2S')).toBeInTheDocument();
    expect(
      screen.getByText(/Téléchargez la liste complète /)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Télécharger la liste des référents')
    ).toBeInTheDocument();
  });

  it('should render error message when useFetchPartenairesRessources returns an error', async () => {
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <OcRessources />
      </LoginContext.Provider>
    );

    // THEN
    await waitFor(() => {
      expect(
        screen.getByText(
          'Une erreur est survenue lors de la récupération des ressources publiées.'
        )
      ).toBeInTheDocument();
    });
  });
});
