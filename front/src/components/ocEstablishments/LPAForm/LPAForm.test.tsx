import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { LPAForm } from './LPAForm';
import { axiosInstance } from '../../../RequestInterceptor';
import { OcEstablishmentContext } from '../../../contexts/OcEstablishmentContext';

// Mock the axios instance and context
jest.mock('../../../RequestInterceptor', () => ({
  axiosInstance: {
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock context provider
const mockContextValue = {
  setSiren: jest.fn(),
  establishments: [],
  totalEstablishments: 0,
  totalPages: 0,
  loading: false,
  error: null,
  fetchEstablishments: jest.fn(),
  siren: '',
  region: '',
  setRegion: jest.fn(),
  departement: '',
  setDepartement: jest.fn(),
  search: '',
  setSearch: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
  refetchEstablishments: jest.fn(),
  resetEstablishments: jest.fn(),
};

// Sample default values for testing
const mockPADefaultValues = {
  id: '1',
  nom: 'Test Establishment',
  email: 'test@example.com',
  telephone: '0612345678',
  adresse: '123 Test Street',
  adresse2: 'Complement',
  adresse3: 'Additional Info',
  cedex: '75001',
  codePostal: '75001',
  ville: 'Paris',
  adresseComplete: '',
  context: '',
  region: 'Test Region',
  departement: 'Test Department',
};

const renderComponent = (props = {}) => {
  return render(
    <OcEstablishmentContext.Provider value={mockContextValue}>
      <LPAForm
        action="update"
        PADefaultValues={mockPADefaultValues}
        {...props}
      />
    </OcEstablishmentContext.Provider>
  );
};

describe('LPAForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ... (previous tests remain the same)

  it('deletes a point of welcome when delete button is clicked', async () => {
    (axiosInstance.delete as jest.Mock).mockResolvedValueOnce({ data: {} });

    renderComponent();

    // Find and click the delete button
    const deleteButton = screen.getByText(/Supprimer/i);

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Wait for the confirmation dialog to appear
    await waitFor(() => {
      const confirmButton = screen.getByText(/Confirmer/i);
      expect(confirmButton).toBeInTheDocument();
    });

    // Click the confirm button
    await act(async () => {
      const confirmButton = screen.getByText(/Confirmer/i);
      fireEvent.click(confirmButton);
    });

    // Wait for the delete action and verification
    await waitFor(() => {
      expect(axiosInstance.delete).toHaveBeenCalledWith(
        `/oc/points-accueil/${mockPADefaultValues.id}`,
        { withCredentials: true }
      );
      expect(mockContextValue.refetchEstablishments).toHaveBeenCalledWith({
        siren: mockContextValue.siren,
        region: mockContextValue.region,
        departement: mockContextValue.departement,
        page: 0,
      });
    });
  });
});
