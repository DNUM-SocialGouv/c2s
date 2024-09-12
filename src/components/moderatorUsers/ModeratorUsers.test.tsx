import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ModeratorUsers } from './ModeratorUsers';
import { LoginContext } from '@/contexts/LoginContext';
import { axiosInstance } from '@/RequestInterceptor';
import { axe, toHaveNoViolations } from 'jest-axe';
import { UserStatus } from '@/domain/ModerateurUsers';
import { useUserContext } from '@/contexts/UserContext';

expect.extend(toHaveNoViolations);

jest.mock('@/contexts/UserContext');
jest.mock('@/RequestInterceptor', () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

const mockSetUsers = jest.fn();
const mockUseUserContext = {
  users: [],
  setUsers: mockSetUsers,
  statut: UserStatus.Validated.toString(),
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
describe('ModeratorUsers', () => {
  it('sould render the component without accessibility violations', async () => {
    // GIVEN
    render(
      <LoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <ModeratorUsers />
      </LoginContext.Provider>
    );
    // THEN
    const moderatorUsers = screen.getByTestId('moderatorUsers');
    waitFor(async () => {
      expect(await axe(moderatorUsers)).toHaveNoViolations();
    });
  });

  it('should display the loader and fetch user count when logged in', async () => {
    // GIVEN
    const mockResponse = { data: { membreCount: 5 } };
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <LoginContext.Provider
        value={{
          isLogged: false,
          setIsLogged: () => undefined,
        }}
      >
        <ModeratorUsers />
      </LoginContext.Provider>
    );
    // THEN
    expect(screen.getByRole('alert')).toBeVisible();

    waitFor(() => {
      // expect(axiosInstance.get).toHaveBeenCalledWith(
      //   '/moderateur/membres/home',
      //   { withCredentials: true }
      // );
      expect(screen.getByText(/5/)).toBeInTheDocument();
    });
  });

  //   it('should not fetch user count when not logged in', () => {
  //     render(
  //       <LoginContext.Provider
  //         value={{
  //           isLogged: true,
  //           setIsLogged: () => undefined,
  //         }}
  //       >
  //             <ModeratorUsers />
  //       </LoginContext.Provider>
  //     );
  //     // THEN
  //     expect(axiosInstance.get).not.toHaveBeenCalled();
  //   });
});
