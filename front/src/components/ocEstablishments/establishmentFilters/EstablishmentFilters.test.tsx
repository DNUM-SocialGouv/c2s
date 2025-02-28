import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { EstablishmentFilters } from './EstablishmentFilters';
import { OcEstablishmentContext } from '../../../contexts/OcEstablishmentContext';
import { axiosInstance } from '../../../RequestInterceptor';
import { OC_MES_ETABLISSEMENTS } from '../../../wording';

jest.mock('../../../RequestInterceptor', () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe('EstablishmentFilters Component', () => {
  const mockContextValue = {
    setSiren: jest.fn(),
    establishments: [],
    totalEstablishments: 0,
    totalPages: 0,
    loading: false,
    error: null,
    fetchEstablishments: jest.fn(),
    siren: '123456789',
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

  const mockRegions = ['Region 1', 'Region 2'];
  const mockDepartements = ['Dept 1', 'Dept 2'];

  const renderComponent = () =>
    render(
      <OcEstablishmentContext.Provider value={mockContextValue}>
        <EstablishmentFilters />
      </OcEstablishmentContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    (axiosInstance.get as jest.Mock).mockImplementation((url) => {
      if (url.includes('regions')) {
        return Promise.resolve({ data: mockRegions });
      }
      if (url.includes('departements')) {
        return Promise.resolve({ data: mockDepartements });
      }
      return Promise.reject(new Error('Invalid URL'));
    });
  });

  it('should render all filter components', async () => {
    await act(async () => {
      renderComponent();
    });

    expect(
      screen.getByPlaceholderText(
        OC_MES_ETABLISSEMENTS.FILTRES_POINT_ACCUEIL.recherchePlaceholder
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId('region-select-label')).toBeInTheDocument();
    expect(screen.getByTestId('departement-select-label')).toBeInTheDocument();
  });

  it('should fetch and display regions on mount', async () => {
    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith(
        `/oc/points-accueil/regions?siren=${mockContextValue.siren}`
      );
    });

    const regionSelect = screen.getByTestId('region-select');
    expect(regionSelect).toHaveLength(mockRegions.length + 1); // +1 for default option
  });

  it('should fetch and display departments on mount', async () => {
    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith(
        `/oc/points-accueil/departements?siren=${mockContextValue.siren}`
      );
    });

    const departementSelect = screen.getByTestId('departement-select');
    expect(departementSelect).toHaveLength(mockDepartements.length + 1); // +1 for default option
  });

  it('should handle region selection', async () => {
    await act(async () => {
      renderComponent();
    });

    await act(async () => {
      const regionSelect = screen.getByTestId('region-select');
      fireEvent.change(regionSelect, { target: { value: 'Region 1' } });
    });

    expect(mockContextValue.setRegion).toHaveBeenCalledWith('Region 1');
    await waitFor(() => {
      expect(mockContextValue.refetchEstablishments).toHaveBeenCalled();
    });
  });

  it('should handle departement selection', async () => {
    await act(async () => {
      renderComponent();
    });

    await act(async () => {
      const departementSelect = screen.getByTestId('departement-select');
      fireEvent.change(departementSelect, { target: { value: 'Dept 1' } });
    });

    expect(mockContextValue.setDepartement).toHaveBeenCalledWith('Dept 1');
    await waitFor(() => {
      expect(mockContextValue.refetchEstablishments).toHaveBeenCalled();
    });
  });

  it('should handle search submission', async () => {
    await act(async () => {
      renderComponent();
    });

    const searchInput = screen.getByLabelText('Search input');
    const searchButton = screen.getByTitle('Search');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test search' } });
    });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(mockContextValue.setSearch).toHaveBeenCalledWith('test search');
    await waitFor(() => {
      expect(mockContextValue.refetchEstablishments).toHaveBeenCalled();
    });
  });

  it('should handle API error when fetching regions', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (axiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should handle API error when fetching departements', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (axiosInstance.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockRegions })
      .mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should not fetch data if siren is not provided', async () => {
    const mockContextValueWithoutSiren = {
      ...mockContextValue,
      siren: '',
    };

    await act(async () => {
      render(
        <OcEstablishmentContext.Provider value={mockContextValueWithoutSiren}>
          <EstablishmentFilters />
        </OcEstablishmentContext.Provider>
      );
    });

    expect(axiosInstance.get).not.toHaveBeenCalled();
  });

  it('should handle search submission on Enter key press', async () => {
    await act(async () => {
      renderComponent();
    });

    const searchInput = screen.getByLabelText('Search input');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test search' } });
    });

    await act(async () => {
      fireEvent.keyDown(searchInput, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
      });
    });

    expect(mockContextValue.setSearch).toHaveBeenCalledWith('test search');
    await waitFor(() => {
      expect(mockContextValue.refetchEstablishments).toHaveBeenCalled();
    });
  });
});
