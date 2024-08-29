// Filters.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Filters } from './Filters';
import { useUserContext } from '@/contexts/UserContext';
import { UserStatus } from '@/domain/ModerateurUsers';

expect.extend(toHaveNoViolations);

jest.mock('@/contexts/UserContext');

const mockSetStatut = jest.fn();
const mockSetOrganisationType = jest.fn();
const mockSetSearchTerm = jest.fn();

beforeEach(() => {
  (useUserContext as jest.Mock).mockReturnValue({
    statut: UserStatus.Validated,
    setStatut: mockSetStatut,
    organisationType: 'ORGANISME_COMPLEMENTAIRE',
    setOrganisationType: mockSetOrganisationType,
    setSearchTerm: mockSetSearchTerm,
  });

  render(<Filters />);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Filters', () => {
  it('should render the component without accessibility violations', async () => {
    const filters = screen.getByTestId('filters');
    expect(await axe(filters)).toHaveNoViolations();
  });

  it('should call setStatut when the status select is changed', () => {
    const selectStatut = screen.getByTestId('status-select');
    // WHEN
    fireEvent.change(selectStatut, { target: { value: '2' } });
    // THEN
    waitFor(() => {
      expect(mockSetStatut).toHaveBeenCalledWith(UserStatus.Validated);
    });
  });

  it('should call setOrganisationType when the organisation type select is changed', () => {
    const selectOrganisation = screen.getByTestId('organisation-select');
    // WHEN
    fireEvent.change(selectOrganisation, { target: { value: 'CAISSE' } });
    // THEN
    expect(mockSetOrganisationType).toHaveBeenCalledWith('CAISSE');
  });

  it('should call setSearchTerm when the search button is clicked', () => {
    const input = screen.getByPlaceholderText('Mots clés');
    fireEvent.change(input, { target: { value: 'test' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });

  it('should call setSearchTerm when Enter key is pressed in the search input', () => {
    const input = screen.getByPlaceholderText('Mots clés');
    // WHEN
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    // THEN
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });

  it('should call setRegion when the region select is changed', async () => {
    // GIVEN
    const mockSetRegion = jest.fn();
    render(<Filters />);
    // WHEN
    waitFor(() =>
      fireEvent.change(screen.getByTestId('region-select'), {
        target: { value: 'Region 1' },
      })
    );
    // THEN
    waitFor(() => expect(mockSetRegion).toHaveBeenCalledWith('Region 1'));
  });

  it('should call setDepartement when the departement select is changed', async () => {
    // GIVEN
    const mockSetDepartement = jest.fn();
    render(<Filters />);

    // WHEN
    waitFor(() =>
      fireEvent.change(screen.getByTestId('departement-select'), {
        target: { value: 'Departement 1' },
      })
    );
    // THEN
    waitFor(() =>
      expect(mockSetDepartement).toHaveBeenCalledWith('Departement 1')
    );
  });
});
