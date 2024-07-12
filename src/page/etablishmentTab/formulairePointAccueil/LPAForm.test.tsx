import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { LPAForm } from './LPAForm';

describe('LPAForm', () => {
  const initialData = {
    lpaId: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    adresseComplete: '',
    codePostal: '',
    context: '',
    ville: '',
  };

  const onSubmit = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    render(
      <LPAForm
        initialData={initialData}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    );
  });

  it('should render the form inputs', () => {
    expect(screen.getByLabelText("Nom de l'établissement")).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse')).toBeInTheDocument();
    expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
  });

  it('should display error messages', () => {
    // GIVEN
    const emailInput = screen.getByLabelText('E-mail');

    // WHEN
    fireEvent.change(emailInput, { target: { value: 'invalid' } });

    // THEN
    expect(
      screen.getByText('Veuillez entrer une adresse e-mail valide.')
    ).toBeInTheDocument();
  });

  it('should call onSubmit when the form is submitted', () => {
    // GIVEN
    const form = screen.getByTestId('lpa-form');

    // WHEN
    fireEvent.submit(form);

    // THEN
    expect(onSubmit).toHaveBeenCalled();
  });

  //   it('should call onDelete when the delete button is clicked', () => {
  //     // GIVEN
  //     const deleteButton = screen.getByText('Supprimer');

  //     // WHEN
  //     fireEvent.click(deleteButton);

  //     // THEN
  //     expect(onDelete).toHaveBeenCalled();
  //   });
});
