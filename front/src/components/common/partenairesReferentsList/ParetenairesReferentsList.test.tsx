import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PartenairesReferentsList } from './PartenairesReferentsList';

jest.mock('axios');

describe('PartenairesReferentsList', () => {
  // GIVEN
  it('should render the component', () => {
    render(<PartenairesReferentsList />);
    const titleElement = screen.getByText('Référents Gestion C2S');
    const descriptionElement = screen.getByText(
      'Téléchargez la liste complète des référents Gestion C2S de chaque organisme complémentaire'
    );
    const buttonElement = screen.getByText(
      'Télécharger la liste des référents'
    );
    // THEN
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
