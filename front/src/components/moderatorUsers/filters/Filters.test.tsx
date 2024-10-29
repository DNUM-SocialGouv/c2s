// Filters.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Filters } from './Filters.tsx';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import { UserStatus } from '../../../domain/ModerateurUsers.ts';

expect.extend(toHaveNoViolations);

jest.mock('../../../contexts/UserContext.tsx');

const mockSetStatut = jest.fn();
const mockSetOrganisationType = jest.fn();
const mockSetSearchTerm = jest.fn();

beforeEach(() => {
  (useUserContext as jest.Mock).mockReturnValue({
    statut: UserStatus.Valide,
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

  it('should call setStatut when the status select is changed', async () => {
    const selectStatut = screen.getByTestId('status-select');
    // WHEN
    fireEvent.change(selectStatut, { target: { value: UserStatus.Valide } });
    // THEN
    await waitFor(() => {
      expect(mockSetStatut).toHaveBeenCalledWith(UserStatus.Valide);
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
});
