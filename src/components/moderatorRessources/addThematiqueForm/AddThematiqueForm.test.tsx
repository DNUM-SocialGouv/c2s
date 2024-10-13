import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AddThematiqueForm } from './AddThematiqueForm';

jest.mock('axios');

describe('AddThematiqueForm', () => {
  it('should render the form with the correct inputs', () => {
    // GIVEN
    render(
      <AddThematiqueForm
        onClickCancel={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    const titreInput = screen.getByLabelText('Nom de la thématique');
    const descriptionInput = screen.getByLabelText(
      'Description de la thématique'
    );
    const input = screen.getByLabelText('Organisme complémentaire');

    // THEN
    expect(titreInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
