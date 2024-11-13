import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { ModeratorModerators } from './ModeratorModerators';
import { MODERATOR_MODERATORS } from '../../wording.ts';
import { ModeratorModeratorsContext } from '../../contexts/ModeratorModeratorsContext';
import { ModeratorModeratorsAPIResponse } from '../../utils/tests/moderatorModerators.fixtures.ts';

const { users = [], totalUsers = 0 } = ModeratorModeratorsAPIResponse;

describe('ModeratorModerators', () => {
  const mockRefetchUsers = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    render(
      <ModeratorModeratorsContext.Provider
        value={{
          users,
          totalUsers,
          refetchUsers: mockRefetchUsers,
          notificationMessage: null,
          showNotification: mockShowNotification,
        }}
      >
        <ModeratorModerators />
      </ModeratorModeratorsContext.Provider>
    );
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
      screen.getByText(MODERATOR_MODERATORS.validatedUsersNumber(totalUsers))
    ).toBeInTheDocument();
  });
});
