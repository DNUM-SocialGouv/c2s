import '@testing-library/jest-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { ModeratorsUser } from './ModeratorUser.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { COMMON, MODERATOR_MODERATORS } from '../../../wording.ts';
import { ModeratorModeratorsContext } from '../../../contexts/ModeratorModeratorsContext.tsx';

jest.mock('../../../RequestInterceptor.tsx', () => ({
  axiosInstance: {
    delete: jest.fn(),
  },
}));

describe('ModeratorsUser', () => {
  const mockRefetchUsers = jest.fn();
  const mockShowNotification = jest.fn();

  const sampleUser = {
    id: 10572,
    nom: 'CLERC',
    prenom: 'Michel',
    email: 'michel.clerc@test.fr',
    telephone: '0102030405',
    fonction: 'Chargé de mission',
  };

  const renderWithContext = (component: JSX.Element) => {
    return render(
      <ModeratorModeratorsContext.Provider
        value={{
          users: [],
          totalUsers: 0,
          refetchUsers: mockRefetchUsers,
          notificationMessage: null,
          showNotification: mockShowNotification,
        }}
      >
        {component}
      </ModeratorModeratorsContext.Provider>
    );
  };

  it('should render user information correctly', () => {
    renderWithContext(<ModeratorsUser user={sampleUser} />);

    expect(screen.getByText('Michel CLERC')).toBeInTheDocument();
    expect(screen.getByText('michel.clerc@test.fr')).toBeInTheDocument();
  });

  it('should open the confirmation modal when delete button is clicked', () => {
    renderWithContext(<ModeratorsUser user={sampleUser} />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(COMMON.confirmAction)).toBeVisible();
    expect(
      screen.getByText(MODERATOR_MODERATORS.deleteWarning)
    ).toBeInTheDocument();
  });

  it('should close the modal when cancel button is clicked', () => {
    renderWithContext(<ModeratorsUser user={sampleUser} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button', { name: /annuler/i }));
    expect(screen.queryByText(COMMON.confirmAction)).toBeNull();
  });

  it('should call deleteMember and show notification on successful deletion', async () => {
    (axiosInstance.delete as jest.Mock).mockResolvedValueOnce({});

    renderWithContext(<ModeratorsUser user={sampleUser} />);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(mockRefetchUsers).toHaveBeenCalledTimes(1);
      expect(mockShowNotification).toHaveBeenCalledWith(
        "L'utilisateur Michel CLERC a bien été supprimé"
      );
    });
  });

  it('should display an error message if deletion fails', async () => {
    (axiosInstance.delete as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    renderWithContext(<ModeratorsUser user={sampleUser} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button', { name: /confirmer/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Une erreur est survenue, l'utilisateur n'a pas été supprimé"
        )
      ).toBeInTheDocument();
    });
  });
});
