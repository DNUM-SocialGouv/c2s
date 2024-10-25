import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { LoginContext } from '@/contexts/LoginContext';
import { OcRessources } from './OcRessources';

describe('OcRessources', () => {
  it('should render Loader when not logged in', () => {
    render(
      <LoginContext.Provider
        value={{ isLogged: false, setIsLogged: () => undefined }}
      >
        <OcRessources />
      </LoginContext.Provider>
    );

    const loaderElement = screen.getByRole('alert');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should render PartenairesRessourcesHeader when logged in', () => {
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <OcRessources />
      </LoginContext.Provider>
    );

    const partenairesRessourcesHeaderElement = screen.getByText('Ressources');
    expect(partenairesRessourcesHeaderElement).toBeInTheDocument();
  });

  it('should render Separator when logged in', () => {
    // WHEN
    render(
      <LoginContext.Provider
        value={{ isLogged: true, setIsLogged: () => undefined }}
      >
        <OcRessources />
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
});
