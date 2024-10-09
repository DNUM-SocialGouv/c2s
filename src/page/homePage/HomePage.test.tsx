import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import fetchMock from 'jest-fetch-mock';

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
});
