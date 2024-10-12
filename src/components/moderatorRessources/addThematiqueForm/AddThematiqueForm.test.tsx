import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AddThematiqueForm } from './AddThematiqueForm';

jest.mock('axios');

describe('AddThematiqueForm', () => {
  it('should render the form with the correct inputs', () => {
    render(<AddThematiqueForm />);

    const titreInput = screen.getByLabelText('Nom de la thématique');
    const descriptionInput = screen.getByLabelText(
      'Description de la thématique'
    );
    const input = screen.getByLabelText('Organisme complémentaire');

    expect(titreInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
