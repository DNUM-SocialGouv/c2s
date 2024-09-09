import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddEntrepriseForm } from './AddEntrepriseForm';
import { axiosInstance } from '@/RequestInterceptor';

jest.mock('@/RequestInterceptor', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

describe('AddEntrepriseForm', () => {
  const onFormSubmit = jest.fn();

  const renderComponent = () =>
    render(<AddEntrepriseForm onFormSubmit={onFormSubmit} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form and fields correctly', () => {
    renderComponent();

    expect(screen.getByLabelText("Nom de l'organisme *")).toBeInTheDocument();
    expect(screen.getByLabelText(/Siren/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText("E-mail de l'organisme *")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Téléphone de l'organisme")
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse du siège *')).toBeInTheDocument();
    expect(screen.getByLabelText('Ville *')).toBeInTheDocument();
    expect(screen.getByLabelText('Code postal *')).toBeInTheDocument();
  });

  it('should call onFormSubmit on successful submission', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Nom de l'organisme *"), {
      target: { value: 'Test Societe' },
    });
    fireEvent.change(screen.getByLabelText(/Siren/i), {
      target: { value: '123456789' },
    });
    fireEvent.change(screen.getByLabelText("E-mail de l'organisme *"), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText("Téléphone de l'organisme"), {
      target: { value: '0123456789' },
    });
    fireEvent.change(screen.getByLabelText('Adresse du siège *'), {
      target: { value: '123 Rue Heloir' },
    });
    fireEvent.change(screen.getByLabelText('Ville *'), {
      target: { value: 'Paris' },
    });
    fireEvent.change(screen.getByLabelText('Code postal *'), {
      target: { value: '75001' },
    });

    (axiosInstance.post as jest.Mock).mockResolvedValue({});

    fireEvent.submit(screen.getByTestId('entreprise-form'));

    await waitFor(() => expect(onFormSubmit).toHaveBeenCalled());
  });

  it('should display validation errors for empty required fields', async () => {
    renderComponent();

    // Submit form sans donnees
    fireEvent.submit(screen.getByTestId('entreprise-form'));

    expect(
      await screen.findByText("*Le nom de l'organisme est requis")
    ).toBeInTheDocument();
    expect(screen.getByText('*Le numéro SIREN est requis')).toBeInTheDocument();
    expect(screen.getByText("*L'email est requis")).toBeInTheDocument();
    expect(screen.getByText("*L'adresse est requise")).toBeInTheDocument();
    expect(screen.getByText('*La ville est requise')).toBeInTheDocument();
    expect(screen.getByText('*Le code postal est requis')).toBeInTheDocument();
  });

  it('should clear validation errors on field change', async () => {
    renderComponent();

    fireEvent.submit(screen.getByTestId('entreprise-form'));

    fireEvent.change(screen.getByLabelText("Nom de l'organisme *"), {
      target: { value: 'Test Societe' },
    });

    await waitFor(() =>
      expect(
        screen.queryByText("*Le nom de l'organisme est requis")
      ).not.toBeInTheDocument()
    );
  });
});
