import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage.tsx';
import fetchMock from 'jest-fetch-mock';

import { ActiveTabProvider } from '@/contexts/ActiveTabContext.tsx';
import { LoginContext } from '@/contexts/LoginContext.tsx';

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

jest.mock('@/hooks/useFetchPartenairesRessources', () => ({
  useFetchPartenairesRessources: () => ({
    loading: false,
    error: true,
  }),
}));

describe('HomePage', () => {
  it('should render a div with the correct class', () => {
    const { container } = render(<HomePage />);
    const divElement = container.querySelector('div');
    // THEN
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass('mt-8');
  });

  it('should render 3 buttons', () => {
    render(<HomePage />);
    const accueilBtn = screen.getAllByText('Accueil')[1];
    const ressourcesBtn = screen.getByText('Ressources');
    const etablissementsBtn = screen.getByText('Mes informations');
    // THEN
    expect(accueilBtn).toBeInTheDocument();
    expect(ressourcesBtn).toBeInTheDocument();
    expect(etablissementsBtn).toBeInTheDocument();
  });

  it('should navigate to Ressources', async () => {
    // GIVEN
    const { getAllByText } = render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ActiveTabProvider>
          <HomePage />
        </ActiveTabProvider>
      </LoginContext.Provider>
    );

    expect(
      screen.getByText(`Le petit mot de l'équipe C2S`)
    ).toBeInTheDocument();
    const partnerRessources = getAllByText('Ressources');
    // WHEN
    fireEvent.click(partnerRessources[0]);

    // THEN
    await waitFor(() => {
      expect(screen.getByText('Référents Gestion C2S')).toBeInTheDocument();
    });
  });
});
