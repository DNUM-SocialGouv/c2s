import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should render the page title', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/Page introuvable/)).toBeInTheDocument();
  });

  it('should render the error message', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText(/La page que vous cherchez est introuvable/)
    ).toBeInTheDocument();
  });

  it('should render the error description', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText(
        /Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil/
      )
    ).toBeInTheDocument();
  });

  it('should render the "Page d\'accueil" link', async () => {
    render(<NotFoundPage />);
    const link = screen.getByRole('link', { name: /Page d'accueil/ });
    expect(link).toBeInTheDocument();
  });
});
