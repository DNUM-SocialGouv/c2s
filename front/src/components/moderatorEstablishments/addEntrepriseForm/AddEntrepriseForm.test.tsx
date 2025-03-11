import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddEntrepriseForm } from './AddEntrepriseForm.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';

jest.mock('../../../RequestInterceptor.tsx', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

describe('AddEntrepriseForm', () => {
  const onFormSubmit = jest.fn();
  const onUpdateCreatedEntrepriseName = jest.fn();

  const renderComponent = () =>
    render(
      <AddEntrepriseForm
        onFormSubmit={onFormSubmit}
        onUpdateCreatedEntrepriseName={onUpdateCreatedEntrepriseName}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form and fields correctly', () => {
    renderComponent();

    expect(screen.getByTestId('siren')).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail de l'organisme")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Téléphone de l'organisme")
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse du siège *')).toBeInTheDocument();
    expect(screen.getByLabelText('Ville *')).toBeInTheDocument();
    expect(screen.getByLabelText('Code postal *')).toBeInTheDocument();
  });

  it('should call onFormSubmit on successful submission', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('siren'), {
      target: { value: '784939688' },
    });

    fireEvent.change(screen.getByLabelText("E-mail de l'organisme"), {
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

    (axiosInstance.post as jest.Mock).mockResolvedValue({
      status: 200,
      data: { nom: 'Entreprise Name' },
    });

    fireEvent.submit(screen.getByTestId('entreprise-form'));

    await waitFor(() => expect(onFormSubmit).toHaveBeenCalled());
  });

  it('should display validation errors for empty required fields', async () => {
    renderComponent();

    fireEvent.submit(screen.getByTestId('entreprise-form'));

    await waitFor(() => {
      expect(
        screen.getByText(/Le numéro SIREN est requis/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/L'adresse est requise/i)).toBeInTheDocument();
      expect(screen.getByText(/La ville est requise/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Le code postal est requis/i)
      ).toBeInTheDocument();
    });
  });

  it('should clear validation errors on field change', async () => {
    renderComponent();

    fireEvent.submit(screen.getByTestId('entreprise-form'));

    fireEvent.change(screen.getByLabelText('Adresse du siège *'), {
      target: { value: '4 Rue des SOURCES' },
    });

    await waitFor(() =>
      expect(
        screen.queryByText("*L'adresse est requise")
      ).not.toBeInTheDocument()
    );
  });
});
