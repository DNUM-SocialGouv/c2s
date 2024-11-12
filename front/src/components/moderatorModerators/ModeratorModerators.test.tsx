import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { ModeratorModerators } from './ModeratorModerators';
import { MODERATOR_MODERATORS } from '../../wording.ts';
import { useModeratorModeratorsContext } from '../../hooks/useModeratorModeratorsContext.tsx';
import { ModeratorModeratorsAPIResponse } from '../../utils/tests/moderatorModerators.fixtures.ts';

const { users = [], totalUsers = 0 } = ModeratorModeratorsAPIResponse;

jest.mock('../../hooks/useModeratorModeratorsContext.tsx', () => ({
  useModeratorModeratorsContext: jest.fn(),
}));

describe('ModeratorModerators', () => {
  const mockRefetchUsers = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    (useModeratorModeratorsContext as jest.Mock).mockReturnValue({
      users,
      totalUsers,
      refetchUsers: mockRefetchUsers,
      notificationMessage: null,
      showNotification: mockShowNotification,
    });

    render(<ModeratorModerators />);
  });

  it('should render the component with header and button', () => {
    expect(
      screen.getByText(MODERATOR_MODERATORS.pageTitle)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(MODERATOR_MODERATORS.addNewModerator)
    ).toHaveLength(2);
  });

  it('should display the total number of validated users in section title', () => {
    expect(
      screen.getByText(MODERATOR_MODERATORS.validatedUsersNumber(2))
    ).toBeInTheDocument();
  });
});
