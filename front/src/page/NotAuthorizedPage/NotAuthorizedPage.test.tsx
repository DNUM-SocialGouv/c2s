import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NotAuthorizedPage } from './NotAuthorizedPage.tsx';

expect.extend(toHaveNoViolations);

describe('NotAuthorizedPage', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<NotAuthorizedPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render the page title', () => {
    render(<NotAuthorizedPage />);
    expect(screen.getByText(/Accès non autorisé/)).toBeInTheDocument();
  });

  it('should render the error message', () => {
    render(<NotAuthorizedPage />);
    expect(
      screen.getByText(/Vous n'êtes pas autorisé à accéder à cette page/)
    ).toBeInTheDocument();
  });

  it('should render the error description', () => {
    render(<NotAuthorizedPage />);
    expect(
      screen.getByText(
        /Veuillez vous connecter avec les bons identifiants pour accéder à cette page/
      )
    ).toBeInTheDocument();
  });

  it('should render the "Page d\'accueil" link', () => {
    render(<NotAuthorizedPage />);
    expect(
      screen.getByRole('link', { name: /Page d'accueil/ })
    ).toBeInTheDocument();
  });
});
