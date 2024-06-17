// Filters.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Filters } from './Filters';
import { useUserContext } from '@/contexts/UserContext';
// import { MODERATOR_USERS } from '@/wording';
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
    organisationType: 'OC',
    setOrganisationType: mockSetOrganisationType,
    setSearchTerm: mockSetSearchTerm,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Filters', () => {
  const setup = () => {
    render(<Filters />);
  };

  it('should render the component without accessibility violations', async () => {
    setup();

    const filters = screen.getByTestId('filters');
    expect(await axe(filters)).toHaveNoViolations();
  });

  it('should call setStatut when the status select is changed', () => {
    setup();

    const selectStatut = screen.getByTestId('status-select');
    fireEvent.change(selectStatut, { target: { value: '2' } });
    expect(mockSetStatut).toHaveBeenCalledWith('2');
  });

  it('should call setOrganisationType when the organisation type select is changed', () => {
    setup();

    const selectOrganisation = screen.getByTestId('organisation-select');
    fireEvent.change(selectOrganisation, { target: { value: 'CAISSE' } });
    expect(mockSetOrganisationType).toHaveBeenCalledWith('CAISSE');
  });

  it('should call setSearchTerm when the search button is clicked', () => {
    setup();

    const input = screen.getByPlaceholderText('Mots clés');
    fireEvent.change(input, { target: { value: 'test' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });

  it('should call setSearchTerm when Enter key is pressed in the search input', () => {
    setup();

    const input = screen.getByPlaceholderText('Mots clés');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });
});
