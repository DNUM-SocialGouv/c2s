import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { LPAForm } from './LPAForm';

describe('LPAForm', () => {
  const initialData = {
    id: '',
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

  describe('When isEditing is false', () => {
    beforeEach(() => {
      render(
        <LPAForm
          initialData={initialData}
          onSubmit={onSubmit}
          onDelete={onDelete}
          pageSize={0}
          currentPage={0}
        />
      );
    });

    it('should render the form inputs', () => {
      expect(
        screen.getByLabelText("Nom de l'établissement")
      ).toBeInTheDocument();
      expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
      expect(screen.getByLabelText(/Adresse/)).toBeInTheDocument();
      expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
      expect(screen.getByLabelText('Ville')).toBeInTheDocument();
      expect(screen.getByLabelText('Code postal')).toBeInTheDocument();
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

    it('should call onSubmit with right prams when the form is submitted', () => {
      // GIVEN
      const form = screen.getByTestId('lpa-form');

      // WHEN
      fireEvent.submit(form);

      // THEN
      expect(onSubmit).toHaveBeenCalledWith(initialData, false);
    });
  });

  it('should call onDelete when isEditing is true and the delete button is clicked', () => {
    // GIVEN
    render(
      <LPAForm
        initialData={initialData}
        onSubmit={onSubmit}
        onDelete={onDelete}
        isEditing={true}
        pageSize={0}
        currentPage={0}
      />
    );
    const deleteButton = screen.getByText('Supprimer');

    // WHEN
    fireEvent.click(deleteButton);

    // THEN
    expect(onDelete).toHaveBeenCalled();
  });

  it('should display a rigth PA numéro', () => {
    // GIVEN
    render(
      <LPAForm
        initialData={initialData}
        onSubmit={onSubmit}
        onDelete={onDelete}
        isEditing={true}
        index={3}
        pageSize={10}
        currentPage={5}
      />
    );

    // THEN
    expect(screen.getByText(/point d'accueil N°/)).toBeInTheDocument();

    expect(screen.getByText(/54/)).toBeInTheDocument();
  });
});
