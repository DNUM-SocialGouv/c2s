import { LoginContext } from '@/contexts/LoginContext';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CaisseRessources } from './CaisseRessources';

describe('OcRessources', () => {
  it('should render Loader when not logged in', () => {
    render(
      <LoginContext.Provider
        value={{ isLogged: false, setIsLogged: () => undefined }}
      >
        <CaisseRessources />
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
        <CaisseRessources />
      </LoginContext.Provider>
    );

    const partenairesRessourcesHeaderElement = screen.getByText('Ressources');
    expect(partenairesRessourcesHeaderElement).toBeInTheDocument();
  });
});
