import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ModeratorContent } from './ModeratorContent';

describe('ModeratorContent', () => {
  it('should render tab header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(screen.getByText(`Gestion des contenus`)).toBeInTheDocument();
    expect(screen.getByText(`Le mot de l'équipe C2S`)).toBeInTheDocument();
  });

  it('should render caisse text editor header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(
      screen.getByText(`Bloc éditorial - Caisses d’assurance Maladie`)
    ).toBeInTheDocument();
  });

  it('should render oc text editor header', () => {
    // GIVEN
    render(<ModeratorContent />);
    // THEN
    expect(
      screen.getByText(`Bloc éditorial - Organismes complémentaires`)
    ).toBeInTheDocument();
  });
});
