import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import { OcEstablishments } from '../../components/ocEstablishments/OcEstablishments';
import { OcEstablishmentContext } from '../../contexts/OcEstablishmentContext';
import { axiosInstance } from '../../RequestInterceptor';
import { OC_MES_ETABLISSEMENTS } from '../../wording';

jest.mock('../../RequestInterceptor', () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe('OcEstablishments Component', () => {
  const mockOcInfo = {
    locSiren: '123456789',
  };

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

  const renderComponent = () =>
    render(
      <OcEstablishmentContext.Provider value={mockContextValue}>
        <OcEstablishments />
      </OcEstablishmentContext.Provider>
    );

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should render the loading state when fetching data', async () => {
    (axiosInstance.get as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    ); // Simulate a pending request

    localStorage.setItem('email', 'test@example.com');
    renderComponent();

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('should log an error if no email is found in localStorage', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    renderComponent();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'No email found in localStorage'
    );

    consoleErrorSpy.mockRestore();
  });

  it('should call setSiren when fetching data successfully', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockOcInfo,
    });

    localStorage.setItem('email', 'test@example.com');
    renderComponent();

    await waitFor(() => {
      expect(mockContextValue.setSiren).toHaveBeenCalledWith(
        mockOcInfo.locSiren
      );
    });
  });

  it('should handle API errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    (axiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    localStorage.setItem('email', 'test@example.com');
    renderComponent();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should scroll to the form when the button is clicked', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockOcInfo,
    });

    localStorage.setItem('email', 'test@example.com');
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(OC_MES_ETABLISSEMENTS.addPointAcceuil)
      ).toBeInTheDocument();
    });

    const scrollIntoViewMock = jest.fn();
    Object.defineProperty(global.HTMLElement.prototype, 'scrollIntoView', {
      value: scrollIntoViewMock,
      writable: true,
    });

    act(() => {
      screen.getByText(OC_MES_ETABLISSEMENTS.addPointAcceuil).click();
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});
