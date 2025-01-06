import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { OcList } from './OcList';
import { OcEstablishmentContext } from '../../../contexts/OcEstablishmentContext';
import { LPAForm } from '../LPAForm/LPAForm';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClickPrev?: () => void;
  onClickNext?: () => void;
}

// Mock child components
jest.mock('../LPAForm/LPAForm', () => ({
  LPAForm: jest.fn(() => <div data-testid="mocked-lpa-form" />),
}));

jest.mock('../../common/pagination/Pagination', () => ({
  Pagination: ({ onPageChange, onClickPrev, onClickNext }: PaginationProps) => (
    <div data-testid="mocked-pagination">
      <button onClick={() => onClickPrev?.()}>Previous</button>
      <button onClick={() => onPageChange(2)}>Page 2</button>
      <button onClick={() => onClickNext?.()}>Next</button>
    </div>
  ),
}));

describe('OcList Component', () => {
  const mockEstablishments = [
    {
      id: '401',
      nom: 'Mutuelle uMEn',
      email: '',
      telephone: '',
      adresse: '5 rue de Palestro',
      adresse2: '',
      adresse3: '',
      adresseComplete: '5 rue de Palestro, , , 75002, PARIS',
      cedex: '',
      codePostal: '75002',
      ville: 'PARIS',
      region: 'Île-de-France',
      departement: 'Paris',
      dateMaj: 'Jan 26, 2018',
      context: '',
    },
    {
      id: '403',
      nom: 'etablissement 2',
      email: '',
      telephone: '',
      adresse: '5 rue de Palestros',
      adresse2: '',
      adresse3: '',
      adresseComplete: '5 rue de Palestro, , , 75003, PARIS',
      cedex: '',
      codePostal: '75001',
      ville: 'PARIS',
      region: 'Île-de-France',
      departement: 'Paris',
      dateMaj: 'Jan 26, 2019',
      context: '',
    },
  ];

  const mockContextValue = {
    establishments: mockEstablishments,
    loading: false,
    totalEstablishments: 2,
    totalPages: 1,
    currentPage: 1,
    setCurrentPage: jest.fn(),
    error: null,
    siren: '123456789',
    region: '',
    setRegion: jest.fn(),
    departement: '',
    setDepartement: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    setSiren: jest.fn(),
    fetchEstablishments: jest.fn(),
    refetchEstablishments: jest.fn(),
    resetEstablishments: jest.fn(),
  };

  const renderComponent = (contextOverrides = {}) =>
    render(
      <OcEstablishmentContext.Provider
        value={{ ...mockContextValue, ...contextOverrides }}
      >
        <OcList />
      </OcEstablishmentContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', async () => {
    await act(async () => {
      renderComponent({ loading: true });
    });

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('should render the total number of establishments', async () => {
    await act(async () => {
      renderComponent();
    });

    expect(
      screen.getByText("2 point(s) d'accueil enregistré(s)")
    ).toBeInTheDocument();
  });

  it('should render a list of LPAForms', async () => {
    await act(async () => {
      renderComponent();
    });

    const forms = screen.getAllByTestId('mocked-lpa-form');
    expect(forms).toHaveLength(2);
    expect(LPAForm).toHaveBeenCalledTimes(2);
    expect(LPAForm).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 1,
        action: 'update',
        PADefaultValues: mockEstablishments[0],
      }),
      expect.any(Object)
    );
  });

  it('should handle pagination correctly', async () => {
    await act(async () => {
      renderComponent();
    });

    const pagination = screen.getByTestId('mocked-pagination');
    expect(pagination).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });
    expect(mockContextValue.setCurrentPage).toHaveBeenCalledWith(2);

    await act(async () => {
      fireEvent.click(screen.getByText('Previous'));
    });
    expect(mockContextValue.setCurrentPage).toHaveBeenCalledWith(0);

    await act(async () => {
      fireEvent.click(screen.getByText('Page 2'));
    });
    expect(mockContextValue.setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('should calculate correct index for items on different pages', async () => {
    await act(async () => {
      renderComponent({ currentPage: 2 });
    });

    expect(LPAForm).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 11, // (2-1) * 10 + 1
      }),
      expect.any(Object)
    );
  });

  it('should return null if context is not provided', async () => {
    await act(async () => {
      render(<OcList />);
    });

    expect(screen.queryByText(/point\(s\) d'accueil/)).not.toBeInTheDocument();
    expect(screen.queryByTestId('mocked-lpa-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mocked-pagination')).not.toBeInTheDocument();
  });

  it('should render empty state when there are no establishments', async () => {
    await act(async () => {
      renderComponent({
        establishments: [],
        totalEstablishments: 0,
      });
    });

    expect(
      screen.getByText("0 point(s) d'accueil enregistré(s)")
    ).toBeInTheDocument();
    expect(screen.queryByTestId('mocked-lpa-form')).not.toBeInTheDocument();
  });

  it('should handle page changes for different total pages', async () => {
    await act(async () => {
      renderComponent({
        totalPages: 3,
        currentPage: 2,
      });
    });

    const pagination = screen.getByTestId('mocked-pagination');
    expect(pagination).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });
    expect(mockContextValue.setCurrentPage).toHaveBeenCalledWith(3);
  });
});
