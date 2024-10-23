// Users.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Users } from './Users.tsx';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { MODERATOR_USERS } from '../../../wording.ts';
import { UserStatus } from '../../../domain/ModerateurUsers.ts';

expect.extend(toHaveNoViolations);

jest.mock('../../../contexts/UserContext.tsx');
jest.mock('../../../RequestInterceptor.tsx');

const mockSetUsers = jest.fn();
const mockUseUserContext = {
  users: [],
  setUsers: mockSetUsers,
  statut: UserStatus.Valide.toString(),
  organisationType: 'ORGANISME_COMPLEMENTAIRE',
  searchTerm: '',
};

beforeEach(() => {
  (useUserContext as jest.Mock).mockReturnValue(mockUseUserContext);
  (axiosInstance.get as jest.Mock).mockResolvedValue({
    data: { list: [], count: 0 },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Users', () => {
  const setup = () => {
    render(<Users />);
  };

  it('should render the component without accessibility violations', async () => {
    setup();

    const usersComponent = screen.getByTestId('users');
    await waitFor(async () => {
      expect(await axe(usersComponent)).toHaveNoViolations();
    });
  });

  it('should render the correct title with 0 users', async () => {
    setup();

    await waitFor(() => {
      expect(
        screen.getByText('0 ' + MODERATOR_USERS.activeUsers)
      ).toBeInTheDocument();
    });
  });

  it('should fetch users on mount', async () => {
    setup();

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalled();
      expect(mockSetUsers).toHaveBeenCalledWith([]);
    });
  });
});
