// Users.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Users } from './Users';
import { useUserContext } from '@/contexts/UserContext';
import { axiosInstance } from '@/RequestInterceptor';
import { MODERATOR_USERS } from '@/wording';
import { UserStatus } from '@/domain/ModerateurUsers';

expect.extend(toHaveNoViolations);

jest.mock('@/contexts/UserContext');
jest.mock('@/RequestInterceptor');

const mockSetUsers = jest.fn();
const mockUseUserContext = {
  users: [],
  setUsers: mockSetUsers,
  statut: UserStatus.Validated.toString(),
  organisationType: 'OC',
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
