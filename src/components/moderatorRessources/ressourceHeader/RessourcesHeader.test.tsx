import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RessourcesHeader } from './RessourcesHeader';

describe('RessourcesHeader', () => {
  it('should render the header with correct title and count', () => {
    // Given
    render(<RessourcesHeader />);

    // Then
    expect(screen.getByText(/ressources publiées/)).toBeInTheDocument();
    expect(screen.getByText('Ressources')).toBeInTheDocument();
  });

  it('should render the buttons', () => {
    // Given
    render(<RessourcesHeader />);

    // Then
    expect(screen.getByText('Nouvelle thématique')).toBeInTheDocument();
    expect(screen.getByText('Nouvelle ressource')).toBeInTheDocument();
  });
});
