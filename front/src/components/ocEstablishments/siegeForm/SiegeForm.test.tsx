import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { SiegeForm } from './SiegeForm';
import { FormDataOC } from '../../../domain/OcEstablishments';
import { axiosInstance } from '../../../RequestInterceptor';

jest.mock('../../../RequestInterceptor', () => ({
  axiosInstance: {
    put: jest.fn(),
  },
}));

describe('SiegeForm Component', () => {
  const mockOcInfos: FormDataOC = {
    id: '1',
    locSiren: '123456789',
    nom: 'Entreprise Test',
    email: 'test@example.com',
    telephone: '0123456789',
    adresse: '123 Rue Test',
    groupe: 'ORGANISME_COMPLEMENTAIRE',
    siteWeb: 'https://example.com',
    ocAddedtoLPA: true,
    dateMaj: '2023-01-01',
    dateCrea: '2020-01-01',
    totalPAitems: 5,
    codePostal: '75001',
    ville: 'Paris',
  };

  it('renders the form fields with default values', () => {
    render(<SiegeForm ocInfos={mockOcInfos} />);
    expect(screen.getByLabelText(/Adresse/i)).toHaveValue(mockOcInfos.adresse);
    expect(screen.getByLabelText(/Code postal/i)).toHaveValue(
      mockOcInfos.codePostal
    );
    expect(screen.getByLabelText(/Ville/i)).toHaveValue(mockOcInfos.ville);
    expect(screen.getByLabelText(/Siren/i)).toHaveValue(mockOcInfos.locSiren);
    expect(screen.getByLabelText(/Téléphone/i)).toHaveValue(
      mockOcInfos.telephone
    );
    expect(screen.getByLabelText(/E-mail/i)).toHaveValue(mockOcInfos.email);
    expect(screen.getByLabelText(/Site web/i)).toHaveValue(mockOcInfos.siteWeb);
  });

  it('submits the form successfully and displays a success message', async () => {
    (axiosInstance.put as jest.Mock).mockResolvedValueOnce({ data: {} });

    render(<SiegeForm ocInfos={mockOcInfos} />);

    await act(async () => {
      fireEvent.submit(screen.getByTestId('entreprise-form'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('Informations modifiées avec succès')
      ).toBeInTheDocument();
    });
  });

  it('shows an error message when the API call fails', async () => {
    (axiosInstance.put as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    render(<SiegeForm ocInfos={mockOcInfos} />);

    await act(async () => {
      fireEvent.submit(screen.getByTestId('entreprise-form'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('Une erreur est survenue, la modification a échoué')
      ).toBeInTheDocument();
    });
  });

  it('validates required fields and shows error messages', async () => {
    render(<SiegeForm ocInfos={{ ...mockOcInfos, nom: '' }} />);

    await act(async () => {
      fireEvent.submit(screen.getByTestId('entreprise-form'));
    });

    await waitFor(() => {
      expect(screen.getByText('*Le nom est requis')).toBeInTheDocument();
    });
  });
});
