import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LPAForm } from './LPAForm';

const mockStore = configureStore([]);

describe('LPAForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnDelete = jest.fn();

  const initialProps = {
    initialData: {
      id: '',
      nom: '',
      email: '',
      telephone: '',
      adresse: '',
      adresse2: '',
      adresse3: '',
      cedex: '',
      adresseComplete: '',
      codePostal: '',
      context: '',
      ville: '',
    },
    onSubmit: mockOnSubmit,
    onDelete: mockOnDelete,
    pageSize: 10,
    currentPage: 1,
  };

  const store = mockStore({
    ocInfo: {
      error: null,
    },
  });

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnDelete.mockClear();
  });

  it('renders the form with all required fields', async () => {
    render(
      <Provider store={store}>
        <LPAForm {...initialProps} />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByLabelText(/Nom de l'établissement/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/N° et libellé de la voie/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Téléphone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Code postal/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Ville/i)).toBeInTheDocument();
    });
  });

  it('disables submit button when required fields are empty', () => {
    render(
      <Provider store={store}>
        <LPAForm {...initialProps} />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Ajouter/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when all required fields are filled correctly', async () => {
    render(
      <Provider store={store}>
        <LPAForm {...initialProps} />
      </Provider>
    );

    await waitFor(() => {
      const nomInput = screen.getByLabelText(/Nom de l'établissement/i);
      const adresseInput = screen.getByLabelText(/N° et libellé de la voie/i);
      const telephoneInput = screen.getByLabelText(/Téléphone/i);
      const emailInput = screen.getByLabelText(/E-mail/i);
      const submitButton = screen.getByRole('button', { name: /Ajouter/i });
      fireEvent.change(nomInput, { target: { value: 'Test Etablissement' } });
      fireEvent.change(adresseInput, { target: { value: '123 Test Street' } });
      fireEvent.change(telephoneInput, { target: { value: '0612345678' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(submitButton).toBeEnabled();
    });
  });

  it('shows error messages for invalid email and phone', () => {
    render(
      <Provider store={store}>
        <LPAForm {...initialProps} />
      </Provider>
    );

    const telephoneInput = screen.getByLabelText(/Téléphone/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const submitButton = screen.getByRole('button', { name: /Ajouter/i });

    fireEvent.change(telephoneInput, { target: { value: 'invalid phone' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    expect(
      screen.getByText(/Veuillez entrer un numéro de téléphone valide/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Veuillez entrer une adresse e-mail valide/i)
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('calls onSubmit when form is submitted with valid data', async () => {
    render(
      <Provider store={store}>
        <LPAForm {...initialProps} />
      </Provider>
    );

    await waitFor(() => {
      const nomInput = screen.getByLabelText(/Nom de l'établissement/i);
      const adresseInput = screen.getByLabelText(/N° et libellé de la voie/i);
      const telephoneInput = screen.getByLabelText(/Téléphone/i);
      const emailInput = screen.getByLabelText(/E-mail/i);
      const submitButton = screen.getByRole('button', { name: /Ajouter/i });

      fireEvent.change(nomInput, { target: { value: 'Test Etablissement' } });
      fireEvent.change(adresseInput, { target: { value: '123 Test Street' } });
      fireEvent.change(telephoneInput, { target: { value: '0612345678' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      fireEvent.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onDelete when delete button is clicked in edit mode', () => {
    const editProps = {
      ...initialProps,
      isEditing: true,
      initialData: {
        ...initialProps.initialData,
        id: '123',
        nom: 'Existing Etablissement',
        email: 'existing@example.com',
        telephone: '0612345678',
        adresse: '456 Existing Street',
      },
    };

    render(
      <Provider store={store}>
        <LPAForm {...editProps} />
      </Provider>
    );

    const deleteButton = screen.getByRole('button', { name: /Supprimer/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('123');
  });
});
